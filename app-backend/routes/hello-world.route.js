const router = require("express").Router();

router.get("/", (_, res) => {
  res
    .json({
      message: "Hello world",
      status: "Ok",
    })
    .status(200);
});

module.exports = router;
