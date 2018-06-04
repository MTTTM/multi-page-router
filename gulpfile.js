const gulp = require('gulp');
const rollup = require('rollup');
const runSequence = require('gulp-run-sequence');

const resolve =require('rollup-plugin-node-resolve');
const babel =require('rollup-plugin-babel');
const clean = require('gulp-clean');

const uglify= require('rollup-plugin-uglify');
const es3ify=require('rollup-plugin-es3ify');//解决IE8中编译后 export，try catch 里面包含的IE8浏览器关键字导致的，“无法识别标识”错误
console.log("uglifyuglifyuglify",uglify)
//输入&&输出配置
const input = { input: 'src/multRouter.class.js' };
const sourcemap=process.env.NODE_ENV === 'production'?true:false;
console.log("process.env.NODE_ENV:",sourcemap)
const output = {
    file: 'dist/index.js',
    format: 'umd',
    sourcemap: false,
    name: '$Router' //把router挂在window.Router下面

};

gulp.task('build',["clean"], async  () => {
   const bundle = await rollup.rollup({
        ...input,
    plugins: [
        resolve({
            modulesOnly: true
        }),
        , (process.env.NODE_ENV === 'production' && uglify.uglify()),
        es3ify(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
     
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