package br.com.superdia.sessionbeans;

import br.com.superdia.modelo.Usuario;
import jakarta.ejb.Remote;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.FormParam;

@Stateless
@Remote
public class AuthSB implements IAuth {

	@PersistenceContext(unitName = "SuperDia")
	EntityManager em;
	private final String FIND_USER = "select e from Usuario e where e.pessoa.email = :login and e.senha = :senha";

	public Usuario entrar(@FormParam("user") String login, @FormParam("senha") String senha) {
		try {
			Usuario user = em.createQuery(FIND_USER, Usuario.class).setParameter("login", login)
					.setParameter("senha", senha).getSingleResult();
			return user;
		} catch (Exception e) {
			return new Usuario();
		}
	}

}
