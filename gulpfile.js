var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./server/tsconfig.json');

gulp.task('typescript', function() {
  var tsResult = gulp
    .src('server/**/*.ts') // or tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('copy-server', function() {
  return gulp.src('bin/prod/**/*').pipe(gulp.dest('build/bin'));
});

gulp.task('copy-server-files', function() {
  return gulp.src('server/**/*.{js,jade}').pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('typescript', 'copy-server', 'copy-server-files'));
