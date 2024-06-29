
const url = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev/Usuario';
const IdAtual = sessionStorage.getItem('login'); // Supondo que o ID do usuário é 1. Isso pode ser dinâmico.



/*@Function fetchProfile 
  @Param userId = ID do usuario
  @Return profile
*/
async function fetchProfile(userId) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
    try {
        console.log(IdAtual);
        const response = await fetch(`${url}/${userId}`,{
            method: "GET",
            headers: headersList
        });
        if (!response.ok) {
            console.error("Erro ao buscar perfil:", response.statusText);
            return null;
        }
        const profile = await response.json();
        return profile;
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return null;
    }
}
/*@Function saveProfile
  @Param userId = ID do usuario
  @Param profileData= dados inseridos
  Salva as alterações feitas pelo usuário
*/

async function saveProfile(userId, profileData) {
    try {
        const response = await fetch(`${url}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });
        if (response.ok) {
            alert("Perfil atualizado com sucesso!");
            window.location.href = 'perfil.html'; // Redireciona para a página de perfil após salvar
            console.log("a");
        } else {
            console.error("Erro ao atualizar perfil:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
    }
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

function updateImage() {
    document.querySelector('#project-foto').addEventListener('change', async (e) => {
        const data = await getBase64(e.target.files[0])
        localStorage.setItem('pfp-BASE64', data)
    })
}

/*
@Function populateForm
@Param profile = perfil (talvez trocar pelo ID)

Função de preenchimento e "população" do perfil*/

function populateForm(profile) {
    document.getElementById('userName').value = profile.Nome;
    if(profile.Bio != undefined){
        document.getElementById('userText').value = profile.Bio;
    }
    document.getElementById('universidade').value = profile.Dominio;
    if(profile.Origem != undefined){
        document.getElementById('origem').value = profile.Origem;
    }
    if(profile.Idade != undefined){
        document.getElementById('idade').value = profile.Idade;
    }
    document.getElementById('telefone').value = profile.Telefone;
    if(profile.Area_de_Atuacao != undefined){
        document.getElementById('area').value = profile.Area_de_Atuacao;
    }
    document.getElementById('graduacoes').value = profile.Curso;
}

document.getElementById('editProfileForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const user = await fetchProfile(IdAtual);
    const profileData = {
        Nome: document.getElementById('userName').value,
        Bio: document.getElementById('userText').value,
        Foto_perfil: localStorage.getItem('pfp-BASE64'),
        Dominio: document.getElementById('universidade').value,
        Origem: document.getElementById('origem').value,
        Idade: document.getElementById('idade').value,
        Area_de_Atuacao: document.getElementById('area').value,
        Curso: document.getElementById('graduacoes').value,
        Telefone: document.getElementById('telefone').value,
        Email: user.Email,
        Senha: user.Senha,
        Grupos: user.Grupos
    };

    await saveProfile(IdAtual, profileData);
});

function exibirPerfil(profile) {
    if (!profile) {
        console.error("Perfil não encontrado.");
        return;
    }

    document.getElementById('userName').textContent = profile.Nome;
    document.getElementById('userText').textContent = profile.Bio;
    document.getElementById('userImage').src = profile.Foto_perfil;
    document.getElementById('universidade').innerHTML = `<img src="/assets/images/area.png"> ${profile.Dominio}`;
    document.getElementById('origem').innerHTML = `<img src="/assets/images/area.png"> ${profile.Origem}`;
    document.getElementById('idade').innerHTML = `<img src="/assets/images/area.png"> ${profile.Idade}`;
    document.getElementById('area').innerHTML = `<img src="/assets/images/area.png"> ${profile.Area_de_Atuacao}`;
    document.getElementById('graduacoes').innerHTML = `<img src="/assets/images/area.png"> ${profile.Graduacoes}`;
}

async function iniciar() {
    const profile = await fetchProfile(IdAtual);
    if (profile) {
        populateForm(profile);
    }
}

iniciar();