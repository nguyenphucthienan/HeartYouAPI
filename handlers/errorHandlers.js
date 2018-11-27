exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.developmentErrorHandler = (err, req, res, next) => {
  console.log('ERROR: ', err);
  return res.status(err.status || 500).send(err.message);
};

exports.productionErrorHandler = (err, req, res, next) => (
  res.status(500).send('Internal server error')
);
