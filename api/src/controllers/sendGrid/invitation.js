const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendInvitation(req, res, next) { 
    const {to, subject, text, html} = req.body;
    try {
    const msg = {
        to, // Change to your recipient
        from: 'faltaunoapp@hotmail.com', // Change to your verified sender
        subject,
        text,
        html,
    }
        await sgMail.send(msg)
        res.status(201).send(msg) 
    } catch(error) {
        res.status(error.code).send(error.message)
    }
}

module.exports = {
    sendInvitation
}

