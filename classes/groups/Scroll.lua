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
local Scroll = Lib.Group:NewSushi('Scroll', 1, 'Frame')
if not Scroll then return end


--[[ Construct ]]--

function Scroll:Construct()
	local f = self:Super(Scroll):Construct()
	local scroll = CreateFrame('ScrollFrame', nil, f)
	scroll:EnableMouseWheel(true)
	scroll:Show()

	local content = CreateFrame('Frame', nil, scroll)
	local bar = CreateFrame('EventFrame', nil, scroll, 'MinimalScrollBar')
	bar:SetPoint('BOTTOMLEFT', scroll, 'BOTTOMRIGHT', 6, 5)
	bar:SetPoint('TOPLEFT', scroll, 'TOPRIGHT', 6, 0)
	bar:SetHideIfUnscrollable(true)
	bar.Track:ClearAllPoints()
	bar.Track:SetAllPoints(bar)
	bar.Forward:Hide()
	bar.Back:Hide()

	scroll.ScrollBar = bar
	scroll:SetScrollChild(content)
	scroll:HookScript('OnVerticalScroll', function(_, offset)
		f:FireCalls('OnScroll', offset)
	end)

	ScrollUtil.InitScrollFrameWithScrollBar(scroll, bar)

	f.ScrollFrame, f.Content = scroll, content
	f:SetScrollStep(f.ScrollStep)
	f:FitBackdrop()
	return f
end

function Scroll:Reset()
	self:Super(Scroll):Reset()
	self.ScrollFrame:SetVerticalScroll(0)
end


--[[ Overrides ]]--

function Scroll:UpdateChildren(force)
	self:Super(Scroll):UpdateChildren(force)
	self.ScrollFrame:SetVerticalScroll(0)
end

function Scroll:GetLimit()
	local limit = self:Super(Scroll):GetLimit()
	if limit and self:GetOrientation() == 'HORIZONTAL' then
		return max(0, limit - self.Gutter)
	end
	return nil
end

function Scroll:GetContent()
	return self.Content
end

function Scroll:SetBackdrop(template)
	self:Super(Scroll):SetBackdrop(template)
	self:FitBackdrop()
end


--[[ API ]]--

function Scroll:ScrollTo(value)
	self.ScrollFrame:SetVerticalScroll(value)
end

function Scroll:GetScroll()
	return self.ScrollFrame:GetVerticalScroll() or 0
end

function Scroll:GetScrollRange()
	return self.ScrollFrame:GetVerticalScrollRange() or 0
end

function Scroll:SetScrollStep(step)
	self.ScrollFrame:SetPanExtent(step)

	local range = self.ScrollFrame:GetVerticalScrollRange()
	if range > 0 then
		self.ScrollFrame.ScrollBar:SetPanExtentPercentage(min(step / range, 1))
	end
end

function Scroll:GetScrollStep()
	return self.ScrollFrame:GetPanExtent() or self.ScrollStep
end

function Scroll:FitBackdrop()
	local region = self:GetBackdropRegion()

	self.ScrollFrame:ClearAllPoints()
	self.ScrollFrame:SetPoint('TOPLEFT', region, 'TOPLEFT')
	self.ScrollFrame:SetPoint('BOTTOMRIGHT', region, 'BOTTOMRIGHT', -self.Gutter, 0)
end


--[[ Properties ]]--

Scroll.OnSizeChanged = Scroll.Layout
Scroll.Update = Scroll.UpdateChildren
Scroll.ScrollStep = 30
Scroll.Gutter = 14