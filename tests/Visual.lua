local Sushi = LibStub('Sushi-3.1')
local Panel = CreateFrame('Frame', nil, InterfaceOptionsFrame)
Panel:Hide()
Panel.name = 'Sushi-3.1'
InterfaceOptions_AddCategory(Panel)

local helpButton = Sushi.HelpButton(Panel)
helpButton:SetPoint('TOPLEFT', 10, -10)
helpButton:SetTip('Help', 'An help button.')
helpButton:SetCall('OnClick', function()
  print('clicked help button')
end)
helpButton:SetText('Hello')

local redButton = Sushi.RedButton(Panel, 'Red Button')
redButton:SetPoint('LEFT', helpButton, 'RIGHT', 5, 0)

local grayButton = Sushi.GrayButton(Panel, 'Gray Button')
grayButton:SetPoint('LEFT', redButton, 'RIGHT', 5, 0)

local check = Sushi.Check(Panel, 'Check Button')
check:SetPoint('LEFT', grayButton, 'RIGHT', 5, 0)

local expand = Sushi.ExpandCheck(Panel, 'Expand Check')
expand:SetPoint('LEFT', check, 'RIGHT', 5, 0)

local glow = Sushi.Glowbox(Panel, 'This is a glow box.')
glow:SetPoint('BOTTOM', expand, 'TOP', 0, 30)

local check2 = Sushi.Check(Panel)
check2:SetPoint('TOPLEFT', helpButton, 'BOTTOMLEFT', 0, -5)
check2:SetText('A really really long disabled button')
check2:SetEnabled(false)
check2:SetChecked(true)

local icon = Sushi.IconCheck(Panel, 'Interface/Icons/ability_bullrush', 'Icon Check')
icon:SetPoint('TOPLEFT', check2, 'TOPRIGHT', 5, 0)

local group = Sushi.Group(Panel)
group:SetPoint('TOPLEFT', icon, 'TOPRIGHT', 5, 0)
group:SetChildren(function()
  for i = 1, 4 do
    group:Add('HelpButton')
    group:Add('HelpButton')
    group:AddBreak()
  end
end)

local header1 = Sushi.Header(group, 'This is a parent-resized header')
header1:SetPoint('TOPLEFT', group, 'BOTTOMLEFT', 0, -5)

local header2 = Sushi.Header(group, 'This is not')
header2:SetPoint('TOPLEFT', header1, 'BOTTOMLEFT', 0, -5)
header2:SetWidth(100)

local placeholder = CreateFrame('Frame', nil, Panel)
placeholder:SetPoint('TOPLEFT', check2, 'BOTTOMLEFT', 0, 10)
placeholder:SetSize(150, 70)
placeholder.name = 'Magic Group'

local magic1 = Sushi.MagicGroup(placeholder)
magic1:SetSubtitle('Parented to an existing frame')

local magic2 = Sushi.MagicGroup('Sushi-3.1 Magic Group')
local magic3 = Sushi.MagicGroup(magic2, 'Subcategory')
magic3:SetFooter('This is a footer')

local credits = Sushi.CreditsGroup(magic2, {
  {title = 'Fruits', people = {'Banana', 'Strawberry'}}
})

local faux = Sushi.FauxScroll(Panel, 3, 22)
faux:SetPoint('TOPLEFT', placeholder, 'BOTTOMLEFT')
faux:SetChildren(function()
  faux:SetNumEntries(5)

  for i = faux:FirstEntry(), faux:LastEntry() do
    faux:Add('RedButton', 'Faux scroll entry #' .. tostring(i))
  end
end)

local edit = Sushi.Editbox(Panel, 'Editbox', 'Some user text')
edit:SetPoint('TOPLEFT', placeholder, 'TOPRIGHT', 10, -30)
edit:SetCall('OnInput', function(edit, value)
  print('Editbox changed value to ' .. value)
end)

local color = Sushi.ColorPicker(Panel, 'Color Picker', 1,0,0, 1)
color:SetPoint('TOPLEFT', faux, 'TOPRIGHT', 5, 0)
