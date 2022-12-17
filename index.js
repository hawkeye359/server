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
async function check_with_id(id) {
  let existing = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return existing;
}
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("ok 200");
});
function paymentHandler(name, card) {
  return true;
}
app.post("/payment", async (req, res) => {
  try {
    const data = req.body;
    let existing;
    try {
      existing = await check_with_id(data.id);
    } catch (e) {
      const response = await JSON.stringify({ code: 1, res: "server error" });
      res.send(response);
    }
    if (!existing) {
      const response = JSON.stringify({
        code: 1,
        res: "user does not exist. Please provide correct id",
      });
      res.send(response);
    } else {
      try {
        if (paymentHandler(data.name, data.card)) {
          await prisma.user.update({
            where: {
              id: parseInt(data.id),
            },
            data: {
              fee_current: data.fee_current,
              fee_next_month: data.fee_next_month,
            },
          });
          const response = JSON.stringify({
            code: 0,
            res: "fee successfully submitted",
          });
          res.send(response);
        }
      } catch (e) {
        console.log(e);
        const response = JSON.stringify({
          code: 0,
          res: "Server Error! Please try again with correct data or try again later",
        });
        res.send(response);
      }
    }
  } catch (e) {
    const response = JSON.stringify({
      code: 1,
      res: "server error",
    });
    res.send(response);
  }
});
app.get("/feeDetails", async (req, res) => {
  try {
    const data = req.query;
    console.log(req.query);
    try {
      const existing = await check_with_id(data.id);
      if (!existing) {
        const response = JSON.stringify({ code: 1, res: "id not found" });
        res.send(response);
      } else {
        const resp = {
          fee_current: existing.fee_current,
          fee_next_month: existing.fee_next_month,
        };
        console.log(resp);
        const response = await JSON.stringify(resp);
        res.status(200);
        res.send(response);
      }
    } catch (e) {
      const response = await JSON.stringify({ code: 1, res: "id not found" });
      res.send(response);
    }
  } catch (e) {
    const response = await JSON.stringify({
      code: 1,
      res: "server error",
    });
    res.send(response);
  }
});
app.post("/register", async (req, res) => {
  try {
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
        res.status(200);
        const response = await JSON.stringify({ res: "ok", id: user.id });
        res.send(response);
      } catch (e) {
        console.log(e);
        let response = await JSON.stringify({ res: 1 });
        res.send(response);
      }
    }
  } catch (e) {
    const response = await JSON.stringify({
      res: 1,
    });
    res.send(response);
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`started the app at port ${PORT}`);
});
