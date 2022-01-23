const sendGrid = require("@sendgrid/mail");

sendGrid.setApiKey(process.env.sendGridAPIKey);

const mail = {
  to: "", // Change to your recipient
  from: "", // Change to your verified sender
  subject: "",
  text: "",
  html: "",
};

sendGrid
  .send(mail)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
