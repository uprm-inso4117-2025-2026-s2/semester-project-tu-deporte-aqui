# Lecture Topic Task: Scripted Testing for Log In

### Case 1: Log In: Valid Credentials
Test 1.1:
    Email: validuser@gmail.com
    Password: CorrectPass123
Expected: Login successful. User is redirected to the main page/dashboard.

---

### Case 2: Log In: Invalid Password
Test 2.1:
    Email: validuser@gmail.com
    Password: WrongPass123

Test 2.2:
    Email: user123@gmail.com
    Password: incorrect

Expected: Invalid credentials. Login is rejected and user remains on the login page.

---

### Case 3: Log In: Non-Existent Email
Test 3.1:
    Email: notregistered@gmail.com
    Password: AnyPassword123

Expected: Invalid credentials or account not found. Login is rejected.

---

### Case 4: Log In: Empty Required Fields
Test 4.1:
    Email:
    Password:

Test 4.2:
    Email: validuser@gmail.com
    Password:

Test 4.3:
    Email:
    Password: CorrectPass123

Expected: Required fields must be filled. Form submission is blocked.

---

### Case 5: Log In: Invalid Email Format
Test 5.1:
    Email: useremail
    Password: CorrectPass123

Test 5.2:
    Email: user@com
    Password: Test12345

Expected: Invalid email format. User is prompted to enter a valid email.

---

### Case 6: Log In: Incorrect Credential Combination
Test 6.1:
    Email: validuser@gmail.com
    Password: PasswordFromAnotherAccount

Expected: Invalid credentials. Login is rejected.