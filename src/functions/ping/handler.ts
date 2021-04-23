import 'source-map-support/register';
import {getId} from "@libs/hash";

import {DynamoDB} from 'aws-sdk';

const {TABLE_NAME} = process.env;
const ddb = new DynamoDB.DocumentClient();

function getPath(headers: any, key: 'ping-from' | 'ping-to'): string {
    return headers[key].split(headers.Host)[1];
}

export const main = async (event) => {

    const item = {
        id: getId(event.requestContext),
        date: new Date().toISOString(),
        from: getPath(event.headers, "ping-from"),
        to: getPath(event.headers, "ping-to"),
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
