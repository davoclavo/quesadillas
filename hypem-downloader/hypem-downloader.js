
(function($){
    setInterval(getIcons,1000)
    function getIcons(){
        var trackList = displayList['tracks']
        if(typeof trackList != 'undefined' && !displayList['downloads']){
            if($('#loading-download').length == 0)
                $('<li id="loading-download"><a><img src="/images/ajax-loader-directory.gif"></img></a></li>').appendTo('#submenu').hide()

            for(var i=0, l=trackList.length;i<l;i++){
                var id = trackList[i].id
                if($('#section-track-'+id).find('.downdiv').length == 0){
                    $('#loading-download').show()
                    $.ajax({
                        url: '/serve/source/' + trackList[i].id + '/' + trackList[i].key,
                        success: function(data){
                            var url = data.url,
                                id = data.itemid,
                                trackname = $('#section-track-'+id+' .track_name').text().replace(/\s{2,}/g,'').replace('-', ' - ')
                            if($('#section-track-'+id+' .downtrack').length == 0)
                                $('#section-track-'+id+' .tools').append('<a class="dragout" id="down_'+id+'" href="'+url+'" download="'+trackname+'.mp3"title="Drag me! - Download: '+trackname+'" data-downloadurl="audio/mpeg:'+trackname+'.mp3:'+url+' draggable="true"> <img height="18px" src="http://i.imgur.com/I6EYM.png"></a>')
                                $('#section-track-'+id+' .dragout')[0].addEventListener('dragstart', function(e) {
                                                                        e.dataTransfer.setData('DownloadURL', this.dataset.downloadurl)
                                                                      }, false)
                            //console.log(trackname+' -> '+url)
                            $('#loading-download').hide()
                        }
                    })
                }
            }
            displayList['downloads'] = true
        }
    }
})(jQuery)