export type Service = {
	id: string
	group?: string
	name: string
	price100: string
	price1k: string
	price10k: string
	description: string[]
	rowSpan?: number
}

// Calculate totals for each tier
// Scraping costs (~$120,890) are excluded from 100 and 1000 user totals, only included for 10,000 users
const scrapingCosts = 120890 // PhantomBuster (~$92 avg) + Apollo ($120k) + LinkedIn ($120) + Make.com ($678)
export const totals = {
	price100: 210461 - scrapingCosts, // $210,461 - $120,890 = $89,571
	price1k: 1011458 - scrapingCosts, // $1,011,458 - $120,890 = $890,568 (SUPABASE + NETLIFY/VERCEL + RENDER)
	price1kAws: 1014950 - scrapingCosts, // $1,014,950 - $120,890 = $894,060 (AWS ONLY)
	price10k: 5952916, // $5,952,916 (includes scraping costs)
}

// Organized into 5 categories: AI Voice Agents, AIs in the platform, Scraping, Development, Chatbots
export const services: Service[] = [
	// AI Voice Agents category
	{
		id: 'cat-ai-voice',
		group: 'AI Voice Agents',
		name: 'AI Voice Agents',
		price100: '',
		price1k: '',
		price10k: '',
		description: ['Category: AI-powered voice agent services and infrastructure.'],
		rowSpan: 4,
	},
	{
		id: 'vapi-calls',
		name: 'VAPI',
		price100: '$60,000',
		price1k: '$600,000',
		price10k: '',
		description: [
			'Voice AI platform for automated phone calls.',
			'Estimated $0.20 per minute - 3 minutes average - 1000 calls / month / user = $0.60 per call.',
			'Pricing: $0.20 per minute, 3 minutes average call duration.',
			'Usage: 1,000 calls per month per user = $0.60 per call.',
			'Scales linearly with user count and call volume.',
		],
	},
	{
		id: 'vapi-concurrent',
		name: 'VAPI ~10 concurrent calls per user = ~100$',
		price100: '$10,000',
		price1k: '$100,000',
		price10k: '',
		description: [
			'Concurrent call capacity: ~10 concurrent calls per user.',
			'Enterprise option: VAPI offers unlimited concurrent calls for enterprise customers.',
			'Cost optimization: Enterprise plans can eliminate this cost entirely.',
		],
	},
	{
		id: 'custom-stt-tts-llm',
		name: 'Custom STT + TTS + LLM (replacement for VAPI)',
		price100: '',
		price1k: '',
		price10k: '~$3,900,000',
		description: [
			'Custom speech-to-text, text-to-speech, and LLM solution.',
			'This is a replacement for VAPI at scale.',
			'',
			'Calculation for 10,000 users:',
			'• 10,000 users × ~1,000 calls per user per month = 10,000,000 total calls',
			'• 10,000,000 calls × 3 minutes per call = 30,000,000 total minutes',
			'• 30,000,000 minutes × $0.13 per minute = $3,900,000 total cost',
			'',
			'Pricing breakdown:',
			'• GPT-4o: ~$0.0068 per minute',
			'• GPT-5 / GPT-5.1: $0.0049 per minute',
			'• Deepgram (STT): $0.05/min',
			'• ElevenLabs (TTS): $0.075/min',
			'• Total: ~$0.13/min',
			'',
			'Note: Costs shown are not assuming bulk pricing from LLM providers.',
		],
	},
	{
		id: 'twilio-webrtc',
		name: 'Twilio (for WebRTC) (replacement for VAPI)',
		price100: '',
		price1k: '',
		price10k: '$120,000',
		description: [
			'WebRTC infrastructure for real-time communication.',
			'Related to the Custom STT + TTS + LLM solution.',
			'Usage: 1,000 calls × 3 minutes each = 3,000 minutes per user each month.',
			'Cost per user: 3,000 minutes × $0.004 per minute = $12 per user each month.',
			'Scales linearly with call volume and user count.',
		],
	},
	// AIs in the platform category
	{
		id: 'cat-ais-platform',
		group: 'AIs in the platform',
		name: 'AIs in the platform',
		price100: '',
		price1k: '',
		price10k: '',
		description: ['Category: AI services integrated within the platform.'],
		rowSpan: 3,
	},
	{
		id: 'llm-after-call',
		name: 'LLM API (after-call processing)',
		price100: '~$600',
		price1k: '~$5,000',
		price10k: '~$50,000',
		description: [
			'AI processing for post-call analysis and transcription.',
			'Prices listed are at full retail rates.',
			'Bulk buying: Tokens available at half price when purchased in bulk.',
			'Optimizes call summaries, insights, and data extraction.',
		],
	},
	{
		id: 'llm-chat-support',
		name: 'LLM Chat Support (smart assistant)',
		price100: '~$300',
		price1k: '~$3,000',
		price10k: '$30,000',
		description: [
			'Intelligent chat assistant for customer support.',
			'Prices listed are at full retail rates.',
			'Bulk buying: Tokens available at half price when purchased in bulk.',
			'Provides automated responses and escalates complex queries.',
		],
	},
	{
		id: 'llm-setup-agents',
		name: 'LLM (AI to help set up agents)',
		price100: '$50',
		price1k: '$500',
		price10k: '$5,000',
		description: [
			'AI-powered agent configuration and setup assistance.',
			'Helps users configure and optimize their voice agents.',
			'Provides intelligent guidance for agent setup and customization.',
		],
	},
	// Scraping category
	{
		id: 'cat-scraping',
		group: 'Scraping',
		name: 'Scraping',
		price100: '',
		price1k: '',
		price10k: '',
		description: ['Category: Lead generation and data scraping services.'],
		rowSpan: 4,
	},
	{
		id: 'phantombuster',
		name: 'PhantomBuster',
		price100: '~$56–128',
		price1k: '~$56–128',
		price10k: '~$56–128',
		description: [
			'Used for scraping leads with LinkedIn Sales Navigator & Google Maps.',
			'Estimated at ~2000 total leads scraped daily.',
			'Automated lead scraping from LinkedIn Sales Navigator and Google Maps.',
			'Flat rate pricing regardless of user count.',
			'Reliable data extraction with minimal manual intervention.',
		],
	},
	{
		id: 'apollo-scraping',
		name: 'Apollo.io - Scraping - ~2,000 leads per day',
		price100: '~$120,000',
		price1k: '~$120,000',
		price10k: '~$120,000',
		description: [
			'Lead scraping and verification service.',
			'Estimated volume: ~2,000 leads per day.',
			'Pricing structure:',
			'• $0.20 per credit',
			'• 1 credit = export',
			'• 1 credit = verified email',
			'• 8 credits = phone number',
			'• Total = 10 credits per lead',
			'Flat rate pricing regardless of user count.',
		],
	},
	{
		id: 'linkedin-sales-nav',
		name: 'LinkedIn Sales Navigator',
		price100: '$120',
		price1k: '$120',
		price10k: '$120',
		description: [
			'LinkedIn Sales Navigator subscription for lead research.',
			'Flat monthly rate: $120 regardless of user count.',
			'Provides advanced search filters and lead insights.',
			'Essential tool for B2B lead generation.',
		],
	},
	{
		id: 'make-scraping',
		name: 'Make.com (used for scraping leads)',
		price100: '$678',
		price1k: '$678',
		price10k: '$678',
		description: [
			'Automation platform for lead scraping workflows.',
			'Volume: 60k leads per month.',
			'Operations: ~600,000 operations per month.',
			'Flat rate pricing regardless of user count.',
		],
	},
	// Development category
	{
		id: 'cat-development',
		group: 'Development',
		name: 'Development',
		price100: '',
		price1k: '',
		price10k: '',
		description: ['Category: Infrastructure and development tools.'],
		rowSpan: 6,
	},
	{
		id: 'frontend-netlify-vercel',
		name: 'Frontend - Netlify / Vercel',
		price100: '$20',
		price1k: '~$60',
		price10k: '',
		description: [
			'Frontend hosting and deployment platform.',
			'Supports Next.js, React, and other modern frameworks.',
			'Global CDN and automatic deployments.',
			'Scales efficiently with traffic growth.',
		],
	},
	{
		id: 'backend-render',
		name: 'Backend - Render (fastest)',
		price100: '$450',
		price1k: '$450',
		price10k: '',
		description: [
			'Backend hosting platform optimized for speed.',
			'Fast deployment and scaling capabilities.',
			'Flat rate pricing up to 1,000 users.',
			'Reliable infrastructure for API and serverless functions.',
		],
	},
	{
		id: 'database-supabase',
		name: 'Database (Supabase)',
		price100: '~$25',
		price1k: '~$60',
		price10k: '',
		description: [
			'PostgreSQL database with real-time capabilities.',
			'Includes authentication, storage, and API generation.',
			'Scales efficiently with user growth.',
			'Developer-friendly with excellent documentation.',
		],
	},
	{
		id: 'aws-full-stack',
		name: 'Frontend + Backend + Database on AWS (Amazon Web Services) (replacement for Database (Supabase), Backend (Render), and Frontend (Netlify/Vercel))',
		price100: '',
		price1k: '',
		price10k: '~$31,000',
		description: [
			'Complete AWS infrastructure stack.',
			'Replacement for Database (Supabase), Backend (Render), and Frontend (Netlify/Vercel).',
			'Includes frontend hosting, backend services, and database.',
			'AWS pricing for 1,000+ users production scale.',
			'Enterprise-grade reliability and scalability.',
			'More cost-effective at higher user counts.',
		],
	},
	{
		id: 'payment-stripe',
		name: 'Payment Processor (e.g. Stripe)',
		price100: '$12',
		price1k: '$30',
		price10k: '$210',
		description: [
			'Payment processing and subscription management.',
			'Base plan: Payments - Free',
			'Optional add-ons:',
			'• Custom domain / Our name: $10/month',
			'• Radar fraud detection + custom rules: $0.02 per payment',
			'Scales with transaction volume.',
		],
	},
	{
		id: 'github',
		name: 'GitHub',
		price100: 'FREE',
		price1k: '$4 / $21',
		price10k: '$21',
		description: [
			'Where all our code lives — secure, scalable, professional.',
			'Features:',
			'• More security (protected branches, scans, access control)',
			'• More space (bigger repos, more storage, more Actions minutes)',
			'• Better teamwork (reviews, permissions, SSO)',
			'• Compliance-ready (audit logs, investor-safe)',
			'• Scales with us (proper workflows for 100 → 10,000 users)',
			'',
			'Estimated: $4–$21 per user/month at scale.',
		],
	},
	// Chatbots category
	{
		id: 'cat-chatbots',
		group: 'Chatbots',
		name: 'Chatbots',
		price100: '',
		price1k: '',
		price10k: '',
		description: ['Category: Custom chatbot solutions.'],
		rowSpan: 1,
	},
	{
		id: 'custom-website-chatbot',
		name: 'Custom Website Chatbot',
		price100: '$17,000',
		price1k: '$170,000',
		price10k: '$1,700,000',
		description: [
			'Custom AI chatbot for website integration.',
			'Token usage: ~30,000 tokens per user interaction.',
			'Volume: ~1,000 website users per month per PointCall client.',
			'Calculation: 30,000,000 tokens for 1 PointCall client (~$170 at GPT-5 pricing).',
			'Scales linearly with user interactions.',
		],
	},
]
