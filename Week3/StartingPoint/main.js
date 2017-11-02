'use strict';
const nodemailer = require('nodemailer');
const config = require('./config');

var transportSetup = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.user,
        pass: config.pass
    }
};

var transport = nodemailer.createTransport(transportSetup);

var mailOptions = {
    from: config.user,
    to: '7248675309@vzwpix.com, 2313771113@vzwpix.com',
    subject: 'Hello',
    text: 'yo sup dawg'
};

transport.sendMail(mailOptions, function (error, info) {
    if(error) {
        return console.log(error);
    }
    console.log('Message sent'+info.messageId);
});