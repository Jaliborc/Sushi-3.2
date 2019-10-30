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

local Sushi = LibStub('Sushi-3.1')
local Slider = Sushi.TipOwner:NewSushi('Slider', 1, 'Slider', 'OptionsSliderTemplate', true)
if not Slider then return end


--[[ Construct ]]--

function Slider:Construct()
	local f = self:Super(Slider):Construct()
	local name = f:GetName()

	local edit = Sushi.DarkEdit(f)
	edit.OnEnter = function() f:OnEnter() end
	edit.OnLeave = function() f:OnLeave() end

	f.Edit, f.Bg, f.Suffix, f.Prefix = edit, bg, suffix, prefix
	f.Label f.High, f.Low = _G[name .. 'Text'], _G[name .. 'High'], _G[name .. 'Low']
	f.High:SetPoint('TOPRIGHT', f, 'BOTTOMRIGHT', 0, 1)
	f.Low:SetPoint('TOPLEFT', f, 'BOTTOMLEFT', 0, 1)
	f.Label:SetPoint('BOTTOM',  f, 'TOP')

	f:SetScript('OnValueChanged', f.OnValueChanged)
	f:SetScript('OnMouseWheel', f.OnMouseWheel)
	f:EnableMouseWheel(true)
	return f
end

function Slider:New(parent, label, value, low, high, step)
	local f = self:Super(Slider):New()
	--[[f:SetRange(low or 1, high or 100)
	f:SetValue(value or 1)
	f:SetStep(step or 1)
	f:SetPattern('%s')
	f:SetLabel(label)
	f:UpdateFonts()]]--
	return f
end


--[[ Proprieties ]]--

Slider.top, Slider.bottom, Slider.left, Slider.right = 17, 7, 14, 16
Slider.GetRange = Slider.GetMinMaxValues
Slider.SetText = Slider.SetLabel
Slider.GetText = Slider.GetLabel
