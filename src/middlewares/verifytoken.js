function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const tokendata = bearer[1];
        req.token = tokendata;
        next();
    } else {
        res.status(403).send({ result: 'Token is not valid' });
    }
}
module.exports = verifyToken;