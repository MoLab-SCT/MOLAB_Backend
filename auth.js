module.exports = {
  isOwner: function (req, res) {
    if (req.user) {
      return true;
    } else {
      return false;
    }
  },
  statusUI: function (req, res) {
    var authstatusUI = '<a href = "/">login</a>';
    if (this.isOwner(req, res)) {
      var authstatusUI =
        `${req.user.name}` + '| <a href = "/login/success">logout</a>';
    }
    return authstatusUI;
  },
};
