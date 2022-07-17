const supertest = require('supertest');
const app = require('../app')

describe("API", () => {

    let api;

    beforeAll(() => {
        api = app.listen(3030)
    })

    afterAll((done) => {
        api.close(done);
    })

    it("Responds to GET request at '/ 'with a 200 status", (done) => {
        supertest(api).get('/').expect(200, done);
    })

    it("Responds to GET request at /flavours with a 200 status", (done) => {
        supertest(api).get('/flavours').expect(200, done);
    })

    it("Responds to GET request at /flavours with a JSON object", (done) => {
        supertest(api).get('/flavours').expect('Content-Type', /json/, done);
    })

    it("Non-vegan query (/flavours/?vegan=false) should return only non-vegan flavours", async () => {
            const response = await supertest(api).get('/flavours/?vegan=false') //.set('Accept', 'application/json')
            expect(response.body).toEqual({
                "flavours": [
                    "lemon sorbet",
                    "vanilla"
                ]
            })
    })

    it("Vegan query (/flavours/?vegan=true) should return only vegan flavours", async () => {
            const response = await supertest(api).get('/flavours/?vegan=true') //.set('Accept', 'application/json')
            expect(response.body).toEqual({
                        "flavours": [
                            "pistachio",
                            "salted caramel",
                            "mint"
                        ]
                    })
    })

    it("Retrieve desired flavour by id at /flavours/:id", async () => {
        const response = await supertest(api).get('/flavours/2').set('Accept', 'application/json')
        expect(response.body.flavour.id).toBe(2)
    })

    it('Get 404 status and an error message if id does not exist at /flavours/:id', async () => {
        const response = await supertest(api).get('/flavours/9898989').set('Accept', 'application/json')
        expect(response.status).toBe(404)
        expect(response.body.error).toBeTruthy()
    })

    it('Retrieve status 201 after a POST request at /flavours', (done) => {
        supertest(api).post('/flavours').expect(201, done)
    })

    it('Retreive success message a POST reqest at /flavours', async () => {
        const response = await supertest(api).post('/flavours').set('Accept', 'application/json')
        expect(response.body.success).toBeTruthy()
    })
})
