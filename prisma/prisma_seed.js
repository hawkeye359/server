// This needs to be run only once to setup the database at the time of database initialization
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const allUsers = await prisma.schedule.findMany();
  console.log(allUsers);
  await prisma.schedule.createMany({
    data: [
      {
        id: 1,
        timing: "6AM - 7AM",
      },
      {
        id: 2,
        timing: "7AM - 8AM",
      },
      {
        id: 3,
        timing: "8AM - 9AM",
      },
      {
        id: 4,
        timing: "5PM - 6PM",
      },
    ],
  });
  //   await prisma.schedule.delete({
  //     where: {
  //       id: 1,
  //     },
  //   });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
