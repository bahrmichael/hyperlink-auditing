import 'source-map-support/register';

import {htmlResponse} from '@libs/apiGateway';

export const main = async (event) => {
    return htmlResponse(`
        <h1>Welcome To Hyperlink Auditing</h1>
        <p>Current Page: <pre>${event.path}</pre></p>
        <p>Follow one of the links below to generate data.</p>
        
        <p><a href="./" ping="./ping">Home</a></p>
        <p><a href="./about-me" ping="./ping">About Me</a></p>
        <p><a href="./blog" ping="./ping">Blog</a></p>
        <p><a href="./no-audit">Unaudited Page</a></p>
        
        <hr/>
        <p><a href="./analytics">See the results</a></p>
    `);
}
