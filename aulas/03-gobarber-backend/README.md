# Mapeando requisitos do sistema

## Recuperação de senha

**Requisitos Funcionais**

- Usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**Requisitos Não Funcionais**

- Utilizar MailTrap para testar envios de emails em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (backgound job);

**Regra de Negócio**

- O link enviado por email para resetar senha deve expirar em 2 horas;
- O usuário deve confirmar a senha antes de salvar no banco a senha nova;

## Atualização do perfil

**Requisitos Funcionais**

- Usuário deve poder atualizar seu nome, email, senha e avatar;

**Regra de Negócio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar informar a senha antiga para confirmação de identidade;
- Para atualiazar sua senha, o usuário precisa confirmar as senhas antes de salvar a nova senha no banco de dados;

## Painel do prestador

**Requisitos Funcionais**

 - O Usuário deve poder listar seus agendamento de um dia específico clicando no dia no calendário;
 - O prestador deve receber uma notificação sempre que ouver um novo agendamento;
 - O usuário deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regra de Negócio**

- A notificação deve ter um status de lida ou não lida;

## Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um com pelo menos um horário disponível de um prestador de serviço
- O usuário deve poder listar horários disponiveis em um dia específico de um prestador específico;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores devem ser armazenadas em cache;

**Regra de Negócio**

- Cada agendamento deve durar 1hora exatamente;
- Os agendamentos devem estar disponíveis entre as 8h as 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um horário com ele mesmo;
