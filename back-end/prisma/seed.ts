import { prisma } from "./../src/database.js";

async function main(){
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
    await prisma.recommendation.createMany({
        data: [
            {
                id: 1,
                name: "seed 1",
                youtubeLink:"https://www.youtube.com/watch?v=QJJYpsA5tv8"
            },
            {
                id: 2,
                name: "seed 2",
                youtubeLink:"https://www.youtube.com/watch?v=QJJYpsA5tv8"
            },
            {
                id: 3, 
                name: "seed 3",
                youtubeLink:"https://www.youtube.com/watch?v=QJJYpsA5tv8"
            },
        ]
    });
};

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});