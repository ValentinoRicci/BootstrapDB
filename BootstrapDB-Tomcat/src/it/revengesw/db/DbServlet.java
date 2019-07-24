package it.revengesw.db;
/**
*
* @author Ricci Valentino
*/

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.revengesw.session.HttpSessionHelper;

@WebServlet("/db/servlet")
public class DbServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("HelperServlet/servlet");

		String function = HttpSessionHelper.getRequestParameter(request, "function");

		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		
		System.out.println(function);
		try {
			 // with multiple parameters
	        Class<?>[] paramTypes = {HttpServletRequest.class, HttpServletResponse.class};
	        java.lang.reflect.Method method = getClass().getMethod(function, paramTypes);
	        if (method != null) {
	    		response.setStatus(HttpServletResponse.SC_OK);
				response.setContentType("application/json");
	        	method.invoke(this, request, response);
	        	return;
	        }
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			e.printStackTrace();
		}
		
		return;
	}

	public void select(HttpServletRequest request, HttpServletResponse response) {
		String primaryKey = HttpSessionHelper.getRequestParameter(request, "primaryKey");
		String fields = HttpSessionHelper.getRequestParameter(request, "fields");
		String from = HttpSessionHelper.getRequestParameter(request, "from");
		String where = HttpSessionHelper.getRequestParameter(request, "where");
		String orderBy = HttpSessionHelper.getRequestParameter(request, "orderBy");
				
		String SQL = String.format("SELECT %s FROM %s", fields, from);
		
		if (where != null && !where.isEmpty())
			SQL += " WHERE " + where;
		
		if (orderBy != null && !orderBy.isEmpty())
			SQL += " ORDER BY " + orderBy;
		
		ArrayList<Result> ret = new ArrayList<>();
		
		try {
			Connection db = GlobalData.getInstance().getDatabase();
			if (db == null)
				throw new SQLException("DB not connected");
				
			Statement stmt = db.createStatement();

			ResultSet rs = stmt.executeQuery(SQL);

			int columnSize = rs.getMetaData().getColumnCount();
			
			while(rs.next()) {
				Result result = new Result(from);
				
				if (primaryKey != null && !primaryKey.isEmpty())
					result.addAttribute(primaryKey, rs.getString(primaryKey));
				
				for (int iNdx = 1 ; iNdx <= columnSize; iNdx++) {
					result.addAttribute(rs.getMetaData().getColumnLabel(iNdx), rs.getString(iNdx));
				}
				ret.add(result);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
			HttpSessionHelper.answerJsonResult(response, false, e.getMessage());
			return;
		}
		
		HttpSessionHelper.answerJsonObject(response, ret);
	}

	public void insert(HttpServletRequest request, HttpServletResponse response) {
		try {
			Connection db = GlobalData.getInstance().getDatabase();

			String into = HttpSessionHelper.getRequestParameter(request, "into");
			System.out.println(into);
			String values = HttpSessionHelper.getRequestParameter(request, "values");
			System.out.println(values);
			
			String sql = "INSERT INTO " + into;
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(values);
			
			Iterator<Entry<String, JsonNode>> itr = node.fields();
			
			String fields = "";
			String params = "";
			
			while(itr.hasNext()) {
				Entry<String, JsonNode> element = itr.next();
         		if (!fields.isEmpty()) {
         			fields += ", ";
        			params += ", ";
         		}
         		
         		fields += element.getKey();
    			params += "?";
			}
			
			sql += " (" + fields + ") VALUES (" + params + ")";
			System.out.println(sql);
			PreparedStatement stmt = db.prepareStatement(sql);
			
			int iCol = 1;
			itr = node.fields();
			while(itr.hasNext()) {
				Entry<String, JsonNode> element = itr.next();
				String value = element.getValue().textValue();
				if (value.equals("#@NULL_DATE!@#"))
					stmt.setNull(iCol, Types.DATE);
				else
					stmt.setString(iCol, value);
				System.out.println(iCol + ": " + element.getValue().textValue());
				iCol++;
			}
			int ret = stmt.executeUpdate();

			int insertedId = -1;
			if (ret != 0) {
			    ResultSet rs = stmt.executeQuery("SELECT LAST_INSERT_ID()");

			    if (rs.next()) {
			    	insertedId = rs.getInt(1);
			    } else {
			        // throw an exception from here
			    }
				HttpSessionHelper.answerJsonResult(response, true, String.valueOf(insertedId));
				SqlTableCacheContainer.clearCache(into);
				return;
			}
			
			HttpSessionHelper.answerJsonResult(response, false, "stmt.executeUpdate() == 0");
		} catch (Exception e) {
			e.printStackTrace();
			HttpSessionHelper.answerJsonResult(response, false, e.getMessage());
			return;	// Utente non trovato
		}
	}

	public void update(HttpServletRequest request, HttpServletResponse response) {
		try {
			Connection db = GlobalData.getInstance().getDatabase();

			String from = HttpSessionHelper.getRequestParameter(request, "from");
			String where = HttpSessionHelper.getRequestParameter(request, "where");
			String values = HttpSessionHelper.getRequestParameter(request, "values");
			
			String sql = "UPDATE " + from + " SET ";
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(values);
			
			Iterator<Entry<String, JsonNode>> itr = node.fields();
			
			String set = "";
			while(itr.hasNext()) {
				Entry<String, JsonNode> element = itr.next();
         		if (!set.isEmpty())
         			set += ", ";
         		
         		set += element.getKey() + "=?";
			}
			
			
			sql += set;
			
			if (!where.isEmpty())
				sql += " where " + where;
			
			System.out.println(sql);
			PreparedStatement stmt = db.prepareStatement(sql);
			
			int iCol = 1;
			itr = node.fields();
			while(itr.hasNext()) {
				Entry<String, JsonNode> element = itr.next();
				String value = element.getValue().textValue();
				if (value.equals("#@NULL_DATE!@#"))
					stmt.setNull(iCol++, Types.DATE);
				else
					stmt.setString(iCol++, value);
				System.out.println(element.getValue().textValue());
			}
			int ret = stmt.executeUpdate();
			System.out.println(ret);
			SqlTableCacheContainer.clearCache(from);
		} catch (Exception e) {
			e.printStackTrace();
			HttpSessionHelper.answerJsonResult(response, false, e.getMessage());
			return;	// Utente non trovato
		}
		
		HttpSessionHelper.answerJsonResult(response, true, "");
	}

	public void delete(HttpServletRequest request, HttpServletResponse response) {

		try {
			String from = HttpSessionHelper.getRequestParameter(request, "from");
			String where = HttpSessionHelper.getRequestParameter(request, "where");
			String sql = "DELETE FROM " + from + " WHERE " + where;
			Connection db = GlobalData.getInstance().getDatabase();
			Statement stmt = db.createStatement();
			System.out.println(sql);
			int ret = stmt.executeUpdate(sql);
			System.out.println(ret);
			SqlTableCacheContainer.clearCache(from);
		} catch (Exception e) {
			e.printStackTrace();
			HttpSessionHelper.answerJsonResult(response, false, e.getMessage());
			return;	// Utente non trovato
		}
		
		HttpSessionHelper.answerJsonResult(response, true, "");
	}

}
