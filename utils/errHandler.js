const resCode = require('../configs/responseCode')
const resHandler = require('./resHandler')

module.exports = err => {
    console.log('[ERROR]:', err)
    return resHandler(false, err.reason ? resCode[err.reason] : resCode.error, null)
}