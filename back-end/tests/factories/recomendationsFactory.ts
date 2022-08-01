import { faker } from '@faker-js/faker';
import { Recommendation } from '@prisma/client';

export function recommendationFactory(){
    const recommendation : Omit<Recommendation, "id" | "score" >  = {
        name: faker.lorem.words(4),
        youtubeLink: "https://www.youtube.com/watch?v=QJJYpsA5tv8"
    }
    return recommendation
}