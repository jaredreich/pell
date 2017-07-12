const rollup = require('gulp-rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const del = require('del')
const run = require('run-sequence')

gulp.task('clean', () => del(['./dist']))

const rollupConfig = minimize => ({
  rollup: require('rollup'),
  entry: './src/pell.js',
  moduleName: 'pell',
  format: 'umd',
  exports: 'named',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ].concat(minimize
    ? [
      uglify({
        compress: { warnings: false },
        mangle: true,
        sourceMap: false
      })
    ]
    : []
  )
})

gulp.task('script', () => {
  gulp.src('./src/*.js')
  .pipe(rollup(rollupConfig(false)))
  .pipe(gulp.dest('./dist'))
  gulp.src('./src/*.js')
  .pipe(rollup(rollupConfig(true)))
  .pipe(rename('pell.min.js'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('style', () => {
  gulp.src(['./src/pell.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'))
  .pipe(cssnano())
  .pipe(rename('pell.min.css'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['clean'], () => {
  run('script', 'style')
  gulp.watch('./src/pell.scss', ['style'])
  gulp.watch('./src/pell.js', ['script'])
})
