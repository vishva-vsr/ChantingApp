import React from "react";
import img1 from "./user11.jpeg";
import img2 from "./user22.png";
import img3 from "./user33.png";
import img4 from "./user44.png";
import img5 from "./user55.png";
import  img6 from "./user66.png";
import img7 from "./user77.png";



export const ChatData = [
    {
        name: "Chandru Prakesh",
        role: "Back End",
       id:"user1",
       img: img1,
        messages: [
            { text: "Hello Chandru Prakesh bro!", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Barath Kumaru",
        role: "Back End",
        img: img2,
        // imgs: bg2,
        id:"user2",
        messages: [
            { text: "Hello Barath Kumaru bro!", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Santhosh Kumaru",
        role: "Front End",
        img: img3,
        // imgs: bg3,
        id:"user3",
        messages: [
            { text: "Hello! Santhosh Kumaru bro", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Poiyali Rajau",
        role: "Front End",
        img: img4,
        // imgs: bg1,
        id:"user4",
        messages: [
            { text: "Hello! Poiyali Rajau bro", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Puthca",
        role: "Back End",
        img: img5,
        // imgs: bg2,
        id:"user5",
        messages: [
            { text: "Hello Puthca bro!", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Rosh Hen",
        role: "Back End",
        img: img6,
        // imgs: bg3,
        id:"user6",
        messages: [
            { text: "Hello Rosh Hen bro!", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Arun",
        role: "Front End",
        img: img7,
        // imgs: bg1,
        id:"user7",
        messages: [
            { text: "Hello Arun bro", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Madhesh",
        role: "Back End",
        // img: emp3,
        // imgs: bg2,
        id:"user8",
        messages: [
            { text: "Hello Madhesh Bro", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Monoj",
        role: "Back End",
        // img: emp3,
        // imgs: bg2,
        id:"user9",
        messages: [
            { text: "Hello Monoj Bro!", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
    {
        name: "Rajesh",
        role: "Team Leader",
        // img: emp3,
        // imgs: bg2,
        id:"user10",
        messages: [
            { text: "Hello! Rajesh Bro", type: "received", sender: "Alice" },
            { text: "Hi, how are you?", type: "sent", sender: "Me" },
          ],
    },
];
