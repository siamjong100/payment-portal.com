// অ্যাপ্লিকেশন স্টেট
const state = {
  loggedIn: false,
  userPhone: "",
  userName: "",
  userEmail: "",
  paymentDB: JSON.parse(localStorage.getItem("paymentDB")) || [],
  userDB: JSON.parse(localStorage.getItem("userDB")) || {},
  timerInterval: null,
  currentPayment: null,
  otp: "",
  otpExpiry: 0,
  currentTab: "paymentTab",
  currentMethod: "bkash"
};

// কনফিগারেশন
const config = {
  paymentNumbers: {
    bkash: "01630537613",
    nagad: "01830537613",
    rocket: "01930537613"
  },
  sessionTimeout: 300, // 5 minutes in seconds
  successRate: 0.8, // 80% success chance
  otpExpiry: 300 // 5 minutes in seconds
};

// DOM লোড হলে ইভেন্ট লিসেনার যোগ করুন
document.addEventListener("DOMContentLoaded", function() {
  // কেপচা ডিসপ্লে সেট করুন
  refreshCaptcha();
  
  // এন্টার কী প্রেস ইভেন্ট
  setupEnterKeyEvents();
  
  // সেশন চেক করুন
  checkSession();

  // OTP ইনপুট ফোকাস
  document.querySelectorAll('.otp-input')[0]?.focus();
});

// OTP ইনপুট ফোকাস ম্যানেজমেন্ট
function moveToNext(input, nextIndex) {
  if (input.value.length === 1) {
    const nextInput = document.querySelectorAll('.otp-input')[nextIndex];
    if (nextInput) {
      nextInput.focus();
    }
  }
}

// এন্টার কী ইভেন্ট সেটআপ
function setupEnterKeyEvents() {
  const enterKeyActions = {
    "loginPhone": login,
    "loginPass": login,
    "signupPhone": signup,
    "signupPass": signup,
    "captchaInput": signup,
    "forgotPhone": sendOtp,
    "amount": () => document.getElementById("trxId").focus(),
    "trxId": () => document.getElementById("last4").focus(),
    "last4": submitPayment
  };

  Object.keys(enterKeyActions).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          enterKeyActions[id]();
        }
      });
    }
  });
}

// কেপচা জেনারেটর
function generateCaptcha() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

let currentCaptcha = generateCaptcha();
    
// কেপচা রিফ্রেশ ফাংশন
function refreshCaptcha() {
  currentCaptcha = generateCaptcha();
  document.getElementById("captchaDisplay").textContent = currentCaptcha;
  document.getElementById("captchaInput").value = "";
}

// ফর্ম টগল ফাংশন
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("otpVerificationForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("signupPhone").focus();
  refreshCaptcha();
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("otpVerificationForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("loginPhone").focus();
}

function showForgotPassword() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("otpVerificationForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "block";
  document.getElementById("forgotPhone").focus();
}

function showOtpVerification() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "none";
  document.getElementById("otpVerificationForm").style.display = "block";
  document.querySelectorAll('.otp-input')[0].focus();
  startOtpTimer();
}

function showResetPassword() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("otpVerificationForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "block";
  document.getElementById("newPassword").focus();
}

// OTP টাইমার
function startOtpTimer() {
  let sec = config.otpExpiry;
  const otpTimer = document.getElementById("otpTimer");
  
  state.otpTimer = setInterval(() => {
    if (sec <= 0) {
      clearInterval(state.otpTimer);
      otpTimer.innerHTML = "OTP এর মেয়াদ শেষ হয়েছে";
    } else {
      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      otpTimer.innerHTML = `OTP ${minutes} মিনিট ${seconds.toString().padStart(2, '0')} সেকেন্ডের মধ্যে সক্রিয় থাকবে`;
      sec--;
    }
  }, 1000);
}

// পাসওয়ার্ড স্ট্রেংথ চেক
function checkPasswordStrength(password, meterId = "strengthMeter", textId = "strengthText") {
  const meter = document.getElementById(meterId);
  const text = document.getElementById(textId);
  
  // Reset
  meter.className = "strength-meter";
  text.textContent = "";
  
  if (!password) return;
  
  // Calculate strength
  let strength = 0;
  
  // Length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Contains numbers
  if (/\d/.test(password)) strength++;
  
  // Contains lowercase and uppercase
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  
  // Contains special chars
  if (/[!@#$%^&*]/.test(password)) strength++;
  
  // Update UI
  if (strength <= 2) {
    meter.classList.add("strength-weak");
    text.textContent = "দুর্বল পাসওয়ার্ড";
    text.style.color = "var(--error-color)";
  } else if (strength <= 4) {
    meter.classList.add("strength-medium");
    text.textContent = "মধ্যম পাসওয়ার্ড";
    text.style.color = "var(--warning-color)";
  } else {
    meter.classList.add("strength-strong");
    text.textContent = "শক্তিশালী পাসওয়ার্ড";
    text.style.color = "var(--success-color)";
  }
}

// সাইন আপ ফাংশন
function signup() {
  const phone = document.getElementById("signupPhone").value.trim();
  const pass = document.getElementById("signupPass").value.trim();
  const captcha = document.getElementById("captchaInput").value.trim();

  // ভ্যালিডেশন
  if (!validatePhone(phone)) {
    showAlert("সঠিক মোবাইল নাম্বার দিন (11 ডিজিট)", "error");
    return;
  }

  if (!validatePassword(pass)) {
    showAlert("পাসওয়ার্ডে ন্যূনতম ৮ অক্ষর, বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষর থাকতে হবে", "error");
    return;
  }

  if (captcha !== currentCaptcha) {
    showAlert("কেপচা ভুল! নতুন কেপচা চেষ্টা করুন", "error");
    refreshCaptcha();
    return;
  }

  // ইউজার আছে কিনা চেক করুন
  if (localStorage.getItem(phone)) {
    showAlert("এই নাম্বারে ইতিমধ্যে একাউন্ট আছে", "error");
    return;
  }

  // রেজিস্ট্রেশন সম্পন্ন করুন
  localStorage.setItem(phone, pass);
  
  // ইউজার প্রোফাইল সেভ করুন
  state.userDB[phone] = { phone, name: "", email: "" };
  localStorage.setItem("userDB", JSON.stringify(state.userDB));
  
  showAlert("রেজিস্ট্রেশন সফল! এখন লগইন করুন", "success");
  showLogin();
}

// লগইন ফাংশন
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!validatePhone(phone)) {
    showAlert("সঠিক মোবাইল নাম্বার দিন (11 ডিজিট)", "error");
    return;
  }

  const storedPass = localStorage.getItem(phone);
  
  if (storedPass === pass) {
    state.loggedIn = true;
    state.userPhone = phone;
    
    // ইউজার ডেটা লোড করুন
    loadUserData(phone);
    
    // সেশন সেট করুন
    const sessionExpiry = rememberMe ? 
      new Date().getTime() + (30 * 24 * 60 * 60 * 1000) : // 30 days
      new Date().getTime() + (24 * 60 * 60 * 1000); // 1 day
      
    localStorage.setItem("paymentSession", JSON.stringify({
      phone,
      expiry: sessionExpiry
    }));
    
    showPaymentSection();
  } else {
    showAlert("মোবাইল নাম্বার বা পাসওয়ার্ড ভুল", "error");
  }
}

// ইউজার ডেটা লোড
function loadUserData(phone) {
  const userData = state.userDB[phone] || { phone, name: "", email: "" };
  state.userName = userData.name || phone;
  state.userEmail = userData.email || "";
  
  // UI আপডেট
  document.getElementById("userName").textContent = state.userName;
  document.getElementById("userPhone").textContent = phone;
  document.getElementById("userAvatar").textContent = state.userName.charAt(0).toUpperCase();
  
  // প্রোফাইল ট্যাবে ডেটা সেট করুন
  document.getElementById("profilePhone").value = phone;
  document.getElementById("profileEmail").value = state.userEmail;
  document.getElementById("profileName").value = state.userName;
}

// পেমেন্ট সেকশন দেখান
function showPaymentSection() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("paymentSection").style.display = "block";
  document.getElementById("amount").focus();
  
  // প্রথম ট্যাব সক্রিয় করুন
  switchTab(state.currentTab);
}

// OTP পাঠান
function sendOtp() {
  const phone = document.getElementById("forgotPhone").value.trim();

  if (!validatePhone(phone)) {
    showAlert("সঠিক মোবাইল নাম্বার দিন (11 ডিজিট)", "error");
    return;
  }

  // ইউজার আছে কিনা চেক করুন
  if (!localStorage.getItem(phone)) {
    showAlert("এই নাম্বারে কোন একাউন্ট নেই", "error");
    return;
  }

  // OTP জেনারেট করুন (ডেমোতে 123456)
  state.otp = "123456";
  state.otpExpiry = new Date().getTime() + (config.otpExpiry * 1000);
  
  showAlert(`OTP পাঠানো হয়েছে: ${state.otp} (ডেমো উদ্দেশ্যে)`, "info");
  showOtpVerification();
}

// OTP পুনরায় পাঠান
function resendOtp() {
  clearInterval(state.otpTimer);
  sendOtp();
}

// OTP যাচাই করুন
function verifyOtp() {
  const otpInputs = document.querySelectorAll('.otp-input');
  let enteredOtp = "";
  
  otpInputs.forEach(input => {
    enteredOtp += input.value;
  });

  if (enteredOtp.length !== 6) {
    showAlert("সম্পূর্ণ OTP লিখুন", "error");
    return;
  }

  if (enteredOtp !== state.otp) {
    showAlert("ভুল OTP", "error");
    return;
  }

  if (new Date().getTime() > state.otpExpiry) {
    showAlert("OTP এর মেয়াদ শেষ হয়েছে", "error");
    return;
  }

  showResetPassword();
}

// পাসওয়ার্ড রিসেট করুন
function resetPassword() {
  const newPass = document.getElementById("newPassword").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value.trim();

  if (!validatePassword(newPass)) {
    showAlert("পাসওয়ার্ডে ন্যূনতম ৮ অক্ষর, বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষর থাকতে হবে", "error");
    return;
  }

  if (newPass !== confirmPass) {
    showAlert("পাসওয়ার্ড মেলে না", "error");
    return;
  }

  const phone = document.getElementById("forgotPhone").value.trim();
  localStorage.setItem(phone, newPass);
  
  showAlert("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে", "success");
  showLogin();
}

// নম্বর কপি করুন
function copyNumber() {
  navigator.clipboard.writeText(config.paymentNumbers[state.currentMethod])
    .then(() => showAlert("নম্বর কপি হয়েছে!", "success"))
    .catch(() => showAlert("কপি করতে সমস্যা হয়েছে", "error"));
}

// পেমেন্ট সাবমিট করুন
function submitPayment() {
  const amount = document.getElementById("amount").value.trim();
  const trx = document.getElementById("trxId").value.trim();
  const last4 = document.getElementById("last4").value.trim();

  // ভ্যালিডেশন
  if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
    showAlert("সঠিক পেমেন্ট পরিমাণ দিন", "error");
    return;
  }

  if (!trx || trx.length < 8) {
    showAlert("সঠিক ট্রানজেকশন আইডি দিন", "error");
    return;
  }

  if (!/^\d{4}$/.test(last4)) {
    showAlert("নাম্বারের শেষ ৪ সংখ্যা সঠিকভাবে দিন", "error");
    return;
  }

  // পেমেন্ট রেকর্ড তৈরি করুন
  const payment = {
    user: state.userPhone,
    method: state.currentMethod,
    amount: amount + " টাকা",
    trx,
    last4,
    time: new Date().toLocaleString(),
    timestamp: new Date().getTime(),
    status: "Pending"
  };

  state.paymentDB.push(payment);
  state.currentPayment = payment;
  saveToLocalStorage();
  
  // স্ট্যাটাস দেখান
  const statusElement = document.getElementById("statusMsg");
  statusElement.innerHTML = "<i class='fas fa-spinner fa-spin'></i> পেমেন্ট যাচাই হচ্ছে...";
  statusElement.className = "processing";
  
  startTimer();

  // পেমেন্ট ভেরিফিকেশন সিমুলেট করুন
  setTimeout(() => {
    const success = Math.random() < config.successRate;
    const status = success ? "<i class='fas fa-check-circle'></i> পেমেন্ট সফল হয়েছে" : "<i class='fas fa-times-circle'></i> পেমেন্ট ব্যর্থ হয়েছে";
    
    payment.status = status;
    state.currentPayment = payment;
    saveToLocalStorage();
    
    statusElement.innerHTML = status;
    statusElement.className = success ? "success" : "error";
    
    // সফল হলে ফর্ম ক্লিয়ার করুন
    if (success) {
      document.getElementById("amount").value = "";
      document.getElementById("trxId").value = "";
      document.getElementById("last4").value = "";
    }
  }, 5000);
}

// টাইমার শুরু করুন
function startTimer() {
  clearInterval(state.timerInterval);
  
  let sec = config.sessionTimeout;
  const timer = document.getElementById("timer");
  timer.style.display = "block";

  state.timerInterval = setInterval(() => {
    if (sec <= 0) {
      clearInterval(state.timerInterval);
      timer.innerHTML = "<i class='fas fa-clock'></i> সময় শেষ!";
    } else {
      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      timer.innerHTML = `<i class='fas fa-clock'></i> ${minutes} মিনিট ${seconds.toString().padStart(2, '0')} সেকেন্ড বাকি`;
      sec--;
    }
  }, 1000);
}

// পেমেন্ট হিস্ট্রি দেখান
function showHistory() {
  switchTab("historyTab");
}

function filterHistory() {
  const filter = document.getElementById("historyFilter").value;
  let userPayments = state.paymentDB.filter(p => p.user === state.userPhone);
  
  // ফিল্টার প্রয়োগ করুন
  switch(filter) {
    case "successful":
      userPayments = userPayments.filter(p => p.status.includes("সফল"));
      break;
    case "failed":
      userPayments = userPayments.filter(p => p.status.includes("ব্যর্থ"));
      break;
    case "last7days":
      const sevenDaysAgo = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
      userPayments = userPayments.filter(p => p.timestamp > sevenDaysAgo);
      break;
    case "last30days":
      const thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
      userPayments = userPayments.filter(p => p.timestamp > thirtyDaysAgo);
      break;
  }
  
  displayHistory(userPayments);
}

function displayHistory(payments) {
  const historyElement = document.getElementById("history");
  
  if (payments.length === 0) {
    historyElement.innerHTML = "<div class='history-item info'>কোন পেমেন্ট ইতিহাস নেই</div>";
    return;
  }

  let html = "";
  payments.reverse().forEach(p => {
    const statusClass = p.status.includes("সফল") ? "success" : p.status.includes("ব্যর্থ") ? "error" : "";
    const methodIcon = p.method === "bkash" ? "fa-mobile-alt" : p.method === "nagad" ? "fa-wallet" : "fa-rocket";
    
    html += `
      <div class="history-item ${statusClass}">
        <div class="summary-row">
          <div><strong>পরিমাণ:</strong> ${p.amount}</div>
          <div><i class="fas ${methodIcon}"></i> ${p.method}</div>
        </div>
        <div><strong>টিআরএক্স:</strong> ${p.trx}</div>
        <div><strong>নম্বর:</strong> ****${p.last4}</div>
        <div><strong>সময়:</strong> ${p.time}</div>
        <div><strong>অবস্থা:</strong> ${p.status}</div>
      </div>
    `;
  });
  
  historyElement.innerHTML = html;
}

// পেমেন্ট রসিদ ডাউনলোড
function downloadReceipt() {
  if (!state.currentPayment || state.currentPayment.status === "Pending") {
    showAlert("প্রথমে একটি পেমেন্ট সাবমিট করুন এবং যাচাই হওয়ার জন্য অপেক্ষা করুন", "error");
    return;
  }
  
  const payment = state.currentPayment;
  const methodName = payment.method === "bkash" ? "বিকাশ" : payment.method === "nagad" ? "নগদ" : "রকেট";
  
  // রসিদ তৈরি করুন
  const receipt = `
    পেমেন্ট রসিদ
    --------------------------
    ব্যবহারকারী: ${state.userName}
    মোবাইল: ${payment.user}
    পেমেন্ট মেথড: ${methodName}
    পরিমাণ: ${payment.amount}
    টিআরএক্স আইডি: ${payment.trx}
    মোবাইল নাম্বার: ****${payment.last4}
    সময়: ${payment.time}
    অবস্থা: ${payment.status}
    --------------------------
    ধন্যবাদান্তে,
    পেমেন্ট পোর্টাল টিম
  `;
  
  // ডাউনলোড শুরু করুন
  const blob = new Blob([receipt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payment_${payment.trx}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showAlert("রসিদ ডাউনলোড শুরু হয়েছে", "success");
}

// সেশন চেক করুন
function checkSession() {
  const session = localStorage.getItem("paymentSession");
  if (session) {
    const { phone, expiry } = JSON.parse(session);
    if (new Date().getTime() < expiry) {
      state.loggedIn = true;
      state.userPhone = phone;
      loadUserData(phone);
      showPaymentSection();
    } else {
      localStorage.removeItem("paymentSession");
    }
  }
}

// লগআউট
function logout() {
  state.loggedIn = false;
  state.userPhone = "";
  localStorage.removeItem("paymentSession");
  showLogin();
  showAlert("সফলভাবে লগআউট হয়েছে", "success");
}

// পেমেন্ট মেথড সিলেক্ট
function selectPaymentMethod(method) {
  state.currentMethod = method;
  
  // UI আপডেট
  document.querySelectorAll('.payment-method').forEach(el => {
    el.classList.remove('active');
  });
  
  document.querySelector(`.payment-method[onclick="selectPaymentMethod('${method}')"]`).classList.add('active');
  document.getElementById("paymentMethod").value = method;
  
  // পেমেন্ট নাম্বার আপডেট
  document.getElementById("paymentNumber").textContent = config.paymentNumbers[method];
  
  // QR কোড দেখান/লুকান
  const qrSection = document.getElementById("qrCodeSection");
  if (method === "bkash") {
    qrSection.classList.remove('hidden');
    document.getElementById("paymentNumberText").style.display = "none";
  } else {
    qrSection.classList.add('hidden');
    document.getElementById("paymentNumberText").style.display = "block";
  }
}

// ট্যাব সুইচ
function switchTab(tabId) {
  state.currentTab = tabId;
  
  // ট্যাব বাটন আপডেট
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
  
  // ট্যাব কন্টেন্ট আপডেট
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  document.getElementById(tabId).classList.add('active');
  
  // হিস্ট্রি ট্যাব হলে ফিল্টার প্রয়োগ করুন
  if (tabId === "historyTab") {
    filterHistory();
  }
}

// প্রোফাইল আপডেট
function updateProfile() {
  const name = document.getElementById("profileName").value.trim();
  const email = document.getElementById("profileEmail").value.trim();
  
  state.userName = name || state.userPhone;
  state.userEmail = email;
  
  // ইউজার ডেটা সেভ করুন
  state.userDB[state.userPhone] = {
    phone: state.userPhone,
    name: state.userName,
    email: state.userEmail
  };
  
  localStorage.setItem("userDB", JSON.stringify(state.userDB));
  
  // UI আপডেট
  document.getElementById("userName").textContent = state.userName;
  document.getElementById("userAvatar").textContent = state.userName.charAt(0).toUpperCase();
  
  showAlert("প্রোফাইল সফলভাবে আপডেট হয়েছে", "success");
}

// পাসওয়ার্ড পরিবর্তন
function changePassword() {
  const currentPass = document.getElementById("currentPassword").value.trim();
  const newPass = document.getElementById("newProfilePassword").value.trim();
  const confirmPass = document.getElementById("confirmProfilePassword").value.trim();
  
  // ভ্যালিডেশন
  const storedPass = localStorage.getItem(state.userPhone);
  if (storedPass !== currentPass) {
    showAlert("বর্তমান পাসওয়ার্ড ভুল", "error");
    return;
  }
  
  if (!validatePassword(newPass)) {
    showAlert("পাসওয়ার্ডে ন্যূনতম ৮ অক্ষর, বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষর থাকতে হবে", "error");
    return;
  }
  
  if (newPass !== confirmPass) {
    showAlert("পাসওয়ার্ড মেলে না", "error");
    return;
  }
  
  // পাসওয়ার্ড আপডেট
  localStorage.setItem(state.userPhone, newPass);
  
  // ফর্ম ক্লিয়ার
  document.getElementById("currentPassword").value = "";
  document.getElementById("newProfilePassword").value = "";
  document.getElementById("confirmProfilePassword").value = "";
  
  showAlert("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে", "success");
}

// হেল্পার ফাংশন
function validatePhone(phone) {
  return /^01\d{9}$/.test(phone);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

function showAlert(message, type = "error", duration = 3000) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert ${type}`;
  
  // আইকন সেট করুন
  let icon = "";
  switch(type) {
    case "success": icon = "fas fa-check-circle"; break;
    case "error": icon = "fas fa-exclamation-circle"; break;
    case "warning": icon = "fas fa-exclamation-triangle"; break;
    default: icon = "fas fa-info-circle";
  }
  
  alertDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.classList.add("fade-out");
    setTimeout(() => alertDiv.remove(), 500);
  }, duration);
}

function saveToLocalStorage() {
  localStorage.setItem("paymentDB", JSON.stringify(state.paymentDB));
  localStorage.setItem("userDB", JSON.stringify(state.userDB));
}
