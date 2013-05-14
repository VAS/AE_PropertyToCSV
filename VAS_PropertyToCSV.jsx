/* 
  VAS_PropertyToCSV - v.1.0

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


	--------------------------------------------------------------------

	WHAT THE SCRIPT DOES:
		It writes a .csv file to disk for each property selected in the editor.
		It bakes the property for each frame of the composition.
		The file is in the format: <frame#,property_value1,property_value2,...,property_valueN>
		The file name is in the format: <layer.name_property.name.csv>

	USAGE:
	- Just select the properties that you want to bake in the timeline. You can select how many properties you wish, but you shall not select more than one layer.
	- From the File->Script menu select the script file.
	- Choose the folder where you want to save the baked data from the dialog
	- The Info panel will show the path of the selected folder, one per property
	- You're done!

	CAVEAT:
	- If a file with the same name already exists in the dest. folder, the script will overwrite it without asking.

	TODO:
	- Let the user specify the separation character (e.g. TAB)
	- Manage the exceptions instead of using if, else
	- Let the user specify a frame range, rather than baking the entire comp
	- Build a basic UI
	- Tidy up code
	- Ask what to do if the file already exists
*/

// Let the user select the folder where the script saves the baked files
var outFolder = Folder.selectDialog("Select a folder...");

// If the user didn't press Cancel..
if (outFolder != null) {

	var thisComp = app.project.activeItem;
	// Selected layers
	var sel = thisComp.selectedLayers;
	// Check if only onje layer is selected
	if(sel.length == 1) {

		selProp = sel[0].selectedProperties;
		if (selProp.length >= 1 ) {

			 // Cycle through all the selected properties
			for(var i = 0; i < selProp.length; i++) {
				// Invoke the baking function on the selected properties
				bakeProperty(selProp[i].parentProperty.name, selProp[i].name, thisComp, sel[0]);
			}
			alert("Baking completed successfully!", "VAS_PropertyToCSV")
		} else
			alert("You must select at least one property!")  
	} else
		alert("You must select only one layer!")
}


/**
 * PARAMETERS EXPLANATION:
 * pProp = the parent property (e.g. "Transform")
 * prop = the actual property to bake (e.g. "Position")
 * thiComp = the composition on which we want to operate
 * sel_Lyr = the selected layer
 */
function bakeProperty(pProp, prop, thisComp, sel_Lyr){
	// Create a new file and build up the name of the file
	var outFile = new File(outFolder.absoluteURI + "/" + sel_Lyr.name + "_" + prop + ".csv");
	
	// Open the file for writing
	outFile.open("w")

	// Cycle through every frame of the comp
	for (var i = 0; i < (thisComp.duration/thisComp.frameDuration); i++ ) {
		// Select the proerty to bake based on the function's parameters
		var selProp = sel_Lyr(pProp)(prop);
		// Write the number of the current frame
		outFile.write( i );

		// Sample the value of the property at the current frame
		var wProp = selProp.valueAtTime( (i*thisComp.frameDuration), false)
		
		// If the value is an array (e.g. the position [x,y,z]), write every value of the array
		if(wProp instanceof Array) {
			for (var j = 0; j < wProp.length; j++){
				outFile.write( "," + wProp[j]);
			}
		} else { // otherwise write directly the value (e.g. rotation)
			outFile.write( "," + wProp );
		}
		outFile.write("\n");
	}
	outFile.close();
	writeLn("File written in " + outFolder.absoluteURI);
}
