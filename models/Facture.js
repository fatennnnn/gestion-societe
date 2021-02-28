const mongoose = require("mongoose");
const FactureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  factures: [
    {
      nomfacture: {
        type: String,
        required: true,
      },
      factureUrl: {
        type: String,
        required: true,
      },
    },
  ],
  contrats: [
    {
      nomcontrat: {
        type: String,
        required: true,
      },
      contratUrl: {
        type: String,
        required: true,
      },
    },
  ],
  bonCommandes: [
    {
      nombonCommande: {
        type: String,
        required: true,
      },
      bonCommandeUrl: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Facture", FactureSchema);
