const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config(); // for development purposes. comment before production
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function check_for_existing_user(email, phone) {
  let existing = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existing) {
    return true;
  }
  exiting = await prisma.user.findUnique({
    where: {
      phone: BigInt(phone),
    },
  });
  if (existing) {
    return true;
  }
  return false;
}
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("ok 200");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  console.log(req.body);
  const existing = await check_for_existing_user(
    req.body.email,
    req.body.phone
  );
  if (existing) {
    let response = await JSON.stringify({ res: 0 });
    res.send(response);
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          phone: BigInt(data.phone),
          first_name: data.firstName,
          last_name: data.lastName,
          scheduleId: parseInt(data.session),
          sessionPackage: parseInt(data.sessionPackage),
          gender: data.gender,
          fee_current: false,
          fee_next_month: false,
        },
      });
      console.log(something);
      res.status(200);
      const response = await JSON.stringify({ res: "ok", id: user.id });
      res.send(response);
    } catch (e) {
      console.log(e);
      let response = await JSON.stringify({ res: 1 });
    }
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`started the app at port ${PORT}`);
});
