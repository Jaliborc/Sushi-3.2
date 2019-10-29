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

local Owner = LibStub('Sushi-3.1').Callable:NewSushi('Tipped', 1)
if not Owner then return end


--[[ Events ]]--

function Owner:Construct()
	local frame = self:Super(Owner):Construct()
	frame:SetScript('OnEnter', frame.OnEnter)
	frame:SetScript('OnLeave', frame.OnLeave)
	return frame
end

function Owner:OnEnter()
	local h1, p = self:GetTooltip()
	if h1 then
		GameTooltip:SetOwner(self, self:GetTooltipAnchor())
		GameTooltip:AddLine(h1, nil, nil, nil, true)

		if p then
			GameTooltip:AddLine(p, 1, 1, 1, true)
		end

		GameTooltip:Show()
	end
end

function Owner:OnLeave()
	if GameTooltip:GetOwner() == self then
		GameTooltip:Hide()
	end
end


--[[ API ]]--

function Owner:SetTooltip(h1, p)
	self.h1, self.p = h1, p
end

function Owner:GetTooltip()
	return self.h1, self.p
end

function Owner:GetTooltipAnchor()
	local x = self:GetRight() > (GetScreenWidth() / 2)
	return x and 'ANCHOR_LEFT' or 'ANCHOR_RIGHT'
end


--[[ Proprieties ]]--

Owner.SetTip = Owner.SetTooltip
Owner.GetTip = Owner.GetTooltip
Owner.GetTipAnchor = Owner.GetTooltipAnchor
