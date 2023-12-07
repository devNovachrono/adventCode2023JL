import { input } from '../input/day6input.js';
//let input = testInput;

let times = input.split('\n')[0].split(': ')[1].split(' ');
let distances = input.split('\n')[1].split(': ')[1].split(' ');
let races = times.map((v, i) => {
    return { time: v, distance: distances[i]};
});

function part1()
{
    let sum = 1;
    for (var i in races)
    {
        let p = 0;
        let race = races[i];
        for (var x = 1; x <= race.time; x++)
        {
            if ((race.time - x) * x > race.distance) p++;
        }
        sum *= p;
    }
    
    return sum;
}

function part2()
{
    let t = times.toString().replaceAll(',','');
    let d = distances.toString().replaceAll(',','');

    let min = parseInt(t / 2 - (Math.sqrt(Math.pow(t, 2) - 4 * d)) / 2);
    let max = parseInt(t / 2 + (Math.sqrt(Math.pow(t, 2) - 4 * d)) / 2);
    return max - min;
}

export const day6 = [part1(), part2()];