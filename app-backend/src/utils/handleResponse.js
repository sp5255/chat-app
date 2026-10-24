exports.handleFieldError = ({ field, message }, res) => {
  return res.status(401).json({
    // success: false,
    errors: {
      field,
      [field]: message,
    },
  });
};

exports.handleSuccessResponse = ({ field, message, code }, res) => {
  return res.status(code || 200).json({ message });
};
