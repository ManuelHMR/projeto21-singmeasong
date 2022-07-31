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
    it("post with valid data", async ()=>{
        const result = await supertest(app).post("/recommendations").send(body);
        expect(result.statusCode).toBe(201);
    });
    it("post with a data that already exists", async ()=>{
        const result = await supertest(app).post("/recommendations").send(body);
        expect(result.statusCode).toBe(409);
    });
    it("post without valid data", async ()=>{
        const result = await supertest(app).post("/recommendations").send({...body, name: ""});
        expect(result.statusCode).toBe(422);
    });
    it("post with other data", async ()=>{
        const result = await supertest(app).post("/recommendations").send({...body, someThingElse: "123"});
        expect(result.statusCode).toBe(422);
    });
});

describe("POST /recommendations/:id/upvote", () =>{
    it("", async ()=>{

    });
});

describe("POST /recommendations/:id/downvote", () =>{
    it("", async ()=>{

    });
});

describe("GET /recommendations", () =>{
    it("", async ()=>{

    });
});

describe("GET /recommendations/:id", () =>{
    it("", async ()=>{

    });
});

describe("GET /recommendations/random", () =>{
    it("", async ()=>{

    });
});

describe("GET /recommendations/top/:amount", () =>{
    it("", async ()=>{

    });
});