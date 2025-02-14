exports.handleFieldError = ({ field, message }, res) => {
  return res
    .json({
      errors: {
        name: field,
        [field]: message,
      },
    })
    .status(500);
};

exports.handleSuccessResponse = ({ field, message }) => {
  res.json({ message }).status(200);
};
