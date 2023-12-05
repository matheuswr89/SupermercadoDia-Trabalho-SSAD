package br.com.superdia;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import br.com.superdia.modelo.Produto;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class ApplicationControllerListener implements ServletContextListener {

	@EJB
	private IDados<Produto> iDados;

	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("Passei contextInitialized");
		saveProducts("https://www.redbullshopus.com/products.json");
		saveProducts("https://www.kyliecosmetics.com/products.json");
	}
	
	private void saveProducts(String link) {
		try {
			URL url = new URL(link);
			URLConnection yc = url.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
			String inputLine = in.readLine();
			ObjectMapper mapper = new ObjectMapper();
			JsonNode nameNode = mapper.readTree(inputLine);
			ArrayNode nodes = (ArrayNode) nameNode.get("products");

			for (JsonNode e : nodes) {
				Produto produto = new Produto();
				String nome = e.get("title").asText();
				String descricao = e.get("body_html").asText().replaceAll("<[^>]*>", "");
				;
				Double preco = e.get("variants").get(0).get("price").asDouble();
				produto.setDescricao(descricao.substring(0, descricao.length() > 100 ? 100 : descricao.length()));
				produto.setNome(nome);
				produto.setPreco(preco);
				produto.setQuantidadeEstoque(120);
				produto.setEstoqueMinimo(10);
				try {
					iDados.adiciona(produto);
				} catch (Exception e1) {
				}
			}
			in.close();
		} catch (Exception e) {
		}
	}

	public void contextDestroyed(ServletContextEvent sce) {
		System.err.println("Passei");
	}
}
