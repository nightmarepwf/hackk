const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
const mysql = require("mysql");
  
var connection = mysql.createConnection({

});
var connection1 = mysql.createConnection({

});
 
wss.on('connection', function connection(ws) {

	var connection1 = mysql.createConnection({

			});
		 connection1.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
			connection1.query(`SELECT a.id as id,a.name as name ,b.status as status FROM comands_list  as a inner join  comands_status  as b on a.status_id=b.id WHERE result IS NULL `, function (err, result, fields) {
			if (!err){
			if (result.length>0){
				//for ( item in result){
					//console.log(result[item])
				//}
				ws.send(JSON.stringify({"type_of":"data_get","data":result}))
				connection1.end();
			}
			}
			
		});
		}
	});
  ws.on('message', function incoming(data) {
	console.log(data)
	json_data=JSON.parse(data)
	if(json_data['login']!=undefined){
		 var connection1 = mysql.createConnection({

			});
		 connection1.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
			login=json_data['login']['email'];
			pwd=json_data['login']['password'];

			connection1.query(`SELECT id,name,login FROM users where login= '${login}' and password = '${pwd}' `, function (err, result, fields) {
			if (!err){
			if (result.length==1){
			
				ws.send(JSON.stringify({"login_ok": {"id" : result[0].id,"name":result[0].name,"login":result[0].login}}))
				connection1.end();
			}
			}
			
		});
		}
	});
	}
	if(json_data['type_of']=="create_comand"){
		 var connection1 = mysql.createConnection({

			});
		 connection1.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
			name=json_data['data']['name'];
			text_f=json_data['data']['text'];
			mark_s=json_data['data']['marks'];
			//console.log(`insert into comands_list (name,full_text,status_id,shanblon_id) values('${name}','${text_f}','1','${marks}',) `)
			connection1.query(`insert into comands_list (name,full_text,status_id,shablon_id) values('${name}','${text_f}','1','${mark_s}') `, function (err, result, fields) {
			if (!err){
				console.log("ok")
			ws.send(JSON.stringify({"type_of":"data_get","data":[{name:name,id:result.insertId,status:"Ожидание участников"}]}))
				connection1.end();
			
			}
			else throw err;
			
		});
		}
	});
	}
	if(json_data['type_of']=="get_buy_id"){
		 var connection1 = mysql.createConnection({

			});
		 connection1.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
			id=json_data['data']['id'];
			//console.log(`insert into comands_list (name,full_text,status_id,shanblon_id) values('${name}','${text_f}','1','${marks}',) `)
			connection1.query(`SELECT a.id as id,a.name as name ,a.full_text as full_text, b.status as status FROM comands_list  as a inner join  comands_status  as b on a.status_id=b.id WHERE a.id=${id} `, function (err, result, fields) {
			if (!err){
			
				console.log("ok")
				ws.send(JSON.stringify({"type_of":"data_post_id","data":result}))
				connection1.end();
			
			}
			else throw err;
			
		});
		}
	});
	}
	
	if(json_data['newdata']!=undefined){
		wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
		});
		//ws.send(JSON.stringify({"login" : "vadim"}))
	}
	

  });

});