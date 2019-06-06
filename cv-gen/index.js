const execSync = require('child_process').execSync
const readFileSync = require('fs').readFileSync

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    execSync( [
        "pandoc",
	    "-f", "gfm",
	    "-i", "index.md",
	    "-t", "html5",
	    "-s", "--self-contained",
	    "-M", "title='Petr Motejlek, Curriculum Vitae'",
	    "-o", "index.html"
	].join(" ") );

    context.res = {
        body: readFileSync('index.html').toString()
    }
};
