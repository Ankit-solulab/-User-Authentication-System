Project Description:
This is a User Authentication System built with Node.js, Express.js, MongoDB, and JWT. The project provides basic authentication functionalities such as user signup, signin, password recovery, and two-factor authentication (2FA). It includes the following key features:

User Registration (Signup): Allows users to register by providing a username, email, and password. The password is hashed using bcrypt for security.
User Login (Signin): Users can log in with their email and password. Upon successful login, a JWT token is issued to the user for secure access to protected routes.
Password Recovery (Forget Password): Users can request a password recovery link by providing their email address.
Resend OTP: Allows users to request a new OTP (One-Time Password) in case they did not receive the first one.
Two-Factor Authentication (2FA): Users can enable 2FA by scanning a QR code that is used for generating time-based OTPs to enhance account security.
The backend is developed using Express.js, and MongoDB is used to store user data. JWT (JSON Web Token) is used for user session management and authentication. The project also supports basic input validation using express-validator to ensure secure and reliable data processing.

Key Features:
Sign Up: User can create a new account with a username, email, and password.
Sign In: Registered users can log in to their accounts with email and password.
Two-Factor Authentication (2FA): Users can enable 2FA for better account security, using Google Authenticator or similar apps.
Password Recovery: Users can recover their password by requesting an OTP to their email.
OTP Resend: If the OTP is not received, users can request it again.
Technologies Used:
Node.js: Backend JavaScript runtime.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing user data.
JWT (JSON Web Token): For secure user authentication.
bcryptjs: To hash passwords securely.
express-validator: For validating user input.
speakeasy: For generating OTP secrets for 2FA.
QRCode: For generating QR codes for 2FA setup.
Installation Instructions:
Clone the repository:

bash
Copy code
git clone https://github.com/Ankit-solulab/-User-Authentication-System.git'
cd user-authentication-system
Install dependencies:

bash
Copy code
npm install
