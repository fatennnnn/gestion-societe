const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
        // required: true,
    },
    prenom: {
        type: String,
        // required: true,
    },
    numerosiret: {
        type: String,
        // required: true,
    },
    adresse: {
        detail: {
            type: String,
        },
        region: {
            type: String,
            // required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tva: {
        type: String,
        // required: true,
    },
    telephone: {
        type: String,
        // required: true,
    },
    gsm: {
        type: String,
        // required: true,
    },
    siteweb: {
        type: String,
    },
    motdepasse: {
        type: String,
        required: true,
    },


    role: {
        type: String,
        default: "user",
    },
});
module.exports = mongoose.model("User", UserSchema);