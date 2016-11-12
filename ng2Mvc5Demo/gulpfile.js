var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var del = require('del');
var jsMinify = require('gulp-uglify');
var SystemBuilder = require('systemjs-builder');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var inlineNg2Template = require('gulp-inline-ng2-template');

var destPath = './dist/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task("scripts:jb", () => {
    gulp.src([
            'jquery/dist/jquery.js',
            'bootstrap/dist/js/bootstrap.js'
    ], {
        cwd: "node_modules/**"
    })
    .pipe(concat('jb.js'))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("scripts:startup", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'zone.js/dist/zone.js',
            'reflect-metadata/reflect.js',
            'systemjs/dist/system.src.js'
    ], {
        cwd: "node_modules/**"
    })
    .pipe(concat('startup.js'))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task('scripts:bundle', () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('systemjs.config.js')
        .then(() => builder.buildStatic('app', 'dist/js/bundle.js'))
});

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('scripts:app', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "src/**/*.ts"
    ])
        .pipe(sourcemaps.init())
        .pipe(inlineNg2Template({ base: 'src' }))
        .pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    gulp.src([
            "src/**/*.html"
    ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['watch.ts', 'watch.html']);

gulp.task('watch.ts', [], function () {
    return gulp.watch('src/**/*.ts', ['scripts:app']);
});

gulp.task('watch.html', [], function () {
    return gulp.watch('src/**/*.html', ['scripts:app']);
});

gulp.task('minify', () => {
    var js = gulp.src('dist/js/bundle.js')
        .pipe(jsMinify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('scripts', ['scripts:jb', 'scripts:startup', "scripts:bundle"], function () {
    gulp.start('minify');
});


gulp.task('run', ['scripts:app'], function () {
    gulp.start('scripts');
});

gulp.task('default', ['clean'], function () {
    gulp.start('run');
});