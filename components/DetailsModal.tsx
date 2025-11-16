'use client'

import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Service } from '@/lib/data'

type Props = {
	open: boolean
	onClose: () => void
	service: Service | null
}

export function DetailsModal({ open, onClose, service }: Props) {
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
							<Dialog.Panel id="service-details" className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#0b0c10] text-white shadow-soft ring-1 ring-white/10">
								<div className="p-6 md:p-8">
									<div className="flex items-start justify-between gap-4">
										<div>
											<Dialog.Title className="text-xl md:text-2xl font-semibold tracking-tight">
												{service?.name}
											</Dialog.Title>
											<div className="mt-1 h-0.5 w-12 bg-accent rounded-full" />
										</div>
										<button
											type="button"
											onClick={onClose}
											className="rounded-lg p-2 text-text-muted hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
											aria-label="Close details"
										>
											<XMarkIcon className="h-5 w-5" />
										</button>
									</div>

									<div className="mt-6 grid grid-cols-3 gap-3 text-sm">
										<div className="rounded-lg bg-white/5 p-3">
											<div className="text-text-muted">100 users</div>
											<div className="mt-1 font-medium">{service?.price100 || '—'}</div>
										</div>
										<div className="rounded-lg bg-white/5 p-3">
											<div className="text-text-muted">1,000 users</div>
											<div className="mt-1 font-medium">{service?.price1k || '—'}</div>
										</div>
										<div className="rounded-lg bg-white/5 p-3">
											<div className="text-text-muted">10,000 users</div>
											<div className="mt-1 font-medium">{service?.price10k || '—'}</div>
										</div>
									</div>

									<div className="mt-6 prose prose-invert max-w-none">
										<p className="text-text-muted mb-3">Details:</p>
										<div className="space-y-2 text-sm leading-relaxed text-text">
											{service?.description.map((d, i) => {
												if (d === '') {
													return <br key={i} />
												}
												if (d.startsWith('•')) {
													return (
														<div key={i} className="pl-4 flex items-start">
															<span className="text-accent mr-2">•</span>
															<span>{d.substring(1).trim()}</span>
														</div>
													)
												}
												return (
													<p key={i} className="text-text">
														{d}
													</p>
												)
											})}
										</div>
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


