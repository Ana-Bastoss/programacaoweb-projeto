// =========================================
// 🎛️ SCRIPTS DOS DASHBOARDS (dashboard.js)
// Controla as abas, submenus e modais dos painéis de Admin, Parceiro e Prestador.
// =========================================

// 📂 Função para abrir e fechar os submenus laterais (Ex: Parceiros > Gestão de Eventos)
function toggleSubmenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('open');
    }
}

// 📑 Função mágica que troca as abas do painel sem recarregar a página
function showTab(tabName) {
    // 1. Esconde todo o conteúdo de todas as abas
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 2. Tira a marcação de "ativo" de todos os botões do menu lateral
    document.querySelectorAll('.admin-menu li').forEach(li => {
        li.classList.remove('active');
    });
    
    // 3. Mostra só o conteúdo da aba que a gente quer
    const tabElement = document.getElementById('tab-' + tabName);
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    // 4. Marca o botão do menu que foi clicado como ativo
    // (O stopPropagation evita que o clique feche um submenu acidentalmente)
    if (event) {
        event.stopPropagation();
        event.currentTarget.classList.add('active');
    }
}

// 🪟 Funções para abrir as janelas flutuantes (Modais de Perfil, Criação, etc)
function openProfileModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// ❌ Função para fechar todas as janelas flutuantes
function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Fecha o modal se o usuário clicar na área escura do fundo
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });
});