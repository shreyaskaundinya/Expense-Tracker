var express = require('express');
var cors = require('../utils/cors.util.js');
var moment = require('moment');
var Expense = require('../models/expense.model');
var router = express.Router();

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getExpenses(req, res) {
    const dates = req.body.dates;
    const user = req.body.user;
    if (dates.start === dates.end) {
        // find expenses in one particular day
        const expenses = await Expense.find({
            User: user._id,
            date: dates.start,
        });
        return res.status(200).json({ status: 200, expenses: expenses });
    } else {
        // console.log(dates.start, dates.end);
        const expenses = await Expense.find({
            User: user._id,
            date: { $gte: dates.start, $lte: dates.end },
        });
        return res.status(200).json({ status: 200, expenses: expenses });
    }
}

async function addExpense(req, res) {
    const expenseData = req.body.data;
    try {
        const newExpense = await Expense.create(expenseData);
        return res.status(200).json({ status: 200, newExpense: newExpense });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 200, err: 'error occurred. Try again.' });
    }
}

async function deleteExpense(req, res) {
    const expenseId = req.body._id;
    try {
        await Expense.deleteOne({ _id: expenseId });
        return res.status(200).json({ status: 200 });
    } catch (error) {
        return res
            .status(200)
            .json({ status: 200, err: 'error occurred. Try again.' });
    }
}

router
    .route('/expenses')
    .options(cors.whitelist, function (request, response) {
        response.sendStatus(200);
    })
    .get(notSupported)
    .post(addExpense)
    .put(notSupported)
    .delete(deleteExpense);

router
    .route('/expenses/get')
    .options(cors.whitelist, function (request, response) {
        response.sendStatus(200);
    })
    .get(notSupported)
    .post(getExpenses)
    .put(notSupported)
    .delete(notSupported);
module.exports = router;
