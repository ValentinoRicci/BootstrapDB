package it.revengesw.db.table;

import it.revengesw.db.SqlTableHelper;

/**
 * The persistent class for the siti database table.
 * 
 */
public class Siti extends SqlTableHelper{
	private int idsito;

	private int deleted;

	private String iniziali;

	private String nome;

	public Siti() {
		super("siti", "S", "idsito");
	}

	public int getIdsito() {
		return this.idsito;
	}

	public void setIdsito(int idsito) {
		this.idsito = idsito;
	}

	public int getDeleted() {
		return this.deleted;
	}

	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}

	public String getIniziali() {
		return this.iniziali;
	}

	public void setIniziali(String iniziali) {
		this.iniziali = iniziali;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}