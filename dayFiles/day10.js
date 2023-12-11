import { testInput } from '../input/day10input.js';
let input = testInput;

let w = input.indexOf('\n');
let h = 0;input.split('\n').forEach(x => h++);
let map = input.replaceAll('\n','');
let mapPieces = [];
let s1 = [];
let s2 = [];

let pipes = {
    "|": {n:true,e:false,s:true,w:false},
    "-": {n:false,e:true,s:false,w:true},
    "L": {n:true,e:true,s:false,w:false},
    "J": {n:true,e:false,s:false,w:true},
    "7": {n:false,e:false,s:true,w:true},
    "F": {n:false,e:true,s:true,w:false},
    "S": {n:true,e:true,s:true,w:true},
    ".": {n:false,e:false,s:false,w:false}
};

function connection(p1,p2,d)
{
    if (p1[d] == false) return false;
    switch (d) {
        case "n":
            return p1.n == p2.s && p1.n != false;
        case "e":
            return p1.e == p2.w && p1.e != false;
        case "s":
            return p1.s == p2.n && p1.s != false;
        case "w":
            return p1.w == p2.e && p1.w != false;
        default:
            return false;
    }
}

function getAdjacent(p1)
{
    return {
        "n": [p1 - w < 0 ? null : map.charAt(p1 - w),p1 - w],
        "e": [(p1 + 1) % w == 0 ? null : map.charAt(p1 + 1),p1 + 1],
        "s": [p1 + w >= map.length ? null : map.charAt(p1 + w),p1 + w],
        "w": [(p1 - 1) % w == w - 1 || p1 - 1 < 0 ? null : map.charAt(p1 - 1),p1 - 1]
    };
}

function part1()
{
    let lastPipe = -1;
    let currentPipe = map.indexOf("S");
    let steps = 0;
    while(true)
    {
        let cPipe = map.charAt(currentPipe);
        mapPieces.push(currentPipe);
        let a = getAdjacent(currentPipe);
        for (var pi in a)
        {
            let p = a[pi][0];
            if (p == null || p == '.') continue;
            if (connection(pipes[cPipe],pipes[p],pi) && lastPipe != a[pi][1]) {lastPipe=currentPipe;currentPipe=a[pi][1];break;}
        }
        steps++;
        if (map.charAt(currentPipe) == 'S') break;
    }
    map = map.split('').map((x,y) => {
        if (mapPieces.includes(y)) return x;
        return '.';
    }).toString().replaceAll(',','');
    return steps / 2;
}

function waveCollision(w,d)
{
    let result = false;
    w.forEach(x => {
        if (x.includes(d)) result = true;
    });
    return result;
}

function part2()
{
    let waves = [];
    for (var i = 0; i < map.length; i++)
    {
        let drops = [i];
        if (map.charAt(i) != '.') continue;
        for (var x = 0; x < drops.length; x++)
        {
            let drop = drops[x];
            let nDrops = [...drops];
            let a = getAdjacent(drop);
            Object.values(a).forEach(d => {
                if (d[0] == '.' && !nDrops.includes(d[1]))
                {
                    if (!waveCollision(waves, d[1])) nDrops.push(d[1]);
                }
            })
            drops = nDrops;
        }
        if (drops.length == 1 && waveCollision(waves, drops[0])) continue;
        waves.push(drops);
    }
    let outside = waves.shift();
    let inside = [];
    for (var wp in waves)
    {
        let w = waves[wp];
loop1:
        for (var dp in w)
        {
            let d = w[dp];
            let a = getAdjacent(d);
            for (var dir in a)
            {
                let e = a[dir][1]; //e is a mappiece thats adjacent to a pocket drop. use that mappiece to figure out which side the pocket is on. also, map out an inside and outside
                if (mapPieces.includes(e))
                {

                }
            }
        }
    }
}
part1();
part2();

export const day10 = [part1(),"N/A"];