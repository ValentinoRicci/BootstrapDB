<html>
<head>
<link href="../assets/css/bootstrap-4.0.0.css" rel="stylesheet"
	id="bootstrap-css">
<link href="../assets/css/bootstrap-grid-4.0.0.css" rel="stylesheet"
	id="bootstrap-grid-css">
<link href="../assets/css/font-awesome.css" rel="stylesheet">
<link href="../assets/css/calendar.css" rel="stylesheet">
<link href="../assets/css/bootstrap-db.css" rel="stylesheet"
	id="bootstrap-db-css">
<script src="../assets/js/jquery-3.4.1.min.js"></script>
<script src="../assets/js/popper.min.js"></script>
<script src="../assets/js/bootstrap-4.0.0.min.js"></script>
<script src="../assets/js/bootstrap-db-datasource.js"></script>
</head>

<style>
#dbTable_utenti>tbody>tr>td:nth-child(1) {
	text-align: center;
}

#dbTable_utenti>tbody>tr>td:nth-child(2) {
	text-align: center;
}

.db_U_rubrica_1:before {
	content: "\f06e";
	color: blue;
}

.db_U_rubrica_0:before {
	content: "";
}

.db_U_deleted_1:before {
	content: "\f070";
	color: orangered;
}

.db_U_deleted_0:before {
	content: "";
}
</style>

<body>
	<nav class="navbar navbar-expand-lg navbar-light"
		style="background-color: #e3f2fd;">
		<a class="navbar-brand" href="./">Utenti</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarText" aria-controls="navbarText"
			aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav mr-auto">
			</ul>
			<span class="navbar-text"> <a class="nav-link" href="/">Home</a>
			</span>
		</div>
	</nav>

	<BR>

	<div class="container-fluid">
		<div class="tab-navigator div-screen">
			<ul id="navigator_azione" class="nav nav-tabs">
				<li id="navigator_utenti" class="nav-item active"><a
					class="nav-link active" href="#utenti" data-toggle="tab">Utenti</a></li>

				<li id="navigator_scheda" class="nav-item" style="display: none;">
					<a class="nav-link" href="#scheda" data-toggle="tab">Scheda</a>
				</li>
			</ul>
		</div>
		<div class="tab-content">
			<div class="tab-pane fade active show" id="utenti">
				<div id="holder" class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-header text-white bg-primary">
								<span class="fa fa-list">&nbsp;</span>Lista utenti
								<div class="pull-right action-buttons"></div>
							</div>
							<div class="card-body">
								<table id='dbTable_utenti'
									class="table table-striped table-bordered dataTable"
									style="width: 100%;"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="scheda">
				<div id="scheda_utente">
					<div id="holder" class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header text-white bg-primary">
									<span class="fa fa-list">&nbsp;</span>Scheda utente
									<div class="pull-right action-buttons"></div>
								</div>
								<div class="card-body">
									<div class='row alert alert-primary'>DATI DEL PERSONALE</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark'
											for-db-column-label='U.cognome'></div>
										<div class='col-md-8' for-db-column-value='U.cognome'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark' for-db-column-label='U.nome'></div>
										<div class='col-md-8' for-db-column-value='U.nome'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark'
											for-db-column-label='U.username'></div>
										<div class='col-md-8' for-db-column-value='U.username'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark' for-db-column-label='U.email'></div>
										<div class='col-md-8' for-db-column-value='U.email'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark'
											for-db-column-label='U.iniziali'></div>
										<div class='col-md-8' for-db-column-value='U.iniziali'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark'
											for-db-column-label='U.telefono'></div>
										<div class='col-md-8' for-db-column-value='U.telefono'></div>
									</div>
									<div class='row border border-secondary'>
										<div class='col-md-4 alert-dark'
											for-db-column-label='U.cellulare'></div>
										<div class='col-md-8' for-db-column-value='U.cellulare'></div>
									</div>
									<br>
									<div class='row alert alert-primary'>BADGE</div>
									<table id='dbTable_stora_cod'
										class="table table-striped table-bordered dataTable"
										style="width: 100%;"></table>
									<br>
									<div class='row alert alert-primary'>RUOLI / ABILITAZIONI</div>
									<table id='dbTable_utenti_ruoli'
										class="table table-striped table-bordered dataTable"
										style="width: 100%;"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
		<!-- TabContent -->
		<div id="dbDataForm"></div>
	</div>




	<script>

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

class MainWindow {

	constructor() {
		this.dss = new Datasource('../db/servlet');
		this.dsr = new Datasource('../db/servlet');
		this.dsspo = new Datasource('../db/servlet');
		this.dsu = new Datasource('../db/servlet');
		this.dspdfu = new Datasource('../db/servlet');
		this.dsruoli_choice = new Datasource('../db/servlet');
	}
	
	init() {
		this.dss.addTable('siti', 'S');
		this.dss.addTextField('S', 'idsito', 'idsito', false, false);
		this.dss.addTextField('S', 'nome', 'Sito', true, false);

		// REPARTI
		this.dsr.addTable('reparti', 'R');
		this.dsr.addTextField('R', 'idreparto', 'idreparto', false, false);
		this.dsr.addTextField('R', 'nome', 'Reparto', true, false);

		// RUOLI
		this.dsruoli_choice.addTable('ruoli', 'R');
		this.dsruoli_choice.addTextField('R', 'id', 'ID', false, false, 0);
		this.dsruoli_choice.addTextField('', 'concat(R.Acronimo, " - " , R.descrizione)', 'Ruolo', true, false, 1);
		this.dsruoli_choice.addTextField('R', 'acronimo', 'Acronimo', false, false, 0);

		// PROFILI ORARI
		this.dsspo.addTable('stora_profili_orari', 'SPO');
		this.dsspo.addTextField('SPO', 'idstora_profili_orari', 'idstora_profili_orari', false, false);
		this.dsspo.addTextField('SPO', 'descrizione', 'Profilo orario', true, false);

		// UTENTE PIANO DI FORMAZIONE
		this.dspdfu.addTable('pdf_utenti', 'PDFU');
		this.dspdfu.addTextField('PDFU', 'idutente', 'idutente', false, false);

		// UTENTI
		this.dsu.addTable('utenti', 'U');
		this.dsu.addTable('reparti', 'R');
		this.dsu.addForeignKey('U', 'idreparto', 'R', 'idreparto');
		this.dsu.addTable('siti', 'S');
		this.dsu.addForeignKey('U', 'idsito', 'S', 'idsito');
		this.dsu.addTable('stora_profili_orari', 'SPO');
		this.dsu.addForeignKey('U', 'idstora_profili_orari', 'SPO', 'idstora_profili_orari');

		this.dsu.addTextField('U', 'idutente', 'Id utente');
		this.dsu.addTextFieldYesNo('U', 'rubrica', 'Rubrica', true, false, 0);
		this.dsu.addTextFieldYesNo('U', 'deleted', 'Abilitato', true, false, 0);
		this.dsu.addTextField('U', 'cognome', 'Cognome', true, true, 1);
		this.dsu.addTextField('U', 'nome', 'Nome', true, true, 1);
		this.dsu.addTextField('U', 'username', 'Username', true, true);
		this.dsu.addTextField('U', 'password', 'Password', false, false);
		this.dsu.addTextField('U', 'email', 'E-mail', true, true);
		this.dsu.addTextFieldChoice('U', 'idreparto', 'Id Reparto', false, true, 0, this.dsr, 0);
		this.dsu.addTextField('R', 'nome', 'Reparto', true, false);
		
		this.dsu.addTextField('U', 'iniziali', 'Iniziali', true, true);
		this.dsu.addTextFieldChoice('U', 'idsito', 'Sito', false, true, 0, this.dss, 0);
		this.dsu.addTextField('S', 'nome', 'Sito', true, false);
		this.dsu.addTextField('U', 'telefono', 'Telefono', true, true);
		this.dsu.addTextField('U', 'cellulare', 'Cellulare', true, true);
		this.dsu.addTextField('U', 'idaxwin', 'Id Axwin');
		this.dsu.addTextField('U', 'ultimoaccesso');
		this.dsu.addTextField('U', 'accessoattuale');
		this.dsu.addTextFieldChoice('U', 'idstora_profili_orari', 'Profilo orario', false, true, 0, this.dsspo, 0);
		this.dsu.addTextField('SPO', 'descrizione', 'Profilo orario', true, false);
		this.dsu.addTextFieldYesNo('U', 'rubrica', 'Presenza rubrica', false, true, 0);
		this.dsu.addTextFieldYesNo('U', 'deleted', 'Disabilitato', false, true, 0);

		this.grid = new DataGrid(this.dsu, 'dbTable_utenti', 'utenti', 0);
		this.grid.dataFormDiv = 'dbDataForm';
		this.grid.enableInsert();
		this.grid.enableUpdate();
		
		this.dsu.addEventHandler(function(object, event, eventData) {
			if (event == 'click') {
				mainWindow.fillSchedaUtenti(eventData);
			}
			else if (event == 'insert') {
				if (eventData.result) {
					object.dspdfu.insertRecord('pdf_utenti', {
						idutente:eventData.message
					});
				}
			}
		}, this);
		
		this.grid.addEventHandler(function(mainWindow, event, eventData) {
			if (event == 'click') {
				mainWindow.fillSchedaUtenti(eventData);
			}
		}, this);

		
		this.grid.draw();
	}
	
	fillSchedaUtenti(iNdxRow) {
		var dataHtml = new DataHtml(this.dsu, 'scheda_utente');
		dataHtml.row = iNdxRow;
		dataHtml.draw();
		
		//Gestione BADGE
		var idutente = this.dsu.getSelectValue(iNdxRow, 0);
		this.dssu = new Datasource('../db/servlet');
		this.dssu.addTable('stora_utenti', 'SU');
		this.dssu.addAndCriteria('SU.idutente=' + idutente);
		this.dssu.addTextField('SU', 'idstora_utenti', 'id', false, false, 0);
		var field = this.dssu.addTextField('SU', 'idutente', 'idutente', false, true, 0);
		field.editableHidden = true;
		this.dssu.addTextField('SU', 'storacod', 'Badge', true, true, 0);

		var grid = new DataGrid(this.dssu, 'dbTable_stora_cod', 'stora_utenti', 0);
		grid.setDataFormSmallFont();
		grid.dataFormDiv = 'dbDataForm';
		grid.enableInsert();
		grid.enableDelete();
		grid.draw();
		
		grid.addEventHandler(function (mainWindow, event, eventData) {
			if (event == 'getDefaultData' && eventData == 'idutente') {
				return mainWindow.dsu.getSelectValue(iNdxRow, 0);
			}
			
			return '';
		}, this);
		
		var grid = new DataGrid(this.dssu, 'dbTable_stora_cod', 'stora_utenti', 0);
		grid.setDataFormSmallFont();
		grid.dataFormDiv = 'dbDataForm';
		grid.enableInsert();
		grid.enableDelete();
		grid.draw();
		
		grid.addEventHandler(function (mainWindow, event, eventData) {
			if (event == 'getDefaultData' && eventData == 'idutente') {
				return mainWindow.dsu.getSelectValue(iNdxRow, 0);
			}
			
			return '';
		}, this);
		
		//Gestione RUOLI
		this.dsur = new Datasource('../db/servlet');
		this.dsur.addTable('utenti_ruoli', 'UR');
		this.dsur.addTable('ruoli', 'R');
		this.dsur.addForeignKey('UR', 'idruolo', 'R', 'id');
		
		this.dsur.addAndCriteria('UR.idutente=' + idutente);
		this.dsur.addTextField('UR', 'id', 'id', false, false, 0);
		var field = this.dsur.addTextField('UR', 'idutente', 'idutente', false, true, 0);
		field.editableHidden = true;
		this.dsur.addTextFieldChoice('UR', 'idruolo', 'Ruolo', false, true, 0, this.dsruoli_choice, 0);
		this.dsur.addTextField('R', 'acronimo', 'Aconimo', true, false);
		this.dsur.addTextField('R', 'descrizione', 'Ruolo', true, false);

		grid = new DataGrid(this.dsur, 'dbTable_utenti_ruoli', 'utenti_ruoli', 0);
		grid.setDataFormSmallFont();
		grid.dataFormDiv = 'dbDataForm';
		grid.enableInsert();
		grid.enableUpdate();
		grid.enableDelete();
		grid.draw();
		
		grid.addEventHandler(function (mainWindow, event, eventData) {
			if (event == 'getDefaultData' && eventData == 'idutente') {
				return mainWindow.dsu.getSelectValue(iNdxRow, 0);
			}
			
			return '';
		}, this);
		
		
		
		$('#scheda_utente').show();
		$('#navigator_scheda').show();
		$('.nav-tabs a[href="#scheda"]').tab('show')
	}
}


// ABILITAZIONE TOOLTIP
$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	  new MainWindow().init();
	});
	

</script>
</body>
</html>
