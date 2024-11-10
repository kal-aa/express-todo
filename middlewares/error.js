const error = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(err.message);
  }
  res.status(500).send(err.message);
};

export default error
