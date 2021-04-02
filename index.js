const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Review = require("./models/rev_movie");
const WatchList = require("./models/watch-movie");
mongoose
  .connect("mongodb://localhost/moviedb")
  .then((result) => console.log(" connected to db "))
  .catch((err) => console.log(err));
const UserProf = require("./models/user_prof");
app.listen(3100);
app.set("view engine", "ejs");
app.use(bodyParser());
app.use(express.static("static"));

app.get("/form", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.render("form");
});

app.post("/form", (req, res) => {
  console.log(req.body);

  console.log(req.body.playerName);
  console.log(req.body.playerAge);
  console.log(req.body.playermd);
  const name = req.body.playerName;
  const age = req.body.playerAge;
  const media_link = req.body.playermd;

  const newUser = { name: name, age: age, media_link: media_link };
  UserProf.create(newUser, (err, newlyCreated) => {
    if (err) {
      console.log("Error");
    } else {
      res.redirect("form");
    }
  });
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  UserProf.findByIdAndRemove(req.body.id, (err, UserFound) => {
    if (err) {
      console.log(err);
    } else {
      //console.log();
      res.redirect("/all_users");
    }
  });
});

app.get("/all_users", (req, res) => {
  UserProf.find({}, (err, all_users) => {
    if (err) {
      console.log("error");
    } else {
      res.render("all_profs", { users: all_users, title: "All User Profiles" });
    }
  });
});

app.get("/movies", (req, res) => {
  Review.find({}, (err, all_reviews) => {
    if (err) {
      console.log("error");
    } else {
      res.render("index", { reviews: all_reviews, title: "All Reviews" });
    }
  });
  // res.render("index", { blogs: blogs, title: "Watch List" });
});

app.get("/form-movies", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("form-movies", { title: "Add Reviews" });
});

app.post("/form-movies", (req, res) => {
  // console.log(req.body.mname);
  // console.log(req.body.mrev);
  // console.log(req.body.mdate);
  // console.log(req.body.rating);
  const new_mov = {
    m_name: req.body.mname,
    m_review: req.body.mrev,
    watch_date: req.body.mdate,
    star_rating: req.body.rating,
  };
  Review.create(new_mov, (err, newlyCreated) => {
    if (err) {
      console.log("Error");
    } else {
      res.redirect("/form-movies");
    }
  });
});

app.get("/del-rev/:id", (req, res) => {
  console.log(req.params.id);
  Review.findByIdAndRemove(req.params.id, (err, UserFound) => {
    if (err) {
      console.log(err);
    } else {
      //console.log();
      res.redirect("/movies");
    }
  });
});

app.get("/update/:id", (req, res) => {
  console.log("Here with id" + req.params.id);
  Review.findById(req.params.id, (err, reviewfound) => {
    if (err) {
      console.log(err);
    } else {
      //console.log();
      res.render("update-rev", {
        title: " Update review",
        existing_info: reviewfound,
      });
    }
  });
});

app.post("/update-info", (req, res) => {
  console.log(req.body);
  const update_rev = {
    m_name: req.body.mname,
    m_review: req.body.mrev,
    watch_date: req.body.mdate,
    star_rating: req.body.rating,
  };
  Review.findByIdAndUpdate(req.body._id, update_rev, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/movies");
    }
  });
});

app.get("/watch-list", (req, res) => {
  res.render("watch-list", { title: "Watch List" });
});

app.post("/watch-form", (req, res) => {
  console.log(req.body);
  const upcom_mov = {
    m_name: req.body.mname,
    release_date: req.body.mdate,
    sced_date: req.body.sced_time,
  };
  WatchList.create(upcom_mov, (err, newlyCreated) => {
    if (err) {
      console.log("Error");
    } else {
      res.redirect("/watch-list");
    }
  });
});

app.get("/list-to-watch", (req, res) => {
  WatchList.find({}, (err, l_to_watch) => {
    if (err) {
      console.log("error");
    } else {
      res.render("lst_to_watch", {
        l_to_watch: l_to_watch,
      });
    }
  });
});

app.get("/del-watchlist/:id", (req, res) => {
  console.log(req.params.id);
  WatchList.findByIdAndRemove(req.params.id, (err, UserFound) => {
    if (err) {
      console.log(err);
    } else {
      //console.log();
      res.redirect("/list-to-watch");
    }
  });
});

app.post("/update-sced/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log("this is the request now");
  // const update_sced = {
  //   m_name: req.body.m_name,
  //   release_date: req.body.release_date,
  //   sced_date: req.body.sced_time,
  // };

  // WatchList.findByIdAndUpdate(
  //   req.params.id,
  //   update_sced,
  //   function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.redirect("/watch-list");
  //     }
  //   }
  // );
});

app.use((req, res) => {
  //res.sendFile("./views/404.html", { root: __dirname });
  res.render("404");
});
