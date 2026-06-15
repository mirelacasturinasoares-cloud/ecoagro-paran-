/* =========================================
   ECOAGRO PARANÁ - LOGIC & GRAPH INTERACTIVITY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // BARRA DE PROGRESSO DO TOPO
    const progressBar = document.getElementById("progressBar");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progresso = (window.scrollY / total) * 100;
        if (progressBar) progressBar.style.width = progresso + "%";
    });

    // INTERATIVIDADE DO MENU MOBILE
    const menuMobile = document.getElementById("menuMobile");
    const navMenu = document.querySelector("nav");

    if (menuMobile && navMenu) {
        menuMobile.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        const linksNav = navMenu.querySelectorAll("a");
        linksNav.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // MODO ESCURO
    const darkBtn = document.getElementById("darkModeBtn");
    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    // ANIMAR CONTADORES INICIAIS
    function animarContador(id, valorFinal) {
        const elemento = document.getElementById(id);
        if (!elemento) return;
        let atual = 0;
        const incremento = Math.ceil(valorFinal / 100);
        const intervalo = setInterval(() => {
            atual += incremento;
            if (atual >= valorFinal) {
                atual = valorFinal;
                clearInterval(intervalo);
            }
            elemento.textContent = atual.toLocaleString("pt-BR");
        }, 15);
    }
    animarContador("contador1", 25000);
    animarContador("contador2", 4200);
    animarContador("contador3", 85);
    animarContador("contador4", 320);

    // COMPARADOR DE PRÁTICAS
    window.mostrarSustentavel = function () {
        document.getElementById("resultadoComparador").innerHTML = `
            <h3 style="color:#2e7d32; margin-bottom:10px;">🌱 Práticas Rurais Sustentáveis</h3>
            <p>Foco na rotação de culturas, plantio direto na palha, uso racional da água, energia limpa e respeito absoluto às faixas de mata ciliar. Preserva o ecossistema e assegura produtividade perpétua.</p>
        `;
    }
    window.mostrarPredatorio = function () {
        document.getElementById("resultadoComparador").innerHTML = `
            <h3 style="color:#f44336; margin-bottom:10px;">⚠ Impactos da Agricultura Predatória</h3>
            <p>Uso exaustivo do solo sem descanso, desmatamento ilegal de encostas, desperdício sistemático por canais de irrigação ineficientes e destruição de polinizadores nativos por pulverização incorreta.</p>
        `;
    }

    // QUIZ DE 10 PERGUNTAS
    const perguntas = [
        { pergunta: "Qual recurso natural deve ser poupado com a irrigação inteligente?", alternativas: ["Água", "Solo", "Ar", "Fogo"], correta: 0 },
        { pergunta: "A energia solar utilizada no campo é considerada uma fonte:", alternativas: ["Poluente", "Não renovável", "Limpa e renovável", "Esgotável"], correta: 2 },
        { pergunta: "O reflorestamento de áreas degradadas ajuda diretamente a:", alternativas: ["Aumentar as queimadas", "Recuperar a biodiversidade e proteger nascentes", "Prejudicar a qualidade do solo", "Diminuir a umidade"], correta: 1 },
        { pergunta: "Qual a principal função dos drones agrícolas na EcoAgro?", alternativas: ["Transportar sacas", "Espantar pássaros", "Monitorar lavouras de forma inteligente", "Substituir tratores"], correta: 2 },
        { pergunta: "A rotação de culturas é uma técnica que serve para:", alternativas: ["Desgastar o solo", "Evitar a exaustão do solo e controlar pragas", "Gastar mais água", "Substituir sementes"], correta: 1 },
        { pergunta: "O que caracteriza a Agricultura de Precisão?", alternativas: ["Ferramentas manuais", "Plantação de apenas uma semente", "Uso de dados e tecnologia para aplicar insumos no local certo", "Derrubada de florestas"], correta: 2 },
        { pergunta: "Qual dessas opções é uma prática prejudicial ao meio ambiente?", alternativas: ["Energia eólica", "Compostagem orgânica", "Queimadas para limpeza de terreno", "Plantio direto na palha"], correta: 2 },
        { pergunta: "O reaproveitamento de matéria orgânica para fertilizar o solo chama-se:", alternativas: ["Compostagem", "Descarte", "Poluição", "Inceneração"], correta: 0 },
        { pergunta: "As APPs (Áreas de Preservação Permanente) servem para:", alternativas: ["Construir moradias", "Proteger recursos hídricos e estabilidade geológica", "Virar pastagem comum", "Testar químicos agrícolas"], correta: 1 },
        { pergunta: "A agricultura sustentável equilibra três pilares fundamentais. Quais são?", alternativas: ["Dinheiro, pressa e máquinas", "Social, ambiental e econômico", "Desmatamento, exportação e lucro", "Química, tecnologia e velocidade"], correta: 1 }
    ];

    const perguntaQuiz = document.getElementById("texto-pergunta");
    const alternativasQuiz = document.getElementById("opcoes-box");
    const resultadoBox = document.getElementById("resultado-quiz");
    const pontuacaoTexto = document.getElementById("pontuacao-texto");
    const btnProximo = document.getElementById("btn-proximo");
    const perguntaBox = document.getElementById("pergunta-box");
    const secaoRanking = document.getElementById("ranking");
    const secaoConquistas = document.getElementById("conquistas");

    let indicePergunta = 0; let pontosQuiz = 0;

    function carregarPergunta() {
        if (!perguntaQuiz || !alternativasQuiz) return;
        if (btnProximo) btnProximo.style.display = "none";
        const atual = perguntas[indicePergunta];
        perguntaQuiz.textContent = `${indicePergunta + 1}/10 - ${atual.pergunta}`;
        alternativasQuiz.innerHTML = "";

        atual.alternativas.forEach((opcao, indice) => {
            const botao = document.createElement("button");
            botao.textContent = opcao;
            botao.addEventListener("click", () => {
                const botoes = alternativasQuiz.querySelectorAll("button");
                botoes.forEach(b => b.disabled = true);
                if (indice === atual.correta) {
                    pontosQuiz++;
                    botao.style.background = "#4CAF50";
                    botao.style.color = "white";
                } else {
                    botao.style.background = "#f44336";
                    botao.style.color = "white";
                    botoes[atual.correta].style.background = "#4CAF50";
                    botoes[atual.correta].style.color = "white";
                }
                if (btnProximo) btnProximo.style.display = "block";
            });
            alternativasQuiz.appendChild(botao);
        });
    }

    window.proximaPergunta = function () {
        indicePergunta++;
        if (indicePergunta < perguntas.length) { carregarPergunta(); } else { finalizarQuiz(); }
    }

    function finalizarQuiz() {
        if (perguntaBox) perguntaBox.style.display = "none";
        if (alternativasQuiz) alternativasQuiz.style.display = "none";
        if (btnProximo) btnProximo.style.display = "none";
        if (resultadoBox && pontuacaoTexto) {
            resultadoBox.style.display = "block";
            pontuacaoTexto.innerHTML = `Você concluiu! Total de acertos: <strong>${pontosQuiz}</strong> de <strong>10</strong>.`;
            if (secaoRanking) secaoRanking.style.display = "block";
            if (secaoConquistas) secaoConquistas.style.display = "block";
            atualizarResultadosFinais();
            secaoRanking.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function atualizarResultadosFinais() {
        const nivelUsuario = document.getElementById("nivelUsuario");
        const conquistasBox = document.getElementById("conquistasBox");
        let estrelas = "⭐".repeat(Math.ceil(pontosQuiz / 2)) || "⭐";
        
        if (nivelUsuario) {
            if (pontosQuiz === 10) nivelUsuario.innerHTML = `<h3>👑 Guardião da Natureza</h3><p>${estrelas} (Pontuação máxima alcançada!)</p>`;
            else if (pontosQuiz >= 7) nivelUsuario.innerHTML = `<h3>🌱 Produtor Sustentável Consciente</h3><p>${estrelas}</p>`;
            else if (pontosQuiz >= 5) nivelUsuario.innerHTML = `<h3>🚜 Técnico em Aprendizado</h3><p>${estrelas}</p>`;
            else nivelUsuario.innerHTML = `<h3>⚠ Iniciante Ecológico</h3><p>${estrelas}</p>`;
        }

        if (conquistasBox) {
            let html = "<div style='text-align:left; max-width:600px; margin:20px auto; line-height:1.8;'>";
            html += `<p>🎖️ <strong>Selo Cidadão do Campo:</strong> Outorgado por concluir o percurso completo de avaliação teórica do Agrinho.</p>`;
            if (pontosQuiz >= 6) html += `<p>🌿 <strong>Medalha Consciência Verde:</strong> Desbloqueada por demonstrar excelente base em biomas e conservação do solo.</p>`;
            if (pontosQuiz === 10) html += `<p>👑 <strong>Troféu Excelência Agrinho 2026:</strong> Gabaritou todas as metas de conhecimento agronômico sustentável!</p>`;
            if (window.simuladorFeito) html += `<p>📐 <strong>Distintivo Arquiteto Tecnológico:</strong> Concedido por testar arranjos técnicos no simulador integrado.</p>`;
            html += "</div>";
            conquistasBox.innerHTML = html;
        }
    }

    window.reiniciarQuiz = function () {
        indicePergunta = 0; pontosQuiz = 0;
        if (perguntaBox) perguntaBox.style.display = "block";
        if (alternativasQuiz) alternativasQuiz.style.display = "block";
        if (resultadoBox) resultadoBox.style.display = "none";
        if (secaoRanking) secaoRanking.style.display = "none";
        if (secaoConquistas) secaoConquistas.style.display = "none";
        carregarPergunta();
    }
    carregarPergunta();

    // MAPA INTERATIVO
    window.mostrarRegiao = function (regiao) {
        const info = document.getElementById("infoRegiao");
        const dados = {
            norte: "🌱 <strong>Norte Pioneiro:</strong> Integração Lavoura-Pecuária-Floresta (ILPF) recuperando pastagens arenas.",
            oeste: "🚜 <strong>Oeste Paranaense:</strong> Uso massivo de biodigestores para conversão de dejetos em energia limpa.",
            sudoeste: "🐄 <strong>Sudoeste:</strong> Modelos pioneiros de bacias leiteiras baseadas em pastoreio rotacionado.",
            centro: "🌳 <strong>Centro-Sul:</strong> Manejo florestal certificado e forte preservação de remanescentes de Mata de Araucárias."
        };
        if(info) info.innerHTML = dados[regiao] || "Região desconhecida.";
    }

    // CURIOSIDADES ROTATIVAS
    const campoCuriosidade = document.getElementById("curiosidade");
    const fatos = [
        "O Paraná é referência nacional no plantio direto, técnica que evita erosões do solo.",
        "Sensores acoplados ao solo evitam desperdício irrigando lavouras apenas na dosagem necessária.",
        "A agricultura de precisão pode diminuir em até 30% a aplicação de defensivos químicos.",
        "As abelhas nativas são responsáveis pela polinização de grande parte das plantas cultivadas."
    ];
    if (campoCuriosidade) {
        let fIdx = 0; campoCuriosidade.textContent = fatos[0];
        setInterval(() => {
            fIdx = (fIdx + 1) % fatos.length;
            campoCuriosidade.textContent = fatos[fIdx];
        }, 5000);
    }

    // ===================================================
    // CANVAS GRÁFICO TOTALMENTE INTERATIVO (AJUSTADO)
    // ===================================================
    const canvas = document.getElementById("grafico");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const anos = ["1950", "1980", "2010", "2023", "2026"];
        const valores = [35, 55, 75, 115, 160];
        
        let barWidth = 70;
        let spacing = 50;
        let startX = 60;
        let canvasHeight = canvas.height;
        let hoveredIndex = -1;

        function desenharGrafico() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Linhas de Fundo do Gráfico
            ctx.strokeStyle = "#e0e0e0";
            ctx.lineWidth = 1;
            for(let l = 1; l <= 4; l++) {
                let yLine = canvasHeight - (l * 75) - 50;
                ctx.beginPath();
                ctx.moveTo(30, yLine);
                ctx.lineTo(canvas.width - 30, yLine);
                ctx.stroke();
            }

            // Loop para renderizar as colunas e textos
            valores.forEach((val, idx) => {
                let x = startX + idx * (barWidth + spacing);
                let y = canvasHeight - val - 50;
                
                if (idx === hoveredIndex) {
                    ctx.fillStyle = "#2e7d32";
                    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
                    ctx.shadowBlur = 8;
                    
                    ctx.fillStyle = document.body.classList.contains("dark") ? "#fff" : "#111";
                    ctx.font = "bold 13px Poppins";
                    ctx.textAlign = "center";
                    ctx.fillText(`Índice: ${val}%`, x + (barWidth / 2), y - 15);
                } else {
                    ctx.fillStyle = "#4CAF50";
                    ctx.shadowBlur = 0;
                }

                ctx.fillRect(x, y, barWidth, val);
                ctx.shadowBlur = 0;

                // Texto dos Anos (Eixo X)
                ctx.fillStyle = document.body.classList.contains("dark") ? "#bbb" : "#555";
                ctx.font = "500 13px Poppins";
                ctx.textAlign = "center";
                ctx.fillText(anos[idx], x + (barWidth / 2), canvasHeight - 20);
            });
        }

        // Listener para rastrear a posição do mouse no Canvas
        canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect();
            // Correção de escala caso o canvas mude de tamanho de forma responsiva
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const mouseX = (event.clientX - rect.left) * scaleX;
            const mouseY = (event.clientY - rect.top) * scaleY;
            let activeIdx = -1;

            valores.forEach((val, idx) => {
                let x = startX + idx * (barWidth + spacing);
                let y = canvasHeight - val - 50;

                if (mouseX >= x && mouseX <= x + barWidth && mouseY >= y && mouseY <= canvasHeight - 50) {
                    activeIdx = idx;
                }
            });

            if (activeIdx !== hoveredIndex) {
                hoveredIndex = activeIdx;
                desenharGrafico();
            }
        });

        canvas.addEventListener("mouseleave", () => {
            hoveredIndex = -1;
            desenharGrafico();
        });

        desenharGrafico();
        
        // Redesenha caso o modo escuro seja clicado para alterar a cor das fontes
        if (darkBtn) {
            darkBtn.addEventListener("click", () => {
                setTimeout(desenharGrafico, 50);
            });
        }
    }

    // ANIMAÇÃO DOS ELEMENTOS VIA SCROLL (Ignorando o canvas para evitar travamento de opacidade)
    const elementos = document.querySelectorAll("section:not(#grafico-section), .card, .evento");
    function revelar() {
        const tela = window.innerHeight * 0.88;
        elementos.forEach(item => {
            const topo = item.getBoundingClientRect().top;
            if (topo < tela) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    }
    elementos.forEach(item => {
        if (item.id !== "grafico") {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            item.style.transition = "0.6s ease-out";
        }
    });
    window.addEventListener("scroll", revelar);
    revelar();
});

// SIMULADOR DE INFRAESTRUTURA
function calcularFazenda() {
    const energia = parseInt(document.getElementById("energia").value);
    const irrigacao = parseInt(document.getElementById("irrigacao").value);
    const monitoramento = parseInt(document.getElementById("monitoramento").value);
    const preservacao = parseInt(document.getElementById("preservacao").value);

    const pontos = energia + irrigacao + monitoramento + preservacao;
    window.simuladorFeito = true;
    let resultado = "";

    if (pontos >= 85) {
        resultado = `<span style='color:#2e7d32;'>🏆 Nota: ${pontos}% — Fazenda Modelo!</span><br><small style='font-size:1rem; font-weight:400; color:#555;'>Parabéns! Sua propriedade atinge os maiores critérios técnicos de conservação e produtividade digital.</small>`;
    } else if (pontos >= 60) {
        resultado = `<span style='color:#ffa000;'>🌱 Nota: ${pontos}% — Fazenda Sustentável</span><br><small style='font-size:1rem; font-weight:400; color:#555;'>Bom trabalho. Sua fazenda adota boas diretrizes ecológicas, mas ainda pode investir mais em inteligência automatizada.</small>`;
    } else {
        resultado = `<span style='color:#f44336;'>⚠ Nota: ${pontos}% — Em Adaptação</span><br><small style='font-size:1rem; font-weight:400; color:#555;'>A infraestrutura atual está defasada. Considere aplicar fontes fotovoltaicas ou captação por sensores para progredir.</small>`;
    }
    document.getElementById("resultadoSimulador").innerHTML = resultado;
}
