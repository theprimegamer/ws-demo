import AWS from "aws-sdk";
AWS.config.region = "us-east-1";

export const sendUpdateMessage = (message: string) => {
  const params: AWS.SNS.PublishInput = {
    Message: message,
    TopicArn: process.env.UPDATE_SNS_ARN,
  };

  console.log("Sending", message, "to", process.env.UPDATE_SNS_ARN);
  const p = new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();

  p.then((d) => {
    console.log(d);
  }).catch((e) => {
    console.error(e);
  });
};
