--[[
Copyright 2008-2026 João Cardoso
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

local Sushi = LibStub('Sushi-3.2')
local Choice = Sushi.Labeled:NewSushi('DropChoice', 2, 'DropdownButton', 'WowStyle1DropdownTemplate')
if not Choice then return end


--[[ Construct ]]--

function Choice:Construct()
	local f = self:Super(Choice):Construct()
	f.Label = f:CreateFontString(nil, nil, self.LabelFont)
	f.Label:SetPoint('BOTTOMLEFT', f, 'TOPLEFT', 4, 3)
	f:SetScript('OnClick', f.OnClick)
	f:SetWidth(150)
	return f
end

function Choice:New(parent, label, value)
	local f = self:Super(Choice):New(parent, label)
	f.choices = {}
	f:SetValue(value)
	return f
end


--[[ Events ]]--

function Choice:OnClick()
	if not self.open then
		local anchor = AnchorUtil.CreateAnchor('TOPLEFT', self, 'BOTTOMLEFT', 0, 0)
		local root = MenuUtil.CreateRootMenuDescription(MenuVariants.GetDefaultMenuMixin())
		root:SetMinimumWidth(self:GetWidth())
		
		Menu.PopulateDescription(self.OnPopulate, self, root)
		Menu.GetManager():OpenMenu(self, root, anchor)
	else
		Menu.GetManager():CloseMenus()
	end

	self.open = not self.open
end

function Choice:OnPopulate(drop)
	local getter = function(key) return key == self:GetValue() end
	local setter = function(key)
		self:SetValue(key)
		self:FireCalls('OnValue', key)
		self:FireCalls('OnInput', key)
		self:FireCalls('OnUpdate')
	end

	for i, choice in ipairs(self:GetChoices()) do
		local title = choice.text or choice.key
		local button = drop:CreateRadio(title, getter, setter, choice.key)
		if choice.tip then
			button:SetTitleAndTextTooltip(title, choice.tip)
		end
	end
end


--[[ API ]]--

function Choice:Refresh()
	for i, choice in ipairs(self:GetChoices()) do
		if choice.key == self:GetValue() then
			return self:SetText(choice.text or choice.key)
		end
	end

	self:SetText()
end

function Choice:SetValue(value)
	self.value = value
	self:Refresh()
end

function Choice:GetValue()
	return self.value
end

function Choice:AddChoices(key, text, tip)
	if type(key) == 'table' then
		local data = key
		if data.key then
			tinsert(self.choices, data)
		else
			for i, choice in ipairs(data) do
				if type(choice) == 'table' and choice.key then
					tinsert(self.choices, choice)
				end
			end
		end
	elseif key then
		tinsert(self.choices, {key = key, text = text, tip = tip})
	end

	self:Refresh()
end

function Choice:GetChoices()
	return self.choices
end


--[[ Properties ]]--

Choice.Add = Choice.AddChoices
Choice.top, Choice.left, Choice.bottom = 18, 12, 4

if old == 1 then
	Choice.__frames, Choice.__count = {}, 0
end