$ = jQuery;
var playbtns = $('.play-ctrl');
var tracknames = $('.track_name');
for(var i=0, l=playbtns.length;i<l;i++){
	playbtns.eq(i).click();
	var trackname = tracknames.eq(i).text().replace(/\s{2,}/g,'').replace('-', ' - ');
	//console.log(trackname+' -> '+currentPlayerObj[0].url);
	console.log('wget -O "'+ trackname+'" "'+currentPlayerObj[0].url+'"');
}

