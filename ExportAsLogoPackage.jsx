var doc = app.activeDocument;;//Gets the active document
var fleName = doc.name.slice(0, 9)//Get the file code number not the full name;
var numArtboards = doc.artboards.length;//returns the number of artboards in the document
var filePath = (app.activeDocument.fullName.parent.fsName).toString().replace(/\\/g, '/');

$.writeln("fleName= ",fleName)
$.writeln("numArtboards= ",numArtboards)
$.writeln("filePath= ",filePath);

//ExportAsPNG();
//ExportAsJPG();
//SaveAsEPS();
SaveAsPDF();

function ExportAsPNG() {
  var options = new ExportOptionsPNG24();

  for (var i = 0; i < numArtboards; i++ ) {
    doc.artboards.setActiveArtboardIndex( i ); 

    options.artBoardClipping = true;  
    options.matte = false;  
    options.horizontalScale = 100;
    options.verticalScale = 100;  
    options.transparency = true;  

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
        var destFile = new File(filePath + "/PNG/" + fleName + " " +  artboardName + ".png");
        $.writeln("destFile= ",destFile);
          doc.exportFile(destFile,ExportType.PNG24,options);
    }
}

function ExportAsJPG() {
  var options = new ExportOptionsJPEG();

  for (var i = 0; i < numArtboards; i++ ) {
    doc.artboards.setActiveArtboardIndex( i ); 

    options.artBoardClipping = true;  
    options.matte = false;  
    options.horizontalScale = 100;
    options.verticalScale = 100;  
    options.qualitySetting = 100;

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
        var destFile = new File(filePath + "/JPG/" + fleName + " " +  artboardName + ".jpg");
        $.writeln("destFile= ",destFile);
          doc.exportFile(destFile,ExportType.JPEG,options);
    }
}

function SaveAsEPS() {
  var options = new EPSSaveOptions();
  
  options.embedAllFonts = true;
  options.saveMultipleArtboards = true;
  options.includeDocumentThumbnails = true;
  options.generateThumbnails = true;

  var destFile = new File(filePath + "/EPS/" + fleName + " " + ".eps");
  doc.saveAs(destFile, options);
}

function SaveOnePDF() {
  
}

function SaveAsPDF() {
  if(app.documents.length > 0) {
    for (var i = 0; i < numArtboards; i++ ) {
      var saveOpts = new PDFSaveOptions();
      saveOpts.compatibility = PDFCompatibility.ACROBAT5;
      saveOpts.genereateThumbnails = true;
      saveOpts.preserveEditability = true;

      doc.artboards.setActiveArtboardIndex( i );
      var artboardName = doc.artboards[i].name;
      saveOpts.artboardRange = (i + 1).toString();
      var destFile = new File(filePath + "/PDF/" + fleName + " " + artboardName + ".pdf");
      var saveName = new File (destFile);
      doc.saveAs(saveName, saveOpts);
    }
  }
  
  //var options = new PDFSaveOptions();
  //options.generateThumbnails = true;

  //for (var i = 0; i < numArtboards; i++ ) {
    //doc.artboards.setActiveArtboardIndex( i ); 
    //var artboardName = doc.artboards[i].name;
    //options.artboardRange = "5";
    //var destFile = new File(filePath + "/PDF/" + fleName + " " +  artboardName + ".pdf");
    //doc.saveAs(destFile, options);

  //}
}