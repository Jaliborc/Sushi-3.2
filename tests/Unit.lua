local Tests = WoWUnit and WoWUnit('Sushi-3.2')
if not Tests then return end

local Sushi = LibStub('Sushi-3.2')
local AreEqual, IsFalse, IsTrue = WoWUnit.AreEqual, WoWUnit.IsFalse, WoWUnit.IsTrue

function Tests:CallableReset()
  local c = Sushi.Callable:NewClass('Frame')
  c.default = 1

  local f = c()
  f.var = 2
  f.Static = 3
  f:Release()

  AreEqual(f.default, 1)
  AreEqual(f.var, nil)
  AreEqual(f.Static, 3)
end

function Tests:GroupAdd()
  local group = Sushi.Group()
  group:Add('HelpButton')
  group:Add(CreateFrame('Frame', nil, group))
end

function Tests:GroupResize()
  local group = Sushi.Group(nil, function(group)
    group:Add('HelpButton')
    group:AddBreak()

    IsTrue(group:GetWidth() > 0 and group:GetHeight() > 0)
  end)
end
