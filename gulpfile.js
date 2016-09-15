var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');


var appFile = './accio_settings/accio_app/static/src/javascripts/app.js';
var jsPath = './accio_settings/accio_app/static/src/javascripts/**/*.js';
var destPath = './accio_settings/accio_app/static/dist/';
var sassSrc = './accio_settings/accio_app/static/src/sass/*.scss';
var cssPath = './accio_settings/accio_app/static/dist/css';

gulp.task('default', function() {
  return gulp.src([appFile, jsPath])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destPath))
});

gulp.task('sass', function () {
  return gulp.src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssPath));
});

gulp.task('lint', function() {
  return gulp.src([jsPath])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {})
});

gulp.task('watch', function () {
  gulp.watch(jsPath, ['default'])
  gulp.watch(jsPath, ['lint']);
  gulp.watch(sassSrc, ['sass']);
});
