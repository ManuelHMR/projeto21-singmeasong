import {prisma} from "./../database.js"

export async function clearRepository(){
    await prisma.$executeRaw`
    TRUNCATE TABLE recommendations
    RESTART IDENTITY;
    `;
};