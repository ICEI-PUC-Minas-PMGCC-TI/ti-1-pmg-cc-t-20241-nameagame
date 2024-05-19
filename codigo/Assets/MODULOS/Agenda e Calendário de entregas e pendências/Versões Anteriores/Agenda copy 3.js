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
  let currentMonth = date.getMonth();

  // obter o ano atual
  let currentYear = date.getFullYear();

  let tarefasPorDia = {}; // Objeto para guardar as tarefas por dia

  // Função para renderizar o calendário
  function renderCalendar() {
    // obter os dias do mês anterior, mês atual e próximo mês
    date.setDate(1);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    // atualizar o ano e mês atual no cabeçalho
    month.innerHTML = `${months[currentMonth]} ${currentYear}`;

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
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
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
        document.getElementById("exampleFormControlInput1").value = "";
        document.getElementById("exampleFormControlTextarea1").value = "";

        // Atualizar o input hidden com o dia selecionado
        diaSelecionadoInput.value = e.target.innerText;

        // Carregar as tarefas do dia selecionado
        displayTarefas(diaSelecionadoInput.value);
      });
    });
  }

  // Função para exibir as tarefas do dia selecionado
  function displayTarefas(dia) {
    // Limpar as tarefas existentes
    const tarefasList = document.querySelector(".tarefas-list");
    tarefasList.innerHTML = "";

    if (tarefasPorDia[dia]) {
      // Adicionar as tarefas do dia
      tarefasPorDia[dia].forEach((tarefa) => {
        const tarefaElement = document.createElement("div");
        tarefaElement.classList.add("fixed-text");
        tarefaElement.textContent = tarefa.nome + "\n" + tarefa.descricao;
        tarefasList.appendChild(tarefaElement);
      });
    }
  }

  // Função para salvar as tarefas
  function salvarTarefa() {
    const dia = diaSelecionadoInput.value; // Obter o dia selecionado
    const nomeInput = document.getElementById("exampleFormControlInput1");
    const descricaoTextarea = document.getElementById("exampleFormControlTextarea1");
    let nome = nomeInput.value;
    let descricao = descricaoTextarea.value;

    // Validar se o nome da tarefa está vazio
    if (nome === "") {
      alert("Por favor, insira o nome da tarefa.");
      return;
    }

    // Validar se a descrição da tarefa está vazia
    if (descricao === "") {
      alert("Por favor, insira a descrição da tarefa.");
      return;
    }

    // Criar a tarefa
    const tarefa = { nome, descricao };

    // Adicionar ou atualizar a tarefa no objeto tarefasPorDia
    if (!tarefasPorDia[dia]) {
      tarefasPorDia[dia] = []; // Criar um array vazio para o dia se não existir
    }
    tarefasPorDia[dia].push(tarefa); // Adicionar a tarefa ao array do dia correspondente

    // Limpar os campos de entrada
    nomeInput.value = "";
    descricaoTextarea.value = "";

    // Atualizar a exibição das tarefas
    displayTarefas(dia);
  }

  // Função para excluir a tarefa
  function excluirTarefa(dia) {
    // Encontrar a tarefa a ser excluída
    const tarefasList = document.querySelector(".tarefas-list");
    const tarefaElements = tarefasList.querySelectorAll(".fixed-text");

    // Se houver alguma tarefa, excluir
    if (tarefaElements.length > 0) {
      tarefaElements.forEach((tarefaElement) => {
        tarefaList.removeChild(tarefaElement);
      });
    }

    // Remover a tarefa do objeto tarefasPorDia
    tarefasPorDia[dia] = [];
  }

  // Função para alternar entre modo de edição e visualização
  function toggleEditMode() {
    const nomeInput = document.getElementById("exampleFormControlInput1");
    const descricaoTextarea = document.getElementById("exampleFormControlTextarea1");
    const dia = diaSelecionadoInput.value; // Obter o dia selecionado

    if (gravarBtn.innerText === "Gravar") {
      // Salvar e tornar texto fixo
      const nomeTarefa = nomeInput.value;
      const descricaoTarefa = descricaoTextarea.value;

      // Criar elementos de texto
      const nomeText = document.createElement("p");
      nomeText.innerText = nomeTarefa;
      nomeText.classList.add("fixed-text");

      const descricaoText = document.createElement("p");
      descricaoText.innerText = descricaoTarefa;
      descricaoText.classList.add("fixed-text");

      // Substituir inputs por texto
      nomeInput.parentNode.replaceChild(nomeText, nomeInput);
      descricaoTextarea.parentNode.replaceChild(descricaoText, descricaoTextarea);

      gravarBtn.innerText = "Excluir";

      // Atualizar o objeto tarefasPorDia e exibir tarefas
      salvarTarefa(dia);
      displayTarefas(dia);
    } else {
      // Voltar para modo editável
      const nomeText = document.querySelector(".fixed-text");
      const descricaoText = document.querySelectorAll(".fixed-text")[1];

      const nomeInput = document.createElement("input");
      nomeInput.type = "text";
      nomeInput.className = "form-control";
      nomeInput.id = "exampleFormControlInput1";
      nomeInput.value = nomeText.innerText;

      const descricaoTextarea = document.createElement("textarea");
      descricaoTextarea.className = "form-control";
      descricaoTextarea.id = "exampleFormControlTextarea1";
      descricaoTextarea.rows = "3";
      descricaoTextarea.value = descricaoText.innerText;

      // Substituir textos por inputs
      nomeText.parentNode.replaceChild(nomeInput, nomeText);
      descricaoText.parentNode.replaceChild(descricaoTextarea, descricaoText);

      gravarBtn.innerText = "Gravar";

      // Excluir a tarefa do objeto tarefasPorDia
      excluirTarefa(dia);
    }
  }

  gravarBtn.addEventListener("click", toggleEditMode);

  // Botão para o próximo mês
  nextBtn.addEventListener("click", () => {
    // Aumentar o mês atual em um
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Botão para o mês anterior
  prevBtn.addEventListener("click", () => {
    // Diminuir em um
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  // Ir para hoje
  todayBtn.addEventListener("click", () => {
    // Definir o mês e o ano como atuais
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    renderCalendar();
  });

  // Esconder o botão "hoje" se já for o mês atual e vice-versa
  function hideTodayBtn() {
    if (
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
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