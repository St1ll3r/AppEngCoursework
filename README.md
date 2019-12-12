# AppEngCoursework

## Description

This project consists of a tool for outline editing, using a combination of HTML, CSS, and JavaScript and has been developed as coursework for Application Engineering unit of the BS(Hons) Software Engineering course.

## Installation

In order to get the project running you should:

* Download/clone this repository
* Run the command "npm install" and then "npm start" on the root path of the project
* Go to your preferred browser and type on the URL bar: "localhost:8080"

## How far did I go and what you can do with this application


As stated before, my task was to create an outline editor where for core features, the user should be able to enter and edit textual points, organize their points in an tree hierarchy and save their work even if the computer's been rebooted.

I've managed to create a tool that does the three of them and a few more things such as:

* Changing between two themes (light and dark).
* Even if the user closes their browser or reboots their computer, the theme is saved alongside the content.
* Add a clear button, so the whole content gets wiped and the user can start from scratch.
* A line and outline counter so the user can keep an eye on their numbers.
* Small identifiers on each type of line, a bulletpoint for paragraphs and a minus sign for outlines.
* Create headers
* Ability to delete lines/headers.

## How to use

I've decided to keep it as simple as possible for the user so, let's get started.

___

### Creating paragraphs

If you want to create a paragraph all you have to do is press **ENTER** and a new paragraph will be added to your content.

___

### Creating headers

If you want to transform the line you're typing on, in a **header**, press **TAB** and all the content that will come afterwards will be nested underneath this header. You'll also notice a minus sign behind your line, that means that line has just became an header.

___

### Deleting a line/header

All you need to do is press **BACKSPACE** until you reach the **beginning of the line**. If you want to delete an **header**, all you have to do is press it when there's no content on that line and the **header will be transformed back into a paragraph**. If you want to delete the whole line just press **BACKSPACE** when the line is empty and the **line will be deleted**.

___

### Changing themes

Just press one of the buttons on the left side of the page, with the theme (light or dark) you'd like to have underneath **Theme**.

___

### Clearing all the content and starting from scratch

Just press the button "Clear" on the right side of the page, underneath **Clear Content**.

___

## How I got this done

So as soon as I've seen the project briefing, I was quite confused and lost for the first few weeks after being announced but then I've discussed it with a few of my peers and kinda pictured something on my head that matched the criterias. From that point onwards I've analyzed a few paths to take in order to get this one and I've decided that nesting divs would be the easiest way to get it working as I wanted it to.

___

### How does the whole thing work then?

Basically, there is a div named "mainTextArea" which keeps all the content inside of it. Whenever you add a line to that content a div with the class "line" is created and inside of it a div with the class "text" is nested inside of that. Whenever you create an header, a new div with the class "icon" is inserted before the previous mentioned "text" div. If you press enter after an header is created, the newly created line becomes a child of the previous header as well as all the new lines inserted after that until a new header is created and nests other lines underneath it.

## Future plans for this project

* Make it spotless and useable by anyone.
* Make it responsive and mobile friendly.
* Remove all the bugs it might contain.
* Optimize the code and make it cleaner.
* Get the node server it uses to do more stuff than just hosting a static page.
