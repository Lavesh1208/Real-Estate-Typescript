export interface CustomeErrorType {
   data: {
      message: string;
      error: string;
      statusCode: number;
   };
   status: number;
}
