local Drop, Version = MakeSushi(1, 'Frame', 'DropdownFrame', nil, nil, SushiGroup)
if not Drop then
	return
elseif not Version then
	local function closeAll()
		Drop:CloseAll()
	end

	hooksecurefunc('ToggleDropDownMenu', closeAll)
	hooksecurefunc('CloseDropDownMenus', closeAll)
end


--[[ Startup ]]--

function Drop:OnCreate()
	SushiGroup.OnCreate(self)
	self:SetFrameStrata('FULLSCREEN_DIALOG')
	self:SetOrientation('HORIZONTAL')
	self:SetResizing('VERTICAL')
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

	self.lines = nil
	self:SetCall('UpdateChildren', function()
		self.width = 0
		
		local lines = type(self.lines) == 'function' and self:lines() or self.lines
		if type(lines) == 'table' then
			for i, line in ipairs(lines) do
				self:AddLine(line)
			end
		end

		for button in self:IterateChildren() do
			button:SetWidth(self.width + 25)
		end

		self:SetWidth(self.width + 30)
	end)
end


--[[ API ]]--

function Drop:SetLines(lines)
	self.lines = lines
	self:UpdateChildren()
end

function Drop:AddLine(data)
	local button = self:Create('DropdownButton')
	button:SetTip(data.tooltipTitle, data.tooltipText)
	button:SetChecked(data.checked)
	button:SetRadio(data.isRadio)
	button:SetText(data.text)
	button:SetCall('OnClick', function()
		data:func()
		self:SetShown(data.keepShownOnClick)
	end)

	self.width = max(self.width, button:GetTextWidth())
end


--[[ Static ]]--

function Drop:Toggle(anchor, children)
	local target = anchor ~= self.target and anchor

	CloseDropDownMenus()
	self:CloseAll()
	self.target = target

	if target then
		local frame = self()
		frame:SetPoint('BOTTOM', anchor, 'TOP')
		frame:SetLines(children)
	end

end

function Drop:CloseAll()
	for i, frame in ipairs(self.usedFrames) do
		frame:Release()
	end

	self.target = nil
end

SushiDropFrame = Drop