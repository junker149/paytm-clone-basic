const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://admin:oIWOudhLkMZToYwd@cluster1.wbjrh2f.mongodb.net/");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const accountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}