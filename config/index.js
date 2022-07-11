const dev = process.env.NODE_ENV !== 'production'

export const server = {
	frontend: {
		url: (
			(dev)
			? 'http://localhost:3000/'
			: 'http://unknown'
		)
	},
	backend: {
		url: (
			(dev)
			? 'http://localhost:80/coloneli-simpsoni/'
			: 'http://unknown'
		)
	}
}