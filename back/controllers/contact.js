let nodeOutlook = require('nodejs-nodemailer-outlook');

exports.sendMail = (req, res, next) => {

    let mobile = "";
    if (req.body.tel) {
        if(req.body.tel.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
            mobile = req.body.tel
        }
    }


    nodeOutlook.sendEmail({
        auth: {
            user: "julabina@hotmail.fr",
            pass: process.env.REACT_APP_OUTLOOK_PASSWORD
        },
        from: "julabina@hotmail.fr",
        to: "julien.lenfume@gmail.com",
        subject: "eShop react  " + req.body.lastName + " " + req.body.firstName,
        text: req.body.contactEmail + " - " + mobile + "     " + req.body.message,
        onError: (e) => res.status(500).json({error: e}),
        onSuccess: (i) => res.status(200).json({message: "Email envoyé"})
    })

}