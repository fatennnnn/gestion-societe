const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("config");
const email = config.get("email");
const motdepasse = config.get("motdepasse");

const createAdmin = async() => {
    try {
        const existedAdmin = await User.findOne({ email });
        if (!existedAdmin) {
            const hashedPassword = await bcrypt.hash(motdepasse, 10);
            const user = new User({
                email,
                motdepasse: hashedPassword,
                role: "admin",
            });
            await user.save();
            console.log("admin created");
        }
        console.log("admin already exist");
    } catch (error) {
        console.log(error);
    }
};

module.exports = createAdmin;