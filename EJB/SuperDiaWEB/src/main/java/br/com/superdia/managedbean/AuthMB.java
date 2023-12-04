package br.com.superdia.managedbean;

import java.io.Serializable;

import br.com.superdia.modelo.Pessoa;
import br.com.superdia.modelo.Usuario;
import br.com.superdia.modelo.UsuarioRequest;
import br.com.superdia.modelo.UsuarioResponse;
import br.com.superdia.sessionbeans.IAuth;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/")
public class AuthMB implements Serializable {

	@EJB
	private IAuth auth;

	@EJB
	private IDados<Usuario> dados;
	private static final long serialVersionUID = 1L;

	@POST
	@Path("/entrar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public UsuarioResponse entrar(UsuarioRequest userRequest) {
		Usuario user = auth.entrar(userRequest.getLogin(), userRequest.getSenha());
		if (user.getId() != null) {
			return getUsuarioResponse(user);
		}
		return new UsuarioResponse();
	}

	@POST
	@Path("/criarConta")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public UsuarioResponse criarConta(UsuarioRequest userDto) {
		Usuario user = new Usuario();
		Pessoa pessoa = new Pessoa();
		user.setPerfil(userDto.getPerfil());
		user.setSenha(userDto.getSenha());
		pessoa.setCpf(userDto.getCpf());
		pessoa.setEmail(userDto.getLogin());
		pessoa.setDataNascimento(userDto.getDataNascimento());
		pessoa.setEndereco(userDto.getEndereco());
		pessoa.setNome(userDto.getNome());
		user.setPessoa(pessoa);
		try {
			dados.adiciona(user);
			return getUsuarioResponse(user);
		} catch (Exception e) {			
			return new UsuarioResponse();
		}
	}

	private UsuarioResponse getUsuarioResponse(Usuario user) {
		UsuarioResponse response = new UsuarioResponse();
		response.setCpf(user.getPessoa().getCpf());
		response.setLogin(user.getPessoa().getEmail());
		response.setPerfil(user.getPerfil());
		return response;
	}

}
