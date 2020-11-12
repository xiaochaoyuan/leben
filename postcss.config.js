module.exports = (file) => {
    let remUnit
    remUnit = file && file.dirname && file.dirname.indexOf('vant') > -1 ? 41.4 : 37.5
    return {
        plugins: {
            'autoprefixer': {
                overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
            },
            'postcss-pxtorem': {
                rootValue: remUnit,
                propList: ['*']
            }
        }
    }
}