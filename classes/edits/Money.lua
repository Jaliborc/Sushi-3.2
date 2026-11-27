--[[
Copyright 2008-2026 João Cardoso
Sushi is distributed under the terms of the GNU General Public License (or the Lesser GPL).
This file is part of Sushi.

Sushi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Sushi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Sushi. If not, see <http://www.gnu.org/licenses/>.
--]]

local MoneyEdit = LibStub('Sushi-3.3').Callable:NewSushi('MoneyEdit', 1, 'Frame')
if not MoneyEdit then return end


--[[ Construct ]]--

function MoneyEdit:Construct()
	local f = self:Super(MoneyEdit):Construct()
	local gold = f:CreateBox('Gold', GOLD_AMOUNT_SYMBOL)
	local silver = f:CreateBox('Silver', SILVER_AMOUNT_SYMBOL, gold)
	local copper = f:CreateBox('Copper', COPPER_AMOUNT_SYMBOL, silver)

	gold.Next, silver.Next, copper.Next = silver, copper, gold
	gold.Previous, silver.Previous, copper.Previous = copper, gold, silver
	f.Gold, f.Silver, f.Copper = gold, silver, copper
	
	f:SetScript('OnShow', f.UpdateSymbols)
	f:SetScript('OnEvent', f.OnEvent)
	f:OnEvent(nil, 'colorblindmode')
	f:RegisterEvent('CVAR_UPDATE')
	f:SetSize(193, 20)
	return f
end

function MoneyEdit:CreateBox(coin, symbol, previous)
	local box = CreateFrame('EditBox', nil, self, 'InputBoxTemplate')
	box:SetScript('OnEscapePressed', function(box) self:OnEscapePressed(box) end)
	box:SetScript('OnEnterPressed', function(box) self:OnEnterPressed(box) end)
	box:SetScript('OnTabPressed', function(box) self:OnTabPressed(box) end)
	box:SetJustifyH('RIGHT')
	box:SetAutoFocus(false)
	box:SetNumeric(true)

	if previous then
		box:SetPoint('LEFT', previous.Icon, 'RIGHT', 10, 0)
		box:SetMaxLetters(2)
		box:SetSize(24, 20)
	else
		box:SetPoint('LEFT', 5, 0)
		box:SetSize(72, 20)
	end

	local icon = box:CreateTexture(nil, 'ARTWORK')
	icon:SetTexture('Interface/MoneyFrame/UI-' .. coin .. 'Icon')
	icon:SetSize(14, 14)
	icon:SetPoint('LEFT', box, 'RIGHT', 2, 0)

	local symbol = box:CreateFontString(nil, 'OVERLAY', 'GameFontHighlightSmall')
	symbol:SetPoint('CENTER', icon)
	symbol:SetText(symbol)

	box.Symbol = symbol
	box.Icon = icon
	return box
end

function MoneyEdit:New(parent, value)
	local f = self:Super(MoneyEdit):New(parent)
	f:SetValue(value)
	return f
end

function MoneyEdit:Reset()
	self:SetEnabled(true)
	self.Gold:ClearFocus()
	self.Silver:ClearFocus()
	self.Copper:ClearFocus()
	self:Super(MoneyEdit):Reset()
end


--[[ Events ]]--

function MoneyEdit:OnEvent(_, name)
	if name and name:lower() == 'colorblindmode' then
		local enabled = GetCVarBool('colorblindMode')

		for _, box in ipairs({self.Gold, self.Silver, self.Copper}) do
			box.Icon:SetShown(not enabled)
			box.Symbol:SetShown(enabled)
		end
	end
end

function MoneyEdit:OnTabPressed(box)
	local next = IsShiftKeyDown() and box.Previous or box.Next
	next:SetFocus()
	next:HighlightText()
end

function MoneyEdit:OnEnterPressed(box)
	box:ClearFocus()

	local value = self:GetInput()
	self:SetValue(value)
	self:FireCalls('OnText', value)
	self:FireCalls('OnInput', value)
	self:FireCalls('OnUpdate')
end

function MoneyEdit:OnEscapePressed(box)
	box:ClearFocus()
	self:SetValue(self:GetValue())
end


--[[ API ]]--

function MoneyEdit:SetValue(value)
	self.value = max(0, floor(value or 0))

	if not self:HasFocus() then
		self.Gold:SetNumber(floor(self.value / 10000))
		self.Silver:SetNumber(floor(self.value / 100) % 100)
		self.Copper:SetNumber(self.value % 100)
	end
end

function MoneyEdit:GetValue()
	return self.value
end

function MoneyEdit:GetInput()
	return self.Gold:GetNumber() * 10000 + self.Silver:GetNumber() * 100 + self.Copper:GetNumber()
end

function MoneyEdit:SetEnabled(enabled)
	self.Gold:SetEnabled(enabled)
	self.Silver:SetEnabled(enabled)
	self.Copper:SetEnabled(enabled)
end

function MoneyEdit:IsEnabled()
	return self.Gold:IsEnabled() or self.Silver:IsEnabled() or self.Copper:IsEnabled()
end

function MoneyEdit:HasFocus()
	return self.Gold:HasFocus() or self.Silver:HasFocus() or self.Copper:HasFocus()
end


--[[ Properties ]]--

MoneyEdit.SetCopper = MoneyEdit.SetValue
MoneyEdit.GetCopper = MoneyEdit.GetValue
MoneyEdit.value, MoneyEdit.bottom = 0,6