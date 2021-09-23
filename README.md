# Datastore

1. Nodejs - Back end
2. Bootstrap & Ejs - Front end
3. Mongodb - Database
4. JsonWebToken - Authentication
5. Bcrypt - Secure Password

About Datastore:
  - User can create and save their persional data.
  - Create a login system, so users data remains protected.

What i did:
  - Use JsonWebToken (node package) for securing users data. JWT token is created when user login and this token is saved into browser cookies.
  - Create a jwt middleware. when ever user tried to enter into userdata, the token saved in browser cookie is verified with token saved in database. if they match then he/she can view their data.
  - Use bcrypt (node package) for securing password. bcrypt hash password with random numbers and characters. no one can encrypt that password. what bcrypt do is, compare user login password with password that saved in database while signup/create data.
  
Drawbacks:
  - no logout system. token expires after certain period of time.

  
