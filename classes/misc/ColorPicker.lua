--[[
Copyright 2008-2019 João Cardoso
Sushi is distributed under the terms of the GNU General Public License(or the Lesser GPL).
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

local Color = LibStub('Sushi-3.1').TextedClickable:NewSushi('ColorPicker', 1, 'Button')
if not Color then	return end


--[[ Overrides ]]--

function Color:Construct()
	local b = self:Super(Color):Construct()
	local text = b:CreateFontString(nil, nil, self.NormalFont)
	text:SetPoint('LEFT', 28, 1)

	local border = b:CreateTexture(nil, 'BORDER')
	border:SetTexture('Interface/ChatFrame/ChatFrameColorSwatch')
	border:SetPoint('LEFT')
	border:SetSize(23, 23)

	local square = b:CreateTexture(nil, 'OVERLAY')
	square:SetTexture('Interface/ChatFrame/ChatFrameColorSwatch')
	square:SetPoint('CENTER', border)
	square:SetSize(19, 19)

	local glow = b:CreateTexture()
	glow:SetTexture('Interface/Buttons/UI-CheckBox-Highlight')
	glow:SetPoint('CENTER', border)
	glow:SetBlendMode('ADD')
	glow:SetSize(21, 23)

	b.Square = square
	b:SetFontString(text)
	b:SetNormalTexture(border)
	b:SetHighlightTexture(glow)
	return b
end

function Color:OnClick()
	local r,g,b,a = self:GetValue()
	local set = function(...)
		self:SetValue(...)
		self:FireCall('OnColorChanged', ...)
		self:FireCall('OnInput', ...)
	end

	ColorPickerFrame.func = function()
		local r,g,b = ColorPickerFrame:GetColorRGB()
		set(r,g,b, 1 - OpacitySliderFrame:GetValue())

		if not ColorPickerFrame:IsVisible() then
			self:FireCall('OnUpdate')
		end
	end

	ColorPickerFrame.opacity = 1 - a
	ColorPickerFrame.hasOpacity = self:HasAlpha()
	ColorPickerFrame.opacityFunc = ColorPickerFrame.func
	ColorPickerFrame.cancelFunc = function() set(r,g,b,a) end
	ColorPickerFrame:SetColorRGB(r,g,b)
	ColorPickerFrame:Show()

	PlaySound(SOUNDKIT.IG_MAINMENU_OPTION_CHECKBOX_ON)
end


--[[ API ]]--

function Color:SetValue(r,g,b,a)
	self.a = a
	self.Square:SetVertexColor(r or 1, g or 1, b or 1)
end

function Color:GetValue()
	local r,g,b = self.Square:GetVertexColor()
	return r,g,b, self.a
end

function Color:EnableAlpha(enable)
	self.hasAlpha = enable
end

function Color:HasAlpha()
	return self.hasAlpha
end


--[[ Proprieties ]]--

Check.NormalFont = 'GameFontHighlight'
Color.SetColor = Color.SetValue
Color.GetColor = Color.GetValue
Check.MinWidth = 150
Check.WidthOff = 28
Check.bottom = 8
Check.right = 10
Check.left = 10
Color.a = 1
