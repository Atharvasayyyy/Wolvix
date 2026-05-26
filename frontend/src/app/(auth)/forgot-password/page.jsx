import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <p className="text-xs font-bold uppercase text-cyan">Recovery</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Reset password</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">Password recovery is not exposed by this MERN backend yet. Use the login page for active auth flows while the reset endpoint is added.</p>
        <Button className="mt-6" asChild><Link href="/login">Back to login</Link></Button>
      </Card>
    </main>
  );
}
