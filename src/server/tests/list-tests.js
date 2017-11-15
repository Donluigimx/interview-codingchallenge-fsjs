process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app'),
    List = require('../api/models/list'),
    should = chai.should();

chai.use(chaiHttp);

describe('Lists', () => {
            beforeEach(done => {
            List.remove({}, (err) => {
            done();
        });
    });

    describe('Auth Cookie', () => {
        it('it should return an error for an absence of Cookie header', done => {
            chai.request(app)
                .get('/lists')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should return an error for an absence of an \'auth\' cookie', done => {
            chai.request(app)
                .get('/lists')
                .set('Cookie', 'foo=foo')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET Lists', () => {
        it('it should get all the lists', done => {
            chai.request(app)
                .get('/lists')
                .set('Cookie', 'auth=auth')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST Lists', () => {
        it('it should create a list', done => {
            const data = {
                name: 'Test'
            };
            chai.request(app)
                .post('/lists')
                .set('Cookie', 'auth=auth')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('items');
                    res.body.items.should.be.a('array');
                    done();
                });
        });
        it('it should return an error because a bad request', done => {
            const data = {
                item: 'Test'
            };
            chai.request(app)
                .post('/lists')
                .set('Cookie', 'auth=auth')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    done();
                });
        });
    });
    describe('/POST Items', () => {
        it('it should create an item on a list', done => {
            const data = {
                name: 'Test'
            };
            chai.request(app)
                .post('/lists')
                .set('Cookie', 'auth=auth')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    const itemData = {
                        item: 'Custom Item'
                    }
                    chai.request(app)
                        .post(`/lists/${res.body._id}/items`)
                        .set('Cookie', 'auth=auth')
                        .send(itemData)
                        .end((itemErr, itemRes) => {
                            itemRes.should.have.status(200);
                            itemRes.body.should.be.a('object');
                            itemRes.body.items.length.should.be.eql(1);
                            done();
                        });
                });
        });
    });
});