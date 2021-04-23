import 'source-map-support/register';

import {htmlResponse} from '@libs/apiGateway';
import {DynamoDB} from 'aws-sdk';
import {getId} from "@libs/hash";

const {TABLE_NAME} = process.env;
const ddb = new DynamoDB.DocumentClient();

export const main = async (event) => {

    const items = (await ddb.query({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': getId(event.requestContext)
        },
        ScanIndexForward: false
    }).promise()).Items;

    const rows = items.map((i) => {
        return `
        <tr>
            <td>${i.date}</td>
            <td>${i.from}</td>
            <td>${i.to}</td>
        </tr>
        `;
    });

    return htmlResponse(`
        <h1>Welcome To Analytics</h1>
        <p><a href="./">Home</a></p>
        <table>
            <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
            </tr>
            ${rows.join('')}
        </table>
    `);
}
