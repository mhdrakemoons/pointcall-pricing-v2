'use client'

import { useMemo, useRef, useState } from 'react'
import { services, totals, type Service } from '@/lib/data'
import { DetailsModal } from './DetailsModal'
import { CategoryInfoModal } from './CategoryInfoModal'
import { categoryInfo } from '@/lib/categoryInfo'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type Row = {
	isCategoryHeader?: boolean
	categoryLabel?: string
	categoryTotals?: { price100: number; price1k: number; price10k: number }
	service?: Service
	isLastInCategory?: boolean // True if this is the last row in a category group
}

// Parse price string to number (handles formats like "$60,000", "~$600", "$120,000", "~$56–128", "$4 / $21", "FREE", etc.)
function parsePrice(priceStr: string): number {
	if (!priceStr || priceStr.trim() === '' || priceStr.toUpperCase() === 'FREE') {
		return 0
	}
	
	// Handle ranges like "~$56–128" - take the higher value
	if (priceStr.includes('–')) {
		const parts = priceStr.split('–')
		const lastPart = parts[parts.length - 1]
		priceStr = lastPart.trim()
	}
	
	// Handle formats like "$4 / $21" - take the higher value
	if (priceStr.includes('/')) {
		const parts = priceStr.split('/')
		let maxVal = 0
		for (const part of parts) {
			const cleaned = part.replace(/[~$,\s]/g, '')
			const num = parseFloat(cleaned)
			if (!isNaN(num) && num > maxVal) {
				maxVal = num
			}
		}
		return maxVal
	}
	
	// Remove ~, $, commas, and extract number
	const cleaned = priceStr.replace(/[~$,\s]/g, '')
	const num = parseFloat(cleaned)
	
	return isNaN(num) ? 0 : num
}

function buildRows(data: Service[]): Row[] {
	const rows: Row[] = []
	let i = 0
	while (i < data.length) {
		const item = data[i]
		if (item.group && item.rowSpan) {
			// This is a category header - calculate totals for this category
			const categoryEndIndex = i + item.rowSpan + 1 // Index after category ends
			const isLastCategory = categoryEndIndex >= data.length
			const nextItemIsCategory = !isLastCategory && !!(data[categoryEndIndex]?.group)
			
			// Calculate totals for this category
			let total100 = 0
			let total1k = 0
			let total10k = 0
			
			for (let j = 1; j <= item.rowSpan; j++) {
				const child = data[i + j]
				if (child) {
					total100 += parsePrice(child.price100)
					total1k += parsePrice(child.price1k)
					total10k += parsePrice(child.price10k)
				}
			}
			
			// Add category header row with totals
			rows.push({
				isCategoryHeader: true,
				categoryLabel: item.group,
				categoryTotals: { price100: total100, price1k: total1k, price10k: total10k },
				isLastInCategory: false
			})
			
			// Process all children in this category
			for (let j = 1; j <= item.rowSpan; j++) {
				const child = data[i + j]
				if (child) {
					const isLastInCategory = j === item.rowSpan && (isLastCategory || nextItemIsCategory)
					rows.push({ 
						service: child,
						isLastInCategory
					})
				}
			}
			// Skip the category header and all its children
			i += item.rowSpan + 1
		} else {
			// Standalone row (no group)
			// Check if next item is a category header (meaning this is last in its implicit category)
			const isLastInCategory = i >= data.length - 1 || 
				!!(data[i + 1] && data[i + 1].group)
			rows.push({ 
				service: item,
				isLastInCategory
			})
			i++
		}
	}
	return rows
}

export function PricingTable() {
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState<Service | null>(null)
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)
	const [activeCategory, setActiveCategory] = useState<string | null>(null)
	const triggerRef = useRef<HTMLButtonElement | null>(null)

	const rows = useMemo(() => buildRows(services), [])

	const openModal = (svc: Service, btn: HTMLButtonElement | null, e?: React.MouseEvent) => {
		// Prevent any default behavior that might cause scroll
		if (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		setActive(svc)
		setOpen(true)
		// Remember the trigger to restore focus after close
		triggerRef.current = btn
	}

	const closeModal = () => {
		setOpen(false)
		// Don't restore focus to prevent scrolling
	}

	const openCategoryModal = (categoryName: string) => {
		setActiveCategory(categoryName)
		setCategoryModalOpen(true)
	}

	const closeCategoryModal = () => {
		setCategoryModalOpen(false)
		setActiveCategory(null)
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const parseServiceName = (name: string) => {
		const replacementMatch = name.match(/\(replacement for (.+)\)/)
		if (replacementMatch) {
			const mainName = name.replace(/\s*\(replacement for .+\)/, '').trim()
			const replacementText = replacementMatch[1]
			return { mainName, replacementText }
		}
		return { mainName: name, replacementText: null }
	}

	return (
		<>
			<div className="container">
				{/* Totals Section */}
				<div className="mb-6 sheet p-3 sm:p-4 md:p-6">
					<h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Total Monthly Costs</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
						<div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/5">
							<div className="text-2xs text-text-muted mb-1">100 USERS</div>
							<div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(totals.price100)}</div>
						</div>
						<div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/5">
							<div className="text-2xs text-text-muted mb-1">1,000 USERS</div>
							<div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(totals.price1k)}</div>
						</div>
						<div className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/5 sm:col-span-2 md:col-span-1">
							<div className="text-2xs text-text-muted mb-1">10,000 USERS</div>
							<div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(totals.price10k)}</div>
						</div>
					</div>
				</div>

				<div className="sheet p-2 sm:p-4">
					{/* Mobile scroll indicator */}
					<div className="mb-2 sm:hidden text-2xs text-text-muted text-center">
						← Swipe to see all columns →
					</div>
					<div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
						<div className="min-w-[640px] sm:min-w-0">
							<table className="w-full table-fixed border-separate border-spacing-0">
								<thead>
									<tr>
										<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 rounded-tl-xl min-w-[180px] sm:min-w-0">
											Service
										</th>
										<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">100 users</th>
										<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">1,000 users</th>
										<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">10,000 users</th>
										<th scope="col" className="text-right text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 rounded-tr-xl min-w-[100px] sm:min-w-0">Actions</th>
									</tr>
								</thead>
								<colgroup>
									<col />
									<col />
									<col />
									<col />
									<col className="min-w-[100px] sm:min-w-0" />
								</colgroup>
								<tbody>
									{rows.map((row, idx) => {
										// Category header row
										if (row.isCategoryHeader && row.categoryLabel) {
											const totals = row.categoryTotals || { price100: 0, price1k: 0, price10k: 0 }
											const hasCategoryInfo = categoryInfo[row.categoryLabel] !== undefined
											return (
												<tr key={`category-${row.categoryLabel}`} className="group">
													<td 
														className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white border-t border-white/10 bg-accent/20 group-hover:bg-accent/25 transition-colors"
													>
														<div className="flex items-center gap-2">
															<span>{row.categoryLabel}</span>
															{hasCategoryInfo && (
																<button
																	onClick={() => openCategoryModal(row.categoryLabel!)}
																	className="flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-text-muted hover:text-white transition-colors"
																	aria-label={`Learn more about ${row.categoryLabel}`}
																>
																	<InformationCircleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
																	<span className="hidden sm:inline">Info</span>
																</button>
															)}
														</div>
													</td>
													<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white border-t border-white/10 bg-accent/20 group-hover:bg-accent/25 transition-colors whitespace-nowrap">
														{totals.price100 > 0 ? formatCurrency(totals.price100) : ''}
													</td>
													<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white border-t border-white/10 bg-accent/20 group-hover:bg-accent/25 transition-colors whitespace-nowrap">
														{totals.price1k > 0 ? formatCurrency(totals.price1k) : ''}
													</td>
													<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white border-t border-white/10 bg-accent/20 group-hover:bg-accent/25 transition-colors whitespace-nowrap">
														{totals.price10k > 0 ? formatCurrency(totals.price10k) : ''}
													</td>
													<td className="px-2 sm:px-3 py-2 sm:py-3 border-t border-white/10 bg-accent/20 group-hover:bg-accent/25 transition-colors"></td>
												</tr>
											)
										}
										
										// Service row
										if (!row.service) return null
										
										const isLastInCategory = row.isLastInCategory
										const isScrapingService = ['phantombuster', 'apollo-scraping', 'linkedin-sales-nav', 'make-scraping'].includes(row.service.id)
										
										return (
											<tr 
												key={row.service.id} 
												className={clsx(
													'group',
													isLastInCategory && 'category-separator'
												)}
											>
												<td className={clsx(
													'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03]',
													isLastInCategory && 'border-b-2 border-white/20'
												)}>
													{(() => {
														const { mainName, replacementText } = parseServiceName(row.service.name)
														return (
															<div className="break-words">
																<div>{mainName}</div>
																{replacementText && (
																	<div className="text-green-400 text-[10px] sm:text-2xs mt-1">
																		(replacement for {replacementText})
																	</div>
																)}
															</div>
														)
													})()}
												</td>
												{isScrapingService ? (
													<>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap',
															isLastInCategory && 'border-b-2 border-white/20'
														)}></td>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap',
															isLastInCategory && 'border-b-2 border-white/20'
														)}></td>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03]',
															isLastInCategory && 'border-b-2 border-white/20'
														)}>
															<div className="space-y-1">
																<div className="font-medium text-white whitespace-nowrap">{row.service.price10k || ''}</div>
																<div className="text-[10px] sm:text-2xs text-text-muted">~2,000 leads per day</div>
															</div>
														</td>
													</>
												) : (
													<>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap',
															isLastInCategory && 'border-b-2 border-white/20'
														)}>{row.service.price100 || ''}</td>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap',
															isLastInCategory && 'border-b-2 border-white/20'
														)}>{row.service.price1k || ''}</td>
														<td className={clsx(
															'px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap',
															isLastInCategory && 'border-b-2 border-white/20'
														)}>{row.service.price10k || ''}</td>
													</>
												)}
												<td className={clsx(
													'px-2 sm:px-3 py-2 sm:py-3 border-t border-white/10 group-hover:bg-white/[0.03]',
													isLastInCategory && 'border-b-2 border-white/20'
												)}>
													<div className="flex justify-end">
														<button
															className="btn btn-secondary text-[10px] sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2.5 whitespace-nowrap"
															onClick={(e) => openModal(row.service!, e.currentTarget, e)}
															aria-haspopup="dialog"
															aria-controls="service-details"
															aria-label={`See details for ${row.service.name}`}
														>
															<span className="hidden sm:inline">See details</span>
															<span className="sm:hidden">Details</span>
														</button>
													</div>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<DetailsModal open={open} onClose={closeModal} service={active} />
			{activeCategory && categoryInfo[activeCategory] && (
				<CategoryInfoModal 
					open={categoryModalOpen} 
					onClose={closeCategoryModal} 
					categoryName={activeCategory}
					content={categoryInfo[activeCategory]}
				/>
			)}
		</>
	)
}


