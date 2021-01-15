module.exports = (result, code, payload) => {
    console.log(payload)
    return {
        result,
        code,
        payload,
    }
}