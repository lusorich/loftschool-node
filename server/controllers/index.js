const db = require("../models/db");
const path = require("path");

db.defaults({ userData: [] }).write();

module.exports.get = async (ctx, next) => {
  return await ctx.render("pages/index", {
    msgsemail: ctx.flash("msgsemail")
  });
};

module.exports.post = async (ctx, next) => {
  const { name, email, message } = ctx.request.body;

  db.get("userData")
    .push({
      email: email,
      name: name,
      message: message
    })
    .write();
  ctx.flash("msgsemail", "Ваше сообщение отправлено");
  ctx.redirect("/");
};
