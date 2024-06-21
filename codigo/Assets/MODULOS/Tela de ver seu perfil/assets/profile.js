// Declarar o URL de inicialização
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
/*@Function exibirPeril()
  @param profile = perfil (talvez mudar pra ID)*/

function exibirPerfil(profile) {
    if (!profile) {
        console.error("Perfil não encontrado.");
        return;
    }

    document.getElementById('userName').textContent = profile.userName;
    document.getElementById('userText').textContent = profile.userText;
    document.getElementById('userImage').src = profile.userImageURL;
    document.getElementById('universidade').innerHTML = `<img src="assets/faculdade.png"> ${profile.universidade}`;
    document.getElementById('origem').innerHTML = `<img src="assets/origem.png"> ${profile.origem}`;
    document.getElementById('idade').innerHTML = `<img src="assets/idade.png"> ${profile.idade}`;
    document.getElementById('area').innerHTML = `<img src="assets/area.png"> ${profile.area}`;
    document.getElementById('graduacoes').innerHTML = `<img src="assets/graduacoes.png"> ${profile.graduacoes}`;
}

async function iniciar() {
    const userId = 1; // Supondo que o ID do usuário é 1. Isso pode ser dinâmico.
    const profile = await fetchProfile(userId);
    if (profile) {
        exibirPerfil(profile);
    }
}

iniciar();
