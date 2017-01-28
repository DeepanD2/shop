var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


gulp.task('watch', ['sass'], function() {
    
    browserSync.init({
        server: "./app"
    });
    
    gulp.watch('app/scss/*.*', ['sass']);
    gulp.watch('app/**.*').on('change', browserSync.reload);
    gulp.watch('app/js/**.*').on('change', browserSync.reload);
});