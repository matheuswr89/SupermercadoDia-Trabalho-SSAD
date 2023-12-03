package br.com.superdia.managedbeans;

import java.io.Serializable;
import java.util.List;

import br.com.superdia.modelo.Produto;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

@Named(value = "produtoMB")
@SessionScoped
public class ProdutoMB implements Serializable {
	private Produto produto = new Produto();
	
	@EJB
	private IDados<Produto> iDados;

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public void grava() {
		System.out.println(produto.getId());
		if (produto.getId() == null)
			iDados.adiciona(produto);
		else
			iDados.altera(produto);
		
		this.produto = new Produto();
	}
	
	public List<Produto> getProdutos() {
		return iDados.listaTodos(Produto.class);
	}
}
