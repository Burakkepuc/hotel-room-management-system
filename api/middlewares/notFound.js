const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
  });
};

export default notFound;