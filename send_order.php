<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $subject = $_POST["subject"];
    $contactEmail = $_POST["contact_email"];
    $message = $_POST["message"];
    $serviceName = $_POST["service_name"];

    // Set recipient email address
    $to = "mdkamruzzaman.shishir@outlook.com";

    // Set email subject
    $emailSubject = "New Order for Service: $serviceName";

    // Compose the email message
    $emailMessage = "Subject: $subject\n";
    $emailMessage .= "Contact Email: $contactEmail\n";
    $emailMessage .= "Service Name: $serviceName\n";
    $emailMessage .= "Message:\n$message";

    // Send the email
    $headers = "From: $contactEmail";

    if (mail($to, $emailSubject, $emailMessage, $headers)) {
        echo "Your order has been submitted successfully. We will get in touch with you shortly.";
    } else {
        echo "Failed to submit your order. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
