import { input } from '../input/day8input.js';
//let input = testInput2;

function setupTunnel(data)
{
    let result = {};
    let paths = data.split('\n');
    for (var i in paths)
    {
        let pathName = paths[i].split(' =')[0];
        let pathOptions = paths[i].split("(")[1].substring(0, 8).split(', ');
        result[pathName] = pathOptions;
    }
    return result;
}



function GCD(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 

function LCM(a, b)
{
    let gcd = GCD(a, b);
    return (a * b) / gcd; 
} 

let directions = input.split('\n')[0];
let tunnelData = setupTunnel(input.split('\n\n')[1]);

function part1()
{
    let steps = 0;
    let currentPath = "AAA";
    while (currentPath != "ZZZ")
    {
        let currentDirection = directions.charAt(steps % (directions.length)) == 'L' ? 0 : 1;
        currentPath = tunnelData[currentPath][currentDirection];
        steps++;
    }
    console.log(steps);
}

function part2()
{
    let steps = 0;
    let currentPaths = Object.keys(tunnelData).filter(x => x.endsWith("Z"));
    let takes = {

    }
    while (true)
    {
        for (var i in currentPaths)
        {
            let currentDirection = directions.charAt(steps % (directions.length)) == 'L' ? 0 : 1;
            currentPaths[i] = tunnelData[currentPaths[i]][currentDirection];
        }
        steps++;
        currentPaths.forEach(x => {
            if (x.endsWith("Z") && takes[x] == null) takes[x] = steps;
        })
        if (currentPaths.length == Object.keys(takes).length) break;
    }
    takes = Object.values(takes);
    let lcm = takes[0];
    takes.forEach(e => {
        lcm = LCM(lcm, e);
    })
    return lcm;
}

export const day8 = [part1(),part2()];