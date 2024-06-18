document.addEventListener("DOMContentLoaded", () => {
  const AbaIncluirBtn = document.querySelector("#Botao-AbaPlataforma");
  const IncluirBtn = document.querySelector("#Botao-Incluir");
  const LimpaPlataformasBtn = document.querySelector("#Botao-limparPlataformas");
  const AbaIncluirPlataformas = document.querySelector(".IncluirPlataformas");
  const divContemPlataformas = document.querySelector(".ContemPlataformas");

  //--------------------------------FUNÇÕES JSONServer-----------------------------------//

  const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev';

  /**
   * Manda para o JSON server qualquer objeto
   * @param {object} dado objeto a ser salvado no JSON server
   */
  function saveDataPlataforma(dado) {
    fetch(`${dataURL}/Plataformas`, { //TROCAR PARA ID do respectivo trabalho
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dado)
    }).then(response => response.json())
      .then(dado => {
        console.log(dado);
        alert("Plataforma adicionada com sucesso");
      })
      .catch(error => {
        console.error('Erro:', error);
      });
      
  }

  /**
   * Apaga do JSON server os objetos
   */
  function DeleteAllPlataformas() {
    fetch(`${dataURL}/Plataformas`)
      .then(response => response.json())
      .then(data => {
        const deletePromises = data.map(plataforma => {
          return fetch(`${dataURL}/Plataformas/${plataforma.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        });

        Promise.all(deletePromises)
          .then(results => {
            results.forEach(result => {
              if (result.ok) {
                console.log('Plataforma deletada com sucesso');
              } else {
                console.error('Erro ao deletar a plataforma');
              }
            });
            alert("Plataformas deletadas com sucesso");
            renderizarPlataformas([]); // Limpa a visualização atual
          })
          .catch(error => {
            console.error('Erro ao deletar as plataformas:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao obter as plataformas:', error);
      });
  }

  function readDataAllPlataformas(FunctionCallBack) {
    fetch(`${dataURL}/Plataformas`)
      .then((res) => res.json())
      .then(data => {
        FunctionCallBack(data);
        return data;
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

  //-------------------------------- END - FUNÇÕES JSONServer -----------------------------------//



  //--------------------------------EventListener - BOtÕES-----------------------------------//
  

  IncluirBtn.addEventListener("click", incluirPlataforma);
  LimpaPlataformasBtn.addEventListener("click", LimpaPlataformas);
  AbaIncluirBtn.addEventListener("click", AbrirAba);


  //--------------------------------End - EventListener BOtÕES-----------------------------------//



  // Chame renderizarPlataformas() para carregar as plataformas do JSONServer
  readDataAllPlataformas(renderizarPlataformas);

  // Função para salvar plataforma
  function SalvarPlataforma() {
    const Nomedaplataforma = document.getElementById("Nomedaplataforma").value;
    const Linkdaplataforma = document.getElementById("Linkdaplataforma").value;
    const Linkdalogo = document.getElementById("Linkdalogo").value;

    const novaPlataforma = {
      Logo: Linkdalogo,
      Nome_da_plataforma: Nomedaplataforma,
      Não_quero_ver: false,
      Link: Linkdaplataforma
    };

    saveDataPlataforma(novaPlataforma);
    console.log(novaPlataforma);
    readDataAllPlataformas(renderizarPlataformas);
  }

  // Função para limpar plataformas
  function LimpaPlataformas() {
    DeleteAllPlataformas();
    renderizarPlataformas();
  }

  // Função para incluir plataforma
  function incluirPlataforma() {
    SalvarPlataforma();
    readDataAllPlataformas(renderizarPlataformas);

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
  function renderizarPlataformas(data) {
    divContemPlataformas.innerHTML = ''; // Limpa o conteúdo antes de renderizar

    data.forEach(plataforma => {
      const plataformaDiv = document.createElement('div');
      plataformaDiv.classList.add('plataforma'); // Adicione uma classe para estilizar

      plataformaDiv.innerHTML = `
        <a href="${plataforma.Link}" target="_blank" ><div class="card">
          <img src="${plataforma.Logo}" alt="${plataforma.Nome_da_plataforma}">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${plataforma.Nome_da_plataforma}</li>
          </ul>
        </div></a>
      `;

      divContemPlataformas.appendChild(plataformaDiv);
    });
  }
});
