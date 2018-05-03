export const promiseRequest = (method, url, data = null) => {
	/*
			@param method - string which will define the type of the request ( GET, POST, etc )
			@param url - string which will define the target url
			@param data - object which will define the data sent through a POST request
			the function will return a promise with a JSON response
	*/
	return new Promise(function (resolve, reject) {
		if(!method || !url) reject('params not sent')
		const stringifiedData = data !== null ? JSON.stringify(data) : null
		fetch(url, {
			method: method,
			body: stringifiedData
		})
			.then(response => response.json())
			.then(responseJson => {
				resolve(responseJson)
			})
			.catch(error => {
				reject(error)
			});
	});
}
