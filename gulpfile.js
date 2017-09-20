const gulp = require('gulp');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

var jsFiles = 'build/scripts/*.js',
    jsDest = 'build/assets';

gulp.task('build:clean', () =>
  gulp.src('build', { read: false })
    .pipe(clean())
);

gulp.task('build:copy', ['build:clean'], () =>
  gulp.src('src/**/*')
    .pipe(copy('build', { prefix: 1 }))
);

gulp.task('build:scripts', ['build:copy'], () =>
  gulp.src(jsFiles)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
);

gulp.task('build:remove-scripts-dir', ['build:scripts'], () =>
  gulp.src('build/scripts', { read: false })
    .pipe(clean())
);

gulp.task('default', [
  'build:scripts',
])
