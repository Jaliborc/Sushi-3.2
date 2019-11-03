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

local function Clear()
  if Drop.Current then
    Drop.Current:Release()
  end
end


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

function Drop:Toggle(parent)
  local f = (not self.Current or self.Current:GetParent() ~= parent) and self:New(parent, nil, true)
  Clear()
  self.Current = f
  return f
end

function Drop:New(parent, children, expires)
  local f = self:Super(Drop):New(parent, children)
  f.expires = expires and (GetTime() + 5)
  f:SetScript('OnUpdate', expires and f.OnUpdate)
  f:SetFrameStrata('FULLSCREEN_DIALOG')
  f:SetClampedToScreen(true)
  f:SetBackdrop('Tooltip')
  return f
end

function Drop:Reset()
  self:GetClass().Current = self.Current ~= self and self.Current
  self:SetScript('OnUpdate', nil)
  self:SetClampedToScreen(false)
  self:Super(Drop):Reset()
end


--[[ Events ]]--

function Drop:OnUpdate()
  local time = GetTime()
  if self.clicked then
    self:Release()
  elseif MouseIsOver(self) or MouseIsOver(self:GetParent()) then
    self.expires = time + 5
  elseif time >= self.expires then
    self:Release()
  end
end


--[[ API ]]--

function Drop:SetChildren(data)
	self:Super(Drop):SetChildren(type(data) == 'table' and function(self)
    for i, line in ipairs(data) do
      self:Add(line)
    end
	end or data)
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

    return self:Add(self.ButtonClass, object, ...)
  end

  local f = self:Super(Drop):Add(object, ...)
  if f.SetCall then
    f:SetCall('OnClick', function() self.clicked = true end)
  end
  return f
end

function Drop:SetBackdrop(backdrop)
  local data = self.Backdrops[backdrop] or backdrop
  assert(type(data) == 'table', 'Invalid data provided for `:SetBackdrop`')

  self.Bg:SetBackdrop(data)
  self.Bg:SetBackdropColor(data.backdropColor:GetRGB())
  self.Bg:SetBackdropBorderColor(data.backdropBorderColor:GetRGB())
end


--[[ Proprieties ]]--

if not Drop.ButtonClass then
  hooksecurefunc('ToggleDropDownMenu', Clear)
  hooksecurefunc('CloseDropDownMenus', Clear)
end

Drop.Size = 10
Drop.ButtonClass = 'DropButton'
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
