package br.com.superdia.managedbean;

import java.io.Serializable;
import java.util.List;

import br.com.superdia.modelo.Compra;
import br.com.superdia.modelo.Produto;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/compras")
public class CompraMB implements Serializable {
	@EJB
	private IDados<Compra> dados;
	@EJB
	private IDados<Produto> produtoDado;
	private static final long serialVersionUID = 1L;

	@POST
	@Path("/cadastrar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Compra cadastrar(Compra produtoRequest) {
		try {
			for (Produto p : produtoRequest.getProdutos()) {
				if (p.getQuantity() < p.getQuantidadeEstoque()) {
					p.setQuantidadeEstoque(p.getQuantidadeEstoque() - p.getQuantity());
					produtoDado.altera(p);
				} else
					return new Compra();
			}
			dados.adiciona(produtoRequest);
			return produtoRequest;
		} catch (Exception e) {
			return new Compra();
		}
	}

	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Compra> listar() {
		return dados.listaTodos(Compra.class);
	}
}
