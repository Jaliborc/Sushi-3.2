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

local Sushi = LibStub('Sushi-3.2')
local Box = Sushi.Callable:NewSushi('Glowbox', 3, 'Frame', 'GlowBoxTemplate', true)
if Box then Sushi.HelpTip = Box else return end

local Sides = {'BOTTOM', 'LEFT', 'TOP', 'RIGHT'}
local function GetOpposite(i)
	local direction = ceil(i / 2) % 2 * 2 - 1
	return Sides[i + direction * 2], direction
end

local function RotateTexture(texture, i)
	texture:SetAllPoints()
	SetClampedTextureRotation(texture, (i-1) * 90)
end


--[[ Construct ]]--

function Box:Construct()
	local f = self:Super(Box):Construct()
	local text = f:CreateFontString(nil, nil, 'GameFontHighlightLeft')
	text:SetPoint('TOPLEFT', 15, -15)
	text:SetWidth(200)
	text:SetSpacing(4)

	local close = CreateFrame('Button', nil, f, 'UIPanelCloseButton')
	close:SetPoint('TOPRIGHT', 6, 5)
	close:SetScript('OnClick', function()
		f:FireCalls('OnClose')
		f:Hide()
	end)

	for i, side in ipairs(Sides) do
		local point, direction = GetOpposite(i)
		local off = direction * 3
		local y = (i + 1) % 2
		local x = i % 2

		local arrow = CreateFrame('Frame', '$parent' .. side, f, 'GlowBoxArrowTemplate')
		arrow:SetPoint(point, f, side, x * off, y * off)
		arrow:SetSize(21 + 32 * x, 21 + 32 * y)
		f[side] = arrow

		RotateTexture(arrow.Arrow,i)
		RotateTexture(arrow.Glow, i)
	end

	f.Text, f.Close = text, close
	f:EnableMouse(true)
	f:SetSize(220, 100)
	return f
end

function Box:New(parent, text, point, x,y)
	local side = point or 'BOTTOM'
	local f = self:Super(Box):New(parent)
	f:SetPoint(side, parent, GetOpposite(tIndexOf(Sides, side)), x or 0,y or 0)
	f:SetFrameStrata('DIALOG')
	f:SetDirection(side)
	f:SetText(text)
	f:Show()
	return f
end


--[[ API ]]--

function Box:SetDirection(direction)
	for i, side in ipairs(Sides) do
		self[side]:SetShown(side == direction)
	end
end

function Box:GetDirection()
	for i, side in ipairs(Sides) do
		if self[side]:IsShown() then
			return side
		end
	end
end

function Box:SetText(text)
	self.Text:SetText(text)
	self:SetHeight(self.Text:GetHeight() + 30)
end

function Box:GetText()
	return self.Text:GetText()
end