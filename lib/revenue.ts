export type PricingTier = {
	id: string
	name: string
	monthlyFee: number
	perMinuteFee: number
	includes: string[]
}

export const pricingTiers: PricingTier[] = [
	{
		id: 'starter',
		name: 'Starter',
		monthlyFee: 399,
		perMinuteFee: 0.55,
		includes: [
			'1 Workspace',
			'2 Numbers',
			'AI Call & Omnichannel Chat',
		],
	},
	{
		id: 'growth',
		name: 'Growth',
		monthlyFee: 999,
		perMinuteFee: 0.50,
		includes: [
			'Advanced CRM Sync',
			'Retargeting Flows',
			'Social Media APIs',
		],
	},
	{
		id: 'scale',
		name: 'Scale (Future)',
		monthlyFee: 0, // Custom pricing
		perMinuteFee: 0.50, // Estimated
		includes: [
			'B2B Lead Database Access',
			'Enterprise API Access',
		],
	},
]

// Revenue calculations
// Assumptions:
// - 100 users: Mix of Starter (70%) and Growth (30%)
// - 1,000 users: Mix of Starter (50%) and Growth (50%)
// - 10,000 users: Mix of Starter (30%), Growth (60%), Scale (10%)
// - Average 1,000 calls per user per month × 3 minutes = 3,000 minutes per user per month

export const calculateRevenue = (userCount: number, tierMix: { starter: number; growth: number; scale: number }) => {
	const { starter, growth, scale } = tierMix
	const minutesPerUser = 3000 // 1,000 calls × 3 minutes average
	
	const starterUsers = Math.round(userCount * starter)
	const growthUsers = Math.round(userCount * growth)
	const scaleUsers = Math.round(userCount * scale)
	
	const starterMonthlyFees = starterUsers * pricingTiers[0].monthlyFee
	const growthMonthlyFees = growthUsers * pricingTiers[1].monthlyFee
	const scaleMonthlyFees = scaleUsers * (pricingTiers[2].monthlyFee || 0) // Custom pricing for Scale
	
	const starterMinutes = starterUsers * minutesPerUser
	const growthMinutes = growthUsers * minutesPerUser
	const scaleMinutes = scaleUsers * minutesPerUser
	
	const starterUsageRevenue = starterMinutes * pricingTiers[0].perMinuteFee
	const growthUsageRevenue = growthMinutes * pricingTiers[1].perMinuteFee
	const scaleUsageRevenue = scaleMinutes * pricingTiers[2].perMinuteFee
	
	const totalMonthlyFees = starterMonthlyFees + growthMonthlyFees + scaleMonthlyFees
	const totalUsageRevenue = starterUsageRevenue + growthUsageRevenue + scaleUsageRevenue
	
	return {
		starterUsers,
		growthUsers,
		scaleUsers,
		starterMonthlyFees,
		growthMonthlyFees,
		scaleMonthlyFees,
		starterUsageRevenue,
		growthUsageRevenue,
		scaleUsageRevenue,
		totalMonthlyFees,
		totalUsageRevenue,
		totalRevenue: totalMonthlyFees + totalUsageRevenue,
	}
}

export const revenueEstimates = {
	price100: calculateRevenue(100, { starter: 0.7, growth: 0.3, scale: 0 }),
	price1k: calculateRevenue(1000, { starter: 0.5, growth: 0.5, scale: 0 }),
	price10k: calculateRevenue(10000, { starter: 0.3, growth: 0.6, scale: 0.1 }),
}

