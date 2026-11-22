![Preview](http://jaliborc.com/media/addons/large/sushi-3.1.webp)
[![News](http://img.shields.io/badge/news-patreon-ff424d)](https://www.patreon.com/jaliborc)
[![Donate](http://img.shields.io/badge/donate-paypal-0079C1)](https://www.paypal.me/jaliborc)
[![Community](http://img.shields.io/badge/community-discord-5865F2)](https://bit.ly/discord-jaliborc)

# Sushi-3.2 🍣

An object-oriented Lua library to build and extend World of Warcraft widgets with composable layouts, custom events, and a chainable API.

[**Browse the interactive class reference**](https://jaliborc.github.io/Sushi-3.2/) · Explore classes, inheritance, and widget relationships.

Requires [LibStub](https://www.wowace.com/projects/libstub) and [Poncho-2.0](https://github.com/jaliborc/poncho-2.0).

## How to Use
Create a dropdown choice menu with `Sushi.DropChoice`.

```lua
local menu = LibStub('Sushi-3.2').DropChoice(MyParent, 'Choose your Sushi', 'salmon')
menu:SetPoint('CENTER')
menu:AddChoices{
	{key = 'salmon', text = 'Salmon'},
	{key = 'grouper', text = 'Grouper'},
	{key = 'none', text = 'None'}
}

menu:SetCall('OnInput', function(self, key)
	if key == 'none' then
		print('Not hungry?')
	else
		print('The fish was a lie.')
	end
end)
```

:bulb: Three things of note in this snippet:
* Functionality is available as methods, never as attributes.  
* `SetCall` works much like the native `SetScript`, except it is a method defined by the library. Multiple functions can be assigned to a single event.
* If you release the frame `menu`, all attributes assigned to it and properties modified through class methods will be cleared.

## :warning: Reminder!
If you use this library, please list it as one of your dependencies in the CurseForge admin system. It's a big help! :+1:
