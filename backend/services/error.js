function ErrorHandling(err_code, msg) {
    return { err: parseInt(err_code), msg: msg }
}

module.exports = ErrorHandling