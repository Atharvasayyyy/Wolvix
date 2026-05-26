"use client";

import { Link } from "@/lib/router";
import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/hooks";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

function LoginForm() {
  const login = useLogin();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  return (
    <Card className="w-full max-w-md">
      <p className="text-xs font-bold uppercase text-cyan">Wolvix access</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Welcome back</h1>
      <form className="mt-6 grid gap-3" onSubmit={form.handleSubmit((values) => login.mutate(values))}>
        <Input placeholder="Email" {...form.register("email")} />
        <Input type="password" placeholder="Password" {...form.register("password")} />
        {login.error ? <p className="text-sm text-rose">{login.error.message}</p> : null}
        <Button type="submit" disabled={login.isPending}>{login.isPending ? "Signing in..." : "Login"}</Button>
      </form>
      <div className="mt-5 flex justify-between text-sm text-white/54">
        <Link href="/forgot-password">Forgot password</Link>
        <Link href="/signup">Create account</Link>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Suspense fallback={<Card className="w-full max-w-md">Loading login...</Card>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
