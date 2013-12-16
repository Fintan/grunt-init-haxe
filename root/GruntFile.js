/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! Project: <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* http://PROJECT_WEBSITE/\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> ' + 'YOUR_NAME; Licensed MIT */'
		},
		jshint: {
			files: ['GruntFile.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		concat: {
			'<%= pkg.name %>': {
				src: ['resources/js/*.js', 'dist/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		min: {
			'<%= pkg.name %>': {
				src: ['<banner:meta.banner>', '<config:concat.<%= pkg.name %>.dest>'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {},
		clean: ["dist/*"],
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: 'resources/html/',
					src: ['**'],
					dest: 'dist/'
				}]
			}
		},
		watch: {
			files: 'src/**/*.hx',
			tasks: ['haxe:project']
		},
		haxe: {
			project: {
				hxml: 'build.hxml'
			}
		}
	});

	grunt.loadNpmTasks('grunt-haxe');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'clean', 'copy:dist', 'haxe:project', 'concat']);

};
