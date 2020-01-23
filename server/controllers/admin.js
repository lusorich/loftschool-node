const db = require("../models/db");
const path = require("path");

db.defaults({ products: [], skills: {} }).write();

module.exports.admin = async (ctx, next) => {
  return await ctx.render("pages/admin", {
    msgskill: ctx.flash("msgskill"),
    msgfile: ctx.flash("msgfile")
  });
};

module.exports.setSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;

  db.get("skills")
    .set("age", age)
    .set("concerts", concerts)
    .set("cities", cities)
    .set("years", years)
    .write();
  ctx.flash("msgskill", "Скиллы добавлены успешно");
  ctx.redirect("/admin");
};

module.exports.upload = async (ctx, next) => {
  const { name, price } = ctx.request.body;
  let pathName =
    ctx.request.file.destination + "/" + ctx.request.file.originalname;
  pathName = ctx.request.file.path.split("public");
  pathName.shift().toString();

  db.get("products")
    .push({
      photo: pathName,
      name: name,
      price: price
    })
    .write();
  ctx.flash("msgfile", "Файл загружен");
  ctx.redirect("/admin");
};
