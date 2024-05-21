//Banco de dados emulado em JSON para fins de teste da funcionalidade 
const perfis = [
    {
        id: 12345,
        universidade: "Universidade ABC",
        origem: "Rio de Janeiro, Brasil",
        idade: "30 anos",
        area: "Engenharia",
        graduacoes: "Engenharia Civil",
        userName: "Maria Souza",
        userText: "Engenheira Civil com experiência em projetos de infraestrutura.",
        cardTitle1: "Projeto de Pontes",
        cardText1: "Projeto de construção de pontes para rodovias.",
        cardLink1: "Ver Projeto",
        cardTitle2: "Projeto de Edifícios",
        cardText2: "Projeto de construção de edifícios residenciais e comerciais.",
        cardLink2: "Ver Projeto",
        cardTitle3: "Projeto de Estradas",
        cardText3: "Projeto de pavimentação e alargamento de estradas.",
        cardLink3: "Ver Projeto",
        userImageURL: "assets/imagem1.jpg"
    },
    {
        id: 67890,
        universidade: "Universidade XYZ",
        origem: "Belo Horizonte, Brasil",
        idade: "28 anos",
        area: "Medicina",
        graduacoes: "Medicina",
        userName: "Pedro Oliveira",
        userText: "Médico especializado em cirurgia cardíaca.",
        cardTitle1: "Cirurgia Cardíaca",
        cardText1: "Projeto de pesquisa sobre técnicas de cirurgia cardíaca minimamente invasiva.",
        cardLink1: "Ver Projeto",
        cardTitle2: "Tratamento de Doenças Cardiovasculares",
        cardText2: "Estudo sobre novos tratamentos para doenças cardiovasculares.",
        cardLink2: "Ver Projeto",
        cardTitle3: "Prevenção de Infartos",
        cardText3: "Campanha de conscientização sobre a prevenção de infartos.",
        cardLink3: "Ver Projeto",
        userImageURL: "assets/imagem1.jpg"
    },
    {
        id: 13579,
        universidade: "Universidade DEF",
        origem: "Porto Alegre, Brasil",
        idade: "35 anos",
        area: "Marketing",
        graduacoes: "Administração de Empresas",
        userName: "Ana Santos",
        userText: "Especialista em marketing digital e redes sociais.",
        cardTitle1: "Campanha Publicitária",
        cardText1: "Desenvolvimento de uma campanha publicitária para lançamento de um novo produto.",
        cardLink1: "Ver Projeto",
        cardTitle2: "Gestão de Redes Sociais",
        cardText2: "Gerenciamento de redes sociais para empresas de diversos segmentos.",
        cardLink2: "Ver Projeto",
        cardTitle3: "SEO e Marketing de Conteúdo",
        cardText3: "Estratégias de SEO e produção de conteúdo para melhorar o posicionamento online.",
        cardLink3: "Ver Projeto",
        userImageURL: "assets/imagem1.jpg"
    }
];
function AvaliarUsuario() {
    let novoRating = prompt("Por favor, insira uma nova avaliação:");

    // Verifica se o usuário clicou em cancelar ou não inseriu nada
    if (novoRating === null || novoRating.trim() === "") {
        alert("Nenhuma avaliação inserida.");
        return;
    }

    // Verifica se o valor inserido é válido (um número entre 0 e 5)
    novoRating = parseFloat(novoRating);
    if (isNaN(novoRating) || novoRating < 1 || novoRating > 5) {
        alert("Avaliação inválida. Por favor, insira um número entre 1 e 5.");
        return;
    }

    // Atualiza o conteúdo da <span> com a nova avaliação, formatada com uma casa decimal
    document.querySelector('.userRating').textContent = novoRating.toFixed(1);
}


function exibirPerfil(indice) {
    const perfil = perfis[indice];
    if (!perfil) {
        console.error("Perfil não encontrado para o índice fornecido.");
        return;
    }

    // Atualizando o HTML com as informações do perfil
    document.getElementById('universidade').innerHTML = `<img src="assets/faculdade.png">${perfil.universidade}`;
    document.getElementById('origem').innerHTML = `<img src="assets/origem.png">${perfil.origem}`;
    document.getElementById('idade').innerHTML = `<img src="assets/idade.png">${perfil.idade}`;
    document.getElementById('area').innerHTML = `<img src="assets/area.png">${perfil.area}`;
    document.getElementById('graduacoes').innerHTML = `<img src="assets/graduacoes.png">${perfil.graduacoes}`;
    document.getElementById('userName').textContent = perfil.userName;
    document.getElementById('userText').textContent = perfil.userText;
    document.getElementById('cardTitle1').textContent = perfil.cardTitle1;
    document.getElementById('cardText1').textContent = perfil.cardText1;
    document.getElementById('cardLink1').textContent = perfil.cardLink1;
    document.getElementById('cardTitle2').textContent = perfil.cardTitle2;
    document.getElementById('cardText2').textContent = perfil.cardText2;
    document.getElementById('cardLink2').textContent = perfil.cardLink2;
    document.getElementById('cardTitle3').textContent = perfil.cardTitle3;
    document.getElementById('cardText3').textContent = perfil.cardText3;
    document.getElementById('cardLink3').textContent = perfil.cardLink3;
    document.getElementById('userImage').src = perfil.userImageURL;
}

function gerarProjetos(numeroDeProjetos) {
    const container = document.querySelector('.userProjects .container');

    // Limpa a área antes de gerar novos cards
    container.innerHTML = '<div class="row"></div>';
    let row = container.querySelector('.row');

    for (let i = 1; i <= numeroDeProjetos; i++) {
        if ((i - 1) % 3 === 0 && i > 1) {
            row = document.createElement('div');
            row.className = 'row';
            container.appendChild(row);
        }

        // Criando o card
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-4';
        cardDiv.style.width = '100%';

        const cardImg = document.createElement('img');
        cardImg.src = 'assets/imagem1.jpg'; 
        cardImg.className = 'card-img-top';
        cardImg.alt = `Imagem do projeto ${i}`;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.id = `cardTitle${i}`;
        cardTitle.textContent = `Projeto ${i}`;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.id = `cardText${i}`;
        cardText.textContent = `Descrição do projeto ${i}.`;

        const cardLink = document.createElement('a');
        cardLink.href = '#';
        cardLink.className = 'btn btn-primary';
        cardLink.id = `cardLink${i}`;
        cardLink.textContent = 'Ver Projeto';

        // Montando a estrutura do card
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardLink);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBody);
        col.appendChild(cardDiv);
        row.appendChild(col);
    }
}

// Chamada das funções para exibir perfil e gerar projetos
exibirPerfil(2);
gerarProjetos(4);



/*A partir daqui, as funções abaixo são as funções que deverão ser implementdas no projeto final, 
as acima são feitas com as de entrega e com finalidade de testes, já que as abaixo necessitam de parâmetros de outras telas do grupo
*/


``
/*
let avaliacoes = [];

// Função para carregar avaliações do Local Storage
function carregarAvaliacoes() {
    const avaliacoesSalvas = localStorage.getItem('avaliacoes');
    if (avaliacoesSalvas) {
        avaliacoes = JSON.parse(avaliacoesSalvas);
    }
}

// Função para salvar avaliações no Local Storage
function salvarAvaliacoes() {
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
}

// Função para avaliar um usuário
function AvaliarUsuario(idAvaliador, idUsuario, novaAvaliacao) {
    // Verifica se a avaliação é válida (um número entre 1 e 5)
    novaAvaliacao = parseFloat(novaAvaliacao);
    if (isNaN(novaAvaliacao) || novaAvaliacao < 1 || novaAvaliacao > 5) {
        alert("Avaliação inválida. Por favor, insira um número entre 1 e 5.");
        return;
    }

    // Verifica se o ID do avaliador já existe no array de avaliações
    let index = avaliacoes.findIndex(item => item.idAvaliador === idAvaliador);

    // Se o ID do avaliador já existir, atualiza a avaliação associada a esse ID
    if (index !== -1) {
        avaliacoes[index].avaliacao = novaAvaliacao;
    }
    // Caso contrário, adiciona um novo objeto ao array de avaliações
    else {
        avaliacoes.push({ idAvaliador: idAvaliador, avaliacao: novaAvaliacao });
    }

    // Salva as avaliações no Local Storage
    salvarAvaliacoes();

    // Calcula a média aritmética das avaliações
    let somaAvaliacoes = avaliacoes.reduce((total, item) => total + item.avaliacao, 0);
    let mediaAritmetica = somaAvaliacoes / avaliacoes.length;

    // Atualiza o conteúdo da <span> com a média aritmética das avaliações, formatada com uma casa decimal
    document.querySelector('.userRating').textContent = mediaAritmetica.toFixed(1);
}

// Inicializa as avaliações a partir do Local Storage quando a página for carregada
window.onload = carregarAvaliacoes;


AvaliarUsuario(idAvaliador, idUsuario, novaAvaliacao);
function gerarProjetos(numeroDeProjetos, projetos) {
    const container = document.querySelector('.userProjects .container');

    // Limpa a área antes de gerar novos cards
    container.innerHTML = '<div class="row"></div>';
    let row = container.querySelector('.row');

    for (let i = 0; i < numeroDeProjetos; i++) {
        if (i > 0 && i % 3 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            container.appendChild(row);
        }

        // Obtendo informações do projeto atual
        const projeto = projetos[i];

        // Criando o card
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-4';
        cardDiv.style.width = '100%';

        const cardImg = document.createElement('img');
        cardImg.src = projeto.imagem;
        cardImg.className = 'card-img-top';
        cardImg.alt = `Imagem do projeto ${projeto.id}`;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.id = `cardTitle${projeto.id}`;
        cardTitle.textContent = projeto.nome;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.id = `cardText${projeto.id}`;
        cardText.textContent = projeto.descricao;

        const cardLink = document.createElement('a');
        cardLink.href = '#';
        cardLink.className = 'btn btn-primary';
        cardLink.id = `cardLink${projeto.id}`;
        cardLink.textContent = 'Ver Projeto';

        // Montando a estrutura do card
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardLink);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBody);
        col.appendChild(cardDiv);
        row.appendChild(col);
    }
}

*/