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

local Drop = LibStub('Sushi-3.1').Group:NewSushi('Dropdown', 1, 'Frame')
if not Drop then return end


--[[ Construct ]]--

function Drop:Construct()
  local f = self:Super(Drop):Construct()
  local bg = CreateFrame('Frame', nil, f)
  bg:SetFrameLevel(f:GetFrameLevel())
  bg:SetPoint('BOTTOMLEFT', 0, -11)
  bg:SetPoint('TOPRIGHT', 0, 11)

  f.Bg = bg
  return f
end

function Drop:New(...)
  local f = self:Super(Drop):New(...)
  f:SetFrameStrata('FULLSCREEN_DIALOG')
  f:SetBackdrop('Tooltip')
  return f
end


--[[ API ]]--

function Drop:SetChildren(info)
	self:Super(Drop):SetChildren(type(info) == 'table' and function(self)
    for i, line in ipairs(info) do
      self:Add(line)
    end
	end or info)
end

function Drop:Add(object, ...)
  if type(object) == 'table' and not self.IsFrame(object) then
    if not object.text and object[1] then
      local lines = {}
      for i, line in ipairs(object) do
        lines[i] = self:Add(line)
      end
      return lines
    end

    return self:Add('DropButton', object)
  end

  return self:Super(Drop):Add(object, ...)
end

function Drop:SetBackdrop(backdrop)
  local data = self.Backdrops[backdrop] or backdrop
  assert(type(data) == 'table', 'Invalid data provided for `:SetBackdrop`')

  self.Bg:SetBackdrop(data)
  self.Bg:SetBackdropColor(data.backdropColor:GetRGB())
  self.Bg:SetBackdropBorderColor(data.backdropBorderColor:GetRGB())
end


--[[ Proprieties ]]--

Drop.Size = 10
Drop.Backdrops = {
  Tooltip = GAME_TOOLTIP_BACKDROP_STYLE_DEFAULT,
  Azerite = GAME_TOOLTIP_BACKDROP_STYLE_AZERITE_ITEM,
  Dialog = {
    bgFile = 'Interface/DialogFrame/UI-DialogBox-Background-Dark',
    edgeFile = 'Interface/DialogFrame/UI-DialogBox-Border',
    insets = {left = 11, right = 11, top = 11, bottom = 9},
    edgeSize = 32, tileSize = 32, tile = true,
    backdropBorderColor = HIGHLIGHT_FONT_COLOR,
    backdropColor = HIGHLIGHT_FONT_COLOR
  }
}
