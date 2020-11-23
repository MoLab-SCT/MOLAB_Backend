var jwt = require("jsonwebtoken");

exports.encryption = (value, callback) => {
  jwt.sign(
    value,
    "molab_secret",
    { expiresIn: 60 * 60 * 60},
    (err, token) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        return callback(null, token);
      }
    }
  );
};

exports.decryption = (token, callback) => {
  jwt.verify(token, "molab_secret", (err, value) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      return callback(null, value);
    }
  });
};