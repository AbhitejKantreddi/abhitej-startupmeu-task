const express = require('express');
const router = express.Router();
const {
  getApplications,
  getStats,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

// /stats MUST be defined before /:id so Express doesn't treat "stats" as an ObjectId
router.get('/stats', getStats);

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

module.exports = router;
