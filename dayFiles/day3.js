import { engineSchematic } from '../input/engineSchematic.js';

function findValidParts(schem, gearRatios = false)
{
    var partNumbers = gearRatios ? {} : [];
    let relations = [
        1,
        -1,
        140,
        -140,
        -141,
        -139,
        139,
        141
    ];
    let matches = schem.matchAll(new RegExp("[0-9]+", 'g'));
    for (var match of matches)
    {
        let v = match[0];
        let vIndex = match["index"];
loop1:
        for (var i = 0; i < v.length; i++)
        {
            for (var relation of relations)
            {
                let pos = i + vIndex + relation;
                if (pos >= schem.length || pos < 0) continue;
                let a = schem[i + vIndex + relation];
                if (a == '.' || !isNaN(a)) continue;
                if (gearRatios)
                {
                    if (a != "*") continue;
                    if (partNumbers[pos] == null)
                    {
                        partNumbers[pos] = [v];
                    }
                    else
                    {
                        partNumbers[pos].push(v);
                    }
                }
                else
                {
                    partNumbers.push(parseInt(v));
                }
                break loop1;
            }
        }
    }
    if (gearRatios)
    {
        let old = partNumbers;
        partNumbers = {};
        for (var a in old)
        {
            var b = old[a];
            if (b.length > 1)
            {
                partNumbers[a] = b;
            }
        }
    }
    return partNumbers;
}

let schematic = engineSchematic.replace(/\r\n|\n|\r/gm, "");
let isolatedSchem = findValidParts(schematic);
let partNumberSum = (() => {let v = 0; for (let i in isolatedSchem) {v += isolatedSchem[i];} return v;})();

let gearRatioSchem = findValidParts(schematic, true);
let gearRatioSum = (() => {let v = 0; for (let i in gearRatioSchem) {v += gearRatioSchem[i][0] * gearRatioSchem[i][1];} return v;})();

export const day3 = [partNumberSum, gearRatioSum];