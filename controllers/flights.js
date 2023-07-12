const Flight = require('../models/flight');
module.exports = {
    new: newFlight,
    create,
    index

  };
  function newFlight(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render('flights/new', { errorMsg: '' });
  }

async function create(req, res) {
    try {
        await Flight.create(req.body);
       
        res.redirect('/flights');
      } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
      }
}

async function index(req, res){
    try {
const foundFlights= await Flight.find({});
console.log(foundFlights);
res.render("flights/index",{flights:foundFlights})
    }catch(err){
        console.log(err);
    }
}