function isLogin(req, res, next) {
    console.log('isLogin', req.session)
    if(req.session.current_user) {
        return next();
    }

    if(req.headers.session) {
        req.session.current_user = req.headers.session
        return next();
    }
    res.status(403).json({msg: "Please Login First"});
}

module.exports = isLogin;