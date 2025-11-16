import { Navbar } from '@/components/Navbar'
import { SectionHeading } from '@/components/SectionHeading'
import { PricingTable } from '@/components/PricingTable'
import { IncomeTable } from '@/components/IncomeTable'
import { Footer } from '@/components/Footer'

export default function Page() {
	return (
		<>
			<Navbar />
			<SectionHeading
				id="pricing"
				label="Pricing"
				title="Transparent, scalable pricing"
				desc="A spreadsheet-like grid with merged cells for grouped services."
			/>
			<section className="section pt-6">
				<PricingTable />
			</section>
			<SectionHeading
				id="revenue"
				label="Revenue"
				title="Business Model & Revenue"
				desc="How we generate revenue to cover our costs."
			/>
			<section className="section pt-6">
				<IncomeTable />
			</section>
			<Footer />
		</>
	)
}


