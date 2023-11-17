![Preview](http://jaliborc.com/media/addons/large/sushi-3.1.webp)
[![News](http://img.shields.io/badge/news-patreon-ff424d)](https://www.patreon.com/jaliborc)
[![Donate](http://img.shields.io/badge/donate-paypal-0079C1)](https://www.paypal.me/jaliborc)
[![Community](http://img.shields.io/badge/community-discord-5865F2)](https://bit.ly/discord-jaliborc)

# Sushi-3.2 :sushi:
Sushi is a GUI framework for the game World of Warcraft, designed to be:
* Completely object oriented.
* Versatile and easily extendable.
* A taint-free alternative to frequently used objects (for example, dropdowns)
* Similar to Blizzard's API and hence, easy to learn.

Requires [LibStub](https://www.wowace.com/projects/libstub) and [Poncho-2.0](https://github.com/jaliborc/poncho-2.0).

## How to Use
For instance, imagine you wish to create a dropdown choice menu. To do so, you can simply call the `Sushi.Choice` class:
````lua
local myMenu = LibStub('Sushi-3.2').Choice(MyParent)
myMenu:SetPoint('CENTER')

myMenu:SetLabel('My Awesome Dropdown')
myMenu:AddChoice('Salmon')
myMenu:AddChoice('Grouper')
myMenu:AddChoice('None')

myMenu:SetCall('OnInput', function(self, value)
	if value == 'None' then
		print('Not hungry?')
	else
		print('You cannot have it.')
	end
end)
````

:bulb: Three things of note in this snippet:
* Functionality is available as methods, never as attributes.  
* `SetCall` work much alike the native `SetScript`, except it is a method defined by the library. Multiple functions can be assigned to a single event.
* If you release the frame `myMenu`, all attributes assigned to it and properties modified trough class methods will be cleared.

## Available Classes
Each class is defined in it's own `.lua` file under the `\classes` directory. The library contains classes to display buttons, checkbuttons, dropdowns, editboxes, sliders, static popups, automatic layouts and more. Read the [Class Reference](https://github.com/Jaliborc/Sushi-3.0/wiki) for further details.

No class makes use of native code that can generate taint. For example, the  [Dropdown](https://github.com/Jaliborc/Sushi-3.0/wiki/Dropdown) frame implementation does not make use of the `UIDropDownMenu` API.

## :warning: Reminder!
If you use this library, please list it as one of your dependencies in the CurseForge admin system. It's a big help! :+1:
