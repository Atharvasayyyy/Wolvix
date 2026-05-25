const path = require("path");
const Profile = require("../models/Profile");
const Resume = require("../models/Resume");
const Upload = require("../models/Upload");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { awardPoints } = require("../utils/reputation");

const fakeResumeParse = (file) => ({
  skills: [],
  education: [],
  certifications: [],
  projects: [],
  experience: [`Uploaded ${file.originalname}. Add manual parsed fields from the profile editor.`]
});

exports.uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError("File is required", 400);

  const purpose = req.body.purpose || "other";
  const upload = await Upload.create({
    owner: req.user._id,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: `/uploads/${path.basename(req.file.path)}`,
    purpose
  });

  if (purpose === "profile_photo") await Profile.findOneAndUpdate({ user: req.user._id }, { profilePhoto: upload.url }, { upsert: true });
  if (purpose === "cover_image") await Profile.findOneAndUpdate({ user: req.user._id }, { coverImage: upload.url }, { upsert: true });

  res.status(201).json({ success: true, upload });
});

exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError("Resume file is required", 400);

  const upload = await Upload.create({
    owner: req.user._id,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: `/uploads/${path.basename(req.file.path)}`,
    purpose: "resume"
  });

  const resume = await Resume.create({
    user: req.user._id,
    file: upload._id,
    parsed: fakeResumeParse(req.file)
  });

  await Profile.findOneAndUpdate({ user: req.user._id }, { resume: resume._id }, { upsert: true });
  await awardPoints(req.user._id, "resume_uploaded", "Resume", resume._id);
  res.status(201).json({ success: true, upload, resume });
});
