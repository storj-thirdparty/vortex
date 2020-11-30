const worker = new Worker('wasm-worker.js');

const callbacks = {};
let id = 0;

async function runMethod(method, args) {
	return new Promise((resolve, reject) => {
		callbacks[id] = ({value, error}) => {
			if (error) {
				reject(new Error(error));
			} else {
				resolve(value);
			}
		};

		console.log('worker post message');

		worker.postMessage({
			method,
			args,
			id: id++
		});
	});
}

worker.onmessage = async function handleCallback(event) {
	console.log(event);

	callbacks[event.data.id](event.data);
	callbacks[event.data.id] = undefined;
};

export default new Proxy({}, {
	get: (target, prop, receiver) =>
		async (...args) =>
			runMethod(prop, args)
});
