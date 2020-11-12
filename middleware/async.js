const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next))
  .catch((error) => { next(error, req, res); console.log(error); });

export default asyncHandler;
