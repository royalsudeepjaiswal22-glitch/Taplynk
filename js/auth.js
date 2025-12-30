function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(!email || !password) return alert("Enter email and password");

  firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>window.location.href="dashboard.html")
    .catch(e=>alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>window.location.href="dashboard.html")
    .catch(e=>alert(e.message));
}