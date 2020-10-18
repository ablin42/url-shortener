const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const terser = require("gulp-terser");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync").create();
const gulpIf = require("gulp-if");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

const paths = {
	input: "public/",
	output: "dist/",
	proxy: "http://localhost:9292",
	baseDir: "./sqc",
	files: ["public/**/*.*"],
	scripts: {
		input: "public/scripts/*",
		output: "public/dist/scripts/"
		//polyfills: '!src/js/*.polyfill.js',
		//polyfills: ".polyfill.js",
	},
	styles: {
		input: "public/css/*.{scss,sass}",
		output: "public/dist/css/"
	},
	images: {
		input: "public/img/**/*.+(png|jpg|gif|svg|ico)",
		output: "public/dist/img/"
	},
	fonts: {
		input: "public/fonts/**/*",
		output: "public/dist/fonts/"
	},
	copy: {
		input: "src/copy/*",
		output: "public/dist/"
	},
	reload: "./dist/"
};

/*
let settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	copy: true,
	reload: true
};*/

gulp.task("sass", function () {
	return gulp
		.src(paths.styles.input)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(cssnano())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task("js", function () {
	return gulp
		.src(paths.scripts.input)
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.scripts.output));
});

gulp.task("images", function () {
	return gulp.src(paths.images.input).pipe(cache(imagemin())).pipe(gulp.dest(paths.images.output));
});

gulp.task("fonts", function () {
	return gulp.src(paths.fonts.input).pipe(gulp.dest(paths.fonts.output));
});

gulp.task("nodemon", cb => {
	let started = false;
	return nodemon({
		script: "app.js"
	}).on("start", () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task(
	"serve",
	gulp.series("nodemon", () => {
		browserSync.init(null, {
			proxy: paths.proxy,
			files: paths.files,
			port: 5000,
			baseDir: paths.baseDir
		});
	})
);

gulp.task("clean:dist", function () {
	return del("public/dist");
});

gulp.task("watch", function () {
	gulp.watch(paths.styles.input, gulp.series("sass"));
	gulp.watch(paths.scripts.input, gulp.series("js"));
	gulp.watch(paths.images.input, gulp.series("images"));
	gulp.watch(paths.fonts.input, gulp.series("fonts"));
});

gulp.task("live", gulp.parallel("serve", "watch"));

gulp.task("default", gulp.series("clean:dist", gulp.parallel("sass", "js", "images", "fonts"), "live"));

gulp.task("build", gulp.series("clean:dist", gulp.parallel("sass", "js", "images", "fonts")));
