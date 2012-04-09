/*TO-DO
> Bookmark javascript
> Chrome extension
*/

$ = jQuery;
var playbtns = $('.play-ctrl'),
	tracknames = $('.track_name'),
	favdivs = $('.favdiv');

for(var i=0, l=playbtns.length;i<l;i++){
	playbtns.eq(i).click();
	var trackname = tracknames.eq(i).text().replace(/\s{2,}/g,'').replace('-', ' - '),
		url = currentPlayerObj[0].url;
	//console.log(trackname+' -> '+currentPlayerObj[0].url);
	//console.log('wget -O "'+trackname+'.mp3" "'+url+'"');
	favdivs.eq(i).after('<li class="downdiv"><a class="down_1k9pt" href="'+url+'" download="'+trackname+'.mp3"title="Download '+trackname+'"><img height="18px" src="http://i.imgur.com/I6EYM.png"></a></li>')
};

playbtns.eq(0).click().click(); //Return player to first item

//onclick="download('item','1k9pt');return false;"