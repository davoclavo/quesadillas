var telephone = new Telephone();

$(function() {
	$('.le-dial').click(function(){
		telephone.dial($('#le-'+$(this).attr('what')).val());
	});

	var number = '';
	$('.menu').click(function(){
		var el = $(this);
		number = $(this).attr('num') + number;
		if(el.hasClass('parent')){
			console.log(number);
			$('#le-telephone').val(number);
			number = '';
		}
	});
});