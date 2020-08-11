/*
    IndexServices:
        - Singleton Desgin Pattern for having only one instance of the services in the application.
        - getCompanies:
            Input:
            Process: fetches the json of companies from my-json-server.typicode.com.
            Output: the companies json.
*/

const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    companiesEndpoint: 'https://my-json-server.typicode.com/richbm10/Jedi-Training-Akurey/db',
                    getCompanies: async function() {
                        const response = await fetch(this.companiesEndpoint);
                        const resData = await response.json();
                        return resData.companies;
                    }
                };
            }
            return instance;
        }
    };
})();

const services = IndexServices.getInstance();

function filterList(contractServiceCanvas, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    contractServiceCanvas.querySelectorAll(".contract-service").forEach(contractService => {
        let label = contractService.querySelector('.contract-service__header h2').textContent.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            contractService.style.display = "grid";
        } else {
            contractService.style.display = "none";
        }
    });
}


function main() {
    const contractServiceCanvas = document.querySelector('#contract-service-canvas');
    const heroSectionInput = document.querySelector('#hero-section__input input');
    const heroSectionIcon = document.querySelector('#hero-section__icon-img');
    const template = document.querySelector('#contract-service-template').innerHTML;

    heroSectionIcon.addEventListener('click', (event) => {
        filterList(contractServiceCanvas, heroSectionInput.value);
    });

    heroSectionInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) filterList(contractServiceCanvas, heroSectionInput.value);
    });

    services.getCompanies().then(companies => {
        companies.forEach(company => {
            console.log(Mustache.render(template, company));
            contractServiceCanvas.insertAdjacentHTML('beforeend', Mustache.render(template, company));
        });
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}

main();