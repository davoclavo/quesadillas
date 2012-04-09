/*TO-DO
> Bookmark javascript
> Chrome extension
*/

$ = jQuery;

for(var i=0, l=trackList[document.location.href].length;i<l;i++){
	$.ajax({
		url: '/serve/source/' + trackList[activeList][i].id + '/' + trackList[activeList][i].key,
		success: function(data){
			var url = data.url,
				id = data.itemid,
				trackname = $('#section-track-'+id).find('.track_name').text().replace(/\s{2,}/g,'').replace('-', ' - ');
			$('#section-track-'+id).find('.favdiv').after('<li class="downdiv"><a class="down_1k9pt" href="'+url+'" download="'+trackname+'.mp3"title="Download: '+trackname+'"><img height="18px" src="http://i.imgur.com/I6EYM.png"></a></li>');
			console.log(trackname+' -> '+url);
		}
	});
}