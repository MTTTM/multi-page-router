const gulp = require('gulp');
const rollup = require('rollup');
const runSequence = require('gulp-run-sequence');

const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const clean = require('gulp-clean');

const uglify = require('rollup-plugin-uglify');
const es3ify = require('rollup-plugin-es3ify');//解决IE8中编译后 export，try catch 里面包含的IE8浏览器关键字导致的，“无法识别标识”错误
const minify = require('uglify-js').minify;
const flow = require('rollup-plugin-flow');
//输入&&输出配置
const input = { input: 'src/multRouter.class.js', plugins: [flow()] };
const sourcemap = process.env.NODE_ENV === 'production' ? true : false;
const output = {
    file: 'dist/index.umd.js',
    format: 'umd',
    sourcemap: false,
    name: '$Router', //把router挂在global.Router下面
    // intro  : 'window&&(window.$Router =Router)'  //吧内容挂在window下面
};
const outputES = {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: false,
    name: '$Router', 
};
gulp.task('build', ["clean"], async () => {
    const bundle1 = await rollup.rollup({
        ...input,
        context: "widnow",
        plugins: [
        
            resolve({
                module: true
            }),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })

        ]
    })
    await bundle1.write(outputES);


    if (process.env.NODE_ENV == "dev") {
        const bundle1 = await rollup.rollup({
            ...input,
            context: "widnow",
            plugins: [
                resolve({
                    module: true
                }),
                babel({
                    exclude: 'node_modules/**' // only transpile our source code
                })

            ]
        })
        await bundle1.write(outputES);
    }
    else {
        const bundle = await rollup.rollup({
            ...input,
            context: "widnow",
            plugins: [
                es3ify(),
                resolve({
                    module: true
                }),
                babel({
                    exclude: 'node_modules/**' // only transpile our source code
                }),
                , (process.env.NODE_ENV === 'production' && uglify.uglify()),

            ]
        })
        await bundle.write(output);

        //ES6
        const bundle1 = await rollup.rollup({
            ...input,
            context: "widnow",
            plugins: [
                resolve({
                    module: true
                }),
                babel({
                    exclude: 'node_modules/**' // only transpile our source code
                })

            ]
        })
        await bundle1.write(outputES);
    }
});


gulp.task('clean', function () {
    return gulp.src('dist/', { read: false })
        .pipe(clean());
});
//监听文件修改
gulp.task('default', ["build"], function () {
    gulp.watch('src/**/*.js', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        runSequence("build");
    });
});