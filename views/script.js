const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value;

  const otp = generateOTP();
  sendEmail(email, otp);
});

async function sendEmail(email, otp) {
  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient: email, subject: 'OTP Verification', htmlContent: `Your OTP is: ${otp}` })
    });

    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Error sending email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
