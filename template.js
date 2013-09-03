/*
 * grunt-init-yxtpl
 * https://fireyy.com/
 */

'use strict';

// Basic template description.
exports.description = 'Create a Yixun Event Project, including QUnit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Creating a Default Yixun Event Project...';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Now you can edit files in project';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'New Yixun Event Project'),
    init.prompt('repository'),
    init.prompt('version'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email')
  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      npm_test: 'grunt qunit',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0',
      devDependencies: {
        'grunt-contrib-jshint': '~0.1.1',
        'grunt-contrib-qunit': '~0.1.1',
        'grunt-contrib-concat': '~0.1.2',
        'grunt-contrib-uglify': '~0.1.1',
        'grunt-contrib-watch': '~0.2.0',
        'grunt-contrib-clean': '~0.4.0',
      },
    });

    // All done!
    done();
  });

};
