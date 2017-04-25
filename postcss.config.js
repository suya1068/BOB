const cssnext = require("postcss-cssnext");
const browserReporter = require("postcss-browser-reporter");
const reporter = require("postcss-reporter");

module.exports = {
    plugins: [
        cssnext({
            browsers: ["last 2 versions"]
        }),
        browserReporter(),
        reporter()
    ]
};