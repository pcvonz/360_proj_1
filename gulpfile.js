'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucks = require('gulp-nunjucks');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


//TODO:
//Implement the optimze functions from Zell's tutorial
//https://css-tricks.com/gulp-for-beginners/

gulp.task('assets', function() {
  gulp.src('source/assets/*')
                           .pipe(gulp.dest('public/assets'))
});

gulp.task('nunjucks', function () {
    gulp.src('templates/*.html')
        .pipe(nunjucks.compile({name: 'Test'}))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
            }))
});


//Function to optimize images (not really utilized)
gulp.task('images', function() {
    return gulp.src('source/images/**/*.+(png|jpg|gif)')
                                       .pipe(imagemin())
                                       .pipe(gulp.dest('public/images'))

});


gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './source/js/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./app.js'))
    .pipe(gulp.dest('./public/js/'));
})

//gulp.task('js', function() {
//    return gulp.src('source/js/app.js')
//               .pipe(browserify({
//                insertGlobals: true,
//                debug : !gulp.env.production
//               }))
//               .pipe(gulp.dest('public/js'))
//});

gulp.task('sass', function(){
    return gulp.src('source/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules/susy/sass', 'node_modules/breakpoint-sass/stylesheets']
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
            stream: true
            }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        browser: "firefox",
        server: {
            baseDir: 'public'
        }
    })
});

//watch the scss folder and rukn sass whenever
//a file changes
//We put browser sync in an array as the second argument
//that means that we want to run the browser sync task first
//and then watch for file changers
gulp.task('watch', ['assets', 'nunjucks', 'sass', 'images', 'js', 'browserSync'], function() {
    gulp.watch('source/scss/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch('templates/**/*.html', ['nunjucks']);
    gulp.watch('source/js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('source/images/**/*.+(png|jpg|gif|svg)', ['images', browserSync.reload]);
    gulp.watch('source/assets/*)', ['assets', browserSync.reload]);
});
