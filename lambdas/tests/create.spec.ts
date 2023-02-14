import * as lambdas from '../index';
import eventGenerator from './utils/eventGenerator';
import validators from './utils/validators';

const repository = jest.requireMock('../repository')

jest.mock('../repository', () => ({
    saveItem: jest.fn(),
    getAll: jest.fn()
}))

describe('create file integrations tests', () => {
    test('should take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {}
        } as any);

        const res = await lambdas.create(event as any);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })

    test('should return 200 with correct params', async () => {
        const event = eventGenerator({
            body: {
                tag: 'valid-tag',
                value: 10,
                type: 'valid-type',
            }
        } as any)

        const res = await lambdas.create(event as any);
        expect(res.statusCode).toBe(200);
    })
})


describe('create file unit tests', () => {
    test('shown return status code 400 if tag param not provided',async () => {
        const event = eventGenerator({
            body: {
                value: 10,
                type: 'valid-type'
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });

    test('shown return status code 400 if value param not provided',async () => {
        const event = eventGenerator({
            body: {
                type: 'valid-type',
                tag: 'valid-tag'
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });

    test('shown return status code 400 if type param not provided',async () => {
        const event = eventGenerator({
            body: {
                tag: 'valid-tag',
                value: 10,
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });

    test('shown return status code 400 if tag param is not string',async () => {
        const event = eventGenerator({
            body: {
                tag: 111,
                value: 10,
                type: 'valid-type'
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });
    
    test('shown return status code 400 if value param is not number',async () => {
        const event = eventGenerator({
            body: {
                tag: 'valid-tag',
                value: 'invalid-value',
                type: 'valid-type'
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });

    test('shown return status code 400 if type param is not string',async () => {
        const event = eventGenerator({
            body: {
                tag: 'valid-tag',
                value: 10,
                type: 10
            }
        } as any)

        const res = await lambdas.create(event as any);

        expect(res.statusCode).toBe(400);
    });

    test('should call saveItem with corret params',async () => {
        const mockTag = {
            tag: 'valid-tag',
            value: 10,
            type: 'valid-type',
        }
        const event = eventGenerator({
            body: mockTag
        } as any)

        const mockTimestamp = Date.now()
        repository.saveItem.mockResolvedValueOnce({
            id: 'valid-id',
            timestamp: mockTimestamp,
            ...mockTag
        })

        const res = await lambdas.create(event as any);

        expect(repository.saveItem).toHaveBeenCalledWith(mockTag);
        expect(res).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                id: 'valid-id',
                timestamp: mockTimestamp,
                ...mockTag
            })
        })
    });
})