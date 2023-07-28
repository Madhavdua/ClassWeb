const mongoose = require("mongoose");
const { Schema } = mongoose;
const GroupSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "New group"
    },
    code: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    }
})
const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;