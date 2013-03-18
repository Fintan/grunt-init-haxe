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
		jshint: {
			options: {
    			curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true,
				es5: true
			},
			globals: {}
		},
		concat: {
			<%= pkg.name %>: {
				src: ['resources/js/*.js', 'dist/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		min: {
			<%= pkg.name %>: {
				src: ['<banner:meta.banner>', '<config:concat.<%= pkg.name %>.dest>'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {},
		clean: ["dist/*"],
		copy: {
			dist: {
				files: [
					{expand: true, cwd: 'resources/html/', src: ['**'], dest: 'dist/'} // makes all src relative to cwd
				]
			}
		},
		watch:{
			files: 'src/**/*.hx',
			tasks: ['hx']
		},
		haxe: {
			projects: {
				main:'',//gets replaced in output
				classpath: ['src', 'libs'],
				//libs:[],
				//misc:["--js-modern"],
				output: {
					<%= pkg.name %>: {
						main: '<%= pkg.name %>',
						output: 'dist/<%= pkg.name %>.js'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-haxe');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['jshint', 'clean', 'copy:dist', 'haxe:projects', 'concat']);

};