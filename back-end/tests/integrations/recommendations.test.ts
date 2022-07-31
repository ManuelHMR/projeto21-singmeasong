import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "./../../src/database";

afterAll( async ()=>{
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
    await prisma.$disconnect();
})

describe("POST /recommendations", () =>{
    const body = {
        name: "Falamansa - Xote dos Milagres",
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }
    it("try to post with valid data", async ()=>{
        const result = await supertest(app).post("/recommendations").send(body);
        expect(result.statusCode).toBe(201);
    });
    it("try to post with a data that already exists", async ()=>{
        const result = await supertest(app).post("/recommendations").send(body);
        expect(result.statusCode).toBe(409);
    });
    it("try to post without valid data", async ()=>{
        const result = await supertest(app).post("/recommendations").send({...body, name: ""});
        expect(result.statusCode).toBe(422);
    });
    it("try to post with other data", async ()=>{
        const result = await supertest(app).post("/recommendations").send({...body, someThingElse: "123"});
        expect(result.statusCode).toBe(422);
    });
});

describe("POST /recommendations/:id/upvote", () =>{
    it("try to upvote a valid recommendation", async ()=>{
        const result = await supertest(app).post("/recommendations/1/upvote");
        expect(result.statusCode).toBe(200);
    });
    it("try to upvote an invalid recommendation", async ()=>{
        const result = await supertest(app).post("/recommendations/999/upvote");
        expect(result.statusCode).toBe(404);
    });
    it("try to upvote without params", async ()=>{
        const result = await supertest(app).post("/recommendations/upvote");
        expect(result.statusCode).toBe(404);
    });
});

describe("POST /recommendations/:id/downvote", () =>{
    it("try to downvote a valid recommendation", async ()=>{
        const result = await supertest(app).post("/recommendations/1/downvote");
        expect(result.statusCode).toBe(200);
    });
    it("try to downvote an invalid recommendation", async ()=>{
        const result = await supertest(app).post("/recommendations/999/downvote");
        expect(result.statusCode).toBe(404);
    });
    it("try to downvote without params", async ()=>{
        const result = await supertest(app).post("/recommendations/downvote");
        expect(result.statusCode).toBe(404);
    });
});

describe("GET /recommendations", () =>{
    it("try to get recommendations", async ()=>{
        const result =  await supertest(app).get("/recommendations");
        expect(result).not.toBeNull();
    });
});

describe("GET /recommendations/:id", () =>{
    it("try to get recommendation by id", async ()=>{
        const result =  await supertest(app).get("/recommendations/1");
        expect(result).not.toBeNull();
    });
    it("try to get recommendation without a valid id", async ()=>{
        const result =  await supertest(app).get("/recommendations/999");
        expect(result.statusCode).toBe(404);
    });
});

describe("GET /recommendations/random", () =>{
    it("try to get a random recommendation", async ()=>{
        const result = await supertest(app).get("/recommendations/random");
        expect(result).not.toBeNull();
    });
});

describe("GET /recommendations/top/:amount", () =>{
    it("try to get the 3 most upvoted recommendations", async ()=>{
        const result = await supertest(app).get("/recommendations/top/3");
        expect(result).not.toBeNull();
    });
    it("try to get more ranked recommendations than exists", async ()=>{
        const result = await supertest(app).get("/recommendations/top/999");
        console.log(result.text)
        expect(result).not.toBeNull();
    });
});