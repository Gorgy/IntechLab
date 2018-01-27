'use strict';

var path = {
    dist: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    app: { //Пути откуда брать исходники
        html: 'app/[^_]*.pug',
        js: 'app/js/[^_]*.js',
        css: 'app/stylus/[^_]*.styl',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        css: 'app/stylus/**/*.*',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*',
        livereload : 'dist/**/*'
    },
    clean: './dist', //директории которые могут очищаться
    outputDir: './dist' //исходная корневая директория для запуска минисервера
};

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pug: {
      // compile: {
      //   files: [{
      //     cwd: 'app',
      //     src: path.app.html,
      //     dest: path.dist.html,
      //     expand: true,
      //     ext: '.html',
      //   }]
      // },
      // // build: {
      // //   src: path.app.html,
      // //   dest: path.dist.html
      // // },
      // options: {
      //   pretty: true,
      // }
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "dist/*.html": ["app/*.jade"]
        }
      }
    },
    stylus: {
      compile: {
        files: [{
          cwd: 'source/css',
          src: path.app.css,
          dest: path.dist.css,
          expand: true,
          ext: '.css',
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/img',
          src: path.app.img,
          dest: path.dist.img,
        }]
      }
    },
    copy: {
      // css: {
      //   files: [{
      //     cwd: 'source/css',
      //     src: ['**/*.css'],
      //     dest: 'dest/css',
      //     expand: true,
      //   }]
      // },
      js: {
        files: [{
          cwd: 'source/js',
          src: path.app.js,
          dest: path.dist.js,
          expand: true,
        }]
      },
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: path.watch.livereload,
      },
      js: {
        files: path.watch.js,
        tasks: ['copy:js'],
      },
      // css: {
      //   files: ['source/css/**/*.css'],
      //   tasks: ['copy:css'],
      // },
      pug: {
        files: path.watch.html,
        tasks: ['pug'],
      },
      stylus: {
        files: path.watch.css,
        tasks: ['stylus'],
      },
      imagemin: {
        files: path.watch.img,
        tasks: ['imagemin'],
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist',
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', [
    'connect', 
    'copy', 
    'pug', 
    'stylus',
    'imagemin',
    'watch', 
  ]);
};