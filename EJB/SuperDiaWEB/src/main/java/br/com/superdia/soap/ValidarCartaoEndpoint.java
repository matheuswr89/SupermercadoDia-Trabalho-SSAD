package br.com.superdia.soap;

import jakarta.ejb.Stateless;
import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;
import jakarta.jws.soap.SOAPBinding;

@Stateless
@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public class ValidarCartaoEndpoint {
	@WebMethod
    public Boolean validaCartao(@WebParam(name = "numeroCartao") String numeroCartao) {
		return validarCartaoCredito(numeroCartao);
    }
	
    public static boolean validarCartaoCredito(String numeroCartao) {
        // Remover espaços em branco e caracteres não numéricos
        numeroCartao = numeroCartao.replaceAll("\\s+", "");

        // Verificar se o número do cartão possui apenas dígitos
        if (!numeroCartao.matches("\\d+")) {
            return false;
        }

        // Aplicar o algoritmo de Luhn
        int soma = 0;
        boolean multiplicarPorDois = false;

        for (int i = numeroCartao.length() - 1; i >= 0; i--) {
            int digito = Character.getNumericValue(numeroCartao.charAt(i));

            if (multiplicarPorDois) {
                digito *= 2;

                if (digito > 9) {
                    digito = digito - 9;
                }
            }

            soma += digito;
            multiplicarPorDois = !multiplicarPorDois;
        }

        // O número do cartão é válido se a soma for um múltiplo de 10
        return soma % 10 == 0;
    }
}