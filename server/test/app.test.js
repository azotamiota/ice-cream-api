const request = require('supertest');
const app = require('../app')

describe("API", () => {

    let api;

    beforeAll(() => {
        api = app.listen(3030)
    })

    afterAll((done) => {
        api.close(done);
    })

    it("Responds to GET request at  with a 200 status", (done) => {
        request(api).get('/').expect(200, done);
    })

    it("Responds to GET request at /flavours with a 200 status", (done) => {
        request(api).get('/flavours').expect(200, done);
    })

    it("Responds to GET request at /flavours with a JSON object", (done) => {
        request(api).get('/flavours').expect('Content-Type', /json/, done);
    })

    // it("Responds to GET request at /flavours with a JSON object that has a flavours key", (done) => {
    //     request(api).get('/flavours').end((err, res) => {
    //         const data = res.body;
    //         expect('flavours' in data)
    //         expect(Array.isArray(data['flavours']));
    //         done();
    //     });
    // })

    

})
