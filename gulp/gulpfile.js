var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

function sassify() {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ouputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('../dist/css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../src/css'))
}

var concatJS = function() {
  return gulp.src('js/**/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(sourcemaps.init())
    .pipe(concat('kinder-painting.min.js'))
    .pipe(minify())
    .pipe(gulp.dest('../dist/js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../src/js'));
}

gulp.task('watchSass', function(){
    sassify();
    var watcher = gulp.watch('scss/**/*.scss', sassify);
    
    watcher.on('change', function(file){
      console.log('File ' + file + ' was changed');
    });

    watcher.on('unlink', function(path) {
      console.log('File ' + path + ' was removed');
    });
});

gulp.task('watchJS', function(){
  concatJS();

  var watcher = gulp.watch('js/**/*.js', concatJS);
  watcher.on('change', function(event){
    console.log('File ' + event + ' was changed');
  });

  watcher.on('unlink', function(path) {
    console.log('File ' + path + ' was removed');
  });
});