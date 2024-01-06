--[[
Copyright 2008-2024 João Cardoso
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

local Drop, old = LibStub('Sushi-3.2').Group:NewSushi('Dropdown', 2, 'Frame')
if not Drop then return end


--[[ Construct ]]--

function Drop:New(parent, children, expires)
	local f = self:Super(Drop):New(parent, children)
	f.expires = expires and (GetTime() + 5)
	f:SetScript('OnHide', f.OnHide)
	f:SetScript('OnKeyDown', f.OnKeyDown)
	f:SetScript('OnUpdate', expires and f.OnUpdate)
	f:SetBackdrop('TooltipBackdropTemplate')
	f:SetFrameStrata('FULLSCREEN_DIALOG')
	f:SetClampedToScreen(true)
	f:Show()
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
	self:GetClass().Current = self.Current ~= self and self.Current
	self:SetScript('OnUpdate', nil)
	self:Super(Drop):Reset()
	self:SetScale(1)
end

function Drop:Release()
	self:SetScript('OnHide', nil)
	self:SetClampedToScreen(false)
	self:Super(Drop):Release()
	self:Hide()
end


--[[ Events ]]--

function Drop:OnUpdate()
	local time = GetTime()
	if self.done then
		self:Release()
	elseif self:IsMouseInteracting() then
		self.expires = time + 5
	elseif time >= self.expires or IsMouseButtonDown() then
		self.done = true
	end
end

function Drop:OnKeyDown(key)
	local esc = GetBindingFromClick(key) == 'TOGGLEGAMEMENU'
	self:SetPropagateKeyboardInput(not esc)
	self.done = self.done or esc
end

function Drop:OnHide()
	self:ReleaseChildren()
	if self.expires then
		self:Release()
	end
end


--[[ API ]]--

function Drop:SetChildren(children)
	self:Super(Drop):SetChildren(type(children) == 'table' and function(self)
		for i, line in ipairs(children) do
			self:Add(line)
		end
	end or children)
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
	return DoesAncestryInclude(self:GetParent(), GetMouseFocus())
end


--[[ Properties ]]--

if not WOW_PROJECT_ID == WOW_PROJECT_MAINLINE and not old then
	hooksecurefunc('ToggleDropDownMenu', function() Drop:Clear() end)
	hooksecurefunc('CloseDropDownMenus', function() Drop:Clear() end)
end

Drop.Size = 10
Drop.ButtonClass = 'DropButton'