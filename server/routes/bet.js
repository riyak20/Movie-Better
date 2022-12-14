const express = require("express");
const Router = express.Router();
const Bet = require("../model/betModel");
const User = require("../model/userModel");

//Routes for anything related to betting; getting current bets, making/setting bets

Router.get("/getbet", async(req, res) => {
    const amount = await Bet.find({});
    res.send(amount);
});

Router.get("/getbet/:uid/:nmid/:rating", async(req, res) => {
    const uid = req.params.uid;
    const nmid = req.params.nmid;
    const rating = parseFloat(req.params.rating);
    const amount = await Bet.find({"uid":uid, "nmid":nmid, "rating":rating});
    res.send(amount);
});

Router.get("/getbetuid/:uid", async(req, res) => {
    const uid = req.params.uid;
    const amount = await Bet.find({"uid":uid});
    res.send(amount);
});

Router.get("/getbetnmid/:nmid", async(req, res) => {
    const nmid = req.params.nmid;
    const amount = await Bet.find({"nmid":nmid});
    res.send(amount);
});

//Routes for creating our first leaderboard, which is the most money spent by a given user
Router.get("/leaderboard1", async(req, res) => {
    const bets = await Bet.find({}).sort({"amount":-1}).limit(5);

    const bet_size = []
    bets.forEach(bet => {
        bet_size.push([bet["uid"], bet["amount"]]);
    });
    for (let i = 0; i < bet_size.length; i++){
        const data = await User.find({"uid":bet_size[i][0]});
        // console.log(data)
        const name = data[0]["username"]
        bet_size[i][0] = name
    }
    res.send(bet_size);
});

//Routes for creating our second leaderboard, which is who has placed the most amount of bets
Router.get("/leaderboard2", async(req, res) => {
    const users = await User.find({})
    const data = []

    for (let i = 0; i < users.length; i++){
        const bets = await Bet.find({"uid":users[i]["uid"]})
        const size = bets.length;
        data.push([users[i]["username"], size])
    }

    let sorted_data = data.sort(function(a, b){return - a[1] + b[1];})
    sorted_data = sorted_data.slice(0, 5);
    res.send(sorted_data);

});

Router.put("/setbet", async(req, res) => {
    const amount = new Bet(req.body);
    try {
        await amount.save();
        res.send("Success");
    }
    catch(error){
        res.status(500).send(error);
    }
});

//This is the route for when a user wants to edit the amount of their current bet
Router.put("/editbet/:uid/:nmid/:rating/:amount", async(req, res) => {
    const uid = req.params.uid;
    const nmid = req.params.nmid;
    const rating = parseFloat(req.params.rating);
    const amount = parseFloat(req.params.amount);

    const bet = await Bet.find({"uid":uid, "nmid":nmid, "rating":rating})
    bet[0].amount += amount;
    await bet[0].save();

    const user = await User.find({"uid":uid});
    user[0].balance -= amount;
    await user[0].save();
    res.send(user)[0];
});

module.exports = Router;