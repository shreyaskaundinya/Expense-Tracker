const mongoose = require('mongoose');
var Expense = new mongoose.Schema({
    User: {
        type: String,
    },
    desc: {
        type: String,
        default: '',
    },
    amount: {
        type: Number,
    },
    category: {
        type: String,
    },
    date: {
        type: Object,
    },
});

module.exports = mongoose.model('Expense', Expense);
