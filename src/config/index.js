const globalPathEnv = require('./env');
const globalPathBuild = require('./build');


if (process.env.NODE_ENV === 'production') {
    module.exports = globalPathBuild
} else {
    module.exports = globalPathEnv
}