type Props = {
	id?: string
	label: string
	title: string
	desc?: string
}

export function SectionHeading({ id, label, title, desc }: Props) {
	return (
		<div id={id} className="container">
			<div className="mx-auto max-w-3xl text-center">
				<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-2xs text-text-muted">
					<span className="h-2 w-2 rounded-full bg-accent shadow-soft" />
					{label}
				</div>
				<h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white tracking-tight">{title}</h2>
				{desc ? <p className="mt-3 text-text-muted">{desc}</p> : null}
			</div>
		</div>
	)
}


