const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookiePasrser = require('cookie-parser')
const cors = require("cors");
const http = require('http')
const { MongoClient } = require('mongodb');

const authRoute = require("../Api/Rotues/auth")
const cafeRoute = require("../Api/Rotues/cafe")
const menuRoute = require("../Api/Rotues/menu")
const orderRoute = require("../Api/Rotues/order")

const stream = require('stream');



async function monitorListingsUsingEventEmitter(client, pipeline = []) {

  const collection = client.db("test").collection("orders");
  const changeStream = collection.watch(pipeline);

  changeStream.stream().pipe(
    new stream.Writable({
      objectMode: true,
      write: function (doc, _, cb) {



        if (doc.operationType === 'update') {

          io.on('connection', (socket) => {
            socket.emit("orderComplete", { status: 200 })
          })

        }

        cb();
      }
    })
  );


}

dotenv.config();

app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(async () => {
    const client = new MongoClient(process.env.MONGO_URL)
    await client.connect()

    const pipeline = [
      {
        '$match': {
          'operationType': 'update'
        },
      }
    ];

    await monitorListingsUsingEventEmitter(client, pipeline);
    console.log("DB COnnection Succesful")
  });
}


app.use(express.json())
app.use(cookiePasrser())

app.use("/auth", authRoute)
app.use("/cafe", cafeRoute)
app.use("/menu", menuRoute)
app.use("/order", orderRoute)

const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})


io.on('connection', (socket) => {
  console.log(socket.id + " Joined")
  io.removeAllListeners();
  socket.on('disconnect', function () {
    console.log("disconnected");
  });
})


server.listen(6969, () => {
  console.log("Backend Server is Running");
})