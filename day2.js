import { input } from './cubePuzzleInput.js';

function orderGameData(data)
{
    let orderedData = {};
    data.forEach(element => {
        let gameId = element.split(':')[0].split(' ')[1];
        let rounds = element.split(': ')[1].split('; ');
        orderedData[gameId] = {
            'red': 0,
            'green': 0,
            'blue': 0
        };
        rounds.forEach(round => {
            let colorStrings = round.split(', ');
            colorStrings.forEach(colorCode => {
                colorCode = colorCode.split(' ');
                let colorAmount = parseInt(colorCode[0]);
                let color = colorCode[1];
                if (colorAmount > orderedData[gameId][color])
                {
                    orderedData[gameId][color] = colorAmount;
                }
            });
        });
    });
    return orderedData;
}

function findPossibleGames(data)
{
    let redPossible = 12;
    let greenPossible = 13;
    let bluePossible = 14;
    let possibleGames = [];
    for (var i = 1; i <= Object.keys(data).length; i++)
    {
        let element = data[i];
        if (element["red"] <= redPossible && element["green"] <= greenPossible && element["blue"] <= bluePossible)
        {
            possibleGames.push(i);
        }
    }
    return possibleGames;
}

function findPowers(data)
{
    let result = [];
    for (var i = 1; i <= Object.keys(data).length; i++)
    {
        let element = data[i];
        result.push(element["red"] * element["green"] * element["blue"]);
    }
    return result;
}

let gameStrings = input.split('\n');
let orderedData = orderGameData(gameStrings);
let possibleGames = findPossibleGames(orderedData);
let powers = findPowers(orderedData);

let addedIds = (() => {let v = 0; for (let i in possibleGames) {v += possibleGames[i];} return v;})();
let addedPowers = (() => {let v = 0; for (let i in powers) {v += powers[i];} return v;})();

export const day2 = [addedIds, addedPowers];