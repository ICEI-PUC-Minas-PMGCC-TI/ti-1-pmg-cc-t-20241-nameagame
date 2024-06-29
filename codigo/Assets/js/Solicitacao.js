const dataURL = 'https://d48c2490-3e8e-404c-9d46-de2c267c8b7d-00-pkkcdctxvc17.spock.replit.dev'

document.addEventListener("DOMContentLoaded", function () {
    let solicitationsTable = document.getElementById("solicitationsTable").getElementsByTagName("tbody")[0];

    /* @function: Receber e exibir solicitacoes
       @param photoURL = Foto do usuário
       @param userName = Nome do usuário
       @param text = Texto da solicitação
       @param userId = ID do usuário
    */
    /* addSolicitation () Exibe a solicitação na tela 
       @Param photoURL = foto do usuário
       @Param userName = Nome do usuario
       @Param text = Texto da solicitação
       @Param userId = ID do usuário
    */
    function addSolicitation(photoUrl, userName, text, userId, trabalhoId, solicitationId) {
        let row = solicitationsTable.insertRow();

        let cellPhoto = row.insertCell(0);
        let cellName = row.insertCell(1);
        let cellText = row.insertCell(2);
        let cellActions = row.insertCell(3);

        cellPhoto.innerHTML = `<img src="${photoUrl}" alt="Foto" class="img-thumbnail">`;
        cellName.innerHTML = `<p>${userName}</p>`;
        cellText.innerHTML = `<p>${text}</p>`;

        let acceptButton = document.createElement("button");
        acceptButton.className = "btn btn-success me-2";
        acceptButton.textContent = "Aceitar";
        acceptButton.addEventListener("click", function () {
            acceptSolicitation(userId, trabalhoId, solicitationId, row);
        });

        let rejectButton = document.createElement("button");
        rejectButton.className = "btn btn-danger";
        rejectButton.textContent = "Recusar";
        rejectButton.addEventListener("click", function () {
            rejectSolicitation(userId, row);
        });

        cellActions.appendChild(acceptButton);
        cellActions.appendChild(rejectButton);
    }
    /**
 * Leitura de dados do JSON server
 * @returns objeto lido no JSON server
 */
    async function readDataUsuario() {
        try {
            const response = await fetch(`${dataURL}/Usuario`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            return [];
        }
    }

    async function fetchProfile(userId) {
        try {
            const response = await fetch(`${dataURL}/Usuario/${userId}`);
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

    async function defineContentGrupo(GrupoId,userId) {
        let perfil = await fetchProfile(userId);
        var bodyContent = null;

        if (perfil.Grupos === null) {
            bodyContent = JSON.stringify({
                Grupos: [GrupoId]
            });
            console.log(bodyContent);
        } else {
            let obj = perfil.Grupos;
            obj.push(GrupoId);
            console.log(obj);
            bodyContent = JSON.stringify({
                Grupos: obj
            });
        }
        //console.log(perfil.Grupos.length)
        return bodyContent
    }

    async function attGrupos(GrupoId, userId) {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
        //var bodyContent = JSON.stringify({ Grupos: GrupoId });

        var bodyContent = await defineContentGrupo(GrupoId,userId)

        let response = await fetch(`${dataURL}/Usuario/${userId}`, {
            method: "PATCH",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
    }

    /* @function: aceitar solicitacao
       @param userId = ID do usuário    
    */
    async function acceptSolicitation(userId, trabalhoId, solicitationId, row) {
        try {
            const pessoas = await fetchProfile(userId);
            console.log("oi")
            if (pessoas.id === userId) {
                attGrupos(trabalhoId, userId);
                alert(`Solicitação aceita. ID do usuário: ${pessoas.id}`);
            }
            const response = await fetch(`${dataURL}/solicitacao/${solicitationId}`, {
            method: 'DELETE'
            });
            if (response.ok) {
               row.remove();
            }
        } catch (error) {
            console.error("Erro ao aceitar solicitação:", error);
        }
    }

    /*
       @function: rejeitar solicitação
       @param userId = ID do usuário
       @param row = Linha em que a solicitação se encontra
    */
    async function rejectSolicitation(userId, row) {
        try {
            const response = await fetch(`${dataURL}/solicitacao/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                row.remove();
                alert(`Solicitação recusada. ID do usuário: ${userId}`);
            }
        } catch (error) {
            console.error("Erro ao recusar solicitação:", error);
        }
    }


    // Função para buscar dados do JSON server e preencher a tabela
    async function fetchSolicitations() {
        try {
            const response = await fetch(`${dataURL}/solicitacao`, { method: "GET" });
            const usuarios = await readDataUsuario()
            console.log(usuarios)
            if (response.ok) {
                const solicitations = await response.json();
                console.log(solicitations);
                solicitations.forEach(solicitation => {
                    usuarios.forEach(usuario => {
                        if (solicitation.Id_Usuario === usuario.id) {
                            addSolicitation(usuario.Foto, usuario.Nome, solicitation.text,
                                usuario.id, solicitation.Id_Projeto, solicitation.id);
                        }
                    })
                });
            }
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        }
    }

    // Chama a função para buscar dados quando o DOM estiver carregado
    fetchSolicitations();

    //Meio inútil, mas talvez útil.
    window.addNewSolicitation = function (photoUrl, userName, text, userId) {
        addSolicitation(photoUrl, userName, text, userId);
    };
});
