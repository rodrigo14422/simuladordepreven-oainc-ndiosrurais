// 1) Seleção dos elementos do DOM usando document.querySelector
const form = document.querySelector('#simulador-form');
const btnCalcular = document.querySelector('#btn-calcular');
const resultadoContainer = document.querySelector('#resultado-container');

// Escutador de eventos para o botão através do formulário
form.addEventListener('submit', function (event) {
    // Evita o recarregamento padrão da página
    event.preventDefault();

    // Limpa resultados ou mensagens de erro anteriores
    resultadoContainer.innerHTML = '';
    resultadoContainer.style.display = 'none';

    // Captura dos valores dos inputs
    const limpezaMaquinas = document.querySelector('#limpeza-maquinas').value;
    const possuiAceiros = document.querySelector('#possui-aceiros').value;
    const armazenamentoCombustivel = document.querySelector('#armazenamento-combustivel').value;
    const monitoramentoDrones = document.querySelector('#monitoramento-drones').value;
    const areaPropriedade = document.querySelector('#area-propriedade').value;

    // 2) Validação de dados estrita
    if (!limpezaMaquinas || !possuiAceiros || !armazenamentoCombustivel || !monitoramentoDrones || !areaPropriedade) {
        exibirErro('Por favor, preencha todos os campos do formulário antes de calcular.');
        return;
    }

    const areaNumero = parseFloat(areaPropriedade);
    if (isNaN(areaNumero) || areaNumero <= 0) {
        exibirErro('Por favor, insira um valor válido e maior que zero para a área da propriedade.');
        return;
    }

    // 3) Processamento dos dados e Cálculo do Score de Risco
    // O score começa em 100 (Risco Máximo) e subtrai pontos para cada boa prática adotada
    let scoreRisco = 100;

    if (limpezaMaquinas === 'sim') scoreRisco -= 30;
    if (possuiAceiros === 'sim') scoreRisco -= 30;
    if (armazenamentoCombustivel === 'sim') scoreRisco -= 20;
    if (monitoramentoDrones === 'sim') scoreRisco -= 20;

    // Garante que o score fique no intervalo de 0 a 100
    scoreRisco = Math.max(0, Math.min(100, scoreRisco));

    // Determina a classificação e a cor do feedback
    let classificacao = '';
    let corClasse = '';
    let orientacoes = [];

    if (scoreRisco >= 70) {
        classificacao = 'Crítico';
        corClasse = 'risco-critico';
    } else if (scoreRisco >= 40) {
        classificacao = 'Moderado';
        corClasse = 'risco-moderado';
    } else {
        classificacao = 'Baixo';
        corClasse = 'risco-baixo';
    }

    // Gerando orientações personalizadas com base nas respostas
    if (limpezaMaquinas === 'nao') {
        orientacoes.push('<strong>Manutenção de Máquinas:</strong> O acúmulo de resíduos secos em partes quentes do motor é uma causa comum de ignição. Faça a inspeção e limpeza antes do uso e evite a entrada de maquinário sujo de outras propriedades.');
    }
    if (possuiAceiros === 'nao') {
        orientacoes.push('<strong>Infraestrutura:</strong> Providencie a abertura e manutenção de aceiros (faixas de terra limpa), especialmente nas proximidades de rodovias para blindar sua safra contra fagulhas externas.');
    }
    if (armazenamentoCombustivel === 'nao') {
        orientacoes.push('<strong>Armazenamento Seguro:</strong> Adeque o armazenamento de combustíveis às normas de segurança do trabalho rural para evitar explosões e propagação de fogo.');
    }
    if (monitoramentoDrones === 'nao') {
        orientacoes.push('<strong>Inovação:</strong> Considere o uso de tecnologias como drones para monitoramento preventivo de focos de incêndio em períodos de estiagem prolongada (como sob o efeito do La Niña).');
    }
    if (scoreRisco > 0) {
        orientacoes.push('<strong>Capacitação:</strong> Busque os cursos de prevenção e combate a incêndios rurais ofertados pelo <strong>Sistema FAEP/SENAR-PR</strong> para treinar sua equipe.');
    } else {
        orientacoes.push('Parabéns! Sua propriedade segue altos padrões de conformidade ESG e segurança no
