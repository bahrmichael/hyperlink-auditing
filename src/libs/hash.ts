import * as crypto from "crypto";

function createHash(value: string): string {
    return crypto.createHash('md5').update(value).digest('base64');
}

export function getId(requestContext: any): string {
    const {sourceIp, userAgent} = requestContext.identity;
    return createHash([
        sourceIp,
        userAgent,
        requestContext.accountId,
        new Date().toISOString().split('T')[0]
    ].join());
}