# Wolvix Backend API

Base URL: `/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /auth/me`

## Profiles

- `GET /profiles/:username`
- `PATCH /profiles/me/update`

## Ideas

- `GET /ideas`
- `GET /ideas/trending`
- `POST /ideas`
- `GET /ideas/:slug`
- `PATCH /ideas/:slug`
- `DELETE /ideas/:slug`
- `POST /ideas/:slug/upvote`
- `POST /ideas/:slug/bookmark`

## Comments

- `GET /ideas/:slug/comments`
- `POST /ideas/:slug/comments`
- `PATCH /ideas/:slug/comments/:commentId`
- `DELETE /ideas/:slug/comments/:commentId`
- `POST /ideas/:slug/comments/:commentId/upvote`

## Teams

- `GET /teams`
- `POST /teams`
- `GET /teams/:slug`
- `POST /teams/:slug/roles`
- `POST /teams/:slug/roles/:roleId/apply`
- `PATCH /teams/applications/:applicationId`

## Uploads

- `POST /uploads/asset`
- `POST /uploads/resume`

## Gamification

- `GET /badges`
- `GET /badges/leaderboard`
- `POST /badges/:userId/award`

## Notifications

- `GET /notifications`
- `PATCH /notifications/:id/read`

## Launches

- `GET /launches`
- `POST /launches`
- `GET /launches/:slug`
- `PATCH /launches/:slug`
- `DELETE /launches/:slug`
- `POST /launches/:slug/upvote`
- `POST /launches/:slug/bookmark`

## Jobs

- `GET /jobs`
- `POST /jobs`
- `GET /jobs/:slug`
- `PATCH /jobs/:slug`
- `DELETE /jobs/:slug`
- `POST /jobs/:slug/apply`

## AI Tools

- `POST /ai/tools/:tool/run`
- `POST /ai/ideas/generate`
- `POST /ai/ideas/score`
- `POST /ai/matches`
- `POST /ai/:tool`

## Admin

- `GET /admin/stats`
- `PATCH /admin/ideas/:ideaId/moderate`
