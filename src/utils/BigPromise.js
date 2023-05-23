const BigPromise = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = BigPromise;
