import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'profiles',
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    if(result.Items[0])
    callback(null, success(result.Items[0]));
    else
      callback(null, success({}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};