// Import important packages
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv
const gulpif = require('gulp-if')

// SASS -> CSS
const sass = require('gulp-sass')(require('sass'))
sass.compiler = require('sass')
const postcss = require('gulp-postcss')
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

// HTML
const htmlmin = require('gulp-htmlmin')

// JavaScript / TypeScript
const buffer = require('vinyl-buffer')
const { createGulpEsbuild } = require('gulp-esbuild')
const gulpEsbuild = createGulpEsbuild({ incremental: false })

// Define important variables
const src = './src'
const dest = './dist'
const useTypeScript = false

// Reload the browser
const reload = (done) => {
    browserSync.reload()
    done()
}

// Serve the dev-server in the browser
const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: `${dest}`
        }
    })
    done()
}

function isProduction() {
    return argv.production ? true : false
}

// Compile SASS to CSS with gulp
const css = () => {
    // Find SASS
    return gulp.src(`${src}/sass/**/*.{sass,scss}`)
        // Init Plumber
        .pipe(plumber())
        // Start sourcemap
        .pipe(gulpif(!isProduction(), sourcemaps.init()))
        // Compile SASS to CSS
        .pipe(sass({
            includePaths: ['./node_modules'],
        }).on('error', sass.logError))
        // Add suffix
        .pipe(rename({ basename: 'main', suffix: '.min' }))
        // Add Autoprefixer & cssNano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Write sourcemap
        .pipe(gulpif(!isProduction(), sourcemaps.write('')))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}/css`))
}

const cssInspector = () => {
    // Find SASS
    return gulp.src(`${src}/sass/**/*.{sass,scss}`)
        // Init Plumber
        .pipe(plumber())
        // Start sourcemap
        .pipe(gulpif(!isProduction(), sourcemaps.init()))
        // Compile SASS to CSS
        .pipe(sass({
            includePaths: ['./node_modules'],
        }).on('error', sass.logError))
        // Add suffix
        .pipe(rename({ basename: 'inspector-stylesheet', suffix: '', extname: ''}))
        // Add Autoprefixer & cssNano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Write sourcemap
        .pipe(gulpif(!isProduction(), sourcemaps.write('')))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}/css/inspector:/shop.heesundpeters.com/`))
}


// Compile .html to minified .html
const html = () => {
    // Find HTML
    return gulp.src(`${src}/*.html`)
        // Init Plumber
        .pipe(plumber())
        // Compile HTML to minified HTML
        .pipe(htmlmin({
            collapseWhitespace: isProduction(),
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}`))
}

const typescript = () => {
    return gulp.src(`${src}/script/main.ts`)
}

const javascript = () => {
    return gulp.src(`${src}/script/main.js`)
}

// Compile .js/.ts to minified .js
const script = () => {
    const sourceStream = useTypeScript ? typescript() : javascript()
    return sourceStream
        .pipe(gulpEsbuild({
            outfile: 'main.bundle.js',
            bundle: true,
            minify: true,
            sourcemap: !isProduction(),
            platform: 'browser'
        }))
        .pipe(buffer())
        .pipe(gulp.dest(`${dest}/js`))
}

// Copy assets
const assets = () => {
    return gulp.src(`${src}/assets/**`)
        .pipe(gulp.dest(`${dest}/assets`))
}

// Watch changes and refresh page
const watch = () => gulp.watch(
    [
        `${src}/*.html`,
        `${src}/script/**/*.(js|ts)`,
        `${src}/sass/**/*.{sass,scss}`,
        `${src}/assets/**/*.*`
    ],
    gulp.series(
        assets,
        css,
        cssInspector,
        script,
        html,
        reload
    ))

// Development tasks
const dev = gulp.task('dev', gulp.series(gulp.parallel(assets, css, cssInspector, script, html), serve, watch))

// Build tasks
const build = gulp.task('build',
    gulp.parallel(
        assets,
        html,
        css,
        cssInspector,
        script
    ))

// Default function (used when type "gulp")
exports.default = dev
exports.dev = dev
exports.build = build