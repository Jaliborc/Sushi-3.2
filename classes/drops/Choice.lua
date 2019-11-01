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

local Choice = LibStub('Sushi-3.1').Labeled:NewSushi('DropChoice', 1, 'Button', 'UIDropDownMenuTemplate', true)
if not Choice then return end


--[[ Construct ]]--

function Choice:Construct()
	local f = self:Super(Choice):Construct()
	f.Label = f:CreateFontString(nil, nil, self.LabelFont)
	f.Label:SetPoint('BOTTOMLEFT', f, 'TOPLEFT', 16, 3)
	f.Button:SetScript('OnClick', function() f:OnClick() end)
	f:SetWidth(150)
	return f
end

function Choice:New(parent, label, value)
	local f = self:Super(Choice):New(parent, label)
	f.choices = {}
	f:SetValue(value)
	return f
end

function Choice:OnClick()
	-- Sushi.Dropdown { }
end


--[[ API ]]--

function Choice:SetValue(value)
	self.value = value
	self:UpdateText()
end

function Choice:GetValue()
	return self.value
end

function Choice:AddChoices(key, text, tip)
	if type(key) == 'table' then
		local info = key
		if info.key then
			tinsert(self.choices, info)
		else
			for i, choice in ipairs(info) do
				tinsert(self.choices, choice)
			end
		end
	elseif key then
		tinsert(self.choices, {key = key, text = text, tip = tip})
	end

	self:UpdateText()
end

function Choice:GetChoices()
	return self.choices
end

function Choice:UpdateText()
	for i, choice in ipairs(self:GetChoices()) do
		if choice.key == self:GetValue() then
			return self.Text:SetText(choice.text or choice.key)
		end
	end

	self.Text:SetText()
end


--[[ Proprieties ]]--

Choice.Add = Choice.AddChoices
Choice.top = 18
