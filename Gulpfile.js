var packageInfo = require('./package.json');
var taskList = [{name:'default'},{name:'delete'},{name:'build'},{name:'copy'},{name:'minify'}];

var gulpTalk2me = require('gulp-talk2me');
var talk2me = new gulpTalk2me(packageInfo,taskList);
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var series = require('stream-series');
var angularFilesort = require('gulp-angular-filesort');

console.log(talk2me.greeting);

gulp.task('default',function(callback){
   runSequence('build',callback);
});

gulp.task('delete',function(callback){
   del('dist/**/*', callback());
});

gulp.task('build',function(callback){
  runSequence('delete',['copy','minify'],callback);
});

gulp.task('copy',function(){
  return series(genTemplateStream(),gulp.src(['src/**/*.js','!src/**/*.spec.js']))
  .pipe(sourcemaps.init())
  .pipe(angularFilesort())
  .pipe(concat('key-value-table-directive.js', {newLine: ';\n'}))
  .pipe(ngAnnotate({
      add: true
    }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'));
});

gulp.task('minify',function(){ 
  return series(genTemplateStream(),gulp.src(['src/**/*.js','!src/**/*.spec.js']))
    .pipe(sourcemaps.init())
    .pipe(angularFilesort())
    .pipe(concat('key-value-table-directive.js', {newLine: ';'}))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

function genTemplateStream () {
  return gulp.src(['src/**/*.view.html'])
  .pipe(templateCache({standalone:true,module:'key-value-table.template'}));
}