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

local Expand = LibStub('Sushi-3.1').Check:NewSushi('ExpandCheck', 1, 'CheckButton')
if not Expand then return end


--[[ API ]]--

function Expand:Construct()
	local b = self:Super(Expand):Construct()
	local toggle = CreateFrame('Button', nil, b)
	toggle:SetHighlightTexture('Interface/Buttons/UI-PlusButton-Hilight')
	toggle:SetScript('OnClick', function() b:OnExpandClick() end)
	toggle:SetPoint('LEFT', -14, 0)
	toggle:SetSize(14, 14)

	b.Toggle = toggle
	return b
end

function Expand:New(...)
	local b = self:Super(Expand):New(...)
	b:SetExpanded(nil)
	return b
end

function Expand:SetExpanded(expanded)
	local texture = expanded and 'MINUS' or 'PLUS'
	self.Toggle:SetNormalTexture('Interface/Buttons/UI-' .. texture ..  'Button-UP')
	self.Toggle:SetPushedTexture('Interface/Buttons/UI-' .. texture .. 'Button-DOWN')
end

function Expand:IsExpanded()
	return self.Toggle:GetNormalTexture():GetTexture() == 'Interface/Buttons/UI-MINUSButton-UP'
end

function Expand:OnExpandClick()
	local expanded = not self:IsExpanded()

	PlaySound(self.Sound)
	self:SetExpanded(expanded)
	self:FireCall('OnExpand', expanded)
	self:FireCall('OnUpdate')
end


--[[ Proprieties ]]--

Expand.left = Expand:GetSuper().left + 14
