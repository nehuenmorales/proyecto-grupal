const request = require('supertest')
const app = require('../../app')

it('Can send emails with valid inputs', async () => {
    return await request(app)
        .post('/sendGrid/invitation')
        .send({
            to: 'elilamas097@gmail.com',
            subject: 'Subject',
            text: 'some random text',
            html: '<strong>Some random html code</strong>'
        })
        .expect(201)
})