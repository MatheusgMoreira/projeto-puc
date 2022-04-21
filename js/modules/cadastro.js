class Pessoa {
  constructor(nome, cpf, carro, email, telefone, vaga) {
    this.nome = nome;
    this.cpf = cpf;
    this.carro = carro;
    this.email = email;
    this.telefone = telefone;
    this.vaga = vaga;
  }

  validarDados() {
    //Verifica se as informações foram preenchidas
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  //Criação da id do Banco de dados no localStorage
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem("id", id);
  }
}

let bd = new Bd();

function cadastrarPessoa() {
  let nome = document.getElementById("nome");
  let cpf = document.getElementById("cpf");
  let carro = document.getElementById("carro");
  let email = document.getElementById("email");
  let telefone = document.getElementById("telefone");
  let vaga = document.getElementById("vaga");

  let pessoa = new Pessoa(
    nome.value,
    cpf.value,
    carro.value,
    email.value,
    telefone.value,
    vaga.value
  );

  if (pessoa.validarDados()) {
    //Diálogo de sucesso e gravação

    bd.gravar(pessoa);

    alert('Cadastro realizado com sucesso!!!')

    //Limpa os campos ao enviar as informações
    nome.value = "";
    cpf.value = "";
    carro.value = "";
    email.value = "";
    telefone.value = "";
    vaga.value = "";
  } else {
    //Diálogo de erro

    alert('Erro ao efetuar cadastro, verifique se todas as informações foram preenchidas corretamente')
    
  }
}
