local Drop, Version = MakeSushi(1, 'Frame', 'DropdownFrame', nil, nil, SushiGroup)
if not Version then
	local function hideAll()
		for i, frame in ipairs(Drop.usedFrames) do
			frame:Hide()
		end
	end

	hooksecurefunc('ToggleDropDownMenu', hideAll)
	hooksecurefunc('CloseDropDownMenus', hideAll)
end


--[[ Startup ]]--

function Drop:OnCreate()
	SushiGroup.OnCreate(self)
	self:SetFrameStrata('FULLSCREEN_DIALOG')
	self:SetToplevel(1)

	local dialogBG = CreateFrame('Frame', nil, self)
	dialogBG:SetFrameLevel(self:GetFrameLevel())
	dialogBG:SetPoint('BOTTOMLEFT', -11, -11)
	dialogBG:SetPoint('TOPRIGHT', 11, 11)
	dialogBG:SetBackdrop({
		bgFile = 'Interface\\DialogFrame\\UI-DialogBox-Background-Dark',
		edgeFile = 'Interface\\DialogFrame\\UI-DialogBox-Border',
		insets = {left = 11, right = 11, top = 11, bottom = 9},
		edgeSize = 32, tileSize = 32, tile = true
	})
end

function Drop:OnAcquire()
	SushiCallHandler.OnAcquire(self)

	self:SetResizing('VERTICAL')
	self:SetOrientation('HORIZONTAL')
	self:SetCall('UpdateChildren', function()
		self.width = 0
		self:FireCall('UpdateLines')
		self:SetWidth(self.width + 30)

		for button in self:IterateChildren() do
			button:SetWidth(self.width + 25)
		end
	end)
end


--[[ API ]]--

function Drop:SetChildren(...)
	self:SetCall('UpdateLines', ...)
	self:UpdateChildren()
end

function Drop:AddLine(data)
	local button = self:Create('DropdownButton')
	button:SetTip(data.tooltipTitle, data.tooltipText)
	button:SetChecked(data.value)
	button:SetRadio(data.isRadio)
	button:SetText(data.text)
	button:SetCall('OnClick', function()
		data:func()
		self:SetShown(data.keepShownOnClick)
	end)

	self.width = max(self.width, button:GetTextWidth())
end