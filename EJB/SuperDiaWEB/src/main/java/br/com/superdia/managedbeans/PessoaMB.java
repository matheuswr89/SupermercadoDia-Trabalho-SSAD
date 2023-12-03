package br.com.superdia.managedbeans;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import br.com.superdia.modelo.Pessoa;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

@Named(value = "pessoaMB")
@SessionScoped
public class PessoaMB implements Serializable {
	private Pessoa pessoa = new Pessoa();
	private String dataString;
	
	@EJB
	private IDados<Pessoa> iDados;

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}
	
	public String getDataString() {
		return dataString;
	}

	public void setDataString(String dataString) {
		this.dataString = dataString;
	}

	public void grava() {
		System.out.println(pessoa.getId());
		if (pessoa.getId() == null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		    LocalDate data = LocalDate.parse(dataString, formatter);
		    
		    pessoa.setDataNascimento(data);
		    
			iDados.adiciona(pessoa);
		}
		else
			iDados.altera(pessoa);
		
		this.pessoa = new Pessoa();
	}
	
}
