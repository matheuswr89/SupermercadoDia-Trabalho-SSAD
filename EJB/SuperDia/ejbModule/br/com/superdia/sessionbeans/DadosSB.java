package br.com.superdia.sessionbeans;

import java.util.List;

import jakarta.ejb.Remote;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.ws.rs.Path;

@Stateless
@Remote
@Path("/inserir")
public class DadosSB<T> implements IDados<T> {	
	@PersistenceContext(unitName = "SuperDia")
	EntityManager em;
	
	@Override
	public void adiciona(T dado) {
		em.persist(dado);
	}

	@Override
	public void altera(T dado) {
		em.merge(dado);
	}

	@Override
	public void remove(T dado) {
		em.remove(em.merge(dado));
	}

	@Override
	public List<T> listaTodos(Class<T> classe) {
		CriteriaQuery<T> query = em.getCriteriaBuilder().createQuery(classe);
		
		query.select(query.from(classe));
		List<T> lista = em.createQuery(query).getResultList();
		return lista;
	}
}
