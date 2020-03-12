<html>
<head>
	<link href="./assets/css/bootstrap-4.0.0.css" rel="stylesheet"	id="bootstrap-css">
	<link href="./assets/css/font-awesome.css" rel="stylesheet">
	
	<script src="./assets/js/jquery-3.4.1.min.js"></script>
	<script src="./assets/js/popper.min.js"></script>
	<script src="./assets/js/bootstrap-4.0.0.min.js"></script>
	
	<link href="./assets/css/bootstrap-db.css" rel="stylesheet" id="bootstrap-db-css">
	<script src="./assets/js/bootstrap-db-datasource.js"></script>

</head>

<body>
	<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;"> 
	  <a class="navbar-brand" href="./">Gestione tabelle database</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarText">
	    <ul class="navbar-nav mr-auto">
	    </ul>
	    <span class="navbar-text">
	        <a class="nav-link" href="/">Home</a>
	    </span>
	  </div>
	</nav>

	<BR>

	<div class="container theme-showcase">
		<div id="holder" class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header text-white bg-primary">
						<span class="fa fa-list"></span>&nbsp;Tabelle database
						<div class="pull-right action-buttons"></div>
					</div>
					<div class="card-body">
						<div class="card">
							<div class="card-header">TABELLE</div>
							<div class="card-body">
								<div class="col-md-3"><a href="./sample/utenti.jsp">Utenti</a></div>
							</div>
						</div>
					</div>
					<!--
 	                <div class="card-footer">
	                </div>
-->
				</div>
			</div>
		</div>

		<div id="dbDataForm"></div>
	</div>




	<script>

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

</script>
</body>
</html>