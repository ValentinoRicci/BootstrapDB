package it.revengesw.db;

/**
*
* @author Ricci Valentino
*/
import java.util.HashMap;

public class Result {
	String type;
	HashMap<String, String> attributes = new HashMap<>();
	
	public Result(String type){
		this.type = type;
	}
	
	public void addAttribute(String key, String val) {
		attributes.put(key,  val);
	}

	public String getType() {
		return type;
	}

	public HashMap<String, String> getAttributes() {
		return attributes;
	}
	
}
