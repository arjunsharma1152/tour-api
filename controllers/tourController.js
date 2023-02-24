const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev_data/data/tours-simple.json`));

exports.getAllTours = (req,res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {tours}
    })
    };

exports.getTour = (req,res) => {   

    res.status(200).json({
        status: 'success',
        data: {
            tours: tours[req.params.id]
        }
    })
    };

exports.updateTour = (req,res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: "fail",
            message: "Invalid"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tours: "<Updated tours..>"
        }
    })

};

exports.addTour = (req,res) => {
    // console.log(req.body);
    
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    
    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev_data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
        status: "success",
        data: {
            tour: newTour
        }
    })
    })
    };