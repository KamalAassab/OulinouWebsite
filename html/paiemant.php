<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <link rel="icon" href="../assets/images/logo-alt.png">
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--link rel="stylesheet" href="../css/pay.css"-->
<!--link rel="stylesheet" href="../css/check.css"-->
 <link rel="stylesheet" href="../css/style.css">
 <link rel="stylesheet" href="../css/pay.css">
 <link rel="stylesheet" href="../css/icons.css">
 <script src="../js/icon-replacer.js" defer></script>
<!--link rel="stylesheet" href="../css/nav.css"-->
  <title>Payment Page</title>
</head>
<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>
  <!--div class="container">
    <header>
        <a href="#"><img src="../image/logo.png"  class="logo" alt="logo" width="150px"></a>
        <ul id="navbar">
            

            <li><a href="../index.html" target="_blank"><i class="fa-solid fa-house"></i>&nbsp;Home</a></li>
            <li><a href="html/products.html" target="_parent"><i class="fa-solid fa-shop"></i>&nbsp;&nbsp;Shop</a></li>
            <li><a href="aboutus.html" target="_blank"><i class="fa-solid fa-circle-info"></i>&nbsp;About us</a></li>
            <li><a href="contact.html" target="_blank"><i class="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;&nbsp;Sign in</a></li>
            <li><a href="" target="_blank"><i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;Cart</a></li>
        </ul>
    </header>
</div-->

      <div class="payment-container">
        <h1>Complete Your Payment</h1>
        <form action="payment-confirmation.html" method="POST" class="payment-form">
          <h2>Shipping Information</h2>
          <div class="form-group">
              <label for="fullName">Full Name :</label>
              <input type="text" id="fullName" name="fullName" placeholder="Hiba AKDIM" required>
          </div>
          <div class="form-group">
              <label for="email">Email Address :</label>
              <input type="email" id="email" name="email" placeholder="exemple@gmail.com">
          </div>
          <div class="form-group">
              <label for="phone">Phone Number :</label>
              <input type="tel" id="phone" name="phone" placeholder="+212 6(5)......">
          </div>
          <div class="form-group">
              <label for="address">Shipping Address :</label>
              <input type="text" id="address" name="address" placeholder="Derb Sultan....">
          </div>
          <div class="form-group">
              <label for="city">City :</label>
              <input type="text" id="city" name="city"placeholder="Casablanca" required>
          </div>
          
          <div class="form-group">
              <label for="PC">Postal Code :</label>
              <input type="text" id="zip" name="zip" placeholder="20100" required>
          </div>
          <div class="form-group">
              <label for="country">Country :</label>
              <select id="country" name="country" required>
                  <option value="">Select Country</option>
                  <option value="Morroco">Morroco</option>
                  <option value="UAE">Canada</option>
                  <option value="France">United Kingdom</option>
                  <!-- Add more countries as needed -->
              </select>
          </div>
       <legend class="pay-legend">Payment Details</legend>
<div class="credit">
    <img src="../assets/images/payment-amex.png" alt="amex">
    <img src="../assets/images/payment-visa.png" alt="visa">
    <img src="../assets/images/payment-mastercard.png" alt="master">

</div>
       
        <label for="cardname">Name on Card :</label>
        <input type="text" id="cardname" name="cardname" placeholder="Hiba AKDIM" required>
<br><br>
        <label for="cardnumber">Card Number :</label>
        <input type="text" id="cardnumber" name="cardnumber" placeholder="3333-6666-5555-4444" required maxlength="19">
<br><br>
<label for="expdate" class="Expiration">Expiration Date :</label>
<div class="date-selector">
   
    <select id="expmonth" name="expmonth" required>
        <option value="" disabled selected>MM</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
    </select>

   
    <select id="expyear" name="expyear" required>
        <option value="" disabled selected>YY</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
        <option value="33">33</option>
        <option value="34">34</option>
        <option value="35">35</option>
    </select>
</div>
<br>
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" name="cvv" placeholder="123" required maxlength="3">
    <br><br>

      <!-- Submit Button -->
      <button type="submit" class="pay-btn">Pay Now</button>
    </form>
  </div>
</body>
<?php include 'footer.php'; ?>
</html>
