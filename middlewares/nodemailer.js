const nodemailer = require('nodemailer');
module.exports = {
    sendMail: async (mailAddress, mailerName, mailersubject, mailerMessage) => {
        try {
            const transport = nodemailer.createTransport({
                host: "mail.arifmannan.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "nubprojectmanagementsystem@arifmannan.com", // generated ethereal user
                    pass: "19971220arifN", // generated ethereal password
                },
            });
            const mailOptions = {
                from: mailAddress, //sender mail
                to: '<mohsinkabirseo@gmail.com>', //receiver mail
                name: mailerName,                 //sender name
                subject: mailersubject,            //sender mail subject
                text: mailerMessage,               //sender mail message
            };

            // console.log('mailDetails', mailOptions);
            // const result = await transport.sendMail(mailOptions);
            // console.log('mailerResult', result
            // );
            // return result;

            transport.sendMail(mailOptions, function (err, info) {
                res.json(info)
            })
        } catch (error) {
            return error;
        }
    }
}












