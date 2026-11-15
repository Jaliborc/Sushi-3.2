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

-- A small drawing surface. It takes an atlas name, a texture path or a function(canvas):
--   canvas:Rect(x, y, width, height, r, g, b, a)
--   canvas:Texture(path, x, y, width, height, texCoords, r, g, b, a)
--   canvas:Atlas(name, x, y, width, height, texCoords, r, g, b, a)
-- `texCoords` is {left, right, top, bottom}; the optional vertex colour is r, g, b, a or a
-- {r, g, b, a} table. A string source is an atlas when the client knows one by that name, and
-- a texture otherwise. A shorthand source keeps its own default size: the atlas's size, or
-- Canvas.Size square for a texture path.
local Canvas = LibStub('Sushi-3.2').Callable:NewSushi('Canvas', 1, 'Frame')
if not Canvas then return end

Canvas.Size = 32


--[[ Construct ]]--

function Canvas:Construct()
	local f = self:Super(Canvas):Construct()
	f.Pool, f.Used = {}, 0
	f.Regions = {}
	return f
end

function Canvas:New(parent, source, width, height)
	local f = self:Super(Canvas):New(parent)
	if width or height then
		width = width or height
		height = height or width
	else
		width, height = self:SourceSize(source, self.Size)
	end

	f:SetSize(width, height)
	f:SetSource(source)
	return f
end


--[[ API ]]--

function Canvas:SetSource(source)
	self:Clear()
	self.source = source

	if type(source) == 'function' then
		source(self)
	elseif type(source) == 'string' then
		if self:AtlasInfo(source) then
			self:Atlas(source)
		else
			self:Texture(source)
		end
	end
end

function Canvas:GetSource()
	return self.source
end

function Canvas:SetDesaturation(amount)
	for _, texture in ipairs(self.Regions) do
		texture:SetDesaturation(amount)
	end
end

function Canvas:GetDesaturation() end // to implement


--[[ Regions ]]--

function Canvas:Rect(x,y, width,height, r,g,b,a)
	local texture = self:NewTexture()
	texture:SetColorTexture(self:SourceColor(r,g,b,a))
	
	return self:ApplyRegion(texture, x,y, width or self.Size, height or width or self.Size)
end

function Canvas:Texture(path, x,y, width, height, coords, r, g, b, a)
	local texture = self:NewTexture()
	texture:SetTexture(path)

	return self:ApplyRegion(texture, x,y, width or self.Size, height or width or self.Size, coords, r,g,b,a)
end

function Canvas:Atlas(name, x,y, width,height, coords, r,g,b,a)
	local texture = self:NewTexture()
	local info = self:AtlasInfo(name)
	local auto = not width and not height

	if auto then
		width = info and info.width or self.Size
		height = info and info.height or width
	else
		width = width or height
		height = height or width
	end

	if info then
		texture:SetAtlas(name, auto)
	else
		texture:SetTexture(name)
	end

	return self:ApplyRegion(texture, x,y, width,height, coords, r,g,b,a)
end

function Canvas:ApplyRegion(texture, x,y, width,height, coords, r,g,b,a)
	texture:SetPoint('TOPLEFT', self, 'TOPLEFT', x or 0, -(y or 0))
	texture:SetVertexColor(self:SourceColor(r,g,b,a))
	texture:SetSize(width, height)

	if coords then
		texture:SetTexCoord(coords[1] or coords.left or 0, coords[2] or coords.right or 1,
		                    coords[3] or coords.top or 0, coords[4] or coords.bottom or 1)
	else
		texture:SetTexCoord(0, 1, 0, 1)
	end
	
	tinsert(self.Regions, texture)
	return texture
end


--[[ Helpers ]]--

function Canvas:NewTexture()
	self.Used = self.Used + 1
	local texture = self.Pool[self.Used]
	if not texture then
		texture = self:CreateTexture(nil, 'ARTWORK')
		self.Pool[self.Used] = texture
	end

	texture:SetDesaturation(1)
	texture:Show()
	return texture
end

function Canvas:Clear()
	for index = 1, self.Used do
		self.Pool[index]:Hide()
	end

	self.Used = 0
	wipe(self.Regions)
	self.source = nil
end

function Canvas:SourceColor(r,g,b,a)
	if type(r) == 'table' then
		return r[1] or r.r or 1, r[2] or r.g or 1, r[3] or r.b or 1, r[4] or r.a or 1
	end
	return r or 1, g or 1, b or 1, a or 1
end

function Canvas:SourceSize(source, size)
	if type(source) == 'string' then
		local info = self:AtlasInfo(source)
		if info and info.width and info.height then return info.width, info.height end
	end
	return size, size
end

function Canvas:AtlasInfo(name)
	return C_Texture and C_Texture.GetAtlasInfo and C_Texture.GetAtlasInfo(name) or nil
end