/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			// https://scontent-gru2-1.xx.fbcdn.net/v/t39.8562-6/252294889_575082167077436_6034106545912333281_n.svg/meta-logo-primary_standardsize.svg?_nc_cat=1&ccb=1-7&_nc_sid=e280be&_nc_ohc=Pnji0z9IPgIAX_d09ao&_nc_ht=scontent-gru2-1.xx&oh=00_AfD469UbPl8576gvKqJwIjZjM3-qEefa6fQlOrFugGtMUg&oe=6551AAB9
			// {
			// 	protocol: "https",
			// 	hostname: "**.example.com",
			// },
			{
				protocol: "https",
				hostname: "scontent-gru2-1.xx.fbcdn.net",
			},
		],
	},
};

module.exports = nextConfig;
