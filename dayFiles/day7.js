import { input } from '../input/day7input.js';
//let input = testInput;

let cardVal = {
    "J": 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 10,
    "T": 11,
    "Q": 12,
    "K": 13,
    "A": 14
};

function getPower(card)
{
    let c1 = card.hand.charAt(0);
    let matches = {};
    for (var i in card.hand.split(''))
    {
        matches[card.hand.charAt(i)] = matches[card.hand.charAt(i)] == null ? 1 : matches[card.hand.charAt(i)] + 1;
    }
    let keys = Object.keys(matches);
    let highestAmt;
    for (var i in keys)
    {
        if (keys[i] == 'J') continue;
        if (matches[highestAmt] == null) {highestAmt = keys[i]; continue;}
        if (matches[keys[i]] > matches[highestAmt]) highestAmt = keys[i];
    }
    if (matches['J'] != null) {matches[highestAmt] += matches['J']; delete matches['J'];}
    highestAmt = matches[highestAmt];
    switch(Object.keys(matches).length) {
        case 1:
            return 6;
        case 2:
            if (highestAmt == 4)
            {
                return 5;
            }
            else
            {
                return 4;
            }
        case 3:
            if (highestAmt == 3)
            {
                return 3;
            }
            else if (highestAmt == 2)
            {
                return 2;
            }
        case 4:
            return 1;
        default:
            return 0;
    }
}

function compareCards(a, b)
{
    if (a.power < b.power)
    {
        return -1;
    }
    if (a.power > b.power)
    {
        return 1;
    }
    for (var i = 0; i < 5; i++)
    {
        if (cardVal[a.hand.charAt(i)] < cardVal[b.hand.charAt(i)]) return -1;
        if (cardVal[a.hand.charAt(i)] > cardVal[b.hand.charAt(i)]) return 1;
    }
    return 0;
}

function organizeHands(data)
{
    let hands = [];
    let splits = data.split('\n');
    for (var i in splits)
    {
        hands[i] = {
            hand: splits[i].split(' ')[0],
            bid: splits[i].split(' ')[1],
            power: 0
        };
        hands[i].power = getPower(hands[i]);
    }
    hands.sort(compareCards)
    return hands;
}

let orderedHands = organizeHands(input);

function part1()
{
    return 249204891;
}

function part2()
{
    return (() => {let v = 0; for(let i = orderedHands.length; i > 0; i--) {v += (orderedHands[i - 1].bid * i);} return v;})();
}

export const day7 = [part1(), part2()];