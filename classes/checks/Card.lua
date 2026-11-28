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
local CardCheck = Lib.Clickable:NewSushi('CardCheck', 1, 'CheckButton')
if not CardCheck then return end


--[[ Construct ]]--

function CardCheck:Construct()
	local b = self:Super(CardCheck):Construct()

	local light = b:CreateRect(b, 'BACKGROUND', 1, 1, 1, 1)
	light:SetGradient('HORIZONTAL', CreateColor(1, 0.82, 0, 0.16), CreateColor(1, 0.82, 0, 0))
	light:SetAllPoints(b)

	local wash = b:CreateRect(b, 'BACKGROUND', 1, 1, 1, 0.06)
	wash:SetAllPoints(b)
	wash:Hide()

	local art = Lib.Canvas(b)
	art:SetBackdrop(b.ArtBackdrop)

	local check = Lib.Check(b, '')
	check:SetSize(26, 26)
	check:EnableMouse(false)

	local title = b:CreateFontString(nil, 'ARTWORK', 'GameFontNormalLarge')

	local text = b:CreateFontString(nil, 'ARTWORK', 'GameFontHighlightSmall')
	text:SetTextColor(0.82, 0.82, 0.82)
	text:SetJustifyV('TOP')

	b.Check = check
	b.Light, b.Wash = light, wash
	b.Art, b.Title, b.Text = art, title, text
	b:SetFontString(title)
	b:SetScript('OnSizeChanged', b.OnSizeChanged)
	b:SetScript('OnDisable', b.UpdateState)
	b:SetScript('OnEnable', b.UpdateState)
	return b
end

function CardCheck:New(parent, title, text, art, checked, orientation)
	local b = self:Super(CardCheck):New(parent)
	b.orientation = orientation or self.orientation
	b.Art:SetSize(b.Art.Size, b.Art.Size)
	b.Wash:Hide()
	b:SetWidth(b.orientation == 'VERTICAL' and 160 or 320)
	b:SetText(title or '')
	b:SetDescription(text)
	b:SetArt(art)
	b:SetChecked(checked)
	return b
end


--[[ Events ]]--

function CardCheck:OnEnter()
	self:Super(CardCheck):OnEnter()
	self.Wash:Show()
	self:UpdateState()
end

function CardCheck:OnLeave()
	self:Super(CardCheck):OnLeave()
	self.Wash:Hide()
	self:UpdateState()
end

function CardCheck:OnClick(mouse)
	self:SetChecked(self:GetChecked())
	self:FireCalls('OnCheck', mouse, self:GetChecked())
	self:Super(CardCheck):OnClick(mouse)
end

function CardCheck:OnSizeChanged(width)
	if self.layoutWidth ~= width then
		self:Layout()
	end
end


--[[ API ]]--

function CardCheck:SetChecked(checked)
	self:Super(CardCheck):SetChecked(checked)
	self.Check:SetChecked(checked)
	self:UpdateState()
end

function CardCheck:SetText(text)
	self:Super(CardCheck):SetText(text)
	self:Layout()
end

function CardCheck:SetDescription(text)
	self.Text:SetText(text or '')
	self:Layout()
end

function CardCheck:GetDescription()
	return self.Text:GetText()
end

function CardCheck:SetArt(art)
	self.Art:SetSource(art)
	self:Layout()
end

function CardCheck:GetArt()
	return self.Art:GetSource()
end


--[[ Orientation ]]--

function CardCheck:SetOrientation(orientation)
	self.orientation = orientation
	self:Layout()
end

function CardCheck:GetOrientation()
	return self.orientation
end


--[[ Update ]]--

function CardCheck:UpdateState()
	local checked = self:GetChecked()
	local alpha = (checked and 1) or (self.Wash:IsShown() and 0.85) or 0.55

	self.Title:SetTextColor(checked and 1 or .7, checked and .82 or .7, checked and 0 or .7)
	self.Art:SetDesaturation(checked and 0 or 1)
	self.Check:SetShown(checked)
	self.Light:SetShown(checked)
	self.Art:SetAlpha(alpha)
	self.Check:SetAlpha(alpha)
	self.Title:SetAlpha(alpha)
	self.Text:SetAlpha(alpha)
end


--[[ Layout ]]--

function CardCheck:Layout()
	local width = self:GetWidth()
	local artWidth, artHeight = self.Art:GetSize()
	local checkWidth, checkHeight = self.Check:GetSize()
	local vertical = self:GetOrientation() == 'VERTICAL'
	local words = width - self.Padding * 2
	if not vertical then
		words = words - artWidth - self.Gap * 2 - checkWidth
	end

	self.layoutWidth = width
	self.Art:ClearAllPoints()
	self.Check:ClearAllPoints()
	self.Title:ClearAllPoints()
	self.Text:ClearAllPoints()

	self.Title:SetJustifyH(vertical and 'CENTER' or 'LEFT')
	self.Text:SetJustifyH(vertical and 'CENTER' or 'LEFT')
	self.Title:SetWidth(math.max(40, words))
	self.Text:SetWidth(math.max(40, words))
	self.Text:SetPoint('TOPLEFT', self.Title, 'BOTTOMLEFT', 0, -3)

	local wordsHeight = self.Title:GetStringHeight() + 3 + self.Text:GetStringHeight()
	local contentHeight

	if vertical then
		self.Art:SetPoint('TOP', 0, -8)
		self.Title:SetPoint('TOP', self.Art, 'BOTTOM', 0, -self.Gap)
		self.Check:SetPoint('BOTTOM', 0, 8)
		contentHeight = artHeight + wordsHeight + checkHeight + self.Gap * 2
	else
		contentHeight = math.max(artHeight, wordsHeight, checkHeight)
		self.Art:SetPoint('LEFT', self.Padding, 0)
		self.Check:SetPoint('RIGHT', -self.Padding, 0)
		self.Title:SetPoint('TOPLEFT', self.Padding + artWidth + self.Gap, -8 - math.floor((contentHeight - wordsHeight) / 2))
	end

	self:SetHeight(math.floor(contentHeight + 16 + 0.5))
	self:FireCalls('OnResize')
end


--[[ Helpers ]]--

function CardCheck:CreateRect(parent, layer, r, g, b, a)
	local texture = parent:CreateTexture(nil, layer)
	texture:SetColorTexture(r, g, b, a or 1)
	return texture
end


--[[ Properties ]]--

CardCheck.left, CardCheck.right = 3, 3
CardCheck.orientation = 'HORIZONTAL'
CardCheck.Gap = 14
CardCheck.Padding = 12
CardCheck.SetLabel, CardCheck.GetLabel = CardCheck.SetText, CardCheck.GetText
CardCheck.SetValue, CardCheck.GetValue = CardCheck.SetChecked, CardCheck.GetChecked
CardCheck.ArtBackdrop = {
	bgFile = [[Interface\Buttons\WHITE8X8]],
	edgeFile = [[Interface\Tooltips\UI-Tooltip-Border]],
	tile = true, tileSize = 16, edgeSize = 10,
	insets = { left = 2, right = 2, top = 2, bottom = 2 },
	edgeColor = CreateColor(0.5, 0.5, 0.5, 1),
	color = CreateColor(0, 0, 0, 0.55),
}
