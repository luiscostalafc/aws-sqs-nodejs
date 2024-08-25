import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const queueURL = "https://sqs.us-east-1.amazonaws.com/749517734416/my-queue";

const params: AWS.SQS.ReceiveMessageRequest = {
  QueueUrl: queueURL,
  MaxNumberOfMessages: 10,
  VisibilityTimeout: 30,
  WaitTimeSeconds: 0,
};

function deleteMessage() {
  sqs.receiveMessage(
    params,
    function (err: AWS.AWSError, data: AWS.SQS.ReceiveMessageResult) {
      if (err) {
        console.log("Error:", err);
      } else if (data?.Messages?.length) {
        console.log("Number of messages received::", data.Messages.length);

        data.Messages.forEach((message) => {
          if (message.ReceiptHandle) {
            const deleteParams: AWS.SQS.DeleteMessageRequest = {
              QueueUrl: queueURL,
              ReceiptHandle: message.ReceiptHandle,
            };

            sqs.deleteMessage(deleteParams, function (err: AWS.AWSError, data) {
              if (err) {
                console.log("Delete Error:", err);
              } else {
                console.log("Message Deleted:", data);
              }
            });
          }
        });
      } else {
        console.log("No messages to delete");
      }
    }
  );
}

deleteMessage();
