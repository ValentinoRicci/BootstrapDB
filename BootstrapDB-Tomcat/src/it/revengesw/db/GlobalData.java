/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package it.revengesw.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Ricci Valentino
 */

public class GlobalData {
    private static GlobalData gdInstance;
	private Connection DBconnection;
	private String server_addr;
	private String db_name;
	private String username;
	private String password;
    

    public GlobalData() {

    }

    public static GlobalData getInstance() {
        try {
            if (gdInstance == null) {
                gdInstance = new GlobalData();
                gdInstance.init();
            }
            return gdInstance;
        } catch (Exception ex) {
        	ex.printStackTrace();
        }

        return null;
    }
    
    public void init() {
    	server_addr = "localhost";
    	db_name = "sample";
    	username = "root";
    	password = "";
    }
    
    public boolean initDb() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			DBconnection = DriverManager.getConnection("jdbc:mysql://" + this.server_addr + ":3306/" + this.db_name + "?autoReconnect=true", this.username, this.password);
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
    }

	public String getServer_addr() {
		return server_addr;
	}

	public void setServer_addr(String server_addr) {
		this.server_addr = server_addr;
	}

	public String getDb_name() {
		return db_name;
	}

	public void setDb_name(String db_name) {
		this.db_name = db_name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Connection getDatabase() {
		if (DBconnection == null) {
			initDb();
		}
		
		return DBconnection;
	}
    
    
}
