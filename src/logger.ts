
export const logger = require('ournet.logger');

if (process.env.NODE_ENV === 'production') {
	logger.loggly({
		tags: ['entitizer-com'],
		json: true
	});
	logger.removeConsole();
}
