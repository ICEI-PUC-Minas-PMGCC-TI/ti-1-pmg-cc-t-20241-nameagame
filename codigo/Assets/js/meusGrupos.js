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

/**
 * Leitura de dados do JSON server
 * @returns objeto lido no JSON server
 */
async function readDataUsuario(id) {
    try {
        const response = await fetch(`${dataURL}/Usuario/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        return [];
    }
}



// Exibir todos os resultados iniciais ao carregar a página
window.onload = async () => {
    const data = await fetchData();
    const usuario = await readDataUsuario(IdAtual);
    const resultsContainer = document.getElementById('resultsContainer');
    console.log(usuario)
    usuario.Grupos.forEach(element => {
        data.forEach(item => {
            if (item.id == element) {
                console.log(item)
                const gridContent = document.createElement('div');
                gridContent.className = 'grid-content';
                gridContent.innerHTML = `
            <img src="${item.Foto}">
            <h1>${item.Nome}</h1>
            <p>${item.Resume}</p>
            <a href="/pages/ProjetoPage.html?id=${item.id}">Entrar</a>
            `;
                resultsContainer.appendChild(gridContent);
            }
        })
        console.log(element)

    })
}
