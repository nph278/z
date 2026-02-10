const size = 23;
const fontwidth = 5;
const cellwidth = fontwidth + 3;
const grid = Array.from({ length: size }, () => new Array(size).fill("0"));
const data = Array.from({ length: size }, () => new Array(size).fill(false));
const abc = "qwertyuioplkjhgfdsazxcvbnm";
const nums = ["zero", "one", "two", "three", "fourk", "fivek", "six", "seven", "eight", "nine"];

const spells = ["fourk", "fivek", "qr", "beagle", "drye", "english", "math", "hint", "parker", "pool", "tunnel", "aday", "bday"];
const angle_steps = 12;

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
    } else if (a === "?") {
        return 9;
    } else {
        return 0;
    }
}

let cheat;

document.addEventListener('DOMContentLoaded', (event) => {
    let ismobile = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) ismobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

    const canvas = document.querySelector("canvas");
    const gridpixels = size * cellwidth + 1;
    const barheight = 20;
    const width = gridpixels;
    const height = gridpixels + barheight;
    canvas.width = width;
    canvas.height = height;
    let sizemult = 1;
    const ctx = canvas.getContext("2d");
    canvas.style.width = width + "px";
    let particles = [];

    const neighbors = (e) => [[e[0]+1, e[1]],
                              [e[0], e[1]+1],
                              [e[0]-1, e[1]],
                              [e[0], e[1]-1]].filter((l) => (l[0] >= 0 &&
                                                       l[0] < size &&
                                                       l[1] >= 0 &&
                                                       l[1] < size));
    let msg = "";
    let msgoffset = [0,0];
    let notes = "welcome to the zeagle game  the zeagle game is a registered trademark of the east mecklenburg zeagle  the east mecklenburg zeagle has no official ties to east mecklenburg or the eagle or the beagle thereof  ".split(" ");
    let clearmsg = 0;
    let qrcount = 0;
    let score = 0;
    let paths = [];

    const dryes = [];
    let man = false; // False: not started, null: dead
    let manlife = 0;
    let day = 0;

    const addscore = (s) => {
        if (day === 1) {
            score += s * 2;
        } else {
            score += s;
        }
    }

    const setmsg = (m) => {
        msg = m;
        const s = 50;
        msgoffset = [Math.random() * s,
                     Math.random() * s];
    };

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

    const checkspellx = (x, y, s) => {
        for (let i = 0; i < s.length; i++) {
            if (grid[y][x+i] !== s[i]) {
                return false;
            }
        }
        return true;
    }

    const checkspelly = (x, y, s) => {
        for (let i = 0; i < s.length; i++) {
            if (grid[y+i][x] !== s[i]) {
                return false;
            }
        }
        return true;
    }


    const getspell = (xy) => {
        for (let i = 0; i < spells.length; i++) {
            const s = spells[i];
            for (let x = Math.max(0, xy[0] - s.length + 1); x + s.length - 1 < Math.min(xy[0] + size, size); x++) {
                if (checkspellx(x, xy[1], s)) {
                    for (let j = 0; j < s.length; j++) {
                        grid[xy[1]][x+j] = "0";
                    }
                    return s;
                }
            }
        }
        for (let i = 0; i < spells.length; i++) {
            const s = spells[i];
            for (let y = Math.max(0, xy[1] - s.length + 1); y + s.length - 1 < Math.min(xy[1] + size, size); y++) {
                if (checkspelly(xy[0], y, s)) {
                    for (let j = 0; j < s.length; j++) {
                        grid[y+j][xy[0]] = "0";
                    }
                    return s;
                }
            }
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

    const addpath = (p) => {
        if (!paths.some(q => p.every(x => q.some(y => x[0]===y[0] && x[1]===y[1])))) {
            paths.push(p);
            if (paths.length > 5) {
                paths.shift(1);
            }
        }
    }

    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left)/sizemult;
        const y = (e.clientY - rect.top)/sizemult;
        const cellx = Math.floor(x/cellwidth);
        const celly = Math.floor(y/cellwidth);
        if (ismobile && (celly >= size) && msg === "keyboard") {
            handlekey(prompt("Enter a letter")[0].toLowerCase());
        } else {
            const prev = grid[celly][cellx];
            if (prev === "0") {
                if (day === 2) {
                    setmsg("2");
                    grid[celly][cellx] = "2";
                } else {
                    setmsg("1");
                    grid[celly][cellx] = "1";
                }
                clearmsg = 5;
                addscore(1);
                const n = neighbors([cellx, celly])
                if (n.every(x => grid[x[1]][x[0]] === grid[n[0][1]][n[0][0]])) {
                    msg+=" "+"*".repeat(n.length);
                    addpath(n);
                    addscore(1);
                }
            } else if ("12345678".includes(prev)) {
                const n = neighbors([cellx, celly])
                const sum = n.map((e) => tonum(grid[e[1]][e[0]])).reduce((a,b)=>(a+b));
                if (sum > prev) {
                    const x = Math.min(9,+prev + ((day === 2)?2:1));
                    grid[celly][cellx] = x.toString();
                    setmsg(x.toString());
                    clearmsg = 5;
                    addscore(x);
                    shower(cellx, celly, 1);
                    if (n.every(x => grid[x[1]][x[0]] === grid[n[0][1]][n[0][0]])) {
                        msg+=" "+"*".repeat(n.length);
                        addpath(n);
                        addscore(+prev + 1);
                    }
                } else {
                    setmsg("No");
                    clearmsg = 10;
                }
            } else if (prev === "9") {
                shower(cellx, celly, 1);
                setmsg("keyboard");
                clearmsg = 5;
                grid[celly][cellx] = "?";
            } else if (prev === "?") {
                setmsg("cancelled");
                clearmsg = 5;
                grid[celly][cellx] = "9";
            } else if (abc.includes(prev)) {
                const spell = getspell([cellx, celly]);
                if (spell) {
                    shower(cellx, celly, 30);
                    addscore(100);
                    setmsg("¡"+spell+"!");
                    clearmsg = 20;
                    for (let i = 0; i < spell.length; i++) {
                    }
                    if (spell === "qr") {
                        if (qrcount) {
                            for (let i = 0; i < size; i++) {
                                for (let j = 0; j < size; j++) {
                                    if (qr[i][j]) {
                                        improve([j, i]);
                                    }
                                }
                            }
                        }
                        qrcount = 5;
                        addpath([[1,1],[1,7],[7,1],[7,7]]);
                        addpath([[15,1],[15,7],[21,1],[21,7]]);
                        addpath([[1,15],[1,21],[7,15],[7,21]]);
                    } else if (nums.includes(spell)) {
                        grid[celly][cellx] = "+";
                        data[celly][cellx] = (nums.indexOf(spell)).toString();
                        addpath([[cellx+1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx-1,celly+1]]);
                        addpath([[cellx+2,celly+2],[cellx+2,celly-2],[cellx-2,celly-2],[cellx-2,celly+2]]);
                    } else if (spell === "english") {
                        const p = [];
                        for (let i = 0; i < size; i++) {
                            for (let j = 0; j < size; j++) {
                                if (Math.random() < 0.1) {
                                    grid[i][j] = abc[Math.floor(Math.random()*26)];
                                    p.push([j,i]);
                                }
                            }
                        }
                        addpath(p);
                    } else if (spell === "math") {
                        const possible = "56789";
                        const p = [];
                        for (let i = 0; i < size; i++) {
                            for (let j = 0; j < size; j++) {
                                if (Math.random() < 0.1) {
                                    grid[i][j] = possible[Math.floor(Math.random()*possible.length)];
                                    p.push([j,i]);
                                }
                            }
                        }
                        addpath(p);
                    } else if (spell === "hint") {
                        const q = spells.filter(s => (s !== "hint"))
                        const s = q[Math.floor(Math.random() * q.length)];
                        for (let i = 0; i < s.length; i++) {
                            for (let j = 0; j < s.length; j++) {
                                grid[i][j] = i === j ? s[i] : "0";
                            }
                        }
                        const p1 = [];
                        const p2 = [];
                        for (let x = 1; x < s.length; x++) {
                            for (let y = 0; y < x; y++) {
                                p1.push([x,y]);
                                p2.push([y,x]);
                            }
                        }
                        addpath(p1);
                        addpath(p2);
                        addpath([[-1,-1],[-1,s.length], [s.length,s.length],[s.length,-1]]);
                    } else if (spell === "beagle") {
                        for (let i = 0; i < size; i++) {
                            grid[i].fill("☻");
                            addscore(666);
                        }
                    } else if (spell === "parker") {
                        for (let i = 0; i < size; i++) {
                            grid[i][0] = "4";
                            grid[i][1] = "9";
                            grid[i][2] = "5";
                            grid[i][3] = "o";
                            grid[i][4] = "t";
                            grid[i][5] = "o";
                            grid[i][6] = "t";
                        }
                        addpath([[7,0],[7,size-1]]);
                    } else if (spell === "pool") {
                        for (let i = 0; i < size; i++) {
                            grid[0][i] = "~";
                            grid[1][i] = "~";
                            grid[2][i] = "~";
                            grid[3][i] = "☻";
                        }
                        addpath([[0,4],[size-1,4]]);
                    } else if (spell === "drye") {
                        dryes.push([cellx, celly]);
                        addpath([[cellx+1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx-1,celly+1]]);
                        addpath([[cellx+2,celly+2],[cellx+2,celly-2],[cellx-2,celly-2],[cellx-2,celly+2]]);
                    } else if (spell === "aday") {
                        day = 1;
                        canvas.style.background = "radial-gradient(circle, lightblue 0%, red 100%)";
                    } else if (spell === "bday") {
                        day = 2;
                        canvas.style.background = "radial-gradient(circle, lightblue 0%, blue 100%)";
                    } else if (spell === "tunnel") {
                        addpath([[0,0],[0,size-1]]);
                        addpath([[size-1,0],[size-1,size-1]]);
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
                    setmsg("No");
                    clearmsg = 10;
                }
            } else if (prev === "+") {
                addscore(13);
                grid[celly][cellx] = data[celly][cellx];
                neighbors([cellx, celly]).forEach((xy) => {
                    if (grid[xy[1]][xy[0]] !== data[celly][cellx]) {
                        grid[xy[1]][xy[0]] = "+";
                        data[xy[1]][xy[0]] = data[celly][cellx];
                    }
                });
                setmsg(data[celly][cellx].repeat(20));
                clearmsg = 10;
                data[celly][cellx] = "0";
            } else if (prev === "☻") {
                grid[celly][cellx] = "0";
            } else if (pipe.includes(prev)) {
                grid[celly][cellx] = data[celly][cellx] || "9";
                data[celly][cellx] = false;
            }
            requestAnimationFrame(draw);
        }
    }

    const handlekey = (k) => {
        let s = 0;
        if (abc.includes(k)) {
            let p = [];
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (grid[i][j] === "?") {
                        grid[i][j] = k;
                        p.push([j, i]);
                        shower(j, i, 10);
                        s += 10;
                        addscore(s);
                    }
                }
            }
            if (p.length) {
                setmsg(k.toUpperCase() + "*".repeat(p.length - 1));
                clearmsg = 20;
                if (p.length > 1) {
                    addpath(p);
                }
            }
        }
        requestAnimationFrame(draw);
    }

    document.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        handlekey(k);
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
        else if (a === "ö") {return "black"}
    };

    const bgcolor = (a, x) => {
        if (a === "0") { return "transparent";}
        else if (a === "9") { return "black";}
        else if ("12345678".includes(a)) { return Math.random() < .05 ? "#A0A0A0" : "#808080";}
        else if (a === "?") { return "green";}
        else if (abc.includes(a)) {return "green"}
        else if (["·", "■", "█"].includes(a)) {return "white"}
        else if (a === "+") { return x%2 ? "orange" : "yellow";}
        else if (a === "☻") { return "red";}
        else if (a === "☺") { return "green";}
        else if (a === "~") { return Math.random() < .05 ? "#0000ff" : "#4040ff";}
        else if (pipe.includes(a)) {return "red"}
        else if (a === "ü") {return "peachpuff"}
        else if (a === "ö") {return "white"}
    };

    let frame = 0;
    const draw = () => {
        const fans = Array.from({ length: size }, () => new Array(size).fill(false));
        sizemult = Math.floor(Math.min(window.innerWidth, window.innerHeight) / width);
        canvas.style.width = sizemult * width + "px";
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
                if (man && man[0] === i && man[1] === j) {
                    value = "ö";
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

        const angle = Math.PI * 2 * (frame % angle_steps) / angle_steps;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i+1 < size && j+1 < size && grid[j][i] === "4" && grid[j][i+1] === "4" && grid[j+1][i] === "4" && grid[j+1][i+1] === "4" && !fans[j][i] && !fans[j][i+1] && !fans[j+1][i] && !fans[j+1][i+1]) {
                    fans[j+1][i] = true;
                    fans[j][i+1] = true;
                    fans[j+1][i+1] = true;
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(0,0,0,0.8)";
                    ctx.arc((i+1)*cellwidth, (j+1)*cellwidth, cellwidth, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo((i+1+Math.cos(angle))*cellwidth,
                               (j+1+Math.sin(angle))*cellwidth);
                    ctx.lineTo((i+1+Math.cos(angle+Math.PI))*cellwidth,
                               (j+1+Math.sin(angle+Math.PI))*cellwidth);
                    ctx.stroke();
                }
            }
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, gridpixels-1, gridpixels, 1);
        ctx.fillRect(gridpixels-1, 0, 1, gridpixels);

        const shake = 2;
        paths.forEach(path => {
            ctx.beginPath();
            const s1 = Math.random()*shake;
            const s2 = Math.random()*shake;
            ctx.strokeStyle = "hsl(" + frame*20 + ", 100%, 50%, 0.8)";
            ctx.moveTo((path[0][0]+.5)*cellwidth + s1,
                       (path[0][1]+.5)*cellwidth + s2);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo((path[i][0]+.5)*cellwidth + Math.random()*shake,
                           (path[i][1]+.5)*cellwidth + Math.random()*shake);
            }
            ctx.lineTo((path[0][0]+.5)*cellwidth + s1,
                       (path[0][1]+.5)*cellwidth + s2);
            ctx.stroke();
        });

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.fillStyle = "hsl(" + p.age * 100 + ", 100%, 50%)";
            ctx.fillRect(p.x, p.y, 4, 4);
        }

        ctx.fillStyle = frame%2 ? "magenta" : "purple";
        ctx.font = "80px Monsieur La Doulaise";
        ctx.fillText(msg, 0+msgoffset[0], 90 - clearmsg + msgoffset[1]);

        ctx.fillStyle = frame%2 ? "yellow" : "orange";
        ctx.font = "40px Monsieur La Doulaise";
        ctx.fillText(notes[Math.floor(frame/30) % notes.length], 10, 180);

        ctx.fillStyle = frame%2 ? "lightblue" : "white";
        ctx.font = "20px Courier";
        if (ismobile && msg === "keyboard") {
            ctx.fillText("ClickHere2Type", 0, gridpixels+ 16);
        } else {
            ctx.fillText("Score: " + score, 0, gridpixels+ 16);
        }

        if (day === 1) {
            ctx.font = "15px Courier";
            ctx.fillStyle = frame%2 ? "turquoise" : "cyan";
            ctx.fillText("+ADay", 140, gridpixels+ 10);
        } else if (day === 2) {
            ctx.font = "15px Courier";
            ctx.fillStyle = frame%2 ? "red" : "orangered";
            ctx.fillText("+BDay", 140, gridpixels+ 10);
        }
    };

    const update = () => {
        if (frame % angle_steps === 0) {
            const fans = Array.from({ length: size }, () => new Array(size).fill(false));
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (i+1 < size && j+1 < size && grid[j][i] === "4" && grid[j][i+1] === "4" && grid[j+1][i] === "4" && grid[j+1][i+1] === "4" && !fans[j][i] && !fans[j][i+1] && !fans[j+1][i] && !fans[j+1][i+1]) {
                        fans[j+1][i] = true;
                        fans[j][i+1] = true;
                        fans[j+1][i+1] = true;
                        shower(i+.5, j+.5, 1);
                        addscore(1);
                    }
                }
            }
        }

        if (man) {
            const n = neighbors(man);
            const options = n .filter(xy => grid[xy[1]][xy[0]] === "5");
            if (grid[man[1]][man[0]] === "5") {
                manlife = 70;
                if (frame % 10 === 0) {
                    if (options.length) {
                        man = options[Math.floor(Math.random() * options.length)];
                    }
                }
            } else {
                if (options.length) {
                    man = options[Math.floor(Math.random() * options.length)];
                } else {
                    man = n[Math.floor(Math.random() * n.length)];
                }
                manlife--;
                if (!manlife) {
                    grid[man[1]][man[0]] = "~";
                    man = null;
                }
            }
        } else if (man === false) {
            outer: for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (grid[j][i] === "5" &&
                        neighbors([i,j]).every(xy => grid[xy[1]][xy[0]] === "5")) {
                        man = [i, j];
                        shower(i, j, 10);
                        break outer;
                    }
                }
            }
        }

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
                    setmsg("keyboard");
                }
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
                    if (i+1 < size && "1234567890".includes(grid[i + 1][j])) {
                        grid[i][j] = "0";
                        grid[i+1][j] = "~";
                    } else {
                        let l = (j - 1 >= 0) && "1234567890".includes(grid[i][j-1]);
                        let r = (j + 1 < size) && "1234567890".includes(grid[i][j+1]);
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
    10, 0, 0, 0, 14,
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
    "ö": 0x94,
};
