# BootstrapDB
General purpose database classes for Bootstrap/Jquery/Tomcat
BootstrapDB is a free software tool written in Javascript and Java intended to embed SQL data in a very easy way inside HTML pages.
It supports a wide range of operations on MySQL (but can be used on every SQL DBMS).
Frequently used operations (show data in &lt;table&gt;, insert/update/delete row) can be performed via the user interface.
Data is shown using Bootstrap/Jquery paradigm.

Sample based on 6 mySQL tables.

Very simple Javascript code to show table data in grid with insert, update, delete function enabled.

class MainWindow {

	constructor() {
		this.dsu = new Datasource('../db/servlet');
	}
	
	init() {
		// USER SIMPLE USE
		this.dsu.addTable('utenti', 'U');

		this.dsu.addTextField('U', 'idutente', 'Id utente');
		this.dsu.addTextField('U', 'cognome', 'Cognome', true, true, 1);
		this.dsu.addTextField('U', 'nome', 'Nome', true, true, 1);
		this.dsu.addTextField('U', 'username', 'Username', true, true);
		this.dsu.addTextField('U', 'password', 'Password', false, false);
		this.dsu.addTextField('U', 'email', 'E-mail', true, true);
		this.dsu.addTextField('U', 'iniziali', 'Iniziali', true, true);
		this.dsu.addTextField('U', 'telefono', 'Telefono', true, true);
		this.dsu.addTextField('U', 'cellulare', 'Cellulare', true, true);
		this.dsu.addTextField('U', 'idaxwin', 'Id Axwin');
		this.dsu.addTextField('U', 'ultimoaccesso');
		this.dsu.addTextField('U', 'accessoattuale');
		this.dsu.addTextFieldYesNo('U', 'rubrica', 'Presenza rubrica', false, true, 0);
		this.dsu.addTextFieldYesNo('U', 'deleted', 'Disabilitato', false, true, 0);

		this.grid = new DataGrid(this.dsu, 'dbTable_utenti', 'utenti', 0);
		this.grid.dataFormDiv = 'dbDataForm';
		this.grid.enableInsert();
		this.grid.enableUpdate();
		this.grid.enableDelete();
		
		this.grid.draw();
	}
}


