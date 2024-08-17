function VeiculoInformacao() {
    const marcaId = '7'; 
    const modeloId = '10020';
    const anoId = '2020-1'; 

    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`

    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            const resultDiv = document.getElementById('result'); 
            resultDiv.innerHTML = `
            <h2>Detalhes do Veículo</h2> 
            <p>Marca: ${data.Marca}</p>
            <p>Modelo: ${data.Modelo}</p>
            <p>Ano: ${data.AnoModelo}</p>
            <p>Combustível: ${data.Combustivel}</p>
            <p>Preço: ${data.Valor}</p>
            <p>Mês de Referência: ${data.MesReferencia}</p>
            `; 
        })
        .catch(Error => {
            console.error('Erro ao obter informações do veículo:', Error);
            document.getElementById('result').textContent = 'Não foi possível obter as informações do veículo. Tente novamente mais tarde.';
        }); 
}
document.getElementById('result').addEventListener('click', VeiculoInformacao); 