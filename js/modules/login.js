let adm = ["adm", "adm"];
localStorage.setItem("login-adm", JSON.stringify(adm));

function login() {
  let user = document.querySelector("#user").value;
  let password = document.querySelector("#password").value;
  const conta = JSON.parse(localStorage.getItem("lista-pessoas"));
  //const loginAdm = JSON.parse(localStorage.getItem("login-adm"));

  /*loginAdm.forEach((usuario) => {
    if (usuario.includes(user) && usuario.includes(password)) {
      window.location = "other_pages/adm.html";
      return;
    }
  });
  */

  conta.forEach((usuario) => {
    console.log("Usuario: " + usuario.email + " user: " + user);
    console.log("CPF: " + usuario.cpf + " Password: " + password);
    if (usuario.email == user && usuario.cpf == password) {
      window.location = "other_pages/usuario.html";
      return;
    }
  });
}
