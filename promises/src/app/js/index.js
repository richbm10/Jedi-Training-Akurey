const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    user: {},
                    companiesEndpoint: 'https://my-json-server.typicode.com/companies',
                    getUser: async function(username) {
                        const response = await fetch(this.baseUserEndpoint + username);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    }
                };
            }
            return instance;
        }
    };
})();

export { IndexServices };