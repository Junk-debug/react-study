import { it, expect, describe } from "vitest";
import { convertToCSV } from "../../utils/convertToCSV";
import mockCharacters from "../mocks/mockCharacters";

const result = `id,name,status,species,type,gender,origin/name,origin/url,location/name,location/url,image,episode/0,episode/1,url,created
1,Rick test,Alive,Human,Mad scientist,Male,Earth (C-137),https://rickandmortyapi.com/api/location/1,Earth (Replacement Dimension),https://rickandmortyapi.com/api/location/20,https://rickandmortyapi.com/api/character/avatar/1.jpeg,https://rickandmortyapi.com/api/episode/1,https://rickandmortyapi.com/api/episode/2,https://rickandmortyapi.com/api/character/1,2017-11-04T18:48:46.250Z
2,Morty Smith,Alive,Human,,Male,Earth (C-137),https://rickandmortyapi.com/api/location/1,Earth (Replacement Dimension),https://rickandmortyapi.com/api/location/20,https://rickandmortyapi.com/api/character/avatar/2.jpeg,https://rickandmortyapi.com/api/episode/1,https://rickandmortyapi.com/api/episode/2,https://rickandmortyapi.com/api/character/2,2017-11-04T18:50:21.651Z`;

describe.only("convertToCSV", () => {
  it("should return a scv string", () => {
    expect(convertToCSV(mockCharacters)).toBe(result);
  });

  it("should return an empty string", () => {
    expect(convertToCSV([])).toBe("");
  });
});
