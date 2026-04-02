// =========================================
// 🧠 SCRIPTS GERAIS DO SITE (main.js)
// Aqui controlamos os modais de login, as abas de pagamento e interações visuais.
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONTROLE DOS MODAIS DE LOGIN E CADASTRO ---
    const btnOpenLogin = document.getElementById('btnOpenLogin');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const btnsClose = document.querySelectorAll('.close-modal');
    const btnSwitchToRegister = document.getElementById('btnSwitchToRegister');
    const btnSwitchToLogin = document.getElementById('btnSwitchToLogin');

    // Abre o modal de login
    if (btnOpenLogin) {
        btnOpenLogin.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    // Fecha os modais ao clicar no "X"
    btnsClose.forEach(btn => {
        btn.addEventListener('click', () => {
            if (loginModal) loginModal.classList.remove('active');
            if (registerModal) registerModal.classList.remove('active');
            
            // Se o modal de serviços estiver aberto, fecha também
            const modalServico = document.getElementById('modalServicoDetalhes');
            if (modalServico) modalServico.classList.remove('active');
        });
    });

    // Fecha os modais se o usuário clicar fora da caixinha branca (no fundo escuro)
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.remove('active');
        if (e.target === registerModal) registerModal.classList.remove('active');
        
        const modalServico = document.getElementById('modalServicoDetalhes');
        if (e.target === modalServico) modalServico.classList.remove('active');
    });

    // Troca do Login para o Cadastro
    if (btnSwitchToRegister) {
        btnSwitchToRegister.addEventListener('click', () => {
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }

    // Troca do Cadastro para o Login
    if (btnSwitchToLogin) {
        btnSwitchToLogin.addEventListener('click', () => {
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    // --- 2. SISTEMA DE AVALIAÇÃO (Estrelinhas Interativas) ---
    const stars = document.querySelectorAll('.star-rating-input i');
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Ao clicar, pinta de dourado até a estrela selecionada
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                        s.style.color = '#f39c12'; // Dourado
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                        s.style.color = '#ccc'; // Volta pro cinza
                    }
                });
            });
        });
    }
});

// =========================================
// 🛠️ FUNÇÕES GLOBAIS (Chamadas direto no HTML)
// =========================================

// Abrir Modal de Serviço (Na página de Serviços)
function openServiceModal() {
    const modal = document.getElementById('modalServicoDetalhes');
    if (modal) modal.classList.add('active');
}

// Alternar Abas de Pagamento (Usado no Evento e Assinaturas)
function openPayment(method) {
    // Esconde todos os conteúdos de pagamento
    const contents = document.querySelectorAll('.payment-content');
    contents.forEach(content => content.style.display = 'none');
    
    // Tira a cor de "ativo" de todas as abas
    const tabs = document.querySelectorAll('.payment-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostra só a opção escolhida (PIX, Cartão ou Boleto)
    const selectedContent = document.getElementById('pay-' + method);
    if (selectedContent) selectedContent.style.display = 'block';
    
    // Pinta a aba que o usuário acabou de clicar
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}