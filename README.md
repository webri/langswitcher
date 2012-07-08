Langswitcher
================

JavaScript language switch that allows localization of text without reloading the page.
      
Steps to get started (in short):
--------------------------------

1. Import langswitcher.js
2. Add `langkey` data-attribute to all relevant DOM elements
3. Create xml files with content for each language
4. Call `setLanguage()` whenever text needs to be switched 
  
Steps to get started (in detail):
---------------------------------

1. Import langswitcher.js in your project

2. Add a language key to all elements that shall have localizable text  
e.g. `<p data-langkey="website.content"></p>` 

3. Add external XML files for each language, e.g. 'xml/languages/lang\_de.xml'. Default file path is 'xml/languages/lang\_XX.xml' in which 'XX' needs to be replaced by the language id you use later to switch between languages.

4. Construct XML out of the keys you have used in step 2, child nodes are defined through dot syntax. For example:
```
	<?xml version="1.0" encoding="UTF-8"?>
	<root>  
		<website>
			<content>Content</content>
		</website>
	</root>
```
5. Initialize langswitcher in the onload event of the body tag using
`LangSwitcher.getInstance().setLanguage('XX')`
(replace 'XX' with the id you have used to extend the filename in step 3).

6. Call the `setLanguage()` function whenever language shall be switched, passing it the id of the desired language. 
  
  
* * *  
  
  
**Compatibility:**  
Tested on Chrome, Firefox, IE8  
    
Copyright (c) 2012 Britta Weiland  
Version 0.2  
License: MIT (http://www.opensource.org/licenses/mit-license.html)