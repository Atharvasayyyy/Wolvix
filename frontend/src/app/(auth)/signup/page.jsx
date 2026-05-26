"use client";

import { Link } from "@/lib/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/features/auth/hooks";

const schema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export default function SignupPage() {
  const register = useRegister();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", username: "", email: "", password: "" } });

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <p className="text-xs font-bold uppercase text-cyan">Create builder profile</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Join Wolvix</h1>
        <form className="mt-6 grid gap-3" onSubmit={form.handleSubmit((values) => register.mutate(values))}>
          <Input placeholder="Name" {...form.register("name")} />
          <Input placeholder="Username" {...form.register("username")} />
          <Input placeholder="Email" {...form.register("email")} />
          <Input type="password" placeholder="Password" {...form.register("password")} />
          {register.error ? <p className="text-sm text-rose">{register.error.message}</p> : null}
          <Button disabled={register.isPending}>{register.isPending ? "Creating..." : "Create account"}</Button>
        </form>
        <p className="mt-5 text-sm text-white/54">Already building here? <Link href="/login" className="text-cyan">Login</Link></p>
      </Card>
    </main>
  );
}
