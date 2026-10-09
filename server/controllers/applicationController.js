const mongoose = require('mongoose');
const Application = require('../models/Application');
const { STATUSES } = require('../models/Application');

// Helper — escape regex special characters to safely use user input in RegExp
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/applications
// Query params: ?search=<string>  ?status=<string>
const getApplications = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      const escaped = escapeRegex(req.query.search);
      const regex = new RegExp(escaped, 'i');
      filter.$or = [{ company: regex }, { role: regex }];
    }

    const applications = await Application.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};

// GET /api/applications/stats
// Always returns all five statuses — 0 for empty ones
const getStats = async (req, res, next) => {
  try {
    const counts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Seed every status with 0, then overwrite with real counts
    const stats = STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    counts.forEach(({ _id, count }) => {
      stats[_id] = count;
    });

    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

// GET /api/applications/:id
const getApplication = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// POST /api/applications
const createApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// PUT /api/applications/:id
const updateApplication = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/applications/:id
const deleteApplication = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getApplications,
  getStats,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
