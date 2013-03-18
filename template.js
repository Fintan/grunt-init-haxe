/*
 * grunt-init-haxe
 *
 * Copyright (c) 2013 Fintan Boyle
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Haxe project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Creates a Haxe project template';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({type: 'haxe'}, [
	    
		// Prompt for these values.
	    init.prompt('name', 'Choose a main class name - first character needs to be upper case'),
	    init.prompt('title', 'A Haxe Project.'),
	    init.prompt('description', 'Simple description.'),
	    init.prompt('version'),
	    init.prompt('repository'),
	    init.prompt('homepage'),
	    init.prompt('bugs'),
	    init.prompt('licenses'),
	    init.prompt('author_name'),
	    init.prompt('author_email'),
	    init.prompt('author_url')
		
	  ], function(err, props) {
	    props.keywords = ['haxe'];
		
		//node_version: '>= 0.8.0',
	    props.devDependencies = {
			'grunt': "~0.4.0",
			'grunt-contrib-jshint': '~0.3.0',
		    'grunt-contrib-concat': '~0.1.3',
		    'grunt-contrib-copy': '~0.4.0',
	        'grunt-contrib-uglify': '~0.1.1',
	        'grunt-contrib-watch': '~0.2.0',
	        'grunt-contrib-clean': '~0.4.0',
			'grunt-haxe': '~0.1.7'
	    };
	    /*props.peerDependencies = {
	      'grunt': "~0.4.0"
	    };*/

	    // Files to copy (and process).
	    var files = init.filesToCopy(props);

	    // Add properly-named license files.
	    init.addLicenseFiles(files, props.licenses);

	    // Actually copy (and process) files.
	    init.copyAndProcess(files, props);

	    // Generate package.json file.
	    init.writePackageJSON('package.json', props);

	    // All done!
	    done();

  	});

};
