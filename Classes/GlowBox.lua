--[[
Copyright 2008-2012 João Cardoso
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

local GlowBox = MakeSushi(1, 'Frame', 'GlowBox', nil, 'GlowBoxTemplate', SushiCallHandler)
if not GlowBox then
	return
end


--[[ Builder ]]--

function GlowBox:OnCreate()
	local arrow = CreateFrame('Frame', '$parentArrow', self, 'GlowBoxArrowTemplate')
	arrow:SetPoint('TOP', self, 'BOTTOM', 4, 0)
	
	local text = self:CreateFontString('$parentText', nil, 'GameFontHighlightLeft')
	text:SetPoint('TOPLEFT', 16, -14)
	text:SetWidth(185)
	
	local close = CreateFrame('Button', '$parentClose', self, 'UIPanelCloseButton')
	close:SetPoint('TOPRIGHT', 6, 5)
	close:SetScript('OnClick', function()
		self:FireCall('OnClose')
		self:Hide()
	end)
	
	self:SetFrameStrata('DIALOG')
	self:EnableMouse(true)
	self.text = text
end


--[[ Methods ]]--

function GlowBox:SetText (text)
	self.text:SetText(text)
	self:SetSize(220, self.text:GetHeight() + 28)
end

function GlowBox:GetText ()
	self.text:GetText()
end