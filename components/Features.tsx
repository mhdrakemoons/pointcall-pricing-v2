const features = [
	{
		title: 'Product Strategy',
		desc: 'Shape your roadmap with clear prioritization, research-driven insights, and measurable outcomes.',
	},
	{
		title: 'UX & Interface Design',
		desc: 'Minimal, modern interfaces with a refined design system and thoughtful states.',
	},
	{
		title: 'Full-stack Engineering',
		desc: 'Scalable React and Next.js engineering with testing, performance, and accessibility in mind.',
	},
	{
		title: 'Pricing & Packaging',
		desc: 'Transparent pricing frameworks that scale from startup to enterprise.',
	},
]

export function Features() {
	return (
		<section id="features" className="section">
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{features.map((f) => (
					<div key={f.title} className="sheet p-6">
						<h3 className="text-base font-semibold text-white">{f.title}</h3>
						<p className="mt-2 text-sm text-text-muted">{f.desc}</p>
					</div>
				))}
			</div>
		</section>
	)
}


