package it.revengesw.session;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class HttpSessionHelper {

	public static String getRequestParameter(HttpServletRequest request, String key) {
    	try {
    		String result = (String)request.getParameter(key); 
    		if (result != null)
    			return result;
    	} catch (Exception e) {
    	}
    	return "";
    }
    
	public static String toJson(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		mapper.configure(MapperFeature.USE_ANNOTATIONS, false);
		mapper.configure(MapperFeature.AUTO_DETECT_FIELDS, false);
		mapper.configure(MapperFeature.AUTO_DETECT_GETTERS, true);
		mapper.configure(MapperFeature.AUTO_DETECT_IS_GETTERS, true);

		try {
			String ret = mapper.writeValueAsString(obj);
			return ret;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return e.getMessage();
		}

	}

	public static void answerJsonObject(HttpServletResponse response, Object obj) {
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			response.setCharacterEncoding("ISO-8859-1");
			response.setContentType("application/json");
			StringWriter stringWriter = new StringWriter();
			PrintWriter jsonWriter = new PrintWriter(stringWriter);
			jsonWriter.print(toJson(obj));
			response.getWriter().write(stringWriter.toString());
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void answerJsonString(HttpServletResponse response, String answer) {
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			response.setCharacterEncoding("ISO-8859-1");
			response.setContentType("application/json");
			StringWriter stringWriter = new StringWriter();
			PrintWriter jsonWriter = new PrintWriter(stringWriter);
			jsonWriter.print(answer);
			response.getWriter().write(stringWriter.toString());
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void answerJsonResult(HttpServletResponse response, Boolean answer, String message) {
		String answerStr = "{\"Result\":" + answer + ", \"Message\":\"" + message + "\"}";
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			response.setCharacterEncoding("ISO-8859-1");
			response.setContentType("application/json");
			StringWriter stringWriter = new StringWriter();
			PrintWriter jsonWriter = new PrintWriter(stringWriter);
			jsonWriter.print(answerStr);
			response.getWriter().write(stringWriter.toString());
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String callREST(String rest) {
    	String ret = "";    	
    	try {
    		URL url = new URL(rest);
    		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    		conn.setRequestMethod("GET");
    		conn.setRequestProperty("Accept", "application/json");

    		if (conn.getResponseCode() != 200) {
    			return "";
    		}

    		BufferedReader br = new BufferedReader(new InputStreamReader(
    			(conn.getInputStream())));

    		String output;

    		while ((output = br.readLine()) != null) {
    			ret += output;
    		}

    		conn.disconnect();

    	} catch (MalformedURLException e) {

    		e.printStackTrace();

    	} catch (IOException e) {

    		e.printStackTrace();

		} catch (Exception e) {

			e.printStackTrace();

		}

    	return ret;
    }

	
}
