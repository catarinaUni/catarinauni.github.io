// Importando o módulo fetch nativo disponível no Node.js v17.5 ou superior
import fetch from 'node-fetch';

// Função para converter uma imagem para Base64 usando fetch
async function converterImagemParaBase64(url) {
  const resposta = await fetch(url);
  const blob = await resposta.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Exemplo de uso da função
const base64 = await converterImagemParaBase64('../assets/imgt.png');
console.log(base64);

// Para usar em JSON, você pode fazer o seguinte:
const json = {
  imagem: base64
};

// Convertendo o objeto JSON para string
const jsonString = JSON.stringify(json);

// Agora você tem a imagem em Base64 dentro de uma string JSON
console.log(jsonString);
