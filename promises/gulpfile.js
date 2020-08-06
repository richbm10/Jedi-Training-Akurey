'use strict'
var gulp = require('gulp');
const { src, series, parallel, dest, watch } = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
const postcss = require('gulp-postcss');

function stylesTask() {
    const processorsArray = [
        require('autoprefixer')({ grid: 'autoplace' })
    ];
    return src('src/app/styles/pages/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({
            "uglyComments": true,
        }))
        .pipe(concat('main.css'))
        .pipe(postcss(processorsArray))
        .pipe(gulp.dest('dist'));
}

function htmlTask() {
    return src('src/app/pages/*.html')
        .pipe(gulp.dest('dist'));
}

function javascriptTask() {
    return src('src/app/js/*.js')
        .pipe(gulp.dest('dist'));
}

function assetsTask() {
    return src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
}

function watchTask() {
    watch(['*.html', '*.scss'], { interval: 1000 }, series(stylesTask, assetsTask, htmlTask, javascriptTask));
}

exports.default = series(stylesTask, assetsTask, htmlTask, javascriptTask, watchTask);