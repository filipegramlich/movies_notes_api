export class AppError {

    public message: any;
    public statusCode: any;

    constructor(props: AppError ){
        Object.assign(this, props);
        this.statusCode = props.statusCode || 400 ; 
    }
}