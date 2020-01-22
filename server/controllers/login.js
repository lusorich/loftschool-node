const db = require("../models/db");
const path = require("path");

db.defaults({ login: [] }).write();

module.exports.get = async (ctx, next) => {
  return await ctx.render("pages/login", {
    msgslogin: ctx.flash("msgslogin")
  });
};

module.exports.post = async (ctx, next) => {
  const { email, password } = ctx.request.body;

  db.get("login")
    .push({
      email: email,
      password: password
    })
    .write();
  ctx.flash("msgslogin", "Данные для входа добавлены");
  ctx.redirect("login");
};
