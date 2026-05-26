const Job = require("../models/Job");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");
const getPagination = require("../utils/pagination");

exports.listJobs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query, { limit: 12, maxLimit: 50 });
  const filter = { status: req.query.status || "open" };
  if (req.query.type) filter.type = req.query.type;
  if (req.query.q) filter.$text = { $search: req.query.q };

  const [jobs, total] = await Promise.all([
    Job.find(filter).populate("owner", "name username").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(filter)
  ]);

  res.json({ success: true, jobs, page, limit, total });
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
  const existing = await Job.findOne({ slug: req.params.slug }).select("owner title slug status");
  if (!existing || existing.status !== "open") throw new AppError("Open job not found", 404);
  if (existing.owner.equals(req.user._id)) throw new AppError("You cannot apply to your own job", 400);

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

  await Notification.create({
    recipient: job.owner,
    actor: req.user._id,
    type: "job_application",
    title: "New job application",
    body: `${req.user.name} applied for ${job.title}`,
    link: `/jobs/${job.slug}`
  });

  res.status(201).json({ success: true, application: job.applications.at(-1), job });
});
