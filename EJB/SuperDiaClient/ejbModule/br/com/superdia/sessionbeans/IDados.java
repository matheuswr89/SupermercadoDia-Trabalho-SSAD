package br.com.superdia.sessionbeans;

import java.util.List;

public interface IDados<T> {
	public void adiciona(T dado);
	public void altera(T dado);
	public void remove(T dado);
	public List<T> listaTodos(Class<T> classe);
}
