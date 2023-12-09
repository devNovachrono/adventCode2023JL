import { input } from "../input/day9input.js";
//let input = testInput;

let histories = input.split('\n').map(x => {return x.split(" ").map(y => {return parseInt(y);});});

function getNextSequence(cs) {return cs.map((x,y) => {if (y - 1 >= 0) return cs[y] - cs[y - 1];}).filter(x => {return x !== undefined;});}

function getExpected(h, d)
{
    d = Math.min(Math.max(d, -1), 1);
    if (d == 0) return h;
    let sequences = [];
    while(h.filter(x => {return x == h[0]}).toString() != h.toString())
    {
        sequences.push(h);
        h = getNextSequence(h);
    }
    let seqSum = h[0];
    sequences = d==1 ? sequences : sequences.reverse();
    sequences.forEach(s => {seqSum = s[d==1?s.length - 1:0] + (seqSum * d);});
    return seqSum;
}

function part1(){return histories.map(h => {return getExpected(h,1);}).reduce((a,b) => a+b, 0);}
function part2(){return histories.map(h => {return getExpected(h,-1);}).reduce((a,b) => a+b, 0);}

export const day9 = [part1(),part2()];