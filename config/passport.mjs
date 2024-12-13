import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

import UsersDBService from "../src/v1/models/user/UsersDBService.mjs";

// Налаштування локальної стратегії
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UsersDBService.findOne({ username }, {}, ["type"]);
      if (!user) {
        return done(null, false, { message: "Incorrect name." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Серіалізація користувача
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Десеріалізація користувача
passport.deserializeUser(async (id, done) => {
  try {
    // const user = await User.findById(id)
    const user = await UsersDBService.findOne({ _id: id }, {}, ["type"]);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
