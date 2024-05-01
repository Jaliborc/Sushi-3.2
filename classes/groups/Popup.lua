--[[
Copyright 2008-2024 João Cardoso
Sushi is distributed under the terms of the GNU General Public License (or the Lesser GPL).
This file is part of Sushi.

Sushi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Sushi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Sushi. If not, see <http://www.gnu.org/licenses/>.
--]]

local Popup = LibStub('Sushi-3.2').Group:NewSushi('Popup', 7)
if not Popup then return end
Popup.Active = Popup.Active or {}
Popup.Size = 420
Popup.Max = 6

local Magnifier = WOW_PROJECT_ID == WOW_PROJECT_MAINLINE and 'communities-icon-searchmagnifyingglass' or 'shop-games-magnifyingglass'
local Locale, Go2Browser = GetLocale()

if Locale == 'deDE' then
    Go2Browser = 'Kopieren Sie diese URL in Ihren Browser'
elseif Locale == 'frFR' then
    Go2Browser = 'Copiez cette URL dans votre navigateur'
elseif Locale == 'esES' or Locale == 'esMX' then
    Go2Browser = 'Copia esta URL en tu navegador'
elseif Locale == 'ruRU' then
    Go2Browser = 'Скопируйте эту ссылку в ваш браузер'
elseif Locale == 'ptBR' then
    Go2Browser = 'Copie este URL no seu browser'
elseif Locale == 'itIT' then
    Go2Browser = 'Copia questo URL nel tuo browser'
elseif Locale == 'koKR' then
    Go2Browser = '이 URL을 브라우저에 복사하세요'
elseif Locale == 'zhCN' then
    Go2Browser = '复制此网址到您的浏览器'
elseif Locale == 'zhTW' then
    Go2Browser = '複製此網址到您的瀏覽器'
else
    Go2Browser = 'Copy this url into your browser'
end

local function lastPopup()
	if StaticPopup_DisplayedFrames then
		return StaticPopup_DisplayedFrames[#StaticPopup_DisplayedFrames]
	end

	for i = 1, STATICPOPUP_NUMDIALOGS do --> thanks blizz, very simple and efficient, great change
		local frame = _G['StaticPopup'..i]
		if frame:IsShown() and select(2, frame:GetPointByName('TOP')) == UIParent then
			return frame
		end
	end
end


--[[ Manage ]]--

function Popup:External(url)
	return self:New {id = url, icon = Magnifier, text = Go2Browser, editBox = url, button1 = OKAY}
end

function Popup:Toggle(input)
	return self:Cancel(input) or self:New(input)
end

function Popup:Cancel(input)
	local f = input and self:GetActive(input)
	return f and (f:Release('closed') or true)
end

function Popup:Organize()
	for i, f in self:IterateActive() do
		local anchor = i == 1 and lastPopup() or self.Active[i-1]
		if anchor then
			f:SetPoint('TOP', anchor, 'BOTTOM', 0, -15)
		else
			f:SetPoint('TOP', UIParent, 'TOP', 0, -135)
		end
	end
end

function Popup:GetActive(target)
	for i, f in self:IterateActive() do
		if f == target or f.id == target then
			return f, i
		end
	end
end

function Popup:IterateActive()
	return ipairs(self.Active)
end


--[[ Construct ]]--

function Popup:Construct()
	local f = self:Super(Popup):Construct()
	f:SetScript('OnKeyDown', f.OnKeyDown)

	local money = CreateFrame('Frame', tostring(f)..'MoneyInput', f, 'MoneyInputFrameTemplate')
	money.top, money.bottom, money.centered = 0, 6, true

	local icon = f:CreateTexture()
	icon:SetPoint('LEFT', 22,0)
	icon:SetSize(40,40)

	f.MoneyInput, f.Icon = money, icon
	return f
end

function Popup:New(input)
	local info = type(input) == 'table' and input or CopyTable(StaticPopupDialogs[input])
	local id = info.id or info.text or input

	if UnitIsDeadOrGhost('player') and info.whileDead == false then
		return info.OnCancel and info.OnCancel('dead')
	elseif InCinematic() and not info.interruptCinematic then
		return info.OnCancel and info.OnCancel('cinematic')
	elseif id and self:GetActive(id) then
		return info.OnCancel and info.OnCancel('duplicate')
	elseif #self.Active >= self.Max then
		return info.OnCancel and info.OnCancel('overflow')
	elseif info.exclusive then
		for i, f in ipairs(CopyTable(self.Active, true)) do
			f:Release('override')
		end
	elseif info.cancels then
		local f = self:GetActive(info.cancels)
		if f then f:Release('override') end
	end

	local f = self:Super(Popup):New(UIParent)
	f.id, f.edit, f.money = id, info.editBox, info.moneyInput or info.money
	f.button1, f.button2, f.moneyInput, f.hideOnEscape = info.button1, info.button2, info.moneyInput, f.hideOnEscape
	f.text = (info.text or '') .. (not f.moneyInput and f.money and ('|n'..GetCoinTextureString(f.money)) or '')
	f:SetBackdrop('DialogBorderDarkTemplate')
	f:SetCall('OnAccept', info.OnAccept)
	f:SetCall('OnCancel', info.OnCancel)
	f:SetChildren(self.Populate)
	f:Show()

	local icon = info.icon or (info.showAlert and 357854) or (info.showAlertGear and 357855)
	if icon and C_Texture.GetAtlasInfo(icon) then
		f.Icon:SetAtlas(icon)
	else
		f.Icon:SetTexture(icon)
	end

	tinsert(self.Active, f)
	self:Organize()
	return f
end

function Popup:Populate()
	if self.text then
		self:Add('Header', self.text, GameFontHighlightLeft):SetJustifyH('CENTER')
	end

	if self.edit then
		self.textInput = self:Add('BoxEdit', nil, self.edit):SetWidth(240):SetKeys{centered = true, top = -6, left = -3, right = -3, bottom = -3}
	end

	if self.moneyInput then
		self:Add(self.MoneyInput):Show()
		MoneyInputFrame_SetCopper(self.MoneyInput, tonumber(self.money) or 0)
	end

	if self.button1 or self.button2 then
		local buttons = self:Add('Group', function(group)
			if self.button1 then
				group:Add('RedButton', self.button1):SetSize(118, 20):SetCall('OnClick', function() self:Accept() end).right = 0
			end

			if self.button2 then
				group:Add('RedButton', self.button2):SetSize(118, 20):SetCall('OnClick', function() self:Release('closed') end).right = 0
			end
		end)

		buttons.centered, buttons.top = true, 2
		buttons:SetWidth(136 * ((self.button1 and 1 or 0) + (self.button2 and 1 or 0)))
		buttons:SetOrientation('HORIZONTAL')
	end
end

function Popup:Accept()
	self.edit = self.textInput and self.textInput:GetText()
	self.money = self.moneyInput and MoneyInputFrame_GetCopper(self.MoneyInput) or self.money
	self:FireCalls('OnAccept', self.edit or self.money)
	self:Release()
end

function Popup:Release(reason)
	local _, i = self:GetActive(self)
	if i then
		tremove(self.Active, i)

		if reason then
			self:FireCalls('OnCancel', reason)
		end

		self.MoneyInput:Hide()
		self:Super(Popup):Release()
		self:Organize()
		self:Hide()
	end
end


--[[ Events ]]--

function Popup:OnKeyDown(key)
	if self.hideOnEscape ~= false and GetBindingFromClick(key) == 'TOGGLEGAMEMENU' then
		self:SetPropagateKeyboardInput(false)
		return self:Release('closed')
	elseif self.editBox or self.moneyInput and key == 'ENTER' then
		self:SetPropagateKeyboardInput(false)
		return self:Accept()
	end

	self:SetPropagateKeyboardInput(true)
end

if not rawget(Popup, 'Layout') or not Popup.Active then
	hooksecurefunc('StaticPopup_CollapseTable', function() Popup:Organize() end)
	hooksecurefunc('StaticPopup_Show', function() Popup:Organize() end)
end