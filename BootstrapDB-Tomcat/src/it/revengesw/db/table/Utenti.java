package it.revengesw.db.table;

import java.util.ArrayList;
import java.util.Date;

import it.revengesw.db.SqlTableCacheContainer;
import it.revengesw.db.SqlTableHelper;


/**
 * The persistent class for the utenti database table.
 * 
 */
public class Utenti extends SqlTableHelper{
	private int idutente;

	private Date accessoattuale;

	private String cellulare;

	private String cognome;

	private int deleted;

	private String email;

	private int idaxwin;

	private int rubrica;

	private String iniziali;

	private String nome;

	private String password;

	private String telefono;

	private Date ultimoaccesso;

	private String username;
	
	private int idreparto;
	
	private int idsito;
	
	private int idstora_profili_orari;
	
	// property non in table starts with _
	private ArrayList<UtentiRuoli> _retRuoli;
	private int _isAdmin = -1;
	
	public Utenti() {
		super("utenti", "U", "idutente");
	}

	public int getIdutente() {
		return this.idutente;
	}

	public void setIdutente(int idutente) {
		this.idutente = idutente;
	}

	public Date getAccessoattuale() {
		return this.accessoattuale;
	}

	public void setAccessoattuale(Date accessoattuale) {
		this.accessoattuale = accessoattuale;
	}

	public String getCellulare() {
		return this.cellulare;
	}

	public void setCellulare(String cellulare) {
		this.cellulare = cellulare;
	}

	public String getCognome() {
		return this.cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public int getDeleted() {
		return this.deleted;
	}

	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getIdaxwin() {
		return this.idaxwin;
	}

	public void setIdaxwin(int idaxwin) {
		this.idaxwin = idaxwin;
	}

	public int getRubrica() {
		return this.rubrica;
	}

	public void setRubrica(int rubrica) {
		this.rubrica = rubrica;
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

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTelefono() {
		return this.telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Date getUltimoaccesso() {
		return this.ultimoaccesso;
	}

	public void setUltimoaccesso(Date ultimoaccesso) {
		this.ultimoaccesso = ultimoaccesso;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getIdreparto() {
		return idreparto;
	}

	public void setIdreparto(int idreparto) {
		this.idreparto = idreparto;
	}

	public int getIdsito() {
		return idsito;
	}

	public void setIdsito(int idsito) {
		this.idsito = idsito;
	}

	public int getIdstora_profili_orari() {
		return idstora_profili_orari;
	}

	public void setIdstora_profili_orari(int idstora_profili_orari) {
		this.idstora_profili_orari = idstora_profili_orari;
	}

	public Reparti getReparti() {
		return (Reparti)SqlTableCacheContainer.get().getRow(new Reparti(), this.idreparto);
	}

	public Siti getSiti() {
		return (Siti)SqlTableCacheContainer.get().getRow(new Siti(), this.idsito);
	}

	public ArrayList<UtentiRuoli> getRuoli() {
		if (_retRuoli == null) {
			UtentiRuoli ruoli = new UtentiRuoli();
			ruoli.setCriteria("idutente=" + this.idutente);
			_retRuoli = (ArrayList<UtentiRuoli>)ruoli.select();
		}
		return _retRuoli;
	}
	
	public boolean hasRuolo(String ruolo) {
		if (isAdmin())
			return true;
		
		ArrayList<UtentiRuoli> roles = getRuoli();
		
		for (UtentiRuoli role : roles) {
			if (ruolo.equals(role.getRuoli().getAcronimo()))
				return true;
		}
		
		return false;
	}
	
	public boolean isAdmin() {
		if (_isAdmin == -1) {
			_isAdmin = 0;
			ArrayList<UtentiRuoli> roles = getRuoli();
			
			for (UtentiRuoli role : roles) {
				if ("APP_ADMIN".equals(role.getRuoli().getAcronimo()))
					_isAdmin = 1;
			}
		}
		return _isAdmin == 1;
	}

}