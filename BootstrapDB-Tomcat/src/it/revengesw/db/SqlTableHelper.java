package it.revengesw.db;

/**
 *
 * @author Ricci Valentino
 */

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class SqlTableHelper {
	
	private Connection db;
	private String tableName;
	private String alias;
	private String pkKey;
	private String join;
	private String where;
	private String orderby;

	public SqlTableHelper(String tableName, String alias, String pkKey) {
		this.db = GlobalData.getInstance().getDatabase();
		this.tableName = tableName;
		this.alias = alias;
		this.pkKey = pkKey;
		this.join = "";
		this.where = "";
		this.orderby = "";
	}
	
	public String getTableName() {
		return tableName;
	}

	public String getPkKey() {
		return pkKey;
	}

	public void addJoinCriteria(String joinTable, String aliasJoinTable, String fieldJoinName) {
		join += String.format("LEFT JOIN %s AS %s ON %s.%s = %s.%s ", joinTable, aliasJoinTable, aliasJoinTable, fieldJoinName, alias, pkKey);
	}
	

	public void addJoinCriteria(String joinTable, String aliasJoinTable, String fieldJoinName, String fieldName) {
		join += String.format("LEFT JOIN %s AS %s ON %s.%s = %s.%s ", joinTable, aliasJoinTable, aliasJoinTable, fieldJoinName, alias, fieldName);
	}
	
	public void addJoinCriteria(SqlTableHelper joinTable, String fieldJoinName) {
		join += String.format("LEFT JOIN %s AS %s ON %s.%s = %s.%s ", joinTable.tableName, joinTable.alias, joinTable.alias, fieldJoinName, alias, pkKey);
		
		String joinWhere = String.format("%s.%s='%s'", joinTable.alias, joinTable.pkKey, joinTable.getPrimaryKeyValue().toString());
		
		if (!where.isEmpty()) {
			where = String.format("(%s) AND %s", where, joinWhere);
		} else {
			where = joinWhere;
		}
	}
	
	public void setCriteria(String criteria) {
		where += criteria;
	}
	
	public void setOrderBy(String orderBy) {
		orderby += orderBy;
	}
	
	public ArrayList<? extends SqlTableHelper> select() {
		ArrayList<SqlTableHelper> ret = new ArrayList<>();
		String SQL = "SELECT " + alias + ".* FROM " + tableName + " AS " + alias;
		
		if (!join.isEmpty()) {
			SQL += " " + join;
		}
		
		if (!where.isEmpty()) {
			SQL += " WHERE " + where;
		}
		
		if (!orderby.isEmpty()) {
			SQL += " ORDER BY " + orderby;
		}

		if (join.isEmpty() && where.isEmpty()) {
			SqlTableCacheContainer.get().clearCache(this);
		}
		
		try {
			if (db == null)
				throw new SQLException("DB not connected");
				
			Statement stmt = db.createStatement();

			ResultSet rs = stmt.executeQuery(SQL);
			
			ResultSetMetaData metadata = rs.getMetaData();
			int columnSize = rs.getMetaData().getColumnCount();
			
			while(rs.next()) {
				SqlTableHelper obj = (SqlTableHelper)this.getClass().getConstructor().newInstance();
				ret.add(obj);
				
				for (int iCol = 1; iCol <= columnSize; iCol++) {
					int colType = metadata.getColumnType(iCol);
					String colName = metadata.getColumnName(iCol);
					switch(colType) {
//					case java.sql.Types.INTEGER:
//						obj.setValue(colName, rs.getInt(iCol));
//						break;
//					case java.sql.Types.VARCHAR:
//						obj.setValue(colName, rs.getString(iCol));
//						break;
//					case java.sql.Types.DATE:
//						obj.setValue(colName, rs.getDate(iCol));
//						break;
//					case java.sql.Types.DOUBLE:
//						obj.setValue(colName, rs.getDouble(iCol));
//						break;
					default:
//						System.out.println(tableName + "." + colName + " unhandled type " + colType);
						obj.setValue(colName, rs.getObject(iCol));
						break;
					}
				}
				SqlTableCacheContainer.get().putRow(obj);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return ret;
	}

	public SqlTableHelper selectFirstRow() {
		ArrayList<? extends SqlTableHelper> result = select();
		
		if (result == null || result.isEmpty())
			return null;
		
		return result.get(0);
	}
	
	public boolean insert() {
		Field[] fields = getClass().getDeclaredFields();
		
		String columns = "";
		String questions = "";
		Field pkField = null;
		
		for(Field field : fields) {
			if (field.getName().startsWith("_"))
				continue;

			if (!field.getName().equals(this.pkKey)) {
				if (!columns.isEmpty()) {
					columns += ",";
					questions += ",";
				}
				columns += field.getName();
				questions += "?";
			} else {
				pkField = field;
			}
		}
		
		String SQL = String.format("INSERT INTO %s (%s) VALUES (%s) ", this.tableName, columns, questions);
		try {
			PreparedStatement stmt = db.prepareStatement(SQL);

			for(int iNdx = 0, iCol = 1; iNdx < fields.length; iNdx++) {
				Field field = fields[iNdx];
				
				if (field.getName().startsWith("_"))
					continue;

				field.setAccessible(true);
				if (!field.getName().equals(this.pkKey)) {
					Object obj = field.get(this);
					stmt.setObject(iCol++, obj);
				}
			}
			int ret = stmt.executeUpdate();
			SqlTableCacheContainer.get().putRow(this);
			System.out.println(ret);

			int insertedId = -1;
			if (ret != 0) {
			    ResultSet rs = stmt.executeQuery("SELECT LAST_INSERT_ID()");

			    if (rs.next()) {
			    	insertedId = rs.getInt(1);
			    	pkField.set(this, insertedId);
			    } else {
			        // throw an exception from here
			    }
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
	
	public boolean update() {
		Field[] fields = getClass().getDeclaredFields();
		
		String columns = "";
		
		for(Field field : fields) {
			if (field.getName().startsWith("_"))
				continue;
			
			if (!columns.isEmpty()) {
				columns += ",";
			}
			columns += field.getName() + "=?";
		}
		
		Object pkValue = null;
		String SQL = String.format("UPDATE %s SET %s WHERE %s=?", this.tableName, columns, this.pkKey);
		try {
			PreparedStatement stmt = db.prepareStatement(SQL);

			int iNdx;
			int iCol;
			for(iNdx = 0, iCol = 1; iNdx < fields.length; iNdx++) {
				Field field = fields[iNdx];
				
				if (field.getName().startsWith("_"))
					continue;

				field.setAccessible(true);
				Object obj = field.get(this);
				stmt.setObject(iCol++, obj);
				
				if (field.getName() == this.pkKey) {
					pkValue = obj;
				}
			}
			
			stmt.setObject(iCol++, pkValue);
			int ret = stmt.executeUpdate();
			SqlTableCacheContainer.get().putRow(this);
			System.out.println(ret);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		
		return true;
	}
	
	public boolean delete() {
		Field[] fields = getClass().getDeclaredFields();
		
		Field pkField = null;
		
		for(Field field : fields) {
			if (field.getName().equals(this.pkKey)) {
				pkField = field;
			}
		}
		
		String SQL = String.format("DELETE FROM %s WHERE %s=?", this.tableName, pkKey);
		try {
			PreparedStatement stmt = db.prepareStatement(SQL);
			
			pkField.setAccessible(true);
			Object obj = pkField.get(this);
			stmt.setObject(1, obj);

			int ret = stmt.executeUpdate();
			SqlTableCacheContainer.get().removeRow(this);
			System.out.println(ret);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
	
	private void setValue(String colName, Object value) {
		try {
			Class<? extends SqlTableHelper> clazz = getClass();
			Field f1 = clazz.getDeclaredField(colName.toLowerCase());
			f1.setAccessible(true);
			f1.set(this, value);
		} catch (Exception e) {
			System.out.println("setValue " + colName + " in table " + this.tableName + " not found");
		}
	}
	
	public Object getPrimaryKeyValue() {
		try {
			Class<? extends SqlTableHelper> clazz = getClass();
			Field f1 = clazz.getDeclaredField(pkKey);
			f1.setAccessible(true);
			return f1.get(this);
		} catch (Exception e) {
			System.out.println("getPrimaryKeyValue " + pkKey + " in table + " + this.tableName + " not found");
		}
		return null;
	}
}
