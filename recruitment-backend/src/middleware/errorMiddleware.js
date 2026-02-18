export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            message: "Duplicate entry"
        });
    }

    if (err.message === "Only PDF files allowed") {
        return res.status(400).json({
            message: err.message
        });
    }

    res.status(500).json({
        message: err.message || "Server error"
    });
};
