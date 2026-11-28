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
	b:SetScript('OnSizeChanged', b.Layout)
	b:SetScript('OnDisable', b.UpdateState)
	b:SetScript('OnEnable', b.UpdateState)
	return b
end

function CardCheck:CreateRect(parent, layer, r, g, b, a)
	local texture = parent:CreateTexture(nil, layer)
	texture:SetColorTexture(r, g, b, a or 1)
	return texture
end

function CardCheck:New(parent, title, text, art, checked, orientation)
	local b = self:Super(CardCheck):New(parent)
	b:SetOrientation(orientation)
	b:SetWidth(b.orientation == 'VERTICAL' and 160 or 320)
	b:SetText(title or '')
	b:SetDescription(text)
	b:SetChecked(checked)
	b:SetArt(art)
	return b
end


--[[ Events ]]--

function CardCheck:OnEnter()
	self:Super(CardCheck):OnEnter()
	self:UpdateState()
	self.Wash:Show()
end

function CardCheck:OnLeave()
	self:Super(CardCheck):OnLeave()
	self:UpdateState()
	self.Wash:Hide()
end

function CardCheck:OnClick(mouse)
	self:SetChecked(self:GetChecked())
	self:FireCalls('OnCheck', mouse, self:GetChecked())
	self:Super(CardCheck):OnClick(mouse)
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
	self.Check:SetAlpha(alpha)
	self.Title:SetAlpha(alpha)
	self.Text:SetAlpha(alpha)
end

function CardCheck:Layout()
	local width = self:GetWidth()
	local artWidth, artHeight = self.Art:GetSize()
	local checkWidth, checkHeight = self.Check:GetSize()
	local isVertical = self:GetOrientation() == 'VERTICAL'
	local words = width - 24
	if not isVertical then
		words = words - artWidth - 14 * 2 - checkWidth
	end

	self.Title:SetWidth(max(40, words))
	self.Title:SetJustifyH(isVertical and 'CENTER' or 'LEFT')
	self.Text:SetJustifyH(isVertical and 'CENTER' or 'LEFT')
	self.Text:SetPoint('TOPLEFT', self.Title, 'BOTTOMLEFT', 0, -3)
	self.Text:SetWidth(max(40, words))

	self.Title:ClearAllPoints()
	self.Check:ClearAllPoints()
	self.Art:ClearAllPoints()

	local textHeight = self.Title:GetStringHeight() + 3 + self.Text:GetStringHeight()
	local height = isVertical and
	               artHeight + textHeight + checkHeight + 14 or
				   math.max(artHeight, textHeight, checkHeight)

	if isVertical then
		self.Title:SetPoint('TOP', self.Art, 'BOTTOM', 0, -14)
		self.Check:SetPoint('BOTTOM', 0, 6)
		self.Art:SetPoint('TOP', 0, -8)
	else
		self.Title:SetPoint('TOPLEFT', artWidth + 26, -floor((height - textHeight) / 2 + 8), 0)
		self.Check:SetPoint('RIGHT', -12, 0)
		self.Art:SetPoint('LEFT', 12, 0)
	end

	self:SetHeight(floor(height + 17))
	self:FireCalls('OnResize')
end


--[[ Properties ]]--

CardCheck.orientation = 'HORIZONTAL'
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
