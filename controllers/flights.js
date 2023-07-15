const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show,

  };
  function newFlight(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render('flights/new', { errorMsg: '' });
  }

async function create(req, res) {
    try {
      
      let flight =await new Flight()
      flight.airline=req.body.airline
      flight.flightNo=req.body.flightNo
      console.log(new Flight())
     if(req.body.departs){
      flight.departs=req.body.departs
      
     }
     if(req.body.airport){
      flight.airport=req.body.airport
      
     }
      flight.save()
       
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

async function show(req, res) {
  const flight = await Flight.findById(req.params.id)
  const tickets=await Ticket.find({flight: flight._id})
  res.render('flights/show', { title: 'flight Detail', flight, tickets });
    }
