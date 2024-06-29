const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev';
const IdAtual = sessionStorage.getItem('login');

async function fetchData() {
    try {
        const response = await fetch(`${dataURL}/Trabalho`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        return [];
    }
}

async function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';  // Limpa os resultados anteriores

    const data = await fetchData();
    console.log(data);
    data.forEach(item => {
        const title = item.Nome.toLowerCase();
        console.log(title);
        if (title.includes(searchInput)) {
            const gridContent = document.createElement('div');
            gridContent.className = 'grid-content';
            gridContent.innerHTML = `
                <img src="${item.Foto}">
                <h1>${item.Nome}</h1>
                <p>${item.Resume}</p>
                <p>${item.Área_de_atuação[0]}</p>
                <button onclick="solicitar(${item.id})">Solicitar</button>
            `;
            resultsContainer.appendChild(gridContent);
        }
    });
}

// Exibir todos os resultados iniciais ao carregar a página
window.onload = async () => {
    const data = await fetchData();
    const resultsContainer = document.getElementById('resultsContainer');
    data.forEach(item => {
        const gridContent = document.createElement('div');
        gridContent.className = 'grid-content';
        gridContent.innerHTML = `
            <img src="${item.Foto}">
            <h1>${item.Nome}</h1>
            <p>${item.Resume}</p>
            <p>${item.Área_de_atuação}</p>
            <button onclick="solicitar(${item.id})">Solicitar</button>
        `;
        resultsContainer.appendChild(gridContent);
    });
}

async function solicitar(id) {
    try {
        let bodyContent = {
            Status: "pendente",
            Id_Usuario: Number(IdAtual),
            Id_Projeto: id
            //ADICIONAR TEXTO DE PEDIDO
        }
        const response = await fetch(`${dataURL}/Solicitacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent)
        });
        if (response.ok) {
            alert(`Solicitação feita para o projeto`);
        }
    } catch (error) {
        console.error("Erro ao recusar solicitação:", error);
    }
}