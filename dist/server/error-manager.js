import createDebug from 'debug';
const debug = createDebug('library:server:errors');
export const errorManager = (error, response) => {
    if (!('status' in error)) {
        error = {
            ...error,
            statusCode: 500,
            status: 'Internal Server Error',
        };
    }
    const publicMessage = `Error: ${error.statusCode} ${error.status}`;
    debug(publicMessage, error.message);
    const html = `<p>${publicMessage}</p>`;
    response.statusCode = error.statusCode;
    response.statusMessage = error.status;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(html);
};
