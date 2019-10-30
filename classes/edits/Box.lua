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

local Box = LibStub('Sushi-3.1').Editable:NewSushi('BoxEdit', 1, 'EditBox', 'InputBoxTemplate')
if not Box then return end


--[[ Construct ]]--

function Box:Construct()
	local f = self:Super(Box):Construct()
	local label = f:CreateFontString(nil, nil, 'GameFontNormal')
	label:SetPoint('BOTTOMLEFT', f, 'TOPLEFT', -7, -4)
	label:SetJustifyH('Left')

	f.Label = label
	f:SetSize(150, 35)
	return f
end

function Box:New(parent, label, value)
	local f = self:Super(Box):New(parent)
	f:SetLabel(label)
	f:SetValue(value)
	return f
end


--[[ API ]]--

function Box:SetLabel(label)
	self.Label:SetText(label)
end

function Box:GetLabel()
	return self.Label:GetText()
end

function Box:SetEnabled(enabled)
	self:Super(Box):SetEnabled(enabled)
	self:UpdateFont()
end

function Box:SetSmall(small)
	self.small = small
	self:UpdateFont()
end

function Box:IsSmall()
	return self.small
end

function Box:UpdateFont()
	local font = self:IsEnabled() and 'GameFontNormal' or 'GameFontDisable'
	local small = self:IsSmall() and 'Small' or ''

	self.Label:SetFontObject(font .. small)
end


--[[ Proprieties ]]--

Box.bottom = 6
Box.right = 20
Box.left = 25
Box.top = 10
