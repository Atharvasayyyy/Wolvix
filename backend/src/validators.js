const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

module.exports = {
  register: Joi.object({
    name: Joi.string().min(2).max(80).required(),
    username: Joi.string().alphanum().min(3).max(30).lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(128).required()
  }),

  login: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
  }),

  profileUpdate: Joi.object({
    name: Joi.string().min(2).max(80),
    username: Joi.string().alphanum().min(3).max(30).lowercase(),
    profilePhoto: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    bio: Joi.string().max(1000).allow(""),
    skills: Joi.array().items(Joi.string().max(60)).max(100),
    education: Joi.array().items(Joi.object()).max(30),
    certifications: Joi.array().items(Joi.object()).max(50),
    experience: Joi.array().items(Joi.object()).max(50),
    socialLinks: Joi.object({
      github: Joi.string().uri().allow(""),
      linkedin: Joi.string().uri().allow(""),
      leetcode: Joi.string().uri().allow(""),
      portfolio: Joi.string().uri().allow(""),
      other: Joi.array().items(Joi.object({ label: Joi.string(), url: Joi.string().uri() }))
    }),
    location: Joi.object({
      city: Joi.string().allow(""),
      state: Joi.string().allow(""),
      country: Joi.string().allow(""),
      remote: Joi.boolean()
    })
  }),

  ideaCreate: Joi.object({
    title: Joi.string().min(5).max(140).required(),
    summary: Joi.string().min(20).max(300).required(),
    problem: Joi.string().min(20).required(),
    solution: Joi.string().min(20).required(),
    market: Joi.string().allow(""),
    stage: Joi.string().valid("idea", "prototype", "mvp", "launched", "scaling"),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string().lowercase()).max(12),
    collaborationNeeds: Joi.array().items(Joi.string()).max(20),
    status: Joi.string().valid("draft", "published")
  }),

  ideaUpdate: Joi.object({
    title: Joi.string().min(5).max(140),
    summary: Joi.string().min(20).max(300),
    problem: Joi.string().min(20),
    solution: Joi.string().min(20),
    market: Joi.string().allow(""),
    stage: Joi.string().valid("idea", "prototype", "mvp", "launched", "scaling"),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string().lowercase()).max(12),
    collaborationNeeds: Joi.array().items(Joi.string()).max(20),
    status: Joi.string().valid("draft", "published", "archived")
  }),

  commentCreate: Joi.object({
    body: Joi.string().min(1).max(3000).required(),
    parent: objectId.allow(null),
    mentions: Joi.array().items(objectId).max(25)
  }),

  teamCreate: Joi.object({
    idea: objectId,
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(20).required(),
    openRoles: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      category: Joi.string().valid("developer", "designer", "marketer", "founder", "product", "sales", "other").required(),
      description: Joi.string().required(),
      skills: Joi.array().items(Joi.string()),
      isOpen: Joi.boolean()
    }))
  }),

  roleCreate: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().valid("developer", "designer", "marketer", "founder", "product", "sales", "other").required(),
    description: Joi.string().required(),
    skills: Joi.array().items(Joi.string()),
    isOpen: Joi.boolean()
  }),

  applicationCreate: Joi.object({
    message: Joi.string().min(10).max(2000).required(),
    portfolioLinks: Joi.array().items(Joi.string().uri()).max(10)
  }),

  applicationDecision: Joi.object({
    status: Joi.string().valid("accepted", "rejected").required()
  })
};
