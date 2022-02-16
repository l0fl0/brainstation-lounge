import React from "react";
import { io } from "socket.io-client";
const SOCKET_URL = "https://bslounge.netlify.app";

export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();
