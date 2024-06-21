document.addEventListener("DOMContentLoaded", function () {
    let solicitationsTable = document.getElementById("solicitationsTable").getElementsByTagName("tbody")[0];

/*@function: Receber e exibir solicitacoes
  @param photoURL = Foto do usuário
  @param userName = Nome do usuário
  @param text = Texto da solicitação
  @param userId = ID do usuário
*/
/*addSolicitation () Exibe a solicitação na tela 
@Param photoURL = foto do usuário
@Param userName = Nome do usuario
  @Param text = Texto da solicitação
  @Param userId = ID do usuário
*/
    function addSolicitation(photoUrl, userName, text, userId) {
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
            acceptSolicitation(userId);
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
    
    
    /*@function aceitar solicitacao
      @param userId = ID do usuário    
    */ 
    async function acceptSolicitation(userId) {
        try {
            const response = await fetch(`http://localhost:3000/solicitacoes/${userId}`);
            if (response.ok) {
                const solicitation = await response.json();
                alert(`Solicitação aceita. ID do usuário: ${solicitation.id}`);
                // Você pode adicionar outras ações aqui, como mover a solicitação para outra lista.
            }
        } catch (error) {
            console.error("Erro ao aceitar solicitação:", error);
        }
    }
/*
@function rejeitar solicitação
@param userId = ID do usuário
@param row = Linha em que a solicitação se encontra
*/

    async function rejectSolicitation(userId, row) {
        try {
            const response = await fetch(`http://localhost:3000/solicitacoes/${userId}`, {
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

    //Meio inutil, mas talvez util.
    window.addNewSolicitation = function(photoUrl, userName, text, userId) {
        addSolicitation(photoUrl, userName, text, userId);
    };
});
