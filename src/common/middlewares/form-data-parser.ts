import * as bodyParser from 'body-parser';

// ! valid only for form data of type x-www-form-urlencoded
export const formDataParserMiddleware = bodyParser.urlencoded({
  extended: true,
});
export const jsonParserMiddleware = bodyParser.json();
