function filterBody (body, allowedData) {
    return Object.entries(body).filter(body => {
        const key = body[0]
        const value = body[1]
        if (allowedData.includes(key)) return true
        return false
    }).reduce((obj, body) => {
        const key = body[0]
        const value = body[1]
        obj[key] = value
        return obj
    }, {})
}

module.exports = filterBody;