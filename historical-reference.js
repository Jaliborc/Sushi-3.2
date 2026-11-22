export default {
  "3.1": {
    "repository": "https://github.com/Jaliborc/Sushi-3.2",
    "commit": "98f222450818dc0c79588488b1ada750a39a7794",
    "nodes": [
      {
        "id": "Base",
        "parent": null,
        "family": "Core",
        "kind": "Poncho base",
        "file": "Sushi-3.1.lua",
        "line": 22,
        "abstract": true,
        "aliases": [],
        "x": 12,
        "y": 282,
        "summary": "The root of Sushi 3.1’s class hierarchy. It extends Poncho-2.0 with Sushi class registration.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/Sushi-3.1.lua#L22",
        "doc": "<p>Base extends the Poncho-2.0 base class and registers the classes exposed by LibStub(&quot;Sushi-3.1&quot;). Class versions allow a newer definition to replace an older one when several addons embed the library. Sushi-defined Set methods installed through the class metatable return the receiving widget for chaining. This is a base class for other Sushi widgets.</p>\n<h3>Class registration</h3>\n<dl class=\"api-table\">\n<div><dt><code>NewSushi(name, version, type, template, global)</code></dt><dd>Registers a Sushi subclass from the receiving class. Returns the class and its previous version number when this definition takes precedence.</dd></div>\n</dl>\n<h3>Inherited lifecycle</h3>\n<dl class=\"api-table\">\n<div><dt><code>New(parent, ...)</code></dt><dd>Acquires an instance or constructs one if the pool is empty.</dd></div>\n<div><dt><code>Reset()</code></dt><dd>Resets the current instance so it can be reused. Callable extends this behavior for most Sushi widgets.</dd></div>\n<div><dt><code>Release()</code></dt><dd>Returns the widget to its class’s frame pool.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal Class = Sushi.Callable:NewSushi(&quot;MyAddonFrame&quot;, 1, &quot;Frame&quot;)\nif Class then\n    local frame = Class(UIParent)\n    frame:SetSize(160, 80)\nend</code></pre>"
      },
      {
        "id": "Callable",
        "parent": "Base",
        "file": "classes/core/Callable.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Core",
        "x": 186,
        "y": 282,
        "aliases": [],
        "summary": "Adds custom events with multiple handlers. It also prepares pooled widgets for reuse.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Callable.lua#L20",
        "doc": "<p>Callable adds custom events to Sushi frames. An event can have several handlers. Each receives the widget as its first argument, followed by any event values. Reset runs the OnReset handlers and clears lowercase instance fields, including the callback storage. It inherits from <a href=\"#Base\" data-class=\"Base\">Base</a>. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetCall(event, handler)</code></dt><dd>Appends a handler to the event’s list.</dd></div>\n<div><dt><code>GetCalls(event)</code></dt><dd>Returns the registered handler array, if present.</dd></div>\n<div><dt><code>FireCalls(event, ...)</code></dt><dd>Invokes the registered handlers in order with the widget and any extra arguments.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnReset()</code></dt><dd>Fires before the widget’s state is reset.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal button = Sushi.RedButton(UIParent, &quot;Apply&quot;)\nbutton:SetCall(&quot;OnClick&quot;, function(self)\n    print(self:GetLabel())\nend)</code></pre>"
      },
      {
        "id": "Tipped",
        "parent": "Callable",
        "file": "classes/core/Tipped.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Core",
        "x": 360,
        "y": 353,
        "aliases": [],
        "summary": "Adds mouseover tooltips and hover events to widgets.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Tipped.lua#L20",
        "doc": "<p>Tipped adds mouseover tooltips and enter and leave callbacks to <a href=\"#Callable\" data-class=\"Callable\">Callable</a> widgets. It uses the game’s shared tooltip. The tooltip is anchored to the left near the right screen edge and to the right elsewhere. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTooltip(title, body), SetTip(title, body)</code></dt><dd>Sets the tooltip heading and optional body. Clear the title to suppress the tooltip.</dd></div>\n<div><dt><code>GetTooltip(), GetTip()</code></dt><dd>Returns the configured heading and body.</dd></div>\n<div><dt><code>GetTooltipAnchor(), GetTipAnchor()</code></dt><dd>Returns the anchor calculated from the widget’s position.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnEnter(), OnLeave()</code></dt><dd>Fire when the mouse enters or leaves the widget, after the tooltip logic runs.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal help = Sushi.HelpButton(UIParent)\nhelp:SetTip(&quot;Help&quot;, &quot;Choose a class to open its reference.&quot;)</code></pre>"
      },
      {
        "id": "Labeled",
        "parent": "Tipped",
        "file": "classes/core/Labeled.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Core",
        "x": 534,
        "y": 519,
        "aliases": [],
        "summary": "Adds a separate text label and small-font styling to widgets.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Labeled.lua#L20",
        "doc": "<p>Labeled adds a separate label to a widget. It keeps the label’s font in sync with compact and enabled states. <a href=\"#Editable\" data-class=\"Editable\">Editable</a>, <a href=\"#DropChoice\" data-class=\"DropChoice\">DropChoice</a>, and <a href=\"#Slider\" data-class=\"Slider\">Slider</a> build on this behavior. It inherits from <a href=\"#Tipped\" data-class=\"Tipped\">Tipped</a>. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(label), GetLabel()</code></dt><dd>Sets or reads the separate label.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Controls or queries the compact label font.</dd></div>\n<div><dt><code>SetEnabled(enabled)</code></dt><dd>Sets the widget’s enabled state and refreshes the label font.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal slider = Sushi.Slider(UIParent, &quot;Volume&quot;, 50, 0, 100, 5)\nslider:SetSmall(true)\nslider:SetLabel(&quot;Music volume&quot;)</code></pre>"
      },
      {
        "id": "Clickable",
        "parent": "Tipped",
        "file": "classes/buttons/Clickable.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Buttons",
        "x": 534,
        "y": 328,
        "aliases": [],
        "summary": "Turns mouse clicks into Sushi events that can carry the widget’s current value.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Clickable.lua#L20",
        "doc": "<p>Clickable adds the common click behavior to <a href=\"#Tipped\" data-class=\"Tipped\">Tipped</a>. The handler plays the widget sound and reads its value if it exposes GetValue. Text buttons, checkboxes, and menu rows derive from it. This is a base class for other Sushi widgets.</p>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick(button, value)</code></dt><dd>Receives the mouse-button identifier and the current value, when available.</dd></div>\n<div><dt><code>OnInput(value)</code></dt><dd>Fires with the current value after OnClick.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the input callbacks.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal check = Sushi.Check(UIParent, &quot;Enable sound&quot;)\ncheck:SetCall(&quot;OnClick&quot;, function(self, button, value)\n    print(button, value)\nend)</code></pre>"
      },
      {
        "id": "TextedClickable",
        "parent": "Clickable",
        "file": "classes/buttons/Texted.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Buttons",
        "x": 708,
        "y": 362,
        "aliases": [],
        "summary": "Adds text labels, adjustable font sizing and automatic button width.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Texted.lua#L20",
        "doc": "<p>TextedClickable adds a text label and compact typography to <a href=\"#Clickable\" data-class=\"Clickable\">Clickable</a> buttons. Setting the text adjusts the button’s width, with a minimum width and padding defined by the class. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), SetLabel(text)</code></dt><dd>Sets the text and recalculates the button width.</dd></div>\n<div><dt><code>GetLabel()</code></dt><dd>Returns the button text.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Controls or queries the compact font style.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal button = Sushi.RedButton(UIParent, &quot;Save&quot;)\nbutton:SetSmall(true)\nbutton:SetLabel(&quot;Save changes&quot;)</code></pre>"
      },
      {
        "id": "HelpButton",
        "parent": "Clickable",
        "file": "classes/buttons/Help.lua",
        "line": 20,
        "kind": "Button",
        "abstract": false,
        "family": "Buttons",
        "x": 708,
        "y": 253,
        "aliases": [],
        "summary": "A question-mark button for contextual help.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Help.lua#L20",
        "doc": "<p>HelpButton is a small built-in information icon with a hover highlight. It inherits mouseover tooltips from <a href=\"#Tipped\" data-class=\"Tipped\">Tipped</a> and click callbacks from <a href=\"#Clickable\" data-class=\"Clickable\">Clickable</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/HelpButton.png\" alt=\"HelpButton widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTip(title, body)</code></dt><dd>Supplies tooltip text for the icon.</dd></div>\n<div><dt><code>SetCall(&quot;OnClick&quot;, handler)</code></dt><dd>Registers what should happen when the icon is clicked.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal help = Sushi.HelpButton(UIParent)\nhelp:SetPoint(&quot;CENTER&quot;)\nhelp:SetTip(&quot;Shortcuts&quot;, &quot;Press Escape to close the panel.&quot;)</code></pre>"
      },
      {
        "id": "RedButton",
        "parent": "TextedClickable",
        "file": "classes/buttons/Red.lua",
        "line": 20,
        "kind": "Button",
        "abstract": false,
        "family": "Buttons",
        "x": 882,
        "y": 302,
        "aliases": [],
        "summary": "A standard World of Warcraft push button with a text label.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Red.lua#L20",
        "doc": "<p>RedButton is a <a href=\"#TextedClickable\" data-class=\"TextedClickable\">TextedClickable</a> push button styled with UIPanelButtonNoTooltipTemplate. The template supplies the red button textures. Sushi supplies the text sizing, tooltip behavior, and callbacks.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/TextButton.png\" alt=\"RedButton widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Sets or reads the button text.</dd></div>\n<div><dt><code>SetSmall(small)</code></dt><dd>Selects compact button typography.</dd></div>\n<div><dt><code>SetCall(&quot;OnClick&quot;, handler)</code></dt><dd>Runs a handler after the button is clicked.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal button = Sushi.RedButton(UIParent, &quot;Apply&quot;)\nbutton:SetPoint(&quot;CENTER&quot;)\nbutton:SetCall(&quot;OnClick&quot;, function()\n    print(&quot;Settings applied&quot;)\nend)</code></pre>"
      },
      {
        "id": "GrayButton",
        "parent": "RedButton",
        "file": "classes/buttons/Gray.lua",
        "line": 20,
        "kind": "Button",
        "abstract": false,
        "family": "Buttons",
        "x": 1056,
        "y": 302,
        "aliases": [],
        "summary": "A muted push button for secondary actions.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Gray.lua#L20",
        "doc": "<p>GrayButton is a gray variant of <a href=\"#RedButton\" data-class=\"RedButton\">RedButton</a>. It substitutes gray art for its normal state and retains the inherited text and callback API.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/GrayButton.png\" alt=\"GrayButton widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Sets or reads the button’s label.</dd></div>\n<div><dt><code>SetTip(title, body)</code></dt><dd>Adds an optional tooltip.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal cancel = Sushi.GrayButton(UIParent, &quot;Cancel&quot;)\ncancel:SetTip(&quot;Cancel&quot;, &quot;Close this panel.&quot;)\ncancel:SetCall(&quot;OnClick&quot;, function(self)\n    self:Hide()\nend)</code></pre>"
      },
      {
        "id": "Header",
        "parent": "Clickable",
        "file": "classes/buttons/Header.lua",
        "line": 20,
        "kind": "Button",
        "abstract": false,
        "family": "Buttons",
        "x": 708,
        "y": 82,
        "aliases": [],
        "summary": "A text-only button that can resize to its parent, with optional underlining.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Header.lua#L20",
        "doc": "<p>Header displays clickable, optionally underlined text. In a Sushi group it reacts to parent resize events until an explicit width is set. It updates its height to fit the font string. It inherits from <a href=\"#Clickable\" data-class=\"Clickable\">Clickable</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Header.png\" alt=\"Header widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), GetText()</code></dt><dd>Sets or reads the heading text. SetLabel and GetLabel are aliases.</dd></div>\n<div><dt><code>SetNormalFontObject(font)</code></dt><dd>Sets the font used by the heading.</dd></div>\n<div><dt><code>SetWidth(width)</code></dt><dd>Sets a fixed width and disables automatic width adjustment.</dd></div>\n<div><dt><code>SetUnderlined(enabled), IsUnderlined()</code></dt><dd>Controls or queries the underline.</dd></div>\n<div><dt><code>SetHighlightFactor(factor), GetHighlightFactor()</code></dt><dd>Sets or reads the mouseover brightness multiplier.</dd></div>\n<div><dt><code>SetJustifyH(justify), GetJustifyH()</code></dt><dd>Sets or reads horizontal text alignment.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal heading = Sushi.Header(UIParent, &quot;General settings&quot;, GameFontNormalLarge, true)\nheading:SetWidth(260)\nheading:SetJustifyH(&quot;CENTER&quot;)</code></pre>"
      },
      {
        "id": "Check",
        "parent": "TextedClickable",
        "file": "classes/checks/Check.lua",
        "line": 20,
        "kind": "CheckButton",
        "abstract": false,
        "family": "Checks",
        "x": 882,
        "y": 432,
        "aliases": [],
        "summary": "The standard in-game checkbox with a text label.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Check.lua#L20",
        "doc": "<p>Check is a labeled checkbox. It inherits label sizing and click handling, and its value is the native checked state. It inherits from <a href=\"#TextedClickable\" data-class=\"TextedClickable\">TextedClickable</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/CheckButton.png\" alt=\"Check widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(checked), GetValue()</code></dt><dd>Aliases for the native SetChecked and GetChecked methods.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick(button, checked), OnInput(checked)</code></dt><dd>Inherited from Clickable and supplied with the current checked state.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the input handlers.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal check = Sushi.Check(UIParent, &quot;Show minimap icon&quot;)\ncheck:SetValue(true)\ncheck:SetCall(&quot;OnInput&quot;, function(self, checked)\n    print(checked)\nend)</code></pre>"
      },
      {
        "id": "ExpandCheck",
        "parent": "Check",
        "file": "classes/checks/Expand.lua",
        "line": 20,
        "kind": "CheckButton",
        "abstract": false,
        "family": "Checks",
        "x": 1056,
        "y": 460,
        "aliases": [],
        "summary": "A checkbox with a separate control for expanding or collapsing content.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Expand.lua#L20",
        "doc": "<p>ExpandCheck adds a plus or minus button to the left of a <a href=\"#Check\" data-class=\"Check\">Check</a>. Its expansion controls are independent of the checked state.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetExpanded(canExpand, expanded)</code></dt><dd>Sets whether the expansion button is enabled and chooses the plus or minus icon.</dd></div>\n<div><dt><code>IsExpanded()</code></dt><dd>Returns the expansion button’s enabled state followed by the expanded state.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnExpand(expanded)</code></dt><dd>Fires with the new expanded state after the expansion control is clicked.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the expansion callback.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal row = Sushi.ExpandCheck(UIParent, &quot;Advanced settings&quot;)\nrow:SetExpanded(true, false)\nrow:SetCall(&quot;OnExpand&quot;, function(self, expanded)\n    print(expanded)\nend)</code></pre>"
      },
      {
        "id": "IconCheck",
        "parent": "Check",
        "file": "classes/checks/Icon.lua",
        "line": 20,
        "kind": "CheckButton",
        "abstract": false,
        "family": "Checks",
        "x": 1056,
        "y": 404,
        "aliases": [],
        "summary": "A checkbox with a configurable icon and text label.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Icon.lua#L20",
        "doc": "<p>IconCheck is a compact <a href=\"#Check\" data-class=\"Check\">Check</a> with a separate icon texture and a label. It retains the checkbox’s checked-state and callback API.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetIcon(icon), GetIcon()</code></dt><dd>Sets or reads the displayed texture.</dd></div>\n</dl>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(checked), GetValue()</code></dt><dd>Updates or queries the checked state inherited from Check.</dd></div>\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Updates or reads the label next to the icon.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal check = Sushi.IconCheck(UIParent, &quot;Interface\\\\Icons\\\\INV_Misc_QuestionMark&quot;, &quot;Show hints&quot;)\ncheck:SetValue(true)</code></pre>"
      },
      {
        "id": "ColorPicker",
        "parent": "TextedClickable",
        "file": "classes/checks/Color.lua",
        "line": 20,
        "kind": "Button",
        "abstract": false,
        "family": "Checks",
        "x": 882,
        "y": 367,
        "aliases": [],
        "summary": "A button with a color swatch that opens the in-game color picker.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Color.lua#L20",
        "doc": "<p>ColorPicker is a labeled <a href=\"#TextedClickable\" data-class=\"TextedClickable\">TextedClickable</a> button with a color swatch. It opens the game’s shared color picker and uses a Blizzard color object for its value. A numeric alpha component enables opacity editing.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/ColorPicker.jpg\" alt=\"ColorPicker widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(color), SetColor(color)</code></dt><dd>Stores a color object and updates the swatch.</dd></div>\n<div><dt><code>GetValue(), GetColor()</code></dt><dd>Returns the stored color object.</dd></div>\n<div><dt><code>HasAlpha()</code></dt><dd>Reports whether the stored color has a numeric alpha component.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnColor(color), OnInput(color)</code></dt><dd>Fire when the picker applies a color, including when it restores the original color on cancellation.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires when the picker is no longer shown during the color update.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal swatch = Sushi.ColorPicker(UIParent, &quot;Highlight&quot;, CreateColor(0.2, 0.6, 1, 1))\nswatch:SetCall(&quot;OnColor&quot;, function(self, color)\n    print(color:GetRGB())\nend)</code></pre>"
      },
      {
        "id": "Editable",
        "parent": "Labeled",
        "file": "classes/edits/Editable.lua",
        "line": 20,
        "kind": "Poncho base",
        "abstract": true,
        "family": "Editboxes",
        "x": 708,
        "y": 513,
        "aliases": [],
        "summary": "Shared text-entry behavior with validation and callbacks for committed input.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Editable.lua#L20",
        "doc": "<p>Editable is the abstract base for <a href=\"#BoxEdit\" data-class=\"BoxEdit\">BoxEdit</a> and <a href=\"#DarkEdit\" data-class=\"DarkEdit\">DarkEdit</a>. It tracks the committed value separately from the input’s live text. Enter commits a change. Leaving focus restores the committed text. It inherits from <a href=\"#Labeled\" data-class=\"Labeled\">Labeled</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(value)</code></dt><dd>Stores the committed value and updates the text immediately if the widget does not have focus.</dd></div>\n<div><dt><code>GetValue()</code></dt><dd>Returns the committed value. GetText returns what is currently in the field.</dd></div>\n<div><dt><code>SetEnabled(enabled)</code></dt><dd>Controls input and updates the field’s font.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnText(value), OnInput(value), OnUpdate()</code></dt><dd>Fired in that order when Enter commits the text.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal field = Sushi.BoxEdit(UIParent, &quot;Name&quot;, &quot;Player&quot;)\nfield:SetCall(&quot;OnText&quot;, function(self, value)\n    print(value)\nend)</code></pre>"
      },
      {
        "id": "BoxEdit",
        "parent": "Editable",
        "file": "classes/edits/Box.lua",
        "line": 20,
        "kind": "EditBox",
        "abstract": false,
        "family": "Editboxes",
        "x": 882,
        "y": 513,
        "aliases": [],
        "summary": "The standard light-bordered text input, built on the native InputBoxTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Box.lua#L20",
        "doc": "<p>BoxEdit uses the game’s InputBoxTemplate and inherits labeling and committed-value handling from <a href=\"#Editable\" data-class=\"Editable\">Editable</a>. Use it for standard labeled text input.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/EditBox.png\" alt=\"BoxEdit widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(label), GetLabel()</code></dt><dd>Sets or reads the label above the field.</dd></div>\n<div><dt><code>SetValue(value), GetValue()</code></dt><dd>Sets or reads the committed value.</dd></div>\n<div><dt><code>SetEnabled(enabled)</code></dt><dd>Enables or disables input.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal field = Sushi.BoxEdit(UIParent, &quot;Search&quot;, &quot;&quot;)\nfield:SetPoint(&quot;CENTER&quot;)\nfield:SetWidth(180)</code></pre>"
      },
      {
        "id": "DarkEdit",
        "parent": "Editable",
        "file": "classes/edits/Dark.lua",
        "line": 20,
        "kind": "EditBox",
        "abstract": false,
        "family": "Editboxes",
        "x": 882,
        "y": 573,
        "aliases": [],
        "summary": "A dark text box with optional formatting for its displayed value.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Dark.lua#L20",
        "doc": "<p>DarkEdit is a compact input with a dark background and optional formatting around its value. It is also the editable field used by <a href=\"#Slider\" data-class=\"Slider\">Slider</a>. It inherits from <a href=\"#Editable\" data-class=\"Editable\">Editable</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetPattern(pattern), GetPattern()</code></dt><dd>Sets or reads the display pattern. Put %s where the value should appear.</dd></div>\n<div><dt><code>SetFontObject(font)</code></dt><dd>Changes the font used for the editable text and surrounding display.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal percent = Sushi.DarkEdit(UIParent, 50, &quot;%s%&quot;)\npercent:SetCall(&quot;OnInput&quot;, function(self, value)\n    print(tonumber(value))\nend)</code></pre>"
      },
      {
        "id": "Glowbox",
        "parent": "Callable",
        "file": "classes/misc/GlowBox.lua",
        "line": 20,
        "kind": "Frame",
        "abstract": false,
        "family": "Miscellaneous",
        "x": 360,
        "y": 219,
        "aliases": [],
        "summary": "An anchored tutorial tip with text, a directional arrow and a close button.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/misc/GlowBox.lua#L20",
        "doc": "<p>Glowbox displays a short tutorial message with a directional pointer and a close button. It is constructed with GlowBoxTemplate and can be anchored beside the UI it describes. It inherits from <a href=\"#Callable\" data-class=\"Callable\">Callable</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/GlowBox.jpg\" alt=\"Glowbox widget preview\" loading=\"lazy\"></p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>Glowbox(parent, text, direction)</code></dt><dd>Creates a callout, sets its text, and selects the pointer side.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), GetText()</code></dt><dd>Sets or reads the instructional message.</dd></div>\n<div><dt><code>SetDirection(direction), GetDirection()</code></dt><dd>Sets or reads the pointer side. Use TOP, BOTTOM, LEFT, or RIGHT.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClose()</code></dt><dd>Fires when the close button is pressed.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal tip = Sushi.Glowbox(UIParent, &quot;Click here to open options.&quot;, &quot;BOTTOM&quot;)\ntip:SetPoint(&quot;CENTER&quot;)</code></pre>"
      },
      {
        "id": "Slider",
        "parent": "Labeled",
        "file": "classes/misc/Slider.lua",
        "line": 21,
        "kind": "Slider",
        "abstract": false,
        "family": "Miscellaneous",
        "x": 708,
        "y": 573,
        "aliases": [],
        "summary": "A labeled slider with mouse-wheel support and an editable value field.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/misc/Slider.lua#L21",
        "doc": "<p>Slider is a labeled range control with mouse-wheel input and an embedded <a href=\"#DarkEdit\" data-class=\"DarkEdit\">DarkEdit</a> field. The game’s slider value is kept in sync with the editable field. It inherits from <a href=\"#Labeled\" data-class=\"Labeled\">Labeled</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Slider.png\" alt=\"Slider widget preview\" loading=\"lazy\"></p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>Slider(parent, label, value, min, max, step)</code></dt><dd>Creates a slider with optional initial value, bounds, and step.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetRange(min, max, minText, maxText), GetRange()</code></dt><dd>Sets or reads numeric bounds and the custom endpoint labels.</dd></div>\n<div><dt><code>SetStep(step), GetStep()</code></dt><dd>Aliases for the native value-step methods.</dd></div>\n<div><dt><code>SetPattern(pattern), GetPattern()</code></dt><dd>Sets or reads the edit display pattern. Use %s for the value.</dd></div>\n<div><dt><code>SetText(label), GetText()</code></dt><dd>Aliases for SetLabel and GetLabel.</dd></div>\n<div><dt><code>SetEnabled(enabled)</code></dt><dd>Enables or disables both slider and edit field.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnValue(value), OnInput(value)</code></dt><dd>Fire on manual value changes.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the mouse wheel is used or the mouse button is released. Committing the edit field uses the manual value path.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal slider = Sushi.Slider(UIParent, &quot;Opacity&quot;, 50, 0, 100, 5)\nslider:SetPattern(&quot;%s%&quot;)\nslider:SetCall(&quot;OnInput&quot;, function(self, value)\n    print(value)\nend)</code></pre>"
      },
      {
        "id": "Group",
        "parent": "Callable",
        "file": "classes/groups/Group.lua",
        "line": 21,
        "kind": "Frame",
        "abstract": false,
        "family": "Groups",
        "x": 360,
        "y": 116,
        "aliases": [],
        "summary": "Builds, arranges and releases child frames in an automatic layout.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Group.lua#L21",
        "doc": "<p>Group builds and lays out a collection of child widgets. It can wrap at a fixed limit and grow along a separate axis. Child fields such as left, right, top, bottom, and centered allow individual layout adjustments. It inherits from <a href=\"#Callable\" data-class=\"Callable\">Callable</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Group.png\" alt=\"Group widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetChildren(builder)</code></dt><dd>Registers an OnChildren builder and immediately attempts to rebuild the group.</dd></div>\n<div><dt><code>UpdateChildren(), Update()</code></dt><dd>Releases existing children, runs the builders, and lays out their results when the group is visible.</dd></div>\n<div><dt><code>Add(classOrFrame, ...)</code></dt><dd>Adds an existing frame or acquires a child from a Sushi class name or factory function.</dd></div>\n<div><dt><code>AddBreak()</code></dt><dd>Adds a row or column break.</dd></div>\n<div><dt><code>ReleaseChildren(), IterateChildren(), NumChildren()</code></dt><dd>Releases managed widgets, iterates the child array, or returns its length.</dd></div>\n<div><dt><code>SetOrientation(direction), GetOrientation()</code></dt><dd>Sets or reads HORIZONTAL or VERTICAL layout flow.</dd></div>\n<div><dt><code>SetResizing(direction), GetResizing()</code></dt><dd>Sets or reads the axis along which the container can grow.</dd></div>\n<div><dt><code>SetBackdrop(template), GetBackdrop()</code></dt><dd>Sets or reads a backdrop template. DIALOG and TOOLTIP are named presets. Pass nil or NONE to remove it.</dd></div>\n<div><dt><code>Layout(), CanLayout(), GetLimit()</code></dt><dd>Lays out existing children, checks whether layout is possible, or returns the wrapping limit.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnChildren()</code></dt><dd>Fires when the group rebuilds its children.</dd></div>\n<div><dt><code>OnResize()</code></dt><dd>Fires as the layout changes the group’s geometry.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Propagates a child update after the group has refreshed.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal group = Sushi.Group(UIParent)\ngroup:SetPoint(&quot;CENTER&quot;)\ngroup:SetChildren(function(self)\n    self:Add(&quot;Header&quot;, &quot;Settings&quot;)\n    self:Add(&quot;Check&quot;, &quot;Enable sound&quot;)\nend)</code></pre>"
      },
      {
        "id": "Popup",
        "parent": "Group",
        "file": "classes/groups/Popup.lua",
        "line": 20,
        "kind": "Frame",
        "abstract": false,
        "family": "Groups",
        "x": 534,
        "y": 29,
        "aliases": [],
        "summary": "Builds and stacks dialogs with optional buttons, text or money input.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L20",
        "doc": "<p>Popup builds a pooled dialog from an options table or a Blizzard StaticPopupDialogs key. It stacks active dialogs and uses <a href=\"#Header\" data-class=\"Header\">Header</a>, <a href=\"#Group\" data-class=\"Group\">Group</a>, and <a href=\"#RedButton\" data-class=\"RedButton\">RedButton</a> children for the message and actions.</p>\n<h3>Class methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>New(input)</code></dt><dd>Acquires and shows a dialog. The class can also be called directly with the input.</dd></div>\n<div><dt><code>Toggle(input)</code></dt><dd>Closes the existing matching dialog if one exists, otherwise opens it.</dd></div>\n<div><dt><code>Cancel(input)</code></dt><dd>Looks up and releases an active dialog.</dd></div>\n<div><dt><code>GetActive(target), IterateActive()</code></dt><dd>Finds an active popup by instance or ID, or iterates active popups.</dd></div>\n<div><dt><code>External(url)</code></dt><dd>Opens a dialog with a URL in the edit box so the user can copy it.</dd></div>\n<div><dt><code>Organize()</code></dt><dd>Restacks the visible Sushi popups.</dd></div>\n</dl>\n<h3>Options</h3>\n<dl class=\"api-table\">\n<div><dt><code>id, text</code></dt><dd>Sets a dialog identifier and its message.</dd></div>\n<div><dt><code>button1, button2</code></dt><dd>Sets the primary and secondary action labels.</dd></div>\n<div><dt><code>exclusive, cancels</code></dt><dd>Dismisses other dialogs before opening this one.</dd></div>\n<div><dt><code>whileDead, interruptCinematic</code></dt><dd>Allows the popup to appear in the indicated game states.</dd></div>\n<div><dt><code>icon, showAlert, showAlertGear</code></dt><dd>Chooses an explicit icon or a built-in warning icon.</dd></div>\n<div><dt><code>editBoxText</code></dt><dd>Creates a BoxEdit input with this initial value.</dd></div>\n</dl>\n<h3>Callbacks</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnAccept(frame)</code></dt><dd>Fires for the primary action.</dd></div>\n<div><dt><code>OnCancel(frame, ...)</code></dt><dd>May run on the secondary button click and again on release. Release also calls it after acceptance, with an extra nil argument before the reason. When opening is blocked, the callback is called directly as OnCancel(nil, reason).</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nSushi.Popup({\n    id = &quot;MY_ADDON_RESET&quot;,\n    text = &quot;Reset addon settings?&quot;,\n    button1 = &quot;Reset&quot;,\n    button2 = &quot;Cancel&quot;,\n    OnAccept = function() print(&quot;Reset confirmed&quot;) end\n})</code></pre>"
      },
      {
        "id": "OptionsGroup",
        "parent": "Group",
        "file": "classes/groups/Options.lua",
        "line": 20,
        "kind": "Frame",
        "abstract": false,
        "family": "Groups",
        "x": 534,
        "y": 83,
        "aliases": [],
        "summary": "Registers an addon settings panel using the Settings or Interface Options API available in the client.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Options.lua#L20",
        "doc": "<p>OptionsGroup builds an addon settings category on top of <a href=\"#Group\" data-class=\"Group\">Group</a>. A second argument registers a subcategory. The group builds title and subtitle rows and exposes the client’s options callbacks.</p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>OptionsGroup(category, subcategory)</code></dt><dd>Registers a category by name, or a subcategory under an existing category.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>Open()</code></dt><dd>Shows the client’s settings panel and selects this category.</dd></div>\n<div><dt><code>SetTitle(title), GetTitle()</code></dt><dd>Sets or reads the title placed above the child controls.</dd></div>\n<div><dt><code>SetSubtitle(subtitle), GetSubtitle()</code></dt><dd>Sets or reads the additional text below the title.</dd></div>\n<div><dt><code>SetFooter(footer), GetFooter()</code></dt><dd>Sets or reads the small footer text.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnDefaults(), OnCancel(), OnOkay()</code></dt><dd>Fired for the corresponding options actions.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal options = Sushi.OptionsGroup(&quot;My Addon&quot;)\noptions:SetSubtitle(&quot;Choose how the addon behaves.&quot;)\noptions:SetChildren(function(self)\n    self:Add(&quot;Check&quot;, &quot;Enable feature&quot;)\nend)</code></pre>"
      },
      {
        "id": "CreditsGroup",
        "parent": "OptionsGroup",
        "file": "classes/groups/Credits.lua",
        "line": 22,
        "kind": "Frame",
        "abstract": false,
        "family": "Groups",
        "x": 708,
        "y": 139,
        "aliases": [],
        "summary": "An options panel that builds a credits list and can show a popup for its website link.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Credits.lua#L22",
        "doc": "<p>CreditsGroup creates a contributor subcategory under an <a href=\"#OptionsGroup\" data-class=\"OptionsGroup\">OptionsGroup</a> category. A builder adds a heading for each section and one child per name. If a website is configured, the subtitle opens a <a href=\"#Popup\" data-class=\"Popup\">Popup</a> containing that address.</p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>CreditsGroup(parent, people, title)</code></dt><dd>Creates the credits subcategory. The title defaults to Patrons.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetPeople(sections), GetPeople()</code></dt><dd>Sets or reads the ordered sections. Each may specify a title, people array, and font override.</dd></div>\n<div><dt><code>SetSubtitle(text, url), GetSubtitle()</code></dt><dd>Sets or reads the subtitle and the optional address it opens.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal options = Sushi.OptionsGroup(&quot;My Addon&quot;)\nlocal credits = Sushi.CreditsGroup(options, {\n    {title = &quot;Contributors&quot;, people = {&quot;Alex&quot;, &quot;Sam&quot;}}\n}, &quot;Credits&quot;)\ncredits:SetSubtitle(&quot;Project website&quot;, &quot;https://example.com&quot;)</code></pre>"
      },
      {
        "id": "FauxScroll",
        "parent": "Group",
        "file": "classes/groups/FauxScroll.lua",
        "line": 20,
        "kind": "Frame",
        "abstract": false,
        "family": "Groups",
        "x": 534,
        "y": 139,
        "aliases": [],
        "summary": "Displays a scrollable window of entries in a Group layout.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/FauxScroll.lua#L20",
        "doc": "<p>FauxScroll combines <a href=\"#Group\" data-class=\"Group\">Group</a> layout with a faux scrollbar. The builder can render only the visible indices and keep the total entry count separate from the number of instantiated rows.</p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>FauxScroll(parent, maxEntries, entryHeight, builder)</code></dt><dd>Creates the scroll group and configures its visible capacity and row height.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>First(), Last()</code></dt><dd>Returns the inclusive visible range of entry indices.</dd></div>\n<div><dt><code>GetOffset()</code></dt><dd>Returns the zero-based scroll offset.</dd></div>\n<div><dt><code>SetMaxDisplayed(count), GetMaxDisplayed()</code></dt><dd>Sets or reads the maximum number of visible entries.</dd></div>\n<div><dt><code>SetEntrySize(height), GetEntrySize()</code></dt><dd>Sets or reads the row height in pixels.</dd></div>\n<div><dt><code>SetNumEntries(count), NumEntries()</code></dt><dd>Sets or reads the total entry count.</dd></div>\n<div><dt><code>Layout()</code></dt><dd>Refreshes the scrollbar and then applies the inherited group layout.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal list = Sushi.FauxScroll(UIParent, 6, 24)\nlist:SetNumEntries(30)\nlist:SetChildren(function(self)\n    for index = self:First(), self:Last() do\n        self:Add(&quot;Header&quot;, &quot;Entry &quot; .. index)\n    end\nend)</code></pre>"
      },
      {
        "id": "DropButton",
        "parent": "Clickable",
        "file": "classes/drops/Button.lua",
        "line": 21,
        "kind": "CheckButton",
        "abstract": false,
        "family": "Dropdowns",
        "x": 708,
        "y": 195,
        "aliases": [],
        "summary": "A dropdown menu row that can display an icon, a check or radio marker, and a submenu.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Button.lua#L21",
        "doc": "<p>DropButton is a checkable row in a <a href=\"#Dropdown\" data-class=\"Dropdown\">Dropdown</a>. Its options can provide an icon, tooltip, checkbox or radio appearance, and a submenu anchored to the right. It inherits from <a href=\"#Clickable\" data-class=\"Clickable\">Clickable</a>.</p>\n<h3>Constructor</h3>\n<dl class=\"api-table\">\n<div><dt><code>DropButton(parent, info)</code></dt><dd>Builds a row from an options table. Common fields include text, icon, checked, disabled, isTitle, notCheckable, isNotRadio, and func.</dd></div>\n</dl>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), SetLabel(text), GetLabel()</code></dt><dd>Sets or reads the displayed label.</dd></div>\n<div><dt><code>SetEnabled(enabled)</code></dt><dd>Changes row and arrow input handling.</dd></div>\n<div><dt><code>SetIcon(icon), GetIcon()</code></dt><dd>Sets or reads an atlas or texture.</dd></div>\n<div><dt><code>SetCheckable(checkable, radio), IsCheckable()</code></dt><dd>Controls or returns check visibility and radio styling.</dd></div>\n<div><dt><code>SetSublevel(children)</code></dt><dd>Populates the row’s submenu. The constructor accepts menuTable, sublevel, or children for this.</dd></div>\n<div><dt><code>SetFletched(hasArrow), IsFletched()</code></dt><dd>Controls or queries whether the submenu arrow is shown.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal row = Sushi.DropButton(menu, {\n    text = &quot;Show hints&quot;,\n    checked = true,\n    isNotRadio = true,\n    func = function(self) print(self:GetChecked()) end\n})</code></pre>"
      },
      {
        "id": "Dropdown",
        "parent": "Group",
        "file": "classes/drops/Dropdown.lua",
        "line": 20,
        "kind": "Frame",
        "abstract": false,
        "family": "Dropdowns",
        "x": 534,
        "y": 195,
        "aliases": [],
        "summary": "A reusable menu panel built on Group layout.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Dropdown.lua#L20",
        "doc": "<p>Dropdown is a menu panel built on <a href=\"#Group\" data-class=\"Group\">Group</a>. It accepts a callback or a list of menu row descriptions, acquires <a href=\"#DropButton\" data-class=\"DropButton\">DropButton</a> instances, and can expire after the mouse leaves the menu.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>New(parent, children, expires)</code></dt><dd>Creates a dropdown. An expiring dropdown starts with a five-second timeout.</dd></div>\n<div><dt><code>Toggle(parent)</code></dt><dd>Closes the currently open menu. Opens and returns a new one if there was no menu for this parent.</dd></div>\n<div><dt><code>Clear()</code></dt><dd>Releases the currently open dropdown.</dd></div>\n<div><dt><code>SetChildren(rowsOrBuilder)</code></dt><dd>Supplies row descriptions or a callback that builds the menu.</dd></div>\n<div><dt><code>Add(row, ...)</code></dt><dd>Adds a row description, a list of descriptions, or another kind of child accepted by Group.</dd></div>\n<div><dt><code>IsMouseInteracting()</code></dt><dd>Checks whether the cursor is over the dropdown’s parent or one of its descendants.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal menu = Sushi.Dropdown:Toggle(anchor)\nif menu then\n    menu:SetPoint(&quot;TOPLEFT&quot;, anchor, &quot;BOTTOMLEFT&quot;)\n    menu:SetChildren({\n        {text = &quot;Reset&quot;, notCheckable = true, func = function() print(&quot;Reset&quot;) end}\n    })\nend</code></pre>"
      },
      {
        "id": "DropChoice",
        "parent": "Labeled",
        "file": "classes/drops/Choice.lua",
        "line": 21,
        "kind": "Button",
        "abstract": false,
        "family": "Dropdowns",
        "x": 708,
        "y": 453,
        "aliases": [],
        "summary": "A labeled single-choice button. It opens Sushi’s Dropdown and fills it with the available choices.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Choice.lua#L21",
        "doc": "<p>DropChoice is a labeled selector backed by <a href=\"#Dropdown\" data-class=\"Dropdown\">Dropdown</a> and the UIDropDownMenuTemplate. Clicking it builds a menu of choices. A new selection updates the button text and dispatches callbacks. It inherits from <a href=\"#Labeled\" data-class=\"Labeled\">Labeled</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Dropdown.png\" alt=\"DropChoice widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(key), GetValue()</code></dt><dd>Sets or returns the stored choice key.</dd></div>\n<div><dt><code>AddChoices(key, text, tip)</code></dt><dd>Appends a choice. Text defaults to the key and the tooltip is optional.</dd></div>\n<div><dt><code>AddChoices(choiceOrList)</code></dt><dd>Accepts a table with key, text, and tip fields, or a list of those tables. Add is an alias.</dd></div>\n<div><dt><code>GetChoices()</code></dt><dd>Returns the ordered choice records.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnValue(key), OnInput(key), OnUpdate()</code></dt><dd>Fired in that order when the user chooses a different entry.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local Sushi = LibStub(&quot;Sushi-3.1&quot;)\nlocal menu = Sushi.DropChoice(UIParent, &quot;Difficulty&quot;)\nmenu:AddChoices(&quot;normal&quot;, &quot;Normal&quot;)\nmenu:AddChoices(&quot;hard&quot;, &quot;Hard&quot;)\nmenu:SetValue(&quot;normal&quot;)\nmenu:SetCall(&quot;OnInput&quot;, function(self, key)\n    print(key)\nend)</code></pre>"
      }
    ],
    "edges": [
      {
        "id": "Callable-extends-Base",
        "from": "Callable",
        "to": "Base",
        "type": "inheritance",
        "method": "Base:NewSushi",
        "description": "Callable is registered as a subclass of Base in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Callable.lua#L20"
      },
      {
        "id": "Tipped-extends-Callable",
        "from": "Tipped",
        "to": "Callable",
        "type": "inheritance",
        "method": "Callable:NewSushi",
        "description": "Tipped is registered as a subclass of Callable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Tipped.lua#L20"
      },
      {
        "id": "Labeled-extends-Tipped",
        "from": "Labeled",
        "to": "Tipped",
        "type": "inheritance",
        "method": "Tipped:NewSushi",
        "description": "Labeled is registered as a subclass of Tipped in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/core/Labeled.lua#L20"
      },
      {
        "id": "Clickable-extends-Tipped",
        "from": "Clickable",
        "to": "Tipped",
        "type": "inheritance",
        "method": "Tipped:NewSushi",
        "description": "Clickable is registered as a subclass of Tipped in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Clickable.lua#L20"
      },
      {
        "id": "TextedClickable-extends-Clickable",
        "from": "TextedClickable",
        "to": "Clickable",
        "type": "inheritance",
        "method": "Clickable:NewSushi",
        "description": "TextedClickable is registered as a subclass of Clickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Texted.lua#L20"
      },
      {
        "id": "HelpButton-extends-Clickable",
        "from": "HelpButton",
        "to": "Clickable",
        "type": "inheritance",
        "method": "Clickable:NewSushi",
        "description": "HelpButton is registered as a subclass of Clickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Help.lua#L20"
      },
      {
        "id": "RedButton-extends-TextedClickable",
        "from": "RedButton",
        "to": "TextedClickable",
        "type": "inheritance",
        "method": "TextedClickable:NewSushi",
        "description": "RedButton is registered as a subclass of TextedClickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Red.lua#L20"
      },
      {
        "id": "GrayButton-extends-RedButton",
        "from": "GrayButton",
        "to": "RedButton",
        "type": "inheritance",
        "method": "RedButton:NewSushi",
        "description": "GrayButton is registered as a subclass of RedButton in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Gray.lua#L20"
      },
      {
        "id": "Header-extends-Clickable",
        "from": "Header",
        "to": "Clickable",
        "type": "inheritance",
        "method": "Clickable:NewSushi",
        "description": "Header is registered as a subclass of Clickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/buttons/Header.lua#L20"
      },
      {
        "id": "Check-extends-TextedClickable",
        "from": "Check",
        "to": "TextedClickable",
        "type": "inheritance",
        "method": "TextedClickable:NewSushi",
        "description": "Check is registered as a subclass of TextedClickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Check.lua#L20"
      },
      {
        "id": "ExpandCheck-extends-Check",
        "from": "ExpandCheck",
        "to": "Check",
        "type": "inheritance",
        "method": "Check:NewSushi",
        "description": "ExpandCheck is registered as a subclass of Check in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Expand.lua#L20"
      },
      {
        "id": "IconCheck-extends-Check",
        "from": "IconCheck",
        "to": "Check",
        "type": "inheritance",
        "method": "Check:NewSushi",
        "description": "IconCheck is registered as a subclass of Check in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Icon.lua#L20"
      },
      {
        "id": "ColorPicker-extends-TextedClickable",
        "from": "ColorPicker",
        "to": "TextedClickable",
        "type": "inheritance",
        "method": "TextedClickable:NewSushi",
        "description": "ColorPicker is registered as a subclass of TextedClickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/checks/Color.lua#L20"
      },
      {
        "id": "Editable-extends-Labeled",
        "from": "Editable",
        "to": "Labeled",
        "type": "inheritance",
        "method": "Labeled:NewSushi",
        "description": "Editable is registered as a subclass of Labeled in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Editable.lua#L20"
      },
      {
        "id": "BoxEdit-extends-Editable",
        "from": "BoxEdit",
        "to": "Editable",
        "type": "inheritance",
        "method": "Editable:NewSushi",
        "description": "BoxEdit is registered as a subclass of Editable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Box.lua#L20"
      },
      {
        "id": "DarkEdit-extends-Editable",
        "from": "DarkEdit",
        "to": "Editable",
        "type": "inheritance",
        "method": "Editable:NewSushi",
        "description": "DarkEdit is registered as a subclass of Editable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/edits/Dark.lua#L20"
      },
      {
        "id": "Glowbox-extends-Callable",
        "from": "Glowbox",
        "to": "Callable",
        "type": "inheritance",
        "method": "Callable:NewSushi",
        "description": "Glowbox is registered as a subclass of Callable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/misc/GlowBox.lua#L20"
      },
      {
        "id": "Slider-extends-Labeled",
        "from": "Slider",
        "to": "Labeled",
        "type": "inheritance",
        "method": "Labeled:NewSushi",
        "description": "Slider is registered as a subclass of Labeled in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/misc/Slider.lua#L21"
      },
      {
        "id": "Group-extends-Callable",
        "from": "Group",
        "to": "Callable",
        "type": "inheritance",
        "method": "Callable:NewSushi",
        "description": "Group is registered as a subclass of Callable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Group.lua#L21"
      },
      {
        "id": "Popup-extends-Group",
        "from": "Popup",
        "to": "Group",
        "type": "inheritance",
        "method": "Group:NewSushi",
        "description": "Popup is registered as a subclass of Group in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L20"
      },
      {
        "id": "OptionsGroup-extends-Group",
        "from": "OptionsGroup",
        "to": "Group",
        "type": "inheritance",
        "method": "Group:NewSushi",
        "description": "OptionsGroup is registered as a subclass of Group in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Options.lua#L20"
      },
      {
        "id": "CreditsGroup-extends-OptionsGroup",
        "from": "CreditsGroup",
        "to": "OptionsGroup",
        "type": "inheritance",
        "method": "OptionsGroup:NewSushi",
        "description": "CreditsGroup is registered as a subclass of OptionsGroup in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Credits.lua#L22"
      },
      {
        "id": "FauxScroll-extends-Group",
        "from": "FauxScroll",
        "to": "Group",
        "type": "inheritance",
        "method": "Group:NewSushi",
        "description": "FauxScroll is registered as a subclass of Group in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/FauxScroll.lua#L20"
      },
      {
        "id": "DropButton-extends-Clickable",
        "from": "DropButton",
        "to": "Clickable",
        "type": "inheritance",
        "method": "Clickable:NewSushi",
        "description": "DropButton is registered as a subclass of Clickable in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Button.lua#L21"
      },
      {
        "id": "Dropdown-extends-Group",
        "from": "Dropdown",
        "to": "Group",
        "type": "inheritance",
        "method": "Group:NewSushi",
        "description": "Dropdown is registered as a subclass of Group in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Dropdown.lua#L20"
      },
      {
        "id": "DropChoice-extends-Labeled",
        "from": "DropChoice",
        "to": "Labeled",
        "type": "inheritance",
        "method": "Labeled:NewSushi",
        "description": "DropChoice is registered as a subclass of Labeled in Sushi 3.1. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Choice.lua#L21"
      },
      {
        "id": "Dropdown-uses-DropButton",
        "from": "Dropdown",
        "to": "DropButton",
        "type": "composition",
        "method": "Drop:Add",
        "description": "Creates a DropButton from a menu-row options table.",
        "route": "M660 206 C674 186 694 186 708 206",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Dropdown.lua#L128"
      },
      {
        "id": "DropButton-uses-Dropdown",
        "from": "DropButton",
        "to": "Dropdown",
        "type": "composition",
        "method": "Button:New",
        "description": "Creates the submenu that is attached to the menu row.",
        "route": "M708 224 C694 244 674 244 660 224",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Button.lua#L41"
      },
      {
        "id": "DropChoice-uses-Dropdown",
        "from": "DropChoice",
        "to": "Dropdown",
        "type": "composition",
        "method": "Choice:OnClick",
        "description": "Opens a Sushi Dropdown and fills it with the choice entries.",
        "route": "M708 475 C678 475 679 443 679 420 V240 Q679 220 660 220",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/drops/Choice.lua#L44"
      },
      {
        "id": "OptionsGroup-uses-Header",
        "from": "OptionsGroup",
        "to": "Header",
        "type": "composition",
        "method": "Group:New",
        "description": "Adds Header widgets for the settings title and subtitle.",
        "route": "M660 114 C674 134 694 134 708 114",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Options.lua#L52"
      },
      {
        "id": "CreditsGroup-uses-Header",
        "from": "CreditsGroup",
        "to": "Header",
        "type": "composition",
        "method": "Group:PopulatePeople",
        "description": "Adds headers for contributor sections and names.",
        "route": "M760 139 L760 122",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Credits.lua#L51"
      },
      {
        "id": "CreditsGroup-uses-Popup",
        "from": "CreditsGroup",
        "to": "Popup",
        "type": "composition",
        "method": "Group:PopulatePeople",
        "description": "Displays the project’s website address in a popup when the link is clicked.",
        "route": "M708 148 C677 148 676 61 660 61",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Credits.lua#L41"
      },
      {
        "id": "Popup-uses-Header",
        "from": "Popup",
        "to": "Header",
        "type": "composition",
        "method": "Popup:Populate",
        "description": "Uses a centered Header to display the popup message.",
        "route": "M660 46 C684 46 684 96 708 96",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L149"
      },
      {
        "id": "Popup-uses-BoxEdit",
        "from": "Popup",
        "to": "BoxEdit",
        "type": "composition",
        "method": "Popup:Populate",
        "description": "Creates a text input when the popup is configured with editable text.",
        "route": "M615 29 V15 Q615 8 622 8 H1024 Q1033 8 1033 17 V525 Q1033 534 1024 534 H1008",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L153"
      },
      {
        "id": "Popup-uses-Group",
        "from": "Popup",
        "to": "Group",
        "type": "composition",
        "method": "Popup:Populate",
        "description": "Creates a horizontal child group to lay out the popup buttons.",
        "route": "M534 37 C484 37 456 64 456 116",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L159"
      },
      {
        "id": "Popup-uses-RedButton",
        "from": "Popup",
        "to": "RedButton",
        "type": "composition",
        "method": "Popup:Populate",
        "description": "Creates the accept and cancel buttons using RedButton.",
        "route": "M637 29 V25 Q637 18 644 18 H940 Q948 18 948 26 V302",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/groups/Popup.lua#L161"
      },
      {
        "id": "Slider-uses-DarkEdit",
        "from": "Slider",
        "to": "DarkEdit",
        "type": "composition",
        "method": "Slider:New",
        "description": "Creates the editable numeric field next to the slider.",
        "route": "M834 603 C850 625 866 625 882 603",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/98f222450818dc0c79588488b1ada750a39a7794/classes/misc/Slider.lua#L41"
      }
    ],
    "families": [
      "Core",
      "Buttons",
      "Checks",
      "Dropdowns",
      "Editboxes",
      "Groups",
      "Miscellaneous"
    ],
    "root": "Base"
  },
  "3.0": {
    "repository": "https://github.com/Jaliborc/Sushi-3.2",
    "commit": "8d95b1b30241d7b0b4bdd0aa5cd80162343a859e",
    "nodes": [
      {
        "id": "CallHandler",
        "parent": null,
        "file": "Classes/CallHandler.lua",
        "line": 20,
        "abstract": true,
        "aliases": [
          "SushiCallHandler"
        ],
        "x": 12,
        "y": 291,
        "family": "Core",
        "summary": "The root class for Sushi frames in 3.0. It registers and dispatches custom callbacks and handles basic acquisition and release.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CallHandler.lua#L20",
        "doc": "<p>CallHandler is the abstract callback base in Sushi 3.0. A widget can register one handler per event. The handler receives the widget as its first argument, followed by any values supplied by the caller. Acquiring a frame from the pool starts with an empty handler table.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetCall(event, handler)</code></dt><dd>Registers or replaces the handler for an event. Pass nil to remove it.</dd></div>\n<div><dt><code>GetCall(event)</code></dt><dd>Returns the currently registered handler, or nil.</dd></div>\n<div><dt><code>FireCall(event, ...)</code></dt><dd>Invokes the handler with the widget and any extra arguments.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local button = SushiTextButton(UIParent)\nbutton:SetCall(&quot;OnClick&quot;, function(self)\n    print(self:GetText())\nend)\nbutton:FireCall(&quot;OnClick&quot;)</code></pre>"
      },
      {
        "id": "TipOwner",
        "parent": "CallHandler",
        "file": "Classes/TipOwner.lua",
        "line": 20,
        "abstract": true,
        "aliases": [
          "SushiTipOwner"
        ],
        "x": 186,
        "y": 388,
        "family": "Core",
        "summary": "Adds a mouseover tooltip to a frame and clears the tooltip when the frame is released.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TipOwner.lua#L20",
        "doc": "<p>TipOwner is an abstract base for widgets that show text in the game tooltip. Tooltip content is cleared when the widget is released. A widget must receive mouse interaction for the enter and leave scripts to run. It inherits from <a href=\"#CallHandler\" data-class=\"CallHandler\">CallHandler</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTip(title, body)</code></dt><dd>Sets the tooltip heading and optional body. Set the title to nil to clear the tooltip. SetTooltip is an alias.</dd></div>\n<div><dt><code>GetTip()</code></dt><dd>Returns the title and body. GetTooltip is an alias.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local button = SushiHelpButton(UIParent)\nbutton:SetTip(&quot;Help&quot;, &quot;Opens the addon help panel.&quot;)</code></pre>"
      },
      {
        "id": "ButtonBase",
        "parent": "TipOwner",
        "kind": "Button",
        "file": "Classes/ButtonBase.lua",
        "line": 21,
        "abstract": true,
        "aliases": [
          "SushiButtonBase"
        ],
        "x": 360,
        "y": 352,
        "family": "Buttons",
        "summary": "Shared base for clickable buttons. It plays a click sound, dispatches callbacks, and supports tooltips.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ButtonBase.lua#L21",
        "doc": "<p>ButtonBase provides the shared click and disable behavior used by most 3.0 buttons. It installs the click script on creation and restores the enabled state on release. Subclasses can supply a different click handler, including the checked-state argument used by <a href=\"#CheckButton\" data-class=\"CheckButton\">CheckButton</a>. It inherits from <a href=\"#TipOwner\" data-class=\"TipOwner\">TipOwner</a>. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetDisabled(disabled)</code></dt><dd>Disables the native button when true and enables it otherwise.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick()</code></dt><dd>Fires immediately after the click sound.</dd></div>\n<div><dt><code>OnInput()</code></dt><dd>Fires after OnClick.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after OnInput.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local button = SushiTextButton(UIParent)\nbutton:SetText(&quot;Apply&quot;)\nbutton:SetCall(&quot;OnClick&quot;, function()\n    print(&quot;Apply settings&quot;)\nend)</code></pre>"
      },
      {
        "id": "DropdownButton",
        "parent": "ButtonBase",
        "kind": "CheckButton",
        "file": "Classes/DropdownButton.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiDropdownButton"
        ],
        "x": 534,
        "y": 261,
        "family": "Dropdowns",
        "summary": "A dropdown row with optional check or radio behavior.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/DropdownButton.lua#L20",
        "doc": "<p>DropdownButton is a checkable row for <a href=\"#DropdownFrame\" data-class=\"DropdownFrame\">DropdownFrame</a>. A row can look like a checkbox or a radio choice, omit the check area, or use heading styling. It inherits from <a href=\"#ButtonBase\" data-class=\"ButtonBase\">ButtonBase</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTitle(isTitle)</code></dt><dd>Changes the label and highlight styling for a heading row.</dd></div>\n<div><dt><code>SetChecked(checked)</code></dt><dd>Updates the checked state and its texture.</dd></div>\n<div><dt><code>SetCheckable(checkable)</code></dt><dd>Controls whether the check area is displayed.</dd></div>\n<div><dt><code>SetRadio(isRadio)</code></dt><dd>Switches the check texture between radio and checkbox styles.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local row = SushiDropdownButton(UIParent)\nrow:SetText(&quot;Enable sound&quot;)\nrow:SetRadio(false)\nrow:SetCheckable(true)\nrow:SetChecked(true)</code></pre>"
      },
      {
        "id": "TextButton",
        "parent": "ButtonBase",
        "kind": "Button",
        "file": "Classes/TextButton.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiTextButton",
          "SushiButton"
        ],
        "x": 534,
        "y": 314,
        "family": "Buttons",
        "summary": "A standard button that adjusts its width to its label.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextButton.lua#L20",
        "doc": "<p>TextButton is the standard red push button, styled with UIPanelButtonTemplate. Its width follows its rendered text. The class is also available as SushiButton. It inherits from <a href=\"#ButtonBase\" data-class=\"ButtonBase\">ButtonBase</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/TextButton.png\" alt=\"TextButton widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), SetLabel(text)</code></dt><dd>Updates the label and sizes the button to the text with 20 pixels of padding.</dd></div>\n<div><dt><code>GetLabel()</code></dt><dd>Alias for the native GetText method.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Sets or queries the compact font style.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local button = SushiTextButton(UIParent)\nbutton:SetLabel(&quot;Accept&quot;)\nbutton:SetSmall(true)\nbutton:SetPoint(&quot;CENTER&quot;)</code></pre>"
      },
      {
        "id": "GrayButton",
        "parent": "TextButton",
        "kind": "Button",
        "file": "Classes/GrayButton.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiGrayButton"
        ],
        "x": 708,
        "y": 251,
        "family": "Buttons",
        "summary": "A TextButton variant with a gray visual style.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/GrayButton.lua#L20",
        "doc": "<p>GrayButton is a <a href=\"#TextButton\" data-class=\"TextButton\">TextButton</a> variant that stays gray outside the pressed state. It uses the same label, tooltip, and callback API as a text button.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/GrayButton.png\" alt=\"GrayButton widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetSmall(small)</code></dt><dd>Selects the small or regular size and refreshes the gray button textures.</dd></div>\n</dl>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Sets the text and adjusts the button width, or reads the label.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local button = SushiGrayButton(UIParent)\nbutton:SetLabel(&quot;Cancel&quot;)\nbutton:SetCall(&quot;OnClick&quot;, function(self)\n    self:Hide()\nend)</code></pre>"
      },
      {
        "id": "HelpButton",
        "parent": "ButtonBase",
        "kind": "Button",
        "file": "Classes/HelpButton.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiHelpButton"
        ],
        "x": 534,
        "y": 208,
        "family": "Buttons",
        "summary": "An information icon button with tooltip support.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/HelpButton.lua#L20",
        "doc": "<p>HelpButton is a 16-by-16 button with a built-in information icon and highlight texture. It inherits click handling from <a href=\"#ButtonBase\" data-class=\"ButtonBase\">ButtonBase</a> and the tooltip API from <a href=\"#TipOwner\" data-class=\"TipOwner\">TipOwner</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/HelpButton.png\" alt=\"HelpButton widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTip(title, body)</code></dt><dd>Sets the text shown when the cursor enters the button.</dd></div>\n<div><dt><code>SetCall(&quot;OnClick&quot;, handler)</code></dt><dd>Registers an action to run when the icon is clicked.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local help = SushiHelpButton(UIParent)\nhelp:SetPoint(&quot;CENTER&quot;)\nhelp:SetTip(&quot;Shortcuts&quot;, &quot;Press Escape to close the panel.&quot;)</code></pre>"
      },
      {
        "id": "TabButtonBase",
        "parent": "TextButton",
        "kind": "Button",
        "file": "Classes/TabButtons.lua",
        "line": 22,
        "abstract": true,
        "aliases": [
          "SushiTabButtonBase"
        ],
        "x": 708,
        "y": 304,
        "family": "Buttons",
        "summary": "Shared tab button behavior, including selection, disabled state, and sizing to the label.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L22",
        "doc": "<p>TabButtonBase provides selection, disabled-state styling, and automatic text sizing for <a href=\"#TooltipTab\" data-class=\"TooltipTab\">TooltipTab</a>, <a href=\"#PanelTab\" data-class=\"PanelTab\">PanelTab</a>, and <a href=\"#DialogTab\" data-class=\"DialogTab\">DialogTab</a>. It inherits from <a href=\"#TextButton\" data-class=\"TextButton\">TextButton</a>. This is a base class for other Sushi widgets.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetSelected(selected), IsSelected()</code></dt><dd>Sets and reads the selected state. SetValue and GetValue are aliases.</dd></div>\n<div><dt><code>SetDisabled(disabled), IsDisabled()</code></dt><dd>Controls and reads whether the tab is disabled.</dd></div>\n<div><dt><code>SetText(text), SetLabel(text)</code></dt><dd>Changes the text and asks Blizzard’s tab layout code to resize the button.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tab = SushiPanelTab(UIParent)\ntab:SetText(&quot;General&quot;)\ntab:SetSelected(true)</code></pre>"
      },
      {
        "id": "TooltipTab",
        "parent": "TabButtonBase",
        "kind": "Button",
        "file": "Classes/TabButtons.lua",
        "line": 85,
        "abstract": false,
        "aliases": [
          "SushiTooltipTab"
        ],
        "x": 882,
        "y": 245,
        "family": "Buttons",
        "summary": "A tab styled with OptionsFrameTabButtonTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L85",
        "doc": "<p>TooltipTab uses OptionsFrameTabButtonTemplate. It is one of the three styles available to <a href=\"#TabGroup\" data-class=\"TabGroup\">TabGroup</a> and inherits state and sizing behavior from <a href=\"#TabButtonBase\" data-class=\"TabButtonBase\">TabButtonBase</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/TooltipTabs.png\" alt=\"TooltipTab widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text)</code></dt><dd>Labels the tab and sizes it to the text.</dd></div>\n<div><dt><code>SetSelected(selected)</code></dt><dd>Applies the active tab appearance.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tab = SushiTooltipTab(UIParent)\ntab:SetText(&quot;Summary&quot;)\ntab:SetSelected(true)</code></pre>"
      },
      {
        "id": "PanelTab",
        "parent": "TabButtonBase",
        "kind": "Button",
        "file": "Classes/TabButtons.lua",
        "line": 86,
        "abstract": false,
        "aliases": [
          "SushiPanelTab"
        ],
        "x": 882,
        "y": 302,
        "family": "Buttons",
        "summary": "A tab styled with CharacterFrameTabButtonTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L86",
        "doc": "<p>PanelTab uses CharacterFrameTabButtonTemplate. Use it directly or choose Panel as the style for <a href=\"#TabGroup\" data-class=\"TabGroup\">TabGroup</a>. It inherits from <a href=\"#TabButtonBase\" data-class=\"TabButtonBase\">TabButtonBase</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/PanelTabs.png\" alt=\"PanelTab widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text)</code></dt><dd>Sets the label and resizes the tab.</dd></div>\n<div><dt><code>SetDisabled(disabled)</code></dt><dd>Controls the disabled appearance and click behavior.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tab = SushiPanelTab(UIParent)\ntab:SetText(&quot;Equipment&quot;)\ntab:SetDisabled(true)</code></pre>"
      },
      {
        "id": "DialogTab",
        "parent": "TabButtonBase",
        "kind": "Button",
        "file": "Classes/TabButtons.lua",
        "line": 87,
        "abstract": false,
        "aliases": [
          "SushiDialogTab"
        ],
        "x": 882,
        "y": 359,
        "family": "Buttons",
        "summary": "A tab styled with TabButtonTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L87",
        "doc": "<p>DialogTab uses TabButtonTemplate and adds extra right spacing for layouts. It inherits text, selection, and disabled-state behavior from <a href=\"#TabButtonBase\" data-class=\"TabButtonBase\">TabButtonBase</a>. <a href=\"#TabGroup\" data-class=\"TabGroup\">TabGroup</a> chooses it when the style is Dialog.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/DialogTabs.png\" alt=\"DialogTab widget preview\" loading=\"lazy\"></p>\n<h3>Inherited API</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text)</code></dt><dd>Sets the label and resizes the tab.</dd></div>\n<div><dt><code>SetSelected(selected)</code></dt><dd>Applies the selected styling.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tab = SushiDialogTab(UIParent)\ntab:SetText(&quot;Advanced&quot;)\ntab:SetSelected(true)</code></pre>"
      },
      {
        "id": "TextureButton",
        "parent": "ButtonBase",
        "kind": "Button",
        "file": "Classes/TextureButton.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiTextureButton"
        ],
        "x": 534,
        "y": 420,
        "family": "Buttons",
        "summary": "A button that displays a texture in place of text.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureButton.lua#L21",
        "doc": "<p>TextureButton displays an image as a clickable button. The texture is applied to the button’s visual states, and click handling comes from <a href=\"#ButtonBase\" data-class=\"ButtonBase\">ButtonBase</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetTexture(file)</code></dt><dd>Sets the texture file for the button.</dd></div>\n<div><dt><code>GetTexture()</code></dt><dd>Returns the current normal texture.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local icon = SushiTextureButton(UIParent)\nicon:SetSize(32, 32)\nicon:SetTexture(&quot;Interface\\\\Icons\\\\INV_Misc_QuestionMark&quot;)\nicon:SetTip(&quot;Preview&quot;)</code></pre>"
      },
      {
        "id": "CheckButton",
        "parent": "ButtonBase",
        "kind": "CheckButton",
        "file": "Classes/CheckButton.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiCheckButton",
          "SushiCheck"
        ],
        "x": 534,
        "y": 367,
        "family": "Checks",
        "summary": "A labeled checkbox. Its value is its checked state.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CheckButton.lua#L21",
        "doc": "<p>CheckButton draws a standard Blizzard checkbox with a text label. Its value is the checked state. It is also available under the older name SushiCheck. It inherits from <a href=\"#ButtonBase\" data-class=\"ButtonBase\">ButtonBase</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/CheckButton.png\" alt=\"CheckButton widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(checked), GetValue()</code></dt><dd>Aliases for SetChecked and GetChecked.</dd></div>\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Aliases for the native text methods.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Changes the label font for enabled and disabled states and reports the current compact style.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick(checked), OnInput(checked)</code></dt><dd>Receive the state after the user clicks the checkbox.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the click and input callbacks.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local check = SushiCheckButton(UIParent)\ncheck:SetLabel(&quot;Show minimap icon&quot;)\ncheck:SetValue(true)\ncheck:SetCall(&quot;OnInput&quot;, function(self, checked)\n    print(checked)\nend)</code></pre>"
      },
      {
        "id": "ColorPicker",
        "parent": "CheckButton",
        "kind": "CheckButton",
        "file": "Classes/ColorPicker.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiColorPicker"
        ],
        "x": 708,
        "y": 369,
        "family": "Checks",
        "summary": "A checkbox-derived color swatch that opens the game’s color picker.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ColorPicker.lua#L21",
        "doc": "<p>ColorPicker is a color swatch that opens the game’s color picker. Sushi 3.0 represents a color as separate numeric RGB or RGBA components. Enable the opacity control explicitly when you need alpha editing. It inherits from <a href=\"#CheckButton\" data-class=\"CheckButton\">CheckButton</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/ColorPicker.jpg\" alt=\"ColorPicker widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetColor(r, g, b, a), SetValue(r, g, b, a)</code></dt><dd>Stores the components and updates the swatch. The alpha value is optional.</dd></div>\n<div><dt><code>GetColor(), GetValue()</code></dt><dd>Returns the stored red, green, blue, and alpha values.</dd></div>\n<div><dt><code>SaveColor(r, g, b, a)</code></dt><dd>Stores the color and dispatches the color and input callbacks.</dd></div>\n<div><dt><code>EnableAlpha(enabled), HasAlpha()</code></dt><dd>Controls or queries whether the picker exposes opacity.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnColorChanged(r, g, b, a), OnInput(r, g, b, a)</code></dt><dd>Fire when the picker applies a color, including restoration of the original color when cancelled.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires when the picker applies a color after it is no longer visible.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local swatch = SushiColorPicker(UIParent)\nswatch:EnableAlpha(true)\nswatch:SetColor(0.2, 0.6, 1, 1)\nswatch:SetCall(&quot;OnInput&quot;, function(self, r, g, b, a)\n    print(r, g, b, a)\nend)</code></pre>"
      },
      {
        "id": "ExpandCheck",
        "parent": "CheckButton",
        "kind": "CheckButton",
        "file": "Classes/ExpandCheck.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiExpandCheck"
        ],
        "x": 708,
        "y": 422,
        "family": "Checks",
        "summary": "A checkbox with a second control to expand and collapse content.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ExpandCheck.lua#L21",
        "doc": "<p>ExpandCheck adds a plus or minus button beside the checkbox. Expansion and checked state are independent. The checkbox continues to fire the normal <a href=\"#CheckButton\" data-class=\"CheckButton\">CheckButton</a> calls.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetExpanded(expanded)</code></dt><dd>Changes the expansion icon and records the new expansion state.</dd></div>\n<div><dt><code>IsExpanded()</code></dt><dd>Returns the stored expansion state.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnToggle(expanded), OnExpand(expanded)</code></dt><dd>Fired in that order when the expansion button is pressed.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Fires after the expansion callbacks.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local row = SushiExpandCheck(UIParent)\nrow:SetLabel(&quot;Advanced settings&quot;)\nrow:SetExpanded(false)\nrow:SetCall(&quot;OnExpand&quot;, function(self, expanded)\n    print(expanded)\nend)</code></pre>"
      },
      {
        "id": "IconCheck",
        "parent": "CheckButton",
        "kind": "CheckButton",
        "file": "Classes/IconCheck.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiIconCheck"
        ],
        "x": 708,
        "y": 475,
        "family": "Checks",
        "summary": "A textured control that delegates its checked state to a smaller checkbox.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/IconCheck.lua#L21",
        "doc": "<p>IconCheck shows a texture with a smaller checkbox. The embedded checkbox forwards checked-state changes so callers can use the same input callbacks as a regular checkbox. It inherits from <a href=\"#CheckButton\" data-class=\"CheckButton\">CheckButton</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetIcon(texture), GetIcon()</code></dt><dd>Sets and reads the texture used as the icon.</dd></div>\n<div><dt><code>SetValue(checked), GetValue()</code></dt><dd>Sets or reads the checked state.</dd></div>\n<div><dt><code>SetLabel(text), GetLabel()</code></dt><dd>Sets or reads the associated text.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick(checked), OnInput(checked), OnUpdate(checked)</code></dt><dd>Forwarded from the embedded checkbox after it changes state.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local choice = SushiIconCheck(UIParent)\nchoice:SetIcon(&quot;Interface\\\\Icons\\\\INV_Misc_QuestionMark&quot;)\nchoice:SetValue(true)</code></pre>"
      },
      {
        "id": "Group",
        "parent": "CallHandler",
        "kind": "Frame",
        "file": "Classes/Group.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiGroup"
        ],
        "x": 186,
        "y": 141,
        "family": "Groups",
        "summary": "Lays out child frames and rebuilds its contents via a callback.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Group.lua#L21",
        "doc": "<p>Group lays out child frames using an orientation, an optional resizing direction, and break markers. It can recreate its children on demand from a callback. It inherits from <a href=\"#CallHandler\" data-class=\"CallHandler\">CallHandler</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Group.png\" alt=\"Group widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetChildren(handler), SetContent(handler)</code></dt><dd>Sets the layout-building callback and rebuilds the group.</dd></div>\n<div><dt><code>UpdateChildren(), Update()</code></dt><dd>Releases the children, calls the builder, and lays out the new contents when layout is possible.</dd></div>\n<div><dt><code>CreateChild(name), Create(name)</code></dt><dd>Acquires a Sushi widget by class name and binds it to the group.</dd></div>\n<div><dt><code>BindChild(child), Add(child)</code></dt><dd>Parents an existing widget to the group, adds it to the layout, and returns it.</dd></div>\n<div><dt><code>AddBreak()</code></dt><dd>Inserts a new row or column according to orientation.</dd></div>\n<div><dt><code>IterateChildren()</code></dt><dd>Iterates children managed by this group.</dd></div>\n<div><dt><code>ReleaseChildren()</code></dt><dd>Releases children that have a Release method and empties the layout.</dd></div>\n<div><dt><code>SetOrientation(orientation), GetOrientation()</code></dt><dd>Sets or reads HORIZONTAL or VERTICAL flow.</dd></div>\n<div><dt><code>SetResizing(direction), GetResizing()</code></dt><dd>Sets or reads the axis the group may grow along.</dd></div>\n<div><dt><code>Layout(), GetLimit()</code></dt><dd>Lays out existing children or returns the fixed-axis wrapping limit.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>UpdateChildren()</code></dt><dd>Builds the contents. SetChildren is the usual way to register this handler.</dd></div>\n<div><dt><code>OnInput(child, ...)</code></dt><dd>Forwards input from a child with that child and its values.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Signals that the group has rebuilt its contents.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local group = SushiGroup(UIParent)\ngroup:SetPoint(&quot;CENTER&quot;)\ngroup:SetChildren(function(self)\n    local check = self:Create(&quot;CheckButton&quot;)\n    check:SetLabel(&quot;Enable feature&quot;)\nend)</code></pre>"
      },
      {
        "id": "FauxScrollGroup",
        "parent": "Group",
        "kind": "Frame",
        "file": "Classes/FauxScrollGroup.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiFauxScrollGroup"
        ],
        "x": 360,
        "y": 137,
        "family": "Groups",
        "summary": "Displays a scrolling window into a longer list of entries.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/FauxScrollGroup.lua#L20",
        "doc": "<p>FauxScrollGroup adds a scrollbar to <a href=\"#Group\" data-class=\"Group\">Group</a>. The children builder should construct the visible range of rows. The scrollbar changes the offset and asks the group to rebuild.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>FirstEntry(), LastEntry()</code></dt><dd>Returns the inclusive first and last visible entry indices.</dd></div>\n<div><dt><code>GetOffset()</code></dt><dd>Returns the zero-based scroll offset.</dd></div>\n<div><dt><code>SetNumEntries(count), NumEntries()</code></dt><dd>Sets or reads the full entry count.</dd></div>\n<div><dt><code>SetMaxDisplayed(count), GetMaxDisplayed()</code></dt><dd>Sets or reads how many entries can be shown at once.</dd></div>\n<div><dt><code>SetEntrySize(height), GetEntrySize()</code></dt><dd>Sets or reads the height of one entry in pixels.</dd></div>\n<div><dt><code>Layout()</code></dt><dd>Refreshes the faux scrollbar from the entry counts and then lays out the group.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local list = SushiFauxScrollGroup(UIParent)\nlist:SetMaxDisplayed(5)\nlist:SetEntrySize(22)\nlist:SetNumEntries(30)\nlist:SetChildren(function(self)\n    for index = self:FirstEntry(), self:LastEntry() do\n        self:Create(&quot;TextButton&quot;):SetText(&quot;Entry &quot; .. index)\n    end\nend)</code></pre>"
      },
      {
        "id": "TabGroup",
        "parent": "Group",
        "kind": "Frame",
        "file": "Classes/TabGroup.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiTabGroup"
        ],
        "x": 360,
        "y": 190,
        "family": "Groups",
        "summary": "Builds a row of tab buttons and tracks the selected tab.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabGroup.lua#L21",
        "doc": "<p>TabGroup builds a tab strip whose items are identified by unique names. The style selects <a href=\"#TooltipTab\" data-class=\"TooltipTab\">TooltipTab</a>, <a href=\"#PanelTab\" data-class=\"PanelTab\">PanelTab</a>, or <a href=\"#DialogTab\" data-class=\"DialogTab\">DialogTab</a> for all rows. It inherits from <a href=\"#Group\" data-class=\"Group\">Group</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>AddTab(name, text, tip, disabled)</code></dt><dd>Adds or replaces the entry. Text defaults to the name.</dd></div>\n<div><dt><code>GetTab(name)</code></dt><dd>Returns the entry’s text, tooltip, and disabled flag.</dd></div>\n<div><dt><code>ClearTabs()</code></dt><dd>Releases the visible tabs and clears the entries.</dd></div>\n<div><dt><code>SetSelection(name), GetSelection()</code></dt><dd>Updates or reads the active name. SetSelection rebuilds the tabs and emits callbacks.</dd></div>\n<div><dt><code>SetStyle(style), GetStyle()</code></dt><dd>Sets or reads Tooltip, Panel, or Dialog. Call Update() to rebuild existing tabs after changing the style.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnTabSelected(name), OnSelection(name), OnInput(name), OnUpdate()</code></dt><dd>Fired in order by SetSelection, whether invoked from code or by clicking a tab.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tabs = SushiTabGroup(UIParent)\ntabs:SetStyle(&quot;Panel&quot;)\ntabs:AddTab(&quot;general&quot;, &quot;General&quot;)\ntabs:AddTab(&quot;advanced&quot;, &quot;Advanced&quot;)\ntabs:SetSelection(&quot;general&quot;)</code></pre>"
      },
      {
        "id": "MagicGroup",
        "parent": "Group",
        "kind": "Frame",
        "file": "Classes/MagicGroup.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiMagicGroup"
        ],
        "x": 360,
        "y": 84,
        "family": "Groups",
        "summary": "Creates a group that can be registered as a category in the Interface Options panel.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/MagicGroup.lua#L20",
        "doc": "<p>MagicGroup builds addon options panels on top of <a href=\"#Group\" data-class=\"Group\">Group</a>. It can fill in addon metadata, lay out a title and subtitle, and attach itself to the legacy Interface Options panel.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>CreateOptionsCategory(parent, title)</code></dt><dd>Creates and registers an options category and returns the group for that category.</dd></div>\n<div><dt><code>SetAddon(addon), GetAddon(), GetAddonInfo()</code></dt><dd>Stores the addon identifier, returns it, or reads its metadata for the generated headings.</dd></div>\n<div><dt><code>SetTitle(title), GetTitle()</code></dt><dd>Overrides or reads the panel heading.</dd></div>\n<div><dt><code>SetSubtitle(subtitle), GetSubtitle()</code></dt><dd>Overrides or reads the explanatory text.</dd></div>\n<div><dt><code>SetFooter(footer), GetFooter()</code></dt><dd>Sets or reads the footer.</dd></div>\n<div><dt><code>SetChildren(handler), SetContent(handler)</code></dt><dd>Registers the customization callback invoked after the generated heading content.</dd></div>\n<div><dt><code>Create(class, text, key, disabled, small)</code></dt><dd>Acquires a settings control and binds its value to a settings key. The key defaults to the label. OnInput writes the value back to the settings table or globals.</dd></div>\n<div><dt><code>CreateHeader(text, font, underline)</code></dt><dd>Creates a <a href=\"#Header\" data-class=\"Header\">Header</a> with the given text, font, and underline.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>MagicChildren()</code></dt><dd>Fires after the built-in title and subtitle are created.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local options = SushiMagicGroup:CreateOptionsCategory(nil, &quot;My Addon&quot;)\noptions:SetTitle(&quot;My Addon&quot;)\noptions:SetChildren(function(self)\n    local check = self:CreateChild(&quot;CheckButton&quot;)\n    check:SetLabel(&quot;Enable feature&quot;)\n    check:SetValue(true)\nend)</code></pre>"
      },
      {
        "id": "CreditsGroup",
        "parent": "MagicGroup",
        "kind": "Frame",
        "file": "Classes/CreditsGroup.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiCreditsGroup"
        ],
        "x": 534,
        "y": 84,
        "family": "Groups",
        "summary": "Builds a credits panel with a list of contributors and a website link.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CreditsGroup.lua#L21",
        "doc": "<p>CreditsGroup builds a support or credits panel on top of <a href=\"#MagicGroup\" data-class=\"MagicGroup\">MagicGroup</a>. It renders named contributor sections and opens a <a href=\"#Popup\" data-class=\"Popup\">Popup</a> containing the configured website address when a heading is clicked.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetPeople(people), GetPeople()</code></dt><dd>Sets or reads the ordered list of sections. Each section supplies a title and a people array.</dd></div>\n<div><dt><code>SetFonts(fonts), GetFonts()</code></dt><dd>Sets or reads the array of fonts used for contributors in each section.</dd></div>\n<div><dt><code>SetWebsite(url), GetWebsite()</code></dt><dd>Sets or reads the address shown in the copyable popup.</dd></div>\n<div><dt><code>GetTitle(), GetSubtitle()</code></dt><dd>Returns caller-provided headings or the built-in support text.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local credits = SushiCreditsGroup:CreateOptionsCategory(&quot;My Addon&quot;, &quot;Credits&quot;)\ncredits:SetWebsite(&quot;https://example.com&quot;)\ncredits:SetPeople({\n    {title = &quot;Contributors&quot;, people = {&quot;Alex&quot;, &quot;Sam&quot;}}\n})</code></pre>"
      },
      {
        "id": "DropdownFrame",
        "parent": "Group",
        "kind": "Frame",
        "file": "Classes/DropdownFrame.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiDropdownFrame",
          "SushiDropFrame"
        ],
        "x": 360,
        "y": 243,
        "family": "Dropdowns",
        "summary": "Displays a dropdown menu and creates its rows from option tables.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/DropdownFrame.lua#L20",
        "doc": "<p>DropdownFrame is the popup menu panel used by <a href=\"#Dropdown\" data-class=\"Dropdown\">Dropdown</a>. It acquires <a href=\"#DropdownButton\" data-class=\"DropdownButton\">DropdownButton</a> rows from menu data and closes the current panel when the anchor is toggled again. It is also exposed as SushiDropFrame. It inherits from <a href=\"#Group\" data-class=\"Group\">Group</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>Display(anchor, isMenu, builder)</code></dt><dd>Opens a new popup below the anchor. The longer form accepts SetPoint arguments followed by isMenu and builder.</dd></div>\n<div><dt><code>Toggle(anchor, isMenu, builder)</code></dt><dd>Closes the popup for the same anchor or opens a new one.</dd></div>\n<div><dt><code>CloseAll()</code></dt><dd>Releases active dropdown panels.</dd></div>\n<div><dt><code>SetMenu(isMenu)</code></dt><dd>Switches the panel between menu and dropdown styling.</dd></div>\n<div><dt><code>SetLines(rowsOrBuilder)</code></dt><dd>Stores an array of rows or a callback. The callback receives the panel and can add rows directly or return an array of rows.</dd></div>\n<div><dt><code>AddLine(data)</code></dt><dd>Creates a row from an options table. Common fields include text, checked, isRadio, notCheckable, tooltipTitle, tooltipText, and func.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">SushiDropdownFrame:Toggle(anchor, false, function(menu)\n    menu:AddLine({\n        text = &quot;Reset settings&quot;,\n        notCheckable = true,\n        func = function() print(&quot;Reset&quot;) end\n    })\nend)</code></pre>"
      },
      {
        "id": "Dropdown",
        "parent": "TipOwner",
        "kind": "Frame",
        "file": "Classes/Dropdown.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiDropdown"
        ],
        "x": 360,
        "y": 462,
        "family": "Dropdowns",
        "summary": "A labeled single-choice widget that opens a DropdownFrame for its options.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Dropdown.lua#L21",
        "doc": "<p>Dropdown is a labeled single-choice widget with the Blizzard dropdown template. It uses <a href=\"#DropdownFrame\" data-class=\"DropdownFrame\">DropdownFrame</a> for the option list. A user choice emits input callbacks. To apply the selection to the display, call SetValue from the handler. It inherits from <a href=\"#TipOwner\" data-class=\"TipOwner\">TipOwner</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Dropdown.png\" alt=\"Dropdown widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetLabel(label), GetLabel()</code></dt><dd>Sets or reads the label above the dropdown. SetText and GetText are aliases.</dd></div>\n<div><dt><code>SetValue(key), GetValue()</code></dt><dd>Sets or reads the selected entry key.</dd></div>\n<div><dt><code>AddLine(key, name, tip)</code></dt><dd>Adds or replaces an entry. The display name defaults to the key, and the tooltip is optional.</dd></div>\n<div><dt><code>AddLines(key, name, ...)</code></dt><dd>Adds entries from alternating key and display-name arguments.</dd></div>\n<div><dt><code>GetLine(key)</code></dt><dd>Returns the display name and tooltip for a key.</dd></div>\n<div><dt><code>IterateLines(), NumLines(), ClearLines()</code></dt><dd>Iterates entries, counts them, or removes them.</dd></div>\n<div><dt><code>SetDisabled(disabled), IsDisabled()</code></dt><dd>Controls or queries whether the dropdown responds to input.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Controls or queries the compact label style.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnSelection(key), OnInput(key), OnUpdate()</code></dt><dd>Fired in order when the user chooses a different entry.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local menu = SushiDropdown(UIParent)\nmenu:SetLabel(&quot;Difficulty&quot;)\nmenu:AddLine(&quot;normal&quot;, &quot;Normal&quot;)\nmenu:AddLine(&quot;hard&quot;, &quot;Hard&quot;)\nmenu:SetValue(&quot;normal&quot;)\nmenu:SetCall(&quot;OnInput&quot;, function(self, key)\n    self:SetValue(key)\nend)</code></pre>"
      },
      {
        "id": "TextureDropdown",
        "parent": "Dropdown",
        "kind": "Frame",
        "file": "Classes/TextureDropdown.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiTextureDropdown",
          "SushiTextureDrop"
        ],
        "x": 534,
        "y": 473,
        "family": "Dropdowns",
        "summary": "A chooser that presents textures in a popup grid.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureDropdown.lua#L21",
        "doc": "<p>TextureDropdown inherits the entry API of <a href=\"#Dropdown\" data-class=\"Dropdown\">Dropdown</a> and uses image paths in place of display names. The selected image is displayed using a <a href=\"#TextureButton\" data-class=\"TextureButton\">TextureButton</a>, and a <a href=\"#Group\" data-class=\"Group\">Group</a> arranges the choices into a popup grid.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/TextureDropdown.png\" alt=\"TextureDropdown widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>AddLine(key, texture, tip)</code></dt><dd>Inherited from Dropdown. Store the texture file as the second argument.</dd></div>\n<div><dt><code>SetValue(key)</code></dt><dd>Intended to update the preview and record a selection. This snapshot reads from linesName, while the inherited AddLine stores textures in names. The stock methods do not work together for updating the preview.</dd></div>\n<div><dt><code>GetButtonSize()</code></dt><dd>Returns the texture-cell width and height used for layout.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnLineSelected(key), OnSelection(key), OnInput(key), OnUpdate()</code></dt><dd>Fired in order when a texture cell is clicked. The menu closes after dispatch.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local textures = SushiTextureDropdown(UIParent)\ntextures:AddLine(&quot;question&quot;, &quot;Interface\\\\Icons\\\\INV_Misc_QuestionMark&quot;)\ntextures:SetCall(&quot;OnInput&quot;, function(self, key)\n    print(key)\nend)</code></pre>"
      },
      {
        "id": "GlowBox",
        "parent": "CallHandler",
        "kind": "Frame",
        "file": "Classes/GlowBox.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiGlowBox"
        ],
        "x": 186,
        "y": 225,
        "family": "Miscellaneous",
        "summary": "An anchored tutorial box with a directional pointer and a close button.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/GlowBox.lua#L21",
        "doc": "<p>GlowBox displays an instructional callout with a close button and a configurable pointer. Anchor it next to the UI element it describes. It inherits from <a href=\"#CallHandler\" data-class=\"CallHandler\">CallHandler</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/GlowBox.jpg\" alt=\"GlowBox widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text)</code></dt><dd>Sets the body text and adjusts the height to fit it.</dd></div>\n<div><dt><code>GetText()</code></dt><dd>Calls the font string getter, but this snapshot does not return its result.</dd></div>\n<div><dt><code>SetDirection(direction), GetDirection()</code></dt><dd>Controls the pointer side. Use TOP, BOTTOM, LEFT, or RIGHT.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClose()</code></dt><dd>Fires when the user clicks the close button, before the box is hidden.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local tip = SushiGlowBox(UIParent)\ntip:SetPoint(&quot;CENTER&quot;)\ntip:SetDirection(&quot;BOTTOM&quot;)\ntip:SetText(&quot;Drag an item here to add it.&quot;)</code></pre>"
      },
      {
        "id": "Header",
        "parent": "CallHandler",
        "kind": "Frame",
        "file": "Classes/Header.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiHeader"
        ],
        "x": 186,
        "y": 282,
        "family": "Buttons",
        "summary": "An optionally underlined text heading with mouse interactions.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Header.lua#L21",
        "doc": "<p>Header is a text heading built from a frame and font string. It can underline its own text and brighten it on mouseover. It recalculates height when its text or available width changes. It inherits from <a href=\"#CallHandler\" data-class=\"CallHandler\">CallHandler</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Header.png\" alt=\"Header widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetText(text), GetText()</code></dt><dd>Sets and reads the heading text. SetLabel and GetLabel are aliases.</dd></div>\n<div><dt><code>SetFont(font), GetFont()</code></dt><dd>Sets and returns the font object used by the text.</dd></div>\n<div><dt><code>SetUnderlined(enabled), IsUnderlined()</code></dt><dd>Controls or queries the underline.</dd></div>\n<div><dt><code>SetHighlightFactor(factor), GetHighlightFactor()</code></dt><dd>Controls the mouseover brightness multiplier.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnClick()</code></dt><dd>Fires when the heading receives a mouse press.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local heading = SushiHeader(UIParent)\nheading:SetWidth(200)\nheading:SetText(&quot;General settings&quot;)\nheading:SetUnderlined(true)</code></pre>"
      },
      {
        "id": "EditBox",
        "parent": "TipOwner",
        "kind": "EditBox",
        "file": "Classes/EditBox.lua",
        "line": 20,
        "abstract": false,
        "aliases": [
          "SushiEditBox"
        ],
        "x": 360,
        "y": 515,
        "family": "Editboxes",
        "summary": "A labeled text input built on InputBoxTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/EditBox.lua#L20",
        "doc": "<p>EditBox is a labeled single-line input with the game’s InputBoxTemplate styling. Enter sends the live text to handlers. Escape restores the value captured when the widget gained focus. It inherits from <a href=\"#TipOwner\" data-class=\"TipOwner\">TipOwner</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/EditBox.png\" alt=\"EditBox widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetValue(value), GetValue()</code></dt><dd>Aliases for SetText and GetText.</dd></div>\n<div><dt><code>SetLabel(label), GetLabel()</code></dt><dd>Sets or returns the separate label above the input.</dd></div>\n<div><dt><code>SetDisabled(disabled), IsDisabled()</code></dt><dd>Controls the editable state, clears focus when disabled, and switches fonts.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Sets or queries the compact label and text styling.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnTextChanged(value), OnInput(value), OnUpdate()</code></dt><dd>Fired in that order when Enter confirms the input.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local input = SushiEditBox(UIParent)\ninput:SetLabel(&quot;Display name&quot;)\ninput:SetValue(&quot;Player&quot;)\ninput:SetCall(&quot;OnInput&quot;, function(self, value)\n    print(value)\nend)</code></pre>"
      },
      {
        "id": "Slider",
        "parent": "TipOwner",
        "kind": "Slider",
        "file": "Classes/Slider.lua",
        "line": 32,
        "abstract": false,
        "aliases": [
          "SushiSlider"
        ],
        "x": 360,
        "y": 568,
        "family": "Miscellaneous",
        "summary": "A labeled range control with a configurable value display and mouse-wheel step.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Slider.lua#L32",
        "doc": "<p>Slider shows a labeled range control with an editable numeric value, keyboard input, and mouse-wheel support. Numeric values are clamped to the configured range and rounded before being reported. It inherits from <a href=\"#TipOwner\" data-class=\"TipOwner\">TipOwner</a>.</p>\n<p><img class=\"widget-preview\" src=\"./widgets/Slider.png\" alt=\"Slider widget preview\" loading=\"lazy\"></p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>SetRange(min, max)</code></dt><dd>Sets the lower and upper bounds. Read them with the native GetMinMaxValues() method.</dd></div>\n<div><dt><code>SetStep(step, minStep), GetStep()</code></dt><dd>Sets or returns the mouse-wheel step and the optional finer rounding step.</dd></div>\n<div><dt><code>SetValue(value, update)</code></dt><dd>Clamps and rounds the value. Pass true to emit the final update immediately after a change.</dd></div>\n<div><dt><code>GetRoundedValue(value)</code></dt><dd>Rounds a number to the configured increment.</dd></div>\n<div><dt><code>SetRangeText(low, high), GetRangeText()</code></dt><dd>Overrides or reads custom labels at the two endpoints.</dd></div>\n<div><dt><code>SetPattern(pattern), GetPattern()</code></dt><dd>Sets or reads the display format around the number. Use %s for the value.</dd></div>\n<div><dt><code>SetValueText(text), GetValueText()</code></dt><dd>Sets or reads a fixed replacement for the numeric display.</dd></div>\n<div><dt><code>SetLabel(label), GetLabel()</code></dt><dd>Sets or reads the heading. SetText and GetText are aliases.</dd></div>\n<div><dt><code>SetSmall(small), IsSmall()</code></dt><dd>Controls or queries the compact fonts.</dd></div>\n<div><dt><code>SetDisabled(disabled), IsDisabled()</code></dt><dd>Controls or queries whether the widget accepts input.</dd></div>\n</dl>\n<h3>Calls</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnValueChanged(value), OnInput(value)</code></dt><dd>Fire when SetValue changes the rounded value, including changes made by the user.</dd></div>\n<div><dt><code>OnUpdate()</code></dt><dd>Signals a completed update, including after a drag or a SetValue call with update enabled.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">local slider = SushiSlider(UIParent)\nslider:SetLabel(&quot;Opacity&quot;)\nslider:SetRange(0, 100)\nslider:SetStep(5, 1)\nslider:SetPattern(&quot;%s%&quot;)\nslider:SetValue(50, true)</code></pre>"
      },
      {
        "id": "Popup",
        "parent": "CallHandler",
        "kind": "Frame",
        "file": "Classes/Popup.lua",
        "line": 21,
        "abstract": false,
        "aliases": [
          "SushiPopup"
        ],
        "x": 186,
        "y": 53,
        "family": "Groups",
        "summary": "Shows and tracks dialogs using Blizzard’s StaticPopupTemplate.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Popup.lua#L21",
        "doc": "<p>Popup manages dialogs constructed with the game’s StaticPopupTemplate. It accepts an options table or the name of a Blizzard StaticPopupDialogs entry and tracks active dialogs by ID. It inherits from <a href=\"#CallHandler\" data-class=\"CallHandler\">CallHandler</a>.</p>\n<h3>Methods</h3>\n<dl class=\"api-table\">\n<div><dt><code>Display(input)</code></dt><dd>Shows the specified dialog. Conditions such as duplicate IDs, death, or a cinematic can prevent it from opening.</dd></div>\n<div><dt><code>Toggle(input)</code></dt><dd>Closes the dialog with the same ID if it is already visible. Otherwise opens it.</dd></div>\n<div><dt><code>Close(id)</code></dt><dd>Cancels the active dialog with the given ID.</dd></div>\n<div><dt><code>Cancel(reason)</code></dt><dd>Cancels a dialog instance and passes the reason to its callback.</dd></div>\n<div><dt><code>Organize()</code></dt><dd>Restacks visible Sushi popups beneath Blizzard popups.</dd></div>\n</dl>\n<h3>Options</h3>\n<dl class=\"api-table\">\n<div><dt><code>id, text</code></dt><dd>Identifies the dialog and sets its message.</dd></div>\n<div><dt><code>button1, button2</code></dt><dd>Set the primary and secondary button labels.</dd></div>\n<div><dt><code>hasEditBox, editBoxText</code></dt><dd>Show the text input and supply its initial value.</dd></div>\n<div><dt><code>timeout, hideOnEscape</code></dt><dd>Set the timeout and whether Escape dismisses the dialog.</dd></div>\n<div><dt><code>whileDead, interruptCinematic</code></dt><dd>Allow the dialog in situations where it would otherwise be suppressed.</dd></div>\n</dl>\n<h3>Callbacks</h3>\n<dl class=\"api-table\">\n<div><dt><code>OnAccept(frame)</code></dt><dd>Runs when the primary button is activated. Returning true keeps the dialog open.</dd></div>\n<div><dt><code>OnCancel(frame, reason)</code></dt><dd>Runs for cancellation. A dialog blocked before creation passes nil as its frame.</dd></div>\n</dl>\n<h3>Example</h3>\n<pre><code class=\"language-lua\">SushiPopup:Display({\n    id = &quot;MY_ADDON_RESET&quot;,\n    text = &quot;Reset addon settings?&quot;,\n    button1 = &quot;Reset&quot;,\n    button2 = &quot;Cancel&quot;,\n    OnAccept = function() print(&quot;Reset confirmed&quot;) end\n})</code></pre>"
      }
    ],
    "edges": [
      {
        "id": "TipOwner-extends-CallHandler",
        "from": "TipOwner",
        "to": "CallHandler",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TipOwner is registered as a subclass of CallHandler in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TipOwner.lua#L20"
      },
      {
        "id": "ButtonBase-extends-TipOwner",
        "from": "ButtonBase",
        "to": "TipOwner",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "ButtonBase is registered as a subclass of TipOwner in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ButtonBase.lua#L21"
      },
      {
        "id": "DropdownButton-extends-ButtonBase",
        "from": "DropdownButton",
        "to": "ButtonBase",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "DropdownButton is registered as a subclass of ButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/DropdownButton.lua#L20"
      },
      {
        "id": "TextButton-extends-ButtonBase",
        "from": "TextButton",
        "to": "ButtonBase",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TextButton is registered as a subclass of ButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextButton.lua#L20"
      },
      {
        "id": "GrayButton-extends-TextButton",
        "from": "GrayButton",
        "to": "TextButton",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "GrayButton is registered as a subclass of TextButton in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/GrayButton.lua#L20"
      },
      {
        "id": "HelpButton-extends-ButtonBase",
        "from": "HelpButton",
        "to": "ButtonBase",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "HelpButton is registered as a subclass of ButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/HelpButton.lua#L20"
      },
      {
        "id": "TabButtonBase-extends-TextButton",
        "from": "TabButtonBase",
        "to": "TextButton",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TabButtonBase is registered as a subclass of TextButton in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L22"
      },
      {
        "id": "TooltipTab-extends-TabButtonBase",
        "from": "TooltipTab",
        "to": "TabButtonBase",
        "type": "inheritance",
        "method": "CreateClass",
        "description": "TooltipTab is registered as a subclass of TabButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L85"
      },
      {
        "id": "PanelTab-extends-TabButtonBase",
        "from": "PanelTab",
        "to": "TabButtonBase",
        "type": "inheritance",
        "method": "CreateClass",
        "description": "PanelTab is registered as a subclass of TabButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L86"
      },
      {
        "id": "DialogTab-extends-TabButtonBase",
        "from": "DialogTab",
        "to": "TabButtonBase",
        "type": "inheritance",
        "method": "CreateClass",
        "description": "DialogTab is registered as a subclass of TabButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabButtons.lua#L87"
      },
      {
        "id": "TextureButton-extends-ButtonBase",
        "from": "TextureButton",
        "to": "ButtonBase",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TextureButton is registered as a subclass of ButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureButton.lua#L21"
      },
      {
        "id": "CheckButton-extends-ButtonBase",
        "from": "CheckButton",
        "to": "ButtonBase",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "CheckButton is registered as a subclass of ButtonBase in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CheckButton.lua#L21"
      },
      {
        "id": "ColorPicker-extends-CheckButton",
        "from": "ColorPicker",
        "to": "CheckButton",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "ColorPicker is registered as a subclass of CheckButton in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ColorPicker.lua#L21"
      },
      {
        "id": "ExpandCheck-extends-CheckButton",
        "from": "ExpandCheck",
        "to": "CheckButton",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "ExpandCheck is registered as a subclass of CheckButton in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/ExpandCheck.lua#L21"
      },
      {
        "id": "IconCheck-extends-CheckButton",
        "from": "IconCheck",
        "to": "CheckButton",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "IconCheck is registered as a subclass of CheckButton in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/IconCheck.lua#L21"
      },
      {
        "id": "Group-extends-CallHandler",
        "from": "Group",
        "to": "CallHandler",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "Group is registered as a subclass of CallHandler in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Group.lua#L21"
      },
      {
        "id": "FauxScrollGroup-extends-Group",
        "from": "FauxScrollGroup",
        "to": "Group",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "FauxScrollGroup is registered as a subclass of Group in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/FauxScrollGroup.lua#L20"
      },
      {
        "id": "TabGroup-extends-Group",
        "from": "TabGroup",
        "to": "Group",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TabGroup is registered as a subclass of Group in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabGroup.lua#L21"
      },
      {
        "id": "MagicGroup-extends-Group",
        "from": "MagicGroup",
        "to": "Group",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "MagicGroup is registered as a subclass of Group in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/MagicGroup.lua#L20"
      },
      {
        "id": "CreditsGroup-extends-MagicGroup",
        "from": "CreditsGroup",
        "to": "MagicGroup",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "CreditsGroup is registered as a subclass of MagicGroup in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CreditsGroup.lua#L21"
      },
      {
        "id": "DropdownFrame-extends-Group",
        "from": "DropdownFrame",
        "to": "Group",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "DropdownFrame is registered as a subclass of Group in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/DropdownFrame.lua#L20"
      },
      {
        "id": "Dropdown-extends-TipOwner",
        "from": "Dropdown",
        "to": "TipOwner",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "Dropdown is registered as a subclass of TipOwner in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Dropdown.lua#L21"
      },
      {
        "id": "TextureDropdown-extends-Dropdown",
        "from": "TextureDropdown",
        "to": "Dropdown",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "TextureDropdown is registered as a subclass of Dropdown in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureDropdown.lua#L21"
      },
      {
        "id": "GlowBox-extends-CallHandler",
        "from": "GlowBox",
        "to": "CallHandler",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "GlowBox is registered as a subclass of CallHandler in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/GlowBox.lua#L21"
      },
      {
        "id": "Header-extends-CallHandler",
        "from": "Header",
        "to": "CallHandler",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "Header is registered as a subclass of CallHandler in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Header.lua#L21"
      },
      {
        "id": "EditBox-extends-TipOwner",
        "from": "EditBox",
        "to": "TipOwner",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "EditBox is registered as a subclass of TipOwner in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/EditBox.lua#L20"
      },
      {
        "id": "Slider-extends-TipOwner",
        "from": "Slider",
        "to": "TipOwner",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "Slider is registered as a subclass of TipOwner in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Slider.lua#L32"
      },
      {
        "id": "Popup-extends-CallHandler",
        "from": "Popup",
        "to": "CallHandler",
        "type": "inheritance",
        "method": "MakeSushi",
        "description": "Popup is registered as a subclass of CallHandler in Sushi 3.0. It inherits methods and behavior from that class.",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Popup.lua#L21"
      },
      {
        "id": "Dropdown-uses-DropdownFrame",
        "from": "Dropdown",
        "to": "DropdownFrame",
        "type": "composition",
        "method": "Dropdown:ToggleDrop",
        "description": "Opens a DropdownFrame to present the options.",
        "route": "M485 474 H498 Q505 474 505 467 V269 Q505 257 486 257",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/Dropdown.lua#L131"
      },
      {
        "id": "DropdownFrame-uses-DropdownButton",
        "from": "DropdownFrame",
        "to": "DropdownButton",
        "type": "composition",
        "method": "Drop:AddLine",
        "description": "Creates a DropdownButton for each menu row.",
        "route": "M486 263 C503 263 513 280 534 280",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/DropdownFrame.lua#L113"
      },
      {
        "id": "CreditsGroup-uses-Popup",
        "from": "CreditsGroup",
        "to": "Popup",
        "type": "composition",
        "method": "Credits:CreateHeader",
        "description": "Displays the credits website address in a popup.",
        "route": "M554 84 V27 Q554 17 544 17 H258 Q248 17 248 27 V53",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/CreditsGroup.lua#L81"
      },
      {
        "id": "TextureDropdown-uses-Group",
        "from": "TextureDropdown",
        "to": "Group",
        "type": "composition",
        "method": "TextureDropdown setup",
        "description": "Uses a Group as the shared popup layout for the texture grid.",
        "route": "M541 473 C541 454 505 450 505 438 V221 C505 173 351 160 312 160",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureDropdown.lua#L26"
      },
      {
        "id": "TextureDropdown-uses-TextureButton",
        "from": "TextureDropdown",
        "to": "TextureButton",
        "type": "composition",
        "method": "TexDrop:OnCreate",
        "description": "Creates a TextureButton to show the selected texture.",
        "route": "M592 473 V460",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TextureDropdown.lua#L134"
      },
      {
        "id": "IconCheck-uses-CheckButton",
        "from": "IconCheck",
        "to": "CheckButton",
        "type": "composition",
        "method": "Icon:OnAcquire",
        "description": "Creates an inner CheckButton and forwards its input callbacks.",
        "route": "M708 505 C683 505 678 497 678 474 V407 C678 403 669 403 660 403",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/IconCheck.lua#L39"
      },
      {
        "id": "TabGroup-uses-TooltipTab",
        "from": "TabGroup",
        "to": "TooltipTab",
        "type": "composition",
        "method": "Tabs:UpdateTabs",
        "description": "Creates TooltipTab widgets when its style is Tooltip.",
        "route": "M486 201 H496 Q504 201 504 192 V160 Q504 151 513 151 H939 Q949 151 949 161 V245",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabGroup.lua#L69"
      },
      {
        "id": "TabGroup-uses-PanelTab",
        "from": "TabGroup",
        "to": "PanelTab",
        "type": "composition",
        "method": "Tabs:UpdateTabs",
        "description": "Creates PanelTab widgets when its style is Panel.",
        "route": "M486 209 H500 Q511 209 511 200 V178 Q511 169 522 169 H1019 Q1033 169 1033 184 V313 Q1033 322 1008 322",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabGroup.lua#L69"
      },
      {
        "id": "TabGroup-uses-DialogTab",
        "from": "TabGroup",
        "to": "DialogTab",
        "type": "composition",
        "method": "Tabs:UpdateTabs",
        "description": "Creates DialogTab widgets when its style is Dialog.",
        "route": "M486 217 H506 Q519 217 519 204 Q519 187 534 187 H1036 Q1050 187 1050 201 V367 Q1050 379 1008 379",
        "source": "https://github.com/Jaliborc/Sushi-3.2/blob/8d95b1b30241d7b0b4bdd0aa5cd80162343a859e/Classes/TabGroup.lua#L69"
      }
    ],
    "families": [
      "Core",
      "Buttons",
      "Checks",
      "Dropdowns",
      "Editboxes",
      "Groups",
      "Miscellaneous"
    ],
    "root": "CallHandler"
  }
}
