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

local Canvas = LibStub('Sushi-3.3').Backdrop:NewSushi('Canvas', 1, 'Frame')
if not Canvas then return end


--[[ Construct ]]--

function Canvas:Construct()
	local f = self:Super(Canvas):Construct()
	f.Textures, f.Strings, f.Regions = {}, {}, {}
	return f
end

function Canvas:New(parent, source, width,height)
	local f = self:Super(Canvas):New(parent)
	f:SetSize(width or height or self.Size, height or width or self.Size)
	f:SetSource(source)
	return f
end


--[[ API ]]--

function Canvas:SetSource(source)
	self:Clear()
	self.source = source

	if type(source) == 'function' then
		return source(self)
	elseif type(source) == 'string' then
		if self.AtlasInfo(source) then
			return self:Atlas(source)
		elseif self.TextureInfo(source) then
			return self:Texture(source)
		else
			return self:Text(source)
		end
	end
end

function Canvas:GetSource()
	return self.source
end

function Canvas:SetDesaturation(amount)
	self.desaturation = amount
	for _, region in ipairs(self.Regions) do
		if region.SetDesaturation then
			region:SetDesaturation(amount)
		end
	end
end

function Canvas:GetDesaturation()
	return self.desaturation or 1
end

function Canvas:Clear()
	for i, region in ipairs(self.Regions) do
		region:Hide()
	end

	wipe(self.Regions)
	self.numTextures, self.numStrings, self.source = 0, 0
end


--[[ Regions ]]--

function Canvas:Rect(x,y, width,height, r,g,b,a, rotation)
	local texture = self:NewTexture()
	texture:SetColorTexture(self:SourceColor(r,g,b,a))

	return self:ApplyRegion(texture, x,y, width,height, rotation)
end

function Canvas:Circle(x,y, radius, r,g,b,a)
	local texture = self:Rect(x - radius, y - radius, radius * 2, radius * 2, r,g,b,a)
	texture:AddMaskTexture(texture.Disk)
	return texture
end

function Canvas:Texture(path, x,y, width,height, coords, r,g,b,a, rotation)
	local texture = self:NewTexture()
	texture:SetTexture(path)

	return self:ApplyRegion(texture, x,y, width, height, rotation, coords, r,g,b,a)
end

function Canvas:Atlas(name, x,y, width,height, coords, r,g,b,a, rotation)
	local texture = self:NewTexture()
	local info = self.AtlasInfo(name)
	local auto = not width and not height
	if auto then
		width = info and info.width 
		height = info and info.height
	end

	texture:SetAtlas(name, auto)
	return self:ApplyRegion(texture, x,y, width,height, rotation, coords, r,g,b,a)
end

function Canvas:Text(text, x,y, font, width,height, justifyH,justifyV, rotation)
	local string = self:NewFontString()
	string:SetFontObject(font or GameFontNormal)
	string:SetJustifyH(justifyH or 'CENTER')
	string:SetJustifyV(justifyV or 'MIDDLE')
	string:SetWidth(width or self:GetWidth())
	string:SetText(text or '')

	if height then
		string:SetHeight(height)
	end

	string:SetPoint('TOPLEFT', self, 'TOPLEFT', x or 0, -(y or 0))
	string:Show()

	tinsert(self.Regions, string)
	return string
end

--[[ Helpers ]]--

function Canvas:NewTexture()
	self.numTextures = (self.numTextures or 0) + 1
	local texture = self.Textures[self.numTextures]
	if not texture then
		texture = self:CreateTexture()
		texture.Disk = self:CreateMaskTexture()
		texture.Disk:SetTexture([[Interface\CharacterFrame\TempPortraitAlphaMask]])
		texture.Disk:SetAllPoints(texture)

		self.Textures[self.numTextures] = texture
	end

	texture:SetDesaturation(self:GetDesaturation())
	texture:RemoveMaskTexture(texture.Disk)
	return texture
end

function Canvas:NewFontString()
	self.numStrings = (self.numStrings or 0) + 1
	local string = self.Strings[self.numStrings]
	if not string then
		string = self:CreateFontString()
		self.Strings[self.numStrings] = string
	end

	return string
end

function Canvas:ApplyRegion(region, x,y, width,height, rotation, coords, r,g,b,a)
	region:SetSize(width or height or self:GetWidth(), height or width or self:GetHeight())
	region:SetDrawLayer('ARTWORK', max(-8, min(#self.Regions-8, 7)))
	region:SetPoint('TOPLEFT', self, 'TOPLEFT', x or 0, -(y or 0))
	region:Show()

	if region.SetRotation then
		region:SetRotation(rotation and math.rad(rotation) or 0)
	end

	if region.SetTexCoord then
		coords = coords or self.None
		region:SetTexCoord(coords[1] or coords.left or 0, coords[2] or coords.right or 1,
		                   coords[3] or coords.top or 0, coords[4] or coords.bottom or 1)
	end

	if region.SetVertexColor then
		region:SetVertexColor(self:SourceColor(r,g,b,a))
	end

	tinsert(self.Regions, region)
	return region
end

function Canvas:SourceColor(r,g,b,a)
	if type(r) == 'table' then
		return r[1] or r.r or 1, r[2] or r.g or 1, r[3] or r.b or 1, r[4] or r.a or 1
	end
	return r or 1, g or 1, b or 1, a or 1
end


--[[ Properties ]]--

Canvas.None = {}
Canvas.Size = 37