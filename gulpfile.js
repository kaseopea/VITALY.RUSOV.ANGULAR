'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({

        // nodemon our expressjs server
        script: 'app.js',

        ignore: [
            '.gitignore',
            'gitignore',
            'app/**',
            'data/**',
            'node_modules/**'
        ],

        // watch core server file(s) that require server restart on change
        watch: ['server.js', '/server/**/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {

    browserSync({
        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:9000',
        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,
        notify: false,
        browser: 'google chrome'
    });
});

// Sass compile
gulp.task('sass', function () {
    return gulp.src('app/src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('app/src/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/**/*.js',   ['bs-reload']);
    gulp.watch('app/**/*.html', ['bs-reload']);
});