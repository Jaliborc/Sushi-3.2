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

local Lib = LibStub('Sushi-3.2')
local Group = Lib.Scroll:NewSushi('ScrollingOptions', 1, 'Frame')
if not Group then return end


--[[ Construct ]]--

function Group:New(category, subcategory)
	assert(category, 'First parameter to `ScrollingOptions:New` is not optional')

	local dock = CreateFrame('Frame', nil, SettingsPanel)
	local group = self:Super(Group):New(dock)
	group.Title = Lib.Header(group, '', GameFontHighlightHuge, 6)
	group.Title:SetPoint('TOPLEFT', 7, -22)
	group:SetTitle(subcategory or category)
	group:SetAllPoints()
	group:HookScript('OnSizeChanged', function()
		if group:GetWidth() > 0 then
			group.Title:UpdateWidth()
		end
	end)

	dock.OnRefresh = function() group:FireCalls('OnRefresh') end
	dock.OnDefault = function() group:FireCalls('OnDefaults') end
	dock.OnCancel = function() group:FireCalls('OnCancel') end
	dock.OnCommit = function() group:FireCalls('OnOkay') end
	dock:Hide()

	Settings.RegisterAddOnCategory(subcategory and
		Settings.RegisterCanvasLayoutSubcategory(Group.GetCategory(category), dock, group.title) or
		Settings.RegisterCanvasLayoutCategory(dock, group.title))

	return group
end

function Group:FitBackdrop()
	self.Scroll.ScrollBar:SetPoint('BOTTOMLEFT', self.Scroll, 'BOTTOMRIGHT', 6, 13)
	self.Scroll.ScrollBar:SetPoint('TOPLEFT', self.Scroll, 'TOPRIGHT', 6, -8)
	self.Scroll:SetPoint('BOTTOMRIGHT', -self.Gutter, -2)
	self.Scroll:SetPoint('TOPLEFT', 0, -51)
end


--[[ API ]]--

function Group:Open()
	local category = self:GetCategory()
	SettingsPanel:Show()
	SettingsPanel:SelectCategory(category)
	category.expanded = true -- force subcategory expansion
	SettingsPanel.CategoryList:CreateCategories()
end

function Group:SetTitle(title)
	self.title = title
	self.Title:SetText(title or '')
end

function Group:GetTitle()
	return self.title
end


--[[ Blizzard Workaround ]]--

function Group.GetCategory(query)
	for category, layout in pairs(SettingsPanel.categoryLayouts) do
		if category == query or category:GetName() == query or DoesAncestryInclude(layout.frame, query) then
			return category
		end
	end
end


Group.Gutter = 22