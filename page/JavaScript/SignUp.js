window.addEventListener("load", start, false);

function start() {
    var bttn = document.getElementById("signup")
    bttn.addEventListener("click", show, false);
}

function show() {
    var username = document.getElementById("UserName").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    console.log(username);
    console.log(email);
    console.log(password);


}