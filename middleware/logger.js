module.exports = () => {
    return (req, res, next) => {
        const time = new Date().toISOString()
        console.log(`new request: time stamp: [${time}] req method: ${req.method} req url: ${req.url}`)
        next()
    }
}
