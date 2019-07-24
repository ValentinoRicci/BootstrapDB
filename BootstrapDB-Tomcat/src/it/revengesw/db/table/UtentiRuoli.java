package it.revengesw.db.table;

import it.revengesw.db.SqlTableCacheContainer;
import it.revengesw.db.SqlTableHelper;

/**
 * The persistent class for the trasferte_rendicontazioni database table.
 * 
 */
public class UtentiRuoli  extends SqlTableHelper {
	private int id;

	private int idutente;
	
	private int idruolo;
	
	public UtentiRuoli() {
		super("utenti_ruoli", "UR", "id");
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getIdutente() {
		return idutente;
	}


	public void setIdutente(int idutente) {
		this.idutente = idutente;
	}


	public int getIdruolo() {
		return idruolo;
	}


	public void setIdruolo(int idruolo) {
		this.idruolo = idruolo;
	}

	public Utenti getUtenti() {
		return (Utenti)SqlTableCacheContainer.get().getRow(new Utenti(), this.idutente);
	}

	public Ruoli getRuoli() {
		return (Ruoli)SqlTableCacheContainer.get().getRow(new Ruoli(), this.idruolo);
	}

}