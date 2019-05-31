const gulp = require('gulp');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const packageInfo = require('./package.json');

var cssFiles = 'build/styles/*.scss',
    cssDest = 'build/assets',
    jsFiles = 'build/scripts/*.js',
    jsDest = 'build/assets';

gulp.task('build:clean', () =>
  gulp.src(['build', '*.zip'], { read: false })
    .pipe(clean())
);

gulp.task('build:copy', ['build:clean'], () =>
  gulp.src('src/**/*', { dot: true })
    .pipe(copy('build', { prefix: 1 }))
);

gulp.task('build:scripts', ['build:copy'], () =>
  gulp.src(jsFiles)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
);

gulp.task('build:sass', ['build:scripts'], () =>
  gulp.src(cssFiles)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest))
);

gulp.task('build:package', ['build:sass'], () =>
  gulp.src(['build/scripts', 'build/styles'], { read: false })
    .pipe(clean())
);

gulp.task('build:zip',['build:package'], () =>
  gulp.src('build/**/*', { dot: true })
    .pipe(zip(`${packageInfo.name || 'build'}.${packageInfo.version}.zip`))
    .pipe(gulp.dest(__dirname))
)

gulp.task('default', ['build:zip'])
