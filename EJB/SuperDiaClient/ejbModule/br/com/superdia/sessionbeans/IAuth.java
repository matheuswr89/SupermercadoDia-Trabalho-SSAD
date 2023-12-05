package br.com.superdia.sessionbeans;

import br.com.superdia.modelo.Usuario;

public interface IAuth {
	public Usuario entrar(String usuario, String senha);
}
