$(function() {
    p = new Pen("etchcanvas");
       
    p.arc = function(r,fa,ta){
      var a,
          x = this.x,
          y = this.y;
      if(fa<ta){
        this.penup().polar(r,ta).pendown();
        for (a=fa; a < ta; a++){
          this.polar(r,a);
        }
      }
      else{
        this.penup().polar(r,fa).pendown();
        for (a=ta; a < fa; a++){
          this.polar(r,a);
        }
      }
      this.penup().goto(x,y).pendown(); //I hope there is a way to do this with jump, to save pendowns and shit
      return this;
    }
    
    p.arcdelta = function(r,a){
      this.begin().arc(r,0,a).turn(a).close();
      return this;
    }
    
    p.arcmove = function(fr,tr){
      var x = this.x,
          y = this.y;
      this.penup().go(fr).pendown().go(tr-fr);
      this.penup().goto(x,y).pendown(); 
      return this;
    }
    
    p.arcmovedelta = function(fr,r){
      this.begin().arcmove(fr,fr+r).close();
      return this;
    }
    
    
    p.clearCanvas = function(data){
      var p = this.pen,
          x = this.x,
          y = this.y;
      this.fillstyle('rgba(150,150,150,0.1)');
      this.penstyle('rgba(150,150,150,0.1)');
      this.jump(0,0).right(this.canvas.canvas.offsetWidth).down(this.canvas.canvas.offsetHeight).left(this.canvas.canvas.offsetWidth).up(this.canvas.canvas.offsetHeight).close().draw().jump(x,y);
      this.penstyle('#111');
      this.pen = p;
      return this;
    }
    
    p.resetPosition = function(){
        this.jump(p.canvas.canvas.width/2,p.canvas.canvas.height/2); //Move origin to the center
        return this;
    }
    
    
    //INIT
    
    //p.canvas.scale(0.5, 0.5);
    //p.canvas.translate(-500, -200);
    
    //pretty lines
    //p.canvas.translate(.5, .5);
    
    p.pendown()
    for(var wawa=0;wawa<30;wawa++){
        p.clearCanvas();
    }
    
    p.resetPosition().origin(); //Initialize polar coordinates
    
    
    var rad = 1,
        clrtimeout,
        favtimeout;
        
    setInterval(function(){
        var keys = KeyboardJS.activeKeys();
        
        if(keys.length) {
            var s = 1;
            if(keys.indexOf('up') != -1){
                p.arcmovedelta(rad,s).stroke();
                if(rad<p.canvas.canvas.offsetWidth/2-1)
                    rad += s;
            }
            if(keys.indexOf('down') != -1){
                p.arcmovedelta(rad,-s).stroke();
                if(rad>0)
                    rad -= s;
            }
                
            if(keys.indexOf('left') != -1){
                p.arcdelta(rad,-s).stroke();
            }
                
            if(keys.indexOf('right') != -1){
                p.arcdelta(rad,s).stroke();
            }
         
            if(!favtimeout)
                favtimeout = setTimeout(faviconHandler, 2000);
        }
        
    }, 5);
    
    // Slow response bindings:
    KeyboardJS.bind.key('c+l+r',function(){},function(){p.clearCanvas();p.clearCanvas();p.clearCanvas();}); //It only is being called after the combo is tapped. TO DO fix the usage of this shit anonymous function and just call p.clearCanvas... i get Uncaught TypeError: Object #<Object> has no method
    KeyboardJS.bind.key('r+s+t',function(){p.arcmovedelta(rad,-rad).stroke(); rad=1;});
    
    //Set favicon as the current content in the canvas
    function faviconHandler(){
        var data64 = $('#etchcanvas')[0].toDataURL();
        $('#favicon').attr('href',data64);
        clearTimeout(favtimeout);
        favtimeout = null;
    }
    
    $('#le-save').click(function(){
        share($('#etchcanvas')[0]);
        //var data64 = $('#etchcanvas')[0].toDataURL();
        //window.open(data64, "_blank");
    });
});

function share(canvas){
    var img = canvas.toDataURL('image/png').split(',')[1];

    
    // open the popup in the click handler so it will not be blocked
    // upload to imgur using jquery/CORS
    // https://developer.mozilla.org/En/HTTP_access_control
    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            type: 'base64',
            // get your key http://imgur.com/register/api_anon
            key: '2bc53cac346e4e96f9e4f5455d09483f',
            name: 'le_image.png',
            title: $('#imgtitle').val() || 'poletchasketch.png',
            caption: 'Created with Poletch-a-sketch by @davoclavo',
            image: img
        },
        dataType: 'json'
    }).success(function(data) {
        console.dir(data);
        var w = window.open(' ', "_blank");
        w.location.href = data['upload']['links']['original'];
    }).error(function() {
        alert('Could not reach api.imgur.com. Sorry :(');
        w.document.close();
    });
}





