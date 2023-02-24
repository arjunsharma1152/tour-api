const express = require("express");

const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    console.log("Hello from middleware!!");
    next();
});

app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})


// app.get("/",(req,res) => {
//     res.status(200).json({message : "Hello from the server!"});
// });

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.post("/api/v1/tours", addTour);


app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

module.exports = app;