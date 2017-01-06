var gulp = require("gulp");
var mocha = require("gulp-mocha");

gulp.task("default", function() {
	gulp.watch(["test/*.test.js", "src/validator.js"], ["validator"]);
});

gulp.task("validator", function() {
	return gulp.src("test/*.js", {
		read: false
	}).pipe(mocha({
		reporter: "min",
		ui: "tdd"
	}));
});
