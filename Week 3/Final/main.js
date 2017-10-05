'use strict';
const nodemailer = require('nodemailer');
const readline = require('readline');
const config = require('./config');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

rl.question('Who would you like to send the email to? ', function(answer) {
    var mailOptions = {
        from: 'dustystick624@gmail.com',
        to: answer,
        subject: 'Hello',
        text: 'yo sup dawg'
    };

    transport.sendMail(mailOptions, function (error, info) {
        if(error) {
            return console.log(error);
        }
        console.log('Message sent'+info.messageId);
    });

    rl.close();
});