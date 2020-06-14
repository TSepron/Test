const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const del = require('del')

async function clean() {
    del.sync('./dist/**/*.!(html)')
}

function css() {
    return gulp.src([
        './node_modules/normalize.css/normalize.css',
        './src/css/*.css'
    ])
        .pipe(concat('libs.css'))
        // restructure because css.min files must go in series
        .pipe(csso({restructure: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

function sassToCss() {
    return gulp.src('./src/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer('last 5 version', '> 1%', 'ie 11', 'ie 10'))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/js'))
}

function fonts() {
    return gulp.src('./src/fonts/*.+(woff|woff2)')
        .pipe(gulp.dest('./dist/fonts'))
}

// Еще надо поставить очищение папки dist/img
function imgs() {
    return gulp.src('./src/img/**/*.+(jpg|png|svg)')
        .pipe(gulp.dest('./dist/img'))
}

function startBrowser() {
    browserSync.init({
        server: './dist',
        port: 3535
    })
}

function watch() {
    gulp.watch('./dist/index.html').on('change', browserSync.reload)
    gulp.watch('./src/css', css)
    gulp.watch('./src/sass/**/*.sass', sassToCss)
    gulp.watch('./src/fonts', fonts)
    gulp.watch('./src/img/**/*.+(jpg|png|svg)', imgs)
    gulp.watch('./src/js/**/*.js', js)
}
// gulp.series ([clean, html])

exports.default = gulp.parallel([fonts, imgs, css, js, sassToCss, startBrowser, watch])
exports.clean = clean
exports.watch = watch
exports.css = css
exports.sassToCss = sassToCss
exports.fonts = fonts