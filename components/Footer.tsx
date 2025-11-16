'use client'

export function Footer() {
	return (
		<footer className="section">
			<div className="container">
				<div className="sheet p-6 md:p-8">
					<div className="flex items-start">
						<div>
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 rounded-xl bg-accent/90" />
								<span className="font-semibold">PointCall</span>
							</div>
						</div>
					</div>
					<div className="mt-6 border-t border-white/10 pt-4 text-2xs text-text-muted">
						© {new Date().getFullYear()} PointCall, Inc. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	)
}


