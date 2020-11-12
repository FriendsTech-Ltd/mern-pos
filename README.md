# Point of sale
Guaranteed to save you time, increase the accuracy of your inventory, and help you make informed decisions for your business.

![alt text](https://mern-pos.netlify.app/static/media/features-split-image-01.babb68d1.png)


### See live: http://mern-pos.herokuapp.com/
---

## Built With
* Node.js
* Express.js
* MongoDb
* React.js
* MaterialUi

## Requirements

For development, you will only need Node.js installed in your environnement.


## Install 
    using SSH:
    $ git clone git@github.com:FriendsTech-Ltd/mern-pos.git
    or using HTTPS:
    $ git clone https://github.com/FriendsTech-Ltd/mern-pos.git
    $ cd mern-pos
    $ npm install
    $ cd client 
    $ npm install

## Configure app
Open config folder and create a file config.env <br>
Open `mern-pos/config/config.env` then edit it. You will need:

```
PORT = 5000
NODE_ENV = DEVELOPMENT
MONGO_URI =

// JWT
JWT_SECRET =
JWT_EXPIRE =

// Node Mailer
SMTP_HOST = gmail
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL = pos-system@admin.com
FROM_NAME = POS system
DEMO_USER_EMAIL = shohedul2524@gmail.com

```
### Run the server
    $ npm start
### Run the client
    $ cd client
    $ npm start
### Run the project
    $ npm run dev

## Contributing
Please feel free to contribute by adding new templates to this project:

1. Fork it (https://github.com/FriendsTech-Ltd/mern-pos.git)
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Create a new Pull Request

## File Structure
mer-pos (root)
- client
- config
    - config.env
    - db.js
- controllers
    - customerController.js
    - invoiceController.js
    - productController.js
    - userController.js
- middleware
    - async.js
    - auth.js
    - Authorized.js
    - handleError.js
    - handleValidations.js
    - multer_cloudinary.js
    - uploadMiddleware.js
- models
    - validation
        - changePasswordValidation.js
        - customerValidation.js
        - index.js
        - invoiceValidation.js
        - loginValidation.js
        - productValidation.js
        - resetPasswordValidation.js
        - userValidation.js
    - CustomerModel.js
    - InvoiceModel.js
    - ProductModel.js
    - UserModel.js
- routes
    - customerRoute.js
    - invoiceRoute.js
    - productRoute.js
    - userRoute.js
- utils
    - error.js
    - sendEmail.js
- .eslintrc.json
- .gitignore
- package-lock.json
- README.md
- server

 Copyright 2020, Developed by Abdulla naser,Shohedul Islam and Emran Nazer