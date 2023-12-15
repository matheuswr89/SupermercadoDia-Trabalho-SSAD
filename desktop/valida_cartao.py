import requests

def valida_cartao_credito(numero_cartao):
  xmls = f"""<?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
  <S:Header/>
  <S:Body>
    <ns2:validaCartao xmlns:ns2="http://soap.superdia.com.br/">
        <numeroCartao>{numero_cartao}</numeroCartao>
    </ns2:validaCartao>
  </S:Body>
  </S:Envelope>"""
  r = requests.post('http://localhost:8080/SuperDia/ValidarCartaoEndpoint', data=xmls)
  valid = r.text[r.text.index('<return>') + 8:r.text.index('</return>')].capitalize()
  return valid

def main():
    # Substitua os valores abaixo pelos detalhes do seu cartão
    numero_cartao = '5342725883567412'

    resultado = valida_cartao_credito(numero_cartao)

    if resultado == 'True':
        print("Cartão de crédito válido.")
    else:
        print("Cartão de crédito inválido.")

if __name__ == "__main__":
    main()

