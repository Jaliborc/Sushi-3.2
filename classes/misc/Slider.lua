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

local Slider = LibStub('Sushi-3.1').TipOwner:NewSushi('Slider', 1, 'Slider', 'OptionsSliderTemplate', true)
if not Slider then return end

local TestString = Slider.TestString or UIParent:CreateFontString()
TestString:SetFontObject('GameFontHighlightSmall')


--[[ Factory ]]--

function Slider:New(value, low, high, step, pattern)
	local slider = self:Super(Slider):New()
	slider:SetPattern(pattern or '%s')
	slider:SetRange(low or 1, high or 100)
	slider:SetValue(value or 1)
	slider:SetStep(step or 1)
	slider:UpdateFonts()
	return slider
end

function Slider:Construct()
	local slider = self:Super(Slider):Construct()
	local name = slider:GetName()

	local editBox = CreateFrame('EditBox', nil, slider)
	editBox:SetScript('OnTextChanged', function() slider:UpdateEditWidth() end)
	editBox:SetScript('OnEnter', function() slider:OnEnter() end)
	editBox:SetScript('OnLeave', function() slider:OnLeave() end)
	editBox:SetScript('OnEscapePressed', slider.OnEscapePressed)
	editBox:SetScript('OnEnterPressed', slider.OnEnterPressed)
	editBox:SetJustifyH('CENTER')
	editBox:SetAutoFocus(false)
	editBox:SetHeight(18)

	local editBG = CreateFrame('Frame', nil, editBox)
	editBG:SetPoint('TOP', slider, 'BOTTOM', 0, 3)
	editBG:SetHeight(18)
	editBG:SetBackdrop({
		bgFile = 'Interface/Tooltips/UI-Tooltip-Background',
		edgeFile = 'Interface/Tooltips/UI-Tooltip-Border',
		insets = {left = 2, right = 2, top = 2, bottom = 2},
		edgeSize = 11,
	})
	editBG:SetBackdropBorderColor(0,0,0, 0.3)
	editBG:SetBackdropColor(0,0,0, 0.25)

	local prefix = editBox:CreateFontString()
	prefix:SetPoint('LEFT', editBG, 3, 0)
	prefix:SetFontObject(GameFontHighlightSmall)

	local suffix = editBox:CreateFontString()
	suffix:SetPoint('RIGHT', editBG, -3, 0)
	suffix:SetFontObject(GameFontHighlightSmall)

	slider.EditBox, slider.EditBG, slider.Suffix, slider.Prefix = editBox, editBG, suffix, prefix
	slider.Label slider.High, slider.Low = _G[name .. 'Text'], _G[name .. 'High'], _G[name .. 'Low']
	slider.High:SetPoint('TOPRIGHT', slider, 'BOTTOMRIGHT', 0, 1)
	slider.Low:SetPoint('TOPLEFT', slider, 'BOTTOMLEFT', 0, 1)
	slider.Label:SetPoint('BOTTOM',  slider, 'TOP')

	slider:SetScript('OnValueChanged', slider.OnValueChanged)
	slider:SetScript('OnShow', slider.UpdateEditBackground)
	slider:SetScript('OnMouseWheel', slider.OnMouseWheel)
	slider:SetScript('OnHide', slider.StopUpdate)
	slider:EnableMouseWheel(true)
	return slider
end

function Slider:Reset()
	self.valueText, self.lowText, self.highText, self.disabled, self.small = nil
	self:Super(Slider):Reset()
	self:SetWidth(144)
	self:SetLabel(nil)
end


--[[ Slider Events ]]--

function Slider:OnValueChanged(value, dragged)
	if dragged then
		self:SetScript('OnUpdate', self.OnDelayedUpdate)
		self:SetValue(value)
	end
end

function Slider:OnMouseWheel(direction)
	self:SetValue(self:GetValue() + self:GetValueStep() * direction, true)
end

function Slider:OnEnter()
	self:Super(Slider):OnEnter()
	self:UpdateEditBackground()
end

function Slider:OnLeave()
	self:Super(Slider):OnLeave()
	self:UpdateEditBackground()
end


--[[ Update ]]--

function Slider:OnDelayedUpdate()
	if not IsMouseButtonDown() then
		self:Update()
	end
end

function Slider:Update()
	self:StopUpdate()
	self:FireCall('OnUpdate')
end

function Slider:StopUpdate()
	self:SetScript('OnUpdate', nil)
end


--[[ Editbox ]]--

function Slider:OnEnterPressed()
	local value = tonumber(self:GetText():gsub(',', '.'), nil) --2º arg required!
	if value then
		self:GetParent():SetValue(value, true)
	end
	self:ClearFocus()
end

function Slider:OnEscapePressed()
	self:GetParent():UpdateValueText()
	self:ClearFocus()
end

function Slider:UpdateEditWidth()
	local low = self.Low:GetWidth()
	local high = self.High:GetWidth()
	local prefix = self.Prefix:GetWidth()
	local suffix = self.Suffix:GetWidth()

	TestString:SetText(self.EditBox:GetText())
	local width = TestString:GetStringWidth()
	local maxWidth = self:GetWidth() - max(low, high) * 2
	local off = prefix + suffix + 6

	self.EditBG:SetWidth(max(min(width + off, maxWidth), 15))
	self.EditBox:SetPoint('TOP', self.EditBG, (prefix - suffix) / 2, 0)
	self.EditBox:SetWidth(min(width + 15, maxWidth - off))
end

function Slider:UpdateEditBackground(focusLost)
	local focus = GetMouseFocus()
	local hasFocus = (focus == self or focus == self.EditBox) or (self.EditBox:HasFocus() and not focusLost)

	self.EditBG:SetShown(hasFocus and not self.valueText and self:IsEnabled())
end


--[[ Value ]]--

function Slider:SetValue(value, update)
	local minV, maxV = self:GetRange()
	local maxStep, minStep = self:GetStep()

	local step = minStep or maxStep
	local value = floor(max(min(value, maxV), minV) / step + 0.5) * step

	if self.value ~= value then
		self.value = value
		self:Super(Slider):SetValue(value)
		self:UpdateValueText()

		self:FireCall('OnValueChanged', value)
		self:FireCall('OnInput', value)

		if update then
			self:Update()
		end
	end
end

function Slider:GetValue()
	return self.value
end


--[[ Value Text ]]--

function Slider:SetValueText(text)
	self.valueText = text
	self:UpdateValueText()

	if text then
		self.EditBox:SetCursorPosition(0)
	end
end

function Slider:UpdateValueText()
	self.EditBox:SetText(self:GetValueText() or self:GetValue())
end

function Slider:GetValueText()
	return self.valueText
end


--[[ Range ]]--

function Slider:SetRange(min, max)
	self:SetMinMaxValues(min, max)
	self:UpdateRangeText()
end

function Slider:SetRangeText(low, high)
	self.lowText, self.highText = low, high
	self:UpdateRangeText()
end

function Slider:UpdateRangeText()
	local minText, maxText = self:GetRangeText()
	local min, max = self:GetRange()

	self.High:SetText(maxText or max)
	self.Low:SetText(minText or min)
	self:UpdateEditWidth()
end

function Slider:GetRangeText()
	return self.lowText, self.highText
end


--[[ Step ]]--

function Slider:SetStep(step, minStep)
	self.step, self.minStep = step, minStep
	self:SetValueStep(step)
	self:UpdateValueText()
end

function Slider:GetStep()
	return self.step, self.minStep
end


--[[ Pattern ]]--

function Slider:SetPattern(pattern)
	local prefix, suffix = strmatch(pattern, '(.*)%%s(.*)')

	self.pattern = pattern
	self.Prefix:SetText(prefix)
	self.Suffix:SetText(suffix)
	self:UpdateEditWidth()
end

function Slider:GetPattern()
	return self.pattern
end


--[[ Label ]]--

function Slider:SetLabel(label)
	self.Label:SetText(label)
end

function Slider:GetLabel()
	return self.Label:GetText()
end


--[[ Font ]]--

function Slider:SetEnabled(enabled)
	if not enabled then
		self.EditBox:ClearFocus()
	end

	self:Super(Slider):SetEnabled(enabled)
	self:UpdateFonts()
end

function Slider:SetSmall(small)
	self.small = small
	self:UpdateFonts()
end

function Slider:IsSmall()
	return self.small
end

function Slider:UpdateFonts()
	local small = self:IsSmall() and 'Small' or ''
	local label = self:IsEnabled() and 'GameFont%s' or 'GameFontDisable'
	local bottom = label:format('Highlight') .. 'Small'

	self.Label:SetFontObject(label:format('Normal') .. small)
	self.EditBox:SetFontObject(bottom)
	self.High:SetFontObject(bottom)
	self.Low:SetFontObject(bottom)
end


--[[ Finish ]]--

Slider.GetRange = Slider.GetMinMaxValues
Slider.SetText = Slider.SetLabel
Slider.GetText = Slider.GetLabel
Slider.TestString = TestString
Slider.bottom = 7
Slider.right = 16
Slider.left = 14
Slider.top = 17
