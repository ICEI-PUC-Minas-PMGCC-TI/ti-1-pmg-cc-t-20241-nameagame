
const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev'

/**
 * Leitura de dados do JSON server
 * @returns objeto lido no JSON server
 */
function readDataUsuario(FunctionCallBack, id) {
    fetch(`${dataURL}/Usuario`)
        .then((res) => res.json())
        .then(data => {
            // console.log(data)
            FunctionCallBack(data, id);
            return data;
        })
}


/**
 * Manda para o JSON server qualquer objeto
 * @param {object} dado objeto a ser salvado no JSON server
 */
async function saveDataUsuario(dado) {
    fetch(`${dataURL}/Usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dado)
    }).then(response => response.json())
        .then(dado => {
            alert("Usuário criado com sucesso");
            window.location.href = '/pages/login.html';
        })
        .then(console.log(dado))
}

/**
 * Coleta os dados preenchidos no formulário, testa a validade e os salva no JSON server
 */
function criarUsu() {
    let nome = document.getElementById("uname").value;
    let dom = document.getElementById("udominio").value;
    let curso = document.getElementById("ucurso").value;
    let email = document.getElementById("uemail").value;
    let tele = document.getElementById("utele").value;
    let senha = document.getElementById("usenha").value;
    let csenha = document.getElementById("uconfirmsenha").value;
    let error = document.getElementById("ErrorMsg");
    if (nome == "" || dom === "" || curso === "" || email === "" || tele === "" || senha === "") {
        // erro msg
        error.innerHTML = "Todos os valores tem que ser preenchidos!"
        console.log("erro");
    } else {
        if (senha != csenha) {
            // erro msg
            error.innerHTML = "Confirmação e senha estão diferentes"
            console.log("erro");
        } else {
            error.innerHTML = ""
            let Usuario = {
                Nome: nome,
                Dominio: dom,
                Curso: curso,
                Email: email,
                Telefone: tele,
                Senha: senha,
                Grupos: null
            }
            saveDataUsuario(Usuario)
            console.log(Usuario);
           
        }
    }
}

/**
 * Leitura de dados do JSON server
 * @returns objeto lido no JSON server
 */
function readDataAllUsuario(FunctionCallBack) {
    fetch(`${dataURL}/Usuario`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            FunctionCallBack(data);
            return data;
        })
}


/**
 * Funcao de serviço para o login
 */
function login() {
    readDataAllUsuario(loginB);
}


/**
 * Função para pegar os dados no formulário de login, comparar
 * com os do banco de dados e validar ou não o login
 * @param {object} data Objeto de dados do JSON server
 */
function loginB(data) {
    let email = document.getElementById("loginEmail");
    let senha = document.getElementById("loginSenha");
    let Erro = document.getElementById("ErrorMsg");
    let x = 0;
    let y = false;
    while (x < data.length && !false) {
        if (data[x].Email == email.value && data[x].Senha == senha.value) {
            alert("Login efeituado com sucesso");
            // Mudaria para proxima pagina logo em seguida
            Erro.innerHTML = ""; // limpar caixa de erro
            sessionStorage.setItem('login', JSON.stringify(data[x].id)); //salva no session storage o id do usuario logado
            y = true;
        }
        x += 1;
    }
    if (y === false) {
        Erro.innerHTML = "Login inválido";
    } else {
        Id = sessionStorage.getItem('login') - 1 //Id nao comeca do 0, por isso tirar 1 unidade;
        if(data[Id].Grupos === null){
            alert(`Login Feito: ${Id} Grupos = ${data[Id].Grupos}`);
           (window.location.href = '/pages/pesquisa.html');
        } else if((data[Id].Grupos.length === 1)) {
            alert(`Login Feito: ${Id} Grupos = ${data[Id].Grupos}`);
            (window.location.href = '/pages/ProjetoPage.html');
        } else {
            alert(`Login Feito: ${Id} Mais de um grupo`);
            (window.location.href = '/pages/meusGrupos.html');
        }
      
    }
}



