var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

function sassify() {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ouputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('../dist/css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../src/css'))
}

gulp.task('watchSass', function(){
    sassify();
    var watcher = gulp.watch('scss/**/*.scss', sassify);
    
    watcher.on('change', function(event){
      console.log('File ' + event.path + ' was ' + event.type);
    });

    watcher.on('unlink', function(path) {
      console.log('File ' + path + ' was removed');
    });
})