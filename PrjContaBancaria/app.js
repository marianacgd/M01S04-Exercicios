let contas = [
  {
    nome: 'Thais Bertoldo',
    cpf: '999.999.999.99',
    celular: '(99) 99999-9999',
    senha: '1',
    conta: 1674333795439,
    saldo: 0,
  },
]; //Cria variavel para armazenar lista de contas

const formulario = document.getElementById('form-cadastro'); //Obtem o form para add evento

//Criacao da funcao para para ser executada no envio do form
const enviarFormulario = (event) => {
  event.preventDefault(); //Evita comportamento padrao do evento de submit do form

  const senha = event.target.senha.value; //Obtem campo senha
  const confirmacaoSenha = event.target.confirmacaoSenha.value; //Obtem campo confirmacaoSenha

  if (senha !== confirmacaoSenha) {
    alert('Senhas sao divergentes!');
    return;
  }

  const nome = event.target.nome.value;
  const cpf = event.target.cpf.value;
  const celular = event.target.celular.value;
  const conta = new Date().getTime();
  const saldo = 0;

  const contaCriada = {
    conta,
    nome,
    cpf,
    celular,
    senha,
    saldo,
  };

  contas.push(contaCriada);
  alert(`Conta criada com sucesso. Numero: ${conta}`);
};

formulario.addEventListener('submit', enviarFormulario);

//Operacoes
const formOperacao = document.getElementById('form-operacao'); //Obtem formulario de operacoes

const sacar = (conta, valor) => {
  //Funcao Saque
  console.log('Sacar');
};

const depositar = (conta, valor) => {
  //Funcao Deposito
  console.log('Depositar');
};

const consultarSaldo = (conta) => {
  //Funcao Consultar Saldo
  console.log('Saldo');
};

const enviarFormularioOperacao = (event) => {
  event.preventDefault();

  const conta = parseInt(event.target.conta.value);
  const operacao = event.target.operacao.value;
  const valor = parseFloat(event.target.valor.value);
  const senha = event.target.senhaOperacao.value;

  const contaAtul = contas.find((elemento) => elemento.conta === conta); //Obtem conta
  //Validacao para verificar existencia da conta
  if (!conta) {
    alert('Conta invalida!');
    return;
  }

  if (contaAtul.senha !== senha) {
    alert('Senha invalida!');
    return;
  }

  //Chamar funcao correta de acordo com a operacao
  switch (operacao) {
    case 'saque':
      sacar(contaAtul, valor);
      break;
    case 'deposito':
      depositar(contaAtul, valor);
      break;
    case 'saldo':
      consultarSaldo(conta);
      break;
    default:
      alert('Operacao invalida!');
      break;
  }
};

formOperacao.addEventListener('submit', enviarFormularioOperacao);
