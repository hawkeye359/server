// This needs to be run only once to setup the database at the time of database initialization
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export default async function main(
  firstName,
  lastName,
  gender,
  phone,
  email,
  session,
  sessionPackage
) {
  const user = await prisma.schedule.find({});
  console.dir(allUsers[0].Users);
  await prisma.schedule.create({
    data: {
      firstName,
      lastName,
      gender,
      phone,
      email,
      schedule: session,
      sessionPackage,
    },
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
