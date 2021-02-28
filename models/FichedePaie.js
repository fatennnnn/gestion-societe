const mongoose = require("mongoose");
const FichedePaieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fichedePaies: [
    {
      nomFichedePaie: {
        type: String,
        required: true,
      },
      fichedePaieUrl: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("FichedePaie", FichedePaieSchema);
