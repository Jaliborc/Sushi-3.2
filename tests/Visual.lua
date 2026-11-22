if not WoWUnit or WoWUnit:HasGroup('Sushi-3.2') then return end

local Sushi = LibStub('Sushi-3.2')
local Panel = CreateFrame('Frame', nil, SettingsPanel)
Panel:Hide()

Settings.RegisterAddOnCategory(
	Settings.RegisterCanvasLayoutCategory(Panel, 'Sushi-3.2'))


-- Buttons
local helpButton = Sushi.HelpButton(Panel)
helpButton:SetTip('Help', 'An help button.')
helpButton:SetPoint('TOPLEFT', 10, -10)
helpButton:SetText('Hello')

local redButton = Sushi.RedButton(Panel, 'Red Button')
redButton:SetPoint('LEFT', helpButton, 'RIGHT', 5, 0)
redButton:SetCall('OnClick', function()
	Sushi.Popup {text = 'This is a Popup message.', button1 = OKAY, whileDead = 1, showAlert = 1, exclusive = 1}
	Sushi.Popup {
		id = 'Unit Test', text = 'This is another Popup.', button1 = OKAY, whileDead = 1,
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
check2:SetPoint('TOPLEFT', 10, -36)
check2:SetEnabled(false)
check2:SetChecked(true)

local color = Sushi.ColorPicker(Panel, 'Color Picker', CreateColor(1,0,0, 1))
color:SetPoint('TOPLEFT', check, 'BOTTOMLEFT', 0, -5)

local expand = Sushi.ExpandCheck(Panel, 'Expand Check')
expand:SetPoint('LEFT', check, 'RIGHT', 5, 0)

local icon = Sushi.IconCheck(Panel, 'Interface/Icons/ability_bullrush', 'Icon Check')
icon:SetPoint('TOPLEFT', color, 'TOPRIGHT', 5, 0)

local templateIcon = Sushi.IconCheck(Panel, 'EncounterSectionIconTemplate', 'Template Icon')
templateIcon:SetPoint('TOPLEFT', icon, 'BOTTOMLEFT', 0, -5)

-- Edits
local boxEdit = Sushi.BoxEdit(Panel, 'Box Edit', 'Some user text')
boxEdit:SetPoint('TOPLEFT', 20, -75)
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
slider:SetPoint('TOPLEFT', 20, -130)
slider:SetRange(0, 100, 'None')

local choice = Sushi.DropChoice(Panel, 'Dropdown Choice', 2)
choice:AddChoices{ {key = 1, text = 'Hi'}, {key = 2, text = 'Hey'}, {key = 3, text = 'Hello'} }
choice:SetPoint('TOPLEFT', slider, 'TOPRIGHT', 10, -2)

-- Groups
local group = Sushi.Group(Panel)
group:SetPoint('TOPLEFT', 20, -175)
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

local glow = Sushi.Glowbox(Panel, 'This is a glow box.')
glow:SetPoint('BOTTOM', header2, 'TOP')


-- Options Panels
local options = Sushi.OptionsGroup(Panel, 'Options Group')
options:SetSubtitle('Parented to an existing frame if you wish. Remove parent to create your own category.')
options:SetChildren(function(group)
	group:Add('RedButton', 'Say Hello')
	group:Add('Check', 'A demo check')

	local slider = group:Add('Slider', 'A demo slider', 30)
	slider:SetRange(0, 100, 'None')
	slider:SetCall('OnInput', function(slider, value)
		print('Demo slider is now ' .. tostring(value))
	end)

	local choice = group:Add('DropChoice', 'A demo choice', 1)
	choice:AddChoices{ {key = 1, text = 'First'}, {key = 2, text = 'Second'}, {key = 3, text = 'Third'} }
	choice:SetCall('OnInput', function(choice, key)
		print('Demo choice is now ' .. tostring(key))
	end)
end)

Sushi.ScrollingOptions(Panel, 'Scrolling Options'):SetChildren(function(group)
	group:Add('Header', 'Category One', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}
	group:Add('RedButton', 'Say Hello')

	for i = 1, 20 do
		group:Add('Check', 'Demo check ' .. tostring(i))
	end

	group:Add('Header', 'Category Two', 'GameFontNormalLarge'):SetKeys {top = 30, bottom = 20}

	local slider = group:Add('Slider', 'A demo slider', 30)
	slider:SetRange(0, 100, 'None')
	slider:SetCall('OnInput', function(slider, value)
		print('Demo slider is now ' .. tostring(value))
	end)

	local choice = group:Add('DropChoice', 'A demo choice', 1)
	choice:AddChoices{ {key = 1, text = 'First'}, {key = 2, text = 'Second'}, {key = 3, text = 'Third'} }
	choice:SetCall('OnInput', function(choice, key)
		print('Demo choice is now ' .. tostring(key))
	end)
end)