	var menu, mainTotal = 0; 
  function onDiscCoupCode(evt) {
	  var selectedCoupon = $('#selCoupon').val();
	  var total = mainTotal;
	  if( (selectedCoupon && selectedCoupon === "30") && total < 1000) {
		  $('#selCoupon').prop('selectedIndex',0);
		  alert("30% Discount available only on total order of 1000 and more");
	  }
	  else {
		  total = total - (total * selectedCoupon / 100);
		  $('#total').html(total);
	  }
  }
  
  function onSubmit() {
	  var customerName = $('#custName').val();
	  var customerAddress = $('#custAddress').val();
	  var totalPrice = $('#total').html();
	  var disCoupon = $('#selCoupon').val();
	  
	 if (totalPrice == 0 || customerName == null || customerName == "" || customerAddress == null || customerAddress == "") {
        alert('Please enter your details.');
    }else {
      var orders = getAllRecords();
	  var jsonString = JSON.stringify(orders)
	   var request = $.ajax({
        url: "server/process_order.php",
        type: "post",
        data: {data: jsonString,name: customerName,address: customerAddress, coupon: disCoupon, tolPrice: totalPrice},
		success : function () { 
			alert('Your order will be delivered in 30 minutes')
		},
		error: function() {
			alert('Opps..Submission failed. Please try again later.');
		}
	});
    }
	  
  }
  
  function calculateTotal() {
	$('#selCoupon').prop('selectedIndex',0);
	var total = 0;
	$.each( menu, function( key, val ) {
		var qty = $('#' + key + '_qty').val()
	 total += val.price * $('#' + key + '_qty').val();
	});
	mainTotal = total;
	$('#total').html(total);
}

function getAllRecords()
{
	var finalOrder = [];
	$.each( menu, function( key, val ) {
		var qty = $('#' + key + '_qty').val();
		if(qty > 0) {
			finalOrder.push(
			{
				'name': val.name,
				'price': val.price,
				'qty': qty
			});
		}
	});
	return finalOrder;
}