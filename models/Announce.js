"use strict";
module.exports = function Announce(sequelize, DataTypes) {
  var Announce = sequelize.define("Announce", {
    an_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    an_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    an_startdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    an_enddate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    an_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    an_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Announce;
};
