<h2>Sandbox for Vue, SCSS, html and js</h2>

<h4>Installation:</h4>
1) install node.js
2) run 'npm install'

<h4>Compile commands:</h4>
'npm run serve'  - serve the site and auto reload (best for development)
'npm run dev' - compile to ./dist folder
'npm run prod' - compile to ./dist folder in production mode
'npm run server' - run ./dist folder as site
'npm run watch' - auto compiling

<h4>Build to CMS with browser sync</h4>

npm install browser-sync
npm install browser-sync-webpack-plugin

add to webpack.config.js:
```
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
...
plugins: [
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: "http://localhost:8888/",
        open: 'internal',
        files: [{
            match: [
                '**/*.scss',
                '**/*.js',
                '**/*.tpl',
                '**/*.php',
                '**/*.html',
            ],
            fn: function(event) {
                console.log($(options));
                if (event === 'change') {
                    const bs = require('browser-sync').get('bs-webpack-plugin');
                    bs.reload();
                }
            },
        }],
    }),
...
```
then delete: html-webpack-plugin and webpack-dev-server.
