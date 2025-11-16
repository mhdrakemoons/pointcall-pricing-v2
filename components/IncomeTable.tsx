'use client'

import { pricingTiers, revenueEstimates, type PricingTier } from '@/lib/revenue'
import clsx from 'clsx'

export function IncomeTable() {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const formatCurrencyWithDecimals = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount)
	}

	return (
		<div className="container">
			<div className="mb-6 sheet p-3 sm:p-4 md:p-6">
				<h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Business Model & Revenue</h3>
				<p className="text-sm text-text-muted mb-4">
					Our model is a simple, high-margin hybrid SaaS: Platform Fee + Usage. Our blended unit cost (AI, carrier, SMS, number) at scale is ~$0.26/minute, providing a 48%+ gross margin on usage.
				</p>
				
				{/* Pricing Tiers */}
				<div className="mb-6">
					<h4 className="text-sm font-semibold text-white mb-3">Pricing Tiers</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{pricingTiers.map((tier) => (
							<div key={tier.id} className="p-4 rounded-lg border border-white/10 bg-white/5">
								<div className="text-lg font-bold text-white mb-2">{tier.name}</div>
								<div className="text-sm text-text-muted mb-3">
									{formatCurrency(tier.monthlyFee)} / month
									{tier.monthlyFee > 0 && (
										<span className="block mt-1">
											+ {formatCurrencyWithDecimals(tier.perMinuteFee)} / minute
										</span>
									)}
									{tier.monthlyFee === 0 && (
										<span className="block mt-1 text-xs">Custom Pricing</span>
									)}
								</div>
								<div className="text-xs text-text-muted">
									<div className="font-medium mb-1">Includes:</div>
									<ul className="list-disc list-inside space-y-1">
										{tier.includes.map((item, idx) => (
											<li key={idx}>{item}</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Revenue Estimates Table */}
				<div className="overflow-x-auto">
					<div className="min-w-[640px] sm:min-w-0">
						<table className="w-full table-fixed border-separate border-spacing-0">
							<thead>
								<tr>
									<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 rounded-tl-xl">
										Revenue Source
									</th>
									<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">
											Pricing
									</th>
									<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">
										100 users
									</th>
									<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap">
										1,000 users
									</th>
									<th scope="col" className="text-left text-[10px] sm:text-xs font-medium text-text-muted px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 whitespace-nowrap rounded-tr-xl">
										10,000 users
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Monthly Fees */}
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] font-semibold" colSpan={5}>
										Monthly Platform Fees
									</td>
								</tr>
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] pl-6">
										Starter (if all users)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(pricingTiers[0].monthlyFee)}/mo
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(100 * pricingTiers[0].monthlyFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(1000 * pricingTiers[0].monthlyFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(10000 * pricingTiers[0].monthlyFee)}
									</td>
								</tr>
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] pl-6">
										Growth (if all users)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(pricingTiers[1].monthlyFee)}/mo
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(100 * pricingTiers[1].monthlyFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(1000 * pricingTiers[1].monthlyFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(10000 * pricingTiers[1].monthlyFee)}
									</td>
								</tr>

								{/* Usage Revenue */}
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t-2 border-white/20 group-hover:bg-white/[0.03] font-semibold pt-4" colSpan={5}>
										Usage Revenue (Per Minute)
									</td>
								</tr>
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] pl-6">
										Starter (if all users, × 3,000 min/user)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrencyWithDecimals(pricingTiers[0].perMinuteFee)}/min
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(100 * 3000 * pricingTiers[0].perMinuteFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(1000 * 3000 * pricingTiers[0].perMinuteFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(10000 * 3000 * pricingTiers[0].perMinuteFee)}
									</td>
								</tr>
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] pl-6">
										Growth (if all users, × 3,000 min/user)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrencyWithDecimals(pricingTiers[1].perMinuteFee)}/min
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(100 * 3000 * pricingTiers[1].perMinuteFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(1000 * 3000 * pricingTiers[1].perMinuteFee)}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-white border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency(10000 * 3000 * pricingTiers[1].perMinuteFee)}
									</td>
								</tr>

								{/* Total Revenue */}
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t-2 border-white/20 group-hover:bg-white/[0.03] pt-4">
										Total Monthly Revenue (Starter)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-green-400 border-t-2 border-white/20 group-hover:bg-white/[0.03] pt-4 whitespace-nowrap">
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t-2 border-white/20 group-hover:bg-white/[0.03] pt-4 whitespace-nowrap">
										{formatCurrency((100 * pricingTiers[0].monthlyFee) + (100 * 3000 * pricingTiers[0].perMinuteFee))}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t-2 border-white/20 group-hover:bg-white/[0.03] pt-4 whitespace-nowrap">
										{formatCurrency((1000 * pricingTiers[0].monthlyFee) + (1000 * 3000 * pricingTiers[0].perMinuteFee))}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t-2 border-white/20 group-hover:bg-white/[0.03] pt-4 whitespace-nowrap">
										{formatCurrency((10000 * pricingTiers[0].monthlyFee) + (10000 * 3000 * pricingTiers[0].perMinuteFee))}
									</td>
								</tr>
								<tr className="group">
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t border-white/10 group-hover:bg-white/[0.03]">
										Total Monthly Revenue (Growth)
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-green-400 border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency((100 * pricingTiers[1].monthlyFee) + (100 * 3000 * pricingTiers[1].perMinuteFee))}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency((1000 * pricingTiers[1].monthlyFee) + (1000 * 3000 * pricingTiers[1].perMinuteFee))}
									</td>
									<td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-bold text-green-400 border-t border-white/10 group-hover:bg-white/[0.03] whitespace-nowrap">
										{formatCurrency((10000 * pricingTiers[1].monthlyFee) + (10000 * 3000 * pricingTiers[1].perMinuteFee))}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

