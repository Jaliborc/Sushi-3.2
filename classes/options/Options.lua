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

local Options = LibStub('Sushi-3.3').Group:NewSushi('OptionsGroup', 1, 'Frame')
if not Options then return end


--[[ Construct ]]--

function Options:New(category, subcategory)
	assert(category, 'First parameter to `OptionsGroup:New` is not optional')
	return self:CreatePanel(category, subcategory, function(f)
		f.Footer = f:CreateFontString(nil, nil, 'GameFontDisableSmall')
		f.Footer:SetPoint('BOTTOMRIGHT', -4, 4)

		f:SetFooter(nil)
		f:SetPoint('BOTTOMRIGHT', -4, 5)
		f:SetPoint('TOPLEFT', 4, -11)
		f:SetCall('OnChildren', function(f)
			if f:GetTitle() then
				f:Add('Header', f:GetTitle(), GameFontNormalLarge)
			end

			if f:GetSubtitle() then
				f:Add('Header', f:GetSubtitle(), GameFontHighlightSmall).bottom = 20
			end
		end)
	end)
end

function Options:CreatePanel(category, subcategory, callback)
	local dock = CreateFrame('Frame', nil, SettingsPanel)
	local frame = self:Super(self):New(dock)
	local title = subcategory or category

	dock.OnRefresh = function() frame:FireCalls('OnRefresh') end
	dock.OnDefault = function() frame:FireCalls('OnDefaults') end
	dock.OnCancel = function() frame:FireCalls('OnCancel') end
	dock.OnCommit = function() frame:FireCalls('OnOkay') end
	dock:Hide()

	callback(frame)
	frame:SetTitle(title)

	Settings.RegisterAddOnCategory(subcategory and
		Settings.RegisterCanvasLayoutSubcategory(self.GetCategory(category), dock, title) or
		Settings.RegisterCanvasLayoutCategory(dock, title))

	return frame
end


--[[ API ]]--

function Options:SetTitle(title)
	self.title = title
end

function Options:GetTitle()
	return self.title
end

function Options:SetSubtitle(subtitle)
	self.subtitle = subtitle
end

function Options:GetSubtitle()
	return self.subtitle
end

function Options:SetFooter(footer)
	self.Footer:SetText(footer)
end

function Options:GetFooter()
	return self.Footer:GetText()
end


--[[ Blizzard Workarounds ]]--

function Options:Open()
	local category = self:GetCategory()
	SettingsPanel:Show()
	SettingsPanel:SelectCategory(category)
	category.expanded = true -- force subcategory expansion
	SettingsPanel.CategoryList:CreateCategories()
end

function Options.GetCategory(query)
	for category, layout in pairs(SettingsPanel.categoryLayouts) do
		if category == query or category:GetName() == query or (type(query) ~= 'string' and DoesAncestryInclude(layout.frame, query)) then
			return category
		end
	end
end