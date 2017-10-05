'use strict';
const nodemailer = require('nodemailer');
const readline = require('readline');
const config = require('./config');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var properties = ['from', 'to', 'subject', 'text'];

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

var mailOptions = {};

getProperties();

function getProperties() {
    var currentProp = properties.pop()
    rl.question(currentProp + ': ', function(answer) {
        mailOptions[currentProp] = answer;
        if(properties.length > 0) {
            getProperties();
        }
        else {
            transport.sendMail(mailOptions, function (error, info) {
                if(error) {
                    return console.log(error);
                }
                console.log('Message sent'+info.messageId);
                rl.close();
            });
        }
    }); 
}