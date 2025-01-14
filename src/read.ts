import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const queueURL = "https://sqs.us-east-1.amazonaws.com/749517734416/my-queue";

const params: AWS.SQS.ReceiveMessageRequest = {
  QueueUrl: queueURL,
  MaxNumberOfMessages: 10,
  VisibilityTimeout: 30,
};

sqs.receiveMessage(
  params,
  function (err: AWS.AWSError, data: AWS.SQS.ReceiveMessageResult) {
    if (err) {
      console.log("Error:", err);
    } else if (data?.Messages) {
      data.Messages.forEach((message) => {
        if (message.Body) {
          console.log("Message:", message.Body);
        }
      });
    }
  }
);
