module.exports = function (req, res, next) {
    if (!('auth' in req.cookies)) {
        res.status(400);
        res.send({error: 'auth cookie is required.'});
    } else {
        console.log(req.cookies.auth);
        next();
    }
};