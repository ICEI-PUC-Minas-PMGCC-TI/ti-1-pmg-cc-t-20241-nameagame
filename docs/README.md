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


## Histórias de Usuários

<strong>Mariana, a Estudante Proativa</strong>

<strong>Problema:</strong> Mariana é uma estudante de Engenharia que adora projetos desafiadores e está ansiosa para desenvolver seu portfólio. Ela tem uma ideia incrível para um projeto de pesquisa, mas não conhece ninguém na sua turma com o mesmo interesse e não sabe como encontrar outros estudantes para trabalhar com ela.<br>
<strong>Objetivo:</strong> Mariana quer encontrar outros estudantes com interesses semelhantes para formar um grupo e desenvolver seu projeto de pesquisa. Ela busca uma plataforma fácil de usar, onde possa publicar sua ideia e encontrar pessoas qualificadas para se juntar ao seu grupo.<br>
<strong>História:</strong> "Eu estava super animada com a minha ideia de projeto de pesquisa sobre inteligência artificial, mas não conhecia ninguém na minha turma com o mesmo interesse. Passei dias procurando em grupos do Facebook e em fóruns online, mas não encontrava nada. Até que descobri essa plataforma incrível! Pude publicar minha ideia e, em poucos dias, vários estudantes interessados me contactaram. Foi fácil formar um grupo com pessoas talentosas e motivadas. Agora, estamos trabalhando juntos em um projeto incrível, e estou aprendendo muito!"

<strong>João, o Estudante Indeciso</strong>

<strong>Problema:</strong> João é um estudante de Administração que está em seu último ano da faculdade e precisa de um projeto para se formar. Ele não tem uma ideia específica e sente dificuldade em escolher um tema que lhe interesse e que seja desafiador.<br>
<strong>Objetivo:</strong> João busca uma plataforma que o ajude a encontrar ideias de projetos interessantes, avaliar a viabilidade de cada tema, e identificar grupos já formados com os quais ele possa se juntar.<br>
<strong>História:</strong> "Estava perdido, sem saber por onde começar meu projeto de conclusão de curso. A ideia de ter que pensar em um tema e encontrar pessoas para trabalhar comigo me deixava ansioso. Aí encontrei essa plataforma e me surpreendi! Pude navegar por diversos projetos, ler as descrições e finalmente, achei um projeto que me interessava e me encaixava. Foi muito mais fácil do que eu imaginava!"

<strong>Rafael, o Líder de Grupo</strong>

<strong>Problema:</strong> Rafael é um estudante de Direito que lidera um grupo de estudos para a disciplina de Processo Penal. Ele precisa de mais membros para o grupo, mas tem dificuldade em encontrar pessoas que se encaixem na dinâmica do grupo e que tenham o mesmo nível de comprometimento.<br>
<strong>Objetivo:</strong> Rafael quer uma plataforma onde ele possa divulgar as vagas do seu grupo de estudos e encontrar novos membros com perfil adequado, facilitando o gerenciamento do grupo e a comunicação entre os participantes.<br>
<strong>História:</strong> "Eu estava com dificuldades para encontrar mais pessoas para o meu grupo de estudos. Tínhamos um bom ritmo, mas precisávamos de mais gente. A plataforma foi a solução! Publiquei uma vaga com as informações do nosso grupo e os requisitos para participar. Recebi vários pedidos de entrada e, em poucos dias, conseguimos completar o grupo com pessoas engajadas e dispostas a aprender. A plataforma me ajudou a organizar o grupo e a manter a comunicação fluida entre todos. "

## Requisitos

Os requisitos de um projeto são classificados em dois grupos:

- [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
  * O Sistema requer um cadastro de usuários/empresas
  * O Sistema requer um cadastro de projetos/grupos
  * O Sistema vai necessitar de sistema de busca de projetos
  * O Sistema tem que conter um meio de integrar novos integrantes aos grupos
  * O Sistema tem que conter um meio de compartilhamento de Documentos/arquivos
  * O Sistema tem que conter uma agenda/calendário de entregas e pendências
  * O Sistema deve conter um meio de integração com Ferramentas de Produtividade(Google Drive, Microsoft Office, Figma,  etc)
  * O Sistema deve disponibilizar os projetos criados visiveis ao demais usuarios  

- [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  * O Sistema será Web, então tem que ser acessível e adaptável a qualquer dispositivo
  * Os Usuários tem que  estar dispostos a ceder dados para usabilidade
  * O Sitema deve informar quais dados serão utilizados
  * O Sistema será produzido em HTML, CSS e JS


## User Flow
<img src="/docs/assets/images/Figma.png">

Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.

## Wireframes
<img src="/docs/assets/images/Figma.png">


## Gestão de Projetos

<img src="/docs/assets/images/kanban.png">

Nosso grupo baseou a divisão de tarefas pelo metódo Kanban, onde o acompanhamento de entregas bem como o seu desenvolvimento desenvolvimento pode ser acompanhado
