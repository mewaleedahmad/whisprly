import https from "https"
import http from "http"

const API_URL =
process.env.NODE_ENV === "development"
? "http://localhost:8000"
: process.env.API_URL;

const keepAppRunning = async () => {
  
  setInterval(() => {
    const protocol = API_URL.startsWith("https") ? https : http;
    const pingUrl = `${API_URL}/`;

    protocol.get(pingUrl, (res) => {
      console.log("Pinging app:", res.statusCode);
    }).on('error', (err) => {
      console.log("Error pinging app:", err.message);
    });
  }, 10 * 60 * 1000);

}

export default keepAppRunning;
