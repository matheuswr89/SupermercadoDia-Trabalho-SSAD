package br.com.superdia.managedbean;

import java.io.Serializable;
import java.util.List;

import br.com.superdia.modelo.Produto;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/produtos")
public class ProdutoMB implements Serializable {
	
	@EJB
	private IDados<Produto> dados;
	private static final long serialVersionUID = 1L;
	
	@POST
	@Path("/cadastrar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Produto cadastrar(Produto produtoRequest) {
		try {
			if(produtoRequest.getId()==null)dados.adiciona(produtoRequest);
			else dados.altera(produtoRequest);
			return produtoRequest;
		} catch (Exception e) {
			return new Produto();
		}
	}
	
	@POST
	@Path("/remover")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Produto remover(Produto produtoRequest) {
		try {
			dados.remove(produtoRequest);
			return produtoRequest;
		} catch (Exception e) {
			return new Produto();
		}
	}
	
	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Produto> listar() {
		return dados.listaTodos(Produto.class); 
	}
}
