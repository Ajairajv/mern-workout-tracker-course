const express = require('express');
const Workout = require('../models/workoutModel')

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({message:'Get all workouts'})
})

// get a single workout
router.get('/:id',(req,res)=>{
    res.json({message:'Get a single workout'})
})


// post a new workout
router.post('/',(req,res)=>{
    // const {title,load,reps}=req.body
    // try{
    //     const workout = await Workout.create({title,load,reps})
    //     res.status(200).json(workout)
    // }catch(error){
    //     res.status(400).json({error: error.message})
    // }
     res.json({message:'Post a new workout'})
})


// Delete a new workout
router.delete('/:id',(req,res)=>{
    res.json({message:'Delete a workout'})
})


// update a new workout
router.patch('/:id',(req,res)=>{
    res.json({message:'update a workout'})
})

// router.get('/', (req, res) => {})


module.exports = router