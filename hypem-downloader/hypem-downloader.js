setInterval(getIcons,1000)
$ = jQuery;

function getIcons(){
	if(typeof trackList != 'undefined'){
		if($('#loading-download').length == 0)
			$('.no-remixes').after('<li id="loading-download"><a>Loading links... <img src="/images/ajax-loader-directory.gif"></img></a></li>').hide();

		for(var i=0, l=trackList[document.location.href].length;i<l;i++){
			var id = trackList[document.location.href][i].id;
			if($('#section-track-'+id).find('.downdiv').length == 0){
				$('#loading-download').show();
				$.ajax({
					url: '/serve/source/' + trackList[activeList][i].id + '/' + trackList[activeList][i].key,
					success: function(data){
						var url = data.url,
							id = data.itemid,
							trackname = $('#section-track-'+id).find('.track_name').text().replace(/\s{2,}/g,'').replace('-', ' - ');
						$('#section-track-'+id).find('.favdiv').after('<li class="downdiv"><a class="down_'+id+'" href="'+url+'" download="'+trackname+'.mp3"title="Download: '+trackname+'"><img height="18px" src="http://i.imgur.com/I6EYM.png"> </a></li>');
						//console.log(trackname+' -> '+url);
						$('#loading-download').hide();
					}
				});
			}
		}
	}
}


