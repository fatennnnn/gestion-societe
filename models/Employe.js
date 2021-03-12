const mongoose = require("mongoose");
const EmployeSchema = new mongoose.Schema({
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
  //matricule
});
module.exports = mongoose.model("Employe", EmployeSchema);
