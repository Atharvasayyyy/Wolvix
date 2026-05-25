import { Card } from "@/components/ui/card";

export function EmptyState({ title, description, action }) {
  return (
    <Card className="grid min-h-56 place-items-center text-center">
      <div className="max-w-md">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/56">{description}</p>
        {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </Card>
  );
}
