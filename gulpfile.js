
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
// const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// var gzip = require('gulp-gzip');
// const rev = require('gulp-rev');
// const foo = require('gulp-empty');
const mincss = require('gulp-clean-css');
const changed = require('gulp-changed');

gulp.task('css-main', function () {
    const dest = './public/assets/css';
    return gulp.src('./assets/css/main.scss')
        .pipe(sass())
        // .pipe(concat({
        // 	path: options.name,
        // 	cwd: ''
        // }))
        // .pipe(changed(options.dest))
        .pipe(gulp.dest(dest))
        .pipe(mincss())
        .pipe(rename({
            extname: '.min.css'
        }))
        // .pipe(changed(options.dest))
        // .pipe(gulp.dest(dest))
        // .pipe(rev())
        // .pipe(changed(options.dest))
        // .pipe(gulp.dest(dest))
        // .pipe(rev.manifest({
        //     merge: true
        // }))
        // .pipe(changed(options.dest))
        .pipe(gulp.dest(dest));
});

gulp.task('css', ['css-main']);

gulp.task('default', ['css']);
