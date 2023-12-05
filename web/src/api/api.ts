import axios from "axios";

export async function validaCartao(cartao: string) {
  let xmls = `<?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
  <S:Header/>
  <S:Body>
    <ns2:validaCartao xmlns:ns2="http://soap.superdia.com.br/">
        <numeroCartao>${cartao}</numeroCartao>
    </ns2:validaCartao>
  </S:Body>
  </S:Envelope>`;

  const response = await axios.post(
    "http://localhost:8080/SuperDia/ValidarCartaoEndpoint",
    xmls,
    {
      withCredentials: false,
    }
  );

  const data = response.data;
  const result = data.substring(data.indexOf('<return>') + 8, data.indexOf('</return>'))

  return result === 'true';
}
