var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    appFile = './accio_settings/accio_app/static/src/javascripts/app.js',
    jsPath = './accio_settings/accio_app/static/src/javascripts/**/*.js',
    destPath = './accio_settings/accio_app/static/dist/',
    sassSrc = './accio_settings/accio_app/static/src/sass/*.scss',
    cssPath = './accio_settings/accio_app/static/dist/css';


gulp.task('default', function() {
  return gulp.src([appFile, jsPath])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destPath))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(destPath));
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
