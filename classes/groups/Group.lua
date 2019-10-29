--[[
Copyright 2008-2019 João Cardoso
Sushi is distributed under the terms of the GNU General Public License (or the Lesser GPL).
This file is part of Sushi.

Sushi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Sushi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Sushi. If not, see <http://www.gnu.org/licenses/>.
--]]

local Lib = LibStub('Sushi-3.1')
local Group = Lib.Callable:NewSushi('Group', 1, 'Frame')
if not Group then return end


--[[ Constructor ]]--

function Group:Construct()
	local f = self:Super(Group):Construct()
	f:SetScript('OnSizeChanged', f.OnSizeChanged)
	f:SetScript('OnHide', f.ReleaseChildren)
	f:SetScript('OnShow', f.UpdateChildren)
	f.Children = {}
	return f
end

function Group:New(parent, children)
	local f = self:Super(Group):New(parent)
	f:SetSize(200, 200)
	f:SetChildren(children)
	return f
end

function Group:Reset()
	self:ReleaseChildren()
	self:Super(Group):Reset()
end


--[[ Events ]]--

function Group:OnSizeChanged()
	if self.limit ~= self:GetLimit() then
		self:Layout()
	elseif self:CanLayout() then
		for i, child in self:IterateChildren() do
			if child.FireCall then
				child:FireCall('OnParentResize')
			end
		end
	end
end

function Group:OnChildUpdate()
	local parent = self:GetParent()
	if parent and parent.UpdateChildren then
		parent:UpdateChildren()
	end
end

function Group:OnChildInput(...)
	local parent = self:GetParent()
	if parent and parent.FireCall then
		parent:FireCall('OnInput', self, ...)
	end
end


--[[ Children ]]--

function Group:SetChildren(method)
	self:SetCall('OnChildren', method)
	self:UpdateChildren()
end

function Group:UpdateChildren()
	if self:CanLayout() then
		self:ReleaseChildren()
		self:FireCall('OnChildren')
		self:FireCall('OnUpdate')
		self:Layout()
	end
end

function Group:Add(object, ...)
	local kind = type(object)
	assert(kind == 'string' or kind == 'table', 'Bad argument #1 to `:Add` (string or table expected)')

	if kind == 'string' then
		local class = Lib[object]
		assert(class, 'Sushi-3.1 class `' .. object .. '` was not found.')
		assert(type(class) == 'table', 'Provided class name `' .. object .. '` is a reserved keyword')
		object = class
	end

	if object.New then
		object = object:New(self, ...)
		assert(object, 'Provided class did not generate instance')
	end

	if object.SetCall then
		object:SetCall('OnUpdate', self.OnChildUpdate)
		object:SetCall('OnInput', self.OnChildInput)
	end

	tinsert(self.Children, object)
	return object
end

function Group:AddBreak()
	tinsert(self.Children, self.Break)
end

function Group:ReleaseChildren()
	for i, child in self:IterateChildren() do
		if child.Release then
			child:Release()
		end
	end

	wipe(self.Children)
end

function Group:IterateChildren()
	return ipairs(self.Children)
end


--[[ Layout ]]--

function Group:Layout()
	if self:CanLayout() then
		self.limit = self:GetLimit()
	else
		return
	end

	local w, h, x, y = 0, 0, 0, 0
	local function breakLine()
		y = y + h
		w = max(w, x)
		h, x = 0, 0
	end

	for i, child in self:IterateChildren() do
		if child ~= self.Break then
			local top, left = child.top or 0, child.left or 0
			local bottom, right = child.bottom or 0, child.right or 0
			local width, height = child:GetSize()

			width, height = self:Orient(width + left + right, height + top + bottom)
			top, left = self:Orient(top, left)

			if self.limit and (x + width) > self.limit then
	 			breakLine()
	 		end

			local a,b = self:Orient(x + left, y + top)
			child:SetPoint('TOPLEFT', a, -b)
			h = max(h, height)
			x = x + width
		else
			breakLine()
		end
	end

	x, y = self:Orient(max(x, w), y + h)
	if self:GetResizing() == 'HORIZONTAL' then
		self:SetWidth(x)
	elseif self:GetResizing() == 'VERTICAL' then
		self:SetHeight(y)
	end
end

function Group:CanLayout ()
	return self:GetCall('OnChildren') and self:IsVisible()
end


--[[ Orientation ]]--

function Group:SetOrientation(orientation)
	self.orientation = orientation
	self:Layout()
end

function Group:GetOrientation()
	return self.orientation or 'VERTICAL'
end

function Group:Orient(a, b)
	if self:GetOrientation() == 'HORIZONTAL' then
		return a,b
	end
	return b,a
end


--[[ Resizing ]]--

function Group:SetResizing(resizing)
	self.resizing = resizing
	self:Layout()
end

function Group:GetResizing()
	return self.resizing or 'VERTICAL'
end

function Group:GetLimit()
	return self:GetResizing() ~= self:GetOrientation() and self:Orient(self:GetSize())
end


--[[ Proprieties ]]--

Group.Update = Group.UpdateChildren
Group.Break = {}
