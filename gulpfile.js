 // this file contains task runners for dev ops
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

gulp.task('sass', function () {
  // transpile sass to css
  return gulp.src('./client/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/src/css/transpiled'));
});

gulp.task('concat-css', function () {
  // concat into 1 css file
  return gulp.src('./client/src/css/transpiled/**/*.css')
    .pipe(concatCss("styles.css"))
    .pipe(gulp.dest('./client/src/css/'));
});

gulp.task('sass:watch', function () {
  // transpile sass to css
  var task1 = gulp.watch('./client/src/sass/**/*.scss', ['sass']);
  var task2 = gulp.watch('./client/src/css/transpiled/**/*.css', ['concat-css']);

  return [task1, task2];
});