var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

var appFile = './accio_settings/accio_app/static/src/javascripts/app.js';
var jsPath = './accio_settings/accio_app/static/src/javascripts/**/*.js';
var destPath = './accio_settings/accio_app/static/dist/';

gulp.task('default', function() {
  return gulp.src([appFile, jsPath])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destPath))
});


gulp.task('watch', ['default'], function () {
  gulp.watch(jsPath, ['default'])
});
