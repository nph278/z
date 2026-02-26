const size = 23;
const fontwidth = 5;
const cellwidth = fontwidth + 3;
let grid = Array.from({ length: size }, () => new Array(size).fill("0"));
let initgrid = Array.from({ length: size }, () => new Array(size).fill("0"));
let data = Array.from({ length: size }, () => new Array(size).fill(false));
const abc = "qwertyuioplkjhgfdsazxcvbnm";
const nums = ["zero", "one", "two", "three", "fourk", "fivek", "sixh", "seven", "eight", "nine"];

const spells = ["hint", "fourh", "fourk", "fivek", "sixh", "qr", "beagle", "drye", "aplit", "iblit", "apcalc", "analysis", "parker", "pool", "tunnel", "aday", "bday", "zeagle", "otot", "econ", "phone", "bunker", "psych", "maze", "lunch", "apwh", "apush"];
let hint_words = spells;
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

const framelength = 80;

const fracture = [];
for (let i = 0; i <= size; i++) {
    fracture.push(Math.floor(Math.random()*cellwidth));
}

const sounds = {};

const playsound = (s) => {
    if (!(s in sounds)) {
        sounds[s] = new Audio("./sfx/"+s+".wav");
    }
    const sfx = sounds[s];
    sfx.load();
    sfx.play();
}

const loadsound = (s) => {
    if (!(s in sounds)) {
        sounds[s] = new Audio("./sfx/"+s+".wav");
    }
    const sfx = sounds[s];
    sfx.load();
}

loadsound("afxbleep");
loadsound("beagle");
loadsound("blues");
loadsound("maj69");
loadsound("phone");
loadsound("audrey");
loadsound("eagle");
loadsound("maj7");
loadsound("satie");
loadsound("backdoor");
loadsound("friend");
loadsound("maj");
loadsound("slam");
loadsound("bgm");
loadsound("giantsteps");
loadsound("omori");
loadsound("squish");

const qrpat = "00000000000000000000000 01111111001000011111110 01000001011000010000010 01011101001011010111010 01011101011011010111010 01011101000101010111010 01000001011101010000010 01111111010101011111110 00000000000110000000000 01111101111001101010100 01001100110110000011010 00110101110100011100110 01110010101100110101000 01011001000011110000000 00000000011100001011000 01111111011100110100100 01000001000100101100010 01011101011011000011010 01011101010011101111100 01011101010100110110000 01000001010111001111110 01111111010011101001100 00000000000000000000000";
const qr = unpat(qrpat);
const mazepat = "11111111111111111111111 10000000000000010000001 10110111110111111111101 10010000010010010000001 11011011111110111011111 10010010000000000010001 10111011111111011110111 10010000000000010010101 11111110111110110110101 10000010010000000010001 11011011011110111111101 10010000010000000010001 11111111110111011111011 10010100010010000010001 11010101011110110111101 10010001000000010000001 10110111110111111011111 10100010000010000000001 10101011111111110110111 10001010100001010010001 11111010111011011111011 10000000000000000000001 11111111111111111111111";
const maze = unpat(mazepat);

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
    let boulders = [];
    let fracsize = 0;
    let fw = 0;
    let frenzy = 0;

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
    const scr_warn = 0;
    const scr_choose = 1;
    const scr_game = 2;
    const scr_result = 3;
    let screen = scr_warn;
    let timed = false;
    let framesleft = 0;
    let mode = 0;
    let resultsover = false;
    let severed = false;
    let mazeon = false;

    let dryes = [];
    let psych = false;
    let targets = [];
    const tlife = 30;
    let man = false; // False: not started, null: dead
    let manlife = 0;
    let day = 0;
    let stockprice = 1000;
    const shsize = 50;
    let stockhistory = new Array(shsize).fill(stockprice);
    let econ = false;
    let stockowned = 0;
    let fluctuation = 100;
    const ewc = 8;
    const ehc = 4;
    let prefrac = [];
    const whist = 50;
    const ushist = 25;
    let history = new Array(whist).fill(initgrid);

    let bgm = new Audio("./sfx/bgm.wav");
    bgm.loop = true;

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
        grid[11].fill("9");
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
            for (let x = Math.max(0, xy[0] - s.length + 1); x + s.length - 1 < Math.min(xy[0] + s.length, size); x++) {
                if (checkspellx(x, xy[1], s)) {
                    for (let j = 0; j < s.length; j++) {
                        grid[xy[1]][x+j] = "0";
                    }
                    return [s,false];
                }
            }
        }
        for (let i = 0; i < spells.length; i++) {
            const s = spells[i];
            for (let y = Math.max(0, xy[1] - s.length + 1); y + s.length - 1 < Math.min(xy[1] + s.length, size); y++) {
                if (checkspelly(xy[0], y, s)) {
                    for (let j = 0; j < s.length; j++) {
                        grid[y+j][xy[0]] = "0";
                    }
                    return [s,true];
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

    const worsen = (xy) => {
        const prev = grid[xy[1]][xy[0]];
        if ("123456789".includes(prev)) {
            grid[xy[1]][xy[0]] = (+prev - 1).toString();
            shower(xy[0], xy[1], 1);
        } else if (prev === "0" || prev === "%") {
            grid[xy[1]][xy[0]] = "☻";
        } else if (abc.includes(prev)) {
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


    const handleclick = (cellx, celly) => {
        history.push(structuredClone(grid));
        history.shift(1);

        if (targets.some(t=>t[0]===cellx && t[1]===celly)) {
            targets = targets.filter(t=>!(t[0]===cellx && t[1]===celly));
            shower(cellx, celly, 20);
            playsound("squish");
            addscore(Math.max(1000, Math.floor(score*.1)));
        } else if (econ && (cellx < ewc) && (celly < ehc + 3)) {
            if (celly === ehc + 1) {
                if (cellx < 3) {
                    if (score >= stockprice) {
                        score -= stockprice;
                        stockowned++;
                        shower(cellx, celly, 5);
                        playsound("giantsteps");
                    } else {
                        setmsg("No");
                        playsound("blues");
                        clearmsg = 10;
                    }
                } else if (cellx > 3) {
                    if (stockowned) {
                        score += stockprice;
                        stockowned--;
                        shower(cellx, celly, 5);
                        playsound("satie");
                    } else {
                        setmsg("No");
                        playsound("blues");
                        clearmsg = 10;
                    }
                }
            }
        } else {
            const prev = grid[celly][cellx];
            const n = neighbors([cellx, celly]);
            if (prev === "0" && !n.some(xy => grid[xy[1]][xy[0]] === "☻")) {
                playsound("slam");
                let newnum = 1;
                if (day === 2) {
                    newnum = 2;
                }
                if (frenzy) {
                    newnum = 9;
                }
                setmsg(newnum.toString());
                grid[celly][cellx] = newnum.toString();
                clearmsg = 5;
                addscore(newnum);
                if (n.every(x => grid[x[1]][x[0]] === grid[n[0][1]][n[0][0]])) {
                    msg+=" "+"*".repeat(n.length);
                    addpath(n);
                    addscore(newnum);
                }
            } else if ("12345678".includes(prev) && !n.some(xy => grid[xy[1]][xy[0]] === "☻")) {
                const sum = n.map((e) => tonum(grid[e[1]][e[0]])).reduce((a,b)=>(a+b));
                const x = frenzy ? 9 : Math.min(9,+prev + ((day === 2)?2:1));
                if (sum >= x) {
                    playsound("afxbleep");
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
                    playsound("blues");
                    clearmsg = 10;
                }
            } else if (prev === "9") {
                playsound("slam");
                shower(cellx, celly, 1);
                setmsg("keyboard");
                clearmsg = 5;
                grid[celly][cellx] = "?";
            } else if (prev === "?") {
                playsound("slam");
                setmsg("cancelled");
                clearmsg = 5;
                grid[celly][cellx] = "9";
            } else if (abc.includes(prev)) {
                const sp = getspell([cellx, celly]);
                if (sp) {
                    const [spell, vert] = sp;
                    hint_words=hint_words.filter(q=>q!==spell);
                    shower(cellx, celly, 30);
                    addscore(100);
                    setmsg("¡"+spell+"!");
                    clearmsg = 20;
                    if (spell === "qr") {
                        playsound("maj69");
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
                    } else if (spell === "apwh") {
                        playsound("maj69");
                        grid = structuredClone(history[0]);
                        history = new Array(whist).fill(initgrid);
                    } else if (spell === "apush") {
                        playsound("maj69");
                        grid = structuredClone(history[whist-ushist]);
                        history = new Array(whist).fill(initgrid);
                    } else if (spell === "maze") {
                        playsound("maj69");
                        mazeon = true;
                        boulders = dryes.map(xy => [xy[0]*cellwidth, xy[1]*cellwidth, 50]);
                    } else if (nums.includes(spell)) {
                        playsound("maj69");
                        grid[celly][cellx] = "+";
                        data[celly][cellx] = (nums.indexOf(spell)).toString();
                        addpath([[cellx+1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx-1,celly+1]]);
                        addpath([[cellx+2,celly+2],[cellx+2,celly-2],[cellx-2,celly-2],[cellx-2,celly+2]]);
                    } else if (spell === "aplit" || spell === "iblit") {
                        playsound("maj69");
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
                    } else if (spell === "psych") {
                        playsound("maj69");
                        psych = true;
                    } else if (spell === "apcalc" || spell === "analysis") {
                        playsound("maj69");
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
                    } else if (spell === "otot") {
                        playsound("maj69");
                        for (let j = 0; j < 2; j++) {
                            targets.push([Math.floor(size*Math.random()),
                                          Math.floor(size*Math.random()),
                                          tlife]);
                        }
                    } else if (spell == "fourh") {
                        playsound("maj69");
                        if (severed) {
                            fw++;
                        } else {
                            severed = true;
                        }
                    } else if (spell === "hint") {
                        playsound("maj69");
                        let s = "";
                        if (hint_words.length) {
                            s = hint_words[Math.floor(Math.random() * hint_words.length)];
                            hint_words=hint_words.filter(q=>q!==s);
                        } else {
                            s = "i0dont0have0any0more";
                        }
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
                        playsound("beagle");
                        for (let i = 0; i < size; i++) {
                            grid[i].fill("☻");
                            score = 666;
                            econ = false;
                        }
                    } else if (spell === "parker") {
                        playsound("maj69");
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
                        playsound("maj69");
                        for (let i = 0; i < size; i++) {
                            grid[0][i] = "~";
                            grid[1][i] = "~";
                            grid[2][i] = "~";
                            grid[3][i] = "☻";
                        }
                        addpath([[0,4],[size-1,4]]);
                    } else if (spell === "lunch") {
                        playsound("maj69");
                        frenzy = 125;
                    } else if (spell === "bunker") {
                        playsound("maj69");
                        for (let i = 0; i < size; i++) {
                            grid[size-4][i] = "6";
                            grid[size-3][i] = "0";
                            if (i%2) {
                                grid[size-2][i] = "$";
                            } else {
                                grid[size-2][i] = "0";
                            }
                            grid[size-1][i] = "0";
                        }
                        addpath([[0,size-5],[size-1,size-5]]);
                    } else if (spell === "drye") {
                        playsound("eagle");
                        dryes.push([cellx, celly]);
                        addpath([[cellx+1,celly+1],[cellx+1,celly-1],[cellx-1,celly-1],[cellx-1,celly+1]]);
                        addpath([[cellx+2,celly+2],[cellx+2,celly-2],[cellx-2,celly-2],[cellx-2,celly+2]]);
                    } else if (spell === "aday") {
                        playsound("maj69");
                        day = 1;
                        canvas.style.background = "radial-gradient(circle, lightblue 0%, red 100%)";
                    } else if (spell === "bday") {
                        playsound("maj69");
                        day = 2;
                        canvas.style.background = "radial-gradient(circle, lightblue 0%, blue 100%)";
                    } else if (spell === "phone") {
                        playsound("phone");
                        grid[celly][cellx] = "%";
                        addpath([[cellx-2,celly-2],
                                 [cellx+2,celly+2]]);
                        addpath([[cellx+2,celly-2],
                                 [cellx-2,celly+2]]);
                    } else if (spell === "zeagle") {
                        playsound("maj69");
                        if (vert) {
                            for (let i = 0; i < size; i++) {
                                grid[i][cellx] = "9";
                                shower(cellx, i, 10);
                            }
                        } else {
                            for (let i = 0; i < size; i++) {
                                grid[celly][i] = "9";
                                shower(i, celly, 10);
                            }
                        }
                    } else if (spell === "econ") {
                        playsound("maj69");
                        if (econ) {
                            fluctuation = Math.ceil(fluctuation*1.25);
                        } else {
                            econ = true;
                        }
                    } else if (spell === "tunnel") {
                        playsound("maj69");
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
                    playsound("blues");
                    clearmsg = 10;
                }
            } else if (prev === "+") {
                playsound("slam");
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
            } else if (prev === "$") {
                if (Math.random() > 0.5) {
                    playsound("maj7");
                    score = Math.ceil(score*1.5);
                    setmsg(":) :) :)");
                } else {
                    playsound("blues");
                    score = Math.ceil(score*0.5);
                    setmsg(":( :( :(");
                }
                clearmsg = 10;
                grid[celly][cellx] = "0";
            } else if (prev === "☻") {
                playsound("omori");
                grid[celly][cellx] = "0";
            } else if (pipe.includes(prev)) {
                playsound("slam");
                grid[celly][cellx] = data[celly][cellx] || "9";
                data[celly][cellx] = false;
            }
            requestAnimationFrame(draw);
        }
    }

    canvas.onclick = (e) => {
        let yo1 = Math.floor(Math.sin(frame/20)*2);
        let yo2 = Math.floor(Math.cos(frame/20)*2);
        if (!fw) {
            yo2 = yo1;
        }
        if (resultsover && (screen === scr_warn || screen == scr_result)) {
            screen = scr_choose;
            requestAnimationFrame(draw);
        } else if (screen === scr_choose) {
            const rect = canvas.getBoundingClientRect();
            const y = (e.clientY - rect.top)/sizemult;
            const n = Math.floor((y - 70)/20);
            if (n >= 0 && n < modes) {
                begin_game(n+1);
            }
        } else if (screen == scr_game) {
            const rect = canvas.getBoundingClientRect();
            let x = (e.clientX - rect.left)/sizemult;
            let y = (e.clientY - rect.top)/sizemult;
            if (x <= gridpixels/2) {
                x += fw;
                y -= yo1;
            }
            if (x > gridpixels/2) {
                x -= fw;
                y -= yo2;
            }
            const cellx = Math.floor(x/cellwidth);
            const celly = Math.floor(y/cellwidth);
            if (ismobile && (celly >= size) && msg === "keyboard") {
                handlekey(prompt("Enter a letter")[0].toLowerCase());
            } else {
                let xys = [[cellx, celly]];
                if (psych && !boulders.length) {
                    xys = xys.concat(dryes);
                }
                xys.forEach(xy => {
                    handleclick(xy[0], xy[1]);
                    if (severed) {
                        handleclick(size - 1 - xy[0], xy[1]);
                    }
                });
            }
        }
    }

    const modes = 6;
    const begin_game = (n) => {
        canvas.style.background = "radial-gradient(circle, white 0%, black 100%)";
        bgm.play();
        playsound("maj");
        console.log(n);
        mode = n;
        grid = Array.from({ length: size }, () => new Array(size).fill("0"));
        data = Array.from({ length: size }, () => new Array(size).fill(false));
        history = new Array(whist).fill(initgrid);
        msg = "";
        msgoffset = [0,0];
        clearmsg = 0;
        qrcount = 0;
        score = 0;
        paths = [];
        particles = [];
        boulders = [];
        dryes = [];
        psych = false;
        targets = [];
        man = false;
        manlife = 0;
        frenzy = 0;
        day = 0;
        stockprice = 1000;
        stockhistory = new Array(shsize).fill(stockprice);
        econ = false;
        stockowned = 0;
        fluctuation = 100;
        screen = scr_game;
        frame = 0;
        timed = n > 1;
        severed = false;
        mazeon = false;
        fracsize = 0;
        fw = 0;
        prefrac = [];
        let mins = [0, 0, 1, 5, 10, 30, .5][n];
        framesleft = Math.floor(mins * 60 * (1000/framelength));
        requestAnimationFrame(draw);
    }

    const handlekey = (k) => {
        if (screen === scr_choose) {
            const ns = "123456789".split("").slice(0, modes);
            if (ns.includes(k)) {
                begin_game(+k);
            }
        } else if (screen === scr_game) {
            if (psych) {
                for (let i = 0; i < dryes.length; i++) {
                    let xy = dryes[i];
                    if (k === "arrowup") {
                        xy[1] = Math.max(0, xy[1]-1);
                    } else if (k === "arrowleft") {
                        if (!severed || xy[0] !== 12) {
                            xy[0] = Math.max(0, xy[0]-1);
                        }
                    } else if (k === "arrowdown") {
                        xy[1] = Math.min(size-1, xy[1]+1);
                    } else if (k === "arrowright") {
                        if (!severed || xy[0] !== 10) {
                            xy[0] = Math.min(size-1, xy[0]+1);
                        }
                    }
                }
            }
            let s = 0;
            if (abc.split("").includes(k)) {
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
                    playsound("maj7");
                    if (p.length > 1) {
                        addpath(p);
                    }
                }
            }
        }
        requestAnimationFrame(draw);
    }

    document.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        if (["arrowup","arrowleft","arrowdown","arrowright"].includes(k)) {
            e.preventDefault();
        }
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
        else if (a === "#") { return "black";}
        else if (a === "%") {return "black";}
        else if (a === "$") {return "green";}
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
        else if (a === "#") {return "red";}
        else if (a === "%") {return "hsl("+frame*20+", 100%, 50%, 0.8)";}
        else if (a === "$") {return "white";}
    };

    let frame = 0;
    const modenames =
          [0,
           "Sandbox (beginner)",
           "1 Min",
           "5 Min",
           "10 Min",
           "30 Min HomeRoom",
           "30 Sec SpeedRun"];
    const draw = () => {
        sizemult = Math.floor(Math.min(window.innerWidth/width, window.innerHeight/height));
        canvas.style.width = sizemult * width + "px";
        let yo1 = Math.floor(Math.sin(frame/20)*2);
        let yo2 = Math.floor(Math.cos(frame/20)*2);
        if (!fw) {
            yo2 = yo1;
        }

        const getcellpos = (a) => {
            let x = a[0] * cellwidth;
            let y = a[1] * cellwidth;
            if (a[0] <= 11) {
                x -= fw;
                y += yo1;
            }
            if (a[0] > 11) {
                x += fw;
                y += yo2;
            }
            return [x, y];
        }

        if (screen === scr_warn) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height)
            ctx.fillStyle = "red";
            ctx.font = "19px Courier Prime, courier, monospace";
            ctx.fillText("Extreme flashing", 0, 50);
            ctx.fillText("lights warning", 0, 70);
            ctx.fillStyle = "white";
            if (ismobile) {
                ctx.fillText("Mobile not", 0, 100);
                ctx.fillText("recommended", 0, 120);
            }
            ctx.fillStyle = "green";
            ctx.fillText("turn on Sound", 0, 180);
            if (resultsover) {
                ctx.fillStyle = "white";
                ctx.fillText("Click2Begin", 0, 160);
            }
        } else if (screen === scr_choose) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height)
            ctx.font = "20px Libertinus Serif, times, serif";
            ctx.fillStyle = "green";
            ctx.fillText("Choose mode:", 0, 30);
            ctx.fillStyle = "grey";
            ctx.fillRect(0, 70, width, 20)
            ctx.fillStyle = "white";
            for (let i = 1; i <= modes; i++) {
                ctx.fillText(i + ". " + modenames[i], 0, 70 + 20*i);
            }
        } else if (screen === scr_result) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height)
            ctx.font = "20px Libertinus Serif, times, serif";
            ctx.fillStyle = "green";
            ctx.fillText(modenames[mode], 0, 30);
            ctx.fillText("Final Score:", 0, 50);
            ctx.fillStyle = "yellow";
            ctx.fillText(score, 0, 70);
            ctx.fillStyle = "green";
            ctx.fillText("Best Score:", 0, 90);
            ctx.fillStyle = "blue";
            ctx.fillText(localStorage.getItem("tzg"+mode)||score, 0, 110);
            ctx.fillStyle = "white";
            if (resultsover) {
                ctx.fillText("Click2Continue", 0, 150);
            }
        } else if (screen === scr_game) {
            const corecolor = frenzy ?
                  (ctx.strokeStyle = "hsl(" + frame*20 + ", 100%, 50%, 0.8)") :
                  ("rgb("+(150 + 90 * Math.sin(frame/7))+", 0, 0)");
            const fans = Array.from({ length: size }, () => new Array(size).fill(false));
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = corecolor;
            ctx.fillRect(0, gridpixels-1+yo1, 11*cellwidth+fracture[size], height);
            ctx.fillRect(11*cellwidth+fracture[size], gridpixels-1+yo2, gridpixels, height);
            ctx.fillRect(0, 0, 11*cellwidth+fracture[size], yo1);
            ctx.fillRect(11*cellwidth+fracture[size], 0, gridpixels, yo2);

            // Grid
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let [x,y] = getcellpos([i,j]);
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
                    if (value === "0") {
                        x+=Math.random()*.5;
                        y+=Math.random()*.5;
                    }
                    if (value === "#") {
                        x+=fw;
                        if (prefrac[j] === "!") {
                            ctx.fillStyle = corecolor;
                        } else {
                            ctx.fillStyle = bgcolor(prefrac[j], 0);
                        }
                        ctx.beginPath();
                        ctx.moveTo(x-fw,y)
                        ctx.lineTo(x+fracture[j]-fw, y);
                        ctx.lineTo(x+fracture[j+1]-fw, y+cellwidth);
                        ctx.lineTo(x-fw,y+cellwidth);
                        ctx.closePath();
                        ctx.fill();

                        ctx.beginPath();
                        ctx.moveTo(x+fracture[j]+fw, y-yo1+yo2);
                        ctx.lineTo(x+cellwidth+fw,y-yo1+yo2);
                        ctx.lineTo(x+cellwidth+fw,y-yo1+yo2+cellwidth);
                        ctx.lineTo(x+fracture[j+1]+fw, y+cellwidth-yo1+yo2);
                        ctx.closePath();
                        ctx.fill();


                        ctx.fillStyle = fgcolor(prefrac[j], 0);
                        const pat = font.slice(cp437[prefrac[j]]*5,cp437[prefrac[j]]*5+5).map(a=>[a%2, Math.floor(a/2)%2, Math.floor(a/4)%2, Math.floor(a/8)%2, Math.floor(a/16)%2]);
                        for (let i = 0; i < fontwidth; i++) {
                            for (let j = 0; j < fontwidth; j++) {
                                if (pat[j][i]) {
                                    ctx.fillRect(x + 2 + i-fw, y + 2 + j, 1, 1);
                                }
                            }
                        }
                        for (let i = 0; i < fontwidth; i++) {
                            for (let j = 0; j < fontwidth; j++) {
                                if (pat[j][i]) {
                                    ctx.fillRect(x + 2 + i+fw, y-yo1+yo2 + 2 + j, 1, 1);
                                }
                            }
                        }

                        ctx.fillStyle = corecolor;
                        ctx.strokeStyle = corecolor;
                        ctx.beginPath();
                        ctx.moveTo(x+fracture[j]-fw, y);
                        ctx.lineTo(x+fracture[j+1]-fw, y+cellwidth);
                        ctx.lineTo(x+fracture[j+1]+fw, y+cellwidth-yo1+yo2);
                        ctx.lineTo(x+fracture[j]+fw, y-yo1+yo2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                        ctx.fillStyle = "black";
                        ctx.strokeStyle = "black";
                        if (prefrac[j] !== "!") {
                            ctx.beginPath();
                            ctx.moveTo(x+fracture[j]-fw, y);
                            ctx.lineTo(x+fracture[j+1]-fw, y+cellwidth);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x+fracture[j]+fw, y-yo1+yo2);
                            ctx.lineTo(x+fracture[j+1]+fw, y+cellwidth-yo1+yo2);
                            ctx.stroke();
                            ctx.fillRect(x-cellwidth, y, fracture[j]-fw+cellwidth, 1);
                            ctx.fillRect(x+fracture[j]+fw, y-yo1+yo2, cellwidth*2, 1);
                            ctx.fillRect(x-fw, y, 1, cellwidth);
                        }
                    } else if (value === "!") {
                        ctx.fillStyle = corecolor;
                        ctx.fillRect(x, y, cellwidth, cellwidth);
                    } else {
                        ctx.fillStyle = bgcolor(value, frame);
                        ctx.fillRect(x, y, cellwidth, cellwidth);
                        ctx.fillStyle = "black";
                        ctx.fillRect(x, y, cellwidth, 1);
                        ctx.fillRect(x, y, 1, cellwidth);
                        ctx.fillStyle = fgcolor(value, frame);
                        const pat = font.slice(cp437[value]*5,cp437[value]*5+5).map(a=>[a%2, Math.floor(a/2)%2, Math.floor(a/4)%2, Math.floor(a/8)%2, Math.floor(a/16)%2]);
                        for (let i = 0; i < fontwidth; i++) {
                            for (let j = 0; j < fontwidth; j++) {
                                if (pat[j][i]) {
                                    ctx.fillRect(x + 2 + i, y + 2 + j, 1, 1);
                                }
                            }
                        }
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
                        let [x,y] = getcellpos([i,j]);
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(0,0,0,0.8)";
                        ctx.arc(x+cellwidth, y+cellwidth, cellwidth, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(x+(1+Math.cos(angle))*cellwidth,
                                   y+(1+Math.sin(angle))*cellwidth);
                        ctx.lineTo(x+(1+Math.cos(angle+Math.PI))*cellwidth,
                                   y+(1+Math.sin(angle+Math.PI))*cellwidth);
                        ctx.stroke();
                    }
                }
            }

            if (severed) {
                ctx.fillStyle = corecolor;
                ctx.strokeStyle = corecolor;
                ctx.beginPath();
                ctx.moveTo(11*cellwidth+fracture[size]-fw, gridpixels-1+yo1);
                ctx.lineTo(11*cellwidth+fracture[size]+fw, gridpixels-1+yo2);
                ctx.lineTo(11*cellwidth+fracture[size]+fw, gridpixels-1+yo2+cellwidth);
                ctx.lineTo(11*cellwidth+fracture[size]-fw, gridpixels-1+yo1+cellwidth);

                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            ctx.fillStyle = "black";
            if (!mazeon) {
                ctx.fillRect(0, gridpixels-1+yo1, 11*cellwidth+fracture[size]-fw, 1);
                ctx.fillRect(11*cellwidth+fracture[size]+fw, gridpixels-1+yo2, gridpixels-(11*cellwidth+fracture[size]+fw), 1);
                ctx.fillRect(gridpixels-1+fw, 0, 1, gridpixels+yo2);
            }

            if (econ) {
                const ew = ewc*cellwidth;
                const eh = ehc*cellwidth;
                const x = 100 + 80 * Math.sin(frame/10);
                ctx.fillStyle = "rgb("+x+","+x+","+x+")";
                ctx.fillRect(-fw,yo1,ew,eh);
                const max = Math.max(...stockhistory);
                const min = Math.min(...stockhistory);
                for (let i = 1; i < shsize; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = (stockhistory[i] >= stockhistory[i-1]) ?
                        "green" : "red";
                    ctx.moveTo(i * ew / shsize-fw,
                               eh - ((stockhistory[i-1]-min) * eh / (max-min))+yo1);
                    ctx.lineTo(i * ew / shsize-fw,
                               eh - ((stockhistory[i]-min) * eh / (max-min))+yo1);
                    ctx.stroke();
                }

                ctx.fillStyle = "blue";
                ctx.font = "40px Monsieur La Doulaise, cursive";
                ctx.fillText(fluctuation, 3, 24);
            }

            const shake = 2;
            paths.forEach(path => {
                ctx.beginPath();
                const s1 = Math.random()*shake;
                const s2 = Math.random()*shake;
                ctx.strokeStyle = "hsl(" + frame*20 + ", 100%, 50%, 0.8)";
                const [x1,y1] = getcellpos(path[0]);
                ctx.moveTo(x1+.5*cellwidth + s1,
                           y1+.5*cellwidth + s2);
                for (let i = 1; i < path.length; i++) {
                    const h1 = Math.random()*shake;
                    const h2 = Math.random()*shake;
                    const [x,y] = getcellpos(path[i]);
                    ctx.lineTo(x+.5*cellwidth + h1,
                               y+.5*cellwidth + h2);
                }
                ctx.closePath();
                ctx.stroke();
            });

            for (let i = 0; i < targets.length; i++) {
                const t = targets[i];
                const cx = t[0];
                const cy = t[1];
                const [x, y] = getcellpos([t[0],t[1]]);
                const left = t[2];
                const minr = .8*cellwidth;
                const maxr = 3*cellwidth;
                const r = minr+Math.exp(left*Math.log(maxr-minr)/tlife);
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.arc(x+.5*cellwidth,
                        y+.5*cellwidth,
                        r,
                        0,
                        2 * Math.PI);
                ctx.stroke();
                const lr1 = 0.5;
                const lr2 = 1.4;
                [0, Math.PI/2, Math.PI, 3*Math.PI/2].forEach(t => {
                    const a = t + frame * .3;
                    ctx.beginPath();
                    ctx.moveTo(x+.5*cellwidth + r * lr1 * Math.cos(a),
                               y+.5*cellwidth + r * lr1 * Math.sin(a));
                    ctx.lineTo(x+.5*cellwidth + r * lr2 * Math.cos(a),
                               y+.5*cellwidth + r * lr2 * Math.sin(a));
                    ctx.stroke();
                });
            }

            for (let i = 0; i < boulders.length; i++) {
                const t = boulders[i];
                const left = t[2];
                const x = t[0];
                const y = t[1] - left;
                const r = 10;
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "grey";
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.fillStyle = "hsl(" + p.age * 100 + ", 100%, 50%)";
                ctx.fillRect(p.x, p.y, 4, 4);
            }

            ctx.fillStyle = frame%2 ? "magenta" : "purple";
            ctx.font = "80px Monsieur La Doulaise, cursive";
            ctx.fillText(msg, 0+msgoffset[0], 90 - clearmsg + msgoffset[1]);

            ctx.fillStyle = frame%2 ? "yellow" : "orange";
            ctx.font = "40px Monsieur La Doulaise, cursive";
            ctx.fillText(notes[Math.floor(frame/30) % notes.length], 10, 180);

            ctx.fillStyle = frame%2 ? "lightblue" : "white";
            if (frenzy) {
                ctx.font = "15px Courier Prime, courier, monospace";
                ctx.fillText("Nutritious Frenzy!" + frenzy, 0, gridpixels+ 16);
            } else {
                ctx.font = "20px Courier Prime, courier, monospace";
                if (ismobile && msg === "keyboard") {
                    ctx.fillText("ClickHere2Type", 0, gridpixels+ 16);
                } else {
                    if (score < 0) {
                        ctx.fillStyle = frame%2 ? "red" : "darkred";
                    }
                    ctx.fillText("Score: " + score, 0, gridpixels+ 16);
                }
            }

            ctx.font = "15px Courier Prime, courier, monospace";
            if (!psych || (Math.floor(frame / 30) % 2)) {
                if (day === 1) {
                    ctx.fillStyle = frame%2 ? "turquoise" : "cyan";
                    ctx.fillText("+ADay", 140, gridpixels+ 10);
                } else if (day === 2) {
                    ctx.fillStyle = frame%2 ? "red" : "orangered";
                    ctx.fillText("+BDay", 140, gridpixels+ 10);
                }
            }
            if (psych && (!day || !(Math.floor(frame / 30) % 2))) {
                ctx.fillStyle = frame%2 ? "pink" : "magenta";
                ctx.fillText("+Psych", 130, gridpixels+10);
            }

            if (timed) {
                ctx.fillStyle = "red";
                ctx.font = "20px Courier Prime, courier, monospace";
                ctx.fillText(framesleft,
                             gridpixels - 10*(framesleft.toString().length) - 20,
                             20);
            }
        }
    };

    const update = () => {
        if (screen === scr_game) {
            stockprice += Math.floor((Math.random()-.5) * fluctuation);
            stockprice = Math.max(stockprice, 10);
            stockhistory.shift(1);
            stockhistory.push(stockprice);
            if (mazeon) {
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (maze[i][j]) {
                            grid[i][j] = "!";
                        }
                    }
                }
            }
            if (econ) {
                for (let i = 0; i < ewc; i++) {
                    for (let j = 0; j < ehc+3; j++) {
                        grid[j][i] = "0";
                    }
                }
                const s = stockprice.toString();
                for (let i = 0; i < s.length; i++) {
                    grid[ehc][i + ewc - s.length] = s[i];
                }
                const m = "buy0sell";
                for (let i = 0; i < m.length; i++) {
                    grid[ehc+1][i] = m[i];
                }
                const o = stockowned.toString();
                for (let i = 0; i < o.length; i++) {
                    grid[ehc+2][i + ewc - o.length] = o[i];
                }
            }
            if (severed) {
                for (let i = 0; i < fracsize; i++) {
                    prefrac[i] = prefrac[i] || (grid[i][11]);
                    grid[i][11] = "#";
                }
                if (fracsize < size) {
                    fracsize++;
                } else if (fw < 3 && frame % 7 === 0) {
                    fw++;
                    if (fw === 1) {
                        playsound("friend");
                    }
                }
            }

            if (frame % angle_steps === 0) {
                const fans = Array.from({ length: size }, () => new Array(size).fill(false));
                let isfans = false;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (i+1 < size && j+1 < size && grid[j][i] === "4" && grid[j][i+1] === "4" && grid[j+1][i] === "4" && grid[j+1][i+1] === "4" && !fans[j][i] && !fans[j][i+1] && !fans[j+1][i] && !fans[j+1][i+1]) {
                            fans[j+1][i] = true;
                            fans[j][i+1] = true;
                            fans[j+1][i+1] = true;
                            shower(i+.5, j+.5, 1);
                            addscore(10);
                            isfans = true;
                        }
                    }
                }
                if (isfans) {
                    playsound("squish");
                }
            }

            for (let i = 0; i < targets.length; i++) {
                const t = targets[i];
                const x = t[0];
                const y = t[1];
                const left = t[2];
                if (left) {
                    t[2]--;
                } else {
                    playsound("blues");
                    targets[i] = false;
                    grid[y][x] = "x";
                    neighbors([x,y]).forEach(a => {
                        grid[a[1]][a[0]] = "x";
                    });
                    addscore(Math.min(-10000, -Math.floor(.5*score)));
                }
            }

            for (let i = 0; i < boulders.length; i++) {
                const t = boulders[i];
                const x = t[0];
                const y = t[1];
                const left = t[2];
                if (left > 0) {
                    t[2] -= 4;
                } else {
                    playsound("squish");
                    shower(x/cellwidth, y/cellwidth, 10);
                    dryes = [];
                    boulders = [];
                }
            }

            targets = targets.filter(a => a);

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
                        playsound("squish");
                        man = null;
                    }
                }
            } else if (man === false) {
                outer: for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (grid[j][i] === "5" &&
                            neighbors([i,j]).every(xy => grid[xy[1]][xy[0]] === "5")) {
                            man = [i, j];
                            playsound("audrey");
                            shower(i, j, 10);
                            break outer;
                        }
                    }
                }
            }

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

            const phones = [];
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (grid[i][j] === "%") {
                        phones.push([j, i]);
                    }
                }
            }
            if (!psych && !boulders.length) {
                for (let i = 0; i < dryes.length; i++) {
                    const d = dryes[i];
                    let n = neighbors(d);
                    n = n.filter(xy => grid[xy[1]][xy[0]] !== "#" && grid[xy[1]][xy[0]] !== "!");
                    if (phones.length) {
                        worsen(d);
                    } else if (Math.random() < 0.2) {
                        improve(d);
                    }
                    let option = 0;
                    if (phones.length) {
                        option = n.reduce((xy1, xy2) => {
                            const d1 = Math.min(...phones.map((p) => {
                                const dx1 = xy1[0]-p[0];
                                const dy1 = xy1[1]-p[1];
                                return dx1*dx1 + dy1*dy1;
                            }));
                            const d2 = Math.min(...phones.map((p) => {
                                const dx2 = xy2[0]-p[0];
                                const dy2 = xy2[1]-p[1];
                                return dx2*dx2 + dy2*dy2;
                            }));
                            return (d1 < d2) ? xy1 : xy2;
                        });
                    } else if ((frame % 2 === 0) || frenzy) {
                        option = n[Math.floor(Math.random() * n.length)]
                    } else {
                        option = d;
                    }
                    dryes[i] = option;
                }
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

            frame++;
            if (frenzy) {
                frenzy--;
            }
            if (timed) {
                if (framesleft) {
                    framesleft--;
                } else {
                    bgm.pause();
                    playsound("backdoor");
                    screen = scr_result;
                    const best = localStorage.getItem("tzg"+mode)||(-Infinity);
                    localStorage.setItem("tzg"+mode, Math.max(best,score));
                    resultsover = false;
                    setTimeout(() => {
                        resultsover = true;
                    }, 2000);
                }
            }
        }
    }

    setInterval(() => {
        update();
        requestAnimationFrame(draw);
    }, framelength);

    setTimeout(() => {
        resultsover = true;
    }, 2000);
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
    "#︎": 0x23,
    "%": 0x87,
    "!": 0,
};
