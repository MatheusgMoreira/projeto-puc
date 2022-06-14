function login() {
  let user = document.querySelector("#user").value;
  let password = document.querySelector("#password").value;
  const conta = Array(localStorage.getItem("lista-pessoas"));

  conta.forEach((usuario, index, array) => {
    if (array[index].includes(user) && array[index].includes(password)) {
      validacao = true;
    }

    return validacao;
  });

  if (validacao) {
    window.open("pags/adm.html");
  } else {
    console.log("Você não possui uma conta");
  }
}

const conta = Array(localStorage.getItem("lista-pessoas"));
console.log(typeof(conta))
