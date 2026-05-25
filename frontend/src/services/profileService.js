import { request } from "./client";

export const profileService = {
  getByUsername: (username) => request({ method: "GET", url: `/profiles/${username}` }),

  updateMe: (payload) =>
    request({ method: "PATCH", url: "/profiles/me/update", data: payload }),

  uploadAsset: (file, purpose) => {
    const form = new FormData();
    form.append("file", file);
    form.append("purpose", purpose);
    return request({ method: "POST", url: "/uploads/asset", data: form, headers: { "Content-Type": "multipart/form-data" } });
  },

  uploadResume: (file) => {
    const form = new FormData();
    form.append("resume", file);
    return request({ method: "POST", url: "/uploads/resume", data: form, headers: { "Content-Type": "multipart/form-data" } });
  }
};
