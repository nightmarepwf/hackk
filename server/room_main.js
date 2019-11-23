const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3033 });
const mysql = require("mysql");
  

var connection1 = mysql.createConnection({

});
 
wss.on('connection', function connection(ws) {
	  ws.on('message', function incoming(data) {
		  
		  
	json_data=JSON.parse(data)
	if(json_data['type_of']=="connect_m"){
		 var connection1 = mysql.createConnection({

			});
		 connection1.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
			id=json_data['data']['id'];
			user_id=json_data['data']['user_id'];
			console.log(user_id);
			//console.log(`insert into comands_list (name,full_text,status_id,shanblon_id) values('${name}','${text_f}','1','${marks}',) `)
			connection1.query(`SELECT a.id as id ,a.room_id as room_id ,a.user_id as user_id,b.name as username ,a.mark as mark, a.user_status_id as user_status_id,c.status as user_status    FROM rooms as a inner join users as b on a.user_id=b.id inner join usin_status as c on a.user_status_id=c.id WHERE room_id=${id}`, function (err, result, fields) {
			if (!err){
				var fl=false
				for (item in result){
					if(result[item]['user_id']==user_id){
						fl=true
					}
				}
				ws.send(JSON.stringify({"type_of":"users_list","data":result}))
				if(!fl){
					connection1.query(`insert into rooms (room_id,user_id,user_status_id) values('${id}','${user_id}','1') `, function (err, result, fields) {
						if (!err){
						console.log("ok")
						//ws.send(JSON.stringify({"type_of":"data_get","data":[{name:name,id:result.insertId,status:"Ожидание участников"}]}))
						//connection1.end();
			
					}
				})
				}
				console.log("ok")
				
				//ws.send(JSON.stringify({"type_of":"data_post_id","data":result}))
				connection1.end();
			
			}
			else throw err;
			
		});
		}
	});
	}
	  
	  
	  })
		//wss.clients.forEach(function each(client) {
        //if (client.readyState === WebSocket.OPEN) {
			//client.send(data);
		//}
		//});
});