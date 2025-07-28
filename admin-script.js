// Admin Panel Configuration
const adminConfig = {
  email: "akonsiam45@gmail.com",
  password: "Admin@12345", // Default password
  payments: [],
  users: []
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');

// Check if admin is already logged in
if (localStorage.getItem('adminLoggedIn') === 'true' && window.location.pathname.includes('admin-login.html')) {
  window.location.href = 'admin-panel.html';
}

// Admin Login Function
function adminLogin() {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  
  if (email === adminConfig.email && password === adminConfig.password) {
    localStorage.setItem('adminLoggedIn', 'true');
    window.location.href = 'admin-panel.html';
  } else {
    showAlert('Invalid email or password', 'error');
  }
}

// Toggle Password Visibility
function togglePasswordVisibility(fieldId = null) {
  if (fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling;
    
    if (field.type === 'password') {
      field.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      field.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  } else {
    const passwordField = document.getElementById('adminPassword');
    const icon = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

// Show Forgot Password Form
function showForgotPassword() {
  loginForm.style.display = 'none';
  forgotPasswordForm.style.display = 'block';
}

// Show Login Form
function showLogin() {
  forgotPasswordForm.style.display = 'none';
  resetPasswordForm.style.display = 'none';
  loginForm.style.display = 'block';
}

// Send Reset Code
function sendResetCode() {
  const email = document.getElementById('resetEmail').value;
  
  if (email === adminConfig.email) {
    // In a real app, you would send an email with a code
    // For demo, we'll use a fixed code
    localStorage.setItem('resetCode', '123456');
    localStorage.setItem('resetCodeExpiry', Date.now() + 300000); // 5 minutes
    
    showAlert(`Verification code sent to ${email} (Demo code: 123456)`, 'success');
    window.location.href = 'reset-password.html';
  } else {
    showAlert('Email not found', 'error');
  }
}

// Resend Verification Code
function resendVerificationCode() {
  // In a real app, you would resend the email
  showAlert('New verification code sent (Demo code: 123456)', 'success');
}

// Reset Admin Password
function resetAdminPassword() {
  const code = document.getElementById('verificationCode').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmNewPassword').value;
  
  const storedCode = localStorage.getItem('resetCode');
  const expiry = localStorage.getItem('resetCodeExpiry');
  
  if (!code || !newPassword || !confirmPassword) {
    showAlert('Please fill all fields', 'error');
    return;
  }
  
  if (code !== storedCode) {
    showAlert('Invalid verification code', 'error');
    return;
  }
  
  if (Date.now() > parseInt(expiry)) {
    showAlert('Verification code has expired', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }
  
  if (!validatePassword(newPassword)) {
    showAlert('Password must be at least 8 characters with uppercase, lowercase, number and special character', 'error');
    return;
  }
  
  // In a real app, you would update the password in your database
  adminConfig.password = newPassword;
  localStorage.removeItem('resetCode');
  localStorage.removeItem('resetCodeExpiry');
  
  showAlert('Password reset successfully! Please login with your new password', 'success');
  setTimeout(() => {
    window.location.href = 'admin-login.html';
  }, 2000);
}

// Validate Password Strength
function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

// Check Password Strength
function checkPasswordStrength(password, meterId = 'passwordStrengthMeter', textId = 'passwordStrengthText') {
  const meter = document.getElementById(meterId);
  const text = document.getElementById(textId);
  
  // Reset
  meter.className = 'strength-meter';
  text.textContent = '';
  
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
    meter.classList.add('strength-weak');
    text.textContent = 'Weak password';
    text.style.color = 'var(--danger-color)';
  } else if (strength <= 4) {
    meter.classList.add('strength-medium');
    text.textContent = 'Medium password';
    text.style.color = 'var(--warning-color)';
  } else {
    meter.classList.add('strength-strong');
    text.textContent = 'Strong password';
    text.style.color = 'var(--success-color)';
  }
}

// Admin Logout
function adminLogout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin-login.html';
}

// Show Alert Message
function showAlert(message, type = 'error', duration = 3000) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  
  // Set icon based on type
  let icon = '';
  switch(type) {
    case 'success': icon = 'fas fa-check-circle'; break;
    case 'error': icon = 'fas fa-exclamation-circle'; break;
    case 'warning': icon = 'fas fa-exclamation-triangle'; break;
    default: icon = 'fas fa-info-circle';
  }
  
  alertDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 500);
  }, duration);
}

// Admin Panel Navigation
function showDashboard() {
  document.getElementById('pageTitle').textContent = 'Dashboard';
  document.getElementById('breadcrumb').textContent = 'Dashboard';
  
  document.querySelectorAll('.admin-content-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('dashboardContent').style.display = 'block';
  
  // Update active menu item
  document.querySelectorAll('.admin-menu li').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.admin-menu li')[0].classList.add('active');
  
  // Initialize charts if they exist
  if (typeof initCharts === 'function') {
    initCharts();
  }
}

function showPayments() {
  document.getElementById('pageTitle').textContent = 'Payments';
  document.getElementById('breadcrumb').textContent = 'Payments';
  
  document.querySelectorAll('.admin-content-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('paymentsContent').style.display = 'block';
  
  // Update active menu item
  document.querySelectorAll('.admin-menu li').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.admin-menu li')[1].classList.add('active');
  
  // Load payments data
  loadPaymentsData();
}

function showUsers() {
  document.getElementById('pageTitle').textContent = 'Users';
  document.getElementById('breadcrumb').textContent = 'Users';
  
  document.querySelectorAll('.admin-content-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('usersContent').style.display = 'block';
  
  // Update active menu item
  document.querySelectorAll('.admin-menu li').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.admin-menu li')[2].classList.add('active');
  
  // Load users data
  loadUsersData();
}

function showSettings() {
  document.getElementById('pageTitle').textContent = 'Settings';
  document.getElementById('breadcrumb').textContent = 'Settings';
  
  document.querySelectorAll('.admin-content-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('settingsContent').style.display = 'block';
  
  // Update active menu item
  document.querySelectorAll('.admin-menu li').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.admin-menu li')[3].classList.add('active');
}

function showSettingsTab(tabId) {
  document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelectorAll('.settings-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  document.querySelector(`.settings-tab:nth-child(${tabId === 'profile' ? 1 : tabId === 'security' ? 2 : 3})`).classList.add('active');
  document.getElementById(`${tabId}Settings`).classList.add('active');
}

// Load Payments Data
function loadPaymentsData() {
  // In a real app, you would fetch this from your API
  const payments = [
    {
      id: 'PAY001',
      user: 'John Doe',
      phone: '01712345678',
      amount: '500 ৳',
      method: 'bKash',
      trx: 'TRX123456789',
      time: '2023-05-15 14:30',
      status: 'successful'
    },
    {
      id: 'PAY002',
      user: 'Jane Smith',
      phone: '01887654321',
      amount: '1200 ৳',
      method: 'Nagad',
      trx: 'TRX987654321',
      time: '2023-05-15 10:15',
      status: 'pending'
    },
    {
      id: 'PAY003',
      user: 'Robert Johnson',
      phone: '01911223344',
      amount: '750 ৳',
      method: 'Rocket',
      trx: 'TRX456789123',
      time: '2023-05-14 16:45',
      status: 'failed'
    },
    {
      id: 'PAY004',
      user: 'Sarah Williams',
      phone: '01655667788',
      amount: '300 ৳',
      method: 'bKash',
      trx: 'TRX789123456',
      time: '2023-05-14 09:20',
      status: 'successful'
    },
    {
      id: 'PAY005',
      user: 'Michael Brown',
      phone: '01599887766',
      amount: '1500 ৳',
      method: 'Nagad',
      trx: 'TRX321654987',
      time: '2023-05-13 18:30',
      status: 'successful'
    }
  ];
  
  const paymentsTable = document.getElementById('allPayments');
  paymentsTable.innerHTML = '';
  
  payments.forEach(payment => {
    const row = document.createElement('tr');
    
    let statusBadge = '';
    if (payment.status === 'successful') {
      statusBadge = '<span class="status-badge success">Successful</span>';
    } else if (payment.status === 'pending') {
      statusBadge = '<span class="status-badge pending">Pending</span>';
    } else {
      statusBadge = '<span class="status-badge failed">Failed</span>';
    }
    
    row.innerHTML = `
      <td>${payment.id}</td>
      <td>${payment.user}</td>
      <td>${payment.phone}</td>
      <td>${payment.amount}</td>
      <td>${payment.method}</td>
      <td>${payment.trx}</td>
      <td>${payment.time}</td>
      <td>${statusBadge}</td>
      <td>
        <button class="btn-action" title="View Details"><i class="fas fa-eye"></i></button>
        <button class="btn-action" title="Edit"><i class="fas fa-edit"></i></button>
      </td>
    `;
    
    paymentsTable.appendChild(row);
  });
}

// Load Users Data
function loadUsersData() {
  // In a real app, you would fetch this from your API
  const users = [
    {
      id: 'USER001',
      name: 'John Doe',
      phone: '01712345678',
      email: 'john.doe@example.com',
      registered: '2023-01-15',
      payments: 5,
      status: 'active'
    },
    {
      id: 'USER002',
      name: 'Jane Smith',
      phone: '01887654321',
      email: 'jane.smith@example.com',
      registered: '2023-02-20',
      payments: 12,
      status: 'active'
    },
    {
      id: 'USER003',
      name: 'Robert Johnson',
      phone: '01911223344',
      email: 'robert.j@example.com',
      registered: '2023-03-05',
      payments: 3,
      status: 'active'
    },
    {
      id: 'USER004',
      name: 'Sarah Williams',
      phone: '01655667788',
      email: 'sarah.w@example.com',
      registered: '2023-04-10',
      payments: 8,
      status: 'inactive'
    },
    {
      id: 'USER005',
      name: 'Michael Brown',
      phone: '01599887766',
      email: 'michael.b@example.com',
      registered: '2023-05-01',
      payments: 2,
      status: 'active'
    }
  ];
  
  const usersTable = document.getElementById('allUsers');
  usersTable.innerHTML = '';
  
  users.forEach(user => {
    const row = document.createElement('tr');
    
    let statusBadge = '';
    if (user.status === 'active') {
      statusBadge = '<span class="status-badge success">Active</span>';
    } else {
      statusBadge = '<span class="status-badge danger">Inactive</span>';
    }
    
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.registered}</td>
      <td>${user.payments}</td>
      <td>${statusBadge}</td>
      <td>
        <button class="btn-action" title="View Profile"><i class="fas fa-user"></i></button>
        <button class="btn-action" title="Edit"><i class="fas fa-edit"></i></button>
      </td>
    `;
    
    usersTable.appendChild(row);
  });
}

// Initialize Charts
function initCharts() {
  // Payments Overview Chart
  const paymentsCtx = document.getElementById('paymentsChart').getContext('2d');
  const paymentsChart = new Chart(paymentsCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Successful Payments',
          data: [120, 190, 170, 220, 180, 250],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Failed Payments',
          data: [15, 10, 12, 8, 5, 10],
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Payment Methods Chart
  const methodsCtx = document.getElementById('methodsChart').getContext('2d');
  const methodsChart = new Chart(methodsCtx, {
    type: 'doughnut',
    data: {
      labels: ['bKash', 'Nagad', 'Rocket'],
      datasets: [{
        data: [300, 150, 100],
        backgroundColor: [
          '#4a6bff',
          '#28a745',
          '#ffc107'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Initialize Admin Panel
if (document.getElementById('dashboardContent')) {
  // Load initial data
  loadPaymentsData();
  loadUsersData();
  
  // Initialize charts
  if (typeof Chart !== 'undefined') {
    initCharts();
  }
  
  // Set up password strength checker
  const passwordFields = ['newPassword', 'newProfilePassword'];
  passwordFields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
      element.addEventListener('input', function() {
        checkPasswordStrength(this.value);
      });
    }
  });
  
  // Set up toggle switch for maintenance mode
  const maintenanceToggle = document.getElementById('maintenanceMode');
  if (maintenanceToggle) {
    maintenanceToggle.addEventListener('change', function() {
      document.getElementById('maintenanceStatus').textContent = 
        this.checked ? 'Enabled' : 'Disabled';
    });
  }
}

// Event listeners for password fields
document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  const toggleIcons = document.querySelectorAll('.toggle-password');
  toggleIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const fieldId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      togglePasswordVisibility(fieldId);
    });
  });
  
  // Password strength check
  const passwordFields = ['newPassword', 'newProfilePassword'];
  passwordFields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
      element.addEventListener('input', function() {
        const meterId = field === 'newPassword' ? 'passwordStrengthMeter' : 'profileStrengthMeter';
        const textId = field === 'newPassword' ? 'passwordStrengthText' : 'profileStrengthText';
        checkPasswordStrength(this.value, meterId, textId);
      });
    }
  });
});
