import { testInput } from '../input/day5input.js';
let input = testInput;

function setupMap(data)
{
    let result = [];
    data.forEach(e => {
        e = e.split(' ');
        result.push({
            source: parseInt(e[1]),
            dest: parseInt(e[0]),
            range: parseInt(e[2])
        });
    });
    return result;
}

let almanac = [];
let seeds = input.split('\n')[0].split(': ')[1].split(' ');
seeds.forEach((seed, index) => {
    seeds[index] = parseInt(seed);
})
almanac[0] = setupMap(input.split('seed-to-soil map:\n')[1].split('\n\n')[0].split('\n'));
almanac[1] = setupMap(input.split('soil-to-fertilizer map:\n')[1].split('\n\n')[0].split('\n'));
almanac[2] = setupMap(input.split('fertilizer-to-water map:\n')[1].split('\n\n')[0].split('\n'));
almanac[3] = setupMap(input.split('water-to-light map:\n')[1].split('\n\n')[0].split('\n'));
almanac[4] = setupMap(input.split('light-to-temperature map:\n')[1].split('\n\n')[0].split('\n'));
almanac[5] = setupMap(input.split('temperature-to-humidity map:\n')[1].split('\n\n')[0].split('\n'));
almanac[6] = setupMap(input.split('humidity-to-location map:\n')[1].split('\n'));

function part1()
{
    let locationMap = [];
    for (var i in seeds)
    {
        let seed = seeds[i];
        let sourcePos = seed;
loop1:
        for (var a in almanac)
        {
            let map = almanac[a];
            for (var x in map)
            {
                let y = map[x];
                if (sourcePos >= y.source && sourcePos <= y.source + y.range)
                {
                    sourcePos = (sourcePos - y.source) + y.dest;
                    continue loop1;
                }
            }
        }
        locationMap.push(sourcePos);
    }
    return Math.min(...locationMap);
}

function part2()
{
    let sds = [];
    for (var i = 0; i < seeds.length; i += 2)
    {
        sds.push([seeds[i], seeds[i] + seeds[i + 1]]);
    }
    for (var i = 0; i < almanac.length; i++)
    {
        let mappings = almanac[i].map(v => {
            return [v.source, v.source + v.range, v.dest];
        })
        console.log(sds, mappings);
    }
}

export const day5 = [part1(), "N/A"];