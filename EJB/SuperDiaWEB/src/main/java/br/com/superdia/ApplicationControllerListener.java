package br.com.superdia;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import br.com.superdia.modelo.Produto;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.Response;

@WebListener
public class ApplicationControllerListener implements ServletContextListener {

	@EJB
	private IDados<Produto> iDados;

	public void contextInitialized(ServletContextEvent sce) {
		saveProducts("https://www.redbullshopus.com/products.json");
		saveProducts("https://www.kyliecosmetics.com/products.json");
	}

	private void saveProducts(String link) {
		try {
			Client client = ClientBuilder.newClient();
			WebTarget target = client.target(link);
			Response response = target.request().get();
			String inputLine = response.readEntity(String.class);
			ObjectMapper mapper = new ObjectMapper();
			JsonNode nameNode;
			nameNode = mapper.readTree(inputLine);
			ArrayNode nodes = (ArrayNode) nameNode.get("products");

			for (JsonNode e : nodes) {
				Produto produto = new Produto();
				String nome = e.get("title").asText();
				String descricao = e.get("body_html").asText().replaceAll("<[^>]*>", "");
				;
				Double preco = e.get("variants").get(0).get("price").asDouble();
				produto.setDescricao(descricao.substring(0, descricao.length() > 50 ? 50 : descricao.length()));
				produto.setNome(nome);
				produto.setPreco(preco);
				produto.setQuantidadeEstoque(120);
				produto.setEstoqueMinimo(10);
				try {
					iDados.adiciona(produto);
				} catch (Exception e1) {
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void contextDestroyed(ServletContextEvent sce) {
	}
}
