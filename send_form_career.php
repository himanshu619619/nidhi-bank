<?php

//  print_r($_POST); exit();
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "himanshu@7continentsmedia.com, admin@bfssnidhi.in";
    $email_subject= "BFSS Contact Detail Fill by contact form";
 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
 
    // // validation expected data exists
    // if(!isset($_POST['name']) ||
    //     !isset($_POST['phone']) ||
    //     !isset($_POST['email']) ||
    //     !isset($_POST['message'])) {
    //     died('We are sorry, but there appears to be a problem with the form you submitted.');       
    // }
 
    $uploaddir = 'uploads/';
    $uploadfile = $uploaddir . basename($_FILES['resume']['name']);

    echo '<pre>';
    if (move_uploaded_file($_FILES['resume']['tmp_name'], $uploadfile)) {
        // echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo "Possible file upload attack!\n";
    }

   
 


    $first_name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
 
    $mobile = $_POST['mobile'];
    $total_experience = $_POST['total_experience'];
    $current_ctc = $_POST['current_ctc'];
    $since = $_POST['since'];
    $current_organization = $_POST['current_organization'];
    $current_grade = $_POST['current_grade'];
    $current_role = $_POST['current_role'];
    $year_of_passing = $_POST['year_of_passing'];
    $highest_qualification = $_POST['highest_qualification'];
    $preferred_location = $_POST['preferred_location'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];
    $resume = $_FILES['resume']['name'];




    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The Name you entered does not appear to be valid.<br />';
  }
 
//   if(!preg_match($string_exp,$mobile)) {
//      $error_message .= 'The mobiles you entered does not appear to be valid.<br />';
//   }
 
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= " Name: ".clean_string($first_name)."\n";
    $email_message .= "Mobile: ".clean_string($mobile)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "current_ctc: ".clean_string($current_ctc)."\n";
    $email_message .= "since: ".clean_string($since)."\n";
    $email_message .= "current_organization: ".clean_string($current_organization)."\n";
    $email_message .= "current_grade: ".clean_string($current_grade)."\n";
    $email_message .= "current_role: ".clean_string($current_role)."\n";
    $email_message .= "year_of_passing: ".clean_string($year_of_passing)."\n";
    $email_message .= "highest_qualification: ".clean_string($highest_qualification)."\n";
    $email_message .= "preferred_location: ".clean_string($preferred_location)."\n";
    $email_message .= "city: ".clean_string($city)."\n";
    $email_message .= "state: ".clean_string($state)."\n";
    $email_message .= "country: ".clean_string($country)."\n";
    $email_message .= "resume: ".clean_string($resume)."\n";
    $email_message .= "total_experience: /uploads/".clean_string($total_experience)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_to, $email_subject, $email_message, $headers);  
exit();
// header("Location:https://navjeevanayush.org");
}
?>


