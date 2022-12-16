// This needs to be run only once to setup the database at the time of database initialization
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  //   await prisma.user.create({
  //     data: {
  //       email: "mohdhuzaifa358@gmail.com",
  //       name: "mohd huzaifa",
  //       first_name: "mohd",
  //       last_name: "huzaifa",
  //       mobile: 88,
  //       ScheduleId: 1,
  //     },
  //   });
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
