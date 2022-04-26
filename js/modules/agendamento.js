class Agendamento {
    constructor(nome, cpf, dia, hora) {
      this.nome = nome;
      this.cpf = cpf;
      this.dia = dia;
      this.hora = hora;
    }
  
    validarDadosAgd() {
      //Verifica se as informações foram preenchidas
      for (let i in this) {
        if (this[i] == undefined || this[i] == '' || this[i] == null) {
          return false;
        }
      }
      return true;
    }
  }
  
  class Bd {
    //Criação da id do Banco de dados no localStorage
    constructor() {
      let id = localStorage.getItem("id")
  
      if (id === null) {
        localStorage.setItem('id', 0)
      }
    }
  
    getProximoId() {
      let proximoId = localStorage.getItem("id")
      return parseInt(proximoId) + 1
    }
  
    gravarAgd(d) {
      let id = this.getProximoId()
  
      localStorage.setItem(id, JSON.stringify(d))
  
      localStorage.setItem('id', id)
    }
  
    recuperarTodosRegistrosAgd() {
      //Array de agendamentos
      let agendamentos = Array()
      
      let id = localStorage.getItem('id')
  
      //Recupera todas as agendamentos cadastradas em LocalStorage
      for (let i = 1; i <= id; i++) {
        //Recupera a despesa
        let agendamento = JSON.parse(localStorage.getItem(i))
  
        //Verifica a possibilidade de haver índices que foram pulados/removidos
        if (agendamento === null) {
          continue
        }
        agendamento.id = i
        agendamentos.push(agendamento)
        
      }
  
      return agendamentos
      
    }
    
    pesquisarAgd(agendamento) {
  
      let agendamentosFiltrados = Array();
      agendamentosFiltrados = this.recuperarTodosRegistrosAgd()
  
      //Filtros do Array
  
      //nome
      if (agendamento.nome != '') {
        agendamentosFiltrados = agendamentosFiltrados.filter(d => d.nome == agendamento.nome)
      }
  
      //Mês
      if (agendamento.cpf != '') {
        agendamentosFiltrados = agendamentosFiltrados.filter(d => d.cpf == agendamento.cpf)
      }
  
      //dia
      if (agendamento.dia != '') {
        agendamentosFiltrados = agendamentosFiltrados.filter(
          d => d.dia == agendamento.dia
        )
      }
  
      //Descrição
      if (agendamento.hora != '') {
        agendamentosFiltrados = agendamentosFiltrados.filter(
          d => d.hora == agendamento.hora
        )
      }

      return agendamentosFiltrados
    }
  
    removerAgd(id) {
      localStorage.removeItem(id)
    }
  }
  
  let bd = new Bd()
  
  function agendarHorario() {
    let nome = document.getElementById('nomeAgd')
    let cpf = document.getElementById('cpfAgd')
    let dia = document.getElementById('dia')
    let hora = document.getElementById('hora')

  
    let agendamento = new Agendamento(
      nome.value,
      cpf.value,
      dia.value,
      hora.value
    )
  
    if (agendamento.validarDadosAgd()) {
      //Diálogo de sucesso e gravação
  
      bd.gravarAgd(agendamento)
  
      alert('Cadastro realizado com sucesso!!!')
  
      //Limpa os campos ao enviar as informações
      nome.value = ''
      cpf.value = ''
      dia.value = ''
      hora.value = ''
  
    } else {
      //Diálogo de erro
      alert(
        'Erro ao efetuar cadastro, verifique se todas as informações foram preenchidas corretamente'
      );
    }
  }
  
  function carregaListaAgendamentos(agendamentos = Array(), filtro = false) {
  
    if (agendamentos.length == 0 && filtro == false) {
      agendamentos = bd.recuperarTodosRegistrosAgd()
    }
  
    //Seleciona o elemento tbody da tabela
    let listaAgendamentos = document.getElementById("listaAgendamentos")
    listaAgendamentos.innerHTML = ''
  
    //Percorre o array agendamento, listando cada despesa de forma dinâmica
    agendamentos.forEach(function(d) {
  
      //Cria a linha <tr>
      var linha = listaAgendamentos.insertRow();
  
      //Cria as colunas <td>
      linha.insertCell(0).innerHTML = d.nome
      linha.insertCell(1).innerHTML = d.cpf
      linha.insertCell(2).innerHTML = d.dia
      linha.insertCell(3).innerHTML = d.hora

  
      //Botão de excluír
    let btn = document.createElement('button')
    btn.innerHTML = '<i>Excluir</i>'
    btn.id = `id_agendamento_${d.id}`
    btn.onclick = function(){
            
      let id = this.id.replace('id_agendamento_','')
      
            //Remove a despesa
      bd.removerAgd(id)
      window.location.reload()
    }
  
    linha.insertCell(4).append(btn)
    console.log(d)
    })
  }
  
  function pesquisarAgendamento() {
  
    let nome = document.getElementById("nomeAgd").value;
    let cpf = document.getElementById("cpfAgd").value;
    let dia = document.getElementById("dia").value;
    let hora = document.getElementById("hora").value;
  
    let agendamento = new agendamento(nome, cpf, dia, hora);
  
    let agendamentos = bd.pesquisarAgd(agendamento);
  
    this.carregaListaAgendamentos(agendamentos, true);
  }
  