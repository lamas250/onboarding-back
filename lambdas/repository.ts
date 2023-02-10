import AWS from "aws-sdk"; 
import crypto from 'crypto';

const ONBOARDING_TABLE = process.env.ONBOARDING_TABLE ? process.env.ONBOARDING_TABLE : 'onboarding-table'; 

const documentClient = new AWS.DynamoDB.DocumentClient();

interface ICreateOnboardingData {
    tag: string,
	value: number,
	type: string,
}

interface ICreateOnboardingObj {
	id: string,
	tag: string,
	value: number,
	type: string,
	timestamp: number
}

const saveItem = async ({tag, value, type}: ICreateOnboardingData) => {
    const newItem: ICreateOnboardingObj =  {
            id: crypto.randomUUID(),
            tag,
            value,
            type,
            timestamp: Date.now(),
        };
        
    await documentClient
        .put({
            TableName: ONBOARDING_TABLE,
            Item: newItem,
        })
        .promise();

    return newItem;
}

const getAll = async () => {
    const res = await documentClient.scan({
        TableName: ONBOARDING_TABLE
    })
    .promise();

    const items = res.Items;

    return items;
}

export default {
    saveItem,
    getAll
}
