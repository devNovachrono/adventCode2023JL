import { scratchCards } from '../input/scratchCards.js';

let cards = scratchCards.split('\n');

function calculatePoints()
{
    let totalPoints = 0;
    for (var cardPos in cards)
    {
        let card = cards[cardPos];

        var totalWinningNumbers = 0;
        for (var a in card["my"])
        {
            let b = card["my"][a];
            let isWinningNumber = card["win"].find((e) => e == b);
            if (isWinningNumber)
            {
                totalWinningNumbers++;
                card["correct"].push(b);
            }
        }
        totalPoints += totalWinningNumbers == 0 ? 0 : (() => {let y = 1; for (let x = 1; x < totalWinningNumbers; x++) {y *= 2;} return y;})();
    }
    return totalPoints;
}

function organizeCards()
{
    let result = {};
    for (var i = 1; i <= cards.length; i++)
    {
        let element = cards[i - 1];
        let numbers = element.split(": ")[1].split(" |");
        let winningNumbers = numbers[0].split(" ").filter(function (e) {
            return e != "";
        });
        let myNumbers = numbers[1].split(" ").filter(function (e) {
            return e != "";
        });
        result[i] = {
            "win": winningNumbers,
            "my": myNumbers,
            "correct": [],
            "copies": 1
        };
    }
    cards = result;
}

organizeCards();
let winningPoints = calculatePoints();
for (var cardPos in cards)
{
    let card = cards[cardPos];
    if (!card["correct"].length > 0) continue;
    for (var a = 1; a <= card["correct"].length; a++)
    {
        cards[parseInt(cardPos) + a]["copies"] += card["copies"];
    }
}

export const day4 = [winningPoints, (() => {let v = 0; for(let i in cards) {v += cards[i]["copies"];} return v;})()];