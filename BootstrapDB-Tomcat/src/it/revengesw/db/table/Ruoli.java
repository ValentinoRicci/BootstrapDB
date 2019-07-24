package it.revengesw.db.table;

import it.revengesw.db.SqlTableHelper;

/**
 * The persistent class for the reparti database table.
 * 
 */
public class Ruoli extends SqlTableHelper{
	private int id;
	
	private String descrizione;

	private String acronimo;

	public Ruoli() {
		super("ruoli", "RU", "id");
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public String getAcronimo() {
		return acronimo;
	}

	public void setAcronimo(String acronimo) {
		this.acronimo = acronimo;
	}


}