const isApiGatewayResponse = (response : any) => {
    const {body, statusCode} = response;

    if(!body || !statusCode) return false;
    if(typeof statusCode !== 'number') return false;
    if(typeof body !== 'string') return false;
    
    return true;
}

export default {
    isApiGatewayResponse
}