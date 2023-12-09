import { input } from "../input/day9input.js";
//let input = testInput;

let histories = input.split('\n').map(x => {return x.split(" ").map(y => {return parseInt(y);});});

function getNextSequence(cs)
{
    return cs.map((x,y) => {
        if (y - 1 >= 0)
        {
            return cs[y] - cs[y - 1];
        }
    }).filter(x => {return x !== undefined;});
}

function part1()
{
    let sum = 0;
    histories.forEach(h => {
        let sequences = [];
        while(h.filter(x => {return x == h[0]}).toString() != h.toString())
        {
            sequences.push(h);
            h = getNextSequence(h);
        }
        let seqSum = h[0];
        sequences.forEach(s => {
            seqSum += s[s.length - 1];
        });
        sum += seqSum;
    });
    return sum;
}

function part2()
{
    let sum = 0;
    histories.forEach(h => {
        let sequences = [];
        while(h.filter(x => {return x == h[0]}).toString() != h.toString())
        {
            sequences.push(h);
            h = getNextSequence(h);
        }
        let seqSum = h[0];
        sequences.reverse().forEach(s => {
            seqSum = s[0] - seqSum;
        });
        sum += seqSum;
    });
    console.log(sum);
    return sum;
}

export const day9 = [part1(),part2()];