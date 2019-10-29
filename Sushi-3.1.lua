--[[
Copyright 2008-2019 João Cardoso
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

local Lib = LibStub:NewLibrary('Sushi-3.1', 1)
if not Lib then return end

local Base = Lib.Base or LibStub('Poncho-2.0')()
local Install = debugstack(1,1,0):match('^(.+)\\Sushi[%d\.\-]+\.lua')

if Install:sub(1,3) == '...' then
	for i = 4, strlen(Install) do
		if root:find(Install:sub(4, i) .. '$') then
			Install = 'Interface\\AddOns\\' .. Install:sub(i+1)
			break
		end
	end
end

function Base:NewSushi(name, version, type, template, global)
	local class = Lib[name] or self:NewClass(type, (global or self:GetClassName()) and ('Sushi-3.1-' .. name), template)
	local old = rawget(class, '__version') or 0
	if old >= version then
		return
	end

	class.__version = version
	Lib[name] = class
	return class, old
end

function Base:New(parent)
	local f = self:Super(Base):New(parent)
	f:SetParent(parent)
	return f
end

function Base:Reset()
	self:Super(Base):Reset()

	for k, v in pairs(self) do
		if type(k) == 'string' and k:sub(1, 1):find('%l') then
			self[k] = nil
		end
	end

end

Lib.Base = Base
Lib.InstallLocation = Install
