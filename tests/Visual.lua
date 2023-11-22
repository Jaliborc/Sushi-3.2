if not WoWUnit or WoWUnit:HasGroup('Sushi-3.2') then return end

local Sushi = LibStub('Sushi-3.2')
local Panel = CreateFrame('Frame', nil, SettingsPanel or InterfaceOptionsFrame)
Panel:Hide()
Panel.name = 'Sushi-3.2'
InterfaceOptions_AddCategory(Panel)

-- Singletons
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

local glow = Sushi.Glowbox(Panel, 'This is a glow box.')
glow:SetPoint('BOTTOM', expand, 'TOP', 0, 30)

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

local slider = Sushi.Slider(Panel, 'Slider', 30)
slider:SetPoint('TOPLEFT', 20, -130)
slider:SetRange(0, 100, 'None')

local choice = Sushi.DropChoice(Panel, 'Dropdown Choice', 2)
choice:AddChoices{ {key = 1, text = 'Hi'}, {key = 2, text = 'Hey'}, {key = 3, text = 'Hello'} }
choice:SetPoint('TOPLEFT', slider, 'TOPRIGHT', 5, -2)


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

local faux = Sushi.FauxScroll(Panel, 3, 22)
faux:SetPoint('TOPLEFT', group, 'TOPRIGHT')
faux:SetChildren(function()
	faux:SetNumEntries(5)

	for i = faux:First(), faux:Last() do
		faux:Add('RedButton', 'Faux scroll entry #' .. tostring(i))
	end
end)

local options1 = Sushi.OptionsGroup(Panel, 'Subcategory')
options1:SetSubtitle('Parented to an existing frame')

local options2 = Sushi.OptionsGroup('Sushi-3.2 Options Group')
local options3 = Sushi.OptionsGroup(options2, 'Subcategory')
options3:SetFooter('This is a footer')

-- Dropdown
local dropTitle = Sushi.DropButton(Panel, {text = 'Drop Buttons', isTitle = true})
dropTitle:SetPoint('TOPLEFT', 20, -310)

local dropButton1 = Sushi.DropButton(Panel, {text = 'Uncheckable', notCheckable = true})
dropButton1:SetPoint('TOPLEFT', dropTitle, 'BOTTOMLEFT', 0, 0)

local dropButton2 = Sushi.DropButton(Panel, {text = 'Disabled', disabled = true})
dropButton2:SetPoint('TOPLEFT', dropButton1, 'BOTTOMLEFT', 0, 0)

local dropButton3 = Sushi.DropButton(Panel, {text = 'Not Radio', isNotRadio = true, func = print})
dropButton3:SetPoint('TOPLEFT', dropButton2, 'BOTTOMLEFT', 0, 0)

local drop = Sushi.Dropdown(Panel)
drop:SetPoint('TOPLEFT', dropTitle, 'TOPRIGHT', 15, 0)
drop:SetChildren(function()
	drop:Add{ text = 'Dropdown', isTitle = true }
	drop:Add{ text = 'It Can', isNotRadio = true }
	drop:Add{ text = 'Do All That', isNotRadio = true, checked = true }
	drop:Add{ text = 'Dropdowns Do', isNotRadio = true, sublevel = {
		{text = 'Yeah...'}, {text = 'Even This', sublevel = {{text = 'Forever'}}}} }.bottom = 8
	drop:Add('RedButton', 'And More').left = 16
end)
