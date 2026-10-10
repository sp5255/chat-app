exports.handleFieldError = ({ field, message }, res) => {
  return res.status(401).json({
    // success: false,
    errors: {
      field,
      [field]: message,
    },
  });
};

exports.handleSuccessResponse = ({ field, message }, res) => {
  res.json({ message }).status(200);
};
