---
title: React Dev Tools
date: 2019-02-27T01:58:45.284Z
categories: React
image: thumb.jpg
---

To develop React applications effectively - you'll need to use React DevTools browser extension. It's available for both Chrome and Firefox.

It has two main features: view of a component tree and the current state and props of the selected component.

## Getting Started

First go to extension page for [Crome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/) and install it. 

Both Chrome and Firefox extensions look more or less same and have similar functionality.

After you add it to your browser you'll see new tab in your developer tools panel.

To open developer tools in Chrome you can do one of the following:

* Open the Chrome menu at the top-right of your browser window, then select Tools > Developer Tools.
* Right-click on any page element and select Inspect Element.
* Press `F12` or `Ctrl + Shift + I` on Windows or Linux. Press `Cmd + Opt + I`

To open them in Firefox:

* Select "Web Console" from the Web Developer submenu in the Firefox Menu (or Tools menu if you display the menu bar or are on Mac OS X)
* Press `F12` or `Ctrl + Shift + I` on Windows or Linux. Press `Cmd + Opt + I`

## Navigating The Component Tree

On the left side of the React DevTools tab you can see the component tree. 

This view is very similar to the plain HTML tree you can see on the `Elements` tab (`Inspector` in Firefox).

You can navigate it by clicking the elements, or using arrows on your keyboard or (`hjkl` buttons like in Vim).

Faster way to find specific element is to right-click it on the page and select the `inspect element` option. It will open developer tools and when you'll switch to React tab - you'll see your element selected.

You can also use search to find elements by name.

## Interacting With Elements

Elements have collapsers (triangles on the left), some of them are highlighted with color, that means that this component has `state` or `context`.

You can right click elements in the tree to scroll to them in the view, or show component source.

You can also choose "Find the DOM node". This will bring you to the corresponding DOM node in the Elements tab.

## Updating Props And State

On the right side of the panel you can see `props` and `state` of the selected component.

## Tracking Re-renders

Another super-handy feature is highlighting updates on the page. Toggle `Highlight Updates` in settings menu to show redraw regions on your app.

![highlight updates](/highlight_updates.png)

It will start visualizing components that got re-rendered. Depending on the frequency of updates, a different color is used. Blue shows infrequent updates, ranging to green, yellow, and red for components that update frequently.

## Console Features

After installing React DevTools you'll also get new reference `$r` in the `console` tab.

This `$r` refers to currently selected element in the tree view. You can use it to interact with that element.