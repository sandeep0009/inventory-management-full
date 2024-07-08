class CustomError extends Error{
    statusCode=500
    constructor(statusCode,msg){
        super(msg);
        this.msg=msg;
        this.statusCode=statusCode;


    }
}

export default CustomError;