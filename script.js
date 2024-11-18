// Simulação de login e senha
const users = {
    "admin": "admin",
    "user": "senha"
};

// Autenticação de login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] && users[username] === password) {
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "vote.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
});

// Inicializa os contadores de votos no localStorage
if (!localStorage.getItem("votesYes")) localStorage.setItem("votesYes", 0);
if (!localStorage.getItem("votesNo")) localStorage.setItem("votesNo", 0);

// Controle de votação
document.getElementById("voteYes")?.addEventListener("click", function () {
    registerVote("Sim");
});
document.getElementById("voteNo")?.addEventListener("click", function () {
    registerVote("Não");
});

function registerVote(vote) {
    if (vote === "Sim") {
        let currentVotes = parseInt(localStorage.getItem("votesYes"));
        localStorage.setItem("votesYes", currentVotes + 1);
    } else if (vote === "Não") {
        let currentVotes = parseInt(localStorage.getItem("votesNo"));
        localStorage.setItem("votesNo", currentVotes + 1);
    }
    window.location.href = "result.html";
}

// Exibir resultado
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("result.html")) {
        const votesYes = localStorage.getItem("votesYes");
        const votesNo = localStorage.getItem("votesNo");
        
        document.getElementById("results").textContent = `Sim - ${votesYes} votos\nNão - ${votesNo} votos`;
    }
});
