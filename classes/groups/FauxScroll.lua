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

local Scroll = LibStub('Sushi-3.3').Group:NewSushi('FauxScroll', 1, 'Frame', nil, true)
if not Scroll then return end


--[[ Overrides ]]--

function Scroll:Construct()
	local f = self:Super(Scroll):Construct()
	local scroll = CreateFrame('ScrollFrame', '$parentScroll', f, 'FauxScrollFrameTemplate')
	scroll.ScrollBar:Hide()
	scroll:SetPoint('TOPLEFT')
	scroll:SetPoint('BOTTOMRIGHT', -25, 0)
	local bar = CreateFrame('EventFrame', nil, scroll, 'MinimalScrollBar')
	bar:SetPoint('BOTTOMLEFT', scroll, 'BOTTOMRIGHT', 6, 0)
	bar:SetPoint('TOPLEFT', scroll, 'TOPRIGHT', 6, 5)
	bar:SetHideIfUnscrollable(true)
	bar.Track:ClearAllPoints()
	bar.Track:SetAllPoints(bar)
	bar.Forward:Hide()
	bar.Back:Hide()

	ScrollUtil.InitScrollFrameWithScrollBar(scroll, bar)
	scroll:SetScript('OnVerticalScroll', function(scroll, v)
		FauxScrollFrame_OnVerticalScroll(scroll, v, f.entryHeight)
		f:Update()
	end)


	f.Scroll = scroll
	return f
end

function Scroll:New(parent, maxEntries, entryHeight, children)
	local f = self:Super(Scroll):New(parent)
	f.maxEntries, f.entryHeight = maxEntries, entryHeight
	f:SetChildren(children)
	return f
end

function Scroll:Layout()
	FauxScrollFrame_Update(self.Scroll, self.numEntries, self.maxEntries, self.entryHeight)
	self:Super(Scroll):Layout()
end


--[[ State ]]--

function Scroll:First()
	return self:GetOffset() + 1
end

function Scroll:Last()
	return min(self:GetOffset() + self.maxEntries, self.numEntries)
end

function Scroll:GetOffset()
	return FauxScrollFrame_GetOffset(self.Scroll)
end


--[[ Parameters ]]--

function Scroll:SetMaxDisplayed(max)
	self.maxEntries = max
end

function Scroll:GetMaxDisplayed()
	return self.maxEntries
end

function Scroll:SetEntrySize(height)
	self.entryHeight = height
end

function Scroll:GetEntrySize()
	return self.entryHeight
end

function Scroll:SetNumEntries(num)
	self.numEntries = num
end

function Scroll:NumEntries()
	return self.numEntries
end


--[[ Properties ]]--

Scroll.numEntries = 1
Scroll.maxEntries = 10
Scroll.entryHeight = 20
