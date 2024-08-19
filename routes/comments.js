const express = require('express')
const router = express.Router()
const {
    createComment,
    editComment,
    deleteComment
} = require('../controllers/commentController')

// Create a new comment for a specific workout
router.post(`/workouts/:workoutId/comments`, createComment)

// Edit existing comment:
router.patch(`/workouts/:workoutId/comments`, editComment)

// Delete existing comment:
router.delete(`/workouts/:workoutId/comments`, deleteComment)

module.exports = router;