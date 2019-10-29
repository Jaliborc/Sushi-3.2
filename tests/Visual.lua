local Sushi = LibStub('Sushi-3.1')
local Panel =  CreateFrame('Frame', nil, InterfaceOptionsFrame)
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

local redButton = Sushi.RedButton(Panel)
redButton:SetPoint('LEFT', helpButton, 'RIGHT', 5, 0)
redButton:SetText('Red Button')

local grayButton = Sushi.GrayButton(Panel)
grayButton:SetPoint('LEFT', redButton, 'RIGHT', 5, 0)
grayButton:SetText('Gray Button')

local check = Sushi.Check(Panel)
check:SetPoint('LEFT', grayButton, 'RIGHT', 5, 0)
check:SetText('Check Button')

local expand = Sushi.ExpandCheck(Panel)
expand:SetPoint('LEFT', check, 'RIGHT', 5, 0)
expand:SetText('Expand Check')

local check2 = Sushi.Check(Panel)
check2:SetPoint('TOPLEFT', helpButton, 'BOTTOMLEFT', 0, -5)
check2:SetText('A really really long disabled button')
check2:SetEnabled(false)
check2:SetChecked(true)

local icon = Sushi.IconCheck(Panel)
icon:SetPoint('TOPLEFT', check2, 'TOPRIGHT', 5, 0)
icon:SetText('Icon Check')
icon:SetIcon('Interface/Icons/ability_bullrush')

local glow = Sushi.GlowBox(Panel, 'This is a glow box.')
glow:SetPoint('BOTTOM', expand, 'TOP', 0, 30)

local group = Sushi.Group(Panel)
group:SetPoint('TOPLEFT', check2, 'BOTTOMLEFT', 0, -5)
group:SetContent(function()
  for i = 1, 4 do
    group:Add('HelpButton')
    group:Add('HelpButton')
    group:AddBreak()
  end
end)

local header = Sushi.Header(group, 'This is a parent-resized header')
header:SetPoint('TOPLEFT', group, 'BOTTOMLEFT', 0, -5)

local magic1 = Sushi.Magic('Sushi-3.1 Magic')
local magic2 = Sushi.Magic(magic1, 'Subcategory')
local magic3 = Sushi.Magic(magic1)
magic3:SetSubtitle('Magic group parented to an existing frame')
magic3:SetFooter('This is a footer')
