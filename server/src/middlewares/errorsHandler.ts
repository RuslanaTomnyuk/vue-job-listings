export const errorsHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err.message);
};
