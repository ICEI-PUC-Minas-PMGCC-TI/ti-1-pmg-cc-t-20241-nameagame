document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const month = document.querySelector(".month");
  const tarefas = document.querySelector(".addTarefas");
  const gravarBtn = document.querySelector("#Botao-gravar");
  const todayBtn = document.querySelector(".today-btn");
  const diaSelecionadoInput = document.createElement("input"); // Crie um input para guardar o dia
  const Abatarefas = document.querySelector(".contemTarefa .tarefasContida ");
  const limparBtn = document.querySelector("#Botao-limpar");


  //--------------------------------FUNÇÕES JSONServer-----------------------------------//


  const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev';

  /**
   * Manda para o JSON server qualquer objeto
   * @param {object} dado objeto a ser salvado no JSON server
   */
  function saveDataTarefas(dado) {
    fetch(`${dataURL}/Tarefas`, { //TROCAR PARA ID do respectivo trabalho
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
  // Função para excluir as tarefas do dia
  function DeleteTarefasDia(dia) {
    fetch(`${dataURL}/Tarefas/${dia}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log(`Tarefas do dia ${dia} excluídas com sucesso.`);
        readDataAllTarefas(displayTarefas, dia); // Atualiza a lista de tarefas após a exclusão
      } else {
        console.error('Erro ao excluir tarefas:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Erro ao excluir tarefas:', error);
    });
  }

  function readDataAllTarefas(FunctionCallBack, dia) {
    fetch(`${dataURL}/Tarefas?dia=${dia}`)
      .then((res) => res.json())
      .then(data => {
        FunctionCallBack(dia, data);
        return data;
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

  //-------------------------------- END - FUNÇÕES JSONServer -----------------------------------//



  //--------------------------------EventListener - BOtÕES-----------------------------------//

 
  gravarBtn.addEventListener("click", toggleEditMode);
  limparBtn.addEventListener("click", ExcluiTarefas);
  

  //--------------------------------End - EventListener BOtÕES-----------------------------------//


 //--------------------------------Funções Tarefas-----------------------------------//

  // Função para salvar as tarefas
  function salvarTarefa() {
    const dia = parseInt(diaSelecionadoInput.value); // Converte para inteiro
    const nomeTarefa = document.getElementById("NomaTarefa").value;
    const descricaoTarefa = document.getElementById("DescriçãoTarefa").value;


    // Criamos o objeto `novaTarefa`
    // Adicionamar uma propriedade dinâmica ao objeto `novaTarefa` // A fazer
    
    let novaTarefa = { // .push() // A fazer
        id: dia,  
        dia: dia,
        nome: nomeTarefa,
        descricao: descricaoTarefa,
        feito: false,
        cor: "#FFFFFF"
    };

    saveDataTarefas(novaTarefa);
    console.log(novaTarefa);
    readDataAllTarefas(displayTarefas, diaSelecionadoInput.value);

  }

  // Função para exibir as tarefas
  function displayTarefas(dia, tarefa) {
    Abatarefas.innerHTML = ''; // Limpa a lista de tarefas

    fetch(`https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev/Tarefas?dia=${dia}`)
      .then(response => response.json())
      .then(tarefas => {
        tarefas.forEach(tarefa => {
          // Criar o elemento da tarefa
          const tarefaElement = document.createElement("div");
          tarefaElement.classList.add("card");
          tarefaElement.style.width = "20rem";

          // Criar os elementos internos
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.innerHTML = `<strong>${tarefa.nome}</strong>`;

          const cardText = document.createElement("p");
          cardText.classList.add("card-text");
          cardText.textContent = tarefa.descricao;

          // Adicionar os elementos filhos
          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);

          // Adicionar o cardBody à tarefaElement
          tarefaElement.appendChild(cardBody);

          // Adicionar a tarefa à página
          Abatarefas.appendChild(tarefaElement);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar tarefas:', error);
      });
  }

  // Função para alternar entre modo de edição e visualização
  function toggleEditMode() {
    const nomeInput = document.getElementById("NomaTarefa");
    const descricaoTextarea = document.getElementById("DescriçãoTarefa");

      salvarTarefa();

      nomeInput.value = "";
      descricaoTextarea.value = "";

      if (tarefas.style.display == "flex") {
        tarefas.style.display = "none";
      } else {
        tarefas.style.display = "flex";
      }
  }

  // Função para limpar as tarefas
  function ExcluiTarefas() {
    Abatarefas.innerHTML = ""; // Limpa o conteúdo do container das tarefas
    DeleteTarefasDia(diaSelecionadoInput.value); // Excluir as tarefas do dia selecionado

  }

//--------------------------------END - Funções Tarefas-----------------------------------//


//--------------------------------Funções Calendario-----------------------------------//

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // obter a data atual
  const date = new Date();

  // obter o mês atual
  let mesAtual = date.getMonth();

  // obter o ano atual
  let anoATUAL = date.getFullYear();

  // Função para renderizar o calendário
  function renderCalendar() {
    // obter os dias do mês anterior, mês atual e próximo mês
    date.setDate(1);
    const firstDay = new Date(anoATUAL, mesAtual, 1);
    const lastDay = new Date(anoATUAL, mesAtual + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(anoATUAL, mesAtual, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    // atualizar o ano e mês atual no cabeçalho
    month.innerHTML = `${months[mesAtual]} ${anoATUAL}`;

    // atualizar o HTML dos dias
    let daysHTML = "";

    // HTML dos dias do mês anterior
    for (let x = firstDay.getDay(); x > 0; x--) {
      daysHTML += `<div class="btn day prev">${prevLastDayDate - x + 1}</div>`;
    }

    // dias do mês atual
    for (let i = 1; i <= lastDayDate; i++) {
      // verificar se é hoje, então adicionar a classe "today"
      if (
        i === new Date().getDate() &&
        mesAtual === new Date().getMonth() &&
        anoATUAL === new Date().getFullYear()
      ) {
        daysHTML += `<div class="btn day today">${i}</div>`;
      } else {
        daysHTML += `<div class="btn day">${i}</div>`;
      }
    }

    // dias do próximo mês
    for (let j = 1; j <= nextDays; j++) {
      daysHTML += `<div class="btn day next">${j}</div>`;
    }

    // executar esta função a cada renderização do calendário
    hideTodayBtn();
    daysContainer.innerHTML = daysHTML;

    // adicionar evento de clique aos dias após renderizar
    addDayClickEvent();
  }

  // Função para adicionar o evento de clique aos dias
  function addDayClickEvent() {
    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach((day) => {
      day.addEventListener("click", (e) => {
        // Remover a classe "selected" de todos os dias
        dayElements.forEach((d) => d.classList.remove("selected"));

        // Adicionar a classe "selected" ao dia clicado
        e.target.classList.add("selected");

        // Mostrar o elemento de tarefas
        if (tarefas.style.display == "flex") {
          tarefas.style.display = "none";
        } else {
          tarefas.style.display = "flex";
        }

        // Limpar as tarefas no campo de entrada
        document.getElementById("NomaTarefa").value = "";
        document.getElementById("DescriçãoTarefa").value = "";

        // Atualizar o input hidden com o dia selecionado
        diaSelecionadoInput.value = e.target.innerText;

        // Carregar as tarefas do dia selecionado
        readDataAllTarefas(displayTarefas, diaSelecionadoInput.value);

      });
    });
  }



  // Botão para o próximo mês
  nextBtn.addEventListener("click", () => {
    // Aumentar o mês atual em um
    mesAtual++;
    if (mesAtual > 11) {
      mesAtual = 0;
      anoATUAL++;
    }
    renderCalendar();
  });

  

  // Botão para o mês anterior
  prevBtn.addEventListener("click", () => {
    // Diminuir em um
    mesAtual--;
    if (mesAtual < 0) {
      mesAtual = 11;
      anoATUAL--;
    }
    renderCalendar();
  });

  // Ir para hoje
  todayBtn.addEventListener("click", () => {
    // Definir o mês e o ano como atuais
    mesAtual = date.getMonth();
    anoATUAL = date.getFullYear();
    renderCalendar();
  });



  // Esconder o botão "hoje" se já for o mês atual e vice-versa
  function hideTodayBtn() {
    if (
      mesAtual === new Date().getMonth() &&
      anoATUAL === new Date().getFullYear()
    ) {
      todayBtn.style.display = "none";
    } else {
      todayBtn.style.display = "flex";
    }
  }

  // Adicionar o input hidden para o dia selecionado
  tarefas.appendChild(diaSelecionadoInput);
  diaSelecionadoInput.type = "hidden";
  diaSelecionadoInput.id = "dia-selecionado";

  // Adicionar um div para a lista de tarefas
  const tarefasList = document.createElement("div");
  tarefasList.classList.add("tarefas-list");
  tarefas.appendChild(tarefasList);

  renderCalendar();
});   


//--------------------------------END - Funções Calendario-----------------------------------//