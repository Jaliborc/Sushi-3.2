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

local Lib = LibStub:NewLibrary('Sushi-3.2', 1)
if not Lib then return end

local Base = Lib.Base or LibStub('Poncho-2.0')()
local Meta = Lib.Meta or CopyTable(getmetatable(Base))

local function chain(func)
	return function(self,...)
		func(self,...)
		return self
	end
end

function Base:NewSushi(name, version, type, template, global)
	local class = Lib[name] or self:NewClass(type, (global or self:GetClassName()) and ('Sushi-3.2-' .. name), template)
	local old = rawget(class, '__version') or 0
	if old >= version then
		return
	end

	for k,v in pairs(class) do
		if k:sub(1,2) ~= '__' then
			class[k] = nil
		end
	end

	setmetatable(class, Meta)
	for k,v in pairs(class.__base) do
		if not class.__super[k] then
			class[k] = v
		end
	end

	Lib[name] = class
	class.__version = version
	return class, old
end

function Meta:__newindex(key, value)
	rawset(self, key, type(value) == 'function' and (key:sub(1,3) == 'Set' or key:sub(1,4) == 'Fire' or key == 'Show' or key == 'Hide') and chain(value) or value)
end

Lib.Base = Base
Lib.Meta = Meta
