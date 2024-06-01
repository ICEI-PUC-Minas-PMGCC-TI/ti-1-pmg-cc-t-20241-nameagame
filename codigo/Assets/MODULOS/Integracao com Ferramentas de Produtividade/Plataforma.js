document.addEventListener("DOMContentLoaded", () => {
  const AbaIncluirBtn = document.querySelector("#Botao-AbaPlataforma");
  const IncluirBtn = document.querySelector("#Botao-Incluir");
  const LimpaPlataformasBtn = document.querySelector("#Botao-limparPlataformas");
  const AbaIncluirPlataformas = document.querySelector(".IncluirPlataformas");
  const divContemPlataformas = document.querySelector(".ContemPlataformas");

  IncluirBtn.addEventListener("click", incluirPlataforma);
  LimpaPlataformasBtn.addEventListener("click", LimpaPlataformas);
  AbaIncluirBtn.addEventListener("click", AbrirAba);

  renderizarPlataformas();   // Chame renderizarPlataformas() para carregar as plataformas do localStorage

  // Função para salvar plataforma
  function SalvarPlataforma() {
    const id = Date.now();

    const Nomedaplataforma = document.getElementById("Nomedaplataforma").value;
    const Linkdaplataforma = document.getElementById("Linkdaplataforma").value;
    const Linkdalogo = document.getElementById("Linkdalogo").value;


    let Plataformas = JSON.parse(localStorage.getItem('db')) || {};

    if (!Plataformas.Plataformas) {
      Plataformas.Plataformas = [];
    }

    Plataformas.Plataformas.push({
      id: id,
      Logo: Linkdalogo, // Adicione a propriedade "Logo"
      Nome_da_plataforma: Nomedaplataforma,
      Não_quero_ver: false,
      Link: Linkdaplataforma
    });

    localStorage.setItem('db', JSON.stringify(Plataformas));
  }

  // Função para limpar plataformas
  function LimpaPlataformas() {
    divContemPlataformas.innerHTML = "";

    let Plataformas = JSON.parse(localStorage.getItem('db')) || {};
    Plataformas.Plataformas = [];

    localStorage.setItem('db', JSON.stringify(Plataformas));
  }

  // Função para incluir plataforma
  function incluirPlataforma() {
    SalvarPlataforma();
    renderizarPlataformas();

    document.getElementById("Nomedaplataforma").value = "";
    document.getElementById("Linkdaplataforma").value = "";
     document.getElementById("Linkdalogo").value = "";


    if (AbaIncluirPlataformas.style.display == "flex") {
      AbaIncluirPlataformas.style.display = "none";
    } else {
      AbaIncluirPlataformas.style.display = "flex";
    }
  }

  // Função para abrir aba
  function AbrirAba() {
    if (AbaIncluirPlataformas.style.display == "flex") {
      AbaIncluirPlataformas.style.display = "none";
    } else {
      AbaIncluirPlataformas.style.display = "flex";
    }
  }

  // Função para renderizar plataformas
  function renderizarPlataformas() {
    divContemPlataformas.innerHTML = ''; // Limpa o conteúdo antes de renderizar

    let Plataformas = JSON.parse(localStorage.getItem('db')) || {};

    if (Plataformas.Plataformas) {
      Plataformas.Plataformas.forEach(plataforma => {
        const plataformaDiv = document.createElement('div');
        plataformaDiv.classList.add('plataforma'); // Adicione uma classe para estilizar

        plataformaDiv.innerHTML = `
          <div class="card" style="width: 18rem;">
          <img src="${plataforma.Logo}" alt="${plataforma.Nome_da_plataforma} Logo">
          <ul class="list-group list-group-flush">
          <a href="${plataforma.Link}" target="_blank"><li class="list-group-item">${plataforma.Nome_da_plataforma}</li></a>
          </ul>
        </div>
        `;

        console.log(plataforma.Logo)  

        // <img src="${plataforma.Logo}" alt="${plataforma.Nome_da_plataforma} Logo">
        // <h3>${plataforma.Nome_da_plataforma}</h3>
        // <a href="${plataforma.Link}" target="_blank">Acessar</a>
        // <!-- Adicione a imagem do logo aqui -->

        divContemPlataformas.appendChild(plataformaDiv);
      });
    }
  }

});