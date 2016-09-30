$(document).ready(function () {
	//Replace the html in the title
	$('#edit-header').html('The jQuery Challenge');

	//Make box1 green
	$('#box1').css('background-color','green');

	//Change the style of paragraph 1 to bold, larger font
	$('#para1').css({'font-weight':'bold','font-size':'24px'});

	//Adds the spin class to box2 to add the spin animation
	$('.box2').addClass('spin');

	//Bind alert function to button1 click events
	$('#button1').click(function(){
		alert('The button has been clicked!');
	});

	//Change color of box3 to green whenever cursor enters the box
	$('#box3').mouseenter(function(){
		$('#box3').css('background-color','green');
	});

	//Change color back to red when the cursor leaves
	$('#box3').mouseleave(function(){
		$('#box3').css('background-color','red');
	})

	//Log value to console whenever input1 receives an input
	$('#input1').on('input',function(){
		console.log($('#input1').val());
	})

	//Starts a jQuery animation whenever the mouse enters the box 
	$('#box4').mouseenter(function(){
		//If the box only moves once:
		// $('#box4').unbind('mouseenter'); //Unbind this function so that the box can only be moved once
		// $('#box4').animate({'top':'150px','left':'400px'}, 2000,function(){});
		
		//If you want the box to move back and forth:
		if($('#box4').css('left') == '0px'){
			$('#box4').animate({'top':'150px','left':'400px'}, 2000);
		} else if($('#box4').css('left') == '400px'){
			$('#box4').animate({'top':'0px','left':'0px'}, 2000);
		}
	})
});