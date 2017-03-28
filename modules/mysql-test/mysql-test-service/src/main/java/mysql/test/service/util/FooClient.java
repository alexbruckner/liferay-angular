package mysql.test.service.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import com.liferay.portal.kernel.util.Base64;

//http://localhost:8080/api/jsonws/invoke?cmd={%22/mysqltest.book/list-books%22:{}}&p_auth=lf4dCvIX
//http://localhost:8080/api/jsonws/invoke?cmd={%22/foo.foo/list-foos%22:{}}&p_auth=lf4dCvIX
//no cookie access: curl http://localhost:8080/api/jsonws/foo.foo/list-foos -u test@liferay.com:liferay
public class FooClient {
	
	public static String API_ENDPOINT = "/foo.foo";
	public static String LIST_FOOS = "/list-foos";
	
	public static enum Protocol {
		HTTP("http://"), HTTPS("https://");
		private String protocol;
		Protocol(String protocol){
			this.protocol = protocol;
		}
		public String toString() {
			return protocol;
		}
	}
	
	private final Protocol protocol;
	private final String host;
	private final int port;
	private final String username;
	private final String password;
	
	public FooClient(Protocol protocol, String host, int port, String username, String password) {
		this.protocol = protocol;
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
	}
	
	private String getConnectionString(String target) {
		return protocol + host + ":" + port + "/api/jsonws" + API_ENDPOINT + target;
	}
	
	public String listFoos() {
		BufferedReader in = null;
		StringBuilder output = new StringBuilder();
		try {
			String connectionString = getConnectionString(LIST_FOOS);
			URL url = new URL(connectionString);
			URLConnection con = url.openConnection();
			
			String encoding = Base64.encode((username + ":" + password).getBytes());
			con.setRequestProperty("Authorization", "Basic " + encoding);
		    con.setRequestProperty("accept", "application/json");
			//(		
			
			in = new BufferedReader(new InputStreamReader(
	                con.getInputStream()));
			
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				output.append(inputLine).append("\n");
			}
			if (output.length() > 0) {
				output.delete(output.length()-1, output.length());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return output.toString();
	}
	
}
