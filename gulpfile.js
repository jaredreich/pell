
const cssnano = require('gulp-cssnano')
const del = require('del')
const gulp = require('gulp')
const rename = require('gulp-rename')
const rollupBabel = require('rollup-plugin-babel')
const rollupStream = require('rollup-stream')
const { uglify: rollupUglify } = require('rollup-plugin-uglify')
const run = require('run-sequence')
const sass = require('gulp-sass')
const size = require('gulp-size')
const source = require('vinyl-source-stream')

gulp.task('clean', () => del(['./dist']))

// const rollupConfig = minimize => ({
//   entry: './src/pell.js',
//   exports: 'named',
//   format: 'umd',
//   moduleName: 'pell',
//   plugins: [babel({ exclude: 'node_modules/**' })].concat(
//     minimize
//       ? [
//         uglify({
//           compress: { warnings: false },
//           mangle: true,
//           sourceMap: false,
//         }),
//       ]
//       : []
//   ),
//   rollup: Rollup,
// })

gulp.task('script', () => {
  return rollupStream({
    exports: 'named',
    format: 'umd',
    input: './src/pell.js',
    name: 'pell',
    plugins: [rollupBabel({ exclude: 'node_modules/**' })],
    sourcemap: false,
  })
  .pipe(source('pell.js'))
  .pipe(gulp.dest('./dist'))
  .pipe(size({ showFiles: true }))
})

gulp.task('scriptOld', () => {
  gulp.src('./src/*.js')
    // .pipe(rollup(rollupConfig(false)))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('./dist'))

  gulp.src('./src/*.js')
    // .pipe(rollup(rollupConfig(true)))
    .pipe(rename('pell.min.js'))
    .pipe(size({ showFiles: true }))
    .pipe(size({ gzip: true, showFiles: true }))
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
