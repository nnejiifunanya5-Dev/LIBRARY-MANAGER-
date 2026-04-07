module.exports = (req, res, next) => {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn) {
        return res.status(400).json({
            message: "Title, author and ISBN are required"
        });
    }

    next();
};