const Job = require("../models/Job");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");

exports.listJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ status: req.query.status || "open" }).populate("owner", "name username").sort({ createdAt: -1 });
  res.json({ success: true, jobs });
});

exports.createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    ...req.body,
    owner: req.user._id,
    slug: await createUniqueSlug(Job, req.body.title)
  });
  res.status(201).json({ success: true, job });
});

exports.getJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug }).populate("owner", "name username");
  if (!job) throw new AppError("Job not found", 404);
  res.json({ success: true, job });
});

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndUpdate({ slug: req.params.slug, owner: req.user._id }, req.body, { new: true });
  if (!job) throw new AppError("Job not found or not owned by you", 404);
  res.json({ success: true, job });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndUpdate({ slug: req.params.slug, owner: req.user._id }, { status: "archived" }, { new: true });
  if (!job) throw new AppError("Job not found or not owned by you", 404);
  res.json({ success: true, job });
});

exports.applyToJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { slug: req.params.slug, "applications.applicant": { $ne: req.user._id } },
    {
      $push: {
        applications: {
          applicant: req.user._id,
          portfolioUrl: req.body.portfolioUrl,
          message: req.body.message
        }
      }
    },
    { new: true }
  );
  if (!job) throw new AppError("Job not found or already applied", 404);
  res.status(201).json({ success: true, application: job.applications.at(-1), job });
});
