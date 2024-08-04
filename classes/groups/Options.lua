--[[
Copyright 2008-2024 João Cardoso
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

local Group = LibStub('Sushi-3.2').Group:NewSushi('OptionsGroup', 3, 'Frame')
if not Group then return end


--[[ Construct ]]--

-- register addon category
--
-- @param frame               frame with options
-- @param categoryName        name of category
-- @param parentCategoryName  optional. name of parent category
local function RegisterAddOnCategory(frame, categoryName, parentCategoryName)
	-- since df 10.0.0 and wotlkc 3.4.2
	if (Settings) and (Settings.RegisterAddOnCategory) then -- see "\SharedXML\Settings\Blizzard_Deprecated.lua" for df 10.0.0
		-- cancel is no longer a default option. may add menu extension for this.
		frame.OnCommit = frame.okay;
		frame.OnDefault = frame.default;
		frame.OnRefresh = frame.refresh;
		
		if (parentCategoryName) then
			local category = Settings.GetCategory(parentCategoryName);
			local subcategory, layout = Settings.RegisterCanvasLayoutSubcategory(category, frame, categoryName, categoryName);
			subcategory.ID = categoryName;
		else
			local category, layout = Settings.RegisterCanvasLayoutCategory(frame, categoryName, categoryName);
			category.ID = categoryName;
			
			Settings.RegisterAddOnCategory(category);
		end
		
		return;
	end
	
	-- before df 10.0.0
	frame.name = categoryName;
	frame.parent = parentCategoryName;
	
	InterfaceOptions_AddCategory(frame);
end

function Group:Construct()
	local g = self:Super(Group):Construct()
	g.Footer = g:CreateFontString(nil, nil, 'GameFontDisableSmall')
	g.Footer:SetPoint('BOTTOMRIGHT', -4, 4)
	return g
end

function Group:New(category, subcategory)
	assert(category, 'First parameter to `OptionsGroup:New` is not optional')

	local dock = CreateFrame('Frame', nil, SettingsPanel or InterfaceOptionsFrame)
	if subcategory then
		dock.parent, dock.name = type(category) == 'table' and category.name or category, subcategory
	else
		dock.name = category
	end

	local group = self:Super(Group):New(dock)
	group.name, group.title = dock.name, dock.name
	RegisterAddOnCategory(dock, dock.name, dock.parent)
	group.category = dock.parent or dock.name;
	group:SetPoint('BOTTOMRIGHT', -4, 5)
	group:SetPoint('TOPLEFT', 4, -11)
	group:SetFooter(nil)
	group:SetSize(0, 0)
	group:SetCall('OnChildren', function(self)
		if self:GetTitle() then
			self:Add('Header', self:GetTitle(), GameFontNormalLarge)
		end

		if self:GetSubtitle() then
			self:Add('Header', self:GetSubtitle(), GameFontHighlightSmall).bottom = 20
		end
	end)

	dock.default = function() group:FireCalls('OnDefaults')	end
	dock.cancel = function() group:FireCalls('OnCancel') end
	dock.okay = function() group:FireCalls('OnOkay') end
	dock:Hide()

	return group
end


--[[ API ]]--

-- open addon category
--
-- @param categoryName     name of category
-- @param subcategoryName  name of subcategory
local function OpenAddOnCategory(categoryName, subcategoryName)
	-- since df 10.0.0 and wotlkc 3.4.2
	if (Settings) and (Settings.OpenToCategory) then
		-- open category
		for index, tbl in ipairs(SettingsPanel:GetCategoryList().groups) do -- see SettingsPanelMixin:OpenToCategory() in "Blizzard_SettingsPanel.lua"
			local categories = tbl.categories;
			
			for index, category in ipairs(categories) do
				if (category:GetName() == categoryName) then
					Settings.OpenToCategory(category:GetID());
					
					-- scroll to category (see OnSelectionChanged() in "Blizzard_CategoryList.lua"
					local categoryList = SettingsPanel:GetCategoryList();
					local categoryElementData = categoryList:FindCategoryElementData(category)
					
					if (categoryElementData) then
						categoryList.ScrollBox:ScrollToElementData(categoryElementData, ScrollBoxConstants.AlignNearest);
					end
					
					-- open subcategory
					if (subcategoryName) then
						local subCategories = category:GetSubcategories();
						
						for index, subcategory in ipairs(subCategories) do
							if (subcategory:GetName() == subcategoryName) then
								SettingsPanel:SelectCategory(subcategory);
								
								-- scroll to category (see OnSelectionChanged() in "Blizzard_CategoryList.lua"
								local subCategoryElementData = categoryList:FindCategoryElementData(subcategory)
								
								if (subCategoryElementData) then
									categoryList.ScrollBox:ScrollToElementData(subCategoryElementData, ScrollBoxConstants.AlignNearest);
								end
								
								return;
							end
						end
					end
					
					return;
				end
			end
		end
		
		return;
	end
	
	-- before df 10.0.0
	if (not InterfaceOptionsFrame:IsShown()) then
		InterfaceOptionsFrame_Show();
	end
	
	InterfaceOptionsFrame_OpenToCategory(categoryName);
	
	if (subcategoryName) then
		InterfaceOptionsFrame_OpenToCategory(subcategoryName);
	end
end

function Group:Open()
	OpenAddOnCategory(self.category);
end

function Group:SetTitle(title)
	self.title = title
end

function Group:GetTitle()
	return self.title
end

function Group:SetSubtitle(subtitle)
	self.subtitle = subtitle
end

function Group:GetSubtitle()
	return self.subtitle
end

function Group:SetFooter(footer)
	self.Footer:SetText(footer)
end

function Group:GetFooter()
	return self.Footer:GetText()
end
