const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const path = require('path')
const dirs = {src: 'src', dist: 'dist'}

gulp.task('vendor:js', () => {
  return gulp.src([
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/materialize-css/dist/js/materialize.js'
    ])
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'js')))
    .pipe(plugins.rename('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'js')))
})

gulp.task('vendor:css', () => {
  return gulp.src([
      'node_modules/materialize-css/dist/css/materialize.css'
    ])
    .pipe(plugins.concat('vendor.css'))
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'css')))
    .pipe(plugins.rename('vendor.min.css'))
    .pipe(plugins.uglifycss({"maxLineLen": 80, "uglyComments": true}))
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'css')))
})

gulp.task('vendor:fonts', () => {
  return gulp.src([
      'node_modules/materialize-css/dist/fonts/roboto/*'
    ])
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'fonts')))
})

gulp.task('app:html', () => {
  return gulp.src([
      'src/assets/index.html',
      'src/assets/favicon.ico'
    ])
    .pipe(gulp.dest(path.join(dirs.dist, 'assets')))
})

gulp.task('app:js', () => {
  return gulp.src('src/assets/js/*')
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'js')))
    .pipe(plugins.rename('app.min.js'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'js')))
})


gulp.task('app:css', () => {
  return gulp.src('src/assets/css/*')
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'css')))
    .pipe(plugins.rename('app.min.css'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglifycss({"maxLineLen": 80, "uglyComments": true}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(dirs.dist, 'assets', 'css')))
})

gulp.task('watch', ['default'], () => {
  gulp.watch('assets/*.html', ['app:html'])
  gulp.watch('assets/**/*.js', ['app:js'])
  gulp.watch('assets/**/*.css', ['app:css'])
})

gulp.task('app', ['app:html', 'app:js', 'app:css'])
gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:fonts'])
gulp.task('default', ['app', 'vendor'])