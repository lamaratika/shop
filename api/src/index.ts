// Entry point: require and execute the server main function
import * as serverModule from './server.js';

if (typeof serverModule.main === 'function') {
	serverModule.main();
} else {
	// eslint-disable-next-line no-console
	console.error('server.main is not a function');
	process.exit(1);
}
