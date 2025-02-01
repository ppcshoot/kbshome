<?php
ini_set('display_errors', 'Off');

if (isset($_POST["submit"])) {
    $fields = [
        'name' => 'Name',
        'email' => 'Email',
        'phone' => 'Phone',
        'traveltime' => 'Travel Time',
        'adult' => 'Adult',
        'child' => 'Child',
        'infant' => 'Infant',
        'itinerarysent' => 'Request Your Itinerary',
        'requirement' => 'Requirement',
        'person' => 'Person',
        'city' => 'City',
        'message' => 'Message',
        'modal' => 'Form',
    ];

    
    $phoneNumber = '';
    for ($i = 1; $i <= 10; $i++) {
        $key = "tel$i";
        if (!empty($_POST[$key])) {
            $phoneNumber .= htmlspecialchars(trim($_POST[$key]));
        }
    }
    if (!empty($phoneNumber)) {
        $fields['phone'] = 'Phone Number';
    }

   
    $requirements = [];
    $checkboxFields = ['Visa', 'Flight', 'Travel Insurance', 'Hotel', 'Activities', 'Transfer', 'Airport', 'Others'];
    foreach ($checkboxFields as $checkbox) {
        if (!empty($_POST[$checkbox])) {
            $requirements[] = htmlspecialchars(trim($_POST[$checkbox]));
        }
    }
    if (!empty($requirements)) {
        $_POST['requirement'] = implode(', ', $requirements);
    }


    $submittedFields = [];
    foreach ($fields as $field => $label) {
        if ($field === 'phone' && !empty($phoneNumber)) {
            $submittedFields[] = "$label: $phoneNumber";
        } elseif (!empty($_POST[$field])) {
            $submittedFields[] = "$label: " . htmlspecialchars(trim($_POST[$field]));
        }
    }

    $mailBody = implode('<br>', $submittedFields);

    // Prepare email headers
    $to = "servosez@gmail.com, bookmyagency.in@gmail.com"; 
    $subject = "New Form Submission - Gayatri Industry";

    $headers = "From: Gayatri Industry <servosez@servosez.com>\r\n"; // Use a domain email
    $headers .= "Reply-To: servosez@servosez.com\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $mailBody, $headers)) {
        echo "<script>window.location.replace('https://servosez.com/thankyou.php')</script>";
    } else {
        echo "<script>alert('Please try again!')</script>";
        echo "<script>window.location.replace('https://servosez.com/')</script>";
    }
}
?>
