import { Card } from "@/components/ui/card";

export function StatCard({ label, value, detail }) {
  return (
    <Card className="min-h-32">
      <p className="text-xs font-semibold uppercase text-white/45">{label}</p>
      <strong className="mt-3 block font-display text-3xl text-white">{value}</strong>
      {detail ? <span className="mt-2 block text-sm text-white/54">{detail}</span> : null}
    </Card>
  );
}
