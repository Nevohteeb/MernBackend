// all the endpoints for our workouts
// bring in express:
const express = require('express');
const router = express.Router();

// Multer JS Initialisation:
const multer = require('multer')
const path = require("path")

// Configure Multers Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // the unique filename
    }
});

const upload = multer({storage}); // public

// import the controller functions
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

// router variable + http method to create a route
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', upload.single('image'), createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;