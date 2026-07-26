const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

// GET all workouts (only this user's)
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(workouts)
}

// GET a single workout (only if it belongs to this user)
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOne({ _id: id, user_id: req.user._id })

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// CREATE a new workout, owned by this user
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  const emptyFields = []
  if (!title) emptyFields.push('title')
  if (!load) emptyFields.push('load')
  if (!reps) emptyFields.push('reps')

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(201).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE a workout (only if it belongs to this user)
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id, user_id: req.user._id })

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// UPDATE a workout (only if it belongs to this user)
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id, user_id: req.user._id },
    { ...req.body },
    { new: true }
  )

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
