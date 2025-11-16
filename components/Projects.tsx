const projects = [
	{
		name: 'Shiftboard',
		desc: 'Scheduling platform redesign with performance-focused React architecture.',
	},
	{
		name: 'Atlas Metrics',
		desc: 'Analytics suite with an elegant, extensible component library.',
	},
	{
		name: 'Zen Support',
		desc: 'Support automation with a crisp, dark UI and smart workflows.',
	},
	{
		name: 'Nimbus Docs',
		desc: 'Collaborative docs with live presence and a powerful editor.',
	},
]

export function Projects() {
	return (
		<section id="projects" className="section">
			<div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{projects.map((p) => (
					<article key={p.name} className="sheet p-5 group hover:shadow-soft transition-shadow">
						<div className="aspect-video rounded-lg bg-gradient-to-br from-white/10 to-white/5" />
						<h3 className="mt-4 text-base font-semibold text-white">{p.name}</h3>
						<p className="mt-1 text-sm text-text-muted">{p.desc}</p>
					</article>
				))}
			</div>
		</section>
	)
}


