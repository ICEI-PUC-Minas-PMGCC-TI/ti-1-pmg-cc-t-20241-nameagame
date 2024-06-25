# Documentação do Projeto (TIDocs)

Esta pasta armazena a documentação do projeto para a disciplina de **Trabalho Interdisciplinar 1** dos cursos de Tecnologia da Informação da **[PUC Minas](https://pucminas.br)**. Essa documentação é estruturada na forma de um site que fica disponível por meio do GitHub Pages e pode ser incluído, também, no site da solução hospedada. Um [exemplo publicado do TIDocs](https://webtech-puc-minas.github.io/ti1-template/) está disponível por meio do repositório do **[WebTech PUC Minas](https://github.com/webtech-pucminas)**.

A documentação do projeto inclui as seguintes seções:

1. Introdução
2. Contexto
3. Concepção
4. Metodologia
5. Solução
6. FAQ (Questões frequentes)
7. Referências Bibliográficas

O template para o site é estruturado e permite que a equipe evolua a documentação do projeto à medida que avance no desenvolvimento.

# Orientações gerais

Esta seção traz explicações breves sobre o conjunto de artefatos que precisam ser incluídos na documentação do projeto com uma conjunto de links importantes para que se entenda como criar cada coisa. 

## Problema

O problema em questão envolve a dificuldade de formações de grupos para o desenvolvimento de trabalhos universitarios, sejá em sua montagem ou na busca de integrantes para os desenvolve-los.

## Objetivos

O objetivo deste projeto é desenvolver uma plataforma capaz de facilitar a busca de grupos ou de integrantes para seus grupo, como também facilitar o seu proprio gerenciamento em sí


## Justificativa

A busca por projetos ou até mesmo de integrantes interresados e qualificados para o desenvolvimeto de projetos, sempre foi um problema no meio academico. Portanto o tema do projeto escolhido se baseou em uma questão no qual a maioria do grupo vivência e, por isso, acreditamos que este projeto poderia impactar positivamente o meio universitaria, facilitando a busca e o desenvolvimento de projetos de interresses dos alunos das mais diversas universidades.

## Público-Alvo

Como dito anteriormente, o projeto tem como alvo pessoal do meio academico em geral, sejam aqueles que buscam projetos para se integrar ou até mesmo aqueles que necessitam encontrar novos integrantes para seus proprios projetos.
Buscando entendermos melhor o nosso público-alvo, realizou-se uma pesquisa por meio de um formulário para garantir um número maior e distinto de opiniões sobre o tema. A partir desta pesquisa desenvolveou-se personas que representassem nosso publico alvo:
<br>


## Personas
<img src="/docs/assets/images/Persona1.jpg">
<img src="/docs/assets/images/Persona2.jpg">


**Links Úteis**:

- [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
- [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
- [Rock Content](https://rockcontent.com/blog/personas/)
- [Criar personas (Hotmart)](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)

## Histórias de Usuários

Mariana, a Estudante Proativa

Problema: Mariana é uma estudante de Engenharia que adora projetos desafiadores e está ansiosa para desenvolver seu portfólio. Ela tem uma ideia incrível para um projeto de pesquisa, mas não conhece ninguém na sua turma com o mesmo interesse e não sabe como encontrar outros estudantes para trabalhar com ela.
Objetivo: Mariana quer encontrar outros estudantes com interesses semelhantes para formar um grupo e desenvolver seu projeto de pesquisa. Ela busca uma plataforma fácil de usar, onde possa publicar sua ideia e encontrar pessoas qualificadas para se juntar ao seu grupo.
História: "Eu estava super animada com a minha ideia de projeto de pesquisa sobre inteligência artificial, mas não conhecia ninguém na minha turma com o mesmo interesse. Passei dias procurando em grupos do Facebook e em fóruns online, mas não encontrava nada. Até que descobri essa plataforma incrível! Pude publicar minha ideia e, em poucos dias, vários estudantes interessados me contactaram. Foi fácil formar um grupo com pessoas talentosas e motivadas. Agora, estamos trabalhando juntos em um projeto incrível, e estou aprendendo muito!"

João, o Estudante Indeciso

Problema: João é um estudante de Administração que está em seu último ano da faculdade e precisa de um projeto para se formar. Ele não tem uma ideia específica e sente dificuldade em escolher um tema que lhe interesse e que seja desafiador.
Objetivo: João busca uma plataforma que o ajude a encontrar ideias de projetos interessantes, avaliar a viabilidade de cada tema, e identificar grupos já formados com os quais ele possa se juntar.
História: "Estava perdido, sem saber por onde começar meu projeto de conclusão de curso. A ideia de ter que pensar em um tema e encontrar pessoas para trabalhar comigo me deixava ansioso. Aí encontrei essa plataforma e me surpreendi! Pude navegar por diversos projetos, ler as descrições, ver as habilidades dos membros dos grupos e, finalmente, achei um projeto que me interessava e me encaixava. Foi muito mais fácil do que eu imaginava!"

Rafael, o Líder de Grupo

Problema: Rafael é um estudante de Direito que lidera um grupo de estudos para a disciplina de Processo Penal. Ele precisa de mais membros para o grupo, mas tem dificuldade em encontrar pessoas que se encaixem na dinâmica do grupo e que tenham o mesmo nível de comprometimento.
Objetivo: Rafael quer uma plataforma onde ele possa divulgar as vagas do seu grupo de estudos e encontrar novos membros com perfil adequado, facilitando o gerenciamento do grupo e a comunicação entre os participantes.
História: "Eu estava com dificuldades para encontrar mais pessoas para o meu grupo de estudos. Tínhamos um bom ritmo, mas precisávamos de mais gente. A plataforma foi a solução! Publiquei uma vaga com as informações do nosso grupo e os requisitos para participar. Recebi vários pedidos de entrada e, em poucos dias, conseguimos completar o grupo com pessoas engajadas e dispostas a aprender. A plataforma me ajudou a organizar o grupo e a manter a comunicação fluida entre todos. "

## Requisitos

Os requisitos de um projeto são classificados em dois grupos:

- [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
  * O Sistema requer um cadastro de usuário
  * O Sistema requer um cadastro para o desenvolvedor de jogos e o upload do seu jogo produzido
  * O Sistema vai necessitar de uma API das lojas de jogos
  * O Sistema tem que conter um Quiz que seja variável
  * O Sistema tem que conter um algoritmo que produza uma resposta baseada em medidas e parâmetros do Quiz
  * Os usuários devem poder realizar buscas avançadas por jogos, filtrando por gênero, plataforma, faixa etária, preço e outras características relevantes.  
  * Os usuários podem avaliar os jogos e deixarem comentários, fornecendo feedback útil para outros usuários e contribuindo para a qualidade das recomendações na plataforma.

Integração com Plataformas de Jogos: Integração com plataformas de distribuição de jogos, como Steam, Epic Games Store, PlayStation Store, Xbox Store, entre outras, para fornecer uma ampla variedade de opções de compra e download diretamente pela plataforma de busca. - Baixa 
- [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  * O Sistema será Web, então tem que ser acessível e adaptável a qualquer dispositivo
  * Os Usuários tem que ceder dados para usabilidade
  * Os Usuários tem que estar dispostos a realizar um quiz
  * O Sistema será produzido em HTML e CSS
  * O Sitema deve informar quais dados serão utilizados


## User Flow
<img src="/docs/assets/images/userflow.jfif">

Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.

## Wireframes
<img src="/docs/assets/images/userflow.jfif">


## Gestão de Projetos

<img src="/docs/assets/images/kanban.png">

Nosso grupo baseou a divisão de tarefas pelo metódo Kanban, infelizmente sobrecarregou dois memebros do times, enquanto o resto fez um pouco ou quase nada.
