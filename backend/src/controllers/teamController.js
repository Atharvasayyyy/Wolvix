const Application = require("../models/Application");
const Notification = require("../models/Notification");
const Team = require("../models/Team");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");
const { awardPoints } = require("../utils/reputation");

exports.createTeam = asyncHandler(async (req, res) => {
  const team = await Team.create({
    ...req.body,
    owner: req.user._id,
    slug: await createUniqueSlug(Team, req.body.name),
    members: [{ user: req.user._id, role: "owner", title: "Founder" }]
  });

  res.status(201).json({ success: true, team });
});

exports.listTeams = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const teams = await Team.find(filter).populate("owner", "name username").sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, teams });
});

exports.getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findOne({ slug: req.params.slug }).populate("owner members.user", "name username");
  if (!team) throw new AppError("Team not found", 404);
  res.json({ success: true, team });
});

exports.addRole = asyncHandler(async (req, res) => {
  const team = await Team.findOneAndUpdate(
    { slug: req.params.slug, owner: req.user._id },
    { $push: { openRoles: req.body } },
    { new: true }
  );

  if (!team) throw new AppError("Team not found or not owned by you", 404);
  res.status(201).json({ success: true, team });
});

exports.applyToRole = asyncHandler(async (req, res) => {
  const team = await Team.findOne({ slug: req.params.slug });
  if (!team) throw new AppError("Team not found", 404);

  const role = team.openRoles.id(req.params.roleId);
  if (!role || !role.isOpen) throw new AppError("Open role not found", 404);

  const application = await Application.create({
    ...req.body,
    team: team._id,
    roleId: role._id,
    applicant: req.user._id
  });

  await Notification.create({
    recipient: team.owner,
    actor: req.user._id,
    type: "role_application",
    title: "New role application",
    body: `${req.user.name} applied for ${role.title}`,
    link: `/teams/${team.slug}`
  });

  res.status(201).json({ success: true, application });
});

exports.decideApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.applicationId);
  if (!application) throw new AppError("Application not found", 404);

  const team = await Team.findOne({ _id: application.team, owner: req.user._id });
  if (!team) throw new AppError("Only the team owner can decide applications", 403);

  application.status = req.body.status;
  application.decidedBy = req.user._id;
  application.decidedAt = new Date();
  await application.save();

  if (req.body.status === "accepted") {
    await Team.findByIdAndUpdate(team._id, { $addToSet: { members: { user: application.applicant, role: "member" } } });
    await awardPoints(application.applicant, "role_accepted", "Application", application._id);
  }

  await Notification.create({
    recipient: application.applicant,
    actor: req.user._id,
    type: req.body.status === "accepted" ? "application_accepted" : "application_rejected",
    title: req.body.status === "accepted" ? "Application accepted" : "Application rejected",
    link: `/teams/${team.slug}`
  });

  res.json({ success: true, application });
});
