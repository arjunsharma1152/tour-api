const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev_data/data/tours-simple.json`));

exports.checkId = (req,res,next,val) => {
    console.log(`Tour id : ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: "fail",
            message: "Invalid"
        })
    }
    next();
};

exports.checkBody = (req,res,next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: "fail",
            message: "missing price or name"
        })
    }
    next();
}

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