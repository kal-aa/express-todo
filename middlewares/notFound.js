const notFound = (req, res, next) => {
  return res
    .status(404)
    .send("NOT FOUND");
};

export default notFound;
