let adm = ["adm", "adm"];
localStorage.setItem("login-adm", JSON.stringify(adm));

function login() {
  let user = document.querySelector("#user").value;
  let password = document.querySelector("#password").value;
  const conta = JSON.parse(localStorage.getItem("lista-pessoas"));
  const loginAdm = Array(localStorage.getItem("login-adm"));

  loginAdm.forEach((usuario) => {
    
    if (usuario.includes(user) && usuario.includes(password)) {
      window.open("pags/adm.html");
    }
  });

  conta.forEach((usuario) => {
    if (usuario.email == user && usuario.cpf == password) {
      window.open("pags/usuario.html");
      return;
    }
  });
  alert("Usuario/senha invalidos");
}
