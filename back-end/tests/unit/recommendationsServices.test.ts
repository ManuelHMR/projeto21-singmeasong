import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationFactory } from "./../factories/recomendationsFactory";
import { Recommendation } from "@prisma/client";

jest.mock("../../src/repositories/recommendationRepository")

const recommendation = recommendationFactory();
const recommendationFull = {...recommendation, score: -4, id: 200} as Recommendation;

describe("tests insert service", () => {
    it("try to insert a new recommendation", async () => {
        jest.spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce(() : any=> {});
        jest.spyOn(recommendationRepository, "create")
        .mockImplementationOnce(() : any => {});
        await recommendationService.insert(recommendationFactory());
        expect(recommendationRepository.create).toBeCalled;
        expect(recommendationRepository.findByName).toBeCalled;
    });
    it("try to insert a recommendation that already exists", async () => {
        jest.spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce(() : any=> recommendation);
        expect(recommendationService.insert(recommendationFactory())).rejects.toEqual({
            message: 'Recommendations names must be unique',
            type: 'conflict'
        });
    });
});

describe("tests upvote service", () => {
    it("try to upvote a recommendation", async () => {
        jest.spyOn(recommendationRepository, "find")
        .mockImplementationOnce(() : any => recommendationFull);
        jest.spyOn(recommendationRepository, "updateScore")
        .mockImplementation(() : any=> {return {...recommendationFull, score: recommendationFull.score +1}});
        const result = await recommendationService.upvote(recommendationFull.id);
        expect(result).toBe(undefined);
    });
    it("try to upvote an invalid recommendation", async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(null);
        expect(recommendationService.upvote(1)).rejects.toEqual({
            message: '',
            type: 'not_found',
        });
    });
});

describe("tests downvote service", () => {
    it("try to downvote a recommendation", async () => {
        jest.spyOn(recommendationRepository, "find")
        .mockImplementationOnce(() : any => recommendationFull);
        jest.spyOn(recommendationRepository, "updateScore")
        .mockImplementation(() : any=> {return {...recommendationFull, score: recommendationFull.score -1}});
        const result = await recommendationService.downvote(recommendationFull.id);
        expect(result).toBe(undefined);
    });
    it("try to downvote and remove a recommendation", async () =>{
        recommendationFull.score = -6;
        jest.spyOn(recommendationRepository, 'find')
        .mockImplementationOnce(() : any=> recommendationFull);
        jest.spyOn(recommendationRepository, 'updateScore')
        .mockImplementationOnce(() : any=> recommendationFull);
        jest.spyOn(recommendationRepository, 'remove')
        .mockImplementationOnce(() : any => null);
        const result = await recommendationService.downvote(recommendationFull.id);
        expect(result).toBeUndefined();
    });
    it("try to downvote an invalid recommendation", async ()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(null);
        expect(recommendationService.downvote(1)).rejects.toEqual({
            message: '',
            type: 'not_found',
        });
    });
});

describe("tests getById service", () => {
    it("try to find a recommendation with a valid id", async () => {
        jest.spyOn(recommendationRepository, 'find')
        .mockImplementationOnce(():any => recommendationFull);
        const result =  await recommendationService.getById(recommendationFull.id);
        expect(result).toEqual(recommendationFull);
    });
    it('try to find a recommendation without valid id', async () => {
        jest.spyOn(recommendationRepository, 'find')
        .mockImplementationOnce(():any => null);
        expect(recommendationService.getById(1)).rejects.toEqual({
            message: '',
            type: 'not_found',
        });
    });    
});

describe("tests getRandom service", () => {
    it('getRandom function test (30% scenario)', async () => {
        const recommendation = recommendationFactory()
        const recommendationData = { ...recommendation, id: 1, score: 11 }
        const chance = 0.7
        const index = 0
    
        jest.spyOn(Math, 'random')
          .mockImplementationOnce((): any => chance)
    
        jest.spyOn(recommendationRepository, 'findAll')
          .mockImplementationOnce((): any => [recommendationData, { ...recommendationData, id: 2 }])
    
        jest.spyOn(Math, 'floor')
          .mockImplementationOnce((): any => index)
    
        const response = await recommendationService.getRandom()
    
        expect(Math.random).toBeCalled()
        expect(recommendationRepository.findAll).toBeCalled()
        expect(Math.floor).toBeCalled()
        expect(response).toBe(recommendationData)
      })
    
      it('getRandom function fail test (70% scenario)', async () => {
        const chance = 0.3
        const index = 0
        jest.spyOn(Math, 'random')
        .mockImplementationOnce((): any => chance)
        jest.spyOn(recommendationRepository, 'findAll')
        .mockImplementationOnce((): any => [])
        jest.spyOn(recommendationRepository, 'findAll')
        .mockImplementationOnce((): any => [])
        jest.spyOn(Math, 'floor')
        .mockImplementationOnce((): any => index)
        const response = recommendationService.getRandom()
        expect(Math.random).toBeCalled()
        expect(recommendationRepository.findAll).toBeCalled()
        expect(Math.floor).toBeCalled()
        expect(response).rejects.toEqual({ message: '', type: 'not_found' })
      })
});


describe("tests get all recommendations service", () => {
    it("try to get all recommendations", async () => {
        jest.spyOn(recommendationRepository, 'findAll')
        .mockImplementationOnce((): any=> [recommendationFull]);
        const result = await recommendationService.get();
        expect(result).not.toBeNull();
    });
});

describe("tests getTop service", () => {
    it("try get ranked recommendations", async () => {
        jest.spyOn(recommendationRepository, 'getAmountByScore')
        .mockImplementationOnce(():any => recommendation);
        const result = await recommendationService.getTop(3);
        expect(result).not.toBeNull();
    });
});