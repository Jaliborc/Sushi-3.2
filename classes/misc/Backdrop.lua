--[[
Copyright 2008-2026 João Cardos
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
local Backdrop = Lib.Callable:NewSushi('Backdrop', 1, 'Frame')
if not Backdrop then return end


--[[ Construct ]]--

function Backdrop:Construct()
	local f = self:Super(Backdrop):Construct()
	f.Bg = f:CreateTexture(nil, 'BACKGROUND')
	f.Bg:SetAllPoints()
	return f
end

function Backdrop:New(parent, backdrop)
	local f = self:Super(Backdrop):New(parent)
	f:SetBackdrop(backdrop)
	return f
end


--[[ API ]] --

function Backdrop:SetBackdrop(backdrop)
	if self.pool then
		self.pool:Release(self.bg)
	end

	self.backdrop = backdrop
	self.pool, self.bg = nil
	self.Bg:SetTexture(nil)

	local legacy = type(backdrop) == 'table'
	local template = legacy and 'BackdropTemplate'

	if type(backdrop) == 'string' then
		if self.TemplateInfo(backdrop) then
			template = backdrop
		elseif self.AtlasInfo(backdrop) then
			self.Bg:SetAtlas(backdrop)
		elseif self.TextureInfo(backdrop) then
			self.Bg:SetTexture(backdrop)
		end
	end

	if template then
		local pool = self.Pools[template] or CreateFramePool('Frame', UIParent, template)
		local bg = pool:Acquire()
		bg:SetParent(self)
		bg:SetFrameLevel(self:GetFrameLevel())
		bg:SetAllPoints()
		bg:Show()

		self.pool, self.bg = pool, bg
		self.Pools[template] = pool
	end

	if legacy then
		self.bg:SetBackdrop(backdrop)
		self.bg:SetBackdropColor(backdrop.color:GetRGBA())
		self.bg:SetBackdropBorderColor(backdrop.edgeColor:GetRGBA())
	end

	return self
end

function Backdrop:GetBackdrop()
	return self.backdrop
end

function Backdrop:GetBackdropRegion()
	local bg = self.bg
	return bg and (bg.NineSlice and bg.NineSlice.Center or bg.Bg or bg) or self
end


--[[ Properties ]]--

Backdrop.AtlasInfo = C_Texture and C_Texture.GetAtlasInfo or nop
Backdrop.TemplateInfo = C_XMLUtil and C_XMLUtil.GetTemplateInfo or nop
Backdrop.TextureInfo = C_UIFileAsset and C_UIFileAsset.IsKnownFile or nop
Backdrop.Pools = Backdrop.Pools or {}