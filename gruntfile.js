/// <binding BeforeBuild='default' />
module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            fonts: {
                expand: true,
                cwd: 'app/fonts',
                src: '**',
                dest: 'dist/fonts/',
            }
        },

        concat: {
            // 2. Настройка для объединения файлов находится тут
			dist: {
				src: [
					'app/js/libs/jquery.min.js',
					'app/js/libs/**/*.js', // Все JS в папке libs
					'app/js/common.js'  // Конкретный файл
				],
				dest: 'dist/js/common.js',
			}
        },
		
		uglify: {
			build: {
				src: 'dist/js/common.js',
				dest: 'dist/js/common.min.js'
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'app/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'dist/img/'
				}]
			}
		},
		
		stylus: {
			compile: {
				options: {
					compress: false,
					'include css' : true,
					paths: ['app/stylus'],
					urlfunc: 'data-uri', // use data-uri('test.png') in our code to trigger Data URI embedding
				},
				files: {
					'dist/css/styles.css': ['app/stylus/styles.styl'] // compile and concat into single file
				}
			}
		},
		
		pug: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: true
					}
				},
				files: {
					"dist/index.html": ["app/index.pug"]
				}
			}
		},
		
		watch: {
			options: { livereload: true, },
			scripts: {
				files: ['app/js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			stylus: {
				files: ['app/stylus/**/*.*'],
				tasks: ['stylus:compile'],   // This needs to be "tasks" (not "task")
				options: {
					spawn: false,
				},
			},
			jade: {
				files: ['app/**/*.pug'],
				tasks: ['pug'],   // This needs to be "tasks" (not "task")
				options: {
					spawn: false,
				},
			},
			imagemin: {
				files: ['app/img/*.*'],
				tasks: ['imagemin'],   // This needs to be "tasks" (not "task")
				options: {
					spawn: false,
				},
			},
		}

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'imagemin', 'stylus', 'pug', 'watch']);

};