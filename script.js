const apiUrl = 'https://economia.awesomeapi.com.br/json/all';

const valorInput = document.getElementById('valor-input');
const moedaOrigemSelect = document.getElementById('moeda-origem');
const moedaDestinoSelect = document.getElementById('moeda-destino');
const converterBtn = document.getElementById('converter-btn');
const resultadoP = document.getElementById('resultado');

function popularMoedas(data) {
    const moedas = Object.keys(data);

    moedas.forEach(moeda => {
        if (moeda !== 'USDT') {
            const optionOrigem = document.createElement('option');
            optionOrigem.value = moeda;
            optionOrigem.textContent = `${moeda} - ${data[moeda].name.split('/')[0]}`;
            
            const optionDestino = document.createElement('option');
            optionDestino.value = moeda;
            optionDestino.textContent = `${moeda} - ${data[moeda].name.split('/')[0]}`;
            
            moedaOrigemSelect.appendChild(optionOrigem);
            moedaDestinoSelect.appendChild(optionDestino);
        }
    });
}

function converterMoedas(data) {
    const valor = parseFloat(valorInput.value);
    const moedaOrigem = moedaOrigemSelect.value;
    const moedaDestino = moedaDestinoSelect.value;

    if (isNaN(valor) || valor <= 0) {
        resultadoP.textContent = 'Por favor, insira um valor válido.';
        return;
    }
    
    const taxaOrigem = parseFloat(data[moedaOrigem].bid);
    const taxaDestino = parseFloat(data[moedaDestino].bid);
    
    const valorConvertido = (valor * taxaOrigem) / taxaDestino;

    resultadoP.textContent = `${valor.toLocaleString('pt-BR', {style:'currency', currency: moedaOrigem})} = ${valorConvertido.toLocaleString('pt-BR', {style:'currency', currency: moedaDestino})}`;
}



fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Dados recebidos da API:", data);
        
        popularMoedas(data);

        converterBtn.addEventListener('click', () => converterMoedas(data));
        
    })
    .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados:', error);
        resultadoP.textContent = 'Não foi possível carregar os dados das moedas. Tente novamente mais tarde.';
    });