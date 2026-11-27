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

local Lib = LibStub('Sushi-3.3')
local Scroll = Lib.Scroll:NewSushi('ScrollingOptions', 1, 'Frame')
if not Scroll then return end


--[[ Construct ]]--

function Scroll:New(category, subcategory)
	assert(category, 'First parameter to `ScrollingOptions:New` is not optional')
	return self:CreatePanel(category, subcategory, function(f)
		local title = Lib.Header(f, '', GameFontHighlightHuge, 6)
		title:SetPoint('TOPLEFT', 7, -22)

		f.Title = title
		f:SetAllPoints()
		f:HookScript('OnSizeChanged', function()
			if f:GetWidth() > 0 then
				f.Title:UpdateWidth()
			end
		end)
	end)
end

function Scroll:FitBackdrop()
	self.Scroll.ScrollBar:SetPoint('BOTTOMLEFT', self.Scroll, 'BOTTOMRIGHT', 6, 13)
	self.Scroll.ScrollBar:SetPoint('TOPLEFT', self.Scroll, 'TOPRIGHT', 6, -8)
	self.Scroll:SetPoint('BOTTOMRIGHT', -self.Gutter, -2)
	self.Scroll:SetPoint('TOPLEFT', 0, -51)
end


--[[ API ]]--

function Scroll:SetTitle(title)
	self.title = title
	self.Title:SetText(self.title or '')
end

function Scroll:GetTitle()
	return self.title
end


--[[ Properties ]]--

local Options = Lib.OptionsGroup
Scroll.CreatePanel, Scroll.Open, Scroll.GetCategory = Options.CreatePanel, Options.Open, Options.GetCategory
Scroll.Gutter = 22
