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

local Edit = LibStub('Sushi-3.1').Tipped:NewSushi('Editbox', 1, 'EditBox', 'InputBoxTemplate')
if not Edit then return end


--[[ Construct ]]--

function Edit:Construct()
	local f = self:Super(Edit):Construct()
	local label = f:CreateFontString()
	label:SetPoint('BOTTOMLEFT', f, 'TOPLEFT', -7, -4)
	label:SetJustifyH('Left')

	f.Label = label
	f:SetScript('OnEditFocusLost', f.OnEditFocusLost)
	f:SetScript('OnEnterPressed', f.OnEnterPressed)
	f:SetAltArrowKeyMode(false)
	f:SetAutoFocus(false)
	f:SetSize(150, 35)
	f:UpdateFonts()
	return f
end

function Edit:New(parent, label, value)
	local f = self:Super(Edit):New(parent)
	f:SetLabel(label)
	f:SetValue(value)
	return f
end

function Edit:Reset()
	self:Super(Edit):Reset()
	self:SetEnabled(true)
	self:SetPassword(nil)
	self:SetNumeric(nil)
	self:ClearFocus()
end


--[[ Events ]]--

function Edit:OnEditFocusLost()
	self:SetText(self:GetValue())
	self:HighlightText(0, 0)
end

function Edit:OnEnterPressed()
	self:SetValue(self:GetText())
	self:FireCall('OnTextChanged', self:GetValue())
	self:FireCall('OnInput', self:GetValue())
	self:FireCall('OnUpdate')
	self:ClearFocus()
end


--[[ API ]]--

function Edit:SetValue(value)
	self.value = value

	if not self:HasFocus() then
		self:SetText(self:GetValue())
	end
end

function Edit:GetValue()
	return self.value
end

function Edit:SetLabel(label)
	self.Label:SetText(label)
end

function Edit:GetLabel()
	return self.Label:GetText()
end

function Edit:SetEnabled(enabled)
	self:Super(Edit):SetEnabled(enabled)
	self:UpdateFonts()
end

function Edit:SetSmall(small)
	self.small = small
	self:UpdateFonts()
end

function Edit:IsSmall()
	return self.small
end

function Edit:UpdateFonts()
	local font = 'GameFont' .. (self:IsEnabled() and '%s' or 'Disable')
	local small = self:IsSmall() and 'Small' or ''

	self.Label:SetFontObject(font:format('Normal') .. small)
	self:SetFontObject(font:format('Highlight') .. 'Small')
end


--[[ Proprieties ]]--

Edit.value = ''
Edit.bottom = 6
Edit.right = 20
Edit.left = 25
Edit.top = 10
