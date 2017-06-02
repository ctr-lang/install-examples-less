const gulp         = require('gulp');
const babel        = require('gulp-babel');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const lessGlob     = require('less-plugin-glob');
const less         = require('gulp-less');
const ctr          = require('ctr').less;


/**
 * Error reporter
 * @param  {---} err -> gulp error
 * @return {---}     -> logs error on console
 */
const onError = function (err) {
  console.log(err);
  this.emit('end');
};


/**
 * Paths for all gulp'in activity
 * @type {Object}
 */
const paths = {
  src: {
    less: 'src/less/styles.less',
    js: 'src/js/index.js',
    html: 'src/html/**/*.html',
    img: 'src/img/**/*'
  },
  watch: {
    less: 'src/less/**/*.less',
    js: 'src/js/**/*.js',
    html: 'src/html**/*.html',
    img: 'src/img/**/*'
  },
  build: {
    less: 'build/',
    js: 'build/',
    html: 'build/',
    img: 'build/',
    build: 'build/'
  }
};


/**
 * Less
 * ctr + autoprefixer
 */
gulp.task('less', function () {
  gulp.src(paths.src.less)
    .pipe(less({
      // @important, needed to ensure proper variable and class import loading
      syncImport: true,
      plugins: [
        ctr(),
        //cus less can't glob...stylus can
        lessGlob
      ]
    }))
    .on('error', onError)
    // @important the "last 99 versions" if for testing purposes
    .pipe(autoprefixer({
      browsers: ['last 99 versions']
    }))
    .on('error', onError)
    .pipe(gulp.dest(paths.build.less));
});


/**
 * HTML, copies from src to dest
 */
gulp.task('html', function () {
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.build.html));
});


/**
 * JS compilation through babel
 */
gulp.task('js', function () {
  gulp.src(paths.src.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.build.js));
});


/**
 * Image comression
 */
gulp.task('img', function () {
  gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build.img));
});


/**
 * Assetr watch, if file is changed gulp re-compiles
 */
gulp.task('watch', function () {
  gulp.watch(paths.watch.html, { debounceDelay: 100 }, ['html']);
  gulp.watch(paths.watch.js, ['js']);
  gulp.watch(paths.watch.less, ['less']);
});

/**
 * Browser-sync config
 */
gulp.task('browser-sync', function () {
  browserSync.init(paths.build.build, {
    server: {
      baseDir: './build/'
    }
  });
});


/**
 * Gulp tasks, ie. "gulp build"
 */
gulp.task('default', ['html', 'img', 'less', 'js', 'watch', 'browser-sync']);
gulp.task('build', ['html', 'img', 'less', 'js']);
