const createLambda = require('../create');
const eventGenerator = require('./utils/eventGenerator');
const validators = require('./utils/validators');

describe('create file integrations tests', () => {
    test('should take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {}
        })

        const res = await createLambda.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })

    // test('should return 200 with correct params', async () => {
    //     const event = eventGenerator({
    //         body: {
    //             tag: 'valid-tag',
    //             value: 10,
    //             type: 'valid-type',
    //         }
    //     })

    //     const res = await createLambda.handler(event);
    //     console.log(res);
    //     expect(res.statusCode).toBe(200);
    // })
})



describe('create file unit tests', () => {
    test('shown return status code 400 if tag param not provided',async () => {
        const event = eventGenerator({
            body: {
                value: 10,
                type: 'valid-type'
            }
        })

        const res = await createLambda.handler(event);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual('Missing param: tag');
    });

    test('shown return status code 400 if value param not provided',async () => {
        const event = eventGenerator({
            body: {
                type: 'valid-type',
                tag: 'valid-tag'
            }
        })

        const res = await createLambda.handler(event);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual('Missing param: value');
    });

    test('shown return status code 400 if type param not provided',async () => {
        const event = eventGenerator({
            body: {
                tag: 'valid-tag',
                value: 10,
            }
        })

        const res = await createLambda.handler(event);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual('Missing param: type');
    });
})