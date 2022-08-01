import { recommendationFactory } from "../tests/factories/recomendationsFactory.js";
import { prisma } from "./../src/database.js";

const SEED_SIZE = 5;

async function main(){
    await prisma.$executeRaw`
        TRUNCATE TABLE recommendations
        RESTART IDENTITY;
    `;

    let dataArr = [];
    for(let i = 0; i < SEED_SIZE; i++){
        dataArr.push(recommendationFactory());
    };
    await prisma.recommendation.createMany({
        data: dataArr
    });
};

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});