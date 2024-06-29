const url = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev/Usuario';
const IdAtual = sessionStorage.getItem('login');
// Declarar o URL de inicialização

async function fetchProfile(userId) {
    try {
        const response = await fetch(`${url}/${userId}`);
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

async function exibirPerfil(profile) {
    document.getElementById('userName').textContent = profile.Nome;
    document.getElementById('userText').textContent = profile.Bio;
    document.getElementById('uni').innerHTML = `<img src="/assets/images/faculdade.png"> ${profile.Dominio}`;
    if(profile.Origem != undefined){
        document.getElementById('origem').innerHTML = `<img src="/assets/images/origem.png"> ${profile.Origem}`;
    }
    if(profile.Idade != undefined){
        document.getElementById('idade').innerHTML = `<img src="/assets/images/idade.png"> ${profile.Idade}`;
    }
    if(profile.Area_de_Atuacao != undefined){
        document.getElementById('area').innerHTML = `<img src="/assets/images/area.png"> ${profile.Area_de_Atuacao}`;
    }
    if(profile.Curso != undefined){
        document.getElementById('graduacoes').innerHTML = `<img src="/assets/images/graduacoes.png"> ${profile.Curso}`;
    }
    document.getElementById('userImage').src =  profile.Foto_perfil;
}

async function iniciar() {
    let profile = await fetchProfile(IdAtual);
    exibirPerfil(profile);
}
