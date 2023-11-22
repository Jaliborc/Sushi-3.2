local Header = LibStub('Sushi-3.2').Clickable:NewSushi('ExpandHeader', 1, 'Button', 'SettingsExpandableSectionTemplate')
if not Header then return end


--[[ Construct ]]--

function Header:Bind(frame)
    return setmetatable(frame.Button, self)
end

function Header:Construct()
	local b = self:Super(Header):Construct()
    b:SetFontString(b.Text)
    return b
end

function Header:New(parent, text, font)
	local b = self:Super(Header):New(parent)
    b:SetNormalFontObject(font)
    b:SetJustifyH('LEFT')
    b:SetText(text)
	b:UpdateWidth()

    if parent.SetCall then
		parent:SetCall('OnResize', function() b:UpdateWidth() end)
	end

	return b
end

function Header:OnClick(button)
    self:SetChecked(not self:GetChecked())
    self:Super(Header):OnClick(button)
end


--[[ API ]]--

function Header:SetChecked(checked)
    if checked then
        self.Right:SetAtlas('Options_ListExpand_Right_Expanded', TextureKitConstants.UseAtlasSize)
    else
        self.Right:SetAtlas('Options_ListExpand_Right', TextureKitConstants.UseAtlasSize)
    end
end

function Header:GetChecked()
    return self.Right:GetAtlas() == 'Options_ListExpand_Right_Expanded'
end

function Header:SetWidth(width)
	self.manual = true
	self:Super(Header):SetWidth(width)
end

function Header:SetNormalFontObject(font)
	self:Super(Header):SetNormalFontObject(font or GameFontNormal)
end

function Header:SetJustifyH(justify)
	self:GetFontString():SetJustifyH(justify)
end

function Header:GetJustifyH()
	return self:GetFontString():GetJustifyH()
end


--[[ Resize ]]--

function Header:UpdateWidth()
	if not self.manual and self:GetParent() then
		self:Super(Header):SetWidth(self:GetParent():GetWidth() - self.left - self.right)
	end
end

Header.left, Header.right, Header.bottom = 8, 30, 5
Header.SetValue, Header.GetValue = Header.SetChecked, Header.GetChecked
Header.SetExpanded, Header.IsExpanded = Header.SetChecked, Header.GetChecked