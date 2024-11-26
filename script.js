// Simulação de login e senha
const users = {
    "user1": "password1",
    "user2": "password2",
    "admin": "admin123" // Novo usuário admin
};

// Autenticação de login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username] === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username); // Armazenar o nome do usuário
        window.location.href = "vote.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
});

// Inicializa os contadores de votos e a pergunta no localStorage, se ainda não existirem
if (!localStorage.getItem("votesYes")) localStorage.setItem("votesYes", 0);
if (!localStorage.getItem("votesNo")) localStorage.setItem("votesNo", 0);
if (!localStorage.getItem("question")) localStorage.setItem("question", "Você é a favor da extinção da jornada de trabalho 6x1?");
if (!localStorage.getItem("userVotes")) localStorage.setItem("userVotes", JSON.stringify({}));

// Controle de votação
document.getElementById("voteYes")?.addEventListener("click", function () {
    registerVote("Sim");
});
document.getElementById("voteNo")?.addEventListener("click", function () {
    registerVote("Não");
});

function registerVote(vote) {
    const username = localStorage.getItem("username");
    const question = localStorage.getItem("question");

    if (username === "admin") {
        alert("O administrador não pode votar.");
        return;
    }

    const userVotes = JSON.parse(localStorage.getItem("userVotes"));

    // Verifica se o usuário já votou para a pergunta atual
    if (userVotes[question] && userVotes[question][username]) {
        alert("Você já votou nessa pergunta!");
        return;
    }

    // Registra o voto do usuário
    if (!userVotes[question]) {
        userVotes[question] = {};
    }
    userVotes[question][username] = true;
    localStorage.setItem("userVotes", JSON.stringify(userVotes));

    // Incrementa os votos no localStorage
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

        const logoutButton = document.getElementById("logoutButton");
        if (localStorage.getItem("isLoggedIn")) {
            logoutButton.style.display = "block"; // Torna o botão visível
            logoutButton.addEventListener("click", logout);
        }
    }

    // Página de voto (vote.html)
    if (window.location.pathname.endsWith("vote.html")) {
        const question = localStorage.getItem("question");
        document.getElementById("question").textContent = question; // Exibe a pergunta

        if (username === "admin") {
            // Esconder botões de votação para o admin
            document.getElementById("voteButtons").style.display = "none";

            // Exibir as opções administrativas se for admin
            document.getElementById("adminOptions").style.display = "block";
            document.getElementById("resetVotes").addEventListener("click", function () {
                resetVotes();
                window.location.reload(); // Atualiza a página após o reset
            });
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
    localStorage.setItem("votesYes", 0);
    localStorage.setItem("votesNo", 0);
    localStorage.setItem("userVotes", JSON.stringify({}));
    alert("Votos resetados!");
}

// Função para alterar a pergunta
function changeQuestion() {
    const newQuestion = prompt("Digite a nova pergunta:");
    if (newQuestion) {
        localStorage.setItem("question", newQuestion);

        // Reseta votos e registros de quem já votou
        localStorage.setItem("votesYes", 0);
        localStorage.setItem("votesNo", 0);
        localStorage.setItem("userVotes", JSON.stringify({}));

        alert("Pergunta alterada com sucesso!");
        window.location.reload(); // Recarregar para exibir a nova pergunta
    }
}

// Função para deslogar o usuário
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Redireciona para a página de login
}

// Exibir o botão de sair para todos os usuários logados
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn")) {
        const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.style.display = "block"; // Torna o botão visível
            logoutButton.addEventListener("click", logout);
        }
    }
});

