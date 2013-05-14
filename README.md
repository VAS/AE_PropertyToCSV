AE_PropertyToCSV
================

Export any AfterEffects Layer animated property to a CSV file.

##What the script does:
1. It writes a .csv file to disk for each property selected in the editor.
2. It bakes the property for each frame of the composition.
3. The file is in the format: <frame#,property_value1,property_value2,...,property_valueN>
4. The file name is in the format: <layer.name_property.name.csv>

##Usage:
- Just select the properties that you want to bake in the timeline. You can select how many properties you wish, but you shall not select more than one layer.
- From the File->Script menu select the script file.
- Choose the folder where you want to save the baked data from the dialog
- The Info panel will show the path of the selected folder, one per property
- You're done!

##Caveat:
- If a file with the same name already exists in the dest. folder, the script will overwrite it without asking.

##Todo:
- Let the user specify the separation character (e.g. TAB)
- Manage the exceptions instead of using if, else
- Let the user specify a frame range, rather than baking the entire comp
- Build a basic UI
- Tidy up code
- Ask what to do if the file already exists

##License

  Copyright (c) 2013 - Enrico Targetti (enrico@vas.it)
						 VAS (www.vas.it)

	MIT License

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
