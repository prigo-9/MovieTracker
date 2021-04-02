const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watch_schema = new Schema(
  {
    m_name: String,
    release_date: Date,
    sced_date: Date,
  },
  { timestamps: true }
);

const WatchList = mongoose.model("WatchList", watch_schema);

module.exports = WatchList;
