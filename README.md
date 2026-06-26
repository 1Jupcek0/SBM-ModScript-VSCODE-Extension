# Modscript IntelliSense

A basic VS Code Extension that adds IntelliSense for the SBM/Microfocus Modscript language.
This project is still a work in progress, complete converge of the language has not yet been added. 

* Notes on use:

	* Full language support is in progress, not all classes will be complete.
	* To provide IntelliSense for your own custom functions, place a JSDOC style multiline comment above the function. The Engine will help you fill it out if you start with /** in the lines above the function and select the documentation snippet.

# Composer Explorer
This extension also adds support for editing scripts directly from Composer without having to export them first. This feature has only been tested with Composer 11.7, use at your own risk.

* Notes on use:

	* Composer currently does not expose a way of automatically importing the scripts back into composer after you make modifications, so you will need to manually import the file in the composer UI. All changes you make will be saved to "Documents/SBM Composer/Imports/". You can change this default folder in your settings.json file.

	* When opening a file, it will look at the file in composer and the local file and open the one that was most recently modified.

