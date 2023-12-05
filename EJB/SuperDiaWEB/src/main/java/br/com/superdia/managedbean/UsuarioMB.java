package br.com.superdia.managedbean;

import java.io.Serializable;
import java.util.List;

import br.com.superdia.modelo.Usuario;
import br.com.superdia.modelo.UsuarioRequest;
import br.com.superdia.sessionbeans.IAuth;
import br.com.superdia.sessionbeans.IDados;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/")
public class UsuarioMB implements Serializable {

	@EJB
	private IAuth auth;

	@EJB
	private IDados<Usuario> dados;
	private static final long serialVersionUID = 1L;

	@POST
	@Path("/entrar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Usuario entrar(UsuarioRequest userRequest) {
		Usuario user = auth.entrar(userRequest.getLogin(), userRequest.getSenha());
		if (user.getId() != null) {
			return user;
		}
		return new Usuario();
	}

	@POST
	@Path("/criarConta")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Usuario criarConta(Usuario userDto) {
		try {
			if (userDto.getId() == null) {
				dados.adiciona(userDto);
			}else {
				dados.altera(userDto);
			}
			return userDto;
		} catch (Exception e) {
			return new Usuario();
		}
	}
	
	@POST
	@Path("/remover")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Usuario remover(Usuario usuarioRequest) {
		try {
			dados.remove(usuarioRequest);
			return usuarioRequest;
		} catch (Exception e) {
			return new Usuario();
		}
	}

	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Usuario> listar() {
		return dados.listaTodos(Usuario.class);
	}
}
