var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
    //babel-preset-es2015

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('build-css', function() {
	gulp.src('./css/*')
	    .pipe(sourcemaps.init())			//Remember original state
        .pipe(sass())						//Pass to SASS
        .pipe(cachebust.resources())		//Clear the cache
        .pipe(concat('styles.css'))			//Concat all output of those files into styles.css
        .pipe(sourcemaps.write('./maps'))	//Write out original files. THIS IS FOR DEBUGGING
        .pipe(gulp.dest('./dist'));			//Write everything out into a file called dist
})

gulp.task('clean', function(cb) {
	del([
		'dist'
		], cb);
})

gulp.task('build-js', function() {
   return gulp.src('js/**/*.js')               
      .pipe(sourcemaps.init())					//Keep source files seperate in debugger
      .pipe(print())                        	//Copy into dist
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(sourcemaps.write('./')) 
      .pipe(gulp.dest('./dist/js')); 
});


gulp.task('build', ['build-css','build-js'], function() {
	return gulp.src('index.html')
		.pipe(cachebust.references())
		.pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./views/*.html', './css/*.*css', './js/**/*.js'], ['build']);
});