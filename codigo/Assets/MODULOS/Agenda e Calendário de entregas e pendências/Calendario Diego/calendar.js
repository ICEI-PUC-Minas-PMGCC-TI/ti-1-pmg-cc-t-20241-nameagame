const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date(); // Objeto Date para armazenar a data atual
let activeDay; // Dia ativo do calendário
let month = today.getMonth(); // Mês atual
let year = today.getFullYear(); // Ano atual

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Array para armazenar os eventos
const eventsArr = [];
getEvents(); // Carrega eventos do localStorage (se houver)
console.log(eventsArr);

// Função para inicializar o calendário
function initCalendar() {
  // Cria objetos Date para o primeiro e último dia do mês atual
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Cria objetos Date para o último dia do mês anterior e para o dia atual
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate(); // Número de dias do mês anterior
  const lastDate = lastDay.getDate(); // Número de dias do mês atual
  const day = firstDay.getDay(); // Dia da semana do primeiro dia do mês (0 - domingo, 6 - sábado)
  const nextDays = 7 - lastDay.getDay() - 1; // Número de dias do próximo mês exibidos no calendário

  // Define o título do calendário com o nome do mês e o ano
  date.innerHTML = months[month] + " " + year;

  let days = ""; // String para armazenar o HTML dos dias do calendário

  // Cria os dias do mês anterior
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Cria os dias do mês atual
  for (let i = 1; i <= lastDate; i++) {
    // Verifica se há eventos no dia atual
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    // Verifica se o dia atual é o dia de hoje
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i; // Define o dia ativo
      getActiveDay(i); // Atualiza as informações do dia ativo
      updateEvents(i); // Atualiza a lista de eventos do dia ativo
      // Adiciona a classe "today active" ao dia de hoje, com ou sem classe "event"
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      // Adiciona a classe "event" ao dia se houver eventos, caso contrário, apenas a classe "day"
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  // Cria os dias do próximo mês
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  // Define o conteúdo do elemento daysContainer com o HTML dos dias
  daysContainer.innerHTML = days;

  // Adiciona event listeners aos dias do calendário
  addListner();
}

// Função para navegar para o mês anterior
function prevMonth() {
  month--; // Decrementa o mês
  if (month < 0) {
    // Se o mês for menor que 0, define o mês como 11 (dezembro) e decrementa o ano
    month = 11;
    year--;
  }
  initCalendar(); // Reinicializa o calendário
}

// Função para navegar para o próximo mês
function nextMonth() {
  month++; // Incrementa o mês
  if (month > 11) {
    // Se o mês for maior que 11, define o mês como 0 (janeiro) e incrementa o ano
    month = 0;
    year++;
  }
  initCalendar(); // Reinicializa o calendário
}

// Adiciona event listeners aos botões "prev" e "next"
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Inicializa o calendário
initCalendar();

// Função para adicionar event listeners aos dias do calendário
function addListner() {
  // Seleciona todos os elementos com a classe "day"
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    // Adiciona um event listener "click" a cada dia
    day.addEventListener("click", (e) => {
      // Define o dia ativo e atualiza as informações do dia ativo e os eventos
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // Remove a classe "active" de todos os dias
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // Se o dia clicado for do mês anterior ou do próximo mês, navega para o mês correspondente
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // Adiciona a classe "active" ao dia clicado após a mudança de mês
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        // Adiciona a classe "active" ao dia clicado após a mudança de mês
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        // Adiciona a classe "active" ao dia clicado
        e.target.classList.add("active");
      }
    });
  });
}

// Adiciona event listener ao botão "today" para exibir o dia de hoje
todayBtn.addEventListener("click", () => {
  today = new Date(); // Atualiza a data de hoje
  month = today.getMonth(); // Define o mês atual
  year = today.getFullYear(); // Define o ano atual
  initCalendar(); // Reinicializa o calendário
});

// Adiciona event listener ao campo de entrada de data para formatar a entrada
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, ""); // Remove caracteres inválidos
  if (dateInput.value.length === 2) {
    // Adiciona "/" após os dois primeiros dígitos
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    // Limita o tamanho da entrada para 7 caracteres (dd/aaaa)
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    // Se o usuário apagar caracteres, remove "/" se houver apenas 3 caracteres
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// Adiciona event listener ao botão "goto" para navegar para a data inserida
gotoBtn.addEventListener("click", gotoDate);

// Função para navegar para a data inserida
function gotoDate() {
  console.log("here"); // Log de depuração
  const dateArr = dateInput.value.split("/"); // Divide a entrada de data em dia e ano
  if (dateArr.length === 2) {
    // Verifica se a data é válida (dia entre 1 e 12 e ano com 4 dígitos)
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1; // Define o mês
      year = dateArr[1]; // Define o ano
      initCalendar(); // Reinicializa o calendário
      return;
    }
  }
  // Se a data for inválida, exibe um alerta
  alert("Invalid Date");
}

// Função para atualizar as informações do dia ativo
function getActiveDay(date) {
  const day = new Date(year, month, date); // Cria um objeto Date para o dia ativo
  const dayName = day.toString().split(" ")[0]; // Extrai o nome do dia da semana
  eventDay.innerHTML = dayName; // Define o nome do dia no elemento eventDay
  eventDate.innerHTML = date + " " + months[month] + " " + year; // Define a data no elemento eventDate
}

// Função para atualizar a lista de eventos do dia ativo
function updateEvents(date) {
  let events = ""; // String para armazenar o HTML dos eventos
  eventsArr.forEach((event) => {
    // Verifica se o evento está no dia ativo
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        // Cria o HTML para cada evento
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  // Se não houver eventos, exibe uma mensagem "No Events"
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events; // Define o conteúdo do elemento eventsContainer
  saveEvents(); // Salva os eventos no localStorage
}

// Adiciona event listener ao botão "add-event" para mostrar o modal de adição de eventos
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active"); // Mostra/esconde o modal
});

// Adiciona event listener ao botão "close" para esconder o modal
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active"); // Esconde o modal
});

// Esconde o modal se o usuário clicar em qualquer lugar fora dele
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active"); // Esconde o modal
  }
});

// Limita o tamanho do título do evento para 60 caracteres
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60); // Limita o título
});

// Permite apenas números e ":" no campo de hora "from"
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, ""); // Remove caracteres inválidos
  if (addEventFrom.value.length === 2) {
    // Adiciona ":" após os dois primeiros dígitos
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    // Limita o tamanho da entrada para 5 caracteres (hh:mm)
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// Permite apenas números e ":" no campo de hora "to"
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, ""); // Remove caracteres inválidos
  if (addEventTo.value.length === 2) {
    // Adiciona ":" após os dois primeiros dígitos
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    // Limita o tamanho da entrada para 5 caracteres (hh:mm)
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// Adiciona event listener ao botão "add-event-btn" para adicionar um novo evento
addEventSubmit.addEventListener("click", () => {
  // Obtém os valores dos campos de entrada
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  // Verifica se todos os campos estão preenchidos
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields"); // Exibe um alerta se algum campo estiver vazio
    return;
  }

  // Verifica se o formato da hora é válido (formato de 24 horas)
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format"); // Exibe um alerta se o formato da hora for inválido
    return;
  }

  // Converte a hora para o formato AM/PM
  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // Verifica se o evento já foi adicionado
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added"); // Exibe um alerta se o evento já foi adicionado
    return;
  }

  // Cria um novo objeto de evento
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent); // Log de depuração
  console.log(activeDay); // Log de depuração

  // Adiciona o evento ao array eventsArr
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // Se o evento não foi adicionado a um dia existente, adiciona-o como um novo dia
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr); // Log de depuração
  addEventWrapper.classList.remove("active"); // Esconde o modal
  addEventTitle.value = ""; // Limpa o campo de entrada do título
  addEventFrom.value = ""; // Limpa o campo de entrada da hora "from"
  addEventTo.value = ""; // Limpa o campo de entrada da hora "to"
  updateEvents(activeDay); // Atualiza a lista de eventos
  // Adiciona a classe "event" ao dia ativo se o evento não foi adicionado
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

// Adiciona event listener ao elemento eventsContainer para remover eventos
eventsContainer.addEventListener("click", (e) => {
  // Verifica se o usuário clicou em um evento
  if (e.target.classList.contains("event")) {
    // Confirma se o usuário deseja realmente remover o evento
    if (confirm("Are you sure you want to delete this event?")) {
      // Obtém o título do evento
      const eventTitle = e.target.children[0].children[1].innerHTML;
      // Itera sobre o array eventsArr para encontrar o evento e removê-lo
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          // Se não houver mais eventos no dia, remove o dia do array eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            // Remove a classe "event" do dia ativo
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay); // Atualiza a lista de eventos
    }
  }
});

// Função para salvar os eventos no localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr)); // Salva o array eventsArr no localStorage
}

// Função para carregar os eventos do localStorage
function getEvents() {
  // Verifica se há eventos salvos no localStorage
  if (localStorage.getItem("events") === null) {
    return; // Retorna se não houver eventos no localStorage
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events"))); // Carrega os eventos do localStorage
}

// Função para converter a hora para o formato AM/PM
function convertTime(time) {
  let timeArr = time.split(":"); // Divide a hora em horas e minutos
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM"; // Define o formato AM/PM
  timeHour = timeHour % 12 || 12; // Converte para o formato de 12 horas
  time = timeHour + ":" + timeMin + " " + timeFormat; // Junta a hora no formato AM/PM
  return time;
}