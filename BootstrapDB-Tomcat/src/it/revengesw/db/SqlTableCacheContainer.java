package it.revengesw.db;

/**
 *
 * @author Ricci Valentino
 */
import java.lang.reflect.Field;
import java.util.HashMap;

public class SqlTableCacheContainer {
	static private SqlTableCacheContainer instance;
	HashMap<String, HashMap<Integer, SqlTableHelper>> tables;
	
	public SqlTableCacheContainer() {
		tables = new HashMap<>();
	}
	
	static public synchronized SqlTableCacheContainer get() {
		if (instance == null) {
			instance = new SqlTableCacheContainer();
		}
		return instance;
	}
	
	public void putRow(SqlTableHelper table) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper == null) {
			tableHelper = new HashMap<Integer, SqlTableHelper>();
			tables.put(table.getTableName(), tableHelper);
		}
		
		tableHelper.put((Integer)table.getPrimaryKeyValue(), table);
	}
	
	public void removeRow(SqlTableHelper table) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper == null) {
			tableHelper = new HashMap<Integer, SqlTableHelper>();
			tables.put(table.getTableName(), tableHelper);
		}
		
		tableHelper.remove((Integer)table.getPrimaryKeyValue());
	}
	
	public SqlTableHelper getRow(SqlTableHelper table, int pkkey) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper == null) {
			table.select();
			tableHelper = tables.get(table.getTableName());
		}
		
		if (tableHelper == null || tableHelper.isEmpty())
			return null;
		
		return tableHelper.get((Integer)pkkey);
	}

	public SqlTableHelper searchRow(SqlTableHelper table, String fieldName, Object key) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper == null) {
			table.select();
			tableHelper = tables.get(table.getTableName());
		}
		
		if (tableHelper == null || tableHelper.isEmpty())
			return null;
		
		Field[] fields = null;
		Field searchField = null;
		String keyString = key.toString();
		
		for (SqlTableHelper row : tableHelper.values()) {
			if (fields == null) {
				fields = row.getClass().getDeclaredFields();
				for (Field field : fields) {
					if (field.getName().equals(fieldName)) {
						searchField = field;
						searchField.setAccessible(true);
						break;
					}
				}
			}
			
			if (searchField == null)
				return null;
			
			try {
				if (searchField.get(row).toString().equals(keyString))
					return row;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}	
		return null;
	}

	public <T> T[] getRows(SqlTableHelper table, T[] a) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper == null) {
			table.select();
			tableHelper = tables.get(table.getTableName());
		}
		
		if (tableHelper == null || tableHelper.isEmpty())
			return null;
		
		return tableHelper.values().toArray(a);
	}

	public void clearCache(SqlTableHelper table) {
		HashMap<Integer, SqlTableHelper> tableHelper = tables.get(table.getTableName());
		
		if (tableHelper != null) {
			tableHelper.clear();
		}
	}
	
	public static void clearCache(String table) {
		HashMap<Integer, SqlTableHelper> tableHelper = get().tables.get(table.toLowerCase());
		
		if (tableHelper != null) {
			tableHelper.clear();
		}
	}
}
