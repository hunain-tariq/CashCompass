const mongoose = require('mongoose');



const monthSchema = new mongoose.Schema({
  month:{
        type:String,
        required: true
  } , 

  totalIncome: {
    type: Number,
    default: 0
  },

  totalExpense: {
    type: Number,
    default: 0
  },

  savings: {
    type: Number,
    default: 0
  }
}); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true, 
        unique: true},
    password: {
        type: String,
        required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    months: [monthSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;