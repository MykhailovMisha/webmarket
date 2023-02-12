const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

gulp.task("scss", () => {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("css", () => {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
      // "node_modules/magnific-popup/dist/magnific-popup.css",
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", () => {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", () => {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", () => {
  return gulp
    .src([
      "node_modules/slick-carousel/slick/slick.js",
      // "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("export", async () => {
  let buildHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  let buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));
  let buildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));
  let buildFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
  let buildImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task(
  "default",
  gulp.parallel("css", "scss", "js", "browser-sync", "watch")
);
