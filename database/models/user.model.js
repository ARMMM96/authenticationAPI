const mongoose = require('mongoose')
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Schema } = mongoose;

const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email format")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const isValidpassword = validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1, minUppercase: 1,
                minNumbers: 1, minSymbols: 1,
                returnScore: false,
            });
            if (!isValidpassword) {
                throw new Error("invalid password format")
            }
        }
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["male", "female"]
    },
    phoneNumber: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value, "ar-EG"))
                throw new Error("invalid number")
        }
    },
    addresses: [
        {
            addrType: { type: String, required: true },
            addrDetails: { type: String }
        }
    ],
    bookMarks: [
        {
            url: String,
            name: String,
        }
    ],
    image: {
        type: String,
        trim: true,
    },
    tokens: [{
        token: { type: String, required: true }
    }],
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        default: "63b5fb423a9742d3119d429d",
    }
})


// Hide user credentials data
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    deletedElements = ["__v", "password", "tokens"]
    deletedElements.forEach(element => {
        delete user[element]
    });
    return user
}





userSchema.pre("save", async function () {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
})


userSchema.statics.loginUser = async (email, password) => {
    const userData = await User.findOne({ email })
    if (!userData) throw new Error("invalid email")
    const validatePassword = await bcryptjs.compare(password, userData.password)
    if (!validatePassword) throw new Error("invalid password")
    return userData
}



userSchema.methods.generateToken = async function () {
    const userData = this
    const token = jwt.sign({ _id: userData._id }, process.env.tokenPassword)
    userData.tokens = userData.tokens.concat({ token })
    await userData.save()
    return token
}



const User = mongoose.model("User", userSchema)
module.exports = User