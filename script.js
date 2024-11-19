// Simulação de login e senha
const users = {
    "user1": "password1",
    "user2": "password2",
    "admin": "admin123"  // Novo usuário admin
};

// Autenticação de login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] && users[username] === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);  // Armazenar o nome do usuário
        if (username === "admin") {
            window.location.href = "vote.html"; // Admin vai para a página de votação
        } else {
            window.location.href = "vote.html"; // Usuário comum vai para a página de votação
        }
    } else {
        alert("Usuário ou senha incorretos");
    }
});

// Inicializa os contadores de votos e a pergunta no localStorage, se ainda não existirem
if (!localStorage.getItem("votesYes")) localStorage.setItem("votesYes", 0);
if (!localStorage.getItem("votesNo")) localStorage.setItem("votesNo", 0);
if (!localStorage.getItem("question")) localStorage.setItem("question", "Você é a favor da extinção da jornada de trabalho 6x1?");

// Controle de votação
document.getElementById("voteYes")?.addEventListener("click", function () {
    registerVote("Sim");
});
document.getElementById("voteNo")?.addEventListener("click", function () {
    registerVote("Não");
});

function registerVote(vote) {
    const username = localStorage.getItem("username");
    if (username === "admin") {
        alert("O administrador não pode votar.");
        return;
    }

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
    const username = localStorage.getItem("username");
    if (window.location.pathname.endsWith("result.html")) {
        const votesYes = localStorage.getItem("votesYes");
        const votesNo = localStorage.getItem("votesNo");
        
        document.getElementById("results").textContent = `Sim - ${votesYes} votos\nNão - ${votesNo} votos`;
    }

    // Página de voto (vote.html)
    if (window.location.pathname.endsWith("vote.html")) {
        const question = localStorage.getItem("question");
        document.getElementById("question").textContent = question; // Exibe a pergunta

        // Exibir as opções administrativas se for admin
        if (username === "admin") {
            document.getElementById("adminOptions").style.display = "block";
            document.getElementById("resetVotes").addEventListener("click", resetVotes);
            document.getElementById("changeQuestion").addEventListener("click", changeQuestion);
            // Exibe os resultados para o admin diretamente na página de votação
            const votesYes = localStorage.getItem("votesYes");
            const votesNo = localStorage.getItem("votesNo");
            document.getElementById("adminResults").textContent = `Resultados: Sim - ${votesYes} votos | Não - ${votesNo} votos`;
        }
    }
});

// Função para resetar votos
function resetVotes() {
    if (confirm("Tem certeza de que deseja resetar os votos?")) {
        localStorage.setItem("votesYes", 0);
        localStorage.setItem("votesNo", 0);
        alert("Votos resetados!");
    }
}

// Função para alterar a pergunta
function changeQuestion() {
    const newQuestion = prompt("Digite a nova pergunta:");
    if (newQuestion) {
        localStorage.setItem("question", newQuestion);
        alert("Pergunta alterada com sucesso!");
        window.location.reload(); // Recarregar para exibir a nova pergunta
    }
}
