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

local Dark = LibStub('Sushi-3.1').Editable:NewSushi('DarkEdit', 1, 'EditBox', 'InputBoxScriptTemplate')
if not Dark then return end


--[[ Construct ]]--

function Dark:Construct()
  local f = self:Super(Dark):Construct()
  local left = f:CreateFontString(nil, nil, self.NormalFont)
  left:SetPoint('LEFT', 3, 0)
  local right = f:CreateFontString(nil, nil, self.NormalFont)
  right:SetPoint('RIGHT', -3, 0)

  f:SetHeight(18)
  f:SetJustifyH('CENTER')
  f:SetScript('OnTextChanged', f.Resize)
  f:SetBackdrop(f.Backdrop)
  f:SetBackdropColor(0,0,0, 0.25)
  f:SetBackdropBorderColor(0,0,0, 0.3)
  f.Left, f.Right = left, right
  return f
end

function Dark:SetPattern(pattern)
  local left, right = strmatch(pattern, '(.*)%%s(.*)')

  self.Right:SetText(right)
  self.Left:SetText(left)
end

function Dark:GetPattern()
  return self.Left:GetText() .. '%s' .. self.Right:GetText()
end

function Dark:Resize()
  self.MeasureString:SetFontObject(self:GetFontObject())
  self.MeasureString:SetText(self:GetText())
  self:SetWidth(self.MeasureString:GetStringWidth() + self.WidthOff)
end


--[[ Proprieties ]]--

Dark.MeasureString = Dark.MeasureString or UIParent:CreateFontString()
Dark.WidthOff = 15
Dark.Backdrop = {
	bgFile = 'Interface/Tooltips/UI-Tooltip-Background',
	edgeFile = 'Interface/Tooltips/UI-Tooltip-Border',
	insets = {left = 2, right = 2, top = 2, bottom = 2},
	edgeSize = 11,
}
