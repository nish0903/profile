const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Sassの設定
const sassGlob = require('gulp-sass-glob'); // パーシャルファイルを一括import
const postcss = require('gulp-postcss'); // PostCSSのプラグイン
const autoprefixer = require('autoprefixer'); // ベンダープレフィックスの追加
const cssMqpacker = require('css-mqpacker'); // メディアクエリのまとめ
const babel = require('gulp-babel'); // ES6対応
const uglify = require('gulp-uglify'); // JavaScript圧縮
const browserSync = require('browser-sync').create(); // BrowserSync

const filepath = { src: 'src/', dist: 'htdocs/' };
const filesrc = {
  css: `${filepath.src}scss/**/*.scss`,
  js: `${filepath.src}js/*.js`,
};

// SCSSからCSSへの変換タスク
const css = () => {
  return src(filesrc.css)
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(
      postcss([
        autoprefixer({
          grid: 'autoplace',
          cascade: false
        }),
        cssMqpacker
      ])
    )
    .pipe(dest(`${filepath.dist}css/`))
    .pipe(browserSync.stream());
};

// JavaScriptのタスク
const js = () => {
  return src(filesrc.js)
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(dest(`${filepath.dist}js/`))
    .pipe(browserSync.stream());
};

// ローカルサーバーを立ち上げ、ファイルの変更を監視
const serve = () => {
  browserSync.init({
    server: {
      baseDir: filepath.dist
    },
    port: 9000 // ポート番号を指定
  });

  watch(filesrc.css, css);
  watch(filesrc.js, js);
  watch(`${filepath.dist}/*.html`).on('change', browserSync.reload);
};

// タスクのエクスポート
exports.default = parallel(css, js, serve);
exports.css = css;
exports.js = js;
exports.watch = serve;
