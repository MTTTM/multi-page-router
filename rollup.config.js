import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import rollup from 'rollup';

const input = { input: 'src/multRouter.class.js' };
const output = {
    file: 'dist/index.js',
    format: 'umd',
    name: '$Router' //把router挂在window.Router下面

};
export default {
    ...input,
    ...output,
    plugins: [
        resolve({
            modulesOnly: true
        }),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ]
};
console.log("**********",{...input,
    ...output})

const watchOptions = {
    input,
    output,
    watch: {
        include: 'src/**',
        exclude:'node_modules/**',
        chokidar:{}
    }
};
const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error
});

// stop watching
watcher.close();