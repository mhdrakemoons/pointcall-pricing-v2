'use client'

import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
	open: boolean
	onClose: () => void
	categoryName: string
	content: CategoryContent
}

export type CategoryContent = {
	sections: {
		title: string
		items: string[]
	}[]
}

export function CategoryInfoModal({ open, onClose, categoryName, content }: Props) {
	const scrollYRef = useRef(0)
	const isLockedRef = useRef(false)

	useEffect(() => {
		if (open) {
			// Save scroll position BEFORE any changes
			scrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0
			isLockedRef.current = true
			
			// Lock scroll by fixing body position - this preserves visual position
			const body = document.body
			const html = document.documentElement
			
			// Prevent any scroll while maintaining visual position
			body.style.position = 'fixed'
			body.style.top = `-${scrollYRef.current}px`
			body.style.left = '0'
			body.style.right = '0'
			body.style.width = '100%'
			body.style.overflow = 'hidden'
			html.style.overflow = 'hidden'
		} else {
			// Unlock scroll - restore position BEFORE removing fixed to prevent jump
			const body = document.body
			const html = document.documentElement
			const scrollY = scrollYRef.current
			
			// Restore scroll position FIRST (while still fixed, this won't be visible)
			window.scrollTo(0, scrollY)
			document.documentElement.scrollTop = scrollY
			
			// Then remove fixed positioning
			body.style.position = ''
			body.style.top = ''
			body.style.left = ''
			body.style.right = ''
			body.style.width = ''
			body.style.overflow = ''
			html.style.overflow = ''
			
			isLockedRef.current = false
		}
		
		return () => {
			// Cleanup on unmount
			if (isLockedRef.current) {
				const body = document.body
				const html = document.documentElement
				const scrollY = scrollYRef.current
				
				// Restore scroll position FIRST
				window.scrollTo(0, scrollY)
				document.documentElement.scrollTop = scrollY
				
				// Then remove fixed positioning
				body.style.position = ''
				body.style.top = ''
				body.style.left = ''
				body.style.right = ''
				body.style.width = ''
				body.style.overflow = ''
				html.style.overflow = ''
				
				isLockedRef.current = false
			}
		}
	}, [open])

	return (
		<Transition show={open} as={Fragment}>
			<Dialog 
				as="div" 
				className="relative z-50" 
				onClose={onClose}
				static
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/60" aria-hidden="true" onClick={onClose} />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto" style={{ scrollBehavior: 'auto' }}>
					<div className="flex min-h-full items-center justify-center p-4" style={{ scrollBehavior: 'auto' }}>
						<Transition.Child
							as={Fragment}
							enter="transition-all duration-200 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="transition-all duration-150 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#0b0c10] text-white shadow-soft ring-1 ring-white/10">
								<div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
									<div className="flex items-start justify-between gap-4 mb-6">
										<div>
											<Dialog.Title className="text-xl md:text-2xl font-semibold tracking-tight">
												{categoryName}
											</Dialog.Title>
											<div className="mt-1 h-0.5 w-12 bg-accent rounded-full" />
										</div>
										<button
											type="button"
											onClick={onClose}
											className="rounded-lg p-2 text-text-muted hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
											aria-label="Close"
										>
											<XMarkIcon className="h-5 w-5" />
										</button>
									</div>

									<div className="space-y-8">
										{content.sections.map((section, sectionIdx) => (
											<div key={sectionIdx} className="space-y-4">
												<h3 className="text-lg md:text-xl font-semibold text-white">
													{section.title}
												</h3>
												<div className="space-y-3">
													{section.items.map((item, itemIdx) => {
														// Handle empty lines
														if (item === '') {
															return <div key={itemIdx} className="h-2" />
														}
														
														// Handle nested bullets with dashes
														if (item.startsWith('  - ')) {
															return (
																<div key={itemIdx} className="flex items-start gap-3 pl-6">
																	<span className="text-accent/70 mt-1 flex-shrink-0">—</span>
																	<p className="text-sm md:text-base text-text leading-relaxed">
																		{item.substring(4)}
																	</p>
																</div>
															)
														}
														
														// Handle deeply nested bullets with asterisks
														if (item.startsWith('    * ')) {
															return (
																<div key={itemIdx} className="flex items-start gap-3 pl-10">
																	<span className="text-accent/50 mt-1 flex-shrink-0">◦</span>
																	<p className="text-sm md:text-base text-text/90 leading-relaxed">
																		{item.substring(6)}
																	</p>
																</div>
															)
														}
														
														// Handle regular bullet points
														if (item.startsWith('• ')) {
															return (
																<div key={itemIdx} className="flex items-start gap-3">
																	<span className="text-accent mt-1 flex-shrink-0">•</span>
																	<p className="text-sm md:text-base text-text leading-relaxed">
																		{item.substring(2)}
																	</p>
																</div>
															)
														}
														
														// Handle regular text (no bullet)
														return (
															<p key={itemIdx} className="text-sm md:text-base text-white font-medium leading-relaxed">
																{item}
															</p>
														)
													})}
												</div>
											</div>
										))}
									</div>

									<div className="mt-8 flex justify-end">
										<button className="btn btn-primary" onClick={onClose}>
											Close
										</button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

