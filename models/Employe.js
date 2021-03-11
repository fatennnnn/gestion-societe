const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nom: { type: String },
  prenom: { type: String },
  dateembauche: {
    // type: Date,
    type: String,
    // require: true,
  },
  datedenaissance: {
    // type: Date,
    type: String,
    // require: true,
  },
  posteoccupe: {
    type: String,
  },
  telephone: {
    type: String,
  },
});
module.exports = mongoose.model("Employe", UserSchema);
