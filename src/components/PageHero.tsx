type PageHeroProps = {
  title: string;
  subtitle: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#081a2d] to-[#163a5c] text-white">
      <div className="absolute inset-0 bg-industrial-grid bg-grid opacity-25" />
      <div className="container-shell relative py-14">
        <p className="industrial-tag">Dongchi Industrial Portal</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-wide sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100 sm:text-base">{subtitle}</p>
      </div>
    </section>
  );
}
