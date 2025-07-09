import moongoose from "moongoose";

const userSchema = new moongoose.Schema({

    username: {
        type: String,
        required : [true, "Username is required"],
        unique: true,
    },
   email: {
        type: String,
        required : [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required : [true, "Username is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
        type:Boolean,
        default: false,
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = moongoose.models.users || moongoose.model("users", userSchema);
export default User;
