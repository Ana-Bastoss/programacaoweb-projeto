// =========================================
// BANCO DE DADOS DE MENTIRINHA (Simulação)
// Como ainda não temos um back-end real,  esses usuários foram feitos para testar a plataforma.
// =========================================
const mockUsers = [
    { nome: "Admin WE Corp", email: "admin@wecorp.com", senha: "123", tipo: "admin" },
    { nome: "Empresa Patrocinadora", email: "patrocinador@empresa.com", senha: "123", tipo: "patrocinador" },
    { nome: "Parceiro Institucional", email: "parceiro@instituicao.com", senha: "123", tipo: "parceiro" },
    { nome: "TechSecurity", email: "prestador@servico.com", senha: "123", tipo: "prestador" },
    { nome: "Ana Beatriz", email: "cliente@email.com", senha: "123", tipo: "cliente" }
];

// =========================================
// LÓGICA DE LOGIN E MEMÓRIA (Sessão)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("formLogin");
    
    // 1. Assim que a página carrega, a gente espia a memória do navegador pra ver se já tem alguém logado
    verificarSessao();

    // 2. Fica de olho no formulário. Quando o usuário clicar em "Acessar", roda isso aqui:
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Impede a página de dar aquele "refresh" chato e quebrar tudo
            
            const emailDigitado = document.getElementById("emailLogin").value;
            const senhaDigitada = document.getElementById("senhaLogin").value;

            // Procura na nossa lista de usuários se o email e a senha batem
            const usuarioEncontrado = mockUsers.find(
                (user) => user.email === emailDigitado && user.senha === senhaDigitada
            );

            // Se achou o usuário (Login válido!)
            if (usuarioEncontrado) {
                // Salva os dados dele no localStorage (A memória "eterna" do navegador)
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
                
                alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
                
                // REDIRECIONAMENTO INTELIGENTE (Joga o usuário pro painel certo dependendo de quem ele é)
                if (usuarioEncontrado.tipo === "admin") {
                    window.location.href = "admin-dashboard.html";
                } else if (usuarioEncontrado.tipo === "patrocinador" || usuarioEncontrado.tipo === "parceiro") {
                    window.location.href = "parceiro-dashboard.html";
                } else if (usuarioEncontrado.tipo === "prestador") {
                    window.location.href = "prestador-dashboard.html"; 
                } else {
                    // Se for cliente comum, apenas fecha o modal de login e atualiza a barra na mesma página
                    document.getElementById('loginModal').classList.remove('active');
                    verificarSessao();
                }
            } else {
                // Se digitou errado
                alert("E-mail ou senha incorretos. Tente novamente!");
            }
        });
    }

    // 3. Essa função adapta o site se a pessoa estiver logada (Troca botões, mostra nome, etc)
    function verificarSessao() {
        const usuarioLogadoString = localStorage.getItem("usuarioLogado");
        const nav = document.querySelector("nav");
        
        // Pega o botão de "Minha Conta" dinamicamente
        let btnOpenLogin = document.getElementById("btnOpenLogin");
        
        // Se tem alguém logado salvo na memória e o botão existe na tela...
        if (usuarioLogadoString && btnOpenLogin) {
            const usuarioLogado = JSON.parse(usuarioLogadoString);
            
            // Muda o botão para mostrar "Sair (Nome da Pessoa)"
            btnOpenLogin.innerHTML = `<i class="fas fa-sign-out-alt"></i> Sair (${usuarioLogado.nome.split(' ')[0]})`;
            btnOpenLogin.classList.add("logged-in");
            
            // SE FOR O CHEFÃO (Admin), criamos um botão extra de "Administrar" no menu
            if (usuarioLogado.tipo === "admin" && !document.getElementById("navAdminLink")) {
                const adminLink = document.createElement("a");
                adminLink.href = "admin-dashboard.html";
                adminLink.id = "navAdminLink";
                adminLink.style.color = "var(--theme-teal-elegant)"; // Cor de destaque
                adminLink.style.fontWeight = "700";
                adminLink.innerHTML = '<i class="fas fa-cogs"></i> Administrar';
                
                // Coloca o botão no menu, logo antes do botão de Sair
                nav.insertBefore(adminLink, btnOpenLogin);
            }
            
            // Um truquezinho avançado: destruímos o evento de clique antigo (que abria o modal de login)
            // clonando o botão e substituindo ele mesmo.
            const novoBtn = btnOpenLogin.cloneNode(true);
            btnOpenLogin.parentNode.replaceChild(novoBtn, btnOpenLogin);
            
            // E agora colocamos o evento novo: Fazer Logout!
            novoBtn.addEventListener("click", () => {
                if(confirm("Deseja sair da sua conta?")) {
                    localStorage.removeItem("usuarioLogado"); // Apaga da memória
                    window.location.href = "index.html"; // Joga pra home pra não ficar travado num painel
                }
            });
        }
    }
});