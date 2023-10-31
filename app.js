const Users = require("./models/usersSchema");
const Message = require("./models/messageSchema");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");

const database = require("./database/config");
const router = require("./routes/index");
const port = process.env.PORT || 3000;

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.set("view engine", "ejs");
database();
app.use(express.static(__dirname + "public"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Ganti deklarasi activeConnections menjadi objek yang lebih kompleks
const activeConnections = {};

io.on("connection", (socket) => {
  console.log(`User connected: Socket ID - ${socket.id}`);

  // Public Room Chat
  // Event listener untuk menerima pesan dari klien
  socket.on("chatMessage", (data) => {
    console.log("Received message:", data.message);

    // Broadcast pesan ke semua klien yang terhubung
    io.emit("chatMessage", data);
  });

  socket.on("join", (data) => {
    const { from, to } = data;

    // Inisialisasi array jika belum ada untuk koneksi dari dan ke
    activeConnections[from] = activeConnections[from] || [];
    activeConnections[to] = activeConnections[to] || [];

    // Tambahkan ID socket ke array koneksi
    activeConnections[from].push(socket.id);
    activeConnections[to].push(socket.id);

    socket.join(`${from}_${to}`);
  });

  socket.on("private_message", (data) => {
    const { from, to, message } = data;

    // Mengambil semua ID socket terkait dengan nama pengguna 'to'
    const recipientSocketIds = activeConnections[to] || [];

    // Mengirim pesan ke semua ID socket yang terkait
    recipientSocketIds.forEach((recipientSocketId) => {
      io.to(recipientSocketId).emit("private_message", {
        from,
        to,
        message,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: Socket ID - ${socket.id}`);

    // Hapus ID socket saat pengguna terputus
    for (const key in activeConnections) {
      activeConnections[key] = activeConnections[key].filter(
        (id) => id !== socket.id
      );
      if (activeConnections[key].length === 0) {
        delete activeConnections[key];
      }
    }
  });
});

app.use(router);

server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
