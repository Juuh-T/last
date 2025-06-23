// Aguarda o carregamento completo do DOM para executar o script
document.addEventListener('DOMContentLoaded', function () {

    /**
     * =================================================================
     * INICIALIZAÇÃO DO SWIPER (CARROSSEL)
     * =================================================================
     * Configura o carrossel da seção hero com loop, autoplay e navegação.
     */
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade', // Efeito de transição suave
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000, // Troca de slide a cada 5 segundos
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    /**
     * =================================================================
     * FUNCIONALIDADE DE COPIAR CHAVE PIX
     * =================================================================
     * Adiciona um evento ao botão para copiar a chave PIX para a área de transferência.
     */
    const copiarPixBtn = document.getElementById('copiar-pix-btn');
    if (copiarPixBtn) {
        const chavePixTexto = document.getElementById('chave-pix-texto').innerText;
        
        copiarPixBtn.addEventListener('click', () => {
            // Usa a API de Clipboard, que é moderna e segura
            navigator.clipboard.writeText(chavePixTexto).then(() => {
                // Adiciona uma classe para o feedback visual via CSS
                copiarPixBtn.classList.add('copiado');
                
                // Remove a classe após 2 segundos para o botão voltar ao estado normal
                setTimeout(() => {
                    copiarPixBtn.classList.remove('copiado');
                }, 2000);
            }).catch(err => {
                // Tratamento de erro caso a cópia falhe
                console.error('Falha ao copiar a chave PIX: ', err);
                alert('Não foi possível copiar a chave PIX. Tente manualmente.');
            });
        });
    }

    /**
     * =================================================================
     * SISTEMA DE ABAS (TABS) PARA O GUIA DE RECICLAGEM
     * =================================================================
     * Gerencia a troca de conteúdo ao clicar nas abas do guia.
     */
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Remove a classe 'active' de todos os links e conteúdos
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            // Adiciona a classe 'active' ao link clicado e ao conteúdo correspondente
            link.classList.add('active');
            const activeTabContent = document.getElementById(tabId);
            if(activeTabContent) {
                activeTabContent.classList.add('active');
            }
        });
    });

    /**
     * =================================================================
     * CONTADOR ANIMADO PARA A SEÇÃO DE IMPACTO
     * =================================================================
     * Anima os números da seção de impacto quando ela entra no campo de visão.
     */
    const animarNumeros = () => {
        const contadores = document.querySelectorAll('.numero-impacto');
        const velocidade = 200; // Define a "velocidade" da animação

        contadores.forEach(contador => {
            const valorFinal = +contador.getAttribute('data-valor');
            // Reseta para 0 para garantir que a animação sempre comece do início
            contador.innerText = '0'; 
            
            const animar = () => {
                const valorAtual = +contador.innerText;
                const incremento = Math.ceil(valorFinal / velocidade);

                if (valorAtual < valorFinal) {
                    contador.innerText = Math.min(valorAtual + incremento, valorFinal);
                    setTimeout(animar, 10); // Executa a cada 10ms
                } else {
                    contador.innerText = valorFinal.toLocaleString('pt-BR'); // Formata o número final
                }
            };
            animar();
        });
    };

    // Usa IntersectionObserver para performance, disparando a animação apenas quando a seção está visível
    const secaoImpacto = document.getElementById('impacto');
    if (secaoImpacto) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Se a seção estiver 50% visível, inicia a animação e para de observar
                if (entry.isIntersecting) {
                    animarNumeros();
                    observer.unobserve(secaoImpacto);
                }
            });
        }, { threshold: 0.5 }); 

        observer.observe(secaoImpacto);
    }
    
    /**
     * =================================================================
     * EFEITO DE SCROLL NO CABEÇALHO
     * =================================================================
     * Adiciona uma classe 'scrolled' ao cabeçalho quando o usuário rola a página,
     * permitindo estilização via CSS (ex: sombra, tamanho reduzido).
     */
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
