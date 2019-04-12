module.exports = {
    transpileDependencies: ['vuex-persist'],
    // proxy API requests to Valet during development
    devServer: {
        //proxy: 'http://localhost:80/api'//с пушером траблы вызывает;
    },

    // output built static files to Laravel's public dir.
    // note the "build" script in package.json needs to be modified as well.
    outputDir: '../public',
    // modify the location of the generated HTML file.
    // make sure to do this only in production.
    indexPath: process.env.NODE_ENV === 'production' ?
       '../resources/views/index.blade.php'
     : 'index.html'
}
