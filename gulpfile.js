const gulp = require('gulp');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

var jsFiles = 'build/scripts/*.js',
    jsDest = 'build/assets',
    baseCSSFiles = 'build/styles/_base*.scss',
    pageCSSFiles = 'build/styles/_page_*.scss',
    sectionCSSFiles = 'build/styles/_section_*.scss',
    cssDest = 'build/styles';

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

gulp.task('build:stylesheets:base', ['build:copy'], () =>
  gulp.src(baseCSSFiles)
    .pipe(concat('base.scss'))
    .pipe(gulp.dest(cssDest))
);

gulp.task('build:clean-base-stylesheets', ['build:stylesheets:base'], () =>
  gulp.src('build/styles/_base*.scss', { read: false })
    .pipe(clean())
);

gulp.task('build:stylesheets:pages', ['build:copy'], () =>
  gulp.src(pageCSSFiles)
    .pipe(concat('pages.scss'))
    .pipe(gulp.dest(cssDest))
);

gulp.task('build:clean-page-stylesheets', ['build:stylesheets:pages'], () =>
  gulp.src('build/styles/_page_*.scss', { read: false })
    .pipe(clean())
);

gulp.task('build:stylesheets:sections', ['build:copy'], () =>
  gulp.src(sectionCSSFiles)
    .pipe(concat('sections.scss'))
    .pipe(gulp.dest(cssDest))
);

gulp.task('build:clean-section-stylesheets', ['build:stylesheets:sections'], () =>
  gulp.src('build/styles/_section_*.scss', { read: false })
    .pipe(clean())
);

gulp.task('build:stylesheets', ['build:clean-base-stylesheets', 'build:clean-page-stylesheets', 'build:clean-section-stylesheets'])

gulp.task('build:package', ['build:scripts', 'build:stylesheets'], () =>
  gulp.src('build/scripts', { read: false })
    .pipe(clean())
);

gulp.task('default', [
  'build:package'
])
