import 'source-map-support/register';
import {getId} from "@libs/hash";

import {DynamoDB} from 'aws-sdk';

const {TABLE_NAME} = process.env;
const ddb = new DynamoDB.DocumentClient();

export const main = async (event) => {

    const item = {
        id: getId(event.requestContext),
        date: new Date().toISOString(),
        from: event.headers["ping-from"],
        to: event.headers["ping-to"],
    };

    await ddb.put({
        TableName: TABLE_NAME,
        Item: item
    }).promise();

    return {
        statusCode: 200,
        body: ''
    }
}
