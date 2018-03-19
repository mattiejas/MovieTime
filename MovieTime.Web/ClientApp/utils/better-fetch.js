const betterFetch = endpoint => fetch(endpoint)
  .then((resp) => {
    const response = resp.json();
    if (resp.status >= 200 && resp.status < 300) {
      return response;
    }
    return response.then((err) => { throw err; });
  });

export default betterFetch;
