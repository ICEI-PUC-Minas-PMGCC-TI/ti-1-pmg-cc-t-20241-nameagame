class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu); // Seleciona o elemento do DOM que representa o botão do menu móvel
        this.navList = document.querySelector(navList);       // Seleciona o elemento do DOM que representa a lista de navegação
        this.navLinks = document.querySelectorAll(navLinks);  // Seleciona todos os elementos do DOM que representam os links de navegação
        this.activeClass = "active";                          // Define a classe que será adicionada/ removida para ativar/desativar o menu
        
        this.handleClick = this.handleClick.bind(this);       // Garante que o método handleClick sempre terá o contexto correto (a instância da classe)

    }

    // Método que anima os links de navegação
    animateLinks() {
        // Para cada link de navegação, define ou remove a animação
        this.navLinks.forEach((link, index) => {
            if (link.style.animation) {
                // Se a animação já está definida, remove-a
                link.style.animation = "";
            } else {
                // Caso contrário, define a animação com um atraso baseado no índice do link
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    // Método que lida com o clique no botão do menu móvel
    handleClick() {
        // Alterna a classe 'active' na lista de navegação
        this.navList.classList.toggle(this.activeClass);
        
        // Alterna a classe 'active' no botão do menu móvel
        this.mobileMenu.classList.toggle(this.activeClass);
        
        // Chama o método para animar os links
        this.animateLinks();
    }

    // Método que adiciona o evento de clique ao botão do menu móvel
    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    // Método de inicialização que verifica se o botão do menu móvel existe e adiciona o evento de clique
    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

// Cria uma nova instância da classe MobileNavbar e inicializa com os seletores fornecidos
const mobileNavbar = new MobileNavbar(
    ".mobile-menu",  // Seletor do botão do menu móvel
    ".nav-list",     // Seletor da lista de navegação
    ".nav-list li"   // Seletor dos links de navegação
);
mobileNavbar.init();  // Inicializa o menu móvel
