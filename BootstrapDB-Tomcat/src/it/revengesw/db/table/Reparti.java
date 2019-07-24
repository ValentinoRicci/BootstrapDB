package it.revengesw.db.table;

import it.revengesw.db.SqlTableCacheContainer;
import it.revengesw.db.SqlTableHelper;

/**
 * The persistent class for the reparti database table.
 * 
 */
public class Reparti extends SqlTableHelper{
	private int idreparto;
	
	private int idresponsabile;
	
	private int idazienda;

	private String nome;

	private String sigla;

	private int cdc;
	
	public Reparti() {
		super("reparti", "R", "idreparto");
	}

	public int getIdreparto() {
		return this.idreparto;
	}

	public void setIdreparto(int idreparto) {
		this.idreparto = idreparto;
	}

	public int getIdresponsabile() {
		return idresponsabile;
	}

	public void setIdresponsabile(int idresponsabile) {
		this.idresponsabile = idresponsabile;
	}

	public int getIdazienda() {
		return idazienda;
	}

	public void setIdazienda(int idazienda) {
		this.idazienda = idazienda;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return this.sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public Utenti getUtenti() {
		return (Utenti)SqlTableCacheContainer.get().getRow(new Utenti(), this.idresponsabile);
	}

	public int getCdc() {
		return cdc;
	}

	public void setCdc(int cdc) {
		this.cdc = cdc;
	}

}