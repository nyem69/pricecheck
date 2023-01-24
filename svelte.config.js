import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		//adapter: adapter()
		adapter: adapter({ pages: 'docs', assets: 'docs', fallback: 'app.html', precompress: true }),
	}
};

export default config;

