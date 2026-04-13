interface Props {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: Props) {
  return (
    <div className="mb-12 text-center">
      <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary glow-sm">
        {label}
      </span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
