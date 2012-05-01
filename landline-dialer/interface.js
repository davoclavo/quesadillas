var telephone = new Telephone();

$(function() {
	$('#le-dial').click(function(){
		telephone.dial($('#le-number').val());
	})
});