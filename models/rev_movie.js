const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rev_schema = new Schema(
  {
    m_name: String,
    m_review: String,
    watch_date: Date,
    star_rating: Number,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", rev_schema);

module.exports = Review;
