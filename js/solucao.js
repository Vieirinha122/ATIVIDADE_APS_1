function buscarMarcas() {
    const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

    fetch(url)
        .then(response => response.json())
        .then(marcas => {
            const marcaSelect = document.getElementById('marca');
            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.codigo;
                option.textContent = marca.nome;
                marcaSelect.appendChild(option);
            });

            buscarModelos(marcaSelect.value);
        })
        .catch(error => console.error('Erro ao buscar marcas:', error));
}

function buscarModelos(marcaId) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const modeloSelect = document.getElementById('modelo');
            modeloSelect.innerHTML = ''; 
            data.modelos.forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo.codigo;
                option.textContent = modelo.nome;
                modeloSelect.appendChild(option);
            });

            buscarAnos(marcaId, modeloSelect.value);
        })
        .catch(error => console.error('Erro ao buscar modelos:', error));
}

function buscarAnos(marcaId, modeloId) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos`;

    fetch(url)
        .then(response => response.json())
        .then(anos => {
            const anoSelect = document.getElementById('ano');
            anoSelect.innerHTML = '';
            anos.forEach(ano => {
                const option = document.createElement('option');
                option.value = ano.codigo;
                option.textContent = ano.nome;
                anoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar anos:', error));
}

function VeiculoInformacao() {
    const marcaId = document.getElementById('marca').value;
    const modeloId = document.getElementById('modelo').value;
    const anoId = document.getElementById('ano').value;

    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h2>Detalhes do Veículo</h2>
                <p>Preço: ${data.Valor}</p>
                <p>Mês de Referência: ${data.MesReferencia}</p>
            `;
        })
        .catch(error => {
            console.error('Erro ao obter informações do veículo:', error);
            document.getElementById('result').textContent = 'Não foi possível obter as informações do veículo. Tente novamente mais tarde.';
        });
}
document.getElementById('marca').addEventListener('change', (e) => {
    buscarModelos(e.target.value);
});

document.getElementById('modelo').addEventListener('change', (e) => {
    const marcaId = document.getElementById('marca').value;
    buscarAnos(marcaId, e.target.value);
});

document.getElementById('fetchDataButton').addEventListener('click', VeiculoInformacao);
buscarMarcas();

// js/app.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js') // Certifique-se de que o caminho está correto
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }
  