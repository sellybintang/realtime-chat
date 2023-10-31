const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Users = require("../models/usersSchema");

exports.connectionSocket = async () => {
  io.on("connection", (socket) => {
    console.log("Klien terhubung");

    // Handle pesan yang dikirim dari klien
    socket.on("pesan", (pesan) => {
      console.log("Pesan dari klien:", pesan);

      // Kirim pesan ke semua klien yang terhubung
      io.emit("pesan", pesan);
    });

    socket.on("private_message", async (data) => {
      try {
        const { to, message } = data;
        const receiver = await Users.findOne({ nama: to });

        if (!receiver) {
          console.log(`Data dengan nama ${to} tidak ditemukan`);
          return;
        }
        io.to(to).emit("private_message", { from: socket.id, message });

        const kirimPesan = new message({
          pengirim: socket.id,
          penerima: receiver.socketId,
          isi: message,
        });

        await kirimPesan.save();

        console.log(`Pesan dari ${socket.id} ke ${to}: ${message} `);
      } catch (error) {
        console.error("Terjadi Kesalan dalam mengirim pesan ");
      }

      // Data akan berisi pengguna yang dituju dan pesannya

      // Kirim pesan ke pengguna yang dituju
    });

    // Handle saat klien terputus
    socket.on("disconnect", () => {
      console.log("Klien terputus");
    });
  });
};
