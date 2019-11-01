if not WoWUnit then return end

local Tests = WoWUnit('Sushi-3.1')
local Sushi = LibStub('Sushi-3.1')
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

function Tests:GroupResize()
  local group = Sushi.Group(nil, function(group)
    group:Add('HelpButton')
    group:AddBreak()

    IsTrue(group:GetWidth() > 0 and group:GetHeight() > 0)
  end)
end
