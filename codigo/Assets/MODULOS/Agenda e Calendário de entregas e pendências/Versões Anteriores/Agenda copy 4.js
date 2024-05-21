document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const month = document.querySelector(".month");
  const tarefas = document.querySelector(".addTarefas");
  const gravarBtn = document.querySelector("#Botao-gravar");
  const todayBtn = document.querySelector(".today-btn");
  const diaSelecionadoInput = document.createElement("input"); // Crie um input para guardar o dia

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
        displayTarefas(diaSelecionadoInput.value);
      });
    });
  }

  let tarefasPorDia = {}; // Objeto para guardar as tarefas por dia

  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('tarefasPorDia')) {
        tarefasPorDia = JSON.parse(localStorage.getItem('tarefasPorDia'));
    }
    renderCalendar();
});


  // Função para exibir as tarefas do dia selecionado
  function displayTarefas(dia) {
    const tarefasList = document.querySelector(".tarefas-list");
    tarefasList.innerHTML = "";

    if (tarefasPorDia[dia]) {
        tarefasPorDia[dia].forEach((tarefa) => {
            const tarefaElement = document.createElement("div");
            tarefaElement.classList.add("fixed-text");
            tarefaElement.textContent = tarefa.nome + "\n" + tarefa.descricao;
            tarefasList.appendChild(tarefaElement);
        });
    }
}



  function initData() {
  // Função para salvar as tarefas

    let calendario = {
      Trabalho: [
         {
             id: 0,
             foto: "",
             Nome: "",
             Área_de_atuação: [ "", "" ]
         }, 
         {
     Calendário: [ 
         {
             Nome_da_Tarefa: "",
             Descrição_da_Tarefa: "",
             Data: "",
             Feito: "",
             Cor: ""
         }
     ]
    }
   ]
 };
 idLocal += 1;
 localStorage.setItem('db', JSON.stringify(calendario));

} 

function salvarTarefa() {
  const dia = diaSelecionadoInput.value;
  const nomeInput = document.getElementById("NomaTarefa");
  const descricaoTextarea = document.getElementById("DescriçãoTarefa");
  let nome = nomeInput.value;
  let descricao = descricaoTextarea.value;

  if (!tarefasPorDia[dia]) {
      tarefasPorDia[dia] = [];
  }

  tarefasPorDia[dia].push({ nome: nome, descricao: descricao });
  localStorage.setItem('tarefasPorDia', JSON.stringify(tarefasPorDia));
}


  // Função para alternar entre modo de edição e visualização
  function toggleEditMode() {
    const nomeInput = document.getElementById("NomaTarefa");
    const descricaoTextarea = document.getElementById("DescriçãoTarefa");
    const dia = diaSelecionadoInput.value;

    if (gravarBtn.innerText === "Gravar") {
        const nomeTarefa = nomeInput.value;
        const descricaoTarefa = descricaoTextarea.value;

        const nomeText = document.createElement("p");
        nomeText.innerText = nomeTarefa;
        nomeText.classList.add("fixed-text");

        const descricaoText = document.createElement("p");
        descricaoText.innerText = descricaoTarefa;
        descricaoText.classList.add("fixed-text");

        nomeInput.parentNode.replaceChild(nomeText, nomeInput);
        descricaoTextarea.parentNode.replaceChild(descricaoText, descricaoTextarea);

        gravarBtn.innerText = "Excluir";
        salvarTarefa();
        displayTarefas(dia);
    } else {
        const nomeText = document.querySelector(".fixed-text");
        const descricaoText = document.querySelectorAll(".fixed-text")[1];

        const nomeInput = document.createElement("input");
        nomeInput.type = "text";
        nomeInput.className = "form-control";
        nomeInput.id = "NomaTarefa";
        nomeInput.value = nomeText.innerText;

        const descricaoTextarea = document.createElement("textarea");
        descricaoTextarea.className = "form-control";
        descricaoTextarea.id = "DescriçãoTarefa";
        descricaoTextarea.rows = "3";
        descricaoTextarea.value = descricaoText.innerText;

        nomeText.parentNode.replaceChild(nomeInput, nomeText);
        descricaoText.parentNode.replaceChild(descricaoTextarea, descricaoText);

        gravarBtn.innerText = "Gravar";
        excluirTarefa(dia);
    }
}

function excluirTarefa(dia) {
  delete tarefasPorDia[dia];
  localStorage.setItem('tarefasPorDia', JSON.stringify(tarefasPorDia));
  displayTarefas(dia);
}



  gravarBtn.addEventListener("click", toggleEditMode);

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