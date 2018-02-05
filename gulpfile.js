var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function() {
  return gulp
    .src('bin/**/*')
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: 'output.js'
      })
    )
    .pipe(gulp.dest('built/local'));
});
