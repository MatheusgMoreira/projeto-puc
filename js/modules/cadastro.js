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
  gravar(d) {
    let listaP = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");

    listaP.push({
      nome: d.nome,
      cpf: d.cpf,
      carro: d.carro,
      email: d.email,
      telefone: d.telefone,
      vaga: d.vaga,
    });

    localStorage.setItem("lista-pessoas", JSON.stringify(listaP));
  }

  recuperarTodosRegistros() {
    //Array de pessoas
    let pessoas = Array(localStorage.getItem("lista-pessoas"));

    let id = pessoas.length;

    //Recupera todas as pessoas cadastradas em LocalStorage
    for (let i = 1; i <= id; i++) {
      //Recupera a despesa
      let pessoa = JSON.parse(localStorage.getItem(i));

      //Verifica a possibilidade de haver índices que foram pulados/removidos
      if (pessoa === null) {
        continue;
      }
      pessoa.id = i;
      pessoas.push(pessoa);
    }

    return pessoas;
  }

  remover(id) {
    let listaAgd = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");

    listaAgd.splice(id, 1);

    localStorage.setItem("lista-pessoas", JSON.stringify(listaAgd));
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

    window.location.reload();

    //Limpa os campos ao enviar as informações
    nome.value = "";
    cpf.value = "";
    carro.value = "";
    email.value = "";
    telefone.value = "";
    vaga.value = "";
  } else {
    //Diálogo de erro
    alert(
      "Erro ao efetuar cadastro, verifique se todas as informações foram preenchidas corretamente"
    );
  }
}

function carregaListaPessoas(pessoas = Array()) {
  if (pessoas.length == 0) {
    pessoas = bd.recuperarTodosRegistros();
  }

  //Seleciona o elemento tbody da tabela
  let listaPessoas = document.getElementById("listaPessoas");
  listaPessoas.innerHTML = "";

  //Percorre o array pessoa, listando cada despesa de forma dinâmica
  pessoas.forEach(function (d) {
    //Cria a linha <tr>
    let listaP = JSON.parse(localStorage.getItem("lista-pessoas") || "[]");
    let tLista = listaP.length;

    //Cria as colunas <td>
    for (let i = 0; i < tLista; i++) {
      var linha = listaPessoas.insertRow();
      linha.insertCell(0).innerHTML = listaP[i].nome;
      linha.insertCell(1).innerHTML = listaP[i].cpf;
      linha.insertCell(2).innerHTML = listaP[i].carro;
      linha.insertCell(3).innerHTML = listaP[i].email;
      linha.insertCell(4).innerHTML = listaP[i].telefone;
      linha.insertCell(5).innerHTML = listaP[i].vaga;

      let btn = document.createElement("button");
      btn.className = "btn btn-danger";
      btn.innerHTML = '<i class="fa fa-times"  ></i>';
      btn.onclick = function () {
        let id = i;

        bd.remover(id);

        window.location.reload();
      };
      linha.insertCell(6).append(btn);
    }
  });
}
