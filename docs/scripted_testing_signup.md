# Lecture Topic Task: Scripted Testing for Sign-Up

### Case 1: Creating a New Account: No issues
Test 1.1: 
    Username: NapoVelez
    Email: nvelez@gmail.com
    Password: BestMarket787
    Confirm Password: BestMarket787
Expected: Account Created Successfully!

### Case 2: Creating a New Account: Invalid password
Test 2.1: 
    Username: PepitoRodz
    Email: pepo.rodriguez@outlook.com
    Password: Pepitoooo
    Confirm Password: Pepitoooo
Test 2.2:
    Username: PepitoRodz
    Email: pepo.rodriguez@outlook.com
    Password: pepito123
    Confirm Password: pepito123
Test 2.3:
    Username: PepitoRodz
    Email: pepo.rodriguez@outlook.com
    Password: PeRod1
    Confirm Password: PeRod1
Test 2.4:
    Username: PepitoRodz
    Email: pepo.rodriguez@outlook.com
    Password: PEPITO123
    Confirm Password: PEPITO123
Expected: Invalid Password, must include at least one number, one uppercase letter, one lowercase letter, and contain at least 8 characters.

### Case 3: Creating a New Account: Existing username
Test 3.1:
    Username: NapoVelez
    Email: Napo11@gmail.com
    Password: BestMarket787
    Confirm Password: BestMarket787
Expected: Invalid username, this user already exists!

### Case 4: Creating a New Account: Existing email
Test 4.1:
    Username: Napo11
    Email: nvelez@gmail.com
    Password: BestMarket787
    Confirm Password: BestMarket787
Expected: Invalid username, this email belongs to an existing account!

