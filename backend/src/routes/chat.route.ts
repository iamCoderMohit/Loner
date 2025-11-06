import { WebSocketServer } from "ws";
import express from "express";
import { prisma } from "../config/prisma.js";

const chatRouter = express.Router();

const WS_PORT = 3001;

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log("ws on port", WS_PORT);
});

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.error(error);
  });

  ws.on("message", async (data) => {
    let jsonData = JSON.parse(data.toString()); //error may come here

    //the data that will be sent from
    //frontend will contain receiver id
    //and sender id

    const senderId = jsonData.senderId;
    const receiverId = jsonData.receiverId;
    const content = jsonData.content; // the main msg

    //trying to update the read receipt
    // ws.on("mess") this is primarily the frontend work

    //storing to db
    try {
      await prisma.message.create({
        data: { 
          senderId,
          receiverId,
          content,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
});

export default chatRouter;
