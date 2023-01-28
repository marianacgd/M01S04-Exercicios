let contas = [
  {
    nome: 'Mariana D',
    cpf: '111.222.333-44',
    celular: '(11) 1234-5678',
    senha: '1',
    conta: 1,
    saldo: 0,
  },
]; //Cria variavel para armazenar lista de contas *Add conta inicial de exemplo nos testes

const formulario = document.getElementById('form-cadastro'); //Obtem o form para adicionar evento

//Criacao da funcao para para ser executada no envio do form
const enviarFormulario = (event) => {
  event.preventDefault(); //Evita comportamento padrao do evento de submit do form

  const senha = event.target.senha.value; //Obtem campo senha
  const confirmacaoSenha = event.target.confirmacaoSenha.value; //Obtem campo confirmacaoSenha
  //Validacao que verifica se os campos senha e confirmacaoSenha sao iguais
  if (senha !== confirmacaoSenha) {
    alert('Senhas sao divergentes!');
    return;
  }

  //Obtem valores digitados no form
  const nome = event.target.nome.value;
  const cpf = event.target.cpf.value;
  const celular = event.target.celular.value;
  const conta = new Date().getTime();
  const saldo = 0;

  //Criacao do objeto contaCriada
  const contaCriada = {
    conta,
    nome,
    cpf,
    celular,
    senha,
    saldo,
  };

  contas.push(contaCriada); //Adiciona conta no Array
  alert(`Conta criada com sucesso. Numero: ${conta}`); //exibe informacao de sucesso ao usuario
};

formulario.addEventListener('submit', enviarFormulario); //Adiciona funcao ao evento de submit do form

//Inicio das Operacoes
const formOperacao = document.getElementById('form-operacao'); //Obtem form de operacoes

//Cria Funcao de Saque
const sacar = (conta, valor) => {
  //Verificao se o valor e maior que 0
  if (valor > 0) {
    //Verifica se tem saldo disponivel na conta
    if (conta.saldo >= valor) {
      const novoSaldo = conta.saldo - valor; //Cria novoSaldo e recebe a subtracao do valor da conta
      conta.saldo = novoSaldo; //Atribui o novoSaldo ao saldo da conta
      alert(`Saque efetuado com sucesso! Novo saldo: ${novoSaldo}`); //Exibe informacao de sucesso ao usuario com o valor atualizado
      return;
    }
    alert('Saldo insuficiente'); //Se nao exibe informacao de falta de saldo ao usuario
    return;
  }
  alert('Nao foi possivel efetuar o saque'); //Se nao exibe informacao de insucesso ao usuario
};

//Cria Funcao de Deposito
const depositar = (conta, valor) => {
  //Verifica se o valor e maior que 0
  if (valor > 0) {
    const novoSaldo = conta.saldo + valor; //Cria novoSaldo e recebe a adicao do valor da conta
    conta.saldo = novoSaldo; //Atribui o novoSaldo ao saldo da conta
    alert(`Deposito efetuado com sucesso! Novo saldo: ${novoSaldo}`); //Exibe informacao de sucesso ao usuario com o valor atualizado
    return;
  }
  alert('Nao foi possivel efetuar o deposito'); //Se nao exibe informacao de insucesso ao usuario
};

//Cria Funcao de Consultar Saldo
const consultarSaldo = (conta) => {
  alert(`Saldo atual: ${conta.saldo}`); //Exibe informacao ao usuario com o valor do saldo atualizado
};

//Cria Funcao de Enviar formulario de operacao
const enviarFormularioOperacao = (event) => {
  event.preventDefault(); //Evita comportamento padrao do evento de submit do form

  //Obtem valores digitados no form de operacoes
  const conta = parseInt(event.target.conta.value);
  const operacao = event.target.operacao.value;
  const valor = parseFloat(event.target.valor.value);
  const senha = event.target.senhaOperacao.value;

  const contaAtual = contas.find((elemento) => elemento.conta === conta); //Cria contaAtual e Obtem conta

  //Validacao para verificar existencia da conta
  if (!contaAtual) {
    alert('Conta invalida!'); //Exibe informacao ao usuario
    return;
  }

  //Valida se a senha esta correta
  if (contaAtual.senha !== senha) {
    alert('Senha invalida!'); //Exibe informacao ao usuario
    return;
  }

  //Chamar funcao correta de acordo com a operacao
  switch (operacao) {
    case 'saque':
      sacar(contaAtual, valor);
      break;
    case 'deposito':
      depositar(contaAtual, valor);
      break;
    case 'saldo':
      consultarSaldo(contaAtual);
      break;
    default:
      alert('Operacao invalida!');
      break;
  }
};

formOperacao.addEventListener('submit', enviarFormularioOperacao); //Adiciona funcao ao evento de submit do form operacao

//Desabilitar/habilitar campo de valor
//Obtem select para adicionar evento de onchange
const operacao = document.getElementById('operacao'); //Obtem operacao
operacao.addEventListener('change', (event) => {
  //Obtem o campo de valor do html
  const inputValor = document.getElementById('valor'); //Obtem o campo de valor do html

  //Verifica se o valor selecionado e saldo
  if (event.target.value === 'saldo') {
    inputValor.disabled = true; //desabilita o campo valor
    inputValor.value = ''; //Limpa o valor digitado
    return;
  }
  inputValor.disabled = false; //Habilita o campo de valor quando a operacao for diferente de saldo
});
