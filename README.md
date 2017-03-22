# Sushi-3.0 :sushi:
Sushi is a GUI framework for the game World of Warcraft, designed to be:

* Versatile and easily extendable.
* Completely object oriented.
* Similar to Blizzard's API and hence, easy to learn.
* Wrapped in seaweed for extra flavor.

## Why Sushi?
Why not? While there are some popular GUI frameworks out there, they tend to share one large problem: instead of being _object driven_, has it was to expect from a GUI framework, they are _data driven_.

While it may appear to be an interesting idea, this makes the libraries hardly flexible: they force the developer to follow a given layout. The inexistence of inherence turns the creation of new widget classes into a burdening process. On top of that, they tend to have an incredible high amount of memory, cpu usage and code complexity for how _little_ they achieve.

They become good at just one thing: building configuration menus. Commonly, improperly designed configuration menus, as they are incapable to react to the application needs. Sushi, on the other hand, is good for everything. And even better with soy sauce.

## What's in the Box?
Basically, Sushi is composed of a collection of frame classes. Here is the complete list as of January 2012:

> ![Tasty](https://github.com/jaliborc/Sushi-3.0/wiki/Images/Sushi-Graph.png)

## How to Use
For instance, imagine you wish to create a Dropdown. After properly including Sushi in your addon _(see below)_, simply call the `SushiDropdown` class:

	local myDropdown = SushiDropdown()
	myDropdown:SetPoint('CENTER')
	myDropdown:SetLabel('My Awesome Dropdown')
	
	myDropdown:AddLine('Salmon')
	myDropdown:AddLine('Grouper')
	myDropdown:AddLine('None')
	
	myDropdown:SetCall('OnInput', function(self, v)
		if v == 'None' then
			print('Not hungry?')
		else
			print('You cannot have it.')
		end
	end)

### :bulb: Notice!

* All classes are named as in the graph above, but preceded by `Sushi`.
* All functionality is available as methods, never as attributes.
* `SetCall` work exactly alike the native `SetScript`, except it is a method defined by Sushi.

## Installation
Sushi is installed exactly has any other library for World of Warcraft:

1. Download [Sushi](https://github.com/Jaliborc/Sushi-3.0), [Poncho](https://github.com/Jaliborc/Poncho-1.0) and [LibStub](https://github.com/p3lim/LibStub).
2. Include the three folders in the directory of your add-on.
3. Add these three lines to your _.toc_ file, before any other loading line:

.

	LibStub\LibStub.lua
	Poncho-1.0\Poncho-1.0.xml
	Sushi-3.0\Sushi-3.0.xml

## More Information
* See [Class Reference](https://github.com/Jaliborc/Sushi-3.0/wiki/Class-Reference) for a complete list of every class.
* Read the [Best Practices](https://github.com/Jaliborc/Sushi-3.0/wiki/Best-practices) section.
* For questions or additional help, post [an issue](https://github.com/Jaliborc/Sushi-3.0/issues/new).
