const errorHandleMiddleware = (err, req, res, next) => {
    if (err.name == 'ValidationError') {
        return res
          .status(422)
            .json({ message:"Validation Failed",errors: err.errors });
  }
  console.log(err)
    return res.status(err?.statusCode || 500).json({ message: err.message || "something went wrong" })
}

module.exports = errorHandleMiddleware;