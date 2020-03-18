<?php include 'header.php'; ?>

<div class="container ">
<div class="row" style="margin: 5% auto;">

	<div class="col-md-6 " >
	<form id="contact" action="" method="POST" >
  <p style="display:none;" class="alert alert-success shows">Success! </p>
<div class="form-group">
    <label for="exampleInputPassword1">Message</label>
  <textarea class="form-control" placeholder="Enter Message" name="message" rows="5" required>  </textarea>
  </div>
		  <div class="form-group">
    <label for="exampleInputPassword1">Name</label>
    <input type="text" class="form-control" name="name" id="exampleInputPassword1" placeholder="Name" required>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mobile</label>
    <input type="text" class="form-control" name="phone" id="exampleInputPassword1" placeholder="Mobile" required>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>

 
  <button type="submit" class="btn btn-primary" style="background: #026060;">Submit</button>
 
</form>
	</div>

<div class="col-md-6" style="margin-top: 5rem">
	<h2 class="">CONTACT US</h2>
<br><strong>Call:</strong> 1800-419-5959
<br>to get your Account Balanc
	</div>


</div></div>



<?php include 'footer.php'; ?>

<script>
$('form#contact').submit(function(e) {

var form = $(this);

e.preventDefault();

$.ajax({
type: "POST",
url: "send_form_email.php",
dataType: "html",
data: form.serialize(),
success : function(data){
  $(".shows").show();

} ,
        error: function() { alert("Error posting feed."); }

});


}); 


</script>