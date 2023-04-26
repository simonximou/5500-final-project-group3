const mongoose = require(); 
const Schema = mongoose.Schema; 

const tokenSchema = new Schema({
    userId: {
        type: Schema.Type.ObjectId, 
        required: true, 
        ref: "User", 
        unique: true,
    },
    token: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now(),
        expire: 300 // 5min
    }
});

module.exports = mongoose.model("token", tokenSchema);