import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

export function Hero() {
	return (
		<section className="section">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
				<div>
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-2xs text-text-muted">
						<span className="h-2 w-2 rounded-full bg-accent shadow-soft" />
						Polished, Apple-inspired Portfolio
					</div>
					<h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
						Build better products. Price them clearly.
					</h1>
					<p className="mt-4 text-base md:text-lg text-text-muted">
						I design and build delightful, scalable SaaS experiences. Explore services, real projects,
						and a spreadsheet-like pricing grid with rich details.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<a href="#pricing" className="btn btn-primary">
							View Pricing
						</a>
						<a href="#projects" className="btn btn-secondary">
							View Projects
						</a>
					</div>
					<div className="mt-8 flex items-center gap-2 text-text-muted">
						<ArrowDownCircleIcon className="h-5 w-5 text-accent" aria-hidden="true" />
						<span className="text-sm">Scroll to explore</span>
					</div>
				</div>
				<div className="relative">
					<div className="sheet p-6 md:p-8">
						<div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5 grid place-items-center">
							<div className="text-center">
								<div className="mx-auto h-16 w-16 rounded-2xl bg-accent/90 shadow-soft" />
								<p className="mt-4 text-text-muted">Elegant interfaces. Thoughtful systems.</p>
							</div>
						</div>
					</div>
					<div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-accent/20 to-transparent blur-3xl" />
				</div>
			</div>
		</section>
	)
}


