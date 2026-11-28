if not WoWUnit or WoWUnit:HasGroup('Sushi-3.3') then return end

local Sushi = LibStub('Sushi-3.3')
local Panel = CreateFrame('Frame', nil, SettingsPanel)
Panel:Hide()

Settings.RegisterAddOnCategory(
	Settings.RegisterCanvasLayoutCategory(Panel, 'Sushi-3.3'))

-- Header
local title = Sushi.Header(Panel, 'Widget Examples', GameFontHighlightHuge, 6)
title:SetPoint('TOPLEFT', 7, -22)
Panel:HookScript('OnSizeChanged', function()
	if Panel:GetWidth() > 0 then
		title:UpdateWidth()
	end
end)

-- Buttons
local helpButton = Sushi.HelpButton(Panel)
helpButton:SetTip('Help', 'An help button.')
helpButton:SetPoint('TOPLEFT', 10, -66)
helpButton:SetText('Hello')

local redButton = Sushi.RedButton(Panel, 'Red Button')
redButton:SetPoint('LEFT', helpButton, 'RIGHT', 5, 0)
redButton:SetCall('OnClick', function()
	Sushi.Popup {text = 'This Popup has an alert.', button1 = OKAY, whileDead = 1, showAlert = 1, exclusive = 1}
	Sushi.Popup {
		id = 'Unit Test', text = 'This has money.', button1 = OKAY, whileDead = 1,
		hasEditBox = 1, editBoxWidth = 260, editBoxText = 'With an editbox'
	}
end)

local grayButton = Sushi.GrayButton(Panel, 'Gray Button')
grayButton:SetPoint('LEFT', redButton, 'RIGHT', 5, 0)

-- Checks
local check = Sushi.Check(Panel, 'Check Button')
check:SetPoint('LEFT', grayButton, 'RIGHT', 5, 0)

local check2 = Sushi.Check(Panel)
check2:SetText('A really long disabled button')
check2:SetPoint('TOPLEFT', 10, -92)
check2:SetEnabled(false)
check2:SetChecked(true)

local color = Sushi.ColorPicker(Panel, 'Color Picker', CreateColor(1,0,0, 1))
color:SetPoint('TOPLEFT', check, 'BOTTOMLEFT', 0, -5)

local expand = Sushi.ExpandCheck(Panel, 'Expand Check')
expand:SetPoint('LEFT', check, 'RIGHT', 5, 0)

local icon = Sushi.IconCheck(Panel, 'Interface/Icons/ability_bullrush', 'Icon Check')
icon:SetPoint('TOPLEFT', color, 'TOPRIGHT', 5, 0)

-- Edits
local boxEdit = Sushi.BoxEdit(Panel, 'Box Edit', 'Some user text')
boxEdit:SetPoint('TOPLEFT', 20, -131)
boxEdit:SetCall('OnInput', function(boxEdit, value)
	print('Box edit changed value to ' .. value)
end)

local dark = Sushi.DarkEdit(Panel, 'More user text')
dark:SetPoint('LEFT', boxEdit, 'RIGHT', 10, 2)
dark:SetLabel('Dark Edits')

local dark2 = Sushi.DarkEdit(Panel, 5, '%s%')
dark2:SetPoint('LEFT', dark, 'RIGHT')

local dark3 = Sushi.DarkEdit(Panel, 3, '-%s')
dark3:SetPoint('LEFT', dark2, 'RIGHT', 15, 0)

local dark4 = Sushi.DarkEdit(Panel, 20, '[%s]')
dark4:SetPoint('LEFT', dark3, 'RIGHT', 5, 0)
dark4:SetEnabled(false)

-- Inputs
local slider = Sushi.Slider(Panel, 'Slider', 30)
slider:SetPoint('TOPLEFT', 20, -186)
slider:SetRange(0, 100, 'None')

local choice = Sushi.DropChoice(Panel, 'Dropdown Choice', 2)
choice:AddChoices{ {key = 1, text = 'Hi'}, {key = 2, text = 'Hey'}, {key = 3, text = 'Hello'} }
choice:SetPoint('TOPLEFT', slider, 'TOPRIGHT', 10, -2)

-- Groups
local group = Sushi.Group(Panel)
group:SetPoint('TOPLEFT', 20, -231)
group:SetChildren(function()
	for i = 1, 12 do
		group:Add('HelpButton').left = 0
		group:Add('HelpButton').left = 0
		group:AddBreak()
	end
end)

local expand2 = Sushi.ExpandHeader(group, 'Expandable Header')
expand2:SetPoint('TOPLEFT', group, 'BOTTOMLEFT', 0, -5)
expand2:SetChecked(true)

local header1 = Sushi.Header(group, 'This is a parent-resized header')
header1:SetPoint('TOPLEFT', expand2, 'BOTTOMLEFT', 0, -5)

local header2 = Sushi.Header(group, 'This is not')
header2:SetPoint('TOPLEFT', header1, 'BOTTOMLEFT', 0, -5)
header2:SetWidth(100)

local scroller = Sushi.Scroll(Panel)
scroller:SetSize(160, 220)
scroller:SetPoint('TOPLEFT', group, 'TOPRIGHT', 15, 0)
scroller:SetChildren(function(scroll)
	for i = 1, 12 do
		scroll:Add('RedButton', 'Scroll entry #' .. tostring(i))
	end
end)

local scrollerShort = Sushi.Scroll(Panel)
scrollerShort:SetSize(160, 60)
scrollerShort:SetPoint('TOPLEFT', scroller, 'BOTTOMLEFT', 0, -10)
scrollerShort:SetChildren(function(scroll)
	scroll:Add('RedButton', 'Fits, so no bar')
end)

local faux = Sushi.FauxScroll(Panel, 3, 27)
faux:SetPoint('TOPLEFT', scroller, 'TOPRIGHT', 5, 0)
faux:SetChildren(function()
	faux:SetNumEntries(5)

	for i = faux:First(), faux:Last() do
		faux:Add('RedButton', 'Faux scroll entry #' .. tostring(i))
	end
end)

Sushi.Glowbox(header2, 'This is a glow box.', 'TOP', 0,-30)


-- Options Panels
local options = Sushi.OptionsGroup(Panel, 'Options Group')
options:SetSubtitle('Parented to an existing frame if you wish. Remove parent to create your own category.')
options:SetChildren(function(group)
	group:Add('RedButton', 'Say Hello')
	group:Add('Check', 'A demo check')

	local choice = group:Add('DropChoice', 'A demo choice', 1)
	choice:AddChoices{ {key = 1, text = 'First'}, {key = 2, text = 'Second'}, {key = 3, text = 'Third'} }
	choice:SetCall('OnInput', function(choice, key)
		print('Demo choice is now ' .. tostring(key))
	end)

	local slider = group:Add('Slider', 'A demo slider', 30)
	slider:SetRange(0, 100, 'None')
	slider:SetCall('OnInput', function(slider, value)
		print('Demo slider is now ' .. tostring(value))
	end)
end)

local sushiCards = {
	{'Salmon Nigiri', 'Fresh salmon over rice.', function(art)
		art:SetSize(64, 64)
		art:Rect(15, 27, 34, 22, .95, .94, .84)
		art:Circle(15, 38, 11, .95, .94, .84)
		art:Circle(49, 38, 11, .95, .94, .84)
		art:Rect(8, 19, 48, 16, 1, .56, .36):SetDrawLayer('ARTWORK', 1)

		for i = 0, 3 do
			art:Rect(14 + i * 10, 19, 2, 16, 1, .86, .7, -25):SetDrawLayer('ARTWORK', 2)
		end
	end},
	{'Tuna Maki', 'Tuna wrapped in nori.', function(art)
		art:SetSize(64, 64)
		art:Circle(32, 32, 25, .24, .42, .31)
		art:Circle(32, 32, 20, .95, .94, .84):SetDrawLayer('ARTWORK', 1)
		art:Rect(23, 23, 18, 18, .85, .28, .36, 15):SetDrawLayer('ARTWORK', 2)
		art:Rect(33, 27, 7, 12, .62, .86, .42, 15):SetDrawLayer('ARTWORK', 3)
	end},
	{'Tamago Nigiri', 'Sweet Japanese omelette.', function(art)
		art:SetSize(64, 64)
		art:Rect(15, 27, 34, 22, .95, .94, .84)
		art:Circle(15, 38, 11, .95, .94, .84)
		art:Circle(49, 38, 11, .95, .94, .84)
		art:Rect(8, 19, 48, 18, 1, .83, .28):SetDrawLayer('ARTWORK', 1)
		art:Rect(8, 23, 48, 2, 1, .95, .55):SetDrawLayer('ARTWORK', 2)
		art:Rect(27, 19, 10, 30, .24, .42, .31):SetDrawLayer('ARTWORK', 3)
	end},
}

local sushiChecked = {HORIZONTAL = {true, false, false}, VERTICAL = {false, true, false}}

local function addSushiCards(group, orientation)
	local checked = sushiChecked[orientation]
	for i, card in ipairs(sushiCards) do
		local button = group:Add('CardCheck', card[1], card[2], card[3], checked[i], orientation)
		button:SetCall('OnInput', function(_, value)
			checked[i] = value
		end)
	end
end

Sushi.ScrollingOptions(Panel, 'Scrolling Options'):SetChildren(function(group)
	group:Add('Header', 'Category One', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}
	group:Add('RedButton', 'Say Hello')

	for i = 1, 20 do
		group:Add('Check', 'Demo check ' .. tostring(i))
	end

	group:Add('Header', 'Category Two', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}

	local choice = group:Add('DropChoice', 'A demo choice', 1)
	choice:AddChoices{ {key = 1, text = 'First'}, {key = 2, text = 'Second'}, {key = 3, text = 'Third'} }
	choice:SetCall('OnInput', function(choice, key)
		print('Demo choice is now ' .. tostring(key))
	end)

	local slider = group:Add('Slider', 'A demo slider', 30)
	slider:SetRange(0, 100, 'None')
	slider:SetCall('OnInput', function(slider, value)
		print('Demo slider is now ' .. tostring(value))
	end)

	group:Add('Header', 'Horizontal Card Checks', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}
	addSushiCards(group, 'HORIZONTAL')

	group:Add('Header', 'Vertical Card Checks', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}
	local cards = group:Add('Group')
	cards:SetWidth(math.min(498, math.max(166, group:GetWidth() - group.Gutter)))
	cards:SetOrientation('HORIZONTAL')
	cards:SetChildren(function(cards)
		addSushiCards(cards, 'VERTICAL')
	end)
end)