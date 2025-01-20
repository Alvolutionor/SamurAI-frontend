import { io } from "socket.io-client";
// main.js

const socket = io(import.meta.env.VITE_BACKEND_SOCKET); // 后端地址
// client-side
socket.on("task", (msg) => {
    const tasks = localStorage.getItem("tasks") ? localStorage.getItem("tasks") : '{}'
    const parsedTasks = JSON.parse(tasks);

    parsedTasks[msg.target] = { 'status': msg.status, 'progress': msg.progress, 'link': msg.link }
    localStorage.setItem("tasks", JSON.stringify(parsedTasks));
    window.dispatchEvent(new Event("localstorage-update"));
});  


export default socket;

