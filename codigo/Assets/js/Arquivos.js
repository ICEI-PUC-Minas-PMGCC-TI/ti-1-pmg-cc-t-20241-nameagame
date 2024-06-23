
const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
Expandir arquivo ta suspenso


var expandir = true;

function expandirArquivo() {
  let div = document.getElementById("arquivo");
  let btn = document.getElementById("btnArquivo");
  let icon = document.getElementById("expIcon");
  if (expandir) {
    div.style.width = "95%";
    btn.style.left = "98%";
    expandir = false;
    sleep(2000).then(() => { icon.className = "fa-solid fa-chevron-left" })

  } else {
    div.style.width = "33%";
    btn.style.left = "95%";
    expandir = true;
    sleep(2000).then(() => { icon.className = "fa-solid fa-chevron-right" })
  }
}
*/
async function readDataFile() {
  let response = await fetch(`${dataURL}/Arquivos`, {
    method: "GET",
  });
  let data = await response.json().then(console.log("lido"));
  console.log(data)
  return (data);
}

function saveDataFile(dado) {
  fetch(`${dataURL}/Arquivos`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dado)
  }).then(response => response.json())
}

function deleteDataArquivo(id) {
  fetch(`${dataURL}/Arquivos/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(console.log("deletado"))
}


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
async function addFile() {
  let item = document.getElementById("fileAdd");
  //mainDiv.innerHTML = item.value;

  document.querySelector('#fileAdd').addEventListener('change', async (e) => {
    const data = await getBase64(e.target.files[0])
    let arqNome = (item.value.split(/(\\|\/)/g).pop());
    let file = {
      Nome: arqNome,
      Conteudo: data,
    };
    console.log(file)
    saveDataFile(file).then(()=>{loadFile()})
  })

}


async function loadFile() {
  console.log("teste")
  var projecao = " "
  let allFiles = await readDataFile()
  console.log(allFiles.length)
  for (let i = allFiles.length - 1; i >= 0; i--) {
    projecao = `<div id="${allFiles[i].id}">
    <a class="mx-1 download" id="a${allFiles[i].id}" href="${allFiles[i].Conteudo}" download="${allFiles[i].Nome}" 
    target="_blank" title="Baixar seu arquivo">
    <i class="fa-solid fa-download"></i></a> 
    <span>${allFiles[i].Nome}</span>
    <span id="deleteFile" onclick="deleteFile(${allFiles[i].id})">
    <i class=" fa-solid fa-trash"></i></span></div>` + projecao;
    //console.log(projecao)
  }
  let mainDiv = document.getElementById("f");
  mainDiv.innerHTML = projecao

}

async function downloadFile(id) {
  data = await readDataFile();
  for (let i = 0; i < data.length; i++) {
    if (id === data[i].id) {
      aElement.getElementById(`a${id}`);
      aElement.setAttribute('download', data[i].Nome);
      const href = URL.createObjectURL(data[i].Conteudo);
      aElement.href = href;
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    }
  }

}

async function deleteFile(id) {
  deleteDataArquivo(id);
  document.getElementById(id).remove()

}




