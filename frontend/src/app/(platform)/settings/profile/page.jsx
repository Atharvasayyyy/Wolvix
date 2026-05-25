"use client";

import { useState } from "react";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useUpdateProfileMutation, useUploadProfileAssetMutation, useUploadResumeMutation } from "@/features/profiles/profileHooks";
import { useAuthStore } from "@/store/auth-store";

export default function ProfileSettingsPage() {
  const { user, profile } = useAuthStore();
  const updateProfile = useUpdateProfileMutation();
  const uploadAsset = useUploadProfileAssetMutation();
  const uploadResume = useUploadResumeMutation();
  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: profile?.bio || "",
    skills: profile?.skills?.join(", ") || ""
  });

  return (
    <>
      <PageHeading eyebrow="Settings" title="Profile settings" description="Update identity, bio, skills, links, avatar, cover, and resume uploads through the profile APIs." />
      <Card>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            updateProfile.mutate({
              name: form.name,
              username: form.username,
              bio: form.bio,
              skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
            });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input value={form.name} placeholder="Name" onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <Input value={form.username} placeholder="Username" onChange={(event) => setForm({ ...form, username: event.target.value })} />
          </div>
          <Textarea value={form.bio} placeholder="Bio" onChange={(event) => setForm({ ...form, bio: event.target.value })} />
          <Input value={form.skills} placeholder="Skills" onChange={(event) => setForm({ ...form, skills: event.target.value })} />
          <div className="grid gap-4 md:grid-cols-3">
            <Input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadAsset.mutate({ file: event.target.files[0], purpose: "profile_photo" })} />
            <Input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadAsset.mutate({ file: event.target.files[0], purpose: "cover_image" })} />
            <Input type="file" accept=".pdf,.docx" onChange={(event) => event.target.files?.[0] && uploadResume.mutate(event.target.files[0])} />
          </div>
          <Button disabled={updateProfile.isPending}>{updateProfile.isPending ? "Saving..." : "Save profile"}</Button>
          {updateProfile.isSuccess ? <p className="text-sm text-emerald-300">Profile updated.</p> : null}
          {updateProfile.error ? <p className="text-sm text-rose">{updateProfile.error.message}</p> : null}
        </form>
      </Card>
    </>
  );
}
