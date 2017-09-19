const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

var jsFiles = 'build/scripts/*.js',
    jsDest = 'build/assets';

gulp.task('build:scripts', ['build:copy'], () =>
  gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
);

gulp.task('build:copy', ['build:clean'], () =>
  gulp.src('src/**/*')
    .pipe(copy('build', { prefix: 1 }));
);

gulp.task('build:remove-scripts-dir', ['build:copy'], () =>
  gulp.src('build/scripts', { read: false })
    .pipe(clean());
);

gulp.task('build:clean', () =>
  gulp.src('build', { read: false })
    .pipe(clean());
);

gulp.task('default', [
  'build:scripts',
]);
