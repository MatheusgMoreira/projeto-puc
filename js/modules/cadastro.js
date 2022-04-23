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

  recuperarTodosRegistros() {

		//Array de pessoa
		let pessoas = Array()

		let id = localStorage.getItem('id')

		//Recupera todas as pessoas cadastradas em LocalStorage
		for(let i = 1; i <= id; i++) {

			//Recupera a despesa
			let pessoa = JSON.parse(localStorage.getItem(i))

			//Verifica a possibilidade de haver índices que foram pulados/removidos
			if(pessoa === null) {
				continue
			}
			pessoa.id = i
			pessoas.push(pessoa)
		}

		return pessoas
  }
    pesquisar(pessoa){

      let pessoasFiltradas = Array()
      pessoasFiltradas = this.recuperarTodosRegistros()
      console.log(pessoasFiltradas);
      console.log(pessoa)
  
          //Filtros do Array
  
      //nome
      if(pessoa.nome != ''){
        console.log("filtro de nome");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.nome == pessoa.nome)
      }
        
      //Mês
      if(pessoa.cpf != ''){
        console.log("filtro de cpf");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.cpf == pessoa.cpf)
      }
  
      //carro
      if(pessoa.carro != ''){
        console.log("filtro de carro");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.carro == pessoa.carro)
      }
  
      //email
      if(pessoa.email != ''){
        console.log("filtro de email");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.email == pessoa.email)
      }
  
      //Descrição
      if(pessoa.telefone != ''){
        console.log("filtro de telefone");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.telefone == pessoa.telefone)
      }
  
      //vaga
      if(pessoa.vaga != ''){
        console.log("filtro de vaga");
        pessoasFiltradas = pessoasFiltradas.filter(d => d.vaga == pessoa.vaga)
      }

      return pessoaFiltradas
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

function carregaListaPessoas(pessoa = Array(), filtro = false) {

  if(pessoa.length == 0 && filtro == false){
  pessoa = bd.recuperarTodosRegistros() 
}

  //Seleciona o elemento tbody da tabela
let listapessoa = document.getElementById("listaPessoas")
  listapessoa.innerHTML = ''

   //Percorre o array pessoa, listando cada despesa de forma dinâmica
pessoa.forEach(function(d){

  //Cria a linha <tr>
  var linha = listaPessoa.insertRow();

  //Cria as colunas <td>
  linha.insertCell(0).innerHTML = d.nome 
  linha.insertCell(1).innerHTML = d.cpf
  linha.insertCell(2).innerHTML = d.carro
  linha.insertCell(3).innerHTML = d.email
  linha.insertCell(4).innerHTML = d.telefone
  linha.insertCell(5).innerHTML = d.vaga

  //Botão de excluír
  let btn = document.createElement('button')
  btn.className = 'tabela-button'
  btn.innerHTML = 'excluir'
  btn.id = `id_pessoa_${d.id}`
  btn.onclick = function(){
          
    let id = this.id.replace('id_pessoa_','')
    
          //Remove a pessoa
    bd.remover(id)
    window.location.reload()
  }
  linha.insertCell(6).append(btn)
  console.log(d)
})

}


function pesquisarPessoa(){
 
let nome  = document.getElementById("nome").value
let cpf = document.getElementById("cpf").value
let carro = document.getElementById("carro").value
let email = document.getElementById("email").value
let telefone = document.getElementById("telefone").value
let vaga = document.getElementById("vaga").value

let pessoa = new Pessoa(nome, cpf, carro, email, telefone, vaga)

let pessoas = bd.pesquisar(pessoa)
 
this.carregaListapessoa(pessoas, true)

}
