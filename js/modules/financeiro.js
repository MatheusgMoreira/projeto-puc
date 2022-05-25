class Valor {
    constructor(nomeFin, cpfFin, apartamentoFin, valorFin, telefoneFin, emailFin) {
      this.nomeFin = nomeFin;
      this.cpfFin = cpfFin;
      this.apartamentoFin = apartamentoFin;
      this.valorFin = valorFin;
      this.telefoneFin = telefoneFin;
      this.emailFin = emailFin;
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
      let listaVlr = JSON.parse(
        localStorage.getItem("lista-valor") || "[]"
      );
  
      listaVlr.push({
        nomeFin: d.nomeFin,
        cpfFin: d.cpfFin,
        apartamentoFin: d.apartamentoFin,
        valorFin: d.valorFin,
        telefoneFin: d.telefoneFin,
        emailFin: d.emailFin,
      });
  
      localStorage.setItem("lista-valor", JSON.stringify(listaVlr));
    }
  
    recuperarTodosRegistros() {
      //Array de valores
      let valores = Array(localStorage.getItem("lista-valor"));
  
      let id = valores.length;
  
      //Recupera todas as valores cadastradas em LocalStorage
      for (let i = 1; i <= id; i++) {
        //Recupera a despesa
        let valor = JSON.parse(localStorage.getItem(i));
  
        //Verifica a possibilidade de haver índices que foram pulados/removidos
        if (valor === null) {
          continue;
        }
        valor.id = i;
        valores.push(valor);
      }
  
      return valores;
    }
  
    remover(id) {
      let listaVlr = JSON.parse(
        localStorage.getItem("lista-valor") || "[]"
      );
  
      listaVlr.splice(id, 1);
  
      localStorage.setItem("lista-valor", JSON.stringify(listaVlr));
    }
  }
  
  let bd = new Bd();
  
  function cadastrarValor() {
    let nomeFin = document.getElementById("nomeFin");
    let cpfFin = document.getElementById("cpfFin");
    let apartamentoFin = document.getElementById("apartamentoFin");
    let valorFin = document.getElementById("valorFin");
    let telefoneFin = document.getElementById("telefoneFin");
    let emailFin = document.getElementById("emailFin");
  
    let valor = new Valor(
      nomeFin.value,
      cpfFin.value,
      apartamentoFin.value,
      valorFin.value,
      telefoneFin.value,
      emailFin.value
    );
  
    if (valor.validarDados()) {
      //Diálogo de sucesso e gravação
  
      bd.gravar(valor);
  
      window.location.reload();
  
      //Limpa os campos ao enviar as informações
      nomeFin.value = "";
      cpfFin.value = "";
      apartamentoFin.value = "";
      valorFin.value = "";
      telefoneFin.value = "";
      emailFin.value = "";
    } else {
      //Diálogo de erro
      alert(
        "Erro ao efetuar cadastro, verifique se todas as informações foram preenchidas corretamente"
      );
    }
  }
  
  function carregaListaValores(valores = Array()) {
    if (valores.length == 0) {
      valores = bd.recuperarTodosRegistros();
    }
  
    //Seleciona o elemento tbody da tabela
    let listaValor = document.getElementById("listaVlr");
    listaValor.innerHTML = "";
  
    //Percorre o array valor, listando cada valor de forma dinâmica
    valores.forEach(function (d) {
      //Cria a linha <tr>
      let listaVlr = JSON.parse(
        localStorage.getItem("lista-valor") || "[]"
      );
      let tLista = listaVlr.length;
  
      //Cria as colunas <td>
      for (let i = 0; i < tLista; i++) {
        var linha = listaValor.insertRow();
        linha.insertCell(0).innerHTML = listaVlr[i].nomeFin;
        linha.insertCell(1).innerHTML = listaVlr[i].cpfFin;
        linha.insertCell(2).innerHTML = listaVlr[i].apartamentoFin;
        linha.insertCell(3).innerHTML = listaVlr[i].valorFin;
        linha.insertCell(4).innerHTML = listaVlr[i].emailFin;
        linha.insertCell(5).innerHTML = listaVlr[i].telefoneFin;
  
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
  