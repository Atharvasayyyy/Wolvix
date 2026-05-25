export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-normal text-cyan">{eyebrow}</p> : null}
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
