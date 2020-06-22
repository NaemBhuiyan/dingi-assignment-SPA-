const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
gulp.task('scss', () =>
  gulp
    .src('src/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
);

/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
gulp.task('watch', () => {
  gulp.watch('src/assets/scss/**/*.scss', gulp.parallel('scss'));
});

gulp.task('default', gulp.parallel('scss', 'watch'));
