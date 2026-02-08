// secret crossword simulator mode

const size = 23;
const fontwidth = 5;
const cellwidth = fontwidth + 3;
const grid = Array.from({ length: size }, () => new Array(size).fill("0"));
const data = Array.from({ length: size }, () => new Array(size).fill(false));
const sizemult = 4;
const abc = "qwertyuioplkjhgfdsazxcvbnm";
const nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const spells = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "qr", "east", "meck", "beagle", "drye", "english", "hint", "parker", "pool", "tunnel"];

const pipev = "║";
const pipeh = "═";
const pipeul = "╝";
const pipeur = "╚";
const pipedl = "╗";
const pipedr = "╔";
const pipe = ["║", "╗", "╝", "╚", "╔", "═"];
// summon bouncing drye image

const unpat = (p) => p.split(" ").map((a) => a.split("").map(a => parseInt(a)));

const qrpat = "00000000000000000000000 01111111001000011111110 01000001011000010000010 01011101001011010111010 01011101011011010111010 01011101000101010111010 01000001011101010000010 01111111010101011111110 00000000000110000000000 01111101111001101010100 01001100110110000011010 00110101110100011100110 01110010101100110101000 01011001000011110000000 00000000011100001011000 01111111011100110100100 01000001000100101100010 01011101011011000011010 01011101010011101111100 01011101010100110110000 01000001010111001111110 01111111010011101001100 00000000000000000000000";
const qr = unpat(qrpat);

const tonum = (a) => {
    if ("0123456789".includes(a)) {
        return +a;
    } else {
        return 0;
    }
}

let cheat;

document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.querySelector("canvas");
    const gridpixels = size * cellwidth + 1;
    const barheight = 20;
    const width = gridpixels;
    const height = gridpixels + barheight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    canvas.style.width = sizemult * width + "px";
    let particles = [];

    const neighbors = (e) => [[e[0]+1, e[1]],
                              [e[0], e[1]+1],
                              [e[0]-1, e[1]],
                              [e[0], e[1]-1]].filter((l) => (l[0] >= 0 &&
                                                       l[0] < size &&
                                                       l[1] >= 0 &&
                                                       l[1] < size));
    let msg = "";
    let notes = "welcome to the zeagle game  the zeagle game is a registered trademark of the east mecklenburg zeagle  the east mecklenburg zeagle has no official ties to east mecklenburg or the eagle or the beagle thereof  ".split(" ");
    let clearmsg = 0;
    let qrcount = 0;
    let coolnum = "0";
    let score = 0;
    let path = false;

    const dryes = [];

    cheat = () => {
        grid[0].fill("9");
    };

    const shower = (x, y, n) => {
        for (let k = 0; k < n; k++) {
            particles.push({x: (x + .5) * cellwidth,
                            y: (y + .5) * cellwidth,
                            xs: Math.random() * 10 - 5,
                            ys: -Math.random() * 20,
                            age: 0});
        }
    }

    const getspell = (xy) => {
        let x = xy[0];
        let y = xy[1];
        let s = "";
        while (x < size) {
            const a = grid[y][x];
            if (abc.includes(a)) {
                s += a;
                if (spells.includes(s)) {
                    return [false, s];
                }
            } else {
                break;
            }
            x++;
        }
        x = xy[0];
        y = xy[1];
        s = "";
        while (y < size) {
            const a = grid[y][x];
            if (abc.includes(a)) {
                s += a;
                if (spells.includes(s)) {
                    return [true, s];
                }
            } else {
                break;
            }
            y++;
        }
        return false;
    }

    const improve = (xy) => {
        const prev = grid[xy[1]][xy[0]];
        if ("012345678".includes(prev)) {
            grid[xy[1]][xy[0]] = (+prev + 1).toString();
            shower(xy[0], xy[1], 1);
        } else if (prev === "☻") {
            grid[xy[1]][xy[0]] = "0";
        }
    }

    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left)/sizemult;
        const y = (e.clientY - rect.top)/sizemult;
        const cellx = Math.floor(x/cellwidth);
        const celly = Math.floor(y/cellwidth);
        const prev = grid[celly][cellx];
        if (prev === "0") {
            msg = "1";
            clearmsg = 5;
            grid[celly][cellx] = "1";
            score += 1;
            const n = neighbors([cellx, celly])
            if (n.every(x => grid[x[1]][x[0]] === grid[n[0][1]][n[0][0]])) {
                path = n;
                score += 1;
            }
        } else if ("12345678".includes(prev)) {
            const n = neighbors([cellx, celly])
            const sum = n.map((e) => tonum(grid[e[1]][e[0]])).reduce((a,b)=>(a+b));
            if (sum > prev) {
                grid[celly][cellx] = (+prev + 1).toString();
                msg = (+prev + 1).toString();
                clearmsg = 5;
                score += (+prev + 1);
                shower(cellx, celly, 1);
                if (n.every(x => grid[x[1]][x[0]] === grid[n[0][1]][n[0][0]])) {
                    path = n;
                    score += (+prev + 1);
                }
            } else {
                msg = "No";
                clearmsg = 10;
            }
        } else if (prev === "9") {
            shower(cellx, celly, 1);
            msg = "keyboard";
            clearmsg = 0;
            grid[celly][cellx] = "?";
            score += 10;
        } else if (abc.includes(prev)) {
            const spell = getspell([cellx, celly]);
            if (spell) {
                shower(cellx, celly, 30);
                score += 100;
                msg = "*"+spell[1]+"*";
                clearmsg = 20;
                for (let i = 0; i < spell[1].length; i++) {
                    if (spell[0]) {
                        grid[celly + i][cellx] = "0";
                    } else {
                        grid[celly][cellx + i] = "0";
                    }
                }
                if (spell[1] === "qr") {
                    qrcount = 5;
                } else if (nums.includes(spell[1])) {
                    grid[celly][cellx] = "+";
                    coolnum = (nums.indexOf(spell[1])).toString();
                } else if (spell[1] === "english") {
                    for (let i = 0; i < size; i++) {
                        for (let j = 0; j < size; j++) {
                            if (Math.random() < 0.1) {
                                grid[i][j] = abc[Math.floor(Math.random()*26)];
                            }
                        }
                    }
                } else if (spell[1] === "hint") {
                    const q = spells.filter(s => (s !== "hint"))
                    const s = q[Math.floor(Math.random() * q.length)];
                    for (let i = 0; i < s.length; i++) {
                        for (let j = 0; j < s.length; j++) {
                            grid[i][j] = i === j ? s[i] : "0";
                        }
                    }
                } else if (spell[1] === "beagle") {
                    for (let i = 0; i < size; i++) {
                        grid[i].fill("☻");
                        score = 666;
                    }
                    console.log(grid);
                } else if (spell[1] === "parker") {
                    for (let i = 0; i < size; i++) {
                        grid[i][0] = "4";
                        grid[i][1] = "9";
                        grid[i][2] = "5";
                        grid[i][3] = "o";
                        grid[i][4] = "t";
                        grid[i][5] = "o";
                        grid[i][6] = "t";
                    }
                } else if (spell[1] === "pool") {
                    for (let i = 0; i < size; i++) {
                        grid[0][i] = "~";
                        grid[1][i] = "~";
                        grid[2][i] = "~";
                        grid[3][i] = "☻";
                    }
                } else if (spell[1] === "drye") {
                    dryes.push([cellx, celly]);
                } else if (spell[1] === "tunnel") {
                    const p = [];
                    let x = Math.floor(size / 2);
                    let y = 1;
                    while (y < size-1) {
                        const options = [0];
                        if (x - 1 >= 0 && (p.length === 0 || p[p.length-1] !== 2)) {
                            options.push(1);
                        }
                        if (x + 1 < size && (p.length === 0 || p[p.length-1] !== 1)) {
                            options.push(2);
                        }
                        const o = options[Math.floor(Math.random() * options.length)];
                        p.push(o);
                        if (o === 1) {
                            x--;
                        } else if (o === 2) {
                            x++;
                        } else {
                            y++;
                        }
                    }
                    x = Math.floor(size / 2);
                    y = 1;
                    grid[0][x-1] = "e";
                    grid[0][x] = "m";
                    grid[0][x+1] = "h";
                    grid[0][x+2] = "s";
                    const n = p[0];
                    if (n === 1) {
                        grid[y][x] = pipeul;
                    } else if (n === 2) {
                        grid[y][x] = pipeur;
                    } else {
                        grid[y][x] = pipev;
                    }
                    for (let i = 0; (i + 1) < p.length; i++) {
                        const o = p[i];
                        const n = p[i+1];
                        shower(x, y, 5);
                        data[y][x] = (1+(i%9)).toString();
                        if (o === 1) {
                            x--;
                            if (n === 1) {
                                grid[y][x] = pipeh;
                            } else {
                                grid[y][x] = pipedr;
                            }
                        } else if (o === 2) {
                            x++;
                            if (n === 2) {
                                grid[y][x] = pipeh;
                            } else {
                                grid[y][x] = pipedl;
                            }
                        } else {
                            y++;
                            if (n === 1) {
                                grid[y][x] = pipeul;
                            } else if (n === 2) {
                                grid[y][x] = pipeur;
                            } else {
                                grid[y][x] = pipev;
                            }
                        }
                    }
                    const px = Math.min(Math.max(0, x-2), size-4);
                    grid[size-1][px] = "i";
                    grid[size-1][px+1] = "l";
                    grid[size-1][px+2] = "h";
                    grid[size-1][px+3] = "s";
                }
            } else {
                msg = "No";
                clearmsg = 10;
            }
        } else if (prev === "+") {
            score += 13;
            grid[celly][cellx] = coolnum;
            neighbors([cellx, celly]).forEach((xy) => {
                if (grid[xy[1]][xy[0]] !== coolnum) {
                    grid[xy[1]][xy[0]] = "+";
                }
            });
            msg = coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum + coolnum;
            clearmsg = 10;
        } else if (prev === "☻") {
            grid[celly][cellx] = "0";
        } else if (pipe.includes(prev)) {
            grid[celly][cellx] = data[celly][cellx] || "9";
            data[celly][cellx] = false;
        }
        requestAnimationFrame(draw);
    }

    document.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        let s = 0;
        if (abc.includes(k)) {
            let yes = false;
            let p = [];
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (grid[i][j] === "?") {
                        grid[i][j] = k;
                        yes = true;
                        p.push([j, i]);
                        shower(j, i, 10);
                        s += 10;
                        score += s;
                    }
                }
            }
            if (yes) {
                path = p;
                msg = k.toUpperCase();
                clearmsg = 20;
            }
        }
        requestAnimationFrame(draw);
    });

    const fgcolor = (a, x) => {
        if (a === "0") { return "grey";}
        else if (a === "1") { return "black";}
        else if (a === "2") { return "red";}
        else if (a === "3") { return "orange";}
        else if (a === "4") { return"lime";}
        else if (a === "5") { return "green";}
        else if (a === "6") { return "blue";}
        else if (a === "7") { return "indigo";}
        else if (a === "8") { return "violet";}
        else if (a === "9") { return x%2 ? "red" : "orange";}
        else if (a === "?") { return x%2 ? "yellow" : "black";}
        else if (abc.includes(a)) {return "white"}
        else if (["·", "■", "█"].includes(a)) {return "black"}
        else if (a === "+") { return "green";}
        else if (a === "☻") { return "black";}
        else if (a === "☺") { return "black";}
        else if (a === "~") { return "white";}
        else if (pipe.includes(a)) {return "black"}
        else if (a === "ü") {return "black"}
    };

    const bgcolor = (a, x) => {
        if (a === "0") { return "transparent";}
        else if (a === "9") { return "black";}
        else if ("12345678".includes(a)) { return Math.random() < .05 ? "#A0A0A0" : "#808080";}
        else if (a === "?") { return "green";}
        else if (abc.includes(a)) {return "green"}
        else if (["·", "■", "█"].includes(a)) {return "white"}
        else if (a === "+") { return x%2 ? "red" : "blue";}
        else if (a === "☻") { return "red";}
        else if (a === "☺") { return "green";}
        else if (a === "~") { return Math.random() < .05 ? "#0000ff" : "#4040ff";}
        else if (pipe.includes(a)) {return "red"}
        else if (a === "ü") {return "peachpuff"}
    };

    let frame = 0;
    const draw = () => {
        ctx.clearRect(0, 0, width, height)

        // Grid
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = i * cellwidth;
                const y = j * cellwidth;
                let value = grid[j][i];
                if (dryes.some(xy => xy[0] === i && xy[1] === j)) {
                    value = "ü";
                }
                if (qrcount && qr[j][i]) {
                    value = ["", "·", "■", "█", "■", "·"][qrcount];
                }
                ctx.fillStyle = bgcolor(value, frame);
                ctx.fillRect(x, y, cellwidth, cellwidth);
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, cellwidth, 1);
                ctx.fillRect(x, y, 1, cellwidth);
                ctx.fillStyle = fgcolor(value, frame);
                const pat = font.slice(cp437[value]*5,cp437[value]*5+5).map(a=>[a%2, Math.floor(a/2)%2, Math.floor(a/4)%2, Math.floor(a/8)%2, Math.floor(a/16)%2]);
                try {
                for (let i = 0; i < fontwidth; i++) {
                    for (let j = 0; j < fontwidth; j++) {
                        if (pat[j][i]) {
                            ctx.fillRect(x + 2 + i, y + 2 + j, 1, 1);
                        }
                    }
                }
                } catch {
                    console.log(value);
                }
            }
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, gridpixels-1, gridpixels, 1);
        ctx.fillRect(gridpixels-1, 0, 1, gridpixels);

        ctx.fillStyle = frame%2 ? "magenta" : "purple";
        ctx.font = "80px Monsieur La Doulaise";
        ctx.fillText(msg, 0, 90 - clearmsg);

        ctx.fillStyle = frame%2 ? "yellow" : "orange";
        ctx.font = "40px Monsieur La Doulaise";
        ctx.fillText(notes[Math.floor(frame/30) % notes.length], 10, 180);

        ctx.fillStyle = frame%2 ? "lightblue" : "white";
        ctx.font = "20px Courier";
        ctx.fillText("Score: " + score, 0, gridpixels+ 16);

        if (path) {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo((path[0][0]+.5)*cellwidth,
                       (path[0][1]+.5)*cellwidth);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo((path[i][0]+.5)*cellwidth,
                           (path[i][1]+.5)*cellwidth);
            }
            ctx.lineTo((path[0][0]+.5)*cellwidth,
                       (path[0][1]+.5)*cellwidth);
            ctx.stroke();
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.fillStyle = "hsl(" + p.age * 100 + ", 100%, 50%)";
            ctx.fillRect(p.x, p.y, 4, 4);
        }
    };

    const update = () => {
        frame++;
        if (qrcount === 1) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (qr[i][j]) {
                        improve([j, i]);
                    }
                }
            }
        }
        if (qrcount) {
            qrcount--;
        }

        if (clearmsg) {
            clearmsg--;
            if (!clearmsg) {
                let yes = false;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (grid[i][j] === "?") {
                            yes = true;
                        }
                    }
                }
                if (yes) {
                    msg = "keyboard";
                } else {
                    msg = "";
                }
                path = false;
            }
        }

        for (let i = 0; i < dryes.length; i++) {
            const d = dryes[i];
            const n = neighbors(d);
            if (Math.random() < 0.1) {
                improve(d);
            }
            dryes[i] = n[Math.floor(Math.random() * n.length)];
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.age++;
            p.x += p.xs;
            p.y += p.ys;
            p.ys += 4;
        }
        particles = particles.filter(p => p.age < 20);

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === "~") {
                    if (i+1 < size && grid[i + 1][j] === "0") {
                        grid[i][j] = "0";
                        grid[i+1][j] = "~";
                    } else {
                        let l = (j - 1 >= 0) && grid[i][j-1] === "0";
                        let r = (j + 1 < size) && grid[i][j+1] === "0";
                        if (l && r) {
                            l = Math.random() < 0.5;
                            r = !l;
                        }
                        if (l) {
                            grid[i][j] = "0";
                            grid[i][j-1] = "~";
                        } else if (r) {
                            grid[i][j] = "0";
                            grid[i][j+1] = "~";
                        }
                    }
                }
            }
        }
    }

    setInterval(() => {
        update();
        requestAnimationFrame(draw);
    }, 80);
});

const font = [
  0, 0, 0, 0, 0,
  10, 0, 4, 17, 14,
  10, 0, 0, 14, 17,
  27, 31, 31, 14, 4,
  0, 0, 0, 0, 0,
  0, 4, 10, 4, 14,
  4, 14, 14, 4, 14,
  0, 14, 14, 14, 0,
  0, 0, 0, 0, 0,
  0, 4, 10, 4, 0,
  0, 0, 0, 0, 0,
  30, 28, 31, 21, 7,
  5, 13, 31, 12, 4,
  20, 22, 31, 6, 4,
  15, 10, 10, 10, 5,
  21, 14, 27, 14, 21,
  4, 12, 28, 12, 4,
  4, 6, 7, 6, 4,
  4, 14, 4, 14, 4,
  10, 10, 10, 0, 10,
  12, 11, 10, 10, 10,
  0, 0, 0, 0, 0,
  0, 0, 0, 31, 31,
  0, 0, 0, 0, 0,
  4, 14, 21, 4, 4,
  4, 4, 21, 14, 4,
  4, 8, 31, 8, 4,
  4, 2, 31, 2, 4,
  0, 2, 2, 30, 0,
  0, 14, 14, 14, 0,
  4, 14, 31, 0, 0,
  0, 0, 31, 14, 4,
  0, 0, 0, 0, 0,
  4, 4, 4, 0, 4,
  10, 10, 0, 0, 0,
  10, 31, 10, 31, 10,
  31, 5, 31, 20, 31,
  17, 8, 4, 2, 17,
  6, 9, 22, 9, 22,
  8, 4, 0, 0, 0,
  8, 4, 4, 4, 8,
  2, 4, 4, 4, 2,
  21, 14, 31, 14, 21,
  0, 4, 14, 4, 0,
  0, 0, 0, 4, 2,
  0, 0, 14, 0, 0,
  0, 0, 0, 0, 2,
  8, 4, 4, 4, 2,
  14, 25, 21, 19, 14,
  4, 6, 4, 4, 14,
  14, 8, 14, 2, 14,
  14, 8, 12, 8, 14,
  2, 2, 10, 14, 8,
  14, 2, 14, 8, 14,
  6, 2, 14, 10, 14,
  14, 8, 12, 8, 8,
  14, 10, 14, 10, 14,
  14, 10, 14, 8, 14,
  0, 4, 0, 4, 0,
  0, 4, 0, 4, 2,
  8, 4, 2, 4, 8,
  0, 14, 0, 14, 0,
  2, 4, 8, 4, 2,
  14, 17, 12, 0, 4,
  14, 9, 5, 1, 14,
  6, 9, 17, 31, 17,
  7, 9, 15, 17, 15,
  14, 17, 1, 17, 14,
  15, 25, 17, 17, 15,
  31, 1, 15, 1, 31,
  31, 1, 15, 1, 1,
  14, 1, 25, 17, 14,
  9, 17, 31, 17, 17,
  14, 4, 4, 4, 14,
  12, 8, 8, 10, 14,
  9, 5, 3, 5, 9,
  1, 1, 1, 1, 15,
  17, 27, 21, 17, 17,
  17, 19, 21, 25, 17,
  14, 25, 17, 17, 14,
  7, 9, 7, 1, 1,
  14, 17, 17, 25, 30,
  7, 9, 7, 5, 9,
  30, 1, 14, 16, 15,
  31, 4, 4, 4, 4,
  9, 17, 17, 17, 14,
  10, 10, 10, 10, 4,
  9, 17, 21, 21, 10,
  17, 10, 4, 10, 17,
  17, 10, 4, 4, 4,
  31, 8, 4, 2, 31,
  12, 4, 4, 4, 12,
  2, 4, 4, 4, 8,
  6, 4, 4, 4, 6,
  4, 10, 0, 0, 0,
  0, 0, 0, 0, 14,
  4, 8, 0, 0, 0,
  6, 9, 17, 31, 17,
  7, 9, 15, 17, 15,
  14, 17, 1, 17, 14,
  15, 25, 17, 17, 15,
  31, 1, 15, 1, 31,
  31, 1, 15, 1, 1,
  14, 1, 25, 17, 14,
  9, 17, 31, 17, 17,
  14, 4, 4, 4, 14,
  12, 8, 8, 10, 14,
  18, 10, 6, 10, 18,
  1, 1, 1, 1, 15,
  17, 27, 21, 17, 17,
  17, 19, 21, 25, 17,
  14, 25, 17, 17, 14,
  7, 9, 7, 1, 1,
  14, 17, 17, 25, 30,
  7, 9, 7, 5, 9,
  30, 1, 14, 16, 15,
  31, 4, 4, 4, 4,
  9, 17, 17, 17, 14,
  10, 10, 10, 10, 4,
  9, 17, 21, 21, 10,
  17, 10, 4, 10, 17,
  17, 10, 4, 4, 4,
  31, 8, 4, 2, 31,
  12, 4, 2, 4, 12,
  4, 4, 4, 4, 4,
  6, 4, 8, 4, 6,
  10, 5, 0, 0, 0,
  0, 4, 10, 10, 14,
  0, 0, 0, 0, 0,
  10, 0, 10, 10, 14,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  10, 0, 14, 10, 30,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  31, 17, 17, 17, 31,
  0, 14, 10, 14, 0,
  0, 0, 4, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 4, 0, 0,
  0, 14, 10, 14, 0,
  0, 0, 0, 0, 0,
  10, 0, 14, 10, 30,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  10, 0, 14, 10, 14,
  0, 0, 0, 0, 0,
  3, 25, 11, 9, 11,
  28, 23, 21, 21, 29,
  0, 3, 1, 1, 1,
  10, 0, 14, 10, 14,
  10, 0, 10, 10, 14,
  0, 0, 0, 0, 31,
  12, 18, 7, 2, 31,
  0, 0, 0, 0, 31,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 31,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  4, 0, 6, 17, 14,
  0, 0, 28, 4, 4,
  0, 0, 7, 4, 4,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  4, 0, 4, 4, 4,
  4, 18, 9, 18, 4,
  4, 9, 18, 9, 4,
  0, 10, 0, 10, 0,
  10, 21, 10, 21, 10,
  21, 10, 21, 10, 21,
  4, 4, 4, 4, 4,
  4, 4, 7, 4, 4,
  4, 7, 4, 7, 4,
  10, 10, 11, 10, 10,
  0, 0, 15, 10, 10,
  0, 7, 4, 7, 4,
  10, 11, 8, 11, 10,
  10, 10, 10, 10, 10,
  0, 15, 8, 11, 10,
  10, 11, 8, 15, 0,
  10, 10, 15, 0, 0,
  4, 7, 4, 7, 0,
  0, 0, 7, 4, 4,
  4, 4, 28, 0, 0,
  4, 4, 31, 0, 0,
  0, 0, 31, 4, 4,
  4, 4, 28, 4, 4,
  0, 0, 31, 0, 0,
  4, 4, 31, 4, 4,
  4, 28, 4, 28, 4,
  10, 10, 26, 10, 10,
  10, 26, 2, 30, 0,
  0, 30, 2, 26, 10,
  10, 27, 0, 31, 0,
  0, 31, 0, 27, 10,
  10, 26, 2, 26, 10,
  0, 31, 0, 31, 0,
  10, 27, 0, 27, 10,
  4, 31, 0, 31, 0,
  10, 10, 31, 0, 0,
  0, 31, 0, 31, 4,
  0, 0, 31, 10, 10,
  10, 10, 30, 0, 0,
  4, 28, 4, 28, 0,
  0, 28, 4, 28, 4,
  0, 0, 30, 10, 10,
  10, 10, 31, 10, 10,
  4, 31, 4, 31, 4,
  4, 4, 7, 0, 0,
  0, 0, 28, 4, 4,
  31, 31, 31, 31, 31,
  0, 0, 31, 31, 31,
  3, 3, 3, 3, 3,
  24, 24, 24, 24, 24,
  31, 31, 31, 0, 0,
  0, 0, 0, 0, 0,
  6, 9, 13, 17, 13,
  0, 0, 0, 0, 0,
  14, 17, 17, 17, 14,
  0, 4, 10, 4, 0,
  0, 0, 4, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 4, 0, 0,
  0, 4, 10, 4, 0,
  0, 0, 0, 0, 0,
  14, 17, 17, 10, 27,
  7, 1, 6, 9, 6,
  0, 14, 31, 14, 0,
  16, 14, 10, 14, 1,
  12, 2, 14, 2, 12,
  6, 9, 9, 9, 9,
  14, 0, 14, 0, 14,
  4, 14, 4, 0, 14,
  2, 4, 8, 4, 14,
  8, 4, 2, 4, 14,
  8, 20, 4, 4, 4,
  4, 4, 4, 5, 2,
  4, 0, 14, 0, 4,
  10, 5, 0, 10, 5,
  4, 14, 4, 0, 0,
  0, 14, 14, 14, 0,
  0, 0, 4, 0, 0,
  24, 8, 11, 10, 4,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0
];

const cp437 = {
    " ": 32,
    "!": 33,
    '"': 34,
    "#": 35,
    "$": 36,
    "%": 37,
    "&": 38,
    "'": 39,
    "(": 40,
    ")": 41,
    "*": 42,
    "+": 43,
    ",": 44,
    "-": 45,
    ".": 46,
    "/": 47,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    ":": 58,
    ";": 59,
    "<": 60,
    "=": 61,
    ">": 62,
    "?": 63,
    "@": 64,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "[": 91,
    "\\": 92,
    "]": 93,
    "^": 94,
    "_": 95,
    "`": 96,
    "a": 97,
    "b": 98,
    "c": 99,
    "d": 100,
    "e": 101,
    "f": 102,
    "g": 103,
    "h": 104,
    "i": 105,
    "j": 106,
    "k": 107,
    "l": 108,
    "m": 109,
    "n": 110,
    "o": 111,
    "p": 112,
    "q": 113,
    "r": 114,
    "s": 115,
    "t": 116,
    "u": 117,
    "v": 118,
    "w": 119,
    "x": 120,
    "y": 121,
    "z": 122,
    "{": 123,
    "|": 124,
    "}": 125,
    "~": 126,
    "·": 250,
    "■": 233,
    "█": 249,
    "☺︎": 1,
    "☻": 2,
    "║": 0xba,
    "╗": 0xbb,
    "╝": 0xbc,
    "╚": 0xc8,
    "╔": 0xc9,
    "═": 0xcd,
    "ü": 0x81,
};
