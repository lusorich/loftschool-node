const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("admin.json");
const db = low(adapter);

db.defaults({ product: [], skills: [] }).write();

router.get("/", (request, response, next) => {
  response.status(200).render("admin", {
    pageTitle: "Admin",
    path: "/admin",
    layout: false,
    skillStatus: request.flash("skillStatus"),
    uploadStatus: request.flash("uploadStatus")
  });
});

router.post("/skills", (request, response, next) => {
  let reqToJson = JSON.stringify(request.body);

  db.get("skills")
    .push({
      age: JSON.parse(reqToJson).age,
      concerts: JSON.parse(reqToJson).concerts,
      cities: JSON.parse(reqToJson).cities,
      years: JSON.parse(reqToJson).years
    })
    .write();
  request.flash("skillStatus", "Скиллы добавлены успешно");
  response.redirect("/admin");
});

router.post("/upload", (request, response, next) => {
  let reqToJson = JSON.stringify(request.body);

  db.get("desc")
    .push({
      photo: request.file.path,
      name: JSON.parse(reqToJson).name,
      price: JSON.parse(reqToJson).price
    })
    .write();
  request.flash("uploadStatus", "Файл загружен");
  response.redirect("/admin");
});

module.exports = router;
