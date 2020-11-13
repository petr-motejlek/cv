const execSync = require('child_process').execSync
const readFileSync = require('fs').readFileSync
const azureStor = require('azure-storage')
const azureWebJobsStorage = process.env['AzureWebJobsStorage']

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    execSync( [
        "pandoc",
	    "-f", "gfm",
	    "-i", "index.md",
	    "-t", "html5",
	    "-s", "--self-contained",
	    "-M", "title='Petr Motejlek, Curriculum Vitae'",
	    "--css", "github.css",
	    "-o", "index.html"
	].join(" ") );
    context.log("Generated the HTML file from Markdown.");

    blobSvc = azureStor.createBlobService(azureWebJobsStorage);
    context.log("Connected to Azure Storage.");

    blobSvc.createBlockBlobFromLocalFile(
        '$web',
	'index.html',
	'index.html',
	function(error, result, response) {
	    if(!error) {
	        context.res = {
                    body: readFileSync('index.html').toString()
                }

		context.done();
	    } else {
	        context.res = {
		    status: 500,
		    body: "Failed uploading the blob."
		};
		context.done();
	    }
	}
    );

    execSync( [
        "pandoc",
	    "-f", "gfm",
	    "-i", "index.md",
	    "-t", "pdf",
	    "-M", "title='Petr Motejlek, Curriculum Vitae'",
	    "-o", "cv.pdf"
	].join(" ") );
    context.log("Generated the PDF file from Markdown.");

    blobSvc = azureStor.createBlobService(azureWebJobsStorage);
    context.log("Connected to Azure Storage.");

    blobSvc.createBlockBlobFromLocalFile(
        '$web',
	'cv.pdf',
	'cv.pdf',
	function(error, result, response) {
	    if(!error) {
	        context.res = {
                    body: readFileSync('cv.pdf').toString()
                }

		context.done();
	    } else {
	        context.res = {
		    status: 500,
		    body: "Failed uploading the blob."
		};
		context.done();
	    }
	}
    );

};
