import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import repository from './repository';
import validation from './validation';

export interface ICreateOnboardingData {
    tag: string,
	value: number,
	type: string,
}

export const create = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {
	try{
		const data = JSON.parse(event.body!);

		const {error} = validation.handle(data);
		if(error){
			return {
				statusCode: 400,
				body: JSON.stringify(error.details[0].message)
			};
		}

		const newItem = await repository.saveItem(data)

		return {
			statusCode: 200,
			body: JSON.stringify(newItem),
		};
	} catch(err: any){
		console.log(err);
		throw new Error(err);
	}
};

export const get = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {
	try{
		const items = await repository.getAll();

		return {
			statusCode: 200,
			body: JSON.stringify(items),
		};
	} catch(err: any){
		console.log(err);
		throw new Error(err);
	}
};