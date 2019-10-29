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

local Button = LibStub('Sushi-3.1').Clickable:NewSushi('TextedClickable', 1)
if not Button then return end


--[[ API ]]--

function Button:Reset()
	self:Super(Button):Reset()
	self:SetSmall(nil)
	self:SetText(nil)
end

function Button:SetText(text)
	self:GetFontString():SetText(text)
	self:SetWidth(max(self.MinWidth, self:GetTextWidth() + self.WidthOff))
end

function Button:SetLabel(label)
  self:SetText(label)
end

function Button:GetLabel()
  return self:GetText()
end

function Button:SetSmall(small)
	local suffix = small and 'Small' or ''

	self:SetHighlightFontObject(self.HighlightFont .. suffix)
	self:SetDisabledFontObject(self.DisableFont .. suffix)
	self:SetNormalFontObject(self.NormalFont .. suffix)
end

function Button:IsSmall()
	return self:GetNormalFontObject() == self.NormalFont
end


--[[ Proprieties ]]--

Button.HighlightFont = 'GameFontHighlight'
Button.DisableFont = 'GameFontDisable'
Button.NormalFont = 'GameFontNormal'
Button.MinWidth = 0
