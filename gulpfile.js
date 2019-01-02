var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var cleanCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");

//sass
gulp.task("sass", function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css/"))
});

//监听sass
gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", gulp.series("sass"))
});

gulp.task("htmlmin", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("dist/"))
});

gulp.task("cleanCss", function() {
    return gulp.src("src/css/style.css")
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/css/"))
});

gulp.task("uglify", function() {
    return gulp.src("src/js/script.js")
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/js/"))
});

gulp.task("yaJs", function() {
    return gulp.src(["src/js/*.js", "!src/js/script.js"])
        .pipe(gulp.dest("dist/js/"))
});
gulp.task("yaCss", function() {
    return gulp.src(["src/css/*.css", "!src/css/style.css"])
        .pipe(gulp.dest("dist/css/"))
});
gulp.task("yascss", function() {
    return gulp.src(["src/scss/*.scss", "!src/scss/style.scss"])
        .pipe(gulp.dest("dist/scss/"))
});
gulp.task("yaImg", function() {
    return gulp.src(["src/img/*.png"])
        .pipe(gulp.dest("dist/img/"))
});

gulp.task("webserver", function() {
    return gulp.src("src")
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true
        }))
});

gulp.task("dev", gulp.series("sass", "webserver", "watch"));
gulp.task("build", gulp.series("cleanCss", "uglify", "yaJs", "yaCss", "yascss", "yaImg"));