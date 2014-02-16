local Drop, Version = MakeSushi(4, 'Frame', 'DropdownFrame', nil, nil, SushiGroup)
if not Drop then
	return
elseif not Version then
	local function closeAll()
		Drop:CloseAll()
	end

	hooksecurefunc('ToggleDropDownMenu', closeAll)
	hooksecurefunc('CloseDropDownMenus', closeAll)
end

local function get(value, ...)
	if type(value) == 'function' then
		return value(...)
	end
	return value
end


--[[ Startup ]]--

function Drop:OnCreate()
	SushiGroup.OnCreate(self)
	self:SetOrientation('HORIZONTAL')
	self:SetResizing('VERTICAL')

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
	self:SetFrameStrata('FULLSCREEN_DIALOG')
	self:SetCall('UpdateChildren', function()
		self.width = 0
		
		local lines = get(self.lines, self)
		if lines then
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
	button:SetChecked(get(data.checked, data))
	button:SetRadio(data.isRadio)
	button:SetText(data.text)
	button:SetCall('OnClick', function()
		data.checked = button:GetChecked()
		data:func()
		self:SetShown(data.keepShownOnClick)
	end)

	self.width = max(self.width, button:GetTextWidth())
end


--[[ Static ]]--

function Drop:Toggle(...)
	local n = select('#', ...)
	local anchor = select(n < 3 and 1 or 2, ...)
	local target = anchor ~= self.target and anchor

	PlaySound('igMainMenuOptionCheckBoxOn')
	CloseDropDownMenus()
	self:CloseAll()
	self.target = target

	if target then
		local frame = self(anchor)
		if n < 3 then
			frame:SetPoint('TOP', anchor, 'BOTTOM', 0, -5)
		else
			frame:SetPoint(...)
		end

		frame:SetLines(select(n, ...))
	end

end

function Drop:CloseAll()
	for i, frame in ipairs(self.usedFrames) do
		frame:Release()
	end

	self.target = nil
end

SushiDropFrame = Drop