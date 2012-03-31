$ = jQuery;
var playbtns = $('.play-ctrl');
var tracknames = $('.track_name');
for(var i, l=playbtns.length;i<l<i++){
	playbtns.eq(i).click();
	var trackname = tracknames.eq(i).text().replace(/\t+/g,' ').replace(/(\s\s)+/g,'').trim();
	console.log(trackname+' : '+currentPlayerObj[0].url);
}

