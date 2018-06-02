const gulp = require('gulp');
const rollup = require('rollup');
const runSequence = require('gulp-run-sequence');

const resolve =require('rollup-plugin-node-resolve');
const babel =require('rollup-plugin-babel');
const clean = require('gulp-clean');

const uglify= require('rollup-plugin-uglify');
console.log("uglifyuglifyuglify",uglify)
//输入&&输出配置
const input = { input: 'src/multRouter.class.js' };
const output = {
    file: 'dist/index.js',
    format: 'umd',
    sourcemap: true,
    name: '$Router' //把router挂在window.Router下面

};

gulp.task('build',["clean"], async  () => {
   const bundle = await rollup.rollup({
        ...input,
    plugins: [
        resolve({
            modulesOnly: true
        }),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        (process.env.NODE_ENV === 'production' && uglify.uglify())
    ]
    })
   await bundle.write(output);
});

gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});
//监听文件修改
gulp.task('default',["build"], function() {
    gulp.watch('src/**/*.js', function(event) {
    	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        runSequence("build");
    });
});