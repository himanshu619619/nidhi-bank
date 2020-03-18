<?php include 'header.php'; ?>

<div class="container ">
<div class="row" style="margin: 5% auto;">

	<div class="col-md-6 " >
	<form action="send_form_email.php" method="post">

<div class="form-group">
    <label for="exampleInputPassword1">Message</label>
  <textarea class="form-control" placeholder="Enter Message" name="message">  </textarea>
  </div>
		  <div class="form-group">
    <label for="exampleInputPassword1">Name</label>
    <input type="text" class="form-control" name="name" id="exampleInputPassword1" placeholder="Name">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mobile</label>
    <input type="text" class="form-control" name="phone" id="exampleInputPassword1" placeholder="Mobile">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
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