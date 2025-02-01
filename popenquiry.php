<form action="mail.php" method="post" class="packageenquiry">
    <h3>Grap Special Offers & Deals</h3>
    <p>Get professional tips for your journeys and find new ideas.</p>
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="images/user.webp" alt="user"></span>
        </div>
        <input type="text" name="name" class="form-control " placeholder="Enter Your Name*" required="">
    </div>
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="images/email.webp" alt="email"></span>
        </div>
        <input type="email" name="email" class="form-control" placeholder="Enter Your Email*" required="">
    </div>
    <!--<label>Enter Your Number <span style="color:red;">*</span></label>-->
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <span class="input-group-text innerpad"><img src="images/india-flag.webp" alt="india-flag"></span>
        </div>
        <div class="form-number">
            <span> &nbsp; +91</span>
        </div>
        <input type="tel" name="phone" class="form-control  noword" placeholder="Enter phone number" minlength="10" maxlength="10" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" required="">
    </div>
    <!--<label>Enter Your Area <span style="color:red;">*</span></label>-->
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="images/map.webp" alt="map"></span>
        </div>
            <input type="text" name="city" class="form-control " placeholder="Enter Your Area*" required="">
    </div>
    <!--<label>Enquiry About (Optional)</label>-->
    <div class="input-group mb-2">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="images/enquiry.webp" alt="enquiry"></span>
        </div>
            <input type="text" name="message" class="form-control " placeholder="Enter Your Message (Optional)">
    </div>
    <div class="row justify-content-center">
        <div class="col-md-12">
    <input type="submit" name="submit" class="form-control cssForms mb-2 btn btn-primary" value="Submit &amp; Get A Call Back ">
    </div>
    </div>
</form>