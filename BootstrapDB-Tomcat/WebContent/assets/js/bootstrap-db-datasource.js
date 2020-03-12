/*!
 * DataSource for Bootstrap v1.0.0 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2019 Valentino Ricci
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

class SqlField {
	constructor(type, aliastable, baseColumnName, columnName, label, visible, editable, order, refDataSource, refPK) {
		this._type = type;
		this._aliastable = aliastable;
		this._baseColumnName = baseColumnName;
		this._columnName = columnName;
		this._label = label;
		this._visible = !!visible;
		this._editable = !!editable;
		this._order = order;
		this._refDataSource = refDataSource;
		this._refPK = refPK;
		
		this._format = 'varchar';
		this._readonly = false;
		this._editable_hidden = false;
		this._dataSourceColumn = null;
		this._tooltipColumn = null;
		this._groupBy = 0;
	}
	
	destroy() {
		
	}
	
	get type() {
		return this._type;
	}
	
	get aliasTable() {
		return this._aliastable;
	}
	
	get baseColumnName() {
		return this._baseColumnName;
	}
	
	get columnName() {
		return this._columnName;
	}
	
	get label() {
		return this._label;
	}
	
	get visible() {
		return this._visible;
	}
	
	get editable() {
		return this._editable;
	}
	
	get order() {
		return this._order;
	}
	
	set order(value) {
		this._order = value;
	}
	
	get refDataSource() {
		return this._refDataSource;
	}
	
	get refPK() {
		return this._refPK;
	}
	
	get format() {
		return this._format;
	}
	
	setFormatDate() {
		this._format = 'date';
	}
	
	setFormatText() {
		this._format = 'varchar';
	}
	
	get readonly() {
		return this._readonly;
	}
	
	set readonly(value) {
		this._readonly = !!value;
	}
	
	get editableHidden() {
		return this._editable_hidden;
	}
	
	set editableHidden(value) {
		this._editable_hidden = !!value;
	}
	
	get groupBy() {
		return this._groupBy;
	}
	
	set groupBy(value) {
		this._groupBy = !!value;
	}
	
	get tooltipColumn() {
		return this._tooltipColumn;
	}

	set tooltipColumn(val) {
		if (val._dataSourceColumn != undefined && val._dataSourceColumn != null)
			this._tooltipColumn = val._dataSourceColumn;
		else
			this._tooltipColumn = val;
	}
}

class Datasource {
	constructor(servlet) {
		this._servlet = servlet;
		this._sqlFields = [];
		this._sqlTables = [];
		this._sqlJoins = [];
		this._sqlForeignKey = [];
		this._sqlWhere = '';
		this._sqlOrderBy = '';
		this._resultJson = null;
		this._callbacks = [];
		this._row = -1;
		this._autoSelect= true;
	}

	destroy() {
		this._sqlFields = [];
		this._sqlTables = [];
		this._sqlJoins = [];
		this._sqlForeignKey = [];
		this._callbacks = [];
	}
	
	addTextField(table, columnName, label, visible, editable, order) {
		if (label == undefined || label == null || label == '')
			label = columnName;
		
		if (visible == undefined || visible == null)
			visible = false;
		
		if (editable == undefined || editable == null)
			editable = false;
		
		if (order == undefined || order == null)
			order = 0;

		var baseColumnName = columnName;
		
		if (table != '')
			columnName = table + '.' + columnName;
		
		var field = new SqlField('input', table, baseColumnName, columnName, label, visible, editable, order, null, -1);
		field._dataSourceColumn = this._sqlFields.length;
		this._sqlFields.push(field);
		return field; 
	}

	addTextFieldArea(table, columnName, label, visible, editable, order) {
		if (label == undefined || label == null || label == '')
			label = columnName;
		
		if (visible == undefined || visible == null)
			visible = false;
		
		if (editable == undefined || editable == null)
			editable = false;
		
		if (order == undefined || order == null)
			order = 0;

		var baseColumnName = columnName;
		
		if (table != '')
			columnName = table + '.' + columnName;
		
		var field = new SqlField('textarea', table, baseColumnName, columnName, label, visible, editable, order, null, -1);
		field._dataSourceColumn = this._sqlFields.length;
		this._sqlFields.push(field);
		return field; 
	}

	addTextFieldChoice(table, columnName, label, visible, editable, order, refDataSource, refPK) {
		if (label == undefined || label == null || label == '')
			label = columnName;
		
		if (visible == undefined || visible == null)
			visible = false;
		
		if (editable == undefined || editable == null)
			editable = false;
		
		if (order == undefined || order == null)
			order = 0;

		var baseColumnName = columnName;
		
		if (table != '')
			columnName = table + '.' + columnName;
		
		var field = new SqlField('select', table, baseColumnName, columnName, label, visible, editable, order, refDataSource, refPK);
		field._dataSourceColumn = this._sqlFields.length;
		this._sqlFields.push(field);
		return field; 
	}
	
	addTextFieldYesNo(table, columnName, label, visible, editable, order) {
		if (label == undefined || label == null || label == '')
			label = columnName;
		
		if (visible == undefined || visible == null)
			visible = false;
		
		if (editable == undefined || editable == null)
			editable = false;
		
		if (order == undefined || order == null)
			order = 0;

		var baseColumnName = columnName;
		
		if (table != '')
			columnName = table + '.' + columnName;
		
		var field = new SqlField('checkbox', table, baseColumnName, columnName, label, visible, editable, order, null, -1);
		field._dataSourceColumn = this._sqlFields.length;
		this._sqlFields.push(field);
		return field; 
	}
	
// addTable(tableName) {
// this._sqlTables.push({tableName: tableName, alias: tableName});
// }
//
	addTable(tableName, alias) {
		this._sqlTables.push({tableName: tableName, alias: alias});
	}

	addJoinTable(joinType, tableName, alias, joinCondition) {
		this._sqlJoins.push({joinType:joinType, tableName: tableName, alias: alias, joinCondition:joinCondition, });
	}

	getTableName(alias) {
		var iNdx;
		for (iNdx = 0; iNdx < this._sqlTables.length; iNdx++) {
			if (this._sqlTables[iNdx].alias == alias) {
				return this._sqlTables[iNdx].tableName;
			}
		}
	}

	addForeignKey(tableName, tableField, tableJoin, tableFieldJoin) {
		
		if (tableName != '')
			tableField = tableName + '.' + tableField;
		if (tableJoin != '')
			tableFieldJoin = tableJoin + '.' + tableFieldJoin;
		
		this._sqlForeignKey.push({tableField: tableField, tableFieldJoin: tableFieldJoin});
	}

	setCriteria(where) {
		this._sqlWhere = where;
	}
	
	addAndCriteria(where) {
		if (this._sqlWhere != '')
			this._sqlWhere += ' AND ';
		this._sqlWhere += where;
	}
	
	setOrderBy(orderBy) {
		this._sqlOrderBy = orderBy;
	}
	
	enableAutoSelect(enable) {
		this._autoSelect = enable;
	}
	
	executeSelect() {
		var datasource = this;
		var selectData = {};
		var orderBy = '';
		var groupBy = '';
		
		this._row = -1;
		selectData['function'] = 'select';
		selectData['fields'] = '';
		selectData['from'] = '';
		selectData['join'] = '';
		selectData['where'] = '';
		selectData['orderBy'] = '';
		selectData['groupBy'] = '';
		
		this._sqlFields.forEach(function (item, index, array) {
			if (index != 0)
				selectData['fields'] += ', ';
			selectData['fields'] += item.columnName + ' AS col_' + index;
			
			if (item.order != 0) {
				if (orderBy != '')
					orderBy += ', ';
				
				orderBy += index + 1;
				if (item.order == -1)
					orderBy += ' DESC';
			}

			if (item.groupBy != 0) {
				if (groupBy != '')
					groupBy += ', ';
				
				groupBy += index + 1;
			}
		});
		
		if (this._sqlOrderBy != "") 
			selectData['orderBy'] = this._sqlOrderBy;
		else
			selectData['orderBy'] = orderBy;

		selectData['groupBy'] = groupBy; 
		
		this._sqlTables.forEach(function (item, index, array) {
			if (index != 0)
				selectData['from'] += ', ';
			selectData['from'] += item.tableName + ' AS ' + item.alias;
		});
		
		this._sqlJoins.forEach(function (item, index, array) {
			if (index != 0)
				selectData['join'] += ' ';
			selectData['join'] += item.joinType + ' ' + item.tableName + ' ' + item.alias + " ON " + item.joinCondition;
		});
		
		if (this._sqlForeignKey.length != 0 || this._sqlWhere != '') {

			this._sqlForeignKey.forEach(function (item, index, array) {
				if (index != 0)
					selectData['where'] += ' AND ';
				selectData['where'] += item.tableField + '=' + item.tableFieldJoin;
			});
			
			if (this._sqlForeignKey.length != 0 && this._sqlWhere != '')
				selectData['where'] += ' AND ';
			
			selectData['where'] += this._sqlWhere;
		}

		return $.ajax({
			type: 'post',
			url: '../db/servlet',
			data: selectData,
			success: function (json) {
				if (json.Result === false) {
					datasource._fireEvent('select', false, json.Message);
				} else {
					datasource._resultJson = json;// jQuery.extend(true, {},
													// json);
					datasource._fireEvent('select', true, '');
				}
			},
			failure : function (response) {
				datasource._resultJson = null;
				datasource._fireEvent('select', false, 'Ajax.failure');
			} 
		});
	}

	insertRecord(updateTable, data, cb) {
		var datasource = this;
		var insertData = {};
		var orderBy = '';
		
		insertData['function'] = 'insert';
		insertData['values'] = JSON.stringify(data);
		insertData['into'] = updateTable;
		
		return $.ajax({
			type: 'post',
			url: '../db/servlet',
			data: insertData,
			success: function (json) {
				datasource._fireEvent('insert', json.Result, json.Message);
				if (cb != null) {
					cb(json.Result, json.Message);
				}
				if (datasource._autoSelect)
					datasource.executeSelect();
			},
			failure : function (response) {
				datasource._fireEvent('insert', false, 'Ajax failure');
				if (cb != null) {
					cb(false, 'Ajax failure');
				}
			} 
		});
	}

	updateRecord(updateTable, updatePK, pkValue, data, cb) {
		var datasource = this;
		var updateData = {};
		var orderBy = '';
		
		updateData['function'] = 'update';
		updateData['values'] = JSON.stringify(data);
		updateData['from'] = updateTable;
		updateData['where'] = this._sqlFields[updatePK].baseColumnName + '=' + pkValue;
		
		return $.ajax({
			type: 'post',
			url: '../db/servlet',
			data: updateData,
			success: function (json) {
				datasource._fireEvent('update', json.Result, json.Message);
				if (cb != null) {
					cb(json.Result, json.Message);
				}
				if (datasource._autoSelect)
					datasource.executeSelect();
			},
			failure : function (response) {
				datasource._fireEvent('update', false, 'Ajax failure');
				if (cb != null) {
					cb(false, 'Ajax failure');
				}
			} 
		});
	}

	updateRecordWhere(updateTable, where, data, cb) {
		var datasource = this;
		var updateData = {};
		var orderBy = '';
		
		updateData['function'] = 'update';
		updateData['values'] = JSON.stringify(data);
		updateData['from'] = updateTable;
		updateData['where'] = where;
		
		return $.ajax({
			type: 'post',
			url: '../db/servlet',
			data: updateData,
			success: function (json) {
				datasource._fireEvent('update', json.Result, json.Message);
				if (cb != null) {
					cb(json.Result, json.Message);
				}
				if (datasource._autoSelect)
					datasource.executeSelect();
			},
			failure : function (response) {
				datasource._fireEvent('update', false, 'Ajax failure');
				if (cb != null) {
					cb(false, 'Ajax failure');
				}
			} 
		});
	}

	deleteRecord(updateTable, updatePK, pkValue, cb) {
		var datasource = this;
		var deleteData = {};
		var orderBy = '';
		
		deleteData['function'] = 'delete';
		deleteData['from'] = updateTable;
		deleteData['where'] = this._sqlFields[updatePK].baseColumnName + '=' + pkValue;
		
		return $.ajax({
			type: 'post',
			url: '../db/servlet',
			data: deleteData,
			success: function (json) {
				datasource._fireEvent('delete', json.Result, json.Message);
				if (cb != null) {
					cb(json.Result, json.Message);
				}
				if (datasource._autoSelect)
					datasource.executeSelect();
			},
			failure : function (response) {
				datasource._fireEvent('delete', false, 'Ajax failure');
				if (cb != null) {
					cb(false, 'Ajax failure');
				}
			} 
		});
	}
	
	addEventHandler(fn, object) {
		this._callbacks.push({fn: fn, object: object});
	}

	removeEventHandler(fn, object) {
		var callbacks = [];
		
		this._callbacks.forEach(function (item, index, array) {
			if (item.object !== object || (fn !== null && fn !== item.fn)) {
				callbacks.push(item);
			}
		});
		
		this._callbacks = callbacks;
	}

	_fireEvent(event, result, message) {
		var returnValue = null;
		this._callbacks.forEach(function (item, index, array) {
			var ret = item.fn(item.object, event, {result: result, message: message});
			if (ret != undefined && ret != null && returnValue == null) {
				returnValue = ret;
			}
		});
		return returnValue;		// Last value from callback
	}

	getRowsCount() {
		if (this._resultJson == null)
			return 0;
		
		return this._resultJson.length;
	}
	
	setRow(iNdxRow) {
		if (iNdxRow < 0 || iNdxRow >= this._resultJson.length)
			return null;
		
		this._row = iNdxRow;
		return this._resultJson[iNdxRow];
	}
	
	row(iNdxRow) {
		return this.setRow(iNdxRow);
	}
	
	getColumnIndex(columnName) {
		let ret = -1;
		this._sqlFields.forEach(function (item, index, array) {
			if(item.columnName == columnName) {
				ret = index;
			}
		});
		return ret;
	}
	
	getSelectValueCurrentRow(iNdxCol) {
		return this._resultJson[this._row].attributes['col_' + iNdxCol];
	}
	
	getSelectValue(iNdxRow, iNdxCol) {
		return this._resultJson[iNdxRow].attributes['col_' + iNdxCol];
	}
	
	get select() {
		var sql = 'SELECT ';
		var orderBy = '';
		
		this._sqlFields.forEach(function (item, index, array) {
			if (index != 0)
				sql += ', ';
			sql += item.columnName + ' AS col_' + index;
			
			if (item.order != 0) {
				if (orderBy != '')
					orderBy += ', ';
				orderBy += index + 1;
			}
		});
		
		sql += ' FROM ';
		
		this._sqlTables.forEach(function (item, index, array) {
			if (index != 0)
				sql += ', ';
			sql += item.tableName + ' AS ' + item.alias;
		});
		
		if (this._sqlForeignKey.length != 0 || this._sqlWhere != '') {
			sql += ' WHERE ';

			this._sqlForeignKey.forEach(function (item, index, array) {
				if (index != 0)
					sql += ' AND ';
				sql += item.tableField + '=' + item.tableFieldJoin;
			});
			
			if (this._sqlForeignKey.length != 0)
				sql += ' AND ';
			
			sql += this._sqlWhere;
		}
		
		if (orderBy) {
			sql += " ORDER BY " + orderBy;
		}
		
		return sql;
	}
}

class DatasourceCsv extends Datasource {
	constructor(file) {
		super(null);
		this._file = file;
	}
	
	executeSelect() {
		var datasource = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			// Display file content
			datasource._resultJson = datasource.CSVToArray(contents, ',');
			datasource._fireEvent('select', true, '');
		};
		reader.readAsText(this._file);
	}
	
	CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var captionData = {type: this._file.name, attributes:{} };
        var arrData = [];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        var iNdxCol = 0;
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( {type: this._file.name, attributes:{} } );
                iNdxCol = 0;
            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            if (arrData.length == 0)
            	captionData.attributes['col_' + iNdxCol] = strMatchedValue;
            else
            	arrData[ arrData.length - 1 ].attributes['col_' + iNdxCol] = strMatchedValue;
            
            iNdxCol++;
        }

        // Return the parsed data.
        return( arrData );
    }	
	
	insertRecord(updateTable, data) {
		
	}
	updateRecord(updateTable, updatePK, pkValue, data) {

	}
	
	deleteRecord(updateTable, updatePK, pkValue) {
	}
}

class DataGrid {
	constructor(datasource, div, updateTable, updatePK) {
		this._datasource = datasource;
		datasource.addEventHandler(this._onDatasourceEvent, this);
		this._div = div;
		this._dataFormDiv = div;
		this._dataFormFont = '';
		this._enableInsert = false;
		this._enableUpdate = false;
		this._enableDelete = false;
		this._updateTable = updateTable;
		this._updatePK = updatePK;
		this._enableColumnOrdering = false;
		
		this._callbacks = [];
	}
	
	destroy() {
		datasource.removeEventHandler(null, this);
		this._callbacks = [];
	}
	
	enableInsert() {
		this._enableInsert = true;
	}
	
	enableUpdate() {
		this._enableUpdate = true;
	}
	
	enableDelete() {
		this._enableDelete = true;
	}
	
	enableColumnOrdering(enable) {
		this._enableColumnOrdering = enable;
	}
	
	set dataFormDiv(value) {
		this._dataFormDiv = value;
	}
	
	setDataFormSmallFont() {
		this._dataFormFont = 'sm';
	}

	setDataFormNormalFont() {
		this._dataFormFont = '';
	}

	setDataFormLargeFont() {
		this._dataFormFont = 'lg';
	}

	draw() {
		$('#' + this._div).html( 'Caricamento dati...' );
		return this._datasource.executeSelect();
	}
	
	addEventHandler(fn, object) {
		this._callbacks.push({fn: fn, object: object});
	}

	removeEventHandler(fn, object) {
		var callbacks = [];
		
		this._callbacks.forEach(function (item, index, array) {
			if (item.object !== object || (fn !== null && fn !== item.fn)) {
				callbacks.push(item);
			}
		});
		
		this._callbacks = callbacks;
	}
	
	removeAllEventHandlers() {
		this._callbacks = [];
	}

	_fireEvent(event, eventData) {
		var returnValue = null;
		this._callbacks.forEach(function (item, index, array) {
			var ret = item.fn(item.object, event, eventData);
			if (ret != undefined && ret != null && returnValue == null) {
				returnValue = ret;
			}
		});
		return returnValue;		// Last value from callback
	}
	
	_draw() {
		var datagrid = this;
        var line = '';
	    datagrid._fireEvent('beginGridDraw', null);
		$('#' + this._div).html( '' );
		
		var thead = $("<thead>");
		thead.appendTo($('#' + this._div));
		var tr = $("<tr>");
		tr.appendTo(thead);
		
		$.each(this._datasource._sqlFields, function(iNdx, field){
			if (field.visible) {
				let th = $("<th>");
				th.appendTo(tr);
				
				if (datagrid._enableColumnOrdering) {
					let span = $("<span>");
					span.appendTo(th);
					span.addClass("fas");
					span.attr("data-col", iNdx);
					if (field.order == 0) {
						span.addClass("fa-sort");
						span.attr("data-sort", "");
					} else if (field.order == 1) {
						span.addClass("fa-sort-up");
						span.attr("data-sort", "ASC");
					} else {
						span.addClass("fa-sort-down");
						span.attr("data-sort", "DESC");
					}
					span.click(function(event){ datagrid._onOrderingColumn(event); });
					span = $("<span>");
					span.appendTo(th);
					span.html(' ' + field.label);
				} else {
					th.html(field.label);
				}
				
			}
		});
		
		if (this._enableInsert || this._enableUpdate || this._enableDelete) {
			var th = $("<th>");
			th.appendTo(tr);
			if (this._enableInsert) {
				var a = $("<a>");
				a.attr('data-toggle', 'tooltip');
				a.attr('data-placement', 'top');
				a.attr('title', 'Nuovo...');
				a.addClass('db-new-btn');
				a.appendTo(th);		
				var span = $("<span>");
				span.appendTo(a);
				span.click(function(){ datagrid.onInsert(); });
				span.addClass('fa fa-plus-square');
			}
		}
		
		var tbody = $("<tbody>");
		tbody.appendTo($('#' + this._div));
		
	    $.each(this._datasource._resultJson, function(iNdxRow, row){
			tr = $("<tr>");
			tr.appendTo(tbody);
	    	var iNdxCol = 0;
	    	for (iNdxCol = 0; iNdxCol < datagrid._datasource._sqlFields.length; iNdxCol++) {
	    		if (datagrid._datasource._sqlFields[iNdxCol].visible) {
	    			var td = $("<td>");
	    			td.click(function(){
	    				datagrid._datasource.row(iNdxRow);
	    				datagrid._fireEvent('click', iNdxRow);
	    				});
	    			
	    			if (datagrid._datasource._sqlFields[iNdxCol].type === 'checkbox') {
	    				var i = $("<i>");
	    				i.addClass('far')
	    				i.addClass('db_' + 
	    							datagrid._datasource._sqlFields[iNdxCol]._aliastable + '_' + 
	    							datagrid._datasource._sqlFields[iNdxCol]._baseColumnName + '_' + 
	    							row.attributes['col_' + iNdxCol]);
	    				i.appendTo(td);
	    				td.appendTo(tr);
	    			} else {
	    				if (row.attributes['col_' + iNdxCol] != null && datagrid._datasource._sqlFields[iNdxCol].format == 'date') {
	    					var date = row.attributes['col_' + iNdxCol];
	    					var dateFormatted = date.substring(8, 10)  + '/' + date.substring(5, 7) + '/' + date.substring(0, 4); 
	    					td.html(dateFormatted).appendTo(tr);
	    				} else {
	    					td.html(row.attributes['col_' + iNdxCol]).appendTo(tr);
	    				}
	    			}
	    			
	    			if (datagrid._datasource._sqlFields[iNdxCol].tooltipColumn >= 0) {
		    			td.prop('data-toggle', 'tooltip');
		    			td.prop('data-placement', 'bottom');
		    			td.prop('title', row.attributes['col_' + datagrid._datasource._sqlFields[iNdxCol].tooltipColumn]);
	    			}
	    		}
	        }
			if (datagrid._enableUpdate || datagrid._enableDelete) {
				var a;
				var span;
				var td = $("<td>");
				td.appendTo(tr);

				if (datagrid._enableUpdate) {
					a = $("<a>");
					a.addClass('db-edit-btn');
					a.attr('data-toggle', 'tooltip');
					a.attr('data-placement', 'top');
					a.attr('title', 'Modifica...');
					span = $("<span>");
					span.click(function(){ datagrid.onUpdate(iNdxRow); });
					span.addClass('far fa-edit');
					span.appendTo(a);
					a.appendTo(td);
				}
				
				if (datagrid._enableDelete) {
					a = $("<a>");
					a.addClass('db-delete-btn');
					a.attr('data-toggle', 'tooltip');
					a.attr('data-placement', 'top');
					a.attr('title', 'Elimina...');
					span = $("<span>");
					span.addClass('fa fa-trash');
					span.click(function(){ datagrid.onDelete(iNdxRow); });
					span.appendTo(a);
					a.appendTo(td);
				}
			}
	    }); 
	    datagrid._fireEvent('endGridDraw', null);
	}
	
	onInsert() {
		console.log('onInsert ' + this._updateTable);
		var dataform = new DataForm(this._datasource, this._dataFormDiv, this._updateTable, this._updatePK, 0);
		dataform.addEventHandler(this._onDataFormEvent, this);
		dataform._dataFormFont = this._dataFormFont;
		dataform.row = -1;
		dataform.draw();
	}
	
	onUpdate(row) {
		console.log('onUpdate ' + row + ' ' + this._updateTable + ' pk:' + this._datasource._resultJson[row].attributes['col_' + this._updatePK]);
		var dataform = new DataForm(this._datasource, this._dataFormDiv, this._updateTable, this._updatePK, 1);
		dataform.addEventHandler(this._onDataFormEvent, this);
		dataform._dataFormFont = this._dataFormFont;
		dataform.row = row;
		dataform.draw();
	}
	
	onDelete(row) {
		var dataform = new DataForm(this._datasource, this._dataFormDiv, this._updateTable, this._updatePK, 2);
		dataform.addEventHandler(this._onDataFormEvent, this);
		dataform._dataFormFont = this._dataFormFont;
		dataform.row = row;
		dataform.draw();
	}
	
	_onDatasourceEvent(dataGrid, event, eventData) {
		if (eventData.result != true) {
			dataGrid._messageBox('Errore', "L'operazione non e' stata eseguita correttamente!<BR>" + eventData.message);
		}
		
		if (event == 'select')
			dataGrid._draw();
	}
	
	_onDataFormEvent(dataGrid, event, eventData) {
		return dataGrid._fireEvent(event, eventData);
	}
	
	_onOrderingColumn(event) {
		let span = $(event.target);
		let dataCol = span.attr('data-col'); 
		let dataSort = span.attr('data-sort');
		
		this._datasource._sqlFields.forEach(function (item, index, array) {
			item.order = 0;
		});
			
		
		if (dataSort == 'ASC') {
			dataSort = 'DESC';
			span.attr('data-sort', dataSort);
			span.removeClass('fa-sort');
			span.removeClass('fa-sort-up');
			span.addClass('fa-sort-down');
			this._datasource._sqlFields[dataCol].order = -1;
		} else /* if (dataSort == 'DESC') {
			dataSort = '';
			span.attr('data-sort', dataSort);
			span.removeClass('fa-sort-up');
			span.removeClass('fa-sort-down');
			span.addClass('fa-sort');
			this._datasource._sqlFields[dataCol].order = 0;
		} else if (dataSort == '') */ {
			dataSort = 'ASC';
			span.attr('data-sort', dataSort);
			span.removeClass('fa-sort');
			span.removeClass('fa-sort-down');
			span.addClass('fa-sort-up');
			this._datasource._sqlFields[dataCol].order = 1;
		}
		
		this.draw();
	}
	
	_messageBox(caption, text) {
		var div = $('#' +  this._div +  '_messageBox');
		
		if (div.length != 0) {
			div.remove();
		}
		
		div = $(
				'<div class="modal fade" tabindex="-1" role="dialog" id="' + this._div +  '_messageBox">\
				  	<div class="modal-dialog" role="document">\
						<div class="modal-content">\
							<div class="modal-header">\
								<h4 class="modal-title custom_align" id="Heading">' + caption + '</h4>\
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="far fa-window-close" aria-hidden="true"></span></button>\
							</div>\
							<div class="modal-body">\
								<div class="alert alert-danger"><span class="fas fa-exclamation-triangle"></span> ' + text + '</div>\
							</div>\
							<div class="modal-footer ">\
								<button type="button" class="btn btn-success" data-dismiss="modal"><span class="fas fa-check-circle"></span>&nbsp;OK</button>\
							</div>\
						</div>\
					</div>\
				</div>');
		
		div.appendTo('body');
		div.modal({
			  keyboard: false,
			  backdrop: 'static'
			});
	}
	
	
}

class DataForm {
	constructor(datasource, div, updateTable, updatePK, mode) {
		this._datasource = datasource;
		this._div = div;
		this._enableUpdate = false;
		this._enableDelete = false;
		this._updateTable = updateTable;
		this._updatePK = updatePK;
		this._caption = 'Sconosciuto';
		this._okBtnCaption = 'Salva';
		this._mode = mode; 
		if (mode == 0) {
			this._caption = 'Aggiungi';
			this._okBtnCaption = 'Salva';
		} 
		else if (mode == 1) {
			this._caption = 'Modifica';
			this._okBtnCaption = 'Salva';
		} 
		else if (mode == 2) {
			this._caption = 'Elimina';
			this._okBtnCaption = 'Elimina';
		} 
		this._row = -1;
		this._callbacks = [];
		this._controlEventHandler = [];
		this._dataFormFont = '';
		this._drawDeferred = null;
	}
	
	destroy() {
		this._fireEvent('closeDataForm', $('#' + this.formId));

		this._callbacks = [];
		this._controlEventHandler.forEach(function (item, index, array) {
			item.datasource.removeEventHandler(null, item.control);
		});
		this._controlEventHandler = [];
	}
	
	set row(value) {
		this._row = value;
		this._datasource.row(value);
	}
	
	setDataFormSmallFont() {
		this._dataFormFont = 'sm';
	}

	setDataFormNormalFont() {
		this._dataFormFont = '';
	}

	setDataFormLargeFont() {
		this._dataFormFont = 'lg';
	}

	draw() {
		var dataform = this;
        var line = '';
        this.formId = this._div + '_form';
        this._drawDeferred = jQuery.Deferred();

        var dialog = 
        	'<div class="modal-dialog" role="document">\
        		<div class="modal-content">\
          			<div class="modal-header text-white bg-primary">\
          				<h5 class="modal-title">' + this._caption + '</h5>\
          				<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
          					<span aria-hidden="true">&times;</span>\
          				</button>\
          			</div>\
          			<div class="modal-body">\
          				<form role="form" id="' + this.formId +'" class="needs-validation" novalidate>\
          				</form>\
          			</div>\
          		</div>\
        	 </div>\
        	';
        
        var divDlg = $('#' + this._div); 
		divDlg.addClass('modal fade');
		divDlg.prop('role', 'dialog');
		divDlg.prop('tabindex', '-1');
		divDlg.html( dialog );
		var form = $('#' + this.formId);
		
		dataform._fireEvent('initDataForm', form);
		$.each(this._datasource._sqlFields, function(iNdx, sqlField){
			if (sqlField.editable) {
				var formGroup = $('<div>');
				formGroup.addClass('form-group row');
				
				if (sqlField.editableHidden)
					formGroup.addClass('d-none');
				
				formGroup.appendTo(form);
				var label = $("<label>");
				label.addClass('col-form-label col-md-3');
				label.prop('for', 'col_' + iNdx);
				label.html(sqlField.label);
				label.appendTo(formGroup);
				var divInput = $("<div>");
				divInput.addClass('col-md-9');
				divInput.appendTo(formGroup);
				var control = null;
				var defaultControlValue = null;
				
				if (dataform._row != -1) {
					defaultControlValue = dataform._datasource._resultJson[dataform._row].attributes['col_' + iNdx];
				} else {
					defaultControlValue = dataform._fireEvent('getDefaultData', sqlField._baseColumnName);
				}
				
				if (defaultControlValue != null && sqlField.format === 'date') {
					defaultControlValue = defaultControlValue.substring(8, 10)  + '/' + defaultControlValue.substring(5, 7) + '/' + defaultControlValue.substring(0, 4); 
				}
				
				if (sqlField.type === 'select') {
					control = $(" <select> ");
					control.prop('id', 'col_' + iNdx);
					control.prop('name', 'col_' + iNdx);
					control.addClass('form-control');
					control._sqlField = sqlField;
					
					if (defaultControlValue != null) 
						control.prop('selectedValue', defaultControlValue);
					
					control.appendTo(divInput);
					control.change(function () {
						var selData = {};
						selData.controlObject = this;
						selData.val = selData.controlObject.selectedOptions[0].value;
						selData.text = selData.controlObject.selectedOptions[0].text;
						selData.index = selData.controlObject.selectedOptions[0].index;
						selData.sqlfield = sqlField;
						selData.datasource = sqlField.refDataSource;
						selData.json = sqlField.refDataSource.row(selData.index);
						dataform._fireEvent('onSelChange', selData);
					});
					
					sqlField.refDataSource.addEventHandler(function(controlObject, event, eventData) {
						if (event != 'select')
							return;
						
						var sqlField = controlObject._sqlField;
					    $.each(sqlField.refDataSource._resultJson, function(iNdxRow, row){
							var option = $("<option>");
							option.appendTo(controlObject);
							option.val(row.attributes['col_' + sqlField.refPK]);
							
					    	var iNdxCol = 0;
					    	for (iNdxCol = 0; iNdxCol < sqlField.refDataSource._sqlFields.length; iNdxCol++) {
					    		if (sqlField.refDataSource._sqlFields[iNdxCol].visible) {
					    			option.html(row.attributes['col_' + iNdxCol]);
					    		}
					        };
					        
// if (row.attributes['col_' + sqlField.refPK] ==
// controlObject.prop('selectedValue')) {
// controlObject.val(controlObject.prop('selectedValue'));
// }
								
					    });
			        	controlObject.val(controlObject.prop('selectedValue'));
			        	sqlField.refDataSource.row(controlObject.prop('selectedIndex'));
					}, control);
					dataform._controlEventHandler.push({datasource: sqlField.refDataSource, control: control});
					sqlField.refDataSource.executeSelect();
				} else if (sqlField.type === 'input') {
					control = $("<input>");
					control.prop('id', 'col_' + iNdx);
					control.prop('name', 'col_' + iNdx);
					control.prop('type', 'text');
					control.prop('autocomplete', 'off');
					control.prop('pattern', '^[^\\\\<>%\$\"]*$');
					control.addClass('form-control');
					
					if (defaultControlValue != null) 
						control.val(defaultControlValue);
					
					control.appendTo(divInput);
					var invalidInput = $("<div>")
					invalidInput.addClass("invalid-feedback");
					invalidInput.html("Non utilizzare caratteri speciali \\ < > % $ \"")
					invalidInput.appendTo(divInput);
				} else if (sqlField.type === 'textarea') {
					control = $("<textarea >");
					control.prop('id', 'col_' + iNdx);
					control.prop('name', 'col_' + iNdx);
					control.prop('rows', 5);
					control.prop('pattern', '^[^<>%\$\"]*$');
					control.addClass('form-control');
					
					if (defaultControlValue != null) 
						control.val(defaultControlValue);
					
					control.appendTo(divInput);
					var invalidInput = $("<div>")
					invalidInput.addClass("invalid-feedback");
					invalidInput.html("Non utilizzare caratteri speciali \\ < > % $ \"")
					invalidInput.appendTo(divInput);
				} else if (sqlField.type === 'checkbox') {
					control = $("<input>");
					control.prop('id', 'col_' + iNdx);
					control.prop('name', 'col_' + iNdx);
					control.prop('type', 'checkbox');
					control.val(1);
					control.addClass('form-check-input');
					
					if (defaultControlValue != null) 
						control.prop('checked', defaultControlValue != 0);
					
					control.appendTo(divInput);
				}
				
				if (sqlField.readonly || dataform._mode == 2) {
					if (sqlField.type === 'select')
						control.prop('disabled', true);
					else
						control.prop('readonly', true);
				}
				
				if (dataform._dataFormFont != '') {
					label.addClass('form-control-' + dataform._dataFormFont);
					control.addClass('form-control-' + dataform._dataFormFont);
				}
			} 
		});

		var formFooter = $('<div>');
		formFooter.addClass('modal-footer');
		formFooter.appendTo(form);

		var button;
		button = $('<button>')
		button.prop('id', 'btnDbSaveIt');
		button.prop('type', 'button');
		button.attr('data-dismiss', 'modal');
		button.addClass('btn btn-success');
		button.html(this._okBtnCaption);
		button.click(function(event){ dataform._onOk(event); });
		button.appendTo(formFooter);
		
		button = $('<button>')
		button.prop('id', 'btnDbCloseIt');
		button.prop('type', 'button');
		button.attr('data-dismiss', 'modal');
		button.addClass('btn btn-default');
		button.html('Annulla');
		button.click(function(){ dataform._onCancel(); });
		button.appendTo(formFooter);
		
		$('#' + this._div).on('show.bs.modal', function () {
		    $('.modal .modal-body').css('overflow-y', 'auto'); 
		    $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
		});
		
		$('#' + this._div).modal({
			  keyboard: false,
			  backdrop: 'static'
			});
		
		dataform._fireEvent('showDataForm', form);
		return this._drawDeferred.promise();
	}
	
	_onOk(event) {
		var form = document.getElementById(this.formId);
		
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
	        form.classList.add('was-validated');
	        return;
        }
		
        form.classList.add('was-validated');
	        
		if (this._mode == 0) {
			this._onOkInsert();
		}
		else if (this._mode == 1) {
			this._onOkUpdate();
		}
		else if (this._mode == 2) {
			this._onOkDelete();
		}
		this.destroy();
		if (this._drawDeferred) {
			this._drawDeferred.resolve();
			this._drawDeferred = null;
		}
	}
	
	_onOkInsert() {
		var formData = this.getFormData();
		this._fireEvent('beforeFormInsert', formData);
		this._datasource.insertRecord(this._updateTable, formData);
	}
	
	_onOkUpdate() {
		var formData = this.getFormData();
		this._fireEvent('beforeFormUpdate', formData);
		this._datasource.updateRecord(this._updateTable, this._updatePK, this._datasource._resultJson[this._row].attributes['col_' + this._updatePK], formData);
	}
	
	_onOkDelete() {
		this._fireEvent('beforeFormDelete', null);
		this._datasource.deleteRecord(this._updateTable, this._updatePK, this._datasource._resultJson[this._row].attributes['col_' + this._updatePK]);
	}
	
	_onCancel() {
		this.destroy();
		if (this._drawDeferred) {
			this._drawDeferred.reject();
			this._drawDeferred = null;
		}
	}
	
	addEventHandler(fn, object) {
		this._callbacks.push({fn: fn, object: object});
	}

	removeEventHandler(fn, object) {
		var callbacks = [];
		
		this._callbacks.forEach(function (item, index, array) {
			if (item.object !== object || (fn !== null && fn !== item.fn)) {
				callbacks.push(item);
			}
		});
		
		this._callbacks = callbacks;
	}

	_fireEvent(event, eventData) {
		var returnValue = null;
		this._callbacks.forEach(function (item, index, array) {
			var ret = item.fn(item.object, event, eventData);
			if (ret != undefined && ret != null && returnValue == null) {
				returnValue = ret;
			}
		});
		return returnValue;		// Last value from callback
	}
	
	getFormData() {
		var thisObject = this; 
		var attributes = {};
		$.each(this._datasource._sqlFields, function(iNdx, field){
			if (thisObject._datasource.getTableName(field._aliastable) != thisObject._updateTable)
				return;
			
			if (field.editable) {
				if (field.type === 'checkbox') {
					attributes[field.baseColumnName] = (($( '#col_' + iNdx ).prop('checked') === true) ? '1' : '0');
				} else {
					if (field.format === 'date') {
						if ($( '#col_' + iNdx ).val() != '') {
							let date = $( '#col_' + iNdx ).val();
							let dateFormattedSql  = date.substring(6, 10)  + '-' + date.substring(3, 5) + '-' + date.substring(0, 2); 
							attributes[field.baseColumnName] = dateFormattedSql;
						} else {
							attributes[field.baseColumnName] = '#@NULL_DATE!@#';
						}
					} else {
						attributes[field.baseColumnName] = $( '#col_' + iNdx ).val();
					}
				}
			}
		});
		return attributes;
	}
}

class DataHtml {
	constructor(datasource, div) {
		this._datasource = datasource;
		this._div = div;
		this._row = -1;
	}
	
	destroy() {
	}
	
	set row(value) {
		this._row = value;
		this._datasource.row(value);
	}
	
	draw() {
		this._draw();
	}
	
	_draw() {
		var dataHtml = this;
		
		$.each(this._datasource._sqlFields, function(iNdx, field){
			if (field.columnName.indexOf('(') != -1)	// Sql Function skip
				return;
			
			$('#' + dataHtml._div).find("[for-db-column-label='" + field.columnName + "']").each(function(index) {
				var colValue = $( this ).attr('for-db-column-label');
				if (colValue != undefined) {
					$(this).html(field.label);
				}
			});
			
			$('#' + dataHtml._div).find("[for-db-column-value='" + field.columnName + "']").each(function(index) {
				var colValue = $( this ).attr('for-db-column-value');
				if (colValue != undefined) {
    				let str = dataHtml._datasource._resultJson[dataHtml._row].attributes['col_' + iNdx];
    				
    				if (str != null) {
        				if (dataHtml._datasource._sqlFields[iNdx].format == 'date') {
        					str = str.substring(8, 10)  + '/' + str.substring(5, 7) + '/' + str.substring(0, 4);
        				}
        					
    					$(this).html(str);
    				}
				}
			});
		});
		// dataform._datasource._resultJson[dataform._row].attributes['col_' +
		// iNdx]
	}
}