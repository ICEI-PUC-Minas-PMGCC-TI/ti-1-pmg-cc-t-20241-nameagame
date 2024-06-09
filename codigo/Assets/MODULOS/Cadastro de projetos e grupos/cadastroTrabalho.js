var idLocal = 0;
var qntElementos = 0;
const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev'

/**
 * getBase64 - Transforma qualquer arquivo em base64, para exporta-lo como string depois
 * @param {file} file Arquivo no qual transforma em base64
 *  
 */
function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result)
        };
        reader.onerror = reject
    })
}
/**
 * Dados iniciais da database do localstorage, incluindo informações para o usuário de como o site se porta
*/
function initData() {
    readData(processData,0);
}
function processData(data,id){
    let nome = document.getElementById("name");
    let resume = document.getElementById("resume");
    let tema = document.getElementById("tema");
    let foto = document.querySelector("#foto-preview");

    nome.innerHTML = data[id].Nome;
    resume.innerHTML = data[id].Resume;
    console.log(data[id].Área_de_atuação[1])
    
    if (data[id].Área_de_atuação[1] == 'nenhum') {
        tema.innerHTML = data[id].Área_de_atuação[0];
    } else {
        tema.innerHTML = data[id].Área_de_atuação[0] + ", " + data[id].Área_de_atuação[1];
    }
    foto.src = data[id].Foto;
}

/**
 * Leitura de dados do localStorage
 * @returns objeto lido no localStorage
 */
function readData(FunctionCallBack,id) {
    fetch(`${dataURL}/Trabalho`)
                .then((res) => res.json())
                .then(data => {
                   // console.log(data)
                   FunctionCallBack(data,id);
                    return data;
                })  
    
}
/**
 * Manda para o localstorage qualquer objeto
 * @param {object} dado objeto a ser salvado no localstorage
 */
function saveData(dado) {
    fetch(`${dataURL}/Trabalho`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dado)
    }).then(response => response.json())
        .then(dado => {
            alert("Projeto criado com sucesso");
        })
        .then(console.log(dado))
}

/**
 * Atualiza os dados no localStorage
 * @returns Os dados salvos
 */
function updateData() {

    let strNome = document.getElementById("project-name").value;
    let strResume = document.getElementById("project-resume").value;
    let tipo1 = document.getElementById("tipo1").value;
    let tipo2 = document.getElementById("tipo2").value;
    let picture = localStorage.getItem('img-BASE64');

    let newProject = {
        id: idLocal,
        Foto: picture,
        Nome: strNome,
        Resume: strResume,
        Área_de_atuação: [tipo1, tipo2]
    };

    saveData(newProject);
}

/**
 * Atualiza um dos status do card de acordo com o valor colodado no input
 * @param {string} type Tipo de dado a ser atualizado
 */
function realTimeUpdate(type) {
    switch (type) {
        case 'name':
            let nome = document.getElementById("name");
            let strNome = document.getElementById("project-name").value;

            nome.innerHTML = strNome;
            break;
        case 'resume':
            let resume = document.getElementById("resume");
            let strResume = document.getElementById("project-resume").value;

            resume.innerHTML = strResume;
            break;
        case 'tema':
            let tema = document.getElementById("tema");
            let tipo1 = document.getElementById("tipo1").value;
            let tipo2 = document.getElementById("tipo2").value;
            console.log(tipo2);
            if (tipo2 == 'nenhum' ) {
                tema.innerHTML = tipo1;
            } else {
                tema.innerHTML = tipo1 + ", " + tipo2;
            }

            break;
        default:
            break;
    }
}

function updateImage() {
    let foto = document.querySelector("#foto-preview");
    document.querySelector('#project-foto').addEventListener('change', async (e) => {
        const data = await getBase64(e.target.files[0])
        localStorage.setItem('img-BASE64', data)
        foto.src = localStorage.getItem('img-BASE64')
    })
}

function load(){
    let opcao = prompt("Qual opcao?");
    readData(processData,opcao);
}
//document.getElementById("btn-criar").addEventListener('click', updateData());

