const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    companies: [],
                    companiesEndpoint: 'https://my-json-server.typicode.com/richbm10/Jedi-Training-Akurey/db',
                    getCompanies: async function() {
                        const response = await fetch(this.companiesEndpoint);
                        const resData = await response.json();
                        this.companies = resData.companies;
                        return this.companies;
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
            contractService.style.display = "flex";
        } else {
            contractService.style.display = "none";
        }
    });
}

function createContractServiceHeader(company) {
    const header = document.createElement('div');
    header.classList.add('contract-service__header', 'flex-container-row-A');
    const h = document.createElement('h2');
    h.classList.add('text-A');
    h.textContent = company.name;
    header.appendChild(h);
    if (company.isCertified) {
        const img = document.createElement('img');
        img.classList.add('contract-service__icon');
        img.src = './assets/icons/certified.png';
        header.appendChild(img);
    }
    return header;
}

function createContractService(company) {
    const listItem = document.createElement('li');
    listItem.classList.add('contract-service');
    const contractServiceHeader = createContractServiceHeader(company);
    const line = document.createElement('div');
    line.classList.add('contract-service__line');
    const img = document.createElement('img');
    img.classList.add('contract-service__img');
    img.src = company.image;
    const p = document.createElement('p');
    p.classList.add('contract-service__text', 'text-C');
    p.textContent = company.description;
    const span = document.createElement('span');
    span.classList.add('contract-service__span', 'text-B');
    span.textContent = `Desde: $${company.rate}/${company.hours} horas`;
    const button = document.createElement('div');
    button.classList.add('button', 'text-B');
    button.textContent = 'Contratar';
    listItem.appendChild(contractServiceHeader);
    listItem.appendChild(line);
    listItem.appendChild(img);
    listItem.appendChild(p);
    listItem.appendChild(span);
    listItem.appendChild(button);
    return listItem;
}

function main() {
    const contractServiceCanvas = document.querySelector('#contract-service-canvas');
    const heroSectionInput = document.querySelector('#hero-section__input input');
    heroSectionInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) filterList(contractServiceCanvas, heroSectionInput.value);
    });
    services.getCompanies().then(companies => {
        companies.forEach(company => {
            contractServiceCanvas.appendChild(createContractService(company));
        });
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}

main();