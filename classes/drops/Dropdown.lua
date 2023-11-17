--[[
Copyright 2008-2023 João Cardoso
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

local Drop = LibStub('Sushi-3.2').Group:NewSushi('Dropdown', 1, 'Frame')
if not Drop then return end
local Mainline = WOW_PROJECT_ID == WOW_PROJECT_MAINLINE


--[[ Construct ]]--

function Drop:Construct()
	local f = self:Super(Drop):Construct()
	if Mainline then
		f:SetScript('OnEvent', f.OnGlobalMouse)
		f:SetScript('OnHide', f.OnHide)
	end
	return f
end

function Drop:New(parent, children, expires)
	local f = self:Super(Drop):New(parent, children)
	f.expires = expires and (GetTime() + 5)
	f:SetScript('OnUpdate', expires and f.OnUpdate)
	f:SetBackdrop('TooltipBackdropTemplate')
	f:SetFrameStrata('FULLSCREEN_DIALOG')
	f:SetClampedToScreen(true)

	if expires and Mainline then
		f:RegisterEvent('GLOBAL_MOUSE_DOWN')
	end
	return f
end

function Drop:Toggle(parent)
	local show = not self.Current or self.Current:GetParent() ~= parent
	self:Clear()

	if show then
		self.Current = self:New(parent, nil, true)
		self.Current:SetScale(UIParent:GetScale() / parent:GetEffectiveScale())
		return self.Current
	end
end

function Drop:Clear()
	if self.Current then
		self.Current:Release()
		self.Current = nil
	end
end

function Drop:Reset()
	if Mainline then
		self:UnregisterEvent('GLOBAL_MOUSE_DOWN')
	end

	self:GetClass().Current = self.Current ~= self and self.Current
	self:SetScript('OnUpdate', nil)
	self:SetClampedToScreen(false)
	self:Super(Drop):Reset()
	self:SetScale(1)
end


--[[ Events ]]--

function Drop:OnUpdate()
	local time = GetTime()
	if self.done then
		self:Release()
	elseif self:IsMouseInteracting() then
		self.expires = time + 5
	elseif time >= self.expires then
		self:Release()
	end
end

function Drop:OnGlobalMouse()
	if not self:IsMouseInteracting() then
		self.done = true
	end
end

function Drop:OnHide()
	self:ReleaseChildren()
	if self.expires then
		self:Release()
	end
end


--[[ API ]]--

function Drop:SetChildren(object)
	self:Super(Drop):SetChildren(type(object) == 'table' and function(self)
		for i, line in ipairs(object) do
			self:Add(line)
		end
	end or object)
end

function Drop:Add(object, ...)
	if type(object) == 'table' and type(object[0]) ~= 'userdata' then
		if not object.text and object[1] then
			local lines = {}
			for i, line in ipairs(object) do
				lines[i] = self:Add(line)
			end
			return lines
		end

		return self:Add(self.ButtonClass, object, ...)
	end

	local f = self:Super(Drop):Add(object, ...)
	if f.SetCall then
		f:SetCall('OnUpdate', function() self.done = true end)
	end
	return f
end

function Drop:IsMouseInteracting()
	local function step(frame)
		if GetMouseFocus() == frame then
			return true
		end

		if not frame:IsForbidden() then
			for i = 1, select('#', frame:GetChildren()) do
				if step(select(i, frame:GetChildren())) then
					return true
				end
			end
		end
	end

	return step(self:GetParent())
end


--[[ Properties ]]--

if not Mainline and not Drop.ButtonClass then
	hooksecurefunc('ToggleDropDownMenu', function() Drop:Clear() end)
	hooksecurefunc('CloseDropDownMenus', function() Drop:Clear() end)
end

Drop.Size = 10
Drop.ButtonClass = 'DropButton'