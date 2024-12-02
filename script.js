// Inicializa a lista de usuários no localStorage, se ainda não existir
if (!localStorage.getItem("users")) {
    localStorage.setItem(
        "users",
        JSON.stringify({
            "user1": "password1",
            "user2": "password2",
            "admin": "admin123" // Usuário administrador
        })
    );
}

// Autenticação de login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")); // Obtém os usuários do localStorage

    if (users[username] && users[username] === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username); // Armazena o nome do usuário

        if (username === "admin") {
            window.location.href = "admin.html"; // Redireciona para a página do administrador
        } else {
            window.location.href = "vote.html"; // Redireciona para a página de votação
        }
    } else {
        alert("Usuário ou senha incorretos");
    }
});

// Inicializa os contadores de votos e a pergunta no localStorage, se ainda não existirem
if (!localStorage.getItem("votesYes")) localStorage.setItem("votesYes", 0);
if (!localStorage.getItem("votesNo")) localStorage.setItem("votesNo", 0);
if (!localStorage.getItem("question")) localStorage.setItem("question", "Você é a favor da extinção da jornada de trabalho 6x1?");
if (!localStorage.getItem("userVotes")) localStorage.setItem("userVotes", JSON.stringify({}));

// Página de Administração (admin.html)
if (window.location.pathname.endsWith("admin.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        const username = localStorage.getItem("username");
        if (username !== "admin") {
            alert("Acesso negado! Apenas administradores podem acessar esta página.");
            window.location.href = "index.html";
        }

        // Logout
        document.getElementById("logoutButton").addEventListener("click", logout);

        // Resetar votos
        document.getElementById("resetVotes").addEventListener("click", function () {
            resetVotes();
            alert("Votos resetados com sucesso!");
            window.location.reload();
        });

        // Alterar pergunta
        document.getElementById("changeQuestion").addEventListener("click", function () {
            const newQuestion = prompt("Digite a nova pergunta:");
            if (newQuestion) {
                localStorage.setItem("question", newQuestion);

                // Reseta votos e registros de quem já votou
                resetVotes();
                alert("Pergunta alterada com sucesso!");
            }
        });

        // Exibir resultados
        const votesYes = localStorage.getItem("votesYes");
        const votesNo = localStorage.getItem("votesNo");
        document.getElementById("adminResults").textContent = `Sim - ${votesYes} votos | Não - ${votesNo} votos`;

        // Criar novo usuário
        document.getElementById("newUserForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const newUsername = document.getElementById("newUsername").value.trim();
            const newPassword = document.getElementById("newPassword").value;

            if (!newUsername || !newPassword) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const users = JSON.parse(localStorage.getItem("users"));

            // Verifica se o usuário já existe
            if (users[newUsername]) {
                alert("Usuário já existe!");
                return;
            }

            // Adiciona o novo usuário
            users[newUsername] = newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            alert(`Usuário ${newUsername} criado com sucesso!`);
            document.getElementById("newUserForm").reset(); // Limpa o formulário
        });
    });
}

// Função para resetar votos
function resetVotes() {
    localStorage.setItem("votesYes", 0);
    localStorage.setItem("votesNo", 0);
    localStorage.setItem("userVotes", JSON.stringify({}));
}

// Função para deslogar o usuário
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Redireciona para a página de login
}

// Exibir pergunta e gerenciar interface do usuário para votação
if (window.location.pathname.endsWith("vote.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        const username = localStorage.getItem("username");
        
        // Verifica se o usuário está logado
        if (!localStorage.getItem("isLoggedIn") || !username) {
            alert("Você precisa estar logado para acessar esta página.");
            window.location.href = "index.html";
            return;
        }

        // Exibir a pergunta
        const questionElement = document.getElementById("question");
        const question = localStorage.getItem("question");
        if (question) {
            questionElement.textContent = question;
        } else {
            questionElement.textContent = "Pergunta não disponível.";
        }

        // Ocultar botões de votação se for o administrador
        if (username === "admin") {
            document.getElementById("voteButtons").style.display = "none";
        }

        // Logout
        const logoutButton = document.getElementById("logoutButton");
        logoutButton.style.display = "block"; // Torna o botão de logout visível
        logoutButton.addEventListener("click", logout);

        // Gerenciar votos para usuários comuns
        document.getElementById("voteYes").addEventListener("click", function () {
            registerVote("Sim");
        });
        document.getElementById("voteNo").addEventListener("click", function () {
            registerVote("Não");
        });
    });
}

// Função para registrar votos
function registerVote(vote) {
    const username = localStorage.getItem("username");
    const userVotes = JSON.parse(localStorage.getItem("userVotes") || "{}");

    // Verifica se o usuário já votou
    if (userVotes[username]) {
        alert("Você já votou na pergunta atual.");
        return;
    }

    // Registra o voto
    if (vote === "Sim") {
        let currentVotes = parseInt(localStorage.getItem("votesYes")) || 0;
        localStorage.setItem("votesYes", currentVotes + 1);
    } else if (vote === "Não") {
        let currentVotes = parseInt(localStorage.getItem("votesNo")) || 0;
        localStorage.setItem("votesNo", currentVotes + 1);
    }

    // Atualiza o registro de votos do usuário
    userVotes[username] = true; // Marca que o usuário votou
    localStorage.setItem("userVotes", JSON.stringify(userVotes));

    alert("Voto registrado com sucesso!");

    // Redireciona para a página de votação
    window.location.href = "vote.html";
}

// Exibir resultados da votação na página de resultados
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("result.html")) {
        const resultsElement = document.getElementById("results");
        const votesYes = parseInt(localStorage.getItem("votesYes")) || 0;
        const votesNo = parseInt(localStorage.getItem("votesNo")) || 0;

        // Atualiza o texto do elemento com os resultados
        resultsElement.textContent = `Sim - ${votesYes} votos\nNão - ${votesNo} votos`;

        // Exibe o botão de logout
        const logoutButton = document.getElementById("logoutButton");
        if (localStorage.getItem("isLoggedIn")) {
            logoutButton.style.display = "block"; // Torna o botão visível
            logoutButton.addEventListener("click", logout);
        }
    }
});

// Função para logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
}
