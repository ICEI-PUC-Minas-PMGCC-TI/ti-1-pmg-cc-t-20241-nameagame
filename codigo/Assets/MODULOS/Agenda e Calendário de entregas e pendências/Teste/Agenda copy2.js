document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days"),
    nextBtn = document.querySelector(".next-btn"),
    prevBtn = document.querySelector(".prev-btn"),
    month = document.querySelector(".month"),
    tarefas = document.querySelector(".addTarefas"),
    gravarBtn = document.querySelector("#Botao-gravar"),
    todayBtn = document.querySelector(".today-btn");

  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // obter a data atual
  const date = new Date();

  // obter o mês atual
  let currentMonth = date.getMonth();

  // obter o ano atual
  let currentYear = date.getFullYear();

  // função para renderizar os dias
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

  //O dia clicado fica vermelho
  function addDayClickEvent() {
    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach(day => {
      day.addEventListener("click", (e) => {
        // remover a classe "selected" de todos os dias
        dayElements.forEach(d => d.classList.remove("selected"));

        // adicionar a classe "selected" ao dia clicado

        // mostrar o elemento de tarefas
        if (tarefas.style.display == "flex") {
          tarefas.style.display = "none";
          e.target.classList.remove("selected");
        } else {
          tarefas.style.display = "flex";
          e.target.classList.add("selected");
        }
      });
    });
  }

  function toggleEditMode() {
    const nomeInput = document.getElementById("exampleFormControlInput1");
    const descricaoTextarea = document.getElementById("exampleFormControlTextarea1");

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
    }
  }

  gravarBtn.addEventListener("click", toggleEditMode);

  nextBtn.addEventListener("click", () => {
    // aumentar o mês atual em um
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // botão do mês anterior
  prevBtn.addEventListener("click", () => {
    // diminuir em um
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  // ir para hoje
  todayBtn.addEventListener("click", () => {
    // definir o mês e o ano como atuais
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    renderCalendar();
  });

  // esconder o botão "hoje" se já for o mês atual e vice-versa
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

  renderCalendar();
});
