const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");


const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Agos", 
  "Set",
  "Out",
  "Nov",
  "Dez",
];



const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

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
  let days = "";

  // HTML dos dias do mês anterior
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="btn day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // dias do mês atual
  for (let i = 1; i <= lastDayDate; i++) {
    // verificar se é hoje, então adicionar a classe "today"
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // se a data, mês e ano coincidem, adicionar "today"
      days += `<div class="btn day today">${i}</div>`;
    } else {
      // caso contrário, não adicionar "today"
      days += `<div class="btn day ">${i}</div>`;
    }
  }

  // dias do próximo mês
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="btn day next">${j}</div>`;
  }

  // executar esta função a cada renderização do calendário
  hideTodayBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  // aumentar o mês atual em um
  currentMonth++;
  if (currentMonth > 11) {
    // se o mês for maior que 11, definir como 0 e aumentar o ano em um
    currentMonth = 0;
    currentYear++;
  }
  // renderizar novamente o calendário
  renderCalendar();
});

// botão do mês anterior
prevBtn.addEventListener("click", () => {
  // diminuir em um
  currentMonth--;
  // verificar se é menor que 0, então definir como 11 e diminuir o ano
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
  // renderizar novamente o calendário
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
