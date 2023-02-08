"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
const ONBOARDING_TABLE = process.env.ONBOARDING_TABLE;
const documentClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
module.exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const requiredFields = [
            "tag",
            "value",
            "type"
        ];
        for (const field of requiredFields) {
            if (!body[field]) {
                return {
                    statusCode: 400,
                    body: `Missing param: ${field}`
                };
            }
        }
        const { tag, value, type } = event;
        const newItem = {
            id: crypto_1.default.randomUUID(),
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
        return {
            statusCode: 200,
            body: JSON.stringify(newItem),
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            // body: "Internal server error"
            body: err
        };
    }
};
