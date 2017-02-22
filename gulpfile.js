var path = require('path');
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync').create();

var dist = 'dist';
var src = 'src';

var js = [
    path.join(src, '/**/*.module.js'),
    path.join(src, '/**/*.js'),
];

gulp.task('serve', ['build', 'inject'], function () {
    var demoPage = "demo/index.html";
    var demoJs = "demo/script.js";

    var serverPath = "./";
    var startPath = demoPage;

    browserSync.init({
        server: serverPath,
        startPath: startPath
    });

    //watch css/js/html
    gulp.watch(demoPage)
        .on('change', browserSync.reload);
    gulp.watch(js.concat(demoJs), ['build'])
        .on('change', browserSync.reload);
});

gulp.task('inject', function(){
    var html = './demo/index.html';
    return gulp.src(html)
        .pipe(wiredep({}))
        .pipe(gulp.dest(file => file.base));
});

gulp.task('build', function () {
    return gulp.src(js)
        .pipe($.size({title: 'build start'}))
        .pipe($.babel())
        .pipe($.concat('angular-bootstrap-daterange-picker.js'))
        .pipe($.ngAnnotate({ add: true }))
        .pipe(gulp.dest(dist))
        .pipe($.rename('angular-bootstrap-daterange-picker.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(dist))
        .pipe($.size({title: 'build complete'}));
});