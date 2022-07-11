class Agendamento {
  constructor(nome, cpf, carro, data, telefone, hora) {
    this.nome = nome;
    this.cpf = cpf;
    this.carro = carro;
    this.data = data;
    this.telefone = telefone;
    this.hora = hora;
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
    let listaAgd = JSON.parse(
      localStorage.getItem("lista-agendamento") || "[]"
    );

    listaAgd.push({
      nome: d.nome,
      cpf: d.cpf,
      carro: d.carro,
      data: d.data,
      telefone: d.telefone,
      hora: d.hora,
    });

    localStorage.setItem("lista-agendamento", JSON.stringify(listaAgd));
  }

  recuperarTodosRegistros() {
    //Array de agendamentos
    let agendamentos = Array(localStorage.getItem("lista-agendamento"));

    let id = agendamentos.length;

    //Recupera todas as agendamentos cadastradas em LocalStorage
    for (let i = 1; i <= id; i++) {
      //Recupera a despesa
      let agendamento = JSON.parse(localStorage.getItem(i));

      //Verifica a possibilidade de haver índices que foram pulados/removidos
      if (agendamento === null) {
        continue;
      }
      agendamento.id = i;
      agendamentos.push(agendamento);
    }

    return agendamentos;
  }

  remover(id) {
    let listaAgd = JSON.parse(
      localStorage.getItem("lista-agendamento") || "[]"
    );

    listaAgd.splice(id, 1);

    localStorage.setItem("lista-agendamento", JSON.stringify(listaAgd));
  }
}

let bd = new Bd();

function cadastrarAgendamento() {
  let nome = document.getElementById("nomeAgd");
  let cpf = document.getElementById("cpfAgd");
  let carro = document.getElementById("carroAgd");
  let data = document.getElementById("data");
  let telefone = document.getElementById("telefoneAgd");
  let hora = document.getElementById("hora");

  let agendamento = new Agendamento(
    nome.value,
    cpf.value,
    carro.value,
    data.value,
    telefone.value,
    hora.value
  );

  if (agendamento.validarDados()) {
    //Diálogo de sucesso e gravação

    bd.gravar(agendamento);

    window.location.reload();

    //Limpa os campos ao enviar as informações
    nome.value = "";
    cpf.value = "";
    carro.value = "";
    data.value = "";
    telefone.value = "";
    hora.value = "";
  } else {
    //Diálogo de erro
    alert(
      "Erro ao efetuar cadastro, verifique se todas as informações foram preenchidas corretamente"
    );
  }
}

function carregaListaAgendamentos(agendamentos = Array()) {
  if (agendamentos.length == 0) {
    agendamentos = bd.recuperarTodosRegistros();
  }

  //Seleciona o elemento tbody da tabela
  let listaAgendamento = document.getElementById("listaAgendamento");
  listaAgendamento.innerHTML = "";

  //Percorre o array agendamento, listando cada agendamento de forma dinâmica
  agendamentos.forEach(function (d) {
    //Cria a linha <tr>
    let listaAgd = JSON.parse(
      localStorage.getItem("lista-agendamento") || "[]"
    );
    let tLista = listaAgd.length;

    //Cria as colunas <td>
    for (let i = 0; i < tLista; i++) {
      var linha = listaAgendamento.insertRow();
      linha.insertCell(0).innerHTML = listaAgd[i].nome;
      linha.insertCell(1).innerHTML = listaAgd[i].cpf;
      linha.insertCell(2).innerHTML = listaAgd[i].carro;
      linha.insertCell(3).innerHTML = listaAgd[i].data;
      linha.insertCell(4).innerHTML = listaAgd[i].hora;
      linha.insertCell(5).innerHTML = listaAgd[i].telefone;

      if (window.location.href == "http://127.0.0.1:5501/other_pages/agendamentoAdm.html") {
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
    }
  });
}
