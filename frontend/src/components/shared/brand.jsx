import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan/40 bg-cyan/12 text-cyan shadow-[0_0_24px_rgba(53,229,255,0.25)]">W</span>
      Wolvix
    </Link>
  );
}
