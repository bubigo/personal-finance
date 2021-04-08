const {series, parallel, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulpClean = require('gulp-clean');
const browserSync = require('browser-sync').create();

function serve(){
    browserSync.init({
        server: 'build',
        watch: true
    });
}

function clean(){
    return src('build', {read:false, allowEmpty:true})
        .pipe(gulpClean());
}
function copyHTML() {
    return src('src/index.html').pipe(dest('build'));
    // place code for your default task here
    //console.log('defaultTask');
    //cb();
}


function copyJS() {
    return src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery-ui-dist/jquery-ui.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/all.min.js',
        './src/models/*.model.js',
        './src/js/*.js'
    ])
        .pipe(concat('src/js/index.js'))
        .pipe(dest('build'));
    // place code for your default task here
    //console.log('defaultTask');
    //cb();
}
function copyImages() {
    return src('src/img/*').pipe(dest('build/src/img/'));
    // place code for your default task here
    //console.log('defaultTask');
    //cb();
}

function transformSCSS(){
    return src([
        './node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
        './node_modules/jquery-ui-dist/jquery-ui.min.css',
        './src/styles/*.scss',

    ])
        .pipe(sass().on('error',sass.logError))
        .pipe(cleanCSS())
        .pipe(concat( 'src/styles/index.css'))
        .pipe(dest('build'));

}

function watchTasks(){
    watch('src/index.html', copyHTML);
    watch('src/styles/*.scss', transformSCSS);
    watch('src/js/*.js', copyJS);
    watch('src/models/*.model.js', copyJS());
}

exports.clean = clean;
exports.watch = watchTasks;
exports.style = transformSCSS;
exports.default = series(
    clean,
    parallel(copyHTML, copyJS, copyImages, transformSCSS),
    parallel(watchTasks, serve)
);
