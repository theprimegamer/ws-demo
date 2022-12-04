import AWS from "aws-sdk";
AWS.config.region = "us-east-1";

export const sendUpdateMessage = async (message: string) => {
  const params: AWS.SNS.PublishInput = {
    Message: message,
    TopicArn: process.env.UPDATE_SNS_ARN,
  };

  console.log("Sending", message, "to", process.env.UPDATE_SNS_ARN);
  const p = await new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  return p;
};
