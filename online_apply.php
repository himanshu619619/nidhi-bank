<?php include 'header.php'; ?>

<div class="fluid-container ">
<div class="row">
<div class="col-md-12">
<img src="img/contact.jpg" alt="" style="width:100%;"> 
</div>
</div>
</div>
<div class="fluid-container ">
<div class="row text-center" >
<div class="col-md-12 text-center" >
<BR>
<!-- <h2>Carrers</h2> -->
<h3>
</h3>
            <p>
            Please fill in the following form to apply for our products and services. Our executives
            will get in touch with you to help you out.</p>
            
</div>
</div>
</div>
<div class="container ">
<div class="row" style="margin: 5% auto;">
<div class="col-md-2 " >
</div>

	<div class="col-md-8 " >
	<form method="post" id="contact">
<h2> Please fill in the below details.</h2>

  

		  <div class="form-group">
    <label for="exampleInputPassword1">Name</label>
    <input type="text" class="form-control" name="name" id="exampleInputPassword1" placeholder="Enter Name">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mobile</label>
    <input type="number" class="form-control" name="phone"  id="exampleInputPassword1" placeholder=" Enter Mobile">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email address">
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">City </label>
    <input type="text" name="city" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter City">
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>
  
  <p style="display:none;" class="alert alert-success shows">Success! </p>


 
  <button type="submit" class="btn btn-primary" style="background: #026060;">Submit</button>
</form>
	</div>

    <div class="col-md-2 " >
</div>




</div></div>

<?php include 'footer.php'; ?>


<script>
$('form#contact').submit(function(e) {

var form = $(this);

e.preventDefault();

$.ajax({
type: "POST",
url: "send_form_online.php",
dataType: "html",
data: form.serialize(),
success : function(data){
  $(".shows").show();
  $(".shows").fadeOut(6000);

} ,
        error: function() { alert("Error posting feed."); }

});


}); 


</script>