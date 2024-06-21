
//let const url = Insert URL

/*@Function fetchProfile 
  @Param userId = ID do usuario
  @Return profile
*/
async function fetchProfile(userId) {
    try {
        const response = await fetch(`http://localhost:3000/perfis/${userId}`);
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
        const response = await fetch(`http://localhost:3000/perfis/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });
        if (response.ok) {
            alert("Perfil atualizado com sucesso!");
            window.location.href = 'profile.html'; // Redireciona para a página de perfil após salvar
        } else {
            console.error("Erro ao atualizar perfil:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
    }
}
/*
@Function populateForm
@Param profile = perfil (talvez trocar pelo ID)

Função de preenchimento e "população" do perfil*/

function populateForm(profile) {
    document.getElementById('userName').value = profile.userName;
    document.getElementById('userText').value = profile.userText;
    document.getElementById('userImageURL').value = profile.userImageURL;
    document.getElementById('universidade').value = profile.universidade;
    document.getElementById('origem').value = profile.origem;
    document.getElementById('idade').value = profile.idade;
    document.getElementById('area').value = profile.area;
    document.getElementById('graduacoes').value = profile.graduacoes;
}

document.getElementById('editProfileForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const profileData = {
        userName: document.getElementById('userName').value,
        userText: document.getElementById('userText').value,
        userImageURL: document.getElementById('userImageURL').value,
        universidade: document.getElementById('universidade').value,
        origem: document.getElementById('origem').value,
        idade: document.getElementById('idade').value,
        area: document.getElementById('area').value,
        graduacoes: document.getElementById('graduacoes').value
    };

    const userId = 1; // Supondo que o ID do usuário é 1. Isso pode ser dinâmico.
    await saveProfile(userId, profileData);
});

async function iniciar() {
    const userId = 1; // talvez também precise de alteração 
    const profile = await fetchProfile(userId);
    if (profile) {
        populateForm(profile);
    }
}

iniciar();
