# Wolvix API Connection Map

This frontend uses React.js with JavaScript per the MERN-only project instruction, while preserving the requested architecture: centralized Axios services, React Query hooks, Zustand state, protected routes, and modular app pages.

| API | Method | Page | Component | Hook | Zustand | Flow | Auth | Loading | Error | Optimistic | Cache |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/api/auth/register` | POST | `/signup` | `SignupPage` | `useRegister` | `auth-store.setSession` | Signup -> Dashboard | Public | `isPending` | mutation error | No | invalidate `auth` |
| `/api/auth/login` | POST | `/login` | `LoginForm` | `useLogin` | `auth-store.setSession` | Login -> redirect param/Dashboard | Public | `isPending` | mutation error | No | invalidate `auth` |
| `/api/auth/logout` | POST | `TopNav` | `TopNav` | `useLogout` | `auth-store.clearSession` | Protected page -> Home | Auth | action state | cleanup fallback | Local session clear | clear query cache |
| `/api/auth/refresh-token` | POST | All API pages | Axios interceptor | implicit | localStorage token keys | 401 -> refresh -> retry | Refresh token | transparent | redirect to login | No | retry original |
| `/api/auth/me` | GET | All pages | `SessionBootstrap` | `useMe` | auth user/profile | Session persistence | Auth | background | interceptor | No | `auth.me` |
| `/api/profiles/:username` | GET | `/profile/[username]` | `ProfilePage` | `useProfile` | none | Profile links -> Profile | Public | loading text | error text | No | profile key |
| `/api/profiles/me/update` | PATCH | `/settings/profile` | `ProfileSettingsPage` | `useUpdateProfileMutation` | auth refresh | Settings -> Profile | Auth | `isPending` | mutation error | No | `auth.me`, profiles |
| `/api/uploads/asset` | POST | `/settings/profile` | profile upload inputs | `useUploadProfileAssetMutation` | profile refresh | Upload -> Profile | Auth | pending eligible | mutation error | No | `auth.me`, profiles |
| `/api/uploads/resume` | POST | `/settings/profile` | resume input | `useUploadResumeMutation` | profile refresh | Upload -> Resume data | Auth | pending eligible | mutation error | No | `auth.me`, profiles |
| `/api/ideas` | GET | `/ideas`, `/dashboard` | `IdeaCard` | `useIdeas` | none | Landing -> Explore Ideas | Public | skeletons | error text | No | `ideas` |
| `/api/ideas/trending` | GET | `/ideas` | trending chips | `useTrendingIdeas` | none | Trending -> Idea detail | Public | passive | empty fallback | No | `ideas/trending` |
| `/api/ideas` | POST | `/ideas/create` | `IdeaEditor` | `useCreateIdea` | none | Create -> Idea detail | Auth | `isPending` | mutation error | No | invalidate `ideas` |
| `/api/ideas/:slug` | GET/PATCH/DELETE | `/ideas/[id]` | `IdeaDetailPage` | `useIdea` | none | Ideas -> Detail -> Teams | Mixed | loader | not found/error | mutation invalidation | `ideas`, detail |
| `/api/ideas/:slug/upvote` | POST | `/ideas/[id]` | upvote action | `useIdeaAction` | none | Detail/Card stays put | Auth | pending eligible | mutation error | Recommended | invalidate `ideas` |
| `/api/ideas/:slug/bookmark` | POST | `/ideas/[id]` | bookmark action | `useIdeaAction` | none | Detail/Card stays put | Auth | pending eligible | mutation error | Recommended | invalidate `ideas` |
| `/api/ideas/:slug/comments` | GET/POST | `/ideas/[id]` | comment thread/input | `useIdeaComments`, `useCreateIdeaComment` | none | Detail comments | Public/Auth | section state | query/mutation error | Yes | comments key |
| `/api/ideas/:slug/comments/:commentId` | PATCH/DELETE | `/ideas/[id]` | comment actions | `useIdeaCommentAction` | none | Detail comments | Auth owner | pending eligible | mutation error | Recommended | comments key |
| `/api/ideas/:slug/comments/:commentId/upvote` | POST | `/ideas/[id]` | comment actions | `useIdeaCommentAction` | none | Detail comments | Auth | pending eligible | mutation error | Recommended | comments key |
| `/api/teams` | GET/POST | `/teams`, `/projects`, `/dashboard` | `TeamBoard`, `RoleCard` | `useTeams`, `useCreateTeam` | none | Build With Me -> Workspace | Mixed | loading card | error card | No | `teams` |
| `/api/teams/:slug` | GET | `/workspace/[projectId]` | workspace board | `useTeam` | none | Projects/Teams -> Workspace | Public | loading text | error text | No | team detail |
| `/api/teams/:slug/roles` | POST | workspace/team owner flow | `RoleCard` | service available | none | Owner adds role | Auth owner | pending eligible | mutation error | No | teams/team |
| `/api/teams/:slug/roles/:roleId/apply` | POST | `/teams` | `ApplyButton` | `useApplyToTeamRole` | none | Teams -> application | Auth | `isPending` | mutation error eligible | Button success | teams/team |
| `/api/teams/applications/:applicationId` | PATCH | `/workspace/[projectId]` | applicant decision flow | `useDecideTeamApplication` | none | Workspace owner decision | Auth owner | pending eligible | mutation error | Optional | teams |
| `/api/badges` | GET | `/achievements`, profile | badge cards | `useBadges` | none | Profile -> Achievements | Public | loading text | error text | No | badges |
| `/api/badges/leaderboard` | GET | `/leaderboard`, dashboard | leaderboard table | `useLeaderboard` | none | Leaderboard -> Profile | Public | eligible | eligible | No | leaderboard |
| `/api/notifications` | GET | `/notifications`, TopNav | list/badge | `useNotifications` | `notification-store` | Dashboard <-> Notifications | Auth | loading text | error text | No | notifications |
| `/api/notifications/:id/read` | PATCH | `/notifications` | read action | `useMarkNotificationRead` | `notification-store` | Notification -> linked page | Auth | pending eligible | mutation error | Yes | notifications |
| `/api/launches` | GET/POST | `/launches` | launch cards | `useLaunches` | none | Workspace -> Launches | Mixed | loading text | error text | No | launches |
| `/api/launches/:slug` | GET/PATCH/DELETE | `/launches/[id]` | gallery/changelog | `useLaunch` | none | Launches -> Detail -> Hiring | Mixed | loading text | error text | No | launches/detail |
| `/api/launches/:slug/upvote` | POST | launch detail | metrics action | service available | none | stay on launch | Auth | pending eligible | mutation error | Recommended | launches |
| `/api/launches/:slug/bookmark` | POST | launch detail | metrics action | service available | none | stay on launch | Auth | pending eligible | mutation error | Recommended | launches |
| `/api/jobs` | GET/POST | `/hiring` | job cards | `useJobs` | none | Launch -> Hiring | Mixed | loading text | error text | No | jobs |
| `/api/jobs/:slug` | GET/PATCH/DELETE | `/jobs/[id]` | application form | `useJob` | none | Hiring -> Job detail | Mixed | loading text | error text | No | job detail |
| `/api/jobs/:slug/apply` | POST | `/jobs/[id]` | application form | `useApplyToJob` | none | Job detail -> submitted | Auth | `isPending` | mutation error | success message | job detail |
| `/api/ai/tools/:tool/run` | POST | `/ai-tools` | AI tool panel | `useAiTool` | none | Nav -> AI Tools | Auth | `isPending` | eligible | No | none |
| `/api/ai/ideas/generate` | POST | future AI idea flow | service available | `aiApi.generateIdea` | none | AI -> Idea draft | Auth | eligible | eligible | No | none |
| `/api/ai/ideas/score` | POST | future AI scoring flow | service available | `aiApi.scoreIdea` | none | AI -> Idea validation | Auth | eligible | eligible | No | none |
| `/api/ai/matches` | POST | future matching flow | service available | `aiApi.matchCollaborators` | none | AI -> collaborator matches | Auth | eligible | eligible | No | none |

## Verified Navigation Flow

- Landing -> Explore Ideas -> Idea Details -> Build With Me (`/teams?idea=slug`) -> Workspace -> Launches -> Hiring.
- Dashboard links to notifications, current ideas, team workspace, launches, and hiring.
- Profile links are used by leaderboard/nav and route to `/profile/[username]`.
- Ideas connect to comments, upvotes, bookmarks, and team applications through the team marketplace.

## Realtime-Ready Architecture

`RealtimeProvider` currently keeps notifications synced with authenticated React Query polling and a Zustand `notification-store`. Socket.IO can replace the polling layer later without changing page components.
