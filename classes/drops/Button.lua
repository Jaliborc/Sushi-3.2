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

local Button = LibStub('Sushi-3.1').Clickable:NewSushi('DropButton', 1, 'Button', 'UIDropDownMenuButtonTemplate', true)
if not Button then return end

Button.left = 16
Button.top = 1
Button.bottom = 1


--[[ Startup ]]--

function Button:Construct()
	local b = self:Super(Button):Construct()
	b.Check = _G[b:GetName() .. 'Check']
	b.Color = _G[b:GetName() .. 'ColorSwatch']
	b.Color.Bg = _G[b.Color:GetName() .. 'SwatchBG']
	b.Arrow = _G[b:GetName() .. 'ExpandArrow']
	b.Uncheck = _G[b:GetName() .. 'UnCheck']
	b.Uncheck:Hide()
	return b
end

function Button:New(...)
	local b = self:Super(Button):New(...)
	b:SetTitleMode(false)
	b:SetCheckable(true)
	b:SetChecked(true)
	return b
end

function Button:OnClick()
	self:SetChecked(not self:GetChecked())
	self:Super(Button):OnClick()
end


--[[ Text ]]--

function Button:SetTitleMode(isTitle)
	local font = isTitle and GameFontNormalSmall or GameFontHighlightSmall
	self:SetHighlightFontObject(font)
	self:SetNormalFontObject(font)
	self:EnableMouse(not isTitle)
end

function Button:IsTitle()
	return not self:IsMouseEnabled()
end


--[[ Checking ]]--

function Button:SetCheckable(checkable)
	local name = self:GetName()
	self:GetFontString():SetPoint('LEFT', checkable and 20 or 0, 0)
	self.Check:SetShown(checkable)
end

function Button:IsCheckable()
	return self.Check:IsShown()
end

function Button:SetChecked(checked)
	--if checked then
	--	self:LockHighlight()
	--else
--		self:UnlockHighlight()
	--end

	self.checked = checked
	self:UpdateCheckTexture()
end

function Button:GetChecked()
	return self.checked
end

function Button:SetRadio(isRadio)
	self.radio = isRadio
	self:UpdateCheckTexture()
end

function Button:IsRadio()
	return self.radio
end

function Button:UpdateCheckTexture()
	local y = self:IsRadio() and 0.5 or 0
	local x = self:GetChecked() and 0 or 0.5

	self.Check:SetTexCoord(x, x+0.5, y, y+0.5)
end
