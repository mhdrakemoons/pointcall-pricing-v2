import Link from 'next/link'

export function Navbar() {
	return (
		<header className="z-40 backdrop-blur supports-[backdrop-filter]:bg-surface/50 bg-surface/70 border-b border-white/10">
			<div className="container flex h-16 items-center justify-between">
				<Link href="#" className="flex items-center gap-2" aria-label="Home">
					<div className="h-8 w-8 rounded-xl bg-accent/90 shadow-soft" />
					<span className="text-sm md:text-base font-semibold tracking-tight">PointCall</span>
				</Link>
				<div className="flex items-center gap-3">
					<a href="#pricing" className="btn btn-secondary">View Pricing</a>
					<a href="#revenue" className="btn btn-primary">View Income</a>
				</div>
			</div>
		</header>
	)
}


