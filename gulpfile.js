'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var vfs = require('vinyl-fs');
var changed = require('gulp-changed');

var BROWSER_SYNC_RELOAD_DELAY = 500;
var options = {
	src: {
		root: '',
		rootApp: 'app/',
		assets: 'app/assets/',
		css: 'app/assets/css/',
		fonts: 'app/assets/fonts/',
		icons: 'app/assets/icons/',
		images: 'app/assets/images/',
		lang: 'app/lang/',
		data: 'data/',
		server: 'server/',
		node_modules: 'node_modules/'
	},
	dist: {
		root: 'dist/',
		rootApp: 'dist/app/',
		assets: 'dist/app/assets/',
		css: 'dist/app/assets/css/',
		fonts: 'dist/app/assets/fonts/',
		icons: 'dist/app/assets/icons/',
		images: 'dist/app/assets/images/',
		lang: 'dist/app/lang/',
		data: 'dist/data/',
		server: 'dist/server/',
		node_modules: 'dist/node_modules/'
	}

};

// NODEMON TASK
// =====================================================================================================================
gulp.task('nodemon', function (cb) {
	var called = false;

	return nodemon({
		script: 'dist/app.js',
		ignore: [
			'app/**/*',
			'dist/**/*',
			'data/**/*',
			'node_modules/**/*',
			'.gitignore'
		],
		watch: ['app.js', 'server/**/*.js']
	})
		.on('start', function onStart() {
			// ensure start only got called once
			if (!called) {
				cb();
			}
			called = true;
		})
		.on('restart', function onRestart() {
			setTimeout(function reload() {
				browserSync.reload({
					stream: false
				});
			}, BROWSER_SYNC_RELOAD_DELAY);
		});
});

// BROWSER SYNC
// =====================================================================================================================
gulp.task('browser-sync', ['nodemon'], function () {
	browserSync({
		proxy: 'http://localhost:9000',
		port: 4000,
		notify: false,
		browser: 'google chrome',
		reloadDelay: 500
	});
});
gulp.task('bs-reload', function () {
	browserSync.reload();
});

// SASS
// =====================================================================================================================
gulp.task('ASSETS_styles', function () {
	var sassFiles = [
		'app/assets/css/**/*.scss',
		'app/actionButtonComponent/scss/*.scss'
	];
	return gulp.src(sassFiles)
		.pipe(sass())
		.pipe(autoprefixer(['last 2 versions', '> 1%'], {cascade: true}))
		.pipe(gulp.dest(options.dist.css))
		.pipe(browserSync.stream());
});

// Assets, Langs & Data
// =====================================================================================================================
gulp.task('ASSETS_images', function () {
	return gulp.src(options.src.images + '**/*')
		.pipe(changed(options.dist.images))
		.pipe(gulp.dest(options.dist.images))
		.pipe(browserSync.stream());
});
gulp.task('ASSETS_icons', function () {
	return gulp.src(options.src.icons + '**/*')
		.pipe(changed(options.dist.icons))
		.pipe(gulp.dest(options.dist.icons))
		.pipe(browserSync.stream());
});
gulp.task('ASSETS_fonts', function () {
	return gulp.src(options.src.fonts + '**/*')
		.pipe(changed(options.dist.fonts))
		.pipe(gulp.dest(options.dist.fonts))
		.pipe(browserSync.stream());
});
gulp.task('COMMON_lang', function () {
	return gulp.src(options.src.lang + '**/*')
		.pipe(changed(options.dist.lang))
		.pipe(gulp.dest(options.dist.lang))
		.pipe(browserSync.stream());
});
gulp.task('COMMON_data', function () {
	return gulp.src(options.src.data + '**/*')
		.pipe(changed(options.dist.data))
		.pipe(gulp.dest(options.dist.data))
		.pipe(browserSync.stream());
});


// HTML Templates
// =====================================================================================================================
gulp.task('COMMON_templates', function () {
	var templates = [
		options.src.rootApp + '**/*.html'
	];
	return gulp.src(templates)
		.pipe(changed(options.dist.rootApp))
		.pipe(gulp.dest(options.dist.rootApp));
});

// BABEL
// =====================================================================================================================
gulp.task('COMMON_js', function () {
	return gulp.src(options.src.rootApp + '**/*.js')
		.pipe(changed(options.dist.rootApp))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(options.dist.rootApp));
});

// SYM Link For node_modules
// =====================================================================================================================
gulp.task('COMMON_mods', function () {
	return vfs.src(options.src.node_modules)
		.pipe(vfs.symlink(options.dist.node_modules));
});

// SERVER
// =====================================================================================================================
gulp.task('COMMON_server', function () {
	var serverFiles = [
		options.src.server + '**/*.js'
	];
	return gulp.src(serverFiles)
		.pipe(changed(options.dist.server))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(options.dist.server));
});
gulp.task('COMMON_server_app', function () {
	var serverFiles = [
		options.src.root + 'app.js'
	];
	return gulp.src(serverFiles)
		.pipe(changed(options.dist.root))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(options.dist.root));
});
gulp.task('COMMON_index', function () {
	var index = [
		options.src.root + 'index.html'
	];
	return gulp.src(index)
		.pipe(changed(options.dist.root))
		.pipe(gulp.dest(options.dist.root));
});

// DEFAULT
// =====================================================================================================================
gulp.task('start', ['build', 'browser-sync'], function () {

	//watchers

	//Assets
	gulp.watch(options.src.images + '**/*', ['ASSETS_images']);
	gulp.watch(options.src.icons + '**/*',  ['ASSETS_icons']);
	gulp.watch(options.src.fonts + '**/*',  ['ASSETS_fonts']);
	gulp.watch(options.src.lang + '**/*',  ['COMMON_lang']);
	gulp.watch(options.src.rootApp + '**/*.scss', ['ASSETS_styles']);

	// Scripts & Templates & Index
	gulp.watch(options.src.rootApp + '**/*.js', ['COMMON_js', 'bs-reload']);
	gulp.watch(options.src.rootApp + '**/*.html', ['COMMON_templates', 'bs-reload']);
	gulp.watch(options.src.root + 'index.html', ['COMMON_index', 'bs-reload']);

	//server
	gulp.watch(options.src.server + '**/*.js', ['COMMON_server', 'bs-reload']);
	gulp.watch(options.src.root + 'app.js', ['COMMON_server_app', 'bs-reload']);
});

// GULP BUILD
// =====================================================================================================================
var buildPreTasks = [
	'ASSETS_styles',
	'ASSETS_images', 'ASSETS_icons', 'ASSETS_fonts',
	'COMMON_templates', 'COMMON_js',
	'COMMON_lang', 'COMMON_data', 'COMMON_mods',
	'COMMON_server', 'COMMON_server_app',
	'COMMON_index'
];
gulp.task('build', buildPreTasks, function () {

});


// E2E Tests
// =====================================================================================================================

gulp.task('webdriver_update', function (cb) { return require('gulp-protractor').webdriver_update(cb)});
gulp.task('e2e', ['webdriver_update'], function (cb) {
	var protractor = require('gulp-protractor').protractor;
	gulp.src(['./tests/e2e/*.spec.js']).pipe(protractor({configFile: './tests/protractor.config.js'})).on('end', cb);
});

gulp.task('run-e2e', function (done) {
	var server = require("./dist/app.js");
	var exec = require('child_process').exec;
	var child = exec('gulp e2e', function (err, stdErr, stdOut) {
		server.http.close();
		done();
	});
	child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);
});
