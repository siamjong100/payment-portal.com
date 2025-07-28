<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>সিকিউর পেমেন্ট পোর্টাল</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1><i class="fas fa-lock"></i> সিকিউর পেমেন্ট পোর্টাল</h1>
    
    <div id="authSection">
      <div id="loginForm">
        <div class="form-group input-icon">
          <i class="fas fa-mobile-alt"></i>
          <label for="loginPhone">মোবাইল নাম্বার</label>
          <input type="tel" id="loginPhone" placeholder="01XXXXXXXXX" maxlength="11" pattern="[0-9]{11}" required>
        </div>
        <div class="form-group input-icon">
          <i class="fas fa-key"></i>
          <label for="loginPass">পাসওয়ার্ড</label>
          <input type="password" id="loginPass" placeholder="আপনার পাসওয়ার্ড" required>
        </div>
        <div class="remember-me">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">আমাকে মনে রাখুন</label>
        </div>
        <button onclick="login()"><i class="fas fa-sign-in-alt"></i> লগইন করুন</button>
        <p class="auth-toggle">নতুন একাউন্ট? <a href="#" onclick="showSignup(); return false;">সাইন আপ করুন</a></p>
        <p class="auth-toggle"><a href="#" onclick="showForgotPassword(); return false;">পাসওয়ার্ড ভুলে গেছেন?</a></p>
      </div>
      
      <div id="signupForm" style="display:none;">
        <div class="form-group input-icon">
          <i class="fas fa-mobile-alt"></i>
          <label for="signupPhone">মোবাইল নাম্বার</label>
          <input type="tel" id="signupPhone" placeholder="01XXXXXXXXX" maxlength="11" pattern="[0-9]{11}" required>
        </div>
        <div class="form-group">
          <label for="signupPass">পাসওয়ার্ড</label>
          <input type="password" id="signupPass" placeholder="পাসওয়ার্ড তৈরি করুন" required oninput="checkPasswordStrength(this.value)">
          <div class="password-strength">
            <div id="strengthMeter" class="strength-meter"></div>
          </div>
          <div id="strengthText" class="strength-text"></div>
          <div class="password-instructions">
            পাসওয়ার্ডে ন্যূনতম ৮ অক্ষর, বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষর (!@#$%^&*) থাকতে হবে
          </div>
        </div>
        <div class="form-group">
          <label for="captchaInput">কেপচা লিখুন</label>
          <div class="captcha-container">
            <div id="captchaDisplay" class="captcha-code"></div>
            <i class="fas fa-sync-alt refresh-captcha" onclick="refreshCaptcha()"></i>
          </div>
          <input type="text" id="captchaInput" placeholder="উপরের কেপচা লিখুন" required>
        </div>
        <button onclick="signup()"><i class="fas fa-user-plus"></i> সাইন আপ করুন</button>
        <p class="auth-toggle">ইতিমধ্যে একাউন্ট আছে? <a href="#" onclick="showLogin(); return false;">লগইন করুন</a></p>
      </div>

      <div id="forgotPasswordForm" style="display:none;">
        <h2><i class="fas fa-key"></i> পাসওয়ার্ড রিসেট</h2>
        <div class="form-group input-icon">
          <i class="fas fa-mobile-alt"></i>
          <label for="forgotPhone">মোবাইল নাম্বার</label>
          <input type="tel" id="forgotPhone" placeholder="01XXXXXXXXX" maxlength="11" pattern="[0-9]{11}" required>
        </div>
        <button onclick="sendOtp()"><i class="fas fa-paper-plane"></i> OTP পাঠান</button>
        <p class="auth-toggle"><a href="#" onclick="showLogin(); return false;">লগইন পৃষ্ঠায় ফিরে যান</a></p>
      </div>

      <div id="otpVerificationForm" style="display:none;">
        <h2><i class="fas fa-mobile-alt"></i> OTP যাচাইকরণ</h2>
        <p style="text-align: center; margin-bottom: 1rem;">আপনার মোবাইল নাম্বারে পাঠানো ৬ ডিজিটের OTP লিখুন</p>
        <div class="otp-container">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 1)">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 2)">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 3)">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 4)">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 5)">
          <input type="text" class="otp-input" maxlength="1" oninput="moveToNext(this, 6)">
        </div>
        <div class="resend-otp">
          OTP পাননি? <a href="#" onclick="resendOtp(); return false;">পুনরায় পাঠান</a>
          <div id="otpTimer" style="margin-top: 0.5rem;"></div>
        </div>
        <button onclick="verifyOtp()"><i class="fas fa-check-circle"></i> যাচাই করুন</button>
      </div>

      <div id="resetPasswordForm" style="display:none;">
        <h2><i class="fas fa-key"></i> নতুন পাসওয়ার্ড সেট করুন</h2>
        <div class="form-group">
          <label for="newPassword">নতুন পাসওয়ার্ড</label>
          <input type="password" id="newPassword" placeholder="নতুন পাসওয়ার্ড" required>
          <div class="password-strength">
            <div id="newStrengthMeter" class="strength-meter"></div>
          </div>
          <div id="newStrengthText" class="strength-text"></div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input type="password" id="confirmPassword" placeholder="পাসওয়ার্ড নিশ্চিত করুন" required>
        </div>
        <button onclick="resetPassword()"><i class="fas fa-save"></i> পাসওয়ার্ড সেভ করুন</button>
      </div>
    </div>
    
    <div id="paymentSection" style="display:none;">
      <div class="user-profile">
        <div class="user-avatar" id="userAvatar"></div>
        <div class="user-info">
          <h3 id="userName"></h3>
          <p id="userPhone"></p>
        </div>
        <button class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> লগআউট</button>
      </div>

      <div class="tab-container">
        <div class="tabs">
          <div class="tab active" onclick="switchTab('paymentTab')">পেমেন্ট</div>
          <div class="tab" onclick="switchTab('historyTab')">ইতিহাস</div>
          <div class="tab" onclick="switchTab('profileTab')">প্রোফাইল</div>
        </div>

        <div id="paymentTab" class="tab-content active">
          <h2><i class="fas fa-money-bill-wave"></i> পেমেন্ট করুন</h2>
          
          <div class="payment-info">
            <div class="form-group">
              <label for="paymentMethod">পেমেন্ট মেথড</label>
              <div class="payment-methods">
                <div class="payment-method active" onclick="selectPaymentMethod('bkash')">
                  <i class="fas fa-mobile-alt"></i>
                  <span>বিকাশ</span>
                </div>
                <div class="payment-method" onclick="selectPaymentMethod('nagad')">
                  <i class="fas fa-wallet"></i>
                  <span>নগদ</span>
                </div>
                <div class="payment-method" onclick="selectPaymentMethod('rocket')">
                  <i class="fas fa-rocket"></i>
                  <span>রকেট</span>
                </div>
              </div>
              <input type="hidden" id="paymentMethod" value="bkash">
            </div>
            
            <div class="amount-input">
              <label for="amount">পেমেন্ট পরিমাণ (টাকা)</label>
              <input type="number" id="amount" placeholder="100" min="1" required>
            </div>
            
            <div class="qr-code hidden" id="qrCodeSection">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment_qr_code" alt="QR Code">
              <p class="qr-instructions">উপরের QR কোড স্ক্যান করে পেমেন্ট সম্পন্ন করুন</p>
            </div>
            
            <p id="paymentNumberText">
              বিকাশ নাম্বার: 
              <span class="payment-number" id="paymentNumber">01630537613</span>
              <button onclick="copyNumber()" style="width: auto; display: inline-block; padding: 0.5rem 1rem; margin-left: 10px;"><i class="fas fa-copy"></i> কপি</button>
            </p>
            
            <div class="form-group">
              <label for="trxId">ট্রানজেকশন আইডি</label>
              <input type="text" id="trxId" placeholder="TRX123456789" required>
            </div>
            <div class="form-group">
              <label for="last4">আপনার নাম্বারের শেষ ৪ সংখ্যা</label>
              <input type="text" id="last4" placeholder="XXXX" maxlength="4" pattern="[0-9]{4}" required>
            </div>
            <button onclick="submitPayment()"><i class="fas fa-paper-plane"></i> পেমেন্ট সাবমিট করুন</button>
            
            <div id="timer" style="display:none;"></div>
            <div id="statusMsg"></div>
          </div>
          
          <a href="#" id="downloadReceipt" class="download-receipt" onclick="downloadReceipt(); return false;"><i class="fas fa-download"></i> পেমেন্ট রসিদ ডাউনলোড করুন</a>
        </div>

        <div id="historyTab" class="tab-content">
          <h2><i class="fas fa-history"></i> পেমেন্ট ইতিহাস</h2>
          <div class="form-group">
            <label for="historyFilter">ফিল্টার</label>
            <select id="historyFilter" onchange="filterHistory()">
              <option value="all">সব পেমেন্ট</option>
              <option value="successful">সফল পেমেন্ট</option>
              <option value="failed">ব্যর্থ পেমেন্ট</option>
              <option value="last7days">গত ৭ দিন</option>
              <option value="last30days">গত ৩০ দিন</option>
            </select>
          </div>
          <div id="history" style="margin-top: 20px;"></div>
        </div>

        <div id="profileTab" class="tab-content">
          <h2><i class="fas fa-user-circle"></i> প্রোফাইল</h2>
          <div class="form-group">
            <label for="profilePhone">মোবাইল নাম্বার</label>
            <input type="text" id="profilePhone" readonly>
          </div>
          <div class="form-group">
            <label for="profileEmail">ইমেইল (ঐচ্ছিক)</label>
            <input type="email" id="profileEmail" placeholder="আপনার ইমেইল">
          </div>
          <div class="form-group">
            <label for="profileName">নাম (ঐচ্ছিক)</label>
            <input type="text" id="profileName" placeholder="আপনার নাম">
          </div>
          <button onclick="updateProfile()"><i class="fas fa-save"></i> আপডেট করুন</button>
          
          <h3 style="margin-top: 2rem;"><i class="fas fa-lock"></i> পাসওয়ার্ড পরিবর্তন</h3>
          <div class="form-group">
            <label for="currentPassword">বর্তমান পাসওয়ার্ড</label>
            <input type="password" id="currentPassword" placeholder="বর্তমান পাসওয়ার্ড">
          </div>
          <div class="form-group">
            <label for="newProfilePassword">নতুন পাসওয়ার্ড</label>
            <input type="password" id="newProfilePassword" placeholder="নতুন পাসওয়ার্ড">
            <div class="password-strength">
              <div id="profileStrengthMeter" class="strength-meter"></div>
            </div>
            <div id="profileStrengthText" class="strength-text"></div>
          </div>
          <div class="form-group">
            <label for="confirmProfilePassword">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input type="password" id="confirmProfilePassword" placeholder="পাসওয়ার্ড নিশ্চিত করুন">
          </div>
          <button onclick="changePassword()"><i class="fas fa-key"></i> পাসওয়ার্ড পরিবর্তন করুন</button>
        </div>
      </div>
      
      <div class="support">
        <p><i class="fas fa-headset"></i> সাহায্যের জন্য কল করুন: <a href="tel:01630537613">01630537613</a></p>
        <div class="support-icons">
          <a href="https://wa.me/8801630537613" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="https://t.me/payment_support" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>
          <a href="mailto:support@paymentportal.com" title="Email"><i class="fas fa-envelope"></i></a>
          <a href="#" title="Live Chat"><i class="fas fa-comment-dots"></i></a>
        </div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
