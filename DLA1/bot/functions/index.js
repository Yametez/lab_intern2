/* eslint-disable no-undef */
const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  // eslint-disable-next-line max-len
  "Authorization": "Bearer KS9etZYCVHLXllKgZ9KsKcpTZSkQSmwDaTfOFXKjveEKXYhdFOWpRV3tfJawVqvZozYBNI4FSEyrlCwKArrllY+Zz6t892lr9poWdY3CpzcLc4453jN+ZNgg887//Zz766dJDKoTs9WlEAiWNXz3vQdB04t89/1O/w1cDnyilFU=",
};

exports.LineBot = functions.https.onRequest((req, res) => {
  console.log(req.body.events);

  // ตรวจสอบว่ามี events และมีข้อความหรือไม่
  if (req.body.events && req.body.events.length > 0) {
    const event = req.body.events[0];

    // ตรวจสอบประเภทของข้อความ
    if (event.message) {
      if (event.message.type === "text") {
        replyWithText(event);
      } else if (event.message.type === "image") {
        replyWithImage(event);
      } else if (event.message.type === "audio") {
        replyWithAudio(event);
      } else if (event.message.type === "video") {
        replyWithVideo(event);
      } else if (event.message.type === "location") {
        replyWithlocation(event);
      } else if (event.message.type === "file") {
        replyWithfile(event);
      } else if (event.message.type === "sticker") {
        replyWithsticker(event);
      }
    }
  }

  res.status(200).send("OK");
});

// ฟังก์ชันสำหรับตอบกลับข้อความไปยังผู้ใช้ LINE
const replyWithText = (event) => {
  const replyToken = event.replyToken;
  const userMessage = event.message.text;


  // ตอบกลับข้อความ
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: userMessage, // ตอบกลับด้วยข้อความที่ผู้ใช้ส่งมา
        },
      ],
    }),
  });
};

// ฟังก์ชันสำหรับตอบกลับรูปภาพไปยังผู้ใช้ LINE
const replyWithImage = (event) => {
  const replyToken = event.replyToken;

  // ตอบกลับด้วยรูปภาพ
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "image",
          originalContentUrl: "https://i.imgflip.com/15b5sl.jpg", // URL รูปภาพขนาดใหญ่
          previewImageUrl: "https://i.imgflip.com/15b5sl.jpg", // URL รูปภาพขนาดเล็ก
        },
      ],
    }),
  });
};

// ตอบกลับด้วยเสียง
const replyWithAudio= (event) => {
  const replyToken = event.replyToken;
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "audio",
          originalContentUrl: "https://od.lk/s/ODZfNjMxODcyMTdf/TV.mp3", // URL เสียง
          duration: 2000, // ความยาวเสียง
        },
      ],
    }),
  });
};

// ตอบกลับด้วยวิดีโอ
const replyWithVideo= (event) => {
  const replyToken = event.replyToken;
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "video",
          originalContentUrl: "https://od.lk/s/ODZfNjMxODcyODBf/shikanoko%20nokonoko%20koshitantan%20%5BMy%20Deer%20Friend%20Nokotan%5D.mp4", // URL วิดีโอขนาดใหญ่
          previewImageUrl: "https://i.ytimg.com/vi/K2IrTtXtHCU/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLDPaGVAH2U2isw5jtqJYlsoqav1Aw", // URL รูปภาพตัวอย่าง
        },
      ],
    }),
  });
};

// ตอบกลับด้วยตำแหน่งที่ตั้ง
const replyWithlocation= (event) => {
  const replyToken = event.replyToken;
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "location",
          title: "BETASK CONSULTING CO. LTD", // ชื่อสถานที่
          address: "บริษัท", // ที่อยู่
          latitude: 13.935851769914855,
          longitude: 100.53733088556807,
        },
      ],
    }),
  });
};
// ตอบกลับด้วยFile
const replyWithfile= (event) => {
  const replyToken = event.replyToken;
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "file",
          originalContentUrl: "https://www.yorku.ca/caitlin/futurecinemas/resources/coursepack/wardripchap1.pdf",
          fileName: "เอกสารgame.pdf",
          fileSize: 3215463,
        },
      ],
    }),
  });
};

// ตอบกลับด้วยSticker
const replyWithsticker= (event) => {
  const replyToken = event.replyToken;
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "sticker",
          stickerId: "16581266",
          packageId: "8522",
        },
      ],
    }),
  });
};
