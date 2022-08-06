const gulp = require('gulp')
const argv = require('minimist')(process.argv.slice(2))
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default',()=> {
  if(argv.production){
    sequence('deps','app')
  }else{
    sequence('deps','app','server')
  }
})
