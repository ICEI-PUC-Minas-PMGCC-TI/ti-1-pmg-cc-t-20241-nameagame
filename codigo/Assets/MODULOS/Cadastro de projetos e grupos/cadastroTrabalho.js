var idLocal = 0;
var qntElementos = 0;

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

    let objDados = {
        Trabalho: [
            {
                id: 0,
                Foto: "data:image/png;base64,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",
                Nome: "Aqui fica o nome do seu projeto, máximo de 30 caracteres",
                Resume: "Já aqui fica o resumo do seu projeto, escreva o quanto quiser",
                Área_de_atuação:
                    ["E nesse campo as áreas escolhidas",
                        "incluindo um tema primário e secundário"]
            }

        ]
    };
    idLocal += 1;
    localStorage.setItem('db', JSON.stringify(objDados));
}
/**
 * Leitura de dados do localStorage
 * @returns objeto lido no localStorage
 */
function readData() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    return objDados;
}
/**
 * Manda para o localstorage qualquer objeto
 * @param {object} dados objeto a ser salvado no localstorage
 */
function saveData(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}
/**
 * Atualiza os dados no localStorage
 * @returns Os dados salvos
 */
function updateData() {
    let objDados = readData();


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
    qntElementos += 1;
    console.log(qntElementos);

    objDados.Trabalho.push(newProject);

    saveData(objDados);
    return (objDados);
}

/**
 * Atualiza o ProjectCard com os dados do LocalStorage
 */

function updateProjectCard() {
    let nome = document.getElementById("name");
    let resume = document.getElementById("resume");
    let tema = document.getElementById("tema");
    let foto = document.querySelector("#foto-preview");

    let objDados = readData();
    nome.innerHTML = objDados.Trabalho[qntElementos].Nome;
    resume.innerHTML = objDados.Trabalho[qntElementos].Resume;
    if (objDados.Trabalho[qntElementos].Área_de_atuação[1] == 'nenhum') {
        tema.innerHTML = objDados.Trabalho[qntElementos].Área_de_atuação[0];
    } else {
        tema.innerHTML = objDados.Trabalho[qntElementos].Área_de_atuação[0] + ", " + objDados.Trabalho[qntElementos].Área_de_atuação[1];
    }
    foto.src = objDados.Trabalho[qntElementos].Foto;

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
document.getElementById("btn-criar").addEventListener('click', updateData);

