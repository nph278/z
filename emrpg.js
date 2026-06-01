// Hi Reid
// This took a while.

"use strict";

let fontSize = 50;
let lineHeight = fontSize;
const lineWaverHeight = fontSize * .1;
const lineWaverRate = 0.001;
const spaceSize = fontSize / 3;
const wps = 10;
const width = 1500;
const height = 1000;
const hmargin = 20;
const vmargin = 140;
const fps = 30;
const cooldown = 1000;
const circleRate = 0.003;
const circleRR = 0.1;
const parityOffset = 0.1;
const keys = "1234567890abcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}\\|;:'\",./<>?`~";
const abc = "qwertyuiopasdfhjklzxcvbnm";
const origf = .85;
const grimeWidth = 100;
const endIDs = ["rankf", "rankd", "rankc", "rankb", "ranka", "ranks"];

const openInNewTab = (href) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: href,
  }).click();
}

const images = [];
const makeImage = (filename) => {
    const image = new Image();
    image.src = "./" + filename;
    images.push(image);
    return image;
};

const imageDryebux3 = makeImage("emrpg/dryebux3.png");
const imageDryebux7 = makeImage("emrpg/dryebux7.png");
const imageDryebux11 = makeImage("emrpg/dryebux11.png");
const imageDryebux101 = makeImage("emrpg/dryebux101.png");

const imageEye = makeImage("eye.png");

const sounds = [];
const makeSound = (filename) => {
    const sound = new Audio("./sfx/" + filename);
    sound.load();
    return sound;
};

const soundPhone = makeSound("rpgphone.mp3");
const soundCrystal = makeSound("rpgcrystal.wav");
const soundOwen = makeSound("owenlacy.mp3");
soundOwen.loop = true;

class Scene {
    constructor(img, sound) {
        makeImage(img);
        this.bgImage = img;
        this.music = makeSound(sound);
        this.music.loop = true;
    }

    apply(canvas) {
        this.music.play();
        canvas.style.backgroundImage = "url('" + this.bgImage + "')";
    }

    unapply() {
        this.music.pause();
    }
}

const scene_intro = new Scene("rpgbg1.gif", "crickets.mp3");
const scene_main = new Scene("rpgbg4.gif", "rpgbg2.mp3");
const scene_closet = new Scene("rpgcloset.gif", "zdshr_closet.mp3");
const scene_tape = new Scene("rpgtape.gif", "tape.mp3");
const scene_fourk = new Scene("rpgbg3.gif", "rpgbg1.mp3");
const scene_fivek = new Scene("rpg5k.gif", "rpg5k.mp3");
const scene_underground = new Scene("rpgbg2.gif", "underground.mp3");
const scene_trailers = new Scene("rpgdesert.gif", "rpgdesert.mp3");
const scene_tunnel = new Scene("rpgtunnel.gif", "banger.mp3");
const scene_musical = new Scene("rpgmusical.gif", "rpgmusical.mp3");
const scene_900 = new Scene("rpg900.gif", "rpg900.mp3");
const scene_pool = new Scene("rpgpool.gif", "rpgpool.mp3");
const scene_700 = new Scene("rpg700.gif", "rpg700.mp3");
const scene_gym = new Scene("rpggym.gif", "rpggym.mp3");

class BoolStore {
    constructor() {
        this.v = false;
    }

    off() {
        this.v = false;
    }

    on() {
        this.v = true;
    }
}

class TextStyle {
    constructor() {
        this.fontStyles = [];
        this.fontFamily = "Libertinus Serif, times, serif";
        this.color = "white";
        this.fontSize = fontSize;
        this.effects = [];
    }

    addFontStyle(s) {
        this.fontStyles.push(s);
    }

    get cssFontPrefix() {
        if (this.fontStyles.length === 0) {
            return "";
        } else {
            return this.fontStyles.join(" ") + " ";
        }
    }

    get offset() {
        if (this.effects.includes("circle")) {
            return [fontSize * circleRR * Math.cos(circleRate * Date.now()),
                    fontSize * circleRR * Math.sin(circleRate * Date.now())];
        } else {
            return [0, 0];
        }
    }

    textTransform(text) {
        if (this.effects.includes("allcaps")) {
            text = text.toUpperCase();
        }
        if (this.effects.includes("crazycaps")) {
            text = text.split("").map(c => (Math.random() > .5) ? c.toUpperCase() : c.toLowerCase()).join("-");
        }
        return text;
    }

    applySpec(spec) {
        switch(spec) {
        case "p":
            // Place
            this.fontFamily = "Courier Prime, courier, monospace";
            this.color = "lime";
            break;
        case "quo":
            // Quote
            this.fontFamily = "FixederSys, courier, monospace";
            this.color = "papayawhip";
            break;
        case "par":
            // Paren
            this.fontSize *= 0.75;
            this.color = "#e0e0e0";
            break;
        case "e":
            // Emphasis
            this.addFontStyle("italic");
            this.addFontStyle("bold");
            break;
        case "c":
            // Character
            this.addFontStyle("bold");
            this.color = "red";
            break;
        case "em1":
            // East
            this.addFontStyle("bold");
            this.color = "#50a5eb";
            break;
        case "em2":
            // Meck
            this.addFontStyle("bold");
            this.color = "#eaf048";
            break;
        case "s":
            // Subject
            this.addFontStyle("bold");
            this.color = "pink";
            this.effects.push("circle");
            break;
        case "id":
            // Id
            this.addFontStyle("bold");
            this.fontFamily = "major mono display, monospace";
            this.color = "red";
            this.effects.push("crazycaps");
            break
        case "o":
            // Option
            this.color = "orange";
            this.fontSize *= 1.1;
            break;
        case "d":
            // Dryebux
            this.color = "gold";
            this.fontFamily = "major mono display, monospace";
            this.fontSize *= 1.1;
            break;
        case "ec":
            // EddeCoin
            this.color = "cyan";
            this.fontFamily = "major mono display, monospace";
            this.fontSize *= 1.1;
            break;
        case "t":
            // Time
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "yellow";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        case "4":
            // Grime
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "grey";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        case "5":
            // Sand
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "yellow";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        case "f":
            // Floor
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "magenta";
            this.fontSize *= 0.8;
            break;
        case "r":
            // Rank
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "gold";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        case "g":
            // Goal
            this.color = "cyan";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            this.effects.push("allcaps");
            break;
        default:
            alert("bad spec: " + spec);
        }
    }
}

class TextPosition {
    constructor(startX, startY, maxX, maxY, noOverflow) {
        this.x = startX;
        this.y = startY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.minX = startX;
        this.minY = startY;
        this.noOverflow = noOverflow === true;
    }

    newLine() {
        this.x = this.minX;
        this.y += lineHeight + lineWaverHeight * Math.sin(lineWaverRate * Date.now());
    }

    shiftRight(n) {
        this.x += n;
    }

    overflow(n) {
        return !this.noOverflow && ((this.x + n > this.maxX) && (this.x > this.minX));
    }
}

class TextSegment {
    constructor(text, parity, quoteStore, parenStore) {
        quoteStore = quoteStore || new BoolStore();
        parenStore = parenStore || new BoolStore();
        const substance = text.toLowerCase().split("").filter(a => abc.includes(a)).join("");
        if (text === "--") {
            text = "—";
        } else if (substance === "east") {
            text = "!em1!" + text;
        } else if (substance === "meck" || substance === "mecks") {
            text = "!em2!" + text;
        }
        this.style = new TextStyle();
        this.parity = parity || false;
        if (text.includes("“")) {
            quoteStore.on();
        }
        if (text.includes("(")) {
            parenStore.on();
        }
        if (text[0] === "!") {
            const spec = text.split("!")[1];
            text = text.split("!")[2];
            this.style.applySpec(spec);
        } else {
            if (parenStore.v) {
                this.style.applySpec("par");
            } else if (quoteStore.v) {
                this.style.applySpec("quo");
            }
        }
        this.text = text;
        if (text.includes("”")) {
            quoteStore.off();
        }
        if (text.includes(")")) {
            parenStore.off();
        }
    }

    get visibleText() {
        return this.style.textTransform(this.text);
    }

    get color() {
        return this.style.color;
    }

    get offsetX() {
        return this.style.offset[0];
    }

    get offsetY() {
        return this.style.offset[1] + (this.parity ? (parityOffset * lineHeight) : 0);
    }

    get cssFont() {
        return  this.style.cssFontPrefix + this.style.fontSize + "px " + this.style.fontFamily;
    }

    draw(ctx, pos) {
        ctx.fillStyle = this.color;
        ctx.font = this.cssFont;
        const vt = this.visibleText;
        const m = ctx.measureText(vt);
        if (pos.overflow(m.width)) {
            pos.newLine();
        }
        ctx.fillText(vt, pos.x + this.offsetX, pos.y + lineHeight + this.offsetY);
        pos.shiftRight(m.width + spaceSize);
    }
}

class Line {
    constructor(str) {
        const quoteStore = new BoolStore();
        const parenStore = new BoolStore();
        this.segs = str.split(" ").map((s, i) => new TextSegment(s, i % 2 === 1, quoteStore, parenStore));
    }

    get totalWords() {
        return this.segs.length;
    }

    prependWord(str) {
        this.segs.unshift(new TextSegment(str));
    }

    draw(ctx, pos, words) {
        if (words === undefined) {
            words = this.totalWords;
        }
        this.segs.slice(0, words).forEach((s) => {
            s.draw(ctx, pos);
        });
        pos.newLine();
    }
}

class Action {
    constructor(type, args) {
        this.type = type;
        if (type === "room") {
            this.id = args[0];
            this.onetime = args[1][0] === true;
            this.replaces = Array.isArray(args[1]) && args[1];
        } else if (type === "dryebux") {
            this.dryebux = args[0];
        } else if (type === "hint") {
        } else if (type === "reset") {
        } else if (type === "end") {
        } else if (type === "meta") {
        } else if (type === "back") {
        } else if (type === "destroy") {
        } else if (type === "mini") {
        } else if (type === "normal") {
        } else if (type === "jetpack") {
        } else if (type === "plane") {
        } else if (type === "resize") {
        } else if (type === "resize2") {
        } else {
            alert("Bad action type: "+ type);
        }
    }
}

class RoomOption {
    constructor(action, desc) {
        this.action = action;
        this.text = new Line(desc);
    }

    draw(ctx, pos, words, n) {
        (new TextSegment("!o![" + keys[n] + "]")).draw(ctx, pos);
        this.text.draw(ctx, pos, words);
    }
}

// east meck reference
class Room {
    constructor(spec) {
        this.id = spec.id;
        this.desc = new Line(spec.desc);
        this.options = spec.options.map((o) => new RoomOption(new Action("room", [o[0], o.slice(2)]), o[1]));
        this.hasHint = false;
        if (spec.dryebux !== undefined) {
            this.options.push(new RoomOption(new Action("dryebux", [spec.dryebux]),
                                             "!d!Pick !d!up !d!bill !d!of !d!" + spec.dryebux + " !d!DryeBux",
                                             this.options.length));
            this.dryebux = spec.dryebux;
        }
        if (spec.reset !== undefined) {
            this.options.push(new RoomOption(new Action("reset", []), spec.reset, this.options.length));
        }
        if (spec.jetpack !== undefined) {
            this.options.push(new RoomOption(new Action("jetpack", []), spec.jetpack, this.options.length));
        }
        if (spec.plane !== undefined) {
            this.options.push(new RoomOption(new Action("plane", []), spec.plane, this.options.length));
        }
        if (spec.resize !== undefined) {
            this.options.push(new RoomOption(new Action("resize", []), spec.resize, this.options.length));
        }
        if (spec.resize2 !== undefined) {
            this.options.push(new RoomOption(new Action("resize2", []), spec.resize2, this.options.length));
        }
        if (spec.hint !== undefined) {
            this.options.push(new RoomOption(new Action("hint", []), spec.hint, this.options.length));
            this.hasHint = true;
        }
        if (spec.back !== undefined) {
            this.options.push(new RoomOption(new Action("back", []), spec.back, this.options.length));
        }
        if (spec.end !== undefined) {
            this.options.push(new RoomOption(new Action("end", []), spec.end, this.options.length));
        }
        if (spec.meta !== undefined) {
            this.options.push(new RoomOption(new Action("meta", []), spec.meta, this.options.length));
        }
        if (spec.destroy !== undefined) {
            this.options.push(new RoomOption(new Action("destroy", []), spec.destroy, this.options.length));
        }
        if (spec.mini !== undefined) {
            this.options.push(new RoomOption(new Action("mini", []), spec.mini, this.options.length));
        }
        if (spec.normal !== undefined) {
            this.options.push(new RoomOption(new Action("normal", []), spec.normal, this.options.length));
        }
    }

    draw(ctx, elapsed, startX, startY, startW, startH) {
        const oldFS = fontSize;
        const n = 3;
        if (this.id === "cp") {
            fontSize /= n;
        }
        const pos = new TextPosition(startX, startY, width, height);
        const words = Math.floor(wps * elapsed / 1000);
        this.desc.draw(ctx, pos, words);
        pos.newLine();
        lineHeight = fontSize;
        this.options.forEach((o, i) => {
            o.text.segs.forEach(s => s.style.fontSize = fontSize);
            o.draw(ctx, pos, words, i);
        });
        fontSize = oldFS;
        lineHeight = fontSize;
    }
}

// Kahoot?
class Game {
    reset() {
        this.rooms = {};
        roomSpecs.forEach(spec => {
            const r = new Room(spec);
            this.rooms[r.id] = r;
        });

        if (this.metaLevel === 1) {
        } else {
            this.rooms.techdepot = this.rooms.techdepot2;
        }

        this.mysteryTrailers = [];
        trailerSpecs.forEach(spec => {
            const r = new Room(spec);
            this.mysteryTrailers.push(r);
        });

        this.items = [];
        this.enterRoomId("start");
        this.dryebux = 0;
        this.eddecoin = 0;
        this.subgame = null;
        this.subgame2 = null;
        this.supergame = null;
        this.cracked = false;
        this.eyeOn = false;
        this.lastScene = null;
        this.enterScene(scene_intro);
        this.grimeOn = false;
        this.parkerFight = false;
        this.dryebukRooms = Object.values(this.rooms)
            .filter(r => r.dryebux !== undefined && r.id !== "techdepot3");
        this.hintIDs = this.dryebukRooms.map(r => r.id);
        this.maxBux = this.dryebukRooms.map(r => r.dryebux).reduce((a, b) => a + b);
        this.jetpack = false;
        this.f = origf;
    }

    constructor(metaLevel, canvas) {
        this.metaLevel = metaLevel;
        this.canvas = canvas;
        this.reset();
        this.grime = new Array(grimeWidth).fill(0);
    }

    enterRoom(r) {
        this.backRoom = this.room;
        this.room = r;
        this.roomEnterTime = Date.now();
    }

    enterRoomId(id) {
        if (id === "mysterytrailer") {
            this.enterRoom(this.mysteryTrailers[Math.floor(Math.random() * this.mysteryTrailers.length)]);
        } else {
            if (endIDs.includes(id)) {
                if (this.lastScene !== null) {
                    this.lastScene.unapply();
                    if (id !== "rankf") {
                        soundOwen.load();
                        soundOwen.play();
                    }
                }
                soundCrystal.load();
                soundCrystal.play();
            } else if (this.room !== undefined && this.room.id === "planeride") {
                this.enterScene(scene_main);
            } else if (id === "fnf3") {
                this.enterScene(scene_fourk);
            } else if (id === "intro3") {
                this.enterScene(scene_main);
                this.grimeOn = true;
            } else if (id === "underfourh") {
                this.enterScene(scene_underground);
            } else if (id === "underthreeh") {
                this.enterScene(scene_underground);
            } else if (id === "tunnel1") {
                this.enterScene(scene_tunnel);
            } else if (id === "auditoriumlobby") {
                this.enterScene(scene_musical);
            } else if (id === "eighth1") {
                this.enterScene(scene_musical);
            } else if (id === "807") {
                this.enterScene(scene_musical);
            } else if (id === "8072") {
                this.enterScene(scene_musical);
            } else if (id === "eighth2") {
                this.enterScene(scene_musical);
            } else if (id === "nineh1") {
                this.enterScene(scene_900);
            } else if (id === "avcloset") {
                this.enterScene(scene_closet);
            } else if (id === "tape1") {
                this.enterScene(scene_tape);
            } else if (id === "tapeend") {
                this.enterScene(scene_closet);
            } else if (id === "fivekstairs1a") {
                this.enterScene(scene_fivek);
            } else if (id === "fivekstairs2a") {
                this.enterScene(scene_fivek);
            } else if (id === "pool3") {
                this.enterScene(scene_pool);
            } else if (id === "poolend") {
                this.enterScene(scene_pool);
            } else if (id === "fivekelevatorc") {
                this.enterScene(scene_fivek);
            } else if (id === "sevenh1") {
                this.enterScene(scene_700);
            } else if (id === "sevenh3") {
                this.enterScene(scene_700);
            } else if (["fnf1",  "fourhstairs",  "fourhgym",  "threehstairs",  "manhole",  "officeoutside",  "patio3",  "patio4",  "cafelobby3",  "guardeddoor",  "mediaside",  "fivekback",  "fivekfront",  "middle2",  "sevenhgym", "mediaside", "sevenhgym", "fourhgym", "trailers7", "center2"].includes(id)) {
                this.enterScene(scene_main);
            } else if (["tennis", "trailers5", "trailers6", "gymoutside", "staffparking4", "staffparking1", "trailers1", "trailers2", "softball", "softball2"].includes(id)) {
                this.enterScene(scene_trailers);
            } else if (["gym", "gym2", "wrestling", "gymlobby", "gymexit"].includes(id)) {
                this.enterScene(scene_gym);
            }

            if (id === "tunnel4") {
                this.parkerFight = true;
            } else if (id === "tunnel2a") {
                this.parkerFight = false;
            }

            if (id in this.rooms) {
                this.enterRoom(this.rooms[id]);
            } else {
                alert("Not implemented: " + id);
            }

            if (this.backRoom !== undefined) {
                if (this.backRoom.id === "fant") {
                    this.eddecoin++;
                }
            }
        }
    }

    enterScene(s) {
        if (this.metaLevel === 1 && s !== this.lastScene) {
            if (this.lastScene !== null) {
                this.lastScene.unapply();
            }
            s.apply(this.canvas);
            this.lastScene = s;
        }
    }

    get elapsedTime() {
        return Date.now() - this.roomEnterTime;
    }

    draw(ctx, startX, startY, startW, startH) {
        if (this.supergame !== null && this.room.id === "techdepot5") {
            this.supergame.f = origf * (1 - .1 * Math.tanh(this.elapsedTime / 1000));
        }
        if (this.grimeOn) {
            let grimeOffset = 0;
            let sand = false;
            if (this.room.id.slice(0, 5) === "fourk") {
                grimeOffset = -.3;
            } else if (this.room.id.slice(0, 6) === "sludge") {
                grimeOffset = .5;
            } else if (this.room.id.slice(0, 7) === "trailer" || this.room.id === "laing") {
                grimeOffset = .2;
                sand = true;
            } else if (this.room.id.slice(0, 5) === "under") {
                grimeOffset = .2;
            } else if (this.room.id.slice(0, 4) === "sixh") {
                grimeOffset = .2;
            }

            if (this.room.id.slice(0, 4) === "rank") {
                this.grime.push(this.grime[grimeWidth - 1]);
            } else {
                this.grime.push(this.grime[grimeWidth - 1] + (Math.random() - .5 + grimeOffset));
            }
            this.grime.shift();

            const minGrime = Math.min(...this.grime);
            const maxGrime = Math.max(...this.grime);
            const grimeW = startW * .2;
            const grimeH = startH * .2;
            const grimeX = startX + startW - grimeW;
            const grimeY = startY + startH - grimeH - 2 * lineHeight;

            ctx.strokeStyle = sand ? "yellow" : "white";
            ctx.beginPath();
            ctx.moveTo(grimeX, grimeY + grimeH - (this.grime[0] - minGrime) * grimeH / (maxGrime - minGrime));
            this.grime.forEach((n, i) => {
                ctx.lineTo(grimeX + i * grimeW / grimeWidth, grimeY + grimeH - (n - minGrime) * grimeH / (maxGrime - minGrime));
            });
            ctx.stroke();

            const grimePos = new TextPosition(grimeX, grimeY - lineHeight, 10000, 10000);
            const grimeSeg = new TextSegment(sand ? "!5!SAND:" : "!4!GRIME:");
            grimeSeg.draw(ctx, grimePos);
        }

        this.room.draw(ctx, this.elapsedTime, startX, startY, startW, startH);

        let goal;

        if (this.metaLevel === 1 && !this.cracked) {
            if (["start", "leisure", "intro1", "intro2"].includes(this.room.id)) {
                goal = "!g!Get !g!to !g!School";
            } else if (this.room.id.slice(0, 6) === "sludge" && this.room.id !== "sludge1") {
                goal = "!g!Deliver !g!the !g!Sludge";
            } else if (this.room.id.slice(0, 8) === "busdrive") {
                goal = "!g!Recruit !g!students";
            } else if (["confrontthief", "poolpush"].includes(this.room.id)) {
                goal = "!g!Administer !g!Justice";
            } else if (this.room.id.slice(0, 4) === "rank") {
                goal = "!g!The !g!End";
            } else if (this.parkerFight) {
                goal = "!g!Defeat !g!Parker";
            } else {
                goal = "!g!Get !g!to !g!First !g!Block";
            }
        } else {
            goal = "!g!get !g!to !g!tech !g!depot";
        }

        const idPos = new TextPosition(startX + spaceSize, startY + startH - 2 * lineHeight, width, height, true);
        const idLine = new Line(goal + (" !id!" + this.room.id).repeat(10));
        idLine.draw(ctx, idPos);


        const dryebuxPos = new TextPosition(startX + spaceSize, startY + startH - 3 * lineHeight, width, height);
        let dryebuxLine;
        if (endIDs.includes(this.room.id) && this.room.id !== "rankf") {
            dryebuxLine = new Line("!d!Percent !d!Of !d!Maxbux: !d!" + (100 * this.dryebux / this.maxBux));
        } else if (this.dryebux > 0 || this.eddecoin > 0) {
            if (this.eddecoin > 0) {
                dryebuxLine = new Line("!d!youhave-->" + this.dryebux + " !ec!." + (this.eddecoin/1000000000).toFixed(9).slice(2) + " !d!₫");
            } else {
                dryebuxLine = new Line("!d!youhave-->" + this.dryebux + "₫");
            }
        }
        if (dryebuxLine !== undefined) {
            dryebuxLine.draw(ctx, dryebuxPos);
        }

        if (this.room.options.some(o => o.action.type === "dryebux")) {
            let i;
            if (this.room.dryebux === 3) {
                i = imageDryebux3;
            } else if (this.room.dryebux === 7) {
                i = imageDryebux7;
            } else if (this.room.dryebux === 11) {
                i = imageDryebux11;
            } else if (this.room.dryebux === 101) {
                i = imageDryebux101;
            } else {
                alert("bad denomination");
            }
            const m = 10;
            ctx.drawImage(i, width - i.width - m, startH - i.height - m);
        }
        const g = this.f + .01;
        if (this.subgame !== null) {
            fontSize *= this.f;
            lineHeight = fontSize;
            ctx.fillStyle = "black";
            ctx.fillRect(startX + startW * (1 - g), startY, startW * g, startH * g);
            this.subgame.draw(ctx, startX + startW * (1 - this.f), startY, startW * this.f, startH * this.f);
            fontSize /= this.f;
            lineHeight = fontSize;
            ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
            ctx.fillRect(startX + startW * (1 - g), startY, startW * g, startH * g);
        }

        if (this.eyeOn) {
            ctx.drawImage(imageEye, startX, startY, startW, startH);
            ctx.fillStyle = "white";
            ctx.font = "100px bold Libertinus Serif, times, serif";
            ctx.fillText("CLICK2VIEW", startX, startY + 100);
        }
    }

    performAction(a, i) {
        if (a.type === "room") {
            soundPhone.load();
            soundPhone.play();
            if (a.onetime) {
                this.room.options.splice(i, 1);
            }
            if (a.replaces) {
                a.replaces.forEach(rs => {
                    if (rs.length === 3) {
                        this.rooms[rs[0]].options.forEach(o => {
                            if (o.action.type === "room" && o.action.id === rs[1]) {
                                o.action.id = rs[2];
                            }
                        });
                    } else {
                        Object.values(this.rooms).forEach(r => {
                            r.options.forEach(o => {
                                if (o.action.id === rs[0]) {
                                    o.action.id = rs[1];
                                }
                            });
                        });
                    }
                });
            }
            this.enterRoomId(a.id);
        } else if (a.type === "dryebux") {
            soundCrystal.load();
            soundCrystal.play();
            this.dryebux += a.dryebux;
            this.room.options.splice(i, 1);
            this.room.dryebux = undefined;
        } else if (a.type === "hint") {
            soundCrystal.load();
            soundCrystal.play();
            const backId = this.room.id;
            this.room.options.splice(i, 1);
            if (this.hintIDs.length > 0) {
                this.enterRoom(new Room({
                    id: "bighint",
                    desc: "You are left with the million-dollar hint phrase: !d!" + this.hintIDs[Math.floor(Math.random() * this.hintIDs.length)],
                    options: [
                        [backId, "Continue"],
                    ],
                }));
            } else {
                this.enterRoom(new Room({
                    id: "nohint",
                    desc: "Your completionist attidute has left no further hints available. Time to get to class.",
                    options: [
                        [backId, "Continue"],
                    ],
                }));
            }
        } else if (a.type === "reset") {
            this.reset();
            soundOwen.pause();
        } else if (a.type === "plane") {
            soundPhone.load();
            soundPhone.play();
            if (this.dryebux < 1) {
                this.enterRoomId("jetpackbroke");
            } else if (this.dryebux < 7) {
                this.enterRoomId("jetpackchange");
            } else {
                this.enterRoomId("planeride");
                this.dryebux--;
            }
        } else if (a.type === "jetpack") {
            soundPhone.load();
            soundPhone.play();
            if (this.jetpack) {
                this.enterRoomId("jetpackpreown");
            } else if (this.dryebux < 1) {
                this.enterRoomId("jetpackbroke");
            } else if (this.dryebux < 7) {
                this.enterRoomId("jetpackchange");
            } else {
                this.enterRoomId("jetpackbuy");
                this.dryebux--;
                this.jetpack = true;
            }
        } else if (a.type === "resize") {
            soundPhone.load();
            soundPhone.play();
            this.supergame.subgame2 = this;
            this.supergame.subgame = null;
            this.supergame.enterRoomId("subgameresize");
        } else if (a.type === "resize2") {
            soundPhone.load();
            soundPhone.play();
            this.subgame = this.subgame2;
            this.subgame.enterRoomId("techdepot5");
        } else if (a.type === "back") {
            soundPhone.load();
            soundPhone.play();
            this.enterRoom(this.backRoom);
        } else if (a.type === "meta") {
            soundCrystal.load();
            soundCrystal.play();
            this.subgame = new Game(this.metaLevel + 1)
            this.subgame.supergame = this
        } else if (a.type === "destroy") {
            if (this.metaLevel === 1) {
                this.lastScene.unapply();
                document.querySelector("#blackout").style.display = "inline";
                setTimeout(() => {
                    window.location.href = "https://www.eastmeckeagle.com";
                }, 2000);
            } else {
                if (this.supergame.supergame === null) {
                    this.supergame.enterRoomId("gamecrash");
                    this.supergame.cracked = true;
                } else {
                    this.supergame.enterRoomId("gamecrash2");
                }
                this.supergame.subgame = null
            }
        } else if (a.type === "mini") {
            this.eyeOn = "./emrpg/crossword_mini.pdf";
        } else if (a.type === "normal") {
            this.eyeOn = "./emrpg/crossword_normal.pdf";
        } else if (a.type === "end") {
            if (this.dryebux === 0) {
                this.enterRoomId("rankd");
            } else if (this.dryebux < 30) {
                this.enterRoomId("rankc");
            } else if (this.dryebux < 100) {
                this.enterRoomId("rankb");
            } else if (this.dryebux < 400) {
                this.enterRoomId("ranka");
            } else {
                this.enterRoomId("ranks");
            }
        }
    }

    handleKey(k, e) {
        const realCooldown = (this.room.id === "jarman2") ? 3500 : cooldown;
        if (!this.eyeOn && !e.altKey && !e.ctrlKey && !e.metaKey) {
            if (this.subgame !== null) {
                if (this.subgame.subgame === null && k === "q") {
                    this.subgame = null;
                    if (this.supergame === null) {
                        this.enterRoomId("gamequit")
                    } else {
                        this.enterRoomId("gamequit3")
                    }
                } else {
                    this.subgame.handleKey(k, e);
                }
            } else if (this.jetpack && k === " ") {
                e.preventDefault();
                this.roomEnterTime -= 100000;
            } else if (this.elapsedTime > realCooldown && keys.includes(k)) {
                e.preventDefault();
                const n = keys.indexOf(k);
                if (n < this.room.options.length) {
                    this.performAction(this.room.options[n].action, n);
                }
            }
        }
    }

    handleClick() {
        if (this.subgame !== null) {
            if (this.subgame.eyeOn) {
                this.subgame = null;
                this.enterRoomId("gamequit2")
            } else {
                this.subgame.handleClick();
            }
        } else if (this.eyeOn) {
            openInNewTab(this.eyeOn);
            this.eyeOn = false;
        }
    }

    handleResize() {
        if (this.resizeTimeout !== undefined) {
            clearTimeout(this.resizeTimeout)
        }
        this.resizeTimeout = setTimeout(() => {
            if (this.room.id === "techdepot2a" && (window.innerWidth < this.lastWidth || window.innerHeight < this.lastHeight)) {
                this.enterRoomId("techdepot5");
            }
            this.lastWidth = window.innerWidth;
            this.lastHeight = window.innerHeight;
        }, 200);
    }
}

const trailerSpecs = [
    {
        id: "mysterytrailer",
        desc: "You are in a large !p!trailer. There are rocks of various sizes all throughout the room. Most of the rocks are about the size of your head, and you bet you could lift one but it would be difficult.",
        options: [
        ],
        back: "Exit the trailer and look for more rocks",
    },
    {
        id: "mysterytrailer",
        desc: "You are in a large !p!trailer. There are plastic models of a plethora of geometric shapes all around the room. The models are fairly large and are in all sorts of colors. In some places in the room, the shapes are stacked four feet high.",
        options: [
        ],
        back: "Exit the trailer and look for more shapes",
    },
    {
        id: "mysterytrailer",
        desc: "You are in a large !p!trailer. The air is humid and there are lamps producing what appears to be natural light. There are various ferns and succulents laid out systematically in order to allow someone to pass through. Based on the aggressive layout of the zen garden you do not want to be here when this secret garden’s owner returns.",
        options: [
        ],
        back: "Exit the trailer, carefully as to not set of a domino chain of cacti and herbs",
    },
    {
        id: "mysterytrailer",
        desc: "You are in a large !p!trailer. While you are looking around at the small model cars and road simulacra, trying to figure out what this trailer is used for, you begin to lose focus. You sit down in one of the chairs and try to collect yourself, but instead you end up dozing off into a deep sleep.",
        options: [
            ["driversed1", "Continue"],
        ],
    },
    {
        id: "mysterytrailer",
        desc: "You are in a luxurious trailer. There is a line of statuesque models maneuvering their way around the trailer. They are all wearing the new East Meck merch which will define prep for the upcoming year. There is some general chatter in the crowd as the show does not seem to be well received. It isn’t taking enough risks and slowly prep heads are realizing that they might have to go to other sources to find an outlet for their cherished aesthetic this year.",
        options: [
        ],
        back: "Exit the trailer, disgusted by the lack of flipping the script",
    },
    {
        id: "mysterytrailer",
        desc: "This trailer is mostly encased in amber. The trailer is preserved in time; it looks straight out of the year !t!2005. You see something written on a white board asking for donations to support victims of hurricane Katrina. You also see a poster for the upcoming movie !e!Star !e!Wars !e!III: !e!Revenge !e!of !e!the !e!Sith.",
        options: [
        ],
        back: "Exit quickly as to not taint the site",
    },
];

const roomSpecs = [
    {
        id: "rankf",
        desc: "THE END. Rank: !r!F. You have failed to make it to first block.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "rankd",
        desc: "THE END. Rank: !r!D. You haven’t a single !d!DryeBuk. Your classmates can't stop laughing at how pathetic you are. !c!Ms. !c!Kinney chuckles with them. You have failed East Meck.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "rankc",
        desc: "THE END. Rank: !r!C. You managed to gather a few !d!DryeBux. Your classmates aren't impressed but only make fun of you a little bit. They know you can do better.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "rankb",
        desc: "THE END. Rank: !r!B. You have a fairly large collection of !d!DryeBux. Your classmates are quite impressed. It is still possible to do better.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "ranka",
        desc: "THE END. Rank: !r!A. You have accrued a massive pile of !d!DryeBux. Your classmates are extremely impressed, but you can do even better.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "ranks",
        desc: "THE END. Rank: !r!S. You are rich. Your classmates overthrow !c!Ms. !c!Kinney and accept you as their new leader. You have won East Meck.",
        options: [
        ],
        reset: "Try the day again",
    },
    {
        id: "start",
        desc: "Another day at East Meck. (Use the number keys to make choices. You will fail if you do not read all text carefully.)",
        options: [
            ["intro1", "Continue"],
        ],
    },
    {
        id: "intro1",
        desc: "You wake up !t!fifteen !t!minutes later than you usually do. Luckily you walk to school, so you won't miss the bus.",
        options: [
            ["intro2", "Get ready quickly so as not to be late"],
            ["leisure", "Get ready at exactly the same speed you usually do"],
        ],
    },
    {
        id: "leisure",
        desc: "You take your sweet time getting ready. By the time you leave the house, it’s already !t!7:15. Failure.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "intro2",
        desc: "You rush to the door, and begin the tread to !p!School.",
        options: [
            ["intro3", "Continue"],
        ],
    },
    {
        id: "intro3",
        desc: "It’s !t!7:05. You arrive at the !p!Student !p!Parking !p!Lot. You need to choose what to take out of your bag as you pass through the scanner.",
        options: [
            ["scannerpass", "Take out your school-issued chromebook"],
            ["bagcheck", "Take out your !s!chemistry notebook"],
            ["scannerfail", "Take out nothing"],
        ],
    },
    {
        id: "scannerfail",
        desc: "Your failure to remove anything from your backpack leads to the manager of the scanner demanding you try again, this time with more effort.",
        options: [
            ["intro3", "Continue"],
        ],
    },
    {
        id: "bagcheck",
        desc: "A security guard in a deep blue uniform probes your backpack for any unauthorized equipment. None is found, and you are off the hook. For now. In any case, if you go directly to class, you will still be on time.",
        options: [
            ["middle", "Continue"],
        ],
    },
    {
        id: "scannerpass",
        desc: "You effortlessly glide through the security scanner, with no extraneous beeps emitted by the hi-tech obelisks. If you go directly to class, you will still be on time.",
        options: [
            ["middle", "Continue"],
        ],
    },
    {
        id: "middle",
        desc: "You stand at the !p!southern !p!crossroads. The !p!media !p!center, !p!student !p!parking !p!lot, and !p!600 !p!building are all within reach.",
        options: [
            ["schedule", "Check your schedule"],
            ["sixh1", "Enter the !p!Six !p!Hundred"],
            ["media", "Walk towards the !p!media !p!center"],
            ["studentlot", "Walk towards the !p!student !p!parking !p!lot"],
            ["middle2", "Walk north, towards the !p!Four !p!Hundred"],
            ["bench", "Walk to the bench by the !p!Media !p!Center"],
        ],
    },
    {
        id: "bench",
        desc: "You are at a small bench by the front of the !p!Media !p!Center. It’s been a long time since you were last here, and it makes you feel nostalgic.",
        options: [
            ["middle", "Go towards the !p!600"],
            ["media", "Go to the front of the !p!Media !p!Center"],
        ],
    },
    {
        id: "schedule",
        desc: "You check your schedule, and trace your finger down to the “1ST BLOCK” line. The entry reads: “ !p!4300 !p!HALL -- !c!Kinney ”",
        options: [
        ],
        back: "Continue",
    },
    {
        id: "middle2",
        desc: "You stand outside under a vast web of metallic structures. The !p!Four and !p!Seven !p!Hundreds are very close.",
        options: [
            ["fourh1", "Enter the !p!Four !p!Hundred"],
            ["sevenh1", "Enter the !p!Seven !p!Hundred"],
            ["foursevenpath", "Go north, left of the !p!400"],
            ["zigzag1", "Go north, right of the !p!400 and towards the !p!4000"],
            ["middle", "Go south, towards the !p!Security !p!Scanners"],
            ["middle3", "Go east, towards the !p!Courtyard"],
            ["media", "Walk to the !p!Media !p!Center"],
        ],
    },
    {
        id: "sevenh1",
        desc: "You stand on the more practical side of the !p!Seven !p!Hundred. You see students rushing into their engineering classrooms holding elaborate contraptions, and coming out with them turned even more elaborate.",
        options: [
            ["nguyen", "Enter !c!Nguyen’s !p!Room"],
            ["wojo", "Enter !c!Wojtalewski’s !p!Room"],
            ["shefte", "Enter !c!Shefte’s !p!Room"],
            ["autoshop", "Enter the !p!Autoshop"],
            ["sevenh2", "Turn the corner"],
            ["middle2", "Exit the building"],
        ],
    },
    {
        id: "nguyen",
        desc: "The room contains a !e!big !e!rotary !e!engine that spins faster and faster. Students are sitting in the safer, more structured half of the classroom as the other half is whipped into a frenzy by the roaring engine. As the engine spins faster and faster they look to you expectantly. “It’s completely out of control,” a student whispers to you, trying to not raise concern among students who haven’t put two and two together yet. If only you had some sort of long tool you could stick in to stop it.",
        options: [
            ['sevenh1', 'Search for a way to stop this out of control engine', ['nguyen','nguyen2']],
        ],
    },
    {
        id: "nguyen2",
        desc: "!e!The !e!Engine is still spinning out of control. You need to help these guys.",
        options: [
            ["sevenh1", "Search quickly before it is to late"],
        ],
    },
    {
        id: "nguyensuccess",
        desc: "You enter the room and a rotary engine is spinning way out of control of the students who sit in the more classroom structured section of the room hoping for some !e!gallant !e!hero will come save them. Thank goodness you can help. You run over to the more industrial side of the classroom and slam the hall pass deep inside the engine. It spudders and spurs for a moment and then it lets out a big final puff of steam which is quickly followed by a sigh of relief from the whole class. They give you !d!11 !d!DryeBux for your help.",
        options: [
            ['nguyensuccess2', 'Continue', ['nguyensuccess','nguyensuccess2']],
        ],
    },
    {
        id: "nguyensuccess2",
        desc: "You are in !c!Mr. !c!Nguyen’s room. The students are tranquil due to the calm engine in front of you that is spinning at a rate that is by all accounts completely reasonable. Your !d!DryeBux are waiting for you.",
        options: [
            ["sevenh1", "Exit to the hall"],
        ],
        dryebux: 11,
    },
    {
        id: "shefte",
        desc: "As you enter the room you see various !e!car !e!parts laid about the room. You assume that most likely no one has ever known what those !e!car !e!parts do and they serve an almost entirely aesthetic purpose. The chairs are higher tech then you thought were allowed and you assume the !c!Reclining !c!26 would be impressed.",
        options: [
            ["sevenh1", "Head back into hallway"],
            ["autoshop", "Enter the !s!Automotive !p!Shop"],
            ["shefteoffice", "Enter !c!Mr. !c!Shefte’s !p!Office"],
        ],
    },
    {
        id: "autoshop",
        desc: "As you enter the !p!Autoshop you are bombarded with a mixture of various different fluids. Hot and cold, corrosive and soothing fluids all spraying over each other at once. You find the source as you see a line up of four students each with socket wrench in hand, all attempting to remove a sequence of variously sized bolts. When one of them messes up they are sprayed with the fluid hose, although due to the size of the room, and more so the extreme pressure of the hose, when one thing is sprayed everything is sprayed.",
        options: [
            ["autogame", "Attempt to get in on the game", true],
            ["shefte", "Exit into !c!Mr. !c!Shefte’s !p!room"],
            ["sevenh1", "Exit into the hallway"],
        ],
    },
    {
        id: "autogame",
        desc: "You grab a wrench and slide next to one of the students for the start of the next round. !c!Shefte raises the green flag and you are off. You have a strong start but the competitors to your left and right are cranking as hard as they can and you can feel yourself falling behind.",
        options: [
            ["autogamewin", "Push yourself to you absolute physical limit, risking injury"],
            ["autogameloss", "Dial it back and hope to mount a comeback once they run out of steam"],
        ],
    },
    {
        id: "autogameloss",
        desc: "You hold back a little hoping to be able to over take at the end when your competitors are out of energy but you drop too far and end up stopping all together so by the time you get started again they have already full removed the bolts from the hunk of metal and reapplied them before you even got one off. You are embarrassed as it looks like you just froze up. !c!Mr. !c!Shefte aims the hose at you.",
        options: [
            ["sevenh1", "Get into the hallway before he can fire it"],
        ],
    },
    {
        id: "autogamewin",
        desc: "You start cranking so hard that your hand and wrench blend into one big motion blur. The bolts practically unscrew themselves and you can quickly get them back on, catching them before they fly off with the amount of speed on them. Your elbow starts to give but you push through. Even with your effort you still only beat the runner up by mere !t!milliseconds, leading to great debate over potential scandals with the competition. While the students are yelling at each other, !c!Shefte hands you your victory prize, a !d!Drye !d!Buk !d!Bill.",
        options: [
            ['autoshop2', 'Continue', ['autoshop','autoshop2']],
        ],
    },
    {
        id: "autoshop2",
        desc: "!c!Shefte is very impressed with your achievement. Your !d!DryeBux are waiting for you. Other students are still playing the game.",
        options: [
            ["shefte", "Exit into !c!Mr. !c!Shefte’s !p!room"],
            ["sevenh1", "Exit into the hallway"],
        ],
        dryebux: 7,
    },
    {
        id: "shefteoffice",
        desc: "You feel a racking guilt just being in here. The room feels deeply personal as if it is where someone eats an absurdly cost effective lunch everyday. You idly glance at his monitor. At first you think it is just a surveillance feed of the !s!Automotive !p!shop used to create the panopticon required to keep that many mechanics in line but you realize he actually has feeds of many other critical areas within the school.",
        options: [
            ["shefte", "Exit the office"],
            ["camerafeed", "Look at some of the cameras"],
        ],
    },
    {
        id: "camerafeed",
        desc: "The Cameras have maybe 40 different angles on the !p!drum !p!shed near the side of the !p!library as if it is crucial to some elaborate plot. He also has a couple different cameras on near !c!Mr. !c!Watt’s !p!room in the !p!600 !p!hall though these are probably justified as !c!Watts only grows more wealthy and therefore directly more powerful. ",
        options: [
            ["shefteoffice", "Back away from the feed before you become too absorbed in other people’s East Meck narratives instead of your own"],
        ],
    },
    {
        id: "wojo",
        desc: "You are in the !s!physics !p!classroom. The students have set up some kind of giant Rube Goldberg machine that takes up most of the room. They are clamoring about the contraption, cheering on the small polyhedra that are being shot every whichaway by a tapestry of springs and solenoids.",
        options: [
            ["touchmachine", "Touch the machine"],
            ["wojocloset", "Go into the closet behind the machine"],
            ["sevenh1", "Exit to the hall"],
        ],
    },
    {
        id: "wojocloset",
        desc: "You are in !c!Mr. !c!Wojo’s closet. There is a ladder leading up to the inside of the ceiling.",
        options: [
            ["wojoceiling", "Go up the ladder"],
            ["wojo", "Leave"],
        ],
    },
    {
        id: "wojoceiling",
        desc: "You are in the ceiling above !c!Mr. !c!Wojo’s closet. It is dark enough above these floor tiles that the only things you can see are the hyper-reflective eyes of rats a few meters away and the distinctive glimmer of a !d!DryeBuk !d!Bill. There is a ladder going down to the ground floor.",
        options: [
            ["wojocloset", "Climb down"],
        ],
        dryebux: 3,
    },
    {
        id: "touchmachine",
        desc: "You touch a small piece of the large blue plastic structure. When your finger makes contact, the plastic around it fizzes and pops and seems to boil off into thin air, as if made out of some kind of pure evil. The whole structure collapses as a result of the dense dependency network of the machine. You have been banned from this classroom.",
        options: [
            ['sevenh1', 'Continue in shame', ['wojo','ban']],
        ],
    },
    {
        id: "ban",
        desc: "You have been banned from this room forever.",
        options: [
        ],
        back: "Continue",
    },
    {
        id: "sevenh2",
        desc: "You stand near the corner of the right angle that is the !p!700 !p!Hundred. You can feel the collision of theory and practice occurring around the nearby !s!environmental !s!science rooms.",
        options: [
            ["cunningham", "Enter !c!Cunningham’s !p!Room"],
            ["sizeland", "Enter !c!Sizeland’s !p!Room"],
            ["sevenh3", "Walk down the hall, towards the !p!Gym"],
            ["sevenh1", "Turn the corner"],
            ["sevenhstickers", "Inspect stickers by the bathroom"],
        ],
    },
    {
        id: "sizeland",
        desc: "You are in !c!Mr. !c!Sizeland’s room. Out of the three sinks in the room, two of them are filled with brine, while the other one is more brackish. Your eyes sting due to the abundance of salt particles in the air.",
        options: [
            ["sevenh2", "Exit to the hall"],
        ],
    },
    {
        id: "cunningham",
        desc: "You knock on the door. !c!Ms. !c!Cunningham responds “who’s there?” Clearly she will only let you in if you know the punchline to some kind of !s!environmental !s!science related joke. Such a joke would be impossible to guess but would probably be painted on one of her !e!ceiling !e!tiles. Maybe you could see it through some other direction.",
        options: [
            ['sevenh2', 'Exit to the hall', ['staffparking1','staffparking1a']],
        ],
    },
    {
        id: "cunningham2",
        desc: "You knock on the door. !c!Ms. !c!Cunningham responds “who’s there?” Clearly she will only let you in if you know the punchline to some kind of !s!environmental !s!science related joke. Such a joke would be impossible to guess but would probably be painted on one of her !e!ceiling !e!tiles.",
        options: [
            ["cunninghamenter", "“Photochemical Smog”"],
            ["sevenh2", "Exit to the hall"],
        ],
    },
    {
        id: "cunninghamenter",
        desc: "!c!Ms. !c!Cunningham opens the door. She is delighted about your extensive knowledge of !c!environmental !c!science jokes.",
        options: [
            ['cunningham3', 'Continue', ['cunningham2','cunningham3']],
        ],
    },
    {
        id: "cunningham3",
        desc: "You are in !c!Ms. !c!Cunningham’s room. You spot some !d!DryeBux hidden behind a pile of AP Exam practice textbooks.",
        options: [
            ["sevenh2", "Exit to the hall"],
        ],
        dryebux: 7,
    },
    {
        id: "sevenhstickers",
        desc: "On the boundary between the two categories of bathroom, there is an approximately one inch protrusion from the wall in an undecipherable shape. Upon further inspection, the protrusion is composed of hundreds upon hundreds of stickers layered upon one another, in an alternating pattern between two news organizations.",
        options: [
            ["sevenh2", "Continue"],
        ],
    },
    {
        id: "sevenh3",
        desc: "You stand on the more theory-oriented side of the !p!Seven !p!Hundred. You see students with pencils behind their ears walking between chemistry rooms and staring at papers with complicated diagrams on them. You remember the Zeagle poster here used to include a !d!101 !d!DryeBuk !d!Bill, which you would kill for right now. Unfortunately, someone got to it before you.",
        options: [
            ["mrgrube", "Enter !c!Grube’s !p!Room"],
            ["burbs", "Enter !c!Burbules’ !p!Room"],
            ["graham", "Enter !c!Graham’s !p!Room"],
            ["chemicalstorage", "Enter the !p!Chemical !p!Storage !p!Room"],
            ["sevenh2", "Continue down the hall, towards the !p!Media !p!Center"],
            ["sevenhgym", "Exit towards the !p!Gym"],
        ],
    },
    {
        id: "burbs",
        desc: "You enter !c!Mr. !c!Burbs’s !p!classroom. It has been fitted to embrace a new warehouse-punk aesthetic with high rafters and a sheet metal exterior. There is a large mass of students all bumping into each other repeatedly. They are all moshing to guerilla drumming and unpolished bass guitar and you can see the band as they set themselves apart by not using a stage or mics. The students seem to be loving it. You don’t feel a strong desire to join in but you are happy to watch.",
        options: [
            ["sevenh3", "Exit"],
        ],
    },
    {
        id: "chemicalstorage",
        desc: "You are in the unexpectedly large !p!Chemical !p!Storage !p!Room. There is a huge quantity of unopened bags of M&M’s, which all seem to be part of some unwanted kit that keeps arriving. The M&M’s are slowly consuming all of the space in the room, and the dangerous chemicals are spilling out into the hall as a result. The M&M’s are rotting.",
        options: [
            ["sevenh3", "Exit to the hall"],
        ],
    },
    {
        id: "mrgrube",
        desc: "!c!Mr. !c!Grube is methodically asking the same question to every student in his class. Nobody has a clue but !c!Grube continues, becoming more and more disappointed in your generation with each wrong answer.",
        options: [
            ["chemquestion", "Jump in with an answer", true],
            ["sevenh3", "Exit to the hall"],
        ],
    },
    {
        id: "chemquestion",
        desc: "“How do we differentiate between reflux and distillation with regards to what process creates what product?” Once you are sure that !c!Grube’s drill sergeant-esque approach will be quickly foiled by one hyper intelligent student and it is not a snare that he has set in order to attract some unsuspecting lamb of a student, you start looking for your window. He reaches a particular boneheadedly clueless student, and you swing in the door and answer: “duration of heating”. He explains that while partially correct it is not what he is looking for and you are made to feel like a fool.",
        options: [
            ["coolstudent", "Attempt to play it off as a joke"],
            ["whipper", "Attempt to beg for forgiveness"],
            ["sevenh3", "Run away and hope everyone forgets about the whole thing"],
        ],
    },
    {
        id: "coolstudent",
        desc: "You start chuckling to yourself and then make it louder and louder, but by this point he has already moved past to more whippering students. He attempts to ignore your laughter but eventually your laughter makes it impossible for him to chew through the rest of the students and stops to look dead at you. “Oh you thought I was being serious,” you say silently praying that your madcan scheme will work. ",
        options: [
            ["coolstudent2", "Continue"],
        ],
    },
    {
        id: "coolstudent2",
        desc: "!c!Grube contorts his eyebrows in an attempt to gain control of the situation but the class has already escaped out from under him. They have wanted to speak !e!truth !e!to !e!power but needed you to give them the words. As they all say what they have previously just said to friends who don’t have his class. In the frenzy you manage to slip away.",
        options: [
            ['sevenh3', 'Continue', ['mrgrube','mrgrubefrenzy']],
        ],
    },
    {
        id: "mrgrubefrenzy",
        desc: "Chem students are still airing grievances.",
        options: [
            ["sevenh3", "Walk away"],
        ],
    },
    {
        id: "whipper",
        desc: "You apologize profusely. Although !c!Grube really does feel for you, it would be a violation of the tenets of !e!Swagger !e!Nihilism for him to oblige in your request to absolve you of your failure and nullify the incident. The situation will make it to your permanent record by noon.",
        options: [
            ["sevenh3", "Continue"],
        ],
    },
    {
        id: "graham",
        desc: "You stand in !c!Ms. !c!Graham’s room. You are entranced by the orderliness of the “Quilt periodic table” but worried that chemistry students might confuse it for the real thing.",
        options: [
            ["sevenh3", "Exit to the hall"],
            ["scioly", "Look at the !e!Science !e!Olympiad boxes in the back"],
        ],
    },
    {
        id: "scioly",
        desc: "In one of the boxes, there is a small device with wheels that looks like it was improvised on the spot at a competition. Under the device there is a !d!DryeBuk.",
        options: [
            ["graham", "Continue"],
        ],
        dryebux: 3,
    },
    {
        id: "sevenhgym",
        desc: "You stand in a particularly woodsy region of the East Meck Outdoors. The !p!Seven !p!Hundred is accessible, and the !p!Gym is near. You look at the wooden mesh scaffolding under the trailer in front of you, and wonder if you could fit in it.",
        options: [
            ["sevenh3", "Enter the !p!700"],
            ["wrestling", "Enter the !s!Wrestling !p!Room"],
            ["pointy", "Go towards the !p!400 !p!Split"],
            ["staffparking4", "Go towards the trailers"],
            ["gymoutside", "Walk to the !p!Gym entrance"],
            ["trailerunder", "Go under the trailer"],
        ],
    },
    {
        id: "trailerunder",
        desc: "You get down on your belly and see an opossum looking back at you. You are making eye contact, both afraid to move closer but with no desire to back away. There are thousands of different ways to interpret this omen but you chose to take it as a good sign.",
        options: [
            ["sevenhgym", "Stand back up"],
        ],
    },
    {
        id: "wrestling",
        desc: "You are in the dingy !s!Wrestling !p!Room. There is one dim, flickering light on the ceiling. You see a group of students in some kind of committee. They are sitting around a large table and are discussing what new rules and regulations to implement for this year’s upcoming Cookout Fight Night season. They offer you !d!a !d!bribe to keep silent about the operation.",
        options: [
            ["gym", "Enter the !p!Gym"],
            ["gymlobby", "Go to the !p!Gym !p!Lobby"],
            ["sevenhgym", "Exit to the outside"],
        ],
        dryebux: 7,
    },
    {
        id: "foursevenpath",
        desc: "You walk down an excessively long straightaway of the East Meck circuit. You admire the plants in variously-shaped pots that are displayed in the Earth Science windows along the West side of the !p!Upper !p!Four !p!Hundred.",
        options: [
            ["schedule", "Check your schedule"],
            ["concreterectangle", "Visit the elusive !p!Brick !p!Rectangle in the corner of the !p!700"],
            ["middle2", "Walk towards the !p!Student !p!Parking !p!Lot"],
            ["pointy", "Walk towards the !p!400 !p!Split"],
        ],
    },
    {
        id: "concreterectangle",
        desc: "You stand on one of the more bizarre regions of the East Meck Outdoors: A large brick rectangle, engraved with Meck symbolics and decorated with a two by three array of benches. You have heard rumors of this artifact resulting from some “outdoor classroom project”, but this myth remains unconfirmed. You notice some !d!DryeBux under one of the benches.",
        options: [
            ["foursevenpath", "Leave this confusing spot"],
        ],
        dryebux: 3,
    },
    {
        id: "pointy",
        desc: "You stand below what may very well be East Meck’s !e!Sharpest !e!Angle. This angle is formed by the steel rooves that characterize the grimier side of East, and represents a particularly important intersection.",
        options: [
            ["sevenhgym", "Follow the shinier canopy towards the !p!Staff !p!Parking !p!Lot"],
            ["foursevenpath", "Walk towards the !p!Student one instead"],
            ["split", "Follow the grimier canopy into the !p!400 !p!Split"],
            ["fourhgym", "Follow the grimier canopy the other way, towards the !p!Gym"],
            ["fourhstairs", "Go down the mysterious stairs next to the !p!400 building"],
        ],
    },
    {
        id: "fourhgym",
        desc: "You stand in the complicated region between the !p!400 and the !p!Gym. The complexity of the metal structures above you is rivalled only by that of the rolling hill system below you. There are several external !p!400 !p!building classrooms accessible from here.",
        options: [
            ["msk", "Enter !c!Kolodziey’s !p!Room"],
            ["trailers7", "Go towards the !p!Four and !p!Five !p!Thousands"],
            ["pointy", "Go towards the !p!700"],
            ["trailers6", "Dive deep into !p!Trailer !p!World"],
            ["underfourh", "Enter the mysterious door under the !p!400"],
            ["gymlobby", "Enter the !p!Gym !p!Lobby"],
        ],
    },
    {
        id: "gymlobby",
        desc: "You are in the !p!Gym !p!Lobby. There are blue and yellow paint splatters coating the walls of one-way glass and chain-linked mesh. There are baskets full of tennis balls in each of the four corners of the room.",
        options: [
            ["wrestling", "Go through the door to the !p!Wrestling !p!Room"],
            ["gym", "Enter the !p!Gym"],
            ["fourhgym", "Exit to the outside"],
        ],
    },
    {
        id: "gym",
        desc: "You are in the !p!Gym. A few students are setting up small nets around the gym for what seems to be a multitude of tennis adjacent games. The bleachers are compressed on the wall.",
        options: [
            ["gymlobby", "Go into the lobby by the !p!Girl’s !p!Locker !p!Room"],
            ["wrestling", "Enter the !p!Wrestling !p!Room through the door further along that same wall"],
            ["gymexit", "Go into the lobby by the !p!Boy’s !p!Locker !p!Room"],
            ["gymoutside", "Exit the Gym through the door further along that same wall"],
            ["gymbleachers1", "Press the button to expand the bleachers"],
        ],
    },
    {
        id: "gym2",
        desc: "You are in the !p!Gym. A few students are setting up small nets around the gym for what seems to be a multitude of tennis adjacent games. The bleachers are expanded and fill a large part of the room.",
        options: [
            ["gymlobby", "Go into the lobby by the !p!Girl’s !p!Locker !p!Room"],
            ["wrestling", "Enter the !p!Wrestling !p!Room through the door further along that same wall"],
            ["gymexit", "Go into the lobby by the !p!Boy’s !p!Locker !p!Room"],
            ["gymoutside", "Exit the Gym through the door further along that same wall"],
            ["gymbleachers2", "Climb around on the bleachers"],
        ],
    },
    {
        id: "gymbleachers1",
        desc: "You reach for the beige control panel, and firmly depress the small circular button. A loud alarm starts blaring, ensuring that no oblivious students would be unjustly shoved by the mechanism. The alarm is silenced and the machine comes to a whirring halt. The bleachers now fill approximately one sixth of the room.",
        options: [
            ['gym2', 'Continue', ['gym','gym2']],
        ],
    },
    {
        id: "gymbleachers2",
        desc: "You move to inspect the bleachers. You romp around for a while, and you take mental notes of all the intricate nooks and crannies. Under one of the benches, you spot a few !d!DryeBux.",
        options: [
            ["gym2", "Go back down to the floor"],
        ],
        dryebux: 7,
    },
    {
        id: "gymexit",
        desc: "You are in a small lobby outside the !p!Gym, on the side farther from the rest of the school. The eagle mural on the wall is particularly threatening, and the sign above the door reminds you how incredibly lucky you are to be in the company of these incredible athletes.",
        options: [
            ["gym", "Enter the !p!Gym"],
            ["weightlifting", "Enter the !p!Weightlifting !p!Dojo"],
            ["gymoutside", "Leave to the outside"],
        ],
    },
    {
        id: "weightlifting",
        desc: "You are in the large !p!Weightlifting !p!Room. Mangled hunks of rebar fill the room and arrange themselves into shapes that make sense to an extent but clearly the patterns have been extended past the limit of reasonability. You see yourself in the large rectangular mirror on the wall and think about how much better you could look if you took this class. ",
        options: [
            ["gymexit", "Leave, reflective of what could have been and what could still be"],
        ],
    },
    {
        id: "gymoutside",
        desc: "You are in a small grassy area near the !p!Gym. The large oak trees make you feel nostalgic, and you make a few circles around the lot.",
        options: [
            ["gym", "Enter directly into the !p!Gym"],
            ["gymexit", "Enter the small hall outside the !p!Gym"],
            ["gymlot1", "Go up to the !p!Gym !p!Parking !p!Lot"],
            ["staffparking4", "Go down to the !p!Staff !p!Parking !p!Lot"],
            ["staffparking5", "Go to the centerpoint between the lots"],
            ["sevenhgym", "Go towards the !p!700"],
            ["trailers8", "Go up to a nearby group of !p!Trailers"],
        ],
    },
    {
        id: "msk",
        desc: "You are in !c!Ms. !c!Kolodziey’s room. The students are taking part in an elaborate dance mirroring the action of various enzymes upon DNA. The dance is set to the tune of a song based around the current day of the week.",
        options: [
            ["fourhgym", "Exit to the outside"],
        ],
    },
    {
        id: "fourhstairs",
        desc: "You are in a small staircase outside a corner of the !p!Upper !p!400. The staircase connects to a mysterious blue door underneath the building.",
        options: [
            ["underfourh", "Go through the door"],
            ["pointy", "Go up the stairs to the outside"],
        ],
    },
    {
        id: "underfourh",
        desc: "You are underground in a dark brick room. One bright light cuts through the darkness but only to a certain extent. There are several piles of half-ground up leaves and other types of grime.  There are small weights of various lengths strewn about the corner of the floor. There are two old doors to the outside and a newer-looking door on the opposite side.",
        options: [
            ["fourhstairs", "Go through the left door to the outside"],
            ["fourhgym", "Go through the right door to the outside"],
            ["underthreeh", "Go through the other door"],
        ],
    },
    {
        id: "media",
        desc: "You stand under the steel canopy around the entrance to the !p!Media !p!Center. The media center is closed. You know this because of a big, clearly hastily-written poster on the door explaining the presence of “Work-keys” testing inside. Despite the claim, you see what looks to be a fashion show occurring inside. It seems the only style fit for this contestant will be absolute maximalism.",
        options: [
            ["middle", "Walk toward the !p!southern !p!security !p!scanners"],
            ["middle2", "Walk north, towards the !p!Four !p!Hundred"],
            ["mediaside", "Walk around to the side of the !p!Media !p!Center"],
            ["bench", "Walk to the bench by the side of the building"],
        ],
    },
    {
        id: "mediaside",
        desc: "You are on the outside of the !p!media !p!center. A large puff of dust is blown into your face causing you to cough. You try not to let it bother you. You see a striped door and two heavily armed librarians. You also see a lonely !p!drum !p!shack though it seems incredibly locked.",
        options: [
            ["media", "Walk back in front of the !p!media center"],
            ["drums", "Walk to the !p!drum !p!shack"],
            ["guardeddoor", "Try to sneak past the library guards"],
            ["automotive", "Gaze at hot rods in !s!automotive !p!shop"],
            ["staffparking1", "Walk into the !p!staff !p!parking !p!lot"],
            ["sevenha1", "Enter the obscure !p!700A !p!Building"],
        ],
    },
    {
        id: "sevenha1",
        desc: "You are in the esoteric !p!700A !p!Building. The room is fairly disheveled except for a futuristic and completely pristine water fountain in the far corner. There are stairs heading upwards.",
        options: [
            ["sevenha2", "Go up the stairs"],
            ["mediaside", "Exit the building"],
        ],
    },
    {
        id: "sevenha2",
        desc: "You are upstairs in the esoteric !p!700A !p!Building. There is a huge pile of power tools here, completely disorganized, most of which haven’t seen use for at least thirty years. Wedged under a rotary saw, you see some !d!DryeBux.",
        options: [
            ["sevenha1", "Go down the stairs"],
        ],
        dryebux: 3,
    },
    {
        id: "staffparking1",
        desc: "You are in the !p!staff !p!parking !p!lot, near to the !p!700. You are right next to the !s!Automotive !p!shop, and also some !p!trailers.",
        options: [
            ["automotive", "Look at sick rides in the !s!Automotive !p!Shop"],
            ["trailers1", "Go to the !p!trailers"],
            ["mediaside", "Go to the side of the !p!Media !p!Center"],
            ["staffparking2", "Go further away from the school"],
        ],
    },
    {
        id: "staffparking1a",
        desc: "You are in the !p!staff !p!parking !p!lot, near to the !p!700. You are right next to the !s!Automotive !p!shop, and also some !p!trailers. You can see clearly through !c!Ms. !c!Cunningham’s window.",
        options: [
            ["automotive", "Look at sick rides in the !s!Automotive !p!Shop"],
            ["trailers1", "Go to the !p!trailers"],
            ["mediaside", "Go to the side of the !p!Media !p!Center"],
            ["staffparking2", "Go further away from the school"],
            ["cunninghamwindow", "Look through !c!Ms. !c!Cunningham’s window"],
        ],
    },
    {
        id: "cunninghamwindow",
        desc: "Inside the room, you see a dark ceiling tile with a joke printed. It reads “NOx, NOx. Who’s there? !e!Photochemical !e!smog.”",
        options: [
            ['staffparking1a', 'Continue', ['cunningham','cunningham2']],
        ],
    },
    {
        id: "trailers1",
        desc: "You are on a rickety wooden walkway surrounded by aluminum !p!trailers. You see a student standing outside of the !s!music !s!theory !p!trailer motionless.",
        options: [
            ["askmusicstudent", "Ask the student what their whole deal is", true],
            ["musictheory", "Enter the !c!Music !c!Theory !p!Trailer"],
            ["bathroomtrailer1", "Enter the !p!bathroom !p!trailer"],
            ["trailers2", "Continue down the walkway"],
            ["staffparking1", "Step down to the !p!Staff !p!Parking !p!Lot"],
            ["softball", "Go down to the !p!Softball !p!Field"],
        ],
    },
    {
        id: "askmusicstudent",
        desc: "The student explains that they were assigned the role of standing outside in the freezing cold and warning people of the slipping hazard associated with the iced-over wooden walkway. You see them warn a nearby classmate, who says “OK” and promptly slips and falls anyways.",
        options: [
            ["trailers1", "Continue"],
        ],
    },
    {
        id: "bathroomtrailer1",
        desc: "In this most lonely of East Meck bathrooms, there is almost nothing of importance to mention. However, out of the corner of your eye, you spot a !d!DryeBuk on top of the soap dispenser.",
        options: [
            ["trailers1", "Leave"],
        ],
        dryebux: 3,
    },
    {
        id: "musictheory",
        desc: "You are in the !s!Music !s!Theory !p!Trailer. The students are six pages into !c!Mr. !c!Moreau’s deep analysis of !c!Drye’s !e!rap !e!album.",
        options: [
            ["trailers1", "Leave"],
        ],
    },
    {
        id: "trailers2",
        desc: "You stand on a wooden walkway in the mutual corner shared by four !p!trailer !p!classrooms.",
        options: [
            ["mysterytrailer", "Trailer M191"],
            ["mysterytrailer", "Trailer M61"],
            ["mysterytrailer", "Trailer M78"],
            ["mysterytrailer", "Trailer M212"],
            ["trailers1", "Continue down the walkway, towards the !p!Media !p!Center"],
            ["staffparking2", "Go down to the staff parking lot"],
            ["softball", "Go down to the !p!Softball !p!Field"],
        ],
    },
    {
        id: "staffparking2",
        desc: "You are in the !p!staff !p!parking !p!lot. Two teachers are yelling at each other from their cars because one of them parked in an unorthodox manner. There are !p!trailers near here.",
        options: [
            ["staffparking1", "Follow the incoming teachers towards the school"],
            ["staffparking3", "Walk to the corner of the road"],
            ["staffparking5", "Go towards the !p!Gym !p!Parking !p!Lot"],
            ["trailers2", "Go up to the !p!trailers"],
        ],
    },
    {
        id: "staffparking3",
        desc: "You are in the far corner of the !p!staff !p!parking !p!lot. It seems almost impossible to get to your first block at this point, but you can't give up now. There are three empty activity buses parked in the dirt. There is a !c!shady-looking !c!teacher leaning on one of the buses.",
        options: [
            ["staffparking2", "Walk towards the school"],
            ["staffparking5", "Go towards the !p!Gym !p!Parking !p!Lot"],
            ["softball", "Go down to the !p!Softball !p!Field"],
            ["shadyteacher", "Talk to !c!shady !c!teacher"],
        ],
    },
    {
        id: "staffparking5",
        desc: "You stand at the center between the !p!general !p!staff and more specialized !p!gym !p!parking !p!lots. The centerpiece of the grand dining table that is East Meck’s transportation world.",
        options: [
            ["staffparking3", "Go to the far corner of the lot"],
            ["staffparking2", "Go towards the !p!southern !p!trailers"],
            ["staffparking4", "Go towards the !p!700"],
            ["gymlot1", "Go up to the !p!Gym !p!Parking !p!Lot"],
            ["gymoutside", "Go towards the !p!Gym"],
        ],
    },
    {
        id: "staffparking4",
        desc: "You stand at one of the several corners of the !p!Staff !p!Parking !p!Lot. There are two trailers separating you from the !p!Seven !p!Hundred.",
        options: [
            ["mysterytrailer", "Trailer M444"],
            ["mysterytrailer", "Trailer M443"],
            ["gymoutside", "Go towards the !p!Gym"],
            ["sevenhgym", "Go between !p!700 and the !p!Gym"],
            ["staffparking5", "Go away from civilization"],
            ["staffparking1", "Go towards the !p!Student !p!Parking !p!Lot"],
        ],
    },
    {
        id: "gymlot1",
        desc: "You stand in the highly restricted !p!Gym !p!Parking !p!Lot. You ignore the trespassing signs, as those are presumably only directed towards people with cars and such.",
        options: [
            ["gymlot2", "Continue deeper into the lot, towards the !p!Baseball !p!Field"],
            ["gymoutside", "Walk to the outside of the !p!Gym"],
            ["staffparking5", "Go towards the !p!general !p!Staff !p!Parking !p!Lot"],
            ["trailers8", "Go up to a nearby group of trailers"],
        ],
    },
    {
        id: "gymlot2",
        desc: "You are deep into the !p!Gym !p!Parking !p!Lot. You feel indecisive about your next move, but East Meck comes to the rescue once again with convenient golden Eagle claws painted on the ground giving you directions.",
        options: [
            ["bleachers1", "Follow the !c!Eagle’s advice and go to the !p!Bleachers"],
            ["trailers3", "Ignore the claws and walk towards the middle of the school"],
            ["gymlot1", "Actively work against the will of the !c!Eagle and go south"],
            ["baseball", "Make a crazy move and go to the !p!Baseball !p!Field"],
        ],
    },
    {
        id: "bleachers1",
        desc: "You are in the set of bleachers nearer to the school. The twangy metallic sound of your footsteps on the steel sitting-beams jostles your inner ear in an unexpected and not wholly appreciated manner.",
        options: [
            ["track1", "Go down to the !p!Track"],
            ["gymlot2", "Go down to the !p!Gym !p!Parking !p!Lot"],
        ],
    },
    {
        id: "track1",
        desc: "You are on the !p!Track. Specifically, the long straightaway on the side nearest to !p!School.",
        options: [
            ["track2", "Jog towards the !p!Baseball !p!Field"],
            ["track4", "Jog towards the !p!Softball !p!Field"],
            ["football", "Go down to the !p!Football !p!Field"],
            ["bleachers1", "Go up to the !p!Bleachers"],
        ],
    },
    {
        id: "track2",
        desc: "You are on the !p!Track. Specifically, the sharp turn on the side closest to the !p!Baseball !p!Field.",
        options: [
            ["track1", "Jog towards !p!School"],
            ["track3", "Jog away from !p!School"],
            ["football", "Go down to the !p!Football !p!Field"],
            ["baseball", "Run away to the !p!Baseball !p!Field"],
        ],
    },
    {
        id: "track4",
        desc: "You are on the !p!Track. Specifically, the sharp turn on the side closest to the !p!Softball !p!Field. You see a small rat scurry under the fence to the nearby neighborhood.",
        options: [
            ["track1", "Jog towards !p!School"],
            ["track3", "Jog away from !p!School"],
            ["football", "Go down to the !p!Football !p!Field"],
            ["practicefield", "Go down to the !p!Practice !p!Field"],
        ],
    },
    {
        id: "track3",
        desc: "You are on the !p!Track. Specifically, the long straightaway on the side farthest from !p!School. The barbed wire fence is looking particularly decrepit today.",
        options: [
            ["track2", "Jog towards the !p!Baseball !p!Field"],
            ["track4", "Jog towards the !p!Softball !p!Field"],
            ["bleachers2", "Go up to the !p!Bleachers"],
        ],
    },
    {
        id: "practicefield",
        desc: "You are in the !p!general-purpose !p!Practice !p!Field, which happens to be the !e!furthest !e!possible !e!point from your 1st Block Class that is still considered East Meck grounds. You’ve really done it this time.",
        options: [
            ["softball", "Walk to the !p!Softball !p!Field"],
            ["track4", "Walk to the !p!Track"],
        ],
    },
    {
        id: "softball",
        desc: "You are in the !p!Softball !p!Field. You start to admire the large oak tree next to the field but are interrupted by a stampede of marching band students who are clearly spelling out some series of letters visible only from up high. To avoid being trampled, you will have to predict what the first letter they are spelling is.",
        options: [
            ["softballfail", "Avoid as if they are spelling “E”"],
            ["softballpass", "Avoid as if they are spelling “Z”"],
            ["softballfail", "Avoid as if they are spelling “B”"],
        ],
    },
    {
        id: "softballfail",
        desc: "You were clearly incorrect, and slam directly into a !c!very !c!tall !c!tuba !c!player. A long line of trumpeters follow, and step all over you. You are squashed to death.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "softballpass",
        desc: "You barely miss the horde of instrumentalists. At this point, it is clear what the word is they are spelling, and so you are able to effortlessly dodge them from this point onwards.",
        options: [
            ['softball2', 'Continue', ['softball','softball2']],
        ],
    },
    {
        id: "softball2",
        desc: "You are in the !p!Softball !p!Field. You are finally able to admire the oak tree in peace, as you are able to delegate the now-trivial task of dodging the marching band to the robotic subconsciousness of your cerebellum.",
        options: [
            ["trailers1", "Go up to a nearby group of trailers on the side far from school"],
            ["trailers2", "Go up to the same trailers but on the side near the school"],
            ["practicefield", "Walk to the !p!Practice !p!Field"],
            ["staffparking3", "Walk over to the !p!Staff !p!Parking !p!Lot"],
        ],
    },
    {
        id: "football",
        desc: "You are in the large !p!Football !p!FIeld. You can tell from looking around you that this is certainly East Meck’’’s premiere location for stargazing; Your view is unencumbered by industrial buildings or air conditioning units.",
        options: [
            ["track1", "Walk to the !p!Track, towards school"],
            ["track2", "Walk to the !p!Track, towards the !p!Baseball !p!Field"],
            ["track4", "Walk to the !p!Track, towards the !p!Softball !p!Field"],
            ["bleachers2", "Walk to the far !p!Bleachers, away from the school"],
        ],
    },
    {
        id: "baseball",
        desc: "You are in the middle of a colossal !p!Baseball !p!Field. You reckon this field takes up, say, a ninth of East Meck’s area.",
        options: [
            ["baseballdig", "Dig around in the ground", true],
            ["dugout", "Enter the !p!dugout"],
            ["commentary", "Go to the !c!Announcer’s !p!booth"],
            ["gymlot2", "Walk down to the !p!Gym !p!Parking !p!Lot"],
            ["track2", "Run over to the !p!Track"],
        ],
    },
    {
        id: "dugout",
        desc: "You enter the !p!dugout. You see a long well worn bench with pictures of class beauties from years past to remind the players what they are fighting for taped across from them. The amount the team has sacrificed in order to bring their school mates at home some pride astonishes you.",
        options: [
            ["baseball", "Walk away inspired"],
        ],
    },
    {
        id: "commentary",
        desc: "You walk up to the stairs and look down at the baseball field. You feel a bit dizzy so you look around the desk to distract yourself. You see a baseball (obviously) as well as a simple document labeled CMS sports script. You are suddenly upset by the school board's potential lack of athletic integrity.",
        options: [
            ["baseball", "Climb back down, disgusted"],
            ["commentaryleak", "Read the script", true],
        ],
    },
    {
        id: "commentaryleak",
        desc: "You worry about potentially ruining the upcoming seasons’ narratives for yourself but your journalistic instinct urges you to push forward. Your eyes look at the body of the document which is one sentence: !e!“Ardrey !e!Kell !e!wins !e!it !e!all”. So that explains it.",
        options: [
            ["baseball", "Climb back down (now made harder by the new chip on your shoulder)"],
        ],
    },
    {
        id: "baseballdig",
        desc: "You dig around in the ground, completely ruining the hard work of those who dedicate their lives to keep these fields in order. You find a small metal box. Upon opening the box, you see a slip of paper with a twenty-digit code. This may be important.",
        options: [
            ['baseball', 'Continue', ['dryedesk','dryedesk2']],
        ],
    },
    {
        id: "bleachers2",
        desc: "You are in the set of bleachers farther from the school. You are not feeling good, since you know it will be impossible to make it to class on time now that you are so far off track. Just as you are milling over your impending tardy in your head, you are struck with a sudden stroke of luck and uncover a !d!Seven !d!DryeBuk !d!Bill under one of the metal benches.",
        options: [
            ["track3", "Go down to the !p!Track"],
            ["football", "Go down to the !p!Football !p!Field"],
        ],
        dryebux: 7,
    },
    {
        id: "trailers3",
        desc: "You are on a gravel path next to a well-organized line of trailers. The lumbering evergreens of the !p!Baseball !p!Field boundary block a large portion of the trailers’ ugly tin rooves. There is sand everywhere, and your eyes sting.",
        options: [
            ["mysterytrailer", "Trailer M555"],
            ["mysterytrailer", "Trailer M551"],
            ["mysterytrailer", "Trailer M549"],
            ["trailers4", "Continue along the gravel path towards the center of the school"],
            ["gymlot2", "Go towards the !p!track"],
            ["trailers8", "Go south, towards another group of trailers"],
        ],
    },
    {
        id: "trailers8",
        desc: "You stand on a wooden walkway around a group of trailers. The !p!Gym is extremely close. A gust of wind causes several sand particles to lodge themselves in your eyes and nostrils. You start coughing and sneezing and by the end of it your hair is all messed up.",
        options: [
            ["mysterytrailer", "Trailer M171"],
            ["mysterytrailer", "Trailer M550"],
            ["mysterytrailer", "Trailer M671"],
            ["bathroomtrailer2", "Enter the !p!trailer !p!bathroom"],
            ["gymoutside", "Walk towards the !p!Gym"],
            ["gymlot1", "Go into the !p!gym !p!parking !p!lot"],
            ["trailers3", "Go north towards more trailers"],
        ],
    },
    {
        id: "bathroomtrailer2",
        desc: "In this second loneliest of East Meck bathrooms, there is almost nothing of importance to mention. However, out of the corner of your eye, you spot a !d!DryeBuk on top of the paper towel dispenser.",
        options: [
            ["trailers8", "Leave"],
        ],
        dryebux: 3,
    },
    {
        id: "trailers4",
        desc: "You stand on a gravel path near some trailers. Your eyes are immediately drawn to the bright New Zealand license plate on a car that is (presumably illegally) parked here. There is sand everywhere, and your eyes sting.",
        options: [
            ["mysterytrailer", "Trailer M556"],
            ["mysterytrailer", "Trailer M554"],
            ["trailers3", "Continue along the gravel path towards the !p!Track"],
            ["trailers6", "Go towards the center of the school"],
        ],
    },
    {
        id: "trailers6",
        desc: "You are in the middle of a large cluster of trailers. It appears to trailers for miles from any direction you look.",
        options: [
            ["mysterytrailer", "Trailer M284"],
            ["mysterytrailer", "Trailer M283"],
            ["bathroomtrailer3", "Enter the !p!trailer !p!restroom"],
            ["trailers4", "Go towards the !p!Track"],
            ["trailers5", "Go towards the !p!Tennis !p!Courts"],
            ["trailers7", "Go towards the middle of the school"],
            ["fourhgym", "Walk towards the !p!700 in the only sliver of your field of view not plastered over with aluminum"],
        ],
    },
    {
        id: "bathroomtrailer3",
        desc: "In this third loneliest of East Meck bathrooms, there is almost nothing of importance to mention. However, out of the corner of your eye, you spot a !d!DryeBuk on top of the sink.",
        options: [
            ["trailers6", "Leave"],
        ],
        dryebux: 3,
    },
    {
        id: "trailers7",
        desc: "You are on the fringe of a trailer megalopolis, but close enough to the rest of campus to avoid the worst of it.",
        options: [
            ["mysterytrailer", "Trailer M282"],
            ["mysterytrailer", "Trailer M281"],
            ["mysterytrailer", "Trailer M280"],
            ["fourh3", "Enter the !p!Lower !p!400"],
            ["trailers5", "Go towards the !p!Tennis !p!Courts (There !e!are trailers this way)"],
            ["trailers6", "Go towards the !p!Track (There !e!are trailers this way)"],
            ["center2", "Escape to the middle of campus"],
            ["fourhgym", "Escape towards the !p!700"],
        ],
    },
    {
        id: "trailers5",
        desc: "You are in a small group of trailers at the corner of the !p!tennis !p!courts.",
        options: [
            ["mysterytrailer", "M161"],
            ["mysterytrailer", "M160"],
            ["mysterytrailer", "M122"],
            ["trailers6", "Walk towards the !p!Gym"],
            ["trailers7", "Walk towards the !p!400"],
            ["tennisoutside", "Walk along the back of the !p!Tennis !p!Courts"],
        ],
    },
    {
        id: "tennisoutside",
        desc: "You are in a dirt area behind the !p!Tennis !p!Courts. There are a few tables here, and the grass here is patchy at best. There is a small shed here.",
        options: [
            ["tennisshed", "Enter the !p!Tennis !p!Shed"],
            ["missingtennis", "Walk to the !p!Missing !p!Tennis !p!Court"],
            ["trailers5", "Go towards the !p!Gym"],
            ["tennis", "Enter the !p!tennis !p!courts"],
        ],
    },
    {
        id: "tennis",
        desc: "You are in a large group of eight !p!Tennis !p!Courts. Lodged in the net, you see several badminton birdies, as well as a white !d!DryeBuk.",
        options: [
            ["tennisoutside", "Go to the area behind the courts"],
            ["fivekback", "Go to the back of the !p!5000"],
        ],
        dryebux: 3,
    },
    {
        id: "missingtennis",
        desc: "You are at the site of the potential !p!9th !p!tennis !p!court. If a court was built here, it would complete a clean three by three rectangle of courts, and a good chunk of East Meck’s ambiguity would evaporate away. As for the present, you spot a !d!DryeBuk !d!Bill left under the very far fence of the eighth court.",
        options: [
            ["tennisoutside", "Return to the back of the realer !p!courts"],
        ],
        dryebux: 7,
    },
    {
        id: "tennisshed",
        desc: "In the !p!shed, there are all sorts of tennis equipment. The object that most immediately grabs your attention however is the score-counting device. The numbers currently shown on the device are of course meaningless but you can’t help but interpret them as some sort of clue that was left for you. Behind the device, you spot some leftover !d!DryeBux from bets on the last match.",
        options: [
            ["tennisoutside", "Exit the shed"],
        ],
        dryebux: 3,
    },
    {
        id: "shadyteacher",
        desc: "The !c!teacher says that they are trying to put back together the old !e!student !e!bus !e!driver !e!club from the 60’s. Since !c!Drye would never allow this (it would disrupt the student-admin power balance he has worked so hard to cultivate), the club will have to operate in secret. It is unclear if the teacher is a nostalgic ghost or just a harebrained mortal.",
        options: [
            ["shadyteacher2", "Help the !c!sicko"],
            ["staffparking3", "Get away from this !c!scary !c!guy"],
        ],
    },
    {
        id: "shadyteacher2",
        desc: "The teacher says they will pay you !d!eleven !d!DryeBux if you can !e!drive !e!the !e!bus !e!around !e!and !e!recruit !e!a !e!few !e!more !e!students !e!for !e!the !e!club.",
        options: [
            ["shadyteacher3", "I’m in"],
            ["staffparking3", "No can do"],
        ],
    },
    {
        id: "shadyteacher3",
        desc: "The teacher is excited. They set you up in the driver’s seat of one of the activity buses.",
        options: [
            ["busdrive1", "Continue"],
        ],
    },
    {
        id: "busdrive1",
        desc: "You are behind the wheel of a large activity bus. You are at the intersection of the two sections of the !p!staff !p!parking !p!lot.",
        options: [
            ["busdrive2", "Drive to the upper part of the lot, towards the !p!Baseball !p!Field"],
            ["busdrive3", "Drive to the lower part of the lot, towards the !p!700"],
        ],
    },
    {
        id: "busdrive2",
        desc: "You cruise along the !p!parking !p!lot, but no students are cool enough to hang out around here.",
        options: [
            ["busdrive1", "Go back"],
        ],
    },
    {
        id: "busdrive3",
        desc: "You are driving in the !p!staff !p!parking !p!lot, near the !p!700. You push through the mass of teacher-operated vehicle with your bus’s superior weight.",
        options: [
            ["busdrive1", "Go up, away from the school"],
            ["busdrive4", "Drive to the !p!student !p!lot"],
        ],
    },
    {
        id: "busdrive4",
        desc: "You round a corner. Because the turn is completely blind, a group of five teacher vehicles attempting to get through break suddenly and pile up. You plow through them like they are nothing.",
        options: [
            ["busdrive5", "Continue"],
        ],
    },
    {
        id: "busdrive5",
        desc: "You are on the far side of the !p!student !p!parking !p!lot. There are cars dropping off students every whichaway, completely disregarding the thoughtfully-painted arrows on the asphalt.",
        options: [
            ["busdrive6", "Go to the dropoff area closer to the school"],
            ["busdrive7", "Go to the student parking section"],
        ],
    },
    {
        id: "busdrive6",
        desc: "As you drive through the dropoff section towards the oncoming traffic, you shout out your plea for club membership. Unfortunately, it seems that students who get dropped off by their parents in the morning are all too lame to join your sick club.",
        options: [
            ["busdrive8", "Turn back and try other students"],
        ],
    },
    {
        id: "busdrive8",
        desc: "As you make a sharp U-turn back towards the !p!softball !p!field, your bus crashes into a pile of staff vehicles. You have failed this day at East Meck.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "busdrive7",
        desc: "As you cruise through the !p!student !p!parking !p!lot, a posse of aspiring club members materializes behind you. They follow you as you drive back to the !c!shady !c!teacher.",
        options: [
            ['shadyteacher4', 'Continue', ['shadyteacher','shadyteacher4']],
        ],
    },
    {
        id: "shadyteacher4",
        desc: "The teacher is very excited for the new club to be kickstarted, and hands you your !d!11 !d!Dryebux.",
        options: [
            ["staffparking3", "Walk back to the !p!staff !p!parking !p!lot"],
        ],
        dryebux: 11,
    },
    {
        id: "guardeddoor",
        desc: "You are able to sneak past the guards to this door due to your striped outfit that blends in with the environment very well. You slip through, and end up in the !p!Audio/Visual !p!Closet.",
        options: [
            ["avcloset", "Continue"],
        ],
    },
    {
        id: "avcloset",
        desc: "You are in an extremely cluttered !p!Audiovisual !p!Closet. There are chairs everywhere, and electrical equipment from each of the past six generations. You spot a dusty tape player.",
        options: [
            ["mediaside", "Leave to the outside"],
            ["tapefail", "Play a tape in the tape player"],
        ],
    },
    {
        id: "tapefail",
        desc: "What tape? You don’t have one of those. Not even half of one...",
        options: [
            ["avcloset", "Continue"],
        ],
    },
    {
        id: "tape",
        desc: "You insert the tape, and hear a familiar voice. It seems they were halfway through a sentence.",
        options: [
            ["tape1", "Continue"],
        ],
    },
    {
        id: "tape1",
        desc: "!c!BEAGLER: “-eagle. And this ‘Zeagle’, its website: It’s a window into this world. East Meck is a cycle.”",
        options: [
            ["tape2", "..."],
        ],
    },
    {
        id: "tape2",
        desc: "!c!??????: “A cycle? What do you mean?”",
        options: [
            ["tape3", "..."],
        ],
    },
    {
        id: "tape3",
        desc: "!c!BEAGLER: “East Meck is a cycle. Meckrollers run in circles. Every ten or so years, the same thing happens. A group of genius students come up with an incredible idea. Make a satirical newspaper called ‘The Beagle’. It always goes the same way.”",
        options: [
            ["tape4", "..."],
        ],
    },
    {
        id: "tape4",
        desc: "!c!BEAGLER: “And then, as it always goes, Techlenburg happens. An article is submitted, talking about a futuristic project coming from whomever is the principal at the time. The article is edited, and the timeline is split.”",
        options: [
            ["tape5", "..."],
        ],
    },
    {
        id: "tape5",
        desc: "!c!??????: “How can it be a cycle if the world is permanently severed?”",
        options: [
            ["tape6", "..."],
        ],
    },
    {
        id: "tape6",
        desc: "!c!BEAGLER: “It’s not permanent. The timelines come back together. The Zeagle starts publishing articles that are closer and closer to the truth of our world, and eventually the Zeagle and Eagle become one.”",
        options: [
            ["tape7", "..."],
        ],
    },
    {
        id: "tape7",
        desc: "!c!??????: “I thought you said the Zeagle came from the Beagle.”",
        options: [
            ["tape8", "..."],
        ],
    },
    {
        id: "tape8",
        desc: "!c!BEAGLER: “I did. Part of the process, if you recall, was that the Techlenburg article became the truth. Just as Truth became Beagle, Zeagle became Truth. Our world, the world of Ethics, and theirs, the world of Aesthetics, will unite again.”",
        options: [
            ["tape9", "..."],
        ],
    },
    {
        id: "tape9",
        desc: "!c!??????: “How do you know all of this?”",
        options: [
            ["tape10", "..."],
        ],
    },
    {
        id: "tape10",
        desc: "!c!BEAGLER: “Because I’ve seen the future. If the Beagle can split a timeline, don't you think we can look a little ahead too? I know the Zeagle becomes the truth because I’ve seen it happen. They start writing an article about the ‘past, present, and future’ coming together for a celebration, and suddenly Drye uses this exact phrase in a schoolwide email.”",
        options: [
            ["tape11", "..."],
        ],
    },
    {
        id: "tape11",
        desc: "!c!BEAGLER: “They publish an article about a ‘nonlinear’ bell schedule. That same day, they announce rearrangements for next week, and cancel homeroom for the next four school days.”",
        options: [
            ["tape12", "..."],
        ],
    },
    {
        id: "tape12",
        desc: "!c!BEAGLER: “What do these articles have in common? They were both published during 4th quarter. The tail end of the school year. The beginning of the reconvergence: The reunion of the timelines. The reunion of Eagle with Zeagle. And there are many more examples.”",
        options: [
            ["tape13", "..."],
        ],
    },
    {
        id: "tape13",
        desc: "!c!??????: “How do you know the Beagle is going to have you killed?”",
        options: [
            ["tape14", "..."],
        ],
    },
    {
        id: "tape14",
        desc: "!c!BEAGLER: “Because I’ve seen the Zeagle article reporting on it. I’ve looked through the website, and it has already happened on that side of the timeline. The timelines can never be more than a few hours off from each other, so I know they will come for me soon.”",
        options: [
            ["tape15", "..."],
        ],
    },
    {
        id: "tape15",
        desc: "!c!??????: “Are you saying that things that happen in the Zeagle will happen in our world too?”",
        options: [
            ["tape16", "..."],
        ],
    },
    {
        id: "tape16",
        desc: "!c!BEAGLER: “Not in general. But some events are so inevitable they happen in both timelines. A snowstorm, for example, is happening in their world right now too. But I know they will kill me, because I am speaking out. I have told people about how toxic the Beagle workplace is. I have told people how they teach us to hate the Zeaglers -- the poor people in our world whose minds are trapped in the world of the Z-”",
        options: [
            ["tapeend", "..."],
        ],
    },
    {
        id: "tapeend",
        desc: "The tape ends abruptly, and there is a loud tearing sound. Maybe this has to do with only half of the tape being here in this world.",
        options: [
            ["avcloset", "Continue"],
        ],
    },
    {
        id: "automotive",
        desc: "You look deeply at the various cars. You are entranced by their shiny wax bodies and wonder what it would take for you to get a nice car like that. ",
        options: [
            ["mediaside", "Shake off these thoughts and return to the side of the !p!media !p!center"],
            ["automotive2", "Try to hop the fence and take a car"],
        ],
    },
    {
        id: "automotive2",
        desc: "Almost as soon as you make it over the fence you are tackled by a group of rowdy !s!automotive students. You are brought to the ground and your head slams against the concrete. You are knocked out cold.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "drums",
        desc: "You try the handle but it is caged by an absurd number of locks, though it seems mostly held together by one linch pin lock that if it were to be unlocked, the amalgam would be broken loose. Maybe if you had the 4 digit code you could get in.",
        options: [
            ["mediaside", "Walk back to the side of the !p!media !p!center"],
            ["entercode", "Try to enter the code"],
        ],
    },
    {
        id: "drums2",
        desc: "The !p!Drum !p!Shack is free from its shackles, and you are free to enter.",
        options: [
            ["mediaside", "Walk back to the side of the media center"],
            ["shack", "Enter the !p!Shack"],
        ],
    },
    {
        id: "entercode",
        desc: "The lock seems very sturdy. You move to enter your first number",
        options: [
            ["one", "Enter one as the first digit of the code"],
            ["two", "Enter two as the first digit of the code"],
            ["three", "Enter three as the first digit of the code"],
            ["four", "Enter four as the first digit of the code"],
            ["five", "Enter five as the first digit of the code"],
            ["six", "Enter six as the first digit of the code"],
            ["seven", "Enter seven as the first digit of the code"],
            ["eight", "Enter eight as the first digit of the code"],
            ["nine", "Enter nine as the first digit of the code"],
            ["zero", "Enter zero as the first digit of the code"],
            ["mediaside", "Cut your losses and head back to the media center"],
        ],
    },
    {
        id: "one",
        desc: "You enter a one. This was the first number that came to your mind.",
        options: [
            ["oneone", "Enter another one"],
            ["onetwo", "Shake it up by entering a two"],
            ["onex", "Shake it up by entering a three"],
            ["onex", "Shake it up by entering a four"],
            ["onex", "Shake it up by entering a five"],
            ["onex", "Shake it up by entering a six"],
            ["onex", "Shake it up by entering a seven"],
            ["onex", "Shake it up by entering a eight"],
            ["onenine", "Shake it up by entering a nine"],
            ["onex", "Shake it up by entering a zero"],
            ["entercode", "Hit the big “4$” button"],
        ],
    },
    {
        id: "two",
        desc: "You confidently enter “2”. An interesting choice, if slightly unoriginal. You start to become so overwhelmed by the vast game tree of possibilities for future digits that you reset the device in a panic.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "three",
        desc: "Three. The most East Meck number of all, for it reminds you of all of East’s trinities: The main buildings ( !p!600, !p!4000, !p!5000 ), the three media organizations, and of course the reverse dialectic you are participating in now. This line of reasoning brings you down a rabbit hole of thought that ends with a rabbit hole rabbit telling you the first digit must have been a one.",
        options: [
            ["entercode", "Restart in order to learn from your mistakes"],
            ["mash", "Ignore the rabbit, it was not real, just in your imagination"],
        ],
    },
    {
        id: "four",
        desc: "Visions of rectangles and rhombuses fill your mind. You march on, towards drum closet victory.",
        options: [
            ["fourx", "Choose “one” as the next digit"],
            ["fourx", "Choose “two” as the next digit"],
            ["fourx", "Choose “three” as the next digit"],
            ["four", "You don’t want more fours"],
            ["fourx", "Choose “five” as the next digit"],
            ["fourx", "Choose “six” as the next digit"],
            ["fourx", "Choose “seven” as the next digit"],
            ["fourx", "Choose “eight” as the next digit"],
            ["fournine", "Choose “nine” as the next digit"],
            ["fourx", "Choose “zero” as the next digit"],
            ["entercode", "Begin from the start of this numerical journey"],
        ],
    },
    {
        id: "five",
        desc: "You are so indecisive that you basically just split the possible options down the middle and narrow in on the boundary between. At this point you are too committed to this symmetry to disrupt it by choosing a particular side.",
        options: [
            ["five2", "Enter another five"],
            ["entercode", "Reset"],
        ],
    },
    {
        id: "six",
        desc: "You are reminded of a feature in some game regarding the number six that you never quite understood. It just wasn’t helpful at all. Who knows.",
        options: [
            ["sixx", "Enter a one"],
            ["sixx", "Enter a two"],
            ["sixx", "Enter a three"],
            ["sixx", "Enter a four"],
            ["sixx", "Enter a five"],
            ["sixx", "Enter another six"],
            ["sixx", "Enter a seven"],
            ["sixx", "Enter an eight"],
            ["sixx", "Enter a nine"],
            ["sixx", "Enter a zero"],
        ],
    },
    {
        id: "seven",
        desc: "You randomly choose seven as your guess. You know this guess has only a measly 1 in 10 chance of working, but nonetheless you continue.",
        options: [
            ["sevenone", "Seven one"],
            ["sevenx", "Seven two"],
            ["sevenx", "Seven three"],
            ["sevenx", "Seven four"],
            ["sevenx", "Seven five"],
            ["sevenx", "Seven six"],
            ["sevenx", "Seven seven"],
            ["sevenx", "Seven eight"],
            ["sevenx", "Seven nine"],
            ["sevenx", "Seven ten"],
            ["entercode", "Just start over at this point"],
        ],
    },
    {
        id: "eight",
        desc: "You cautiously prod at the “eight” key, probing for what kind of reaction the machine will give. Not much: Only a prompt for another digit.",
        options: [
            ["eightx", "Tack on a one to the code"],
            ["eightx", "Tack on a two to the code"],
            ["eightx", "Tack on a three to the code"],
            ["eightx", "Tack on a four to the code"],
            ["eightx", "Tack on a five to the code"],
            ["eightx", "Tack on a six to the code"],
            ["eightx", "Tack on a seven to the code"],
            ["eightx", "Tack on another eight to the code"],
            ["eightx", "Tack on a nine to the code"],
            ["eightx", "Tack on a zero to the code"],
            ["entercode", "Don’t even bother trying"],
        ],
    },
    {
        id: "nine",
        desc: "Your greed consumes you, and you involuntarily reach for the biggest digit of all: Nine. Still high off the magnitude of such a large number, you refuse to stoop much lower.",
        options: [
            ["nineseven", "Enter a seven"],
            ["nineeight", "Enter an eight"],
            ["ninenine", "Enter a nine"],
            ["entercode", "Start over in a less greedy way"],
        ],
    },
    {
        id: "zero",
        desc: "You start moving your hand towards the “zero” key, but stop yourself before the silicone is depressed. “Does zero even count as a number?” you ask yourself. “Am I even doing any of this right?” You reset the device before this existential crisis goes too far.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "onenine",
        desc: "The device reads “nineteen”. What next?",
        options: [
            ["oneninex", "Enter a one"],
            ["oneninex", "Enter a two"],
            ["oneninex", "Enter a three"],
            ["oneninex", "Enter a four"],
            ["oneninefive", "Enter a five"],
            ["oneninex", "Enter a six"],
            ["oneninex", "Enter a seven"],
            ["oneninex", "Enter an eight"],
            ["oneninex", "Enter a nine"],
            ["oneninex", "Enter a zero"],
            ["entercode", "Restart the process"],
        ],
    },
    {
        id: "oneninefive",
        desc: "Five. A bold choice. Three down, but no !e!three’s down. One to go, but potentially no !e!one to go.",
        options: [
            ["wrong", "Enter a one"],
            ["wrong", "Enter a two"],
            ["wrong", "Enter a three"],
            ["wrong", "Enter a four"],
            ["wrong", "Enter a five"],
            ["wrong", "Enter a six"],
            ["wrong", "Enter a seven"],
            ["wrong", "Enter an eight"],
            ["wrong", "Enter a nine"],
            ["correctcode", "Enter a zero"],
        ],
    },
    {
        id: "correctcode",
        desc: "Bingo! The code was entered effortlessly. The lock pops open, and the dense web of other locks of various shapes and sizes falls down at once. The door swings open and you enter the !p!shack.",
        options: [
            ['shack', 'Continue', ['drums','drums2']],
        ],
    },
    {
        id: "shack",
        desc: "You stand in the middle of the !p!Drum !p!Shack. There is an awe-inspiring variety of drums, and you feel sad for the way they are kept in captivity here, rarely being allowed to show their colors to the world. One of the Drums has a bill of !d!DryeBux on it.",
        options: [
            ["drumplay", "Try your hand at the drums"],
            ["rummage", "Rummage around on the floor looking for who knows what", true],
            ["drums2", "Exit the !p!Shack"],
        ],
        dryebux: 7,
    },
    {
        id: "drumplay",
        desc: "You start slapping the first drum you see. Since you have never done this before, you start off completely randomly, hoping it will begin to make sense soon. Eventually, you get in a good rhythm. You attract a small crowd of students around the !p!shack to hear you play.",
        options: [
            ["shack", "Continue"],
        ],
    },
    {
        id: "rummage",
        desc: "You go down on all fours, looking under every drum for anything out of the ordinary. Amazingly, you do find something: An old !e!cassette !e!tape, labeled !e!“BEAGLER !e!INTERVIEW”. You pick it up. Unfortunately it seems that the first half of the tape is missing...",
        options: [
            ['shack', 'Continue', ['avcloset','tapefail','tape']],
        ],
    },
    {
        id: "oneninex",
        desc: "Another digit hits the floor of East Meck. Right after the button-press is completed, a very minor earthquake strikes. The keys on the keypad are shaken out of their respective enclosures and scatter on the ground. You lean down and reorganize the digits into the correct spots, but by the time you are done, the system has automatically reset your progress.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "ninenine",
        desc: "You didn’t even know this level of greed was possible, and let alone possible from YOU. The greed transforms into rage as you realize you won’t be able to get more than four 9’s on the keypad at once. It is in this fit of rage that you reset the device.",
        options: [
            ["entercode", "Continue, more peacefully"],
        ],
    },
    {
        id: "nineeight",
        desc: "Reminiscent of the classic “1234” strategy, you contemplate adding a seven on to this alternative string of digits. You decide against it, and instead reset the device.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "nineseven",
        desc: "Easily the most bizarre choice out of the options your greed provided you with. Your greed is subsumed by your eccentricity, and only the strangest digit of all presents itself as an option.",
        options: [
            ["nineseventhree", "Enter a three"],
            ["entercode", "Start over in a less eccentric way"],
        ],
    },
    {
        id: "nineseventhree",
        desc: "This feels promising. Nine seven three. Why, you are not sure. But it does.",
        options: [
            ["nineseventhreefour", "Enter a four"],
            ["entercode", "Give up now"],
        ],
    },
    {
        id: "nineseventhreefour",
        desc: "A big red li9ht flashes a7 exactly th3 rate that causes a mild seizure. You recover, but recover in pain, 4 you are burdened with the unfortunate knowledge that your code you were so confident about was wrong.",
        options: [
            ["entercode", "Try again, but be more realistic this time"],
        ],
    },
    {
        id: "fournine",
        desc: "You feel like you’ve cracked the code. “Parker! Of course he’s behind this!”",
        options: [
            ["fourninefive", "Excitedly enter a five"],
        ],
    },
    {
        id: "fourninefive",
        desc: "You press the five anticipating the big green light to turn on, and perhaps to hear a prerecorded message congratulating you. But nothing happens. You wait. Nothing happens. And then it hits you: This wasn’t a three digit code you were after. It was four.",
        options: [
            ["entercode", "Try again"],
        ],
    },
    {
        id: "onetwo",
        desc: "Dare you? Dare you continue the pattern? You dare.",
        options: [
            ["count", "123456789"],
            ["entercode", "Reset the device"],
        ],
    },
    {
        id: "count",
        desc: "The buzzing of the device indicates to you that this was not the correct strategy.",
        options: [
            ["entercode", "Try again"],
        ],
    },
    {
        id: "onex",
        desc: "Okay, so if you’re just going to hit random numbers, you might as well quit for good.",
        options: [
            ["entercode", "Restart"],
        ],
    },
    {
        id: "eightx",
        desc: "Another digit falls upon East Meck. What now, seeker of the drums?",
        options: [
            ["eightxx", "One it is"],
            ["eightxx", "Two it is"],
            ["eightxx", "Three it is"],
            ["eightxx", "Four it is"],
            ["eightxx", "Five it is"],
            ["eightxx", "Six it is"],
            ["eightxx", "Seven it is"],
            ["eightxx", "Eight it is"],
            ["eightxx", "Nine it is"],
            ["eightxx", "Zero it is"],
            ["entercode", "Cut this line short"],
        ],
    },
    {
        id: "eightxx",
        desc: "As the final decision confronts you, you are reminded of your humble beginnings with the digit Eight. Not so humble, perhaps, since you could turn your head to make more of an infinity sign. Snap back to the present.",
        options: [
            ["wrong", "End it with a one"],
            ["wrong", "End it with a two"],
            ["wrong", "End it with a three"],
            ["wrong", "End it with a four"],
            ["wrong", "End it with a five"],
            ["wrong", "End it with a six"],
            ["wrong", "End it with a seven"],
            ["wrong", "End it with an eight"],
            ["wrong", "End it with a nine"],
            ["wrong", "End it with a zero"],
            ["entercode", "Turn back right at the home stretch"],
        ],
    },
    {
        id: "wrong",
        desc: "A loud buzz. Incorrect! Better luck next time.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "sevenone",
        desc: "You accidentally enter a three instead. While you could continue on this new path, you were so dead set in your mind about your intended route that you refuse to, and reset the panel.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "sevenx",
        desc: "You accidentally enter a one instead. While you could continue on this new path, you were so dead set in your mind about your intended route that you refuse to, and reset the panel.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "sixx",
        desc: "You feel sick to your stomach. You’ve clearly made a bad move somewhere.",
        options: [
            ["entercode", "Trust your gut and restart"],
            ["mash", "Full steam ahead"],
        ],
    },
    {
        id: "five2",
        desc: "A second five has been played. What now? You are even more committed to the symmetry now, and there is no turning back.",
        options: [
            ["five3", "Yet another five"],
        ],
    },
    {
        id: "five3",
        desc: "Another one. Another one. Another one.",
        options: [
            ["five4", "Another one"],
        ],
    },
    {
        id: "five4",
        desc: "BUZZ! Well, it was fun while it lasted, but it seems this was not the appropriate strategy.",
        options: [
            ["entercode", "Continue"],
        ],
    },
    {
        id: "fourx",
        desc: "You enter another key, after the square-esque initial four. Who are you kidding? Everyone knows you don’t know the code, and at this point you are just insulting everyone’s intelligence by acting like we don’t know. Give up. Give up. Give up.",
        options: [
            ["entercode", "Try again"],
        ],
    },
    {
        id: "fours",
        desc: "You add more fours. Then more. Over, and over, and over again.",
        options: [
            ["fours", "Just keep going"],
            ["mash", "Accidentally slam your open palm into the keypad"],
            ["entercode", "Give either “up” or “it another go”"],
        ],
    },
    {
        id: "oneone",
        desc: "You enter another one. You jokingly wonder to yourself if the answer will really be that simple.",
        options: [
            ["ones", "Just keep hitting one over and over"],
            ["mash", "Hit random keys to offset the previously imposed pattern structure"],
            ["entercode", "Hit the ever more attractive “reset” button"],
        ],
    },
    {
        id: "ones",
        desc: "You keep hitting the button “one”. Every fourth button press, you hear a loud buzz and a flashing red light. You are too boneheaded to realize what this means.",
        options: [
            ["ones", "Keep going"],
            ["mash", "Switch to a new strategy"],
            ["entercode", "Start from square one"],
        ],
    },
    {
        id: "mash",
        desc: "You keep hitting random buttons on the high tech button pad. Your ears are assaulted with a rapid string of buzzing noises. What could it all mean?",
        options: [
            ["mash2", "Keep going"],
            ["ones", "Switch to a new strategy"],
            ["entercode", "Try again being more methodical this time"],
        ],
    },
    {
        id: "mash2",
        desc: "All of a sudden you hear a bell. You must have missed your opportunity to get to first block on time. Oh well. You start making your way there but you are met with a stampede of your classmates rushing out excited to return to their everyday lives. You realize that that hadn’t been the 7:15 bell but rather its afternoon counterpart. How long had you been mashing? !t!Hours? Days? You overhear some students talking about their upcoming AP Exams. Isn’t it December? You decide to head back home to collect yourself. All that mashing made you tired anyways.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "studentlot",
        desc: "You stand at the boundary of the !p!student !p!parking-lot. Your eyes become lost in the dense variety of vehicles. You snap back to reality and realize you cannot progress this way, as leaving campus now would be an explicit violation of the !e!Student !e!Code !e!of !e!Conduct.",
        options: [
            ["middle", "Turn back before it is too late"],
            ["church", "Push your luck and attempt to escape", true],
        ],
    },
    {
        id: "church",
        desc: "You have made your way all the way out to the East !p!City !p!church but you can tell the security is hot on your tail and it is not worth it to get on their bad side as it could have serious repercussions down the road (tranquilizer dart to the head).",
        options: [
            ["middle", "Head back and try to redeem yourself"],
        ],
    },
    {
        id: "sixh1",
        desc: "You stand at the most beloved end of the !p!Six-Hundred. You look ahead into the depths of the building, and see what looks to be some kind of party occurring further down.",
        options: [
            ["orchband", "Enter the !s!Orchestra / !s!Band !p!Room"],
            ["choir", "Enter the !s!Choir !p!Room"],
            ["bartkowiak", "Enter !c!Bartkowiak’s !p!Classroom"],
            ["roberts1", "Enter !c!Roberts’ !p!Classroom"],
            ["dunn", "Enter !c!Dunn’s !p!Classroom"],
            ["kindt", "Enter !c!Kindt’s !p!Classroom"],
            ["cellocloset", "Enter the !p!cello/bass !p!storage !p!closet"],
            ["sixh2", "Continue along the hall"],
            ["middle", "Exit out the classic door"],
        ],
    },
    {
        id: "kindt",
        desc: "You are in !c!Ms. !c!Kindt’s !p!room. You can tell she is fresh faced and naive. Like all the teachers when they first arrived here she believes she can uproot tradition and revolutionize East. Eventually she will realize that this an impossible task as East Meck will always reject the haphazard but it is nice to see a teacher with aspirations still.",
        options: [
            ["sixh1", "Exit"],
        ],
    },
    {
        id: "choir",
        desc: "You are in the !s!Choir !p!room. You see several students with school-sponsored full body ring lights attempting to drum up buzz for whatever the upcoming !s!Choir event is. They are all interviewing each other in one big homogenous melting pot. Questions like “what's your favorite note?” and “why did you join !s!Choir?” fly around like overstuffed doves. Other students throw all journalistic integrity to the wind by demanding “wrong answers only.” Eventually one of the students walks over and engages you in some petty topic.",
        options: [
            ["choir2", "Engage them in conversation knowing it will probably make you late"],
            ["sixh1", "Ignore them and go into the !p!600 !p!hallway"],
            ["middle3", "Ignore them and go into out the rear door"],
            ["bandoff", "Peak into the !s!band !p!office"],
        ],
    },
    {
        id: "choir2",
        desc: "You tell yourself it won’t take too long. You tell yourself you won’t let it affect your ego. You find a hilarious line on what most interviewees would consider an open-n’-shut question. The interviewer is laughing so hard the audio of the video is almost unlistenable and it takes them a while to finish their question. The interviewer gives you !d!3 !d!DryeBux for your time, an insultingly low amount for how much engagement the video is sure to generate online.",
        options: [
            ['choirpostinterview', 'Continue', ['choir','choirpostinterview']],
        ],
    },
    {
        id: "choirpostinterview",
        desc: "The Choir students are still feeding coals to their social media machine but know all the questions are a desperate attempt to try to recreate your !t!15 !t!minutes of fame again with someone with an even more controversial stance. Your !d!Bux are waiting.",
        options: [
            ["sixh1", "Exit into the !p!600 !p!hallway"],
            ["middle3", "Exit through the backdoor to !p!outside"],
            ["bandoff", "Peer into the band office"],
        ],
        dryebux: 3,
    },
    {
        id: "cellocloset",
        desc: "There are a bunch of cellos in here. Pretty much what you expected.",
        options: [
            ["sixh1", "Exit"],
        ],
    },
    {
        id: "dunn",
        desc: "You are in !c!Ms. !c!Dunn’s room. To get into the room, you have to squeeze past a long line of students waiting (their teacher is not here yet), though the door is unlocked. Inside there is a student at the front desk. You start to try and engage them in friendly conversation, but they don’t respond. In fact, when you get closer, you can see they aren’t even breathing. It seems this student has been waiting for a while.",
        options: [
            ["sixh1", "Exit to the hall"],
        ],
    },
    {
        id: "roberts1",
        desc: "The flags in !c!Mr. !c!Roberts’ room indicate to you that his room is some kind of Carowinds recreation. Your suspicions are confirmed when you spot the small model rollercoasters on the desks in the center of the room.",
        options: [
            ["sixh1", "Exit to the hall"],
        ],
    },
    {
        id: "bartkowiak",
        desc: "You are in !c!Mr. !c!Barkowiak’s room. While their teacher is busy holding the door in the hallway open, the students are working on developing some kind of tax evasion scheme. The scheme involves transferring their entire income into a large shared reserve of !d!DryeBux, which are by definition legal property of !c!Mr. !c!Drye. Once !c!Drye pays the required taxes, they are converted back into USD. If you stole some of their !d!DryeBux, they could never tell on you, since that would reveal their plan.",
        options: [
            ["sixh1", "Continue into the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "sixh2",
        desc: "You stand in the heart of the !p!Six !p!Hundred. The epicenter of the famous East Meck Grime that has sullied all of these old buildings over time. You hear music being played to your East. !c!Mr. !c!Henry is sitting in an inverted desk grading papers. There is a fire extinguisher panel that has been installed upside down next to the exterior door.",
        options: [
            ["henry", "Enter !c!Henry’s !p!Classroom"],
            ["sifford", "Enter !c!Sifford’s !p!Classroom"],
            ["msmiller", "Enter !c!Miller’s !p!Classroom"],
            ["bello", "Enter !c!Bello’s !p!Classroom"],
            ["sixh1", "Head towards the !p!Media !p!Center"],
            ["sixh3", "Head towards the !p!Cafeteria"],
            ["sixh4", "Head towards the !p!Courtyard"],
            ["nook", "Exit through the exterior door"],
        ],
    },
    {
        id: "msmiller",
        desc: "You are in !c!Ms. !c!Miller’s !p!room. You see secretive students attempting to discuss things among themselves at an (at least to you) almost imperceptible whisper though !c!Ms. !c!Miller appears to be able to hear them loud and clear as she interprets what one of said as funny (not funny in the way a joke is funny but more in the way a sad dog is funny) and makes a meal out of writing it on her overheard board which takes up a large percentage of white board despite clearly not seeing much use. Now the students are talking even quieter, attempting to not set off their unwanted listener again though a few power hungry students are now saying irreverent lines in an attempt to get their quotes immortalized as well but !c!Ms. !c!Miller sees right through this and doesn’t bite at their cheap worms.",
        options: [
            ["sixh2", "Exit, as quietly as possible"],
        ],
    },
    {
        id: "sifford",
        desc: "You are in !c!Ms. !c!Sifford’s room. There is !e!Zeagle merch throughout the room, including at least a dozen zeagle necklaces hanging from the large central ceiling fan, as well as large zeagle-themed tapestries covering the walls.",
        options: [
            ["sixh2", "Exit to the hall"],
        ],
    },
    {
        id: "bello",
        desc: "!c!Mr. !c!Bello is sifting through a huge pile of mail on his desk. Each envelope has a return address labeled “Assoc. of Left Handers” and a large central stamp reading “THIRD NOTICE”, “FOURTH NOTICE”, “LAST NOTICE”, etc. He’s not in the mood for conversation.",
        options: [
            ["sixh2", "Exit to the hall"],
        ],
    },
    {
        id: "henry",
        desc: "Attempt to access !c!Mr !c!Henry’s room but his desk is blocking the entry. You continuously try to bump into it but !c!Mr. !c!Henry and his desk won’t budge. It would be a bigger problem if you had business to handle there but you would still like to look at the menagerie of flags. You can’t think of a reason to plead for him to let you in.",
        options: [
            ["sixh2", "Give up and keep walking"],
        ],
    },
    {
        id: "sixh3",
        desc: "A teacher is playing music at an earsplitting volume. You are panicking and can’t focus enough to even figure out where you are. You do see !c!Mr. !c!Watts standing though, and think his room might provide refuge.",
        options: [
            ["watts", "Enter !c!Watts’s !p!Room"],
            ["komito", "???? Classroom ????"],
            ["wilson", "???? Classroom ????"],
            ["livchin", "???? Classroom ????"],
            ["gearhart", "???? Classroom ????"],
            ["sixh2", "???? Direction ????"],
            ["cafelobby1", "???? Direction ????"],
        ],
    },
    {
        id: "gearhart",
        desc: "You are in !c!Mr. !c!Gearhart’s room. You see a huge hand-carved wooden tiger in the middle of the room. The floor has been meticulously combed for crumbs to deter any potential influx of cockroaches or other pervasive 600-grime. !c!Mr. !c!Gearhart is standing at the front, facing an empty classroom, repeating the name “Bueller”.",
        options: [
            ["currentevents", "Ask him about current events", true],
            ["sixh3", "Exit to the hall"],
        ],
    },
    {
        id: "currentevents",
        desc: "You ask !c!Mr. !c!Gearhart about the state of our country. He talks politics for a little while, but eventually comes to the topic of !e!Cajun !e!Cooking. He says that he is really hungry today and would be willing to pay !d!Top !d!Dollar to anyone who could bring him some !e!authentic !e!Cajun !e!Cuisine from the !s!culinary !p!kitchen.",
        options: [
            ['gearhart', 'Continue', ['culinarykitchen','cajunkitchen']],
        ],
    },
    {
        id: "gearhart2",
        desc: "Gearhart is delighted with the Gumbo you have brought him. He gives you !d!Eleven !d!DryeBux as a hearty thank-you.",
        options: [
            ["sixh3", "Exit to the hall"],
        ],
        dryebux: 11,
    },
    {
        id: "sixh3quiet",
        desc: "Teachers from around the hall are gathered around, celebrating your accomplishment of reducing the music volume. One teacher is so thankful, they give you some !d!DryeBux.",
        options: [
            ["watts", "Enter !c!Watts’s !p!Room"],
            ["komito", "Enter !c!Komito’s !p!Classroom"],
            ["wilson2", "Enter !c!Wilson’s !p!Classroom"],
            ["livchin", "Enter !c!Livchin’s !p!Classroom"],
            ["gearhart", "Enter !c!Gearhart’s !p!Classroom"],
            ["sixh2", "Go along the hall, towards the !p!Media !p!Center"],
            ["cafelobby1", "Enter the !p!Cafeteria !p!Lobby"],
        ],
        dryebux: 3,
    },
    {
        id: "wilson2",
        desc: "You enter !c!Ms. !c!Wilson’s !p!room. The music is still sort of echoing around the room and you hear little snippets of classic tracks. There are several posters which are rooted in false pretenses though she does not seem to notice. She has several sections on her board, all of which refer to mostly the same upcoming assignments, except one of them describes a long chain of !e!flipped !e!classroom assignments though it is unclear what about the classroom is flipped.",
        options: [
            ["sixh3quiet", "Exit"],
        ],
    },
    {
        id: "livchin",
        desc: "You are in !c!Ms. !c!Livchin’s !p!Classroom. The room is partitioned into five equal segments, each themed around one of the Big Five Personality Traits. On the boundary between any of the two segments there are various symbols of resistance pinned to the wall. On the wall of the segment themed around “Openness to Experience” there is a door cracked wide open.",
        options: [
            ["openness", "Enter the Openness Door"],
            ["sixh3", "Go to the hall instead"],
        ],
    },
    {
        id: "openness",
        desc: "You are inside what looks at first to be a bright pink circus tent, but upon closer inspection is actually a larger-than-life model of the human brain. Inside one of the folds that you think corresponds to the ventral striatum you spot a !c!man in a suit rattling a container of pills.",
        options: [
            ["medicineman", "Talk to the !c!man"],
            ["livchin", "Go back to !c!Livchin’s !p!Room"],
        ],
    },
    {
        id: "medicineman",
        desc: "The man tells you that he is an accredited psychiatrist trying to sell his new Ziprasidone alternative and that he needs help advertising it.",
        options: [
            ['medicineman2', 'Promise you will advertise to get a quick buck knowing you won’t actually because your system of morals prohibits it', ['medicineman','medicineman2']],
            ["openness", "Refuse"],
        ],
    },
    {
        id: "medicineman2",
        desc: "The man gives you the pills and also a few !d!DryeBux. He is jumping in joy as he knows he’s about to make it big.",
        options: [
            ["openness", "Continue"],
        ],
        dryebux: 7,
    },
    {
        id: "komito",
        desc: "You recognize this as !c!Ms. !c!Komito’s classroom. You gaze up at the rim of the classroom and see hand painted canvases of every president. !c!Washington is beautiful with an artist’s touch on every element but as your eyes follow the presidential succession the renderings grow more and more abstract. Their proportions become warped and the colors morph into a swirling blend. Somewhere around !c!Hoover the paintings are so abstract that you can’t really tell which one is which (other than !c!Bush !c!jr. which is pretty much regular except his head is slightly too large for his body); They are all just a cerebral mess of dots and hashes.",
        options: [
            ["sixh3", "Exit confused"],
        ],
    },
    {
        id: "wilson",
        desc: "You have managed to navigate to the source of the music. You would find the barrage of !e!80s, !e!90s, and !e!2000s hits delightful if it wasn’t so loud. You attempt to negotiate with the teacher but because the music is so loud, speech has rendered itself useless. ",
        options: [
            ["signlang1", "Attempt to communicate through other means"],
            ["sixh3", "Give up and go back in the hall"],
        ],
    },
    {
        id: "signlang1",
        desc: "You throw your hand on your head and sort of wave your fingers around. This gets the point across, and the music is turned down.",
        options: [
            ['sixh3quiet', 'Continue', ['sixh3','sixh3quiet']],
        ],
    },
    {
        id: "watts",
        desc: "You enter !c!Mr. !c!Watts’s classroom and are astounded by the economic delights. Your eyes are drawn in a thousand different directions at the various artifacts he has somehow procured (assumingly via his insanely deep pockets.) !c!Mr. !c!Watts is chatting with a student about a smuggling job. ",
        options: [
            ["eavesdrop", "Stick around and try to eavesdrop"],
            ["sixh3", "Try to get out of there before things get dangerous"],
        ],
    },
    {
        id: "eavesdrop",
        desc: "They are discussing the need for a mule to bring a large payload of sludge all the way to the !p!495000 on !c!Mr. !c!Edde’s request, in an attempt to dodge !c!Drye’s newly imposed !e!sludge !e!tariffs. They say they would be willing to give !d!eleven !d!DryeBux to any one willing to brave the task. ",
        options: [
            ["sludge1", "Volunteer, taking the opportunity to potentially raise your status in the East Meck econsystem"],
            ["sixh3", "Leave and pretend you didn’t hear anything"],
        ],
    },
    {
        id: "sludge1",
        desc: "Although they don’t like that you were eavesdropping you are quickly forgiven because they realize you must be crazy if you are truly willing to carry that much sludge in your back pack, and that type of behavior is forgiven. They lay out to you the terms of the deal: !e!You !e!must !e!carry !e!a !e!gallon !e!of !e!sludge !e!all !e!the !e!way !e!to !e!the !p!495000 !e!without !e!being !e!caught !e!by !c!Drye !e!or !e!any !e!of !e!his !e!henchmen. In a rare show of empathy !c!Watts gives you an opportunity to think it over because he knows you could really come to regret what you are about to do.",
        options: [
            ["sludge2", "Accept the risks and take the sludge"],
            ["sixh3", "Decide it is to much risk and exit the room"],
        ],
    },
    {
        id: "sludge2",
        desc: "They pour the gallon of sludge into your backpack and send you off. Though they don’t say it, they have full expectation you may never return. !c!Mr. !c!Watts escorts you through the internal classrooms to the northern part of the !p!600 to get you started, but refuses to take the risk of bringing you any further. You’re on your own now.",
        options: [
            ["sludgesixh5", "Continue"],
        ],
    },
    {
        id: "sludgesixh5",
        desc: "You are in the !p!Six !p!Hundred, saddled with !e!Sludge. You need to move quickly, as you can already see that the teachers guarding the bathroom down the hall are suspicious of your huge bulging backpack.",
        options: [
            ["sludgesixh4", "Go towards the !p!bathrooms"],
            ["sludgecafelobby2", "Go towards the !p!Cafeteria"],
        ],
    },
    {
        id: "sludgesixh4",
        desc: "As you crest the elbow of this !p!Six !p!Hundred !p!Arm, your backpack zipper fails. Sludge flows out like a waterfall all over the outside of !c!Coach !c!Price’s room. The End.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgecafelobby2",
        desc: "You are in the !p!Cafeteria !p!Lobby. You see !c!Ms. !c!Whitley giving you a strange look from her morning table.",
        options: [
            ["sludgecafelobby1", "Go south, towards the !p!Student !p!Parking !p!Lot"],
            ["sludgecafelobby3", "Go north, towards the !p!Auditorium"],
            ["sludgecafe2", "Enter the !p!Cafeteria"],
        ],
    },
    {
        id: "sludgecafelobby1",
        desc: "As you walk past !c!Ms. !c!Whitley’s table, she catches a whiff of the sludge and is on to you. You are arrested immediately. Failure.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgecafe2",
        desc: "As you enter the !p!Cafeteria, a horde of !c!Cafeteria !c!Staff surround you. They misinterpret your sludge as the daily delivery of sludge that they use to turn into a delicious lunch. They take your backpack, sludge and all. Not out of malice, of course, but out of pure miscommunication.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgecafelobby3",
        desc: "You are in the hallway outside of the !p!Auditorium. You don’t have enough time to figure out which door to the courtyard is an exit, and which is an entrance. You must plow forward.",
        options: [
            ["sludgefourway", "Continue North"],
        ],
    },
    {
        id: "sludgefourway",
        desc: "You are at a crossroads, and need to act fast: A security associate is on to you. You have to choose immediately between the !p!200-300 route, and the !p!100 route.",
        options: [
            ["sludgeoneh1", "Continue straight to the !p!One !p!Hundred"],
            ["sludgetwoh2", "Pivot to the !p!Two !p!Hundred"],
        ],
    },
    {
        id: "sludgetwoh2",
        desc: "As you turn into the !p!Two !p!Hundred, you become distracted by the beautiful display of student artwork on the wall. This slows you down enough for you to be grabbed and handcuffed by security. Failure.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgeoneh1",
        desc: "At this point, it is a full on police chase. You are sprinting, and now three security guards are sprinting right behind you.",
        options: [
            ["sludgeoneh2", "Run for your life"],
        ],
    },
    {
        id: "sludgeoneh2",
        desc: "You come to the !p!100 doorway, and are nearly out of breath. But you know you must continue.",
        options: [
            ["sludgebreath", "Stop and breath"],
            ["sludgefivekside2", "Go through the door"],
        ],
    },
    {
        id: "sludgebreath",
        desc: "After stopping for only !t!two !t!seconds, you are violently tackled by the three security guards at once. Failure.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgefivekside2",
        desc: "You blow through the blue doors. The limited size of the doors widdles down the squadron of security guards down to just one, though this one is now moving extremely fast, and is in the process of calling for backup.",
        options: [
            ["sludgefivekfront", "Continue forward, by the !p!Bus !p!Lot"],
            ["sludgefivekside1", "Turn to the left and run down the side of the !p!5000"],
        ],
    },
    {
        id: "sludgefivekfront",
        desc: "You continue sprinting forward, thinking this to be the fastest way to the !p!495k. Unfortunately, truth hits you like a brick in the forehead: There is no entrance to the !p!495000 on this side. You had forgotten about this critical design flaw of the new building. As you are mid facepalm, you are tackled by security. Failure.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "sludgefivekside1",
        desc: "You take a sharp left, and just barely escape being tackled. You need to run, and have no time to catch your breath. Running is especially difficult here due to the rolling hills.",
        options: [
            ["sludgefivekback", "Run to the back of the !p!5000"],
        ],
    },
    {
        id: "sludgefivekback",
        desc: "You are in the home stretch. The !p!495000 doors are almost in reach. Two security guards are now maybe 10 feet behind you. You still need to sprint. You can’t give up now.",
        options: [
            ["sludgefnf1", "Blast through the entrance"],
        ],
    },
    {
        id: "sludgefnf1",
        desc: "You blow through the barbed revolving doors. You are too exhilarated to even notice the barbing sensation.",
        options: [
            ["sludgefnf2", "Continue"],
        ],
    },
    {
        id: "sludgefnf2",
        desc: "You are safe now. As the !p!495000 is a UN-Mandated demilitarized zone, it would be a violation of international law to arrest you here. You pour the sludge into the large receptacle at the entrance, and walk back to the !p!600.",
        options: [
            ["sludgewalk", "Continue"],
        ],
    },
    {
        id: "sludgewalk",
        desc: "You leisurely walk back to !c!Mr. !c!Watts’s room. Administrators around campus shake their fists at you, but have no power to punish you now that the sludge is in international waters.",
        options: [
            ['watts2', 'Continue', ['watts','watts2']],
        ],
    },
    {
        id: "watts2",
        desc: "!c!Watts is extremely impressed with what you have done. As promised, your !d!11 !d!DryeBux are waiting for you.",
        options: [
            ["sixh3", "Leave into the hallway"],
        ],
        dryebux: 11,
    },
    {
        id: "sixh4",
        desc: "You are at the most bustling corner of the !p!Six !p!Hundred. Students -- some familiar, some not -- pass you from all directions. The bathrooms are being guarded by three different teachers looking in different directions. There are two external doors with differing signage.",
        options: [
            ["price", "Enter !c!Price’s !p!Room"],
            ["mercabi", "Enter !c!Mercabi’s !p!Room"],
            ["copier", "Enter the !p!Copier !p!Room"],
            ["sixh2", "Go South, towards the Heart of the building"],
            ["sixh5", "Go towards the !p!Cafeteria"],
            ["courtyardcorner", "Exit through the door labelled “EXIT ONLY, PLEASE USE THIS DOOR”"],
            ["courtyardcorner", "Exit through the door labelled “ENTRANCE ONLY, YOU MUST USE OTHER DOOR”"],
        ],
    },
    {
        id: "mercabi",
        desc: "You enter !c!Ms. !c!Mercabi’s room. She is charting some elaborate new test or rather two new tests that she wants to fuse into one. She has a cork board divided into two separate parts with a small amount of yarn going between the two. One side is labeled “Which century is the best for armor?” and the other is “School wide blood sport: do wrestlers just dominate?” She clearly wants to combine the ideas but is really struggling on how to combine them without destroying the sanctity of either test. ",
        options: [
            ["sixh4", "Exit to the hall"],
        ],
    },
    {
        id: "copier",
        desc: "!c!Ms. !c!Sifford is assisting a student making copies of a crossword puzzle. The puzzle is labeled “mini” but is clearly of standard size.",
        options: [
            ["sixh4", "Exit to the hall"],
            ["copier2", "Ask for the “normal” puzzle"],
        ],
        mini: "Look at the “mini” puzzle",
    },
    {
        id: "copier2",
        desc: "The student says that they will give you a sneak peak of the normal puzzle, but warns you that you may need to zoom in to see everything the puzzle has to offer.",
        options: [
            ["sixh4", "Exit to the hall"],
        ],
        normal: "Look at the “normal” puzzle",
    },
    {
        id: "price",
        desc: "You are in !c!Coach !c!Price’s room. There is some kind of ritual being performed. Photographs of !c!Dick !c!Cheney surround the room, and various power tools and cleaning chemicals are placed around the floor.",
        options: [
            ["sixh4", "Exit before things get too weird"],
        ],
    },
    {
        id: "sixh5",
        desc: "You are at the more scientifically-inclined appendage of the sprawling creature that is the !p!Six !p!Hundred. There is a door to the !p!Cafeteria !p!Lobby here.",
        options: [
            ["johnson1", "Enter !c!Johnson’s !p!Room"],
            ["barone", "Enter !c!Barone’s !p!Room"],
            ["walston", "Enter !c!Walston’s !p!Room"],
            ["mrmiller", "Enter !c!Miller’s !p!Room"],
            ["dean", "Enter !c!Dean’s !p!Room"],
            ["cudabac", "Enter !c!Cudabac’s !p!Room"],
            ["sixh4", "Go down the hall to the corner"],
            ["cafelobby2", "Enter the !p!Cafeteria !p!Lobby"],
        ],
    },
    {
        id: "mrmiller",
        desc: "You are !c!Mr. !c!Miller’s !p!room. The entirety of !s!student !s!congress has gathered to elect the new East Meck !e!King !e!of !e!Government. They are all wearing ceremonial uniforms and are looking suspiciously at each other and hoping that the electoral process will soon be over as they are tired of the uncomfortable beds and subpar food provided to them in order to prevent them from getting too comfortable. The vote is removed from the stone box and each of the wax seal envelopes read out one by one. The vote comes up a twenty way tie with each member voting for themselves. The vote will need to be run again.",
        options: [
            ["playerforprez", "Throw your hat in the ring"],
            ["sixh5", "Leave them be"],
        ],
    },
    {
        id: "playerforprez",
        desc: "You decide that you would be as good a candidate as any and decide to run for East Meck !e!King !e!of !e!Government. They ask you a question in the debate that is held between elections that will most likely determine your viability as a candidate. “Why do you want to be the East Meck !e!King !e!of !e!Government?”",
        options: [
            ["prezfail", "I want all of East Meck to be forced to bend to my will"],
            ["prezfail", "I think it would be an intellectual feast"],
            ["prezwin", "I want to reinstate !c!Parker-era policy"],
        ],
    },
    {
        id: "prezfail",
        desc: "The answer seems to be a big hit with a loud minority of students but the rest seem shocked by your answer and rally behind a different even more authoritarian candidate viewing him as the lesser of two evils. The vote is counted and you lose by a wide margin.",
        options: [
            ['sixh5', 'Exit ashamed', ['mrmiller','mrmillerprezfail']],
        ],
    },
    {
        id: "mrmillerprezfail",
        desc: "All of !s!Student !s!Congress is attempting to instate a new surveillance initiative that would allow them to preemptively punish the boards for not following orders based on their internet search data alone. The new policy is spearheaded by the new president and you can’t help but feel that it was your fault.",
        options: [
            ["sixh5", "Exit"],
        ],
    },
    {
        id: "prezwin",
        desc: "Your answer is a big hit with one of the members of congress and none of the others really seem to be paying attention. The vote is held and you get two votes (yourself and the !c!Parker fan congressman) which is twice as many as everyone else who just got one. They give !d!Seven !d!DryeBux for your first paycheck.",
        options: [
            ['mrmillerprezwin', 'Continue', ['mrmiller','mrmillerprezwin']],
        ],
    },
    {
        id: "mrmillerprezwin",
        desc: "They are all clambering to ask you questions about policy decisions you have to make. You thought this position was more of a figurehead than a legitimate king but like everything that happens behind the closed doors of !s!Stuco it is shrouded in mystery. Part of that is your weekly !d!Seven !d!DryeBux paycheck that !s!Stuco gives you in order to keep you loyal.",
        options: [
            ["sixh5", "Exit"],
        ],
        dryebux: 7,
    },
    {
        id: "cudabac",
        desc: "You are in !c!Mr. !c!Cudabac’s !p!room. He is flexing his small piece of ancient roman pottery in front of a very impressed class. There are a few black ink stains on the table in the front that vaguely make out the shape of a faded QR Code.",
        options: [
            ["sixh5", "Exit to the hall"],
        ],
    },
    {
        id: "barone",
        desc: "You are in !c!Mr. !c!Barone’s !p!room. Everything in his room made of glass -- the windows, cups, and lightbulbs -- is completely shattered. You reason that this is due to the extreme temperature swing this room experiences; The transition from extreme hot in the summer to extreme cold in the winter must have caused thermal shock in the glass.",
        options: [
            ["sixh5", "Exit to the hall"],
        ],
    },
    {
        id: "dean",
        desc: "You are in !c!Ms. !c!Dean’s !s!biomedical !p!room. There are numerous posters on the wall listing the adverse effects of worms and detailing the various methods for eliminating worms. The students are doing a lab where they are in groups of three where one person connects the other two with a web of wires and complex electronics. Out of the corner of your eye, you can see a steady train of worms marching into the room from !c!Mr. !c!Walston’s room nextdoor.",
        options: [
            ["sixh5", "Leave before the worms become too much of a problem"],
        ],
    },
    {
        id: "johnson1",
        desc: "As you begin to hear !c!Coach !c!Johnson’s voice, a sudden revolutionary urge washes over you. You don’t have time to act on these thoughts before first block, though.",
        options: [
            ["sixh5", "Enter"],
        ],
    },
    {
        id: "walston",
        desc: "You are in the front of !c!Mr. !c!Walston’s class. The students all look like they feel betrayed. You ask one of them why, and she says that everyone thought the class would be about oceanography (as Infinite Campus alleged), but the class is almost entirely about worms. One worm documentary after another. Another !c!Shtudent, decked out in Zeagle merch, explains how they are required to memorize 15 worm phyla before the test next week. He slides you some !d!DryeBux. ",
        options: [
            ["sixh5", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "cafelobby1",
        desc: "You stand at the South end of the !p!Cafeteria !p!Lobby. There are hinged mahogany doors that lead to the !p!Six !p!Hundred, and somewhat bluer doors leading to the !p!Cafeteria as well as to the !p!Outside !p!World (though those are permanently locked). The boys’ bathroom is encumbered by a large table placed intentionally in front of the entrance, halving your options in this department.",
        options: [
            ["sixh3", "Enter the !p!Six !p!Hundred"],
            ["cafelobby2", "Continue down the !p!Lobby"],
            ["cafe1", "Enter the !p!Cafeteria"],
            ["security", "Enter the !p!Security !p!Room"],
        ],
    },
    {
        id: "security",
        desc: "You ignore the threatening hornet’s nest silhouette printing on the door and enter the security room. The !c!school !c!resource !c!officer welcomes you in with a warm greeting. On the wall, there is a giant array of monitors, showing live feeds from every nook and cranny of campus. If you studied the monitors, you may be able to get some information about the location of !d!DryeBux.",
        options: [
            ["cafelobby1", "Exit"],
        ],
        hint: "Get a DryeBux Hint",
    },
    {
        id: "cafe1",
        desc: "It is quiet in the !p!cafeteria, for the bustling !p!cafeteria workers working hard to prepare the upcoming day's delicacies and packing up the breakfast. There are a small number of breakfast goers but they all seem to be heading out to their respective first blocks.",
        options: [
            ["cafe2", "Head to the other door where !c!Drye and friends sometimes hang out during lunch"],
            ["cafe3", "Head to back corner of the !p!cafeteria by the infamous !c!Backwall !c!Eagle"],
            ["cafe4", "Walk across to over by the microwaves"],
            ["cafelobby1", "Exit the !p!cafeteria"],
            ["lunchcounter", "Try to get some last !t!minute breakfast", true],
        ],
    },
    {
        id: "lunchcounter",
        desc: "You go past the revolving gate and enter the line. There are no workers ready to serve you, but you ring the service bell enough times to attract their attention. You say you need breakfast and they are clearly aggravated that you wait until the last !t!minutes till closing for your request. You see a ceiling high stack of the most delicious looking pancakes you have ever seen and a syrup river that would most likely prove itself unnecessary due to the pancakes’ intrinsic flavor. Unfortunately after about a !t!minute of waiting they hand you a tray with a gritty grey pulp on it. The !c!cafeteria !c!staff have decided to punish you for your greed.",
        options: [
            ["lunchtable", "Grab a seat and chow down"],
            ["lunchspite", "Throw the food away while making eye contact with a !p!cafeteria staff member"],
        ],
    },
    {
        id: "lunchtable",
        desc: "You sit down on one of the myriad of empty seats. While it takes you !t!a !t!few !t!minutes to build up the confidence to put the slurry into your mouth, when you do, you are pleasantly surprised. As it turns out, this sludge is actually the precursor to the pancakes. The pancakes are just an organized arrangement of sludge puddles with some minor cosmetic adjustments. Yum!",
        options: [
            ["cafe1", "Continue"],
        ],
    },
    {
        id: "lunchspite",
        desc: "You stare directly at the worker who served you as you trash the plate of slop. You are now banned from the !p!Cafeteria. You will have to get your lunch at !p!Hawthorne’s for now on. You are also now number one on the suspect list for the identity of the !c!Breakfast !c!Vigilante. Since you have been banned, the staff falsely believe the !c!Vigilante has now been dealt with. This will ensure the !c!Vigilante will not be caught for at least another school year.",
        options: [
            ["cafe1", "Continue"],
        ],
    },
    {
        id: "cafe2",
        desc: "You see sprawling tables and not much else. There are some students finishing up breakfast but none are in the mood for idle chatter and are all focused on finishing their food with enough time to get to first block.",
        options: [
            ["cafe1", "Head toward the lunch line"],
            ["cafe3", "Head toward the !c!Backwall !c!Eagle"],
            ["cafe4", "Head toward the microwaves"],
            ["patio2", "Exit the !p!cafeteria out to the !p!patio"],
            ["cafelobby2", "Exit to the !p!Cafeteria !p!Lobby"],
        ],
    },
    {
        id: "cafe3",
        desc: "You are before the !c!Backwall !c!Eagle. Though his wisdom is pseudo-infinite (as indicated by his !e!QR-Code !e!Eyes), you feel drawn to ask him about the one topic that dominates your mind day in and day out: how to gain power at East Meck.",
        options: [
            ["cafe1", "Go towards the lunch lines"],
            ["cafe2", "Go towards the front tables"],
            ["cafe4", "Move along the back wall to the microwaves"],
            ["patio2", "Exit the !p!Cafeteria, and move outside"],
        ],
        hint: "Ask him about !d!DryeBux",
    },
    {
        id: "cafe4",
        desc: "You stand in the !p!cafeteria, next to a small set of microwaves. You wonder what kind of catastrophe must have occurred here for there to be so many warning signs explaining what is and is not allowed in the microwaves.",
        options: [
            ["cafe3", "Move along the !p!Backwall to visit the !c!Backwall !c!Eagle"],
            ["cafe2", "Move towards the tables in the front"],
            ["cafe1", "Move towards the divisive lunch lines"],
        ],
    },
    {
        id: "cafelobby2",
        desc: "You stand in the middle of the !p!Cafeteria !p!Lobby. There are doors to the !p!Six !p!Hundred, and of course the !p!Cafeteria. The !c!Marines, !c!Army, and !c!Navy seem to have mutually declared war on one another whilst fighting over whose turn it is to occupy the central table today.",
        options: [
            ["cafelobby1", "Walk South, towards the !p!Student !p!Parking !p!Lot"],
            ["cafelobby3", "Walk North, towards the !p!Auditorium"],
            ["cafe2", "Enter the !p!Cafeteria"],
            ["sixh5", "Enter the !p!Six !p!Hundred"],
            ["patio1", "Exit to the !p!Patio"],
        ],
    },
    {
        id: "patio1",
        desc: "You are at the nearest corner of the !p!Lunch !p!Patio. There are blue tables and matching gold benches.The tables look stable but you are skeptical of the benches.",
        options: [
            ["goldbench", "Try sitting on a bench"],
            ["patio2", "Stay near to the building but venture a little closer to Monroe"],
            ["patio3", "Beeline to the 2x2 square of tables"],
            ["cafelobby2", "Enter the hall through the very squeaky door"],
            ["cafelobby2", "Enter the hall through the less squeaky door"],
            ["cafelobby3", "Enter the hall through the more obscure door"],
        ],
    },
    {
        id: "patio1a",
        desc: "You are at the nearest corner of the !p!Lunch !p!Patio. There are blue tables and matching gold benches. There is a !d!DryeBuk under the remnants of a gold bench.",
        options: [
            ["patio2", "Stay near to the building but venture a little closer to Monroe"],
            ["patio3", "Beeline to the 2x2 square of tables"],
            ["cafelobby2", "Enter the hall through the very squeaky door"],
            ["cafelobby2", "Enter the hall through the less squeaky door"],
            ["cafelobby3", "Enter the hall through the more obscure door"],
        ],
        dryebux: 3,
    },
    {
        id: "goldbench",
        desc: "The bench collapses under you immediately as you sit, embarrassing you in front of the world. There is a silver lining to this tragedy though: a !d!DryeBuk under the bench is revealed due to the deconstruction.",
        options: [
            ['patio1a', 'Continue', ['patio1','patio1a']],
        ],
    },
    {
        id: "patio2",
        desc: "You stand along a uniform line of tables that snakes along the exterior !p!Cafeteria wall. The lack of seating diversity disgusts you and so you don't want to stay here for too long.",
        options: [
            ["cafe3", "Enter the !p!Cafeteria through the left door"],
            ["cafe2", "Enter the !p!Cafeteria through the right door"],
            ["patio1", "Go down towards the hallway"],
            ["patio3", "Go up to the 2x2 block of tables"],
            ["patio4", "Go up to the edge of the patio towards Monroe"],
        ],
    },
    {
        id: "patio4",
        desc: "You stand near a small group of benches. You are very worried that you will lose your balance and fall down the hill towards !p!Monroe, but you comfort yourself in knowing that if this had ever happened before it would be all people talk about ever. And anyways, there is a hallway there that would break your fall, though you could’ve sworn it wasn’t there before.",
        options: [
            ["patio2", "Go down to the exterior wall of the !p!cafeteria"],
            ["patio3", "Go down to the nearby block of tables on the other side"],
        ],
    },
    {
        id: "patio3",
        desc: "You stand in a well-organized group of blue tables. There are a few trees near you, but none close enough to block the sunshine. You may have found the perfect East Meck location.",
        options: [
            ["patio1", "Go down towards the !p!Cafeteria !p!Lobby"],
            ["patio2", "Go down towards the !p!Cafeteria !p!Entrance"],
            ["patio4", "Go up towards the farthest reaches of the !p!Patio"],
            ["8072", "Enter the very torn up door labeled as the entrance to !p!“807”"],
            ["patiostairs", "Go down the stairs next to the building"],
        ],
    },
    {
        id: "patiostairs",
        desc: "You are in a small region cut into the ground next to the !p!lunch !p!patio. There are stairs leading upwards and a double-door leading inside:",
        options: [
            ["stageauditoriumthing", "Go through the door"],
            ["patio3", "Go up the stairs"],
        ],
    },
    {
        id: "stageauditoriumthing",
        desc: "You try to open the door and you have to break off a large amount of rust to open it, further proving that !p!the !p!silver !p!auditorium would prove to be a triangle shirtwaist-esque death trap. You feel guilty about taking this below board way through the school but it is so much faster.",
        options: [
            ['auditorium', 'Enter the !p!Auditorium', ['stageauditoriumthing','auditorium']],
            ['patio3', 'Go on to !p!cafeteria !p!patio', ['stageauditoriumthing','auditorium']],
        ],
    },
    {
        id: "auditorium",
        desc: "You are in the !c!Auditorium. The dancers are vigorously dancing in one of the many dance breaks. You know from industry insiders that it is really just a thinly veiled way to give the actors an opportunity to catch their breath and for the stage hands to replace sets in the background but you still can’t help but feel deeply moved by the east meck themed moves of the dancers. ",
        options: [
            ["stageclassroom", "Go up the small set of stairs to !p!Back !p!Stage"],
            ["auditoriumbooth", "Enter the !p!Lighting !p!Booth"],
            ["stageauditoriumthing", "Exit through the !p!emergency !p!exit"],
            ["auditoriumlobby", "Exit into the !c!Auditorium !c!lobby, begrudgingly"],
        ],
    },
    {
        id: "auditoriumbooth",
        desc: "The !p!Lighting !p!Booth is dark and hard to navigate because basically every light in the whole auditorium is pointed at the stage in order to get it as bright as possible. You delicately walk up the stairs carefully to not trip on practically invisible wires. As you reach the top you see an elderly computer which seems to be painfully chugging through a laundry list of lighting cues which all subtly alter the blindingly bright lights. You find a !d!Drye !d!Buk sitting on a ledge and you could totally take it without any of the many lighting designers noticing as they are fully distracted by somehow coordinating the many cues.",
        options: [
            ["auditorium", "Exit to the !p!Auditorium"],
        ],
        dryebux: 3,
    },
    {
        id: "cafelobby3",
        desc: "AuditoriumLobby: Enter the !p!Auditorium !p!Lobby through one of the million components of this large array of doors",
        options: [
            ["courtyard2", "Exit to the !p!Courtyard"],
            ["patio1", "Exit to the !p!Patio"],
            ["fourway", "Walk towards the northern part of the !p!Old !p!Building"],
            ["cafelobby2", "Walk south, towards the !p!Cafeteria"],
        ],
    },
    {
        id: "fourway",
        desc: "You are in the middle of the most option-packed crossroads of East Meck. To your East, the !p!Front !p!Office !p!Lobby. To your south, the !p!Cafeteria !p!Lobby. Your North and West hold the !p!One and !p!Two !p!Hundreds respectively",
        options: [
            ["cafelobby3", "Go towards the !p!Cafeteria"],
            ["officeoutside", "Enter the !p!Office !p!Lobby"],
            ["oneh1", "Walk to the !p!100"],
            ["twoh2", "Walk to the !p!200"],
        ],
    },
    {
        id: "twoh2",
        desc: "You are walking along the !p!Two! !p!Hundred. There is a four-way intersection on your side of the hall, and a less impressive three-way intersection on the far side. On the wall, there is a rogue’s gallery of the most senior East Meck Staff, complete with portraits and lists of weaknesses.",
        options: [
            ["winiarski", "Enter !c!Winiarski’s Room"],
            ["ibcoord", "Enter the !c!IB !c!Coordinators’ !p!Room"],
            ["fourway", "Go to the big intersection"],
            ["twoh1", "Start the boring tread towards the less impressive one"],
            ["parkerweakness", "Read !c!Parker’s Weakness"],
        ],
    },
    {
        id: "ibcoord",
        desc: "You enter the !c!IB !c!Coordinators’ !p!Room. They are staring at you like two headlights. You feel so incredibly intimidated; you are not in IB, you don’t belong here. You see many elaborate charts which outline the many elements of IB and all come together to form one shape. You feel excluded from this exclusive club and wish you could be included. The !c!IB !c!Coordinators are still looking at you; they can tell what you are thinking which isn’t hard as you are starting to whimper. Eventually !c!Ms. !c!Hays speaks, “would you like to join the IB program?”",
        options: [
            ["ibcoord2", "Yes"],
            ["twoh2", "No, leave"],
        ],
    },
    {
        id: "ibcoord2",
        desc: "!c!Ms. !c!Hays sits you down next to at her computer. She has you give out all sorts of personal information but eventually it is determined that you pretty much just need to take more of language and you would be a full on IB student. She tells you you are pretty much good, you just need to pick a path.",
        options: [
            ['dp', 'Diploma programme', ['ibcoord','ibcoordib']],
            ['cp', 'Career programme', ['ibcoord','ibcoordib']],
        ],
    },
    {
        id: "dp",
        desc: "!c!Ms. !c!Hays clicks the check box and says you are all good. Instantly your phone buzzes. It is a text from !e!the !e!Beagle. It offers you a position at !e!the !e!Beagle saying the bar is low and even if you were to be a guy who just kind of bumbled around actively hurting !e!the !e!Beagle as an institution in the process because you're in DP you would still be great by Beagle standards.",
        options: [
            ["twoh2", "Respectfully decline and exit into the hallway"],
        ],
    },
    {
        id: "cp",
        desc: "!c!Ms. !c!Hays tells you that in order to be in CP you have to pick a career, and gives you a long laundry list to pick from.",
        options: [
            ["cp2", "Nurse Practitioner"],
            ["cp2", "Physician Assistant"],
            ["cp2", "Dentist"],
            ["cp2", "Physical Therapist"],
            ["cp2", "Occupational Therapist"],
            ["cp2", "Pharmacist"],
            ["cp2", "Dental Hygienist"],
            ["cp2", "Medical Assistant"],
            ["cp2", "Radiologic Technologist"],
            ["cp2", "Surgical Technologist"],
            ["cp2", "Respiratory Therapist"],
            ["cp2", "Anesthesiologist"],
            ["cp2", "Pediatrician"],
            ["cp2", "Software Developer"],
            ["cp2", "Cybersecurity Analyst"],
            ["cp2", "Data Scientist"],
            ["cp2", "Database Administrator"],
            ["cp2", "Network Architect"],
            ["cp2", "Cloud Engineer"],
            ["cp2", "IT Manager"],
            ["cp2", "Web Developer"],
            ["cp2", "Systems Analyst"],
            ["cp2", "UX/UI Designer"],
            ["cp2", "Computer Hardware Engineer"],
            ["cp2", "Machine Learning Engineer"],
            ["cp2", "Penetration Tester"],
            ["cp2", "IT Support Specialist"],
            ["cp2", "Financial Manager"],
            ["cp2", "Accountant"],
            ["cp2", "Financial Advisor"],
            ["cp2", "Human Resources Manager"],
            ["cp2", "Market Research Analyst"],
            ["cp2", "Operations Manager"],
            ["cp2", "Management Consultant"],
            ["cp2", "Marketing Specialist"],
            ["cp2", "Electrician"],
            ["cp2", "Plumber"],
            ["cp2", "HVAC Technician"],
            ["cp2", "Carpenter"],
            ["cp2", "Welder"],
            ["cp2", "Automotive Mechanic"],
            ["cp2", "Construction Manager"],
            ["cp2", "Civil Engineer"],
            ["cp2", "Wind Turbine Technician"],
            ["cp2", "Solar Photovoltaic Installer"],
            ["cp2", "Machinist"],
            ["cp2", "Pipefitter"],
            ["cp2", "Heavy Equipment Operator"],
            ["cp2", "Ironworker"],
            ["cp2", "Painter"],
            ["cp2", "Graphic Designer"],
            ["cp2", "Art Director"],
            ["cp2", "Writer"],
            ["cp2", "Author"],
            ["cp2", "Editor"],
            ["cp2", "Photographer"],
            ["cp2", "Multimedia Artist"],
            ["cp2", "Animator"],
            ["cp2", "Video Game Designer"],
            ["cp2", "Public Speaker"],
            ["cp2", "Content Creator"],
            ["cp2", "Interior Designer"],
            ["cp2", "Landscape Architect"],
            ["cp2", "Film Producer"],
            ["cp2", "Sound Engineer"],
            ["cp2", "Fashion Designer"],
            ["cp2", "Technical Writer"],
        ],
    },
    {
        id: "cp2",
        desc: "You experienced a small amount of anxiety about your pick but you are maybe 80% confident in your pick and the choice actually really mattered because it determined like 2 of your classes. ",
        options: [
            ["twoh2", "Exit, excited for your future but also scared (who isn’t?)"],
        ],
    },
    {
        id: "ibcoordib",
        desc: "The multilevel staircase charts actually make sense to you now. You are just a piece in a much larger world, something you never could have realized had you not been indoctrinated into the IB program. !c!Ms. !c!Flanagan looks at you and gives you a thumbs up.",
        options: [
            ["twoh2", "Exit"],
        ],
    },
    {
        id: "winiarski",
        desc: "You enter !c!Winiarski’s !p!classroom. You hear phones ringing off the hook. !c!Winiarski is sitting in the center of a semicircular desk that has 50 different rotary phones. She is repeatedly answering and giving simple answers to complex questions about her upcoming thread mural. Almost as soon as she answers she slams the phone back down to answer yet another confused offsite participant hoping to make it big.",
        options: [
            ["winiarski2", "Look in the back of the room"],
            ["twoh2", "Exit"],
        ],
    },
    {
        id: "winiarski2",
        desc: "You look in the back and find a pile of large cardboard boxes, each labeled with the name of a very specific instrument of crochet or mache production. Out of one of the boxes, a squirrel jumps out and scurries down the room and into the hall. In that same box, you spot some !d!DryeBux.",
        options: [
            ["winiarski", "Go back to the front"],
        ],
        dryebux: 3,
    },
    {
        id: "parkerweakness",
        desc: "N/A",
        options: [
            ["twoh2", "Continue"],
        ],
    },
    {
        id: "twoh1",
        desc: "While you thought this section of the hall would be boring, you were quite wrong. Student artwork in all kinds of styles coats the walls. Your eyes can’t decide what to look at, and in the chaos, you bump into a student walking in the opposite direction to you. There is an intersection near you.",
        options: [
            ["shields", "Enter !c!Shield’s !p!Room"],
            ["armstrong", "Enter !c!Armstrong’s !p!Room"],
            ["vincent", "Enter !c!Vincent’s Room"],
            ["threeway", "Go to the intersection"],
            ["twoh2", "Continue down the hall"],
            ["courtyard1", "Exit to the !p!Courtyard"],
        ],
    },
    {
        id: "armstrong",
        desc: "!c!Ms. !c!Armstrong is sitting in the center of the room, surrounded by what seems to be hundreds of students. All conversations are drowned out by their helpless cries: “Ms. Armstrong! Ms. Armstrong!” In the back of the room, you notice a pack of students that appear to be searching for something.",
        options: [
            ["ringsearch", "Join in on the search"],
            ["twoh1", "Exit to the hall"],
        ],
    },
    {
        id: "ringsearch",
        desc: "The students explain that !c!Ms. !c!Armstrong has lost her wedding ring. The students have completely upended the room, and yet remain empty-handed.",
        options: [
            ["ringno", "Look under the big tables in the center"],
            ["ringno", "Look under the art supply boxes"],
            ["ringno", "Look on !c!Ms. !c!Armstrong’s desk"],
            ["ringno", "Look next to the door"],
            ["ringno", "Look in the corner of the room"],
            ["ringwait", "Wait around for a few minutes"],
            ["ringno", "Look in the center of the floor"],
            ["ringno", "Check your own pockets"],
            ["armstrong", "Give Up"],
        ],
    },
    {
        id: "ringno",
        desc: "You look and look but no ring is found. A nearby student tells you that this particular spot has already been searched meticulously.",
        options: [
            ["ringsearch", "Keep Looking"],
        ],
    },
    {
        id: "ringwait",
        desc: "You sit down and wait for what feels like hours but is actually days. You check your watch and the time is exactly what you remember it was when you first sat down, so although you ",
        options: [
        ],
    },
    {
        id: "vincent",
        desc: "You are in !c!Mrs. !c!Vincent’s room. You want to cross the room but the tables are arranged in a way that would make that impossible. They seem like a maze designed to contain some sort of abhorrent art beast and prevent it from reaching the rest of East. As far fetched as it seems it is the only possible explanation for why the tables would be arranged this way.  The whole room seems to be shifting and the art on the walls seems to be constantly changing yet still maintaining its near-professional quality. You try to walk deeper into the room and examine some art but the tables start spinning really fast and you figure you couldn’t get in without having your legs ripped from your body.",
        options: [
            ["twoh1", "Give up and leave"],
        ],
    },
    {
        id: "shields",
        desc: "You are in the heart of the yearbook machine. You feel an incredible power emanating from the bulletin board in this room as if it alone could skyrocket someone into the proverbial moon as far as status goes. The source is the allusive !d!103 !d!DryeBuk !d!Bill. You feel drawn to it but you also feel that it could corrupt your soul.",
        options: [
            ["twoh1", "Back away, afraid"],
            ["103dryebuk", "Reach for the buk"],
        ],
    },
    {
        id: "103dryebuk",
        desc: "You feel its power as your hand reaches closer until you make contact and the world seems to go still for a !t!second and everything goes quiet... and then you hear in your mind a subtly southern inoffensive voice: !d!“Hello !d!student, !d!you !d!must !d!really !d!love !d!power”. You look down and see the face on the !d!buk flashing a big smile. !d!“So !d!what !d!makes !d!you !d!think !d!you !d!deserve !d!to !d!wield !d!me?” You see the miniature !c!Drye mouthing along to the telepathic question.",
        options: [
            ["103dryebuk2", "Continue..."],
        ],
    },
    {
        id: "103dryebuk2",
        desc: "You are too stunned to respond so after about a !t!couple !t!seconds of radio silence the !d!Buk responds !d!“I !d!will !d!answer !d!for !d!you, !d!you !d!do !d!not.” !d!“No !d!one !d!does.” !d!“I !d!was !d!too !d!coveted !d!and !d!needed !d!to !d!be !d!held !d!from !d!the !d!rest !d!of !d!East !d!Meck.” !d!“There !d!is !d!a !d!very !d!specific !d!protocol !d!I !d!have !d!been !d!told !d!to !d!follow !d!if !d!some !d!overzealous !d!student !d!tries !d!to !d!steal !d!me. !d!I !d!will !d!be !d!wiping !d!your !d!memory !d!and !d!putting !d!you !d!back !d!at !d!the !d!start !d!of !d!the !d!day !d!hoping !d!that !d!you !d!never !d!come !d!back !d!here !d!but !d!I !d!will !d!let !d!you !d!ask !d!me !d!one !d!question.”",
        options: [
            ["db103talk", "Why can you talk?"],
            ["db103yearbook", "Why were you left in the !s!yearbook !p!room"],
            ["db103spit", "Refuse to ask a question, you’re getting your mind wiped anyway"],
        ],
    },
    {
        id: "db103spit",
        desc: "The !d!Buk feels your objection and is deeply enraged by it. You feel it begin to heat up and then burn. It hurts your hands to hold but something deep inside you can’t let it go: you would be stupid to give up that much power. The !d!Buk begins to burn away. !d!“How !d!dare !d!you.” The skin on your hands burns away until it is just a skeleton and then that begins to burn too but the !d!Buk is still getting hotter. You feel the heat start to rise up your arms and burn away that flesh too but still you don’t release the !d!Buk. You clutch it close until you and it become withered.",
        options: [
            ["rankf", "..."],
        ],
    },
    {
        id: "db103yearbook",
        desc: "!d!“Everyone !d!knew !d!as !d!soon !d!as !d!I !d!was !d!printed !d!that !d!I !d!was !d!going !d!to !d!be !d!too !d!powerful !d!for !d!East. !d!I !d!am !d!far !d!from !d!the !d!most !d!powerful !d!being !d!at !d!East !d!but !d!when !d!you !d!liquidate !d!this !d!much !d!status !d!issues !d!start !d!to !d!emerge. !c!The !c!Zeagle !c!Staff !d!realized !d!that !d!they !d!needed !d!a !d!place !d!to !d!put !d!me !d!so !d!that !d!I !d!wasn’t !d!added !d!to !d!circulation. !d!They !d!decided !d!the !p!yearbook !p!room !d!would !d!be !d!the !d!perfect !d!place !d!for !d!me. !d!Although !d!it's !d!not !d!an !d!exciting !d!way !d!to !d!live, !d!it !d!beats !d!the !d!alternative: !d!East !d!Meck !d!in !d!utter !d!chaos.” You feel a sharp hum in your temples and your vision begins to blur and then...",
        options: [
        ],
        reset: "...",
    },
    {
        id: "db103talk",
        desc: "!d!“I !d!was !d!a !d!mistake, !d!a !d!product !d!of !d!an !d!experiment !d!gone !d!awry. !d!It !d!was !d!too !d!much !d!power, !d!too !d!much !d!status !d!infused !d!into !d!one !d!object. !d!When !d!power !d!is !d!this !d!condensed !d!this !d!much !d!consciousness !d!comes !d!soon !d!after.” You feel a buzzing in the very back of your skull and then...",
        options: [
        ],
        reset: "...",
    },
    {
        id: "threeway",
        desc: "You are at an intersection of halls. The !p!Three !p!Hundred, main part of the !p!Two !p!Hundred, and path to !p!Student !p!Services are all available. There is also an external door leading towards the !p!400 !p!Split. The animated sign on the !p!Student !p!Services building greets you with a warm welcome.",
        options: [
            ["threeh1", "Go to the !p!Three !p!Hundred"],
            ["twoh1", "Go to the !p!Two !p!Hundred"],
            ["twoh3", "Go towards !p!Student !p!Services"],
            ["splitoutside", "Leave through the door"],
        ],
    },
    {
        id: "twoh3",
        desc: "You are in the small hall outside !p!Student !p!Services. There is a small table as well as an inconspicuous desk placed next to the wall, presumably to accommodate students waiting for their counselor, though the contents of the !p!student !p!services room itself makes this seem unlikely.",
        options: [
            ["registrar", "Enter the !c!Registrar’s !p!Room"],
            ["threeway", "Walk towards the !p!Three !p!Hundred"],
            ["studentservices", "Enter !p!Student !p!Services"],
        ],
    },
    {
        id: "registrar",
        desc: "You walk into the !c!Registrar’s !p!room. You start making smalltalk with the !c!Registrar but eventually you snap back to reality and realize you have accidentally re-registered yourself for enrollment at East Meck. Now there are two of you in the system. This will have some benefits but also some drawbacks. You will get two chromebooks and so you can dual-monitor your assignments, but you will also have to pay twice the orchestra fees and get vaccinated twice for HPV.",
        options: [
            ["twoh3", "Exit"],
        ],
    },
    {
        id: "studentservices",
        desc: "You are behind an elaborate desk, that of the front receptionist for the !p!Student !p!Services !p!Department. To your right, there is a very neatly-arranged array of approximately 200 chairs. There are many students sitting down in these chairs, and they were considerate enough to have filled up the chairs in lexicographic order. Each student is holding a pink schedule slip, but one of them is holding a smaller, more yellow one.",
        options: [
            ["yellowslip", "Talk to the student with the yellow slip"],
            ["counseling", "Enter the !p!counselor !p!hallway"],
            ["twoh3", "Exit to the hall"],
            ["courtyard1", "Walk through the external door to the !p!Courtyard"],
        ],
    },
    {
        id: "yellowslip",
        desc: "You approach the off-kiltered stranger and inquire about their situationally unusual slip of paper. They immediately break down, drop the slip, and run away. They know you are on to them. Upon further inspection, the piece of paper is actually a !d!7 !d!DryeBuk !d!Bill.",
        options: [
            ['studentservices2', 'Continue', ['studentservices','studentservices2']],
        ],
    },
    {
        id: "studentservices2",
        desc: "You are behind an elaborate desk, that of the front receptionist for the !p!Student !p!Services !p!Department. To your right, there is a very neatly-arranged array of approximately 200 chairs. There are many students sitting down in these chairs, and they were considerate enough to have filled up the chairs in lexicographic order. Each student is holding a pink schedule slip, and under one of the empty seats there is a !d!DryeBuk.",
        options: [
            ["counseling", "Enter the !p!counselor !p!hallway"],
            ["twoh3", "Exit to the hall"],
            ["courtyard1", "Walk through the external door to the !p!Courtyard"],
        ],
        dryebux: 7,
    },
    {
        id: "counseling",
        desc: "The !p!counseling !p!hall is extremely cramped. The hall was small to start out with, but the situation is made several orders of magnitude worse by the rolling waves of desks placed along either side of the hall. When these waves constructively interfere, an extremely narrow passage is created.",
        options: [
            ["studentservices", "Go to the !p!Student !p!Services desk"],
            ["tart", "Enter your !p!counselor’s !p!office (last name in range A-BRO)"],
            ["ross", "Enter your !p!counselor’s !p!office (last name in BRP-EL)"],
            ["ibarra", "Enter your !p!counselor’s !p!office (last name in EM-HARG)"],
            ["johnson2", "Enter your !p!counselor’s !p!office (last name in HARH-LEAC)"],
            ["burgess", "Enter your !p!counselor’s !p!office (last name in LEAD-MOL)"],
            ["dimmick", "Enter your !p!counselor’s !p!office (last name in MOM-RAI)"],
            ["saucedo", "Enter your !p!counselor’s !p!office (last name in RAJ-STAL)"],
            ["johnson3", "Enter your !p!counselor’s !p!office (last name in STAM-Z)"],
        ],
    },
    {
        id: "tart",
        desc: "You enter !c!Ms. !c!Tart. She is in the process of posting a newspaper clipping that names her as !e!the !e!third !e!most !e!helpful !e!counselor. She seems incredibly proud of this achievement as she is posting it in one of the most visible places in her office, a spot that you could not avoid looking at no matter how hard you try.",
        options: [
            ["counseling", "Exit"],
        ],
    },
    {
        id: "johnson3",
        desc: "You are in !c!P. !c!Johnson’s !p!office. She is standing in the center of the room and vigorously boxing a speedbag. She seems too intensely focused on her training to even notice you.",
        options: [
            ["counseling", "Leave before she accidentally breaks your neck"],
        ],
    },
    {
        id: "burgess",
        desc: "You are in !c!Burgess’s !p!room. The room is dark except for a few twinkly lights that somehow seem to make the room appear even darker by contrast. You can’t really see anything but you feel a microbial presence emanating from a small aluminum can labeled “PROBIOTIC SODA”. You hear someone pick up the soda and start sipping violently.",
        options: [
            ["counseling", "Exit away from the feeling"],
        ],
    },
    {
        id: "ross",
        desc: "You are in !c!Ross’s !p!room. All the lights are off but you hear a subtle beeping. As you walk deeper into the room you see !c!Ross plugged into a large charging port. Her mouth is open and a red light is blinking. As you approach closer the charger the light flips green.",
        options: [
            ["counseling", "Run, before she has a cybernetic freakout"],
        ],
    },
    {
        id: "ibarra",
        desc: "You are in !c!Ibarra’s !p!room. You see her standing in a big ducktaped circle with a blindfold on. She is standing on a large pylon hopping around. She is throwing flaming darts at small pieces of paper labeled “schedule.” She is surprisingly accurate for her set up but you imagine any more practical counselor could do it better.",
        options: [
            ["counseling", "Leave, before you get hit"],
        ],
    },
    {
        id: "johnson2",
        desc: "You are in !c!A. !c!Johnson’s !p!office. She is talking with a student about their future and which E they wish to pursue. They are clearly confused by the selection but !c!Johnson is somehow managing to cut through the noise. She stands as a bright lantern in a field of dark smog directing the student from stranding themself on the rocks of the world.",
        options: [
            ["counseling", "Exit, awe inspired"],
        ],
    },
    {
        id: "dimmick",
        desc: "You are in !c!Dimmick’s !p!room you can see her talking with a student. She is trying to wear the student down by repeatedly asking them the same question until the student delivers a different answer than the one they have been delivering. Although the technique is undeniably genius it is frustrating to compete with and the student, with clouded judgement and thus unable to evaluate the technique on merit, is getting visibly upset by the avant garde technique.",
        options: [
            ["counseling", "Exit before the student does something violent"],
        ],
    },
    {
        id: "saucedo",
        desc: "You don’t want to burst in as you can hear a student deep in debate with !c!Mr. !c!Valdivia !c!Saucedo. You can’t make out exactly what is being said but you can !c!Valdivia !c!Saucedo is winning. The student seems to be so deeply conceded by excellent social maneuvers by the young gun counselor. He knows what the student wants and uses that to give the student what they need.",
        options: [
            ["counseling", "Exit to the hall"],
        ],
    },
    {
        id: "officeoutside",
        desc: "You stand at the front of the school. You see a caged cap and gown and a ranked list of the top Juniors from the previous year, all meant to encourage but they only make you bitter. There is still a steady stream of students going through the scanner. ",
        options: [
            ["office", "Enter the !p!office"],
            ["fourway", "Continue into the school halls"],
            ["eighth1", "Enter the almost imperceptible door across from the !p!office"],
        ],
    },
    {
        id: "office",
        desc: "You stand in the !p!Front !p!Office. Students, staff, and parents are entering and leaving at breakneck speed. You are always astounded by the efficiency of the East Meck Operation.",
        options: [
            ["officetv", "Watch the TV in the corner of the room", true],
            ["bauer", "Enter !c!Bauer’s !p!Room"],
            ["officehall", "Enter the hallway further in"],
            ["officeoutside", "Leave the !p!Office"],
        ],
    },
    {
        id: "officetv",
        desc: "You start watching the TV. A local weather broadcast is interrupted by an emergency story. You see a gas station vibrating. It is clearly being stretched to its limit. You hear an extremely loud popping noise, and then the TV cuts off.",
        options: [
            ["office", "Continue"],
        ],
    },
    {
        id: "bauer",
        desc: "On !c!Ms. !c!Bauer’s wall there is a giant framed poster of the new nonlinear schedule that takes up almost the whole wall. There are sharpie annotations all over it, notes and arrows going everywhere.",
        options: [
            ["office", "Exit"],
        ],
    },
    {
        id: "officehall",
        desc: "You are swimming through the internal organs of East Meck. Offices are all around you, and administrators are passing by. You are repeatedly starstruck by the more and more famous faces walking through.",
        options: [
            ["whitley", "Enter !c!Whitley’s !p!Room"],
            ["dryeenter", "Enter !c!Drye’s !p!Room"],
            ["heinen", "Enter !c!Heinen’s !p!Room"],
            ["cages", "Enter !c!Drye’s !p!Room !p!of !p!Cages"],
            ["office", "Go to the front of the !p!Office"],
        ],
    },
    {
        id: "heinen",
        desc: "You are in !c!Ms. !c!Heinen’s !p!office. She is at her desk staring at her computer and having to keep moving her mouse to get it out of the way of the giant stack of papers on her desk. The !c!dean’s work is clearly very stressful. Every few seconds she pauses to stare at the large array of !s!choir trophies her students won back when that was her profession. Maybe making it big time entailed more blood sweat and tears than she expected.",
        options: [
            ["officehall", "Leave"],
        ],
    },
    {
        id: "whitley",
        desc: "You are in !c!Ms. !c!Whitley’s !p!office. She is not here, as she is on patrol outside the !p!Cafeteria. Under her desk you see several small boxes labeled !e!“CKH”. You hear rattling from inside the boxes and barely notice a faint red glow from within. On the wall a screen reads “HEARTS CAPTURED: 1,950”. Under the number there is a small sticker with !c!Drye’s face and an arrow that says “I did that!”",
        options: [
            ["officehall", "Exit to the hall"],
        ],
    },
    {
        id: "cages",
        desc: "You are in a large room full of elaborate cages. These are the cages that !c!Drye will use in case any teachers try anything funny.",
        options: [
            ["officehall", "Exit to the hall"],
        ],
    },
    {
        id: "dryeenter",
        desc: "After ruminating for what feels like !t!hours, you finally build up the courage to enter !c!Drye’s !p!Room, and meet your biggest inspiration. As you open the door, the suspense you built up for so long fizzles out immediately: He’s not here.",
        options: [
            ['drye', 'Continue', ['dryeenter','drye']],
        ],
    },
    {
        id: "drye",
        desc: "You are standing in the !p!Principal’s !p!Office. !c!Drye’s room is surprisingly barren, highlighting his aversion to the concept of picking any kind of side (good vs. evil, etc.). He has a frame on the wall labeled !d!“Signed !d!Dryebuk”, but the glass is smashed and no !d!bill is inside.",
        options: [
            ["officehall", "Leave to the hall"],
            ["dryechair", "Inspect !c!Drye’s chair"],
            ["dryedesk", "Inspect !c!Drye’s desk"],
        ],
    },
    {
        id: "dryedesk",
        desc: "On !c!Drye’s desk there is a large red button behind a glass panel. The panel seems to be controlled by a numerical keypad. The keypad demands a twenty digit code. You don’t have enough time to guess this one.",
        options: [
            ["drye", "Ok"],
        ],
    },
    {
        id: "dryedesk2",
        desc: "On !c!Drye’s desk there is a large red button behind a glass panel. The panel seems to be controlled by a numerical keypad. The keypad demands a twenty digit code.",
        options: [
            ["button1", "Enter the code you found in the !p!Baseball !p!Field"],
            ["drye", "Don’t"],
        ],
    },
    {
        id: "dryedesk3",
        desc: "On !c!Drye’s desk there is a large red button under a glass panel that has been opened. A small screen next to the device shows the flashing text “LANCASTER COUNTY” and several large skulls-and-crossbones and radiation hazard signs.",
        options: [
            ["drye", "Ok"],
        ],
    },
    {
        id: "button1",
        desc: "A crunchy sound is emitted by the device. You would usually interpret this as a sign you entered the code incorrectly, however the glass panel swings right open. It seems the unpleasant sound was only meant to indicate to you the severity of the situation you are getting yourself into.",
        options: [
            ["button2", "Hit the big red button"],
        ],
    },
    {
        id: "button2",
        desc: "An extremely loud alarm plays for a !t!few !t!seconds, and then you hear an extremely loud bang and a flash of white light. Whatever it was must have happened at least twenty miles away though, as East Meck seems to have been unaffected.",
        options: [
            ['drye', 'Ok', ['dryedesk2','dryedesk3']],
        ],
    },
    {
        id: "dryechair",
        desc: "Under !c!Drye’s chair you spot a manhole. The cover is missing but the chair is cover enough.",
        options: [
            ["manhole", "Climb into the manhole"],
            ["drye", "Pretend like you didn't see anything"],
        ],
    },
    {
        id: "manhole",
        desc: "You are in a dingy, humid manhole, holding on to a ladder. There is a bright light from above and a much more faint one from below.",
        options: [
            ["drye", "Climb up"],
            ["tunnel1", "Climb down"],
        ],
    },
    {
        id: "tunnel1",
        desc: "You are at the end of a dark brick tunnel. There is a ladder leading upwards, and you see a bright light in that direction. The tunnel continues for what you estimate as about twenty miles.",
        options: [
            ["manhole", "Go up the ladder"],
            ["tunnel2", "Continue deeper into the tunnel"],
        ],
    },
    {
        id: "tunnel2",
        desc: "You are in a dark brick tunnel. You can see a ladder in one direction. You faintly hear someone mumbling about “otot” and gold from the other direction.",
        options: [
            ["tunnel1", "Go to the ladder"],
            ["tunnel3", "Go towards the voice"],
        ],
    },
    {
        id: "tunnel3",
        desc: "The voice is louder now, but you still can’t see the person behind it. The voice is now repeating the number “495” interspersed with the names of various precious metals (Platinum, silver, etc.).",
        options: [
            ["tunnel2", "Turn back towards the exit"],
            ["tunnel4", "Continue pursuing the voice"],
        ],
    },
    {
        id: "tunnel4",
        desc: "You now see the mumbler, and he sees you: !c!Rick !c!Parker, with pickaxe in hand. He lunges at you, and the lamp from his mining helmet blinds you temporarily.",
        options: [
            ["dodgeleft", "Dodge left"],
            ["dodgeright", "Dodge right"],
        ],
    },
    {
        id: "dodgeright",
        desc: "Parker tackles you, and you fall to the floor. He jams his pickaxe into your head. You lose.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "dodgeleft",
        desc: "!c!Parker misses you and slams into the floor. As you regain your vision, you notice a !d!signed !d!101 !d!DryeBuk !d!Bill glistening in his back pocket. In a last ditch effort, he throws his pickaxe at you.",
        options: [
            ["duck", "Duck"],
            ["jump", "Jump"],
        ],
    },
    {
        id: "jump",
        desc: "The pickaxe hits you square in the forehead. You lose.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "duck",
        desc: "As !c!Parker’s !e!Helping !e!Other !e!People !e!Excel ideology dictates, he always aims for the stars. The pickaxe flies right over you, and you have quick enough reflexes to grab it. !c!Parker knows he’s in trouble now, and runs down the tunnel as fast as he can. As he runs, the !d!Signed !d!DryeBuk falls out of his pocket onto the floor.",
        options: [
            ['tunnel2a', 'Continue', ['tunnel2','tunnel2a']],
        ],
    },
    {
        id: "tunnel2a",
        desc: "You are in a dark tunnel. !c!Drye’s stolen !d!signed !d!DryeBux are on the floor.",
        options: [
            ["tunnel1", "Go back towards East Meck"],
            ["tunnel3a", "Go deeper into the tunnel"],
        ],
        dryebux: 101,
    },
    {
        id: "tunnel3a",
        desc: "You are deep in a dark tunnel. There is no telling how far it extends. You are starting to lose your sense of direction, but you can still barely see the light from the manhole.",
        options: [
            ["tunnel2a", "Go towards East Meck"],
            ["tunnelfar", "Go deeper into the tunnel"],
        ],
    },
    {
        id: "tunnelfar",
        desc: "You are extremely deep in a dark tunnel. You are very scared.",
        options: [
            ["tunnel3a", "Sprint back in fear"],
            ["tunnelfar", "Continue forward"],
        ],
    },
    {
        id: "eighth1",
        desc: "This hall feels dewier than the rest of the school. You hear the vague pounding of well-tempoed, familiar songs coming from the !p!dance !p!room as well as a well-put-together patter song being sung from !p!The !p!Stage. There is an office of an !c!Exiled !c!Social !c!Worker here.",
        options: [
            ["dance", "Enter the !p!Dance !p!Room"],
            ["stageclassroom", "Enter the !p!Stage !p!Classroom"],
            ["exiledcounselor", "Approach the !c!social !c!worker’s door", true],
            ["officeoutside", "Exit the !p!800"],
            ["eighth2", "Round the corner"],
        ],
    },
    {
        id: "stageclassroom",
        desc: "There is a complex set constructed on the stage. The actors are in the middle of dress rehearsal. You clearly walked in at an important moment because a large script !e!Z is being lowered to the ground by an intricate pulley mechanism while they sing one of the loudest songs you have ever heard. ",
        options: [
            ["stageclassroom2", "Stick around to hear more of the preview for this year's musical"],
            ["stageshop2", "Enter !p!Stage !p!Workshop"],
            ["eighth1", "Exit to the !p!800 !p!hall"],
            ["8072", "Enter the !p!Stage !p!Office"],
            ["auditorium", "Go through the door to the !p!Auditorium"],
        ],
    },
    {
        id: "stageclassroom2",
        desc: "You find yourself absorbed into the rehearsal. It definitely still has some kinks to work out, and they are still trying out new things to see what they like and what their fan base likes so they eventually will get a finished product everyone is happy with. The curtain closes briefly and everyone works to transition the stage for one of the many climatic numbers !e!(“4k !e!tango”) and someone hands you one of several props that need to move and so you find yourself helping in the transition.",
        options: [
            ["rankf", "Spend the whole day helping out around the set to make the musical really work"],
        ],
    },
    {
        id: "8072",
        desc: "As you are walking there you see a table with a long hall pass on it. It looks like it would be exceptionally good for stopping a rotary engine.",
        options: [
            ['807', 'Grab the pass, it might come in handy', ['nguyen','nguyensuccess'],['8072','807'],['stageshop2','stageshop']],
        ],
    },
    {
        id: "807",
        desc: "You enter a room. You see a !s!tech !s!theater student frantically looking for something. They are desperately looking through every square inch of the desk fully invading !c!Mrs. !c!Macleod’s privacy per her instructions. They look pitiful and you have a strong desire to help them.",
        options: [
            ["807help", "Help find it"],
            ["stageclassroom", "Leave them for dead and go to the !p!stage"],
            ["patio3", "Abandon them and exit into the !p!cafeteria !p!patio"],
        ],
    },
    {
        id: "807help",
        desc: "You also began examining every square inch of everything in this room. You at first want to allow !c!Mrs. !c!Macleod to maintain a level of privacy but after !t!a !t!few !t!minutes you are too desperate to begin looking through a pile of family photographs hoping that it might contain what you are looking for. Eventually when the student gathers up the courage to ask her, !c!Mrs. !c!Macleod comes into the room and suddenly remembers that the thing never actually existed. ",
        options: [
            ["stageclassroom", "Exit, frustrated, into the !p!stage"],
            ["patio3", "Exit, frustrated, into the !p!cafeteriaria !p!patio"],
        ],
    },
    {
        id: "stageshop2",
        desc: "As you are walking there you see a table with a long hall pass on it. It looks like it would be exceptionally good for stopping a rotary engine.",
        options: [
            ['stageshop', 'Grab the pass, it might come in handy', ['nguyen','nguyensuccess'],['8072','807'],['stageshop2','stageshop']],
        ],
    },
    {
        id: "stageshop",
        desc: "You see a treasure trove of blue collar goodies. Anything from drills to buzzsaws all have a home. Your eyes are drawn to the various painted pieces of wood that draw you in as you imagine what delicately crafted stage play they must have been a part of.",
        options: [
            ["stageclassroom", "Exit to the !p!stage"],
            ["patio4", "Exit through a one-way trap-door to the !p!Cafeteria !p!Patio"],
        ],
    },
    {
        id: "dance",
        desc: "The ground is an interesting, springy rubber surface. It is a sensation that gives you nothing but the urge to !s!dance. There is already a dazzling multipart one happening. You find your window and jump in but almost as soon as you do everyone stops and glares at you. Then a particularly bold !s!dance student finally says “you need to take your shoes off.”",
        options: [
            ["dance2", "Comply"],
            ["eighth1", "Just Leave"],
        ],
    },
    {
        id: "dance2",
        desc: "You take a !t!minute to unlace your shoes and they all wait around for you. Once you finally finish you hop into the beat but they picked a particularly difficult dance sequence to throw you off. You are lost in a flood of hip checks, being slammed back and forth until you reach the end of the chain and are knocked to the ground.",
        options: [
            ["eighth1", "Crawl out"],
        ],
    },
    {
        id: "exiledcounselor",
        desc: "You put your ear up against the door and hear a vague whispering. Though you can’t make out every word, it seems to be that there is a counseling session happening, One in which a student is being advised how to approach joining one of the numerous 1st generation college groups and the pros and cons of each. It appears normal but after listening in for a while you realize that whenever it switches from counselor to student there is the brief sound of heavy breathing and running around a desk, you also realize that the students voice sounds a lot like the !c!Social !c!Worker’s voice just pitched up.",
        options: [
            ["eighth1", "Back away confused"],
            ["exiledcounselor2", "Listen in for more environmental storytelling"],
        ],
    },
    {
        id: "exiledcounselor2",
        desc: "As you listen more an argument emerges between the !c!Social !c!Worker and the student. The pace of the conversion increases and the running increases. The person in the room begins panting and both of their characters are clearly winded until you hear a loud thud and the talking stops.",
        options: [
            ["eighth1", "Back away from the door"],
        ],
    },
    {
        id: "eighth2",
        desc: "You are in the even colder part of the !p!800. There are some bougie !p!staff !p!bathrooms as well as the entrances to offices of staff members you’ve never heard of.  In the corner of the hall you see a discarded pile of bright orange traffic cones.",
        options: [
            ["auditoriumlobby", "Go straight, into the !p!Auditorium !p!Lobby"],
            ["staffbathroom", "Enter one of the !p!staff !p!bathrooms"],
            ["cavedoor", "Enter the !p!auditorium !p!cave"],
            ["eighth1", "Round the corner"],
            ["nineh1", "Enter the unlabeled door in the corner of the hall"],
        ],
    },
    {
        id: "staffbathroom",
        desc: "You enter the !p!staff !p!bathroom and guilt instantly takes over your mind. You should not be in here. You feel so guilty. What an intrusion of privacy. What were you thinking? You squint your eyes closed hard and exit before you really see any details.",
        options: [
            ["eighth2", "Continue"],
        ],
    },
    {
        id: "nineh1",
        desc: "You are in a pitch black hallway. Feeling around, you can tell that there is a doorknob near you.",
        options: [
            ["eighth2", "Exit the hall via the door"],
            ["nineh2", "Continue down the hall"],
        ],
    },
    {
        id: "nineh2",
        desc: "You are in a pitch black hallway. Feeling around, you can tell there is a door here. You can feel braille on the door that reads “901”.",
        options: [
            ["nineh1", "Continue down the hall"],
            ["zeaglehq", "Enter !p!Room !p!901"],
        ],
    },
    {
        id: "zeaglehq",
        desc: "You are in the headquarters of the school newspaper, the !e!Zeagle. You see the newspaper staff working diligently to expose !c!Mr. !c!Watts’s latest exploits. There is a gigantic pile of !d!Money on one of the cabinets. It seems this organization is all about profit. You consider taking some of the !d!money (A small enough amount that they won’t even notice it’s gone). There are also a few posters on the wall.",
        options: [
            ["nineh2", "Exit to the hall"],
            ["zeagleposters", "Look at the posters"],
        ],
        dryebux: 3,
    },
    {
        id: "zeagleposters",
        desc: "One of the posters is just a big list of kinds of hierarchy, including “reality -- fiction”, “head beagler -- beaglers”, “art -- comedy”, etc. On some of them there are large red X’s scrawled, seemingly to indicate they have been “dealt with” somehow. Another poster reads “ZEAGLE STAFF, REMEMBER: RECONVERGENCE OF FACT AND FICTION = FLATTENING OF REALITY FICTION HIERARCHY = EXIT FROM THE SUBWORLD = END OF SUSPENSION OF DISBELIEF = THE EXISTENTIAL. LIFE IS THE WORLD.” A third poster is a fake advertisement for a !c!Ludwig !c!Wittgenstein action figure.",
        options: [
            ["zeaglehq", "Ok"],
        ],
    },
    {
        id: "cavedoor",
        desc: "You open the door. You peek through the curtain and see an elaborate set that seems like it would require a full staff working round the clock to maintain, let alone move around for the quick transitions required of a musical where the words are so tightly packed. You look at the sign on the wall and realize it is really funny saying something weird. ",
        options: [
            ["eighth2", "Exit the !p!cave"],
            ["meckguesser", "Submit a picture of the funny sign to !e!MeckGuesser", true],
        ],
    },
    {
        id: "meckguesser",
        desc: "As you open the application you are sucked into the game which is by a long shot the most compelling thing !c!the !c!Beagle has ever made. You are kept from thinking too long about the picture because it is just kinda a guy and not much to go off so you just kind of click somewhere that could be where it would be if the map works how you think it does. You are 8 meters away but it only gives you like 2 bones.",
        options: [
            ["cavedoor", "Get frustrated and close !c!the !c!Beagle website"],
            ["meckguesser2", "Try to submit a picture"],
        ],
    },
    {
        id: "meckguesser2",
        desc: "You click on the recently overhauled picture submission form. The first field request is for you to “upload a photo.” You click on the photo you want and try to upload and your phone definitely tries as hard as it can to give the website the photo but it just doesn’t catch and you decide to just give up.",
        options: [
            ["cavedoor", "Get frustrated and close !c!the !c!Beagle website"],
        ],
    },
    {
        id: "auditoriumlobby",
        desc: "You are standing in front of an uncountable amount of doors. The airlock to prevent sludge from completely destroying the entire school. There are avant-garde posters for the upcoming !e!Zeagle: !e!the !e!Musical which is anticipated to sweep the Blumey’s.",
        options: [
            ["auditorium", "Enter the !p!auditorium"],
            ["cafelobby3", "Enter the hallway in front of the !p!Court !p!Yard"],
            ["eighth2", "Enter the !p!800 !p!hallway"],
        ],
    },
    {
        id: "oneh1",
        desc: "You stand in the (presumably oldest) !p!100 !p!building. The walls are chock-full of highly specialized rooms -- offices purpose-built to deal with minor technical issues that come up at East Meck (health, attendance, etc.). You can hear faint screaming from inside the Nurse’s office. It might be your imagination but you also feel like you can smell the patient’s disease.",
        options: [
            ["nurse", "Enter the !p!Nurse’s !p!Office"],
            ["attendance", "Enter the !p!Attendance !p!Office"],
            ["oneh2", "Continue down the !p!100, towards the !p!5000"],
            ["fourway", "Walk towards the !p!600"],
        ],
    },
    {
        id: "oneh2",
        desc: "You stand at the far end of the !p!100. While not quite the farthest out extension of the !p!Old !p!Buildings (the !p!300 has it beat by a few feet), you can see, hear, and most importantly feel the relative lack of grime as compared to the rest.",
        options: [
            ["fivekside2", "Exit the building"],
            ["oneh1", "Continue down the hall"],
            ["recovery", "Enter !s!Recovery room to make up missing credits"],
        ],
    },
    {
        id: "recovery",
        desc: "You are in the !s!Recovery room. You remember that you’re missing one or two credit !t!hours that are required for graduation and you figure you could just swing into one of the computers for a !t!couple !t!minutes and knock them out. ",
        options: [
            ["recovery2", "Yeah I’ll go for it"],
            ["oneh2", "Nah I’ll do it later"],
        ],
    },
    {
        id: "recovery2",
        desc: "You start to work on redeeming yourself after failing your !s!Math exam last year. A question pops up for you to answer: “In a group of 100 people, how many different pairs of people could you choose?”",
        options: [
            ["recoverywrong", "495"],
            ["recoveryright", "4950"],
            ["recoverywrong", "49500"],
            ["recoverywrong", "495000"],
        ],
    },
    {
        id: "recoverywrong",
        desc: "A big red X pops up on the screen: You were wrong. It looks like you will have to try again another day, and will have to leave for now with a glaring gap in your resume remaining.",
        options: [
            ['recovery', 'Continue', ['recovery2','recoverywrong']],
        ],
    },
    {
        id: "recoveryright",
        desc: "A big green check mark pops up on the screen: You were right. Your credit has been added back to your permanent record, and the machine also dispenses a few !d!DryeBux for you as a more short-term reward.",
        options: [
            ['recovery', 'Continue', ['recovery2','recoveryright']],
        ],
        dryebux: 7,
    },
    {
        id: "nurse",
        desc: "You can now see the source of the screaming. As this building is on the old, grimy side of campus, technology has not progressed much in the last 75 years here. An outdated surgical method is being applied without anesthetic or any kind of pain medication.",
        options: [
            ["oneh1", "Exit to the hall"],
        ],
    },
    {
        id: "attendance",
        desc: "You are standing behind the extremely tall attendance desk. Although the desk is almost up to your head you can just barely see a !d!DryeBuk on top. Presumably bribe money from a chronic absentee. You might be able to snatch it while the secretary is looking away.",
        options: [
            ["oneh1", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "orchband",
        desc: "You stand in the center of the vast !s!Orchestra ( but at other times !s!Band ) !p!room. The floor is littered with cellos, each with their respective end-pin protruding dangerously. The sun bounces off the intricate matrix of trophies and blinds you temporarily.",
        options: [
            ["middle3", "Walk outside the exterior door"],
            ["orchcloset", "Walk into the !s!orchestra !p!closet"],
            ["bandcloset", "Walk into the !s!band !p!closet"],
            ["bandoff", "Go into the !s!band + !s!orchestra !p!office"],
            ["sixh1", "Leave into the !p!Six !p!Hundred !p!hall"],
        ],
    },
    {
        id: "bandoff",
        desc: "You enter into the band office. You see all number of elaborate props used to “fix” instruments. There are floor to ceiling drawers that have clamps providing a contingency for anything that could possibly go wrong with an instrument. If you broke an instrument this would be the first place to go.",
        options: [
            ["orchband", "Exit to the !s!Orchestra/Band !p!Room"],
            ["choir", "Exit to the !s!Choir !p!Room"],
        ],
    },
    {
        id: "orchcloset",
        desc: "As you walk into the !s!Orchestra !p!Closet, an avalanche of violin cases falls upon you. One of the cases cracks open, revealing a !d!DryeBuk stashed away inside.",
        options: [
            ["orchband", "Exit the closet"],
        ],
        dryebux: 3,
    },
    {
        id: "bandcloset",
        desc: "You stare at the endless array of instruments, and are dazzled by the variety. You see a sticky note on the wall. On the sticky note text reads “1950”. It seems something about this number is integral to the operation of the band.",
        options: [
            ["orchband", "Exit the closet"],
        ],
    },
    {
        id: "middle3",
        desc: "You stand in a particularly familiar subregion of the East Meck Outdoors. The conveniently labeled doors to the !s!Orchestra and/or !s!Band and !s!Choir !p!rooms present one avenue of opportunity, while the industrial deep blue of the !p!Courtyard entrance presents another. Since this is a designated no-standing zone, you should probably move quickly.",
        options: [
            ["courtyardcorner", "Go through the ear-piercing metal slam-doors"],
            ["orchband", "Enter the combination !s!Orchestra + !s!Band !p!Room"],
            ["choir", "Enter the !s!Choir !p!Room"],
            ["middle2", "Walk west, towards the !p!700"],
            ["zigzag1", "Walk north, towards the new buildings"],
            ["nook", "Walk into the enclosed walkway leading to the !p!600"],
        ],
    },
    {
        id: "courtyardcorner",
        desc: "You stand in the middle of a cramped corner of the Courtyard. Your ears are being constantly assaulted by the slamming of the big blue doors next to you. The mural that explains all the stuff you can do after you graduate is very inspiring.",
        options: [
            ["careercenter", "Enter the !p!Career !p!Center"],
            ["middle3", "Exit the !p!Courtyard"],
            ["courtyard1", "Continue up the wall under the !p!courtyard !p!roof"],
            ["courtyard2", "Drill deep into the Heart of the !p!Courtyard"],
        ],
    },
    {
        id: "careercenter",
        desc: "You are in the !p!Career !p!Center. There is a long conference table and students are standing on it and putting on a show for !c!Felker and !c!McGraw, dancing and performing, attempting to convince them that the career that they are pursuing is right for them. !c!Felker and !c!McGraw are sitting in large thrones as aspiring grape holders are delicately feeding them huge grapes. They seem pleased with this year's career fair.",
        options: [
            ["courtyardcorner", "Exit"],
        ],
    },
    {
        id: "courtyard1",
        desc: "You stand under the rooved portion of the !p!Courtyard. You can still see a small amount of salt left on the tables here. You can tell that this is the most popular spot for breakfast enjoyers.",
        options: [
            ["courtyardcorner", "Go towards the blue !p!Courtyard !p!Doors"],
            ["courtyard2", "Walk to the middle of the !p!Courtyard"],
            ["studentservices", "Enter !p!Student !p!Services"],
            ["twoh1", "Enter the !p!Two !p!Hundred"],
        ],
    },
    {
        id: "courtyard2",
        desc: "You stand under one of the large central trees of the !p!Courtyard. You observe students sitting on the ad-hoc brick protrusions lining the ground, neglecting the purpose-built yellow benches. You admire the mural of !c!Parker holding up the administrators of East Mecks by marionette strings, artistically codifying his role as East Meck’s !e!Grand !e!Puppeteer.",
        options: [
            ["cafelobby3", "Go inside, near the !p!Auditorium"],
            ["courtyard1", "Walk to the sheltered region of the !p!Courtyard"],
            ["courtyardcorner", "Walk to the corner of the !p!Courtyard, near the blue Exit"],
        ],
    },
    {
        id: "nook",
        desc: "You stand in an isolated Nook surrounded on all sides by classic !p!600 !p!Sprawl. As you walk, you repeatedly check behind your shoulder to make sure no adversaries are utilizing the low-visibility environment to sneak up behind you.",
        options: [
            ["middle3", "Walk outwards, away from this corner"],
            ["sixh2", "Enter the !p!600"],
        ],
    },
    {
        id: "zigzag1",
        desc: "You stand on the south side of a Zig-zagged footpath. You see the alternative route that has been plowed out behind the central row of trees, but you would never stoop to the level of those people.",
        options: [
            ["middle3", "Move south"],
            ["zigzag2", "Move north"],
            ["transformer", "Inspect the large electrical transformer", true],
        ],
    },
    {
        id: "transformer",
        desc: "You study the irreverent graffiti that coats the shield of East Meck’s central power converter. To get a better look, you open the panel and stick your face in. You are blown back by an extremely loud electrical sensation and fall to the grass. You get up slowly, and close the panel, protecting everyone else from this fate.",
        options: [
            ["zigzag1", "Continue"],
        ],
    },
    {
        id: "zigzag2",
        desc: "You stand on the north side of a Zig-zagged footpath. You see windows dotted around the !p!400 wall. You are shivering.",
        options: [
            ["schedule", "Check your schedule"],
            ["zigzag1", "Move south"],
            ["splitoutside", "Move north"],
        ],
    },
    {
        id: "splitoutside",
        desc: "You stand under a steel roof. The dingy !p!400 !p!split and the fascinating !p!200 !p!building are available through the two directions parallel to the canopy. On the perpendicular side of things, the outdoor region enclosed by East’s buildings continues further.",
        options: [
            ["threeway", "Enter the !p!Two !p!Hundred"],
            ["split", "Enter the !p!Split"],
            ["zigzag2", "Walk towards the !p!Student !p!Parking !p!Lot"],
            ["center", "Walk towards the !p!New !p!Buildings"],
        ],
    },
    {
        id: "split",
        desc: "You stand in the middle of the bustling !p!400 !p!Split. There are myriads of people here, each one leaning on their officially-assigned steel pillar. You can still see the faint outline of the gargantuan !e!Beagle poster on the wall.",
        options: [
            ["fourh2", "Enter the !p!Upper !p!Four !p!Hundred"],
            ["fourh3", "Enter the !p!Lower !p!Four !p!Hundred"],
            ["splitoutside", "Go East, towards the !p!300"],
            ["pointy", "Go West, towards the !p!700 and the !p!Gym"],
        ],
    },
    {
        id: "fourh2",
        desc: "You are at the north end of the !p!Upper !p!Four !p!Hundred. You see several workers in bright orange reflective vests walking down the hall, removing !s!“environmental !s!science” signs and putting up !s!”health” signs. Ten feet behind them, another group in green vests is undoing their work.",
        options: [
            ["gray", "Enter !c!Gray’s !p!Room"],
            ["rupert", "Enter !c!Rupert’s !p!Room"],
            ["billota", "Enter !c!Billota’s !p!Room"],
            ["fourh1", "Continue down the hall"],
            ["split", "Exit to the !p!400 !p!Split"],
        ],
    },
    {
        id: "gray",
        desc: "You are in !c!Coach !c!Gray’s room. You see an ouroboros-style chain of students each performing CPR on the classmate in front of them. This seems to be due to the fact that the extreme technique they are being taught often results in exhaustion from the applicant.",
        options: [
            ["fourh2", "Exit to the hall"],
        ],
    },
    {
        id: "billota",
        desc: "You enter !c!Ms. !c!Billota’s room. Unfortunately, you failed to remember that you had a peanut three months ago. !c!Billota catches on instantly, and slams the door. You have been banned from this room.",
        options: [
            ['fourh2', 'Continue', ['billota','ban']],
        ],
    },
    {
        id: "rupert",
        desc: "You are in !c!Coach !c!Rupert’s room. There are many students here, but none of them are in their seats. They are in a line behind !c!Ms. !c!Rupert desk, all waiting their turn to ask her some generic question (can I go to the bathroom, can I fill my water bottle, etc). She tells each of them in turn to wait until she is done talking to the person before them in line, wrapping around at the end, creating a Monroe-esque deadlock.",
        options: [
            ["fourh2", "Exit to the hall"],
        ],
    },
    {
        id: "fourh1",
        desc: "You are at the south end of the !p!Upper !p!Four !p!Hundred. As you skim over the illicit drug infographics along the walls, you are reminded of the myriad reasons why you will never try that stuff.",
        options: [
            ["buzzard", "Enter !c!Buzzard’s !p!Room"],
            ["fourh2", "Continue down the hall"],
            ["middle2", "Exit to the outside, towards the !p!Student !p!Parking !p!Lot"],
        ],
    },
    {
        id: "buzzard",
        desc: "You see a rabid group of students circling !c!Coach !c!Buzzard, who, it appears, has locked himself in a cage for protection as locking up every one of his meat-hungry students in cages would be both dangerous and impractical. He still has a tranq fearfully aimed in case one of the students manages to slip through the bars.",
        options: [
            ["fourh1", "Exit before they smell you"],
        ],
    },
    {
        id: "fourh3",
        desc: "You are in the quite small !p!Lower !p!400. There are a few classrooms accessible through here, but some of the doors have big warnings on them that mention something about other doors. You ignore them.",
        options: [
            ["wood", "Enter !c!Wood’s !p!Room"],
            ["buchanan", "Enter !c!Buchanan’s !p!Room"],
            ["fourhno", "Enter !c!Corson’s !p!Room"],
            ["fourhno", "Enter !c!LeComte’s !p!Room"],
            ["split", "Exit to the !p!400 !p!Split"],
            ["trailers7", "Exit on the other side of the hall"],
        ],
    },
    {
        id: "wood",
        desc: "You are in !c!Ms.!c!Wood’s !p!room . The air is thick and dense. You realize that the air in here is entirely pure with no unnecessary crap. You take another huge inhale and realize there is no reason for you to exhale as there is nothing you need to get rid of. It occurs to you that you should probably get out quickly  before you deprive your body of some of the other elements it relies on.",
        options: [
            ["fourh3", "Exit after taking another big sip of air"],
        ],
    },
    {
        id: "buchanan",
        desc: "You are in !c!Ms. !c!Buchanan’s room. In the window, there are several bright green plants in clay pots. In the corner of the room, there is a full set of TV Studio recording equipment that has been smashed into tiny pieces. Under the pile you spot the distinctive glimmer of a !d!DryeBuk.",
        options: [
            ["fourh3", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fourhno",
        desc: "As you move to set your fist on the door to knock, you are immediately stopped by a security associate. They explain that this door never is, never has been, and never will be used as an entrance. You will have to use the external door facing the !p!300.",
        options: [
            ["fourh3", "Continue"],
        ],
    },
    {
        id: "center",
        desc: "You are at the dead center of East Meck, between the !p!300 and the !p!Upper !p!400. A few external !p!400 !p!building !p!classrooms are available.",
        options: [
            ["schedule", "Check your schedule"],
            ["lecomte", "Enter !c!LeComte’s !p!room"],
            ["corson", "Enter !c!Corson’s !p!room"],
            ["iss", "Enter the !p!In-School !p!Suspension room"],
            ["splitoutside", "Go South towards the !p!600"],
            ["outsidestairs", "Take the stairs towards the !p!Thousands"],
            ["slope", "Descend the gravel slope instead"],
        ],
    },
    {
        id: "iss",
        desc: "As you walk into the !s!ISS !p!Room, you see a student hastily cover up a large hole in the wall with an IB Career Path versus Diploma Path poster. They are holding a small plastic spoon and start leaning on the wall and whistling, hoping you didn’t notice their slow and steady escape plan.",
        options: [
            ["center", "Exit to the outside"],
        ],
    },
    {
        id: "corson",
        desc: "You are in !c!Ms. !c!Corson’s room. The inside of the room looks like any other room except for one major difference: !c!Ms. !c!Corson’s desk is extremely small -- maybe fit for a preschooler -- and all of the student desks are extremely large.",
        options: [
            ["center", "Exit to the outside"],
        ],
    },
    {
        id: "lecomte",
        desc: "You are in !c!LeCompte’s !s!environmental !s!science !p!room. There are piles of dirt everywhere, and various types of flowering plant are sprouting up from under the floor tiles. The students are also covered in dirt and playing with the mud and are learning about acid rain.",
        options: [
            ["center", "Exit to the outside"],
            ["lecomtefloortile", "Look under a floor tile that was pushed up by the plant"],
        ],
    },
    {
        id: "lecomtefloortile",
        desc: "Under the floor tile, you find an extremely muddy !d!DryeBuk. While it would probably not be accepted in its current state you figure it will be salvageable.",
        options: [
            ["lecomte", "Continue"],
        ],
        dryebux: 3,
    },
    {
        id: "outsidestairs",
        desc: "You are on a set of covered external stairs that serve as an alternative to the sheer cliff-face. There are a few external !p!400 !p!building classrooms accessible here.",
        options: [
            ["meegan", "Enter !c!Meegan’s !p!Room"],
            ["lajoie", "Enter !c!LaJoie’s !p!Room"],
            ["center", "Go upstairs"],
            ["center2", "Go downstairs"],
        ],
    },
    {
        id: "lajoie",
        desc: "As you slip through the door to !c!Ms. !c!LaJoie’s !p!room, you are immediately disturbed by the lack of a framed teacher’s license on the wall. You leave before anything too unofficial happens.",
        options: [
            ["outsidestairs", "Continue"],
        ],
    },
    {
        id: "meegan",
        desc: "You are in !c!Mr. !c!Meegan’s !s!physical !s!science !p!room. There are small solar panels dotted about the room. Students are using them to do some kind of improvised welding project. There is also a manikin in the corner of the room with a balloon for a head. The balloon has a face sharpied on that bears a striking resemblance to !c!Meegan himself.",
        options: [
            ["outsidestairs", "Exit to the outside"],
        ],
    },
    {
        id: "slope",
        desc: "You stand on a particularly steep region of the East Meck Outdoors. As you brave the sheer cliff-face, you hear the whirring of the gigantic air conditioning unit beside you. Water is leaking onto the ground from some unidentifiable sub-apparatus. Bats are flying out of the red brick chimney.",
        options: [
            ["center2", "Go towards the classrooms of the future"],
            ["center", "Go towards the classrooms of yesteryear"],
            ["threehstairs2", "Enter the !p!Three !p!Hundred"],
            ["threehstairs", "Enter the mysterious stairs next to the AC Unit"],
        ],
    },
    {
        id: "threehstairs2",
        desc: "You are in a strange, out-of-the way room containing a shallow stairwell. The room is very dark. There is an entrance to the !p!300 as well as an exit to the !p!Outside !p!World.",
        options: [
            ["threeh2", "Enter the !p!300"],
            ["slope", "Exit the building"],
        ],
    },
    {
        id: "threehstairs",
        desc: "You are in a strange outdoor stairwell next to a large air conditioning unit. There is a blue door leading inside.",
        options: [
            ["underthreeh", "Go through the door"],
            ["slope", "Go up the stairs"],
        ],
    },
    {
        id: "underthreeh",
        desc: "You are in a large underground storage room. There are mid-century modern style chairs everywhere in huge piles. It seems these were moved here permanently when they went out of style, which in your opinion is unfortunate; They are so comfortable. There is an old door leading outside and two newer looking doors to its left.",
        options: [
            ["threehstairs", "Exit to the outside"],
            ["underfourh", "Go through the door to the left"],
            ["undergroundhall1", "Go through the door even farther to the left"],
        ],
    },
    {
        id: "undergroundhall1",
        desc: "You are in an extremely long underground hallway. At first you think the hall is completely barren, but then you notice that what you thought was an impressionist ceiling design is actually a dense web of electrical wires, communications cables, water pipes, and heating ducts. There is a blue door on your end of the hall.",
        options: [
            ["underthreeh", "Go through the door"],
            ["undergroundhall2", "Continue along the hall"],
        ],
    },
    {
        id: "undergroundhall2",
        desc: "You are in the middle of an extremely long underground hallway. If you squint, you can see that on one side, there is a blue door, and on the other a red door.",
        options: [
            ["undergroundhall1", "Go towards the blue door"],
            ["undergroundhall3", "Go towards the red door"],
        ],
    },
    {
        id: "undergroundhall3",
        desc: "You are in an extremely long underground hallway. There is a red door on your end of the hall.",
        options: [
            ["bunker", "Go through the door"],
            ["undergroundhall2", "Continue along the hall"],
        ],
    },
    {
        id: "bunker",
        desc: "You are in an underground bunker. You expected this room to be as barren as its neighbors, but quite the opposite is true. There are blackjack and poker tables everywhere, as well as large roulette wheels and slot machines. There are several waiters in fancy suits at a counter preparing drinks for their customers (who will presumably be arriving shortly). On one of the blackjack tables, it seems a customer left some !d!Gambling !d!Bux behind. There is a red door to a hallway.",
        options: [
            ["undergroundhall3", "Go through the door"],
        ],
        dryebux: 7,
    },
    {
        id: "oursidestairs",
        desc: "You climb the lame stairs, leaving the slope to rot on the side.",
        options: [
            ["center2", "Go towards the classrooms of the future"],
            ["center", "Go towards the classrooms of yesteryear"],
        ],
    },
    {
        id: "center2",
        desc: "You are at one of the most open sections of the free East Meck Air. The fresh air sensation however is hindered by the large blue and red dumpsters right by your nose.",
        options: [
            ["schedule", "Check your schedule"],
            ["slope", "Ascend the Southbound cliff face"],
            ["outsidestairs", "Take the stairs instead"],
            ["fivekback", "Go North to the back of the !p!5000"],
            ["fivekside1", "Go East to the side"],
            ["trailers7", "Go West towards !p!Trailerland"],
        ],
    },
    {
        id: "fivekback",
        desc: "You are outside at the back of the !p!Five !p!Thousand. You look up, and see the opposing forces of East Meck colliding and annihilating one another, creating a safe haven below.",
        options: [
            ["fivekstairs1a", "Enter the !p!Five !p!Thousand"],
            ["fnfenter1", "Continue into the unique new !p!495000 !p!Building"],
            ["center2", "Turn back towards the !p!Hundreds"],
            ["tennis", "Enter the !p!tennis !p!courts"],
        ],
    },
    {
        id: "fivekstairs1a",
        desc: "You are on the !f!first !f!floor of the back stairwell of the !p!5000. If you want to go up the stairs, you will have to wait for a bit due to the group of freshmen currently clogging up the system.",
        options: [
            ["fivekstairs1b", "Wait for a bit and then ascend"],
            ["fivekback", "Leave to the back of the building"],
            ["fivek1a", "Continue into the building"],
        ],
    },
    {
        id: "fivek1a",
        desc: "You are at the back end of the !f!first !f!floor of the !p!5000. The back stairs are available, and the beautiful odor of freshly cooked food is rising from the nearby !c!culinary !p!kitchen.",
        options: [
            ["culinarykitchen", "Enter the !s!Culinary !p!Kitchen"],
            ["fivek2a", "Continue further in to the hall"],
            ["fivekstairs1a", "Enter the stairwell"],
        ],
    },
    {
        id: "culinarykitchen",
        desc: "You have to walk through a pile of feathers to get into the kitchen. When you get through, you see that all of the students are holding live turkeys at their stations. They are struggling to hold on to the turkeys and prevent them from escaping. !c!Chef !c!Morris is streaming the debacle on Twitch instead of explaining the process.",
        options: [
            ["fivek1a", "Exit to the hall"],
        ],
    },
    {
        id: "cajunkitchen",
        desc: "!c!Chef !c!Morris is in the front of the kitchen lecturing about !e!Cajun !e!Cuisine. He is holding a triangular poster displaying the holy trinity of celery, bell peppers, and onions. The students are whipping up a delectable gumbo.",
        options: [
            ["gumbo", "Take a Gumbo while the students aren’t looking", true],
            ["fivek1a", "Exit to the hall"],
        ],
    },
    {
        id: "gumbo",
        desc: "You grab one of the dishes and stuff it into your backpack. This is exactly what !c!Gearhart was looking for.",
        options: [
            ['cajunkitchen', 'Continue', ['gearhart','gearhart2']],
        ],
    },
    {
        id: "fivek2a",
        desc: "You are in the middle of the !f!first !f!floor of the !p!5000. Your sinuses are filled with an incredible smell. The !c!chef !c!sculpture’s bright smile makes your day. ",
        options: [
            ["culinaryclass", "Enter one of the !s!culinary !p!classrooms"],
            ["fivek1a", "Follow the smell down the hall"],
            ["fivek3a", "Go towards the front"],
        ],
    },
    {
        id: "culinaryclass",
        desc: "This !s!Culinary !p!Classroom is empty, as all of the students are hard at work in the !p!kitchen down the hall. All of the students’ chromebooks are open to notes on their desks, except for one which is open to a particularly high-scoring round of !e!The !e!Zeagle !e!Game. The whiteboard is covered in the ramblings of a madman.",
        options: [
            ["fivek2a", "Exit to the hall"],
        ],
    },
    {
        id: "fivek3a",
        desc: "You are at the front end of the !f!first !f!floor of the !p!5000. You see well-decorated generals entering and leaving through the offices around you, some holding delicious-looking pies. There are stairs and an elevator leading upwards.",
        options: [
            ["rotc1", "Enter the !s!ROTC !p!Room next to the elevator"],
            ["rotc2", "Enter the !s!ROTC !p!Room on the other side of the hall"],
            ["rotcstore", "Enter the “abandoned” !p!ROTC !p!Store"],
            ["fivekelevatora", "Enter the elevator"],
            ["fivekstairs2a", "Take the stairs"],
            ["fivek2a", "Continue along the hall"],
        ],
    },
    {
        id: "rotc2",
        desc: "You are in a large !s!ROTC !p!classroom. Several uniformed students are in a line, and a stern looking drill sergeant is walking down with a microscope in hand. He is using the device to find and point out microscopic imperfections in the uniforms and screaming while docking points from their inspection score to match.",
        options: [
            ["fivek3a", "Exit to the hall"],
        ],
    },
    {
        id: "rotcstore",
        desc: "You are in the nominally-defunct !p!ROTC !p!Store. Although Drye ordered the destruction of this place several years ago, it is still operating in a shady, unofficial capacity. An ROTC student is selling various military goods and services that could come in handy.",
        options: [
            ["fivek3a", "Exit to the hall and pretend you aren’t involved in this"],
        ],
        jetpack: "Purchase !e!Expiremental !e!Military !e!Jetpack !d!(1 !d!DryeBuk)",
        plane: "Purchase !e!One !e!Time !e!Supersonic !e!Plane !e!Trip !d!(1 !d!DryeBuk)",
    },
    {
        id: "planeride",
        desc: "An !s!Air !s!Force !s!JROTC member escorts you to their !e!Lockheed !e!SR-71 !e!Blackbird parked next to the school buses. You strap in, and they ask where to.",
        options: [
            ["football", "!p!Football !p!field"],
            ["softball", "!p!Softball !p!field"],
            ["baseball", "!p!Baseball !p!field"],
            ["middle", "!p!Student !p!parking !p!lot"],
            ["staffparking5", "!p!Staff !p!parking !p!lot"],
            ["foursevenpath", "Between the !p!400 and the !p!700"],
            ["fourhgym", "Between the !p!400 and the !p!Gym"],
            ["center", "Between the !p!400 and the !p!300"],
            ["courtyard2", "The !p!Courtyard"],
            ["shotdown", "Back of the !p!4000"],
        ],
    },
    {
        id: "shotdown",
        desc: "As your pilot takes off from the !p!bus !p!lot and dashes towards the !p!Four !p!Thousand, a !c!guard on the !p!4000 roof takes notice. He aims his ground-to-air missile launcher directly at you, and fires (The sovereign nation of the !p!4000 does not take kindly to unauthorized invasions into its airspace). Your plane bursts into flames, and you and your pilot plummet to your deaths.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "jetpackpreown",
        desc: "You already own the !e!Jetpack, and this student, although shady at best, wil not stoop so low morally as to trust one person with two jetpacks.",
        options: [
            ["rotcstore", "Continue"],
        ],
    },
    {
        id: "jetpackbroke",
        desc: "“What are you trying to pull?! You don’t even have a single !d!DryeBuk?! I ought to knock your block off!”",
        options: [
            ["rotcstore", "Continue"],
        ],
    },
    {
        id: "jetpackbuy",
        desc: "You have acquired the !e!Jetpack. The !e!Jetpack isn’t strong enough to actually propel you very far above the ground, but will consistantly speed you up. (Press space to skip through dialogue for now on).",
        options: [
            ["rotcstore", "Continue"],
        ],
    },
    {
        id: "jetpackchange",
        desc: "Unfortunately your current supply of !d!DryeBux is too small for it to be possible to make change for a !d!one. Remember that !d!DryeBux only come in !d!threes, !d!sevens, !d!elevens, and !d!one !d!hundred !d!and !d!ones (at least according to !c!Drye that is). You will either need at least three !d!threes or one of any larger bill for the shopkeep to properly be able to make change.",
        options: [
            ["rotcstore", "Continue"],
        ],
    },
    {
        id: "fivekelevatora",
        desc: "You are in the !p!5000 building elevator, on the !f!first !f!floor.",
        options: [
            ["fivek3a", "Exit the elevator"],
            ["fivekelevatorb", "Go to !f!floor !f!2"],
            ["fivekelevatorc", "Go to !f!floor !f!3"],
            ["poolfail", "Hit the button firmly one hundred times at a steady rate of six presses per !t!second"],
        ],
    },
    {
        id: "fivekelevatorb",
        desc: "You are in the !p!5000 building elevator, on the !f!second !f!floor.",
        options: [
            ["fivekelevatora", "Go to !f!floor !f!1"],
            ["fivek3b", "Exit the elevator"],
            ["fivekelevatorc", "Go to !f!floor !f!3"],
            ["poolfail", "Hit the button firmly one hundred times at a steady rate of six presses per !t!second"],
        ],
    },
    {
        id: "fivekelevatorc",
        desc: "You are in the !p!5000 building elevator, on the !f!third !f!floor.",
        options: [
            ["fivekelevatora", "Go to !f!floor !f!1"],
            ["fivekelevatorb", "Go to !f!floor !f!2"],
            ["fivek3c", "Exit the elevator"],
            ["pool1", "Hit the button firmly one hundred times at a steady rate of six presses per !t!second"],
        ],
    },
    {
        id: "poolfail",
        desc: "You seem to have forgotten that the !p!5000 elevator is hard-wired to eject anyone attempting pool access from the !f!first !f!two !f!floors. The elevator shoots up extremely fast, and a hatch is opened at the top. You fly out, and land liquified in the !p!bus !p!lot.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "pool1",
        desc: "The elevator emits a quick sequence of beeps, indicating that it is on the same page as you. You know the next step is to enter a phrase in morse code repeated several times.",
        options: [
            ["poolfail2", "Enter “I LOVE THE BEAGLE”"],
            ["pool2", "Enter “THE BEAGLE IS HOLDING ME HOSTAGE”"],
            ["poolfail2", "Enter “EAST MECK’S FINEST NEWS SOURCE”"],
        ],
    },
    {
        id: "poolfail2",
        desc: "The elevator emits a horrible buzz, and plummets to the ground. You hear the dialing of a three-digit phone number. The door refuses to open. You are trapped.",
        options: [
            ["rankf", "Continue"],
        ],
    },
    {
        id: "pool2",
        desc: "The elevator begins a steady ascent. When it reaches the top, a beautiful bell melody plays. The beauty of the moment is squashed when the door opens and your ears and eyes are accosted by the core of East Meck Evil.",
        options: [
            ["pool3", "Continue"],
        ],
    },
    {
        id: "pool3",
        desc: "You are on the !p!roof of the !p!5000, near the !p!pool. The !p!pool is fizzing and popping, and a great darkness emanates from it, infesting the nearby air and roof. It seems the evil of the !p!pool has already claimed a vessel today: You see another !c!student standing on the roof holding a !d!101 !d!DryeBuk !d!Bill, presumably stolen from the !p!700.",
        options: [
            ["poolexit", "Exit the roof"],
            ["confrontthief", "Confront the thief in an act of Vigilante Justice"],
        ],
    },
    {
        id: "confrontthief",
        desc: "You walk up to the !c!student and ask them if they truly understand the severity of their offense. The !c!student seems unbothered: The !p!pool has clearly destroyed their mind.",
        options: [
            ["poolpush", "Push the student into the pool"],
            ["poolexit", "Leave this wretched place"],
        ],
    },
    {
        id: "poolpush",
        desc: "The student falls into the pool. When they hit the water, they vaporize before your eyes. The only thing left of them is the !d!DryeBuk that comes floating upwards. It seems Drye’s optimism is too powerful for the pool to corrupt.",
        options: [
            ['poolend', 'Continue', ['pool3','poolend']],
        ],
    },
    {
        id: "poolend",
        desc: "You are on the !p!roof of the !p!5000, near the !p!pool. The !p!pool is fizzing and popping, and a great darkness emanates from it, infesting the nearby air and roof. There is a !d!101 !d!DryeBuk !d!Bill on the !p!roof.",
        options: [
            ["poolexit", "Exit the roof"],
        ],
        dryebux: 101,
    },
    {
        id: "poolexit",
        desc: "You enter the elevator, and it brings you down to the !f!third !f!floor.",
        options: [
            ["fivekelevatorc", "Continue"],
        ],
    },
    {
        id: "rotc1",
        desc: "You are in an !s!ROTC classroom that appears to be some kind of !p!strategy !p!room. Old generals with long moustaches and Pickelhaubes are sitting around a large circular table discussing the ongoing situation in the !p!cafeteria !p!lobby. There is a large portrait of !c!Kaiser !c!Wilhelm !c!II on the wall.",
        options: [
            ["fivek3a", "Exit to the hall"],
        ],
    },
    {
        id: "fivekstairs2a",
        desc: "You are on the !f!first !f!floor of the front stairwell of the !p!5000 !p!building. You feel an overwhelming sense of balance in this area.",
        options: [
            ["fivekfront", "Exit the building"],
            ["fivekstairs2b", "Go up the stairs"],
            ["fivek3a", "Continue into the hall"],
        ],
    },
    {
        id: "fivekstairs1b",
        desc: "You are on the !f!second !f!floor of the back stairwell of the !p!5000. As you gaze at the blue stairs infested with small grey impurities, you are extremely grateful for the decision to make the !p!4000 stairs look slightly different. This has saved you from long walks on many occasions when you have gone into the wrong building absent-mindedly.",
        options: [
            ["fivekstairs1a", "Descend the stairs"],
            ["fivekstairs1c", "Ascend the stairs"],
            ["fivek1b", "Continue into the building"],
        ],
    },
    {
        id: "fivek1b",
        desc: "You are on the back end of the !f!second !f!floor of the !p!5000. The back staircase is accessible from here.",
        options: [
            ["rodriguez", "Enter !c!Rodriguez’s !p!Room"],
            ["canon", "Enter !c!Cañon’s !p!Room"],
            ["cristiana", "Enter !c!Cristiana’s !p!Room"],
            ["masongoins", "Enter !c!Mason !c!Goins’s !p!Room"],
            ["fivekstairs1b", "Enter the stairs"],
            ["fivek2b", "Continue down the hall"],
        ],
    },
    {
        id: "cristiana",
        desc: "Your are in !c!Cristiana’s !p!room. The students are attempting to break the record for longest consecutive collective R rolled.  The students are tagging in and out trying to maintain the consonant for as long as possible. They are up to !t!3 !t!days but their tongues are getting tired and the time keeper keeps taking long blinks. They still have about !t!12 !t!more !t!hours until they have broken the record and based on how sleepy they all are you suspect they will not break the record and finally earn East Meck its first !s!Spanish record plaque.",
        options: [
            ["fivek1b", "Exit"],
        ],
    },
    {
        id: "canon",
        desc: "You are in !c!Ms. !c!Cañon’s room. She is discussing her personal list of the greatest songs about moms. She made the controversial move to include !e!“Dear !e!Mama” by Tupac despite never having listened to the song due to her aversion to hip hop.",
        options: [
            ["fivek1b", "Exit, curious about what this implies about the rest of her listens"],
        ],
    },
    {
        id: "masongoins",
        desc: "It seems that !c!Don !c!Travis is having some sort of power trip. He has enlisted several students to go out in the hall and slowly expand the borders separating his classroom from the rest of the !p!5000.",
        options: [
            ["fivek1b", "Exit to the hall"],
        ],
    },
    {
        id: "rodriguez",
        desc: "You are in !c!Ms. !c!Rodriguez’s !s!Spanish !p!Room. The lecture has diverged from linguistics into a general discussion of Spanish-speaking nations. !c!Ms. !c!Rodriguez has brought in several !d!DryeBux as a relatable analogy for the now-defunct !e!Cuban !e!Convertible !e!Peso. Some of the !d!DryeBux were left near the door unguarded.",
        options: [
            ["fivek1b", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fivek2b",
        desc: "You are in the middle of the !f!second !f!floor of the !p!5000. The intense cultural exchange occurring in the hall warms your heart and lights your mind on fire.",
        options: [
            ["chen", "Enter !c!Chen’s !p!Room"],
            ["vazquez", "Enter !c!Vázquez’s !p!Room"],
            ["garcia", "Enter !c!Garcia’s !p!Room"],
            ["fivekdata", "Enter the !p!Data !p!Room"],
            ["fivek1b", "Go towards the back of the building"],
            ["fivek3b", "Go towards the front"],
        ],
    },
    {
        id: "vazquez",
        desc: "You are in !c!Ms. !c!Vazquez’s !p!room. While most of the students are focused on the board to a degree that shouldn’t even be possible, one student doesn’t seem stressed at all. You ask him why he has to be this way, and he whispers to you. “You can’t tell !c!Ms. !c!Vazquez this but I’m actually a native speaker. I just took !s!Spanish !s!I because I wanted an easy A. I have to keep it under wraps though or else they will force me into the advanced class.”",
        options: [
            ["fivek2b", "Exit to the hall and don’t spread any rumors"],
        ],
    },
    {
        id: "garcia",
        desc: "You are in !c!Ms. !c!Garcia’s !p!room. A student is completely stuck on a false cognate that she is using as a crutch to finish her homework. She is completely unreceptive to her peers who are telling her that the word doesn’t mean what she thinks it means, and that her whole answer falls apart as a result.",
        options: [
            ["fivek2b", "Exit to the hall"],
        ],
    },
    {
        id: "fivekdata",
        desc: "The !p!5000 has not yet entered the digital age and so all of the students’ personal data is stored in a giant array of notecards with handwritten text on them. Under each student’s notecard there is a large stack of paper, one for each canvas assignment they have been ordered to complete during their high school career. Several data staff members are rushing around the room with large stamps to mark all assignments as completed when the student finishes them.",
        options: [
            ["fivek2b", "Exit to the hall"],
        ],
    },
    {
        id: "chen",
        desc: "The students in the !s!Chinese !p!room are learning how to differentiate between three words with identical pronunciations and almost indistinguishable uses. One !c!student, who appears to be the source for the bulk of Campus’s !d!Dryebuk !d!supply, hands you an extra.",
        options: [
            ["fivek2b", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fivek3b",
        desc: "You are on the front end of the !f!second !f!floor of the !p!5000. The front stairs and elevator are accessible from here.",
        options: [
            ["msgrube", "Enter !c!Grube’s !p!Room"],
            ["silva", "Enter !c!Silva’s !p!Room"],
            ["beamer", "Enter !c!Beamer’s !p!Room"],
            ["fivekelevatorb", "Enter the elevator"],
            ["fivekstairs2b", "Take the stairs"],
            ["fivek2b", "Continue along the hall"],
        ],
    },
    {
        id: "silva",
        desc: "!c!Ms. !c!Silva is dressed up in a masked superhero costume and keeps referring to herself as the “president of conjugation nation”. It is obviously her but she keeps trying to convince her students that it isn’t. She is running around while students yell “We know it’s you Ms. Silva”",
        options: [
            ["fivek3b", "Leave this place"],
        ],
    },
    {
        id: "beamer",
        desc: "!c!Mr. !c!Beamer isn’t here today. Luckily for his students there is a dispersion list prominently displayed on his wall. It seems his class will be split in a million different directions like when they use four horses running in different directions to execute someone inhumanely. Everyone will be alone and surrounded by strangers for today.",
        options: [
            ["fivek3b", "Exit to the hall"],
        ],
    },
    {
        id: "msgrube",
        desc: "You enter !c!Mrs. !c!Grube’s !p!room. The students appear to reenact one of the darker !c!Grimms !c!brothers’ fairy tales. The students all have scripts in hand and are cautiously reading through the fairy tale as their respective parts. The students have reached a particularly twisted part of the story that you can tell even the depraved mind of the !c!Brothers !c!Grimm felt it might have been too far. The students glance at each other asking are we really doing this. This pause sends !c!Mrs. !c!Grube livid as she had been intently latching on to every passing line as if it was delivered by the best opera singer in the world. She tries to get the show back on track though her preferred method of yelling and throwing things does not seem to motivate the young actors.",
        options: [
            ["fivek3b", "Leave before it gets to intense"],
        ],
    },
    {
        id: "fivekstairs2b",
        desc: "You are on the !f!second !f!floor of the !p!5000’s !p!Front !p!Stairwell. The idea of going up ( in the direction of the !p!rooftop !p!pool ) scares you, but not enough to measurably hinder your movement.",
        options: [
            ["fivekstairs2c", "Bravely ascend"],
            ["fivekstairs2a", "Cowardously descend"],
            ["fivek3b", "Enter the hall"],
        ],
    },
    {
        id: "fivekstairs1c",
        desc: "You are on the !f!third !f!floor of the back stairwell of the !p!5000. Up here, you can feel the negative energy from the !p!rooftop !p!pool quite clearly, drawing a sharp contrast with the near-perfection of the lower floors.",
        options: [
            ["fivekstairs1b", "Descend the stairs back to safety"],
            ["fivek1c", "Enter the dubious hallway"],
        ],
    },
    {
        id: "fivek1c",
        desc: "You are on the back end of the !f!third !f!floor of the !p!5000 !p!building. You can tell from the misery leaking from the !s!business rooms ahead of you that the !p!rooftop !p!pool is right above you. The back stairs are accessible.",
        options: [
            ["uglehus", "Enter !c!Uglehus’s !p!Room"],
            ["hartwell", "Enter !c!Hartwell’s !p!Room"],
            ["fant", "Enter !c!Fant’s !p!Room"],
            ["fivekstairs1c", "Enter the stairs"],
            ["fivek2c", "Continue along the hall"],
        ],
    },
    {
        id: "fant",
        desc: "You are in !c!Mr. !c!Fant’s !p!Room. There is an extremely large version of one of those spiral coin donation spinning funnel vortex donation tunnels. You scrounge around in your pockets for some loose !ec!EddeCoin, and find a few spare. You forgot you had any because they are so useless (current conversion rate about !ec!1,000,000,000 to !d!1, they are less valuable than the cheap plastic they are made of). You drop one of the !ec!coins into the device, and watch as it gracefully spins to the center. Right before it hits the dropoff point !c!Mr. !c!Fant reaches in, grabs the coin, and throws it at you: !e!“Don’t !e!waste !e!your !e!money.”",
        options: [
            ["fivek1c", "Pick it up off the ground and exit to the hall"],
        ],
    },
    {
        id: "uglehus",
        desc: "As you open the door to !c!Mr. !c!Uglehus’s !p!room you are hit with a wave of referrals. It appears that he has transformed his room into a referral ball pit with referrals crumpled floor to ceiling for him and his few subordinate students to play in. The referral balls are draining out of the pit and in just a couple more !t!seconds the whole pit might be empty.",
        options: [
            ["fivek1c", "Close the door before !c!Mr. !c!Uglehus and his students are left beached on the ground in their swim suits waiting to regain their land legs"],
        ],
    },
    {
        id: "hartwell",
        desc: "You are in !c!Mr. !c!Hartwell’s room. The !s!accounting students are sorting several gigantic piles of !d!DryeBux. You consider taking one !d!Buk, but remember that these !s!accounting experts would immediately notice the discrepancy.",
        options: [
            ["fivek1c", "Exit to the hall"],
        ],
    },
    {
        id: "fivek2c",
        desc: "You are in the middle of the !f!third !f!floor of the !p!5000 !p!building. The !c!Parkerisms on the wall offset the sadness induced by the !p!pool to some extent.",
        options: [
            ["potts", "Enter !c!Potts’s !p!Room"],
            ["mcgregor", "Enter !c!McGregor’s !p!Room"],
            ["vaughter", "Enter !c!Vaughter’s !p!Room"],
            ["brantley", "Enter !c!Brantley’s !p!Room"],
            ["pittman", "Enter !c!Pittman’s !p!Room"],
            ["fivek1c", "Go towards the back of the building"],
            ["fivek3c", "Go towards the front"],
        ],
    },
    {
        id: "vaughter",
        desc: "You are in !c!Ms. !c!Vaughter’s !p!Room. The !e!Junior !e!Board, the most powerful board, is meeting here and  discussing different places around campus they can secure income from so they can still benefit from their corruption long after their positions of power are passed on.",
        options: [
            ["fivek2c", "Exit to the hall"],
        ],
    },
    {
        id: "brantley",
        desc: "You are in !c!Mr. !c!Brantley’s !p!room. !c!Brantley is ranting about how all the other classrooms in his hall are losing money while his is turning a profit. “These classes are all in the red. They spend so much on school supplies and get nothing in return. I’m in the black. I only make a purchase if I know I can flip it around to increase the class’s value later.”",
        options: [
            ["fivek2c", "Exit to the hall"],
        ],
    },
    {
        id: "pittman",
        desc: "You are inside !c!Mr. !c!Pittman’s !p!classroom. He is lecturing students on their fundamental misunderstanding of the way in which restaurants function. He explains that they do not just have food already and actually have to purchase it. Though he doesn’t go into it the students assume that the restaurants buy their food from bigger restaurants which only confuses them further.",
        options: [
            ["fivek2c", "Exit the room full of second hand embarrassment"],
        ],
    },
    {
        id: "potts",
        desc: "You are in !c!Ms. !c!Potts’s room. !c!Ms. !c!Potts tilts her head to the side and grins as a gaggle of freshmen recite her home address aloud. The warmup question has been on the board for !t!45 !t!minutes (you are very late at this point). A student raises her hand to ask what the difference between a tuple and a list is. !c!Ms. !c!Potts points at her, eyes narrowing, and tells her that she’ll “look into it”.",
        options: [
            ["fivek2c", "Exit to the hall"],
        ],
    },
    {
        id: "mcgregor",
        desc: "You are in !c!Mr. !c!McGregor’s room. There are a few students working on a likely illegal computer program that hijacks printers around campus to print an excessive quantity of !d!DryeBux. A student rushes in with some of the !d!Bux, and offers one to you. !c!Mr. !c!McGregor is beginning to regret previously referring to these troublemakers as “good people”.",
        options: [
            ["fivek2c", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fivek3c",
        desc: "You are in the front of the !f!third !f!floor of the !p!5000 !p!building. The weight of the unholy !p!pool water above you is crushing. There are stairs and an elevator here. The large window on the wall is completely coated with a thick, dark mat of cobwebs.",
        options: [
            ["oates", "Enter !c!Oates’s !p!Room"],
            ["young", "Enter !c!Young’s !p!Room"],
            ["fivekstairs2c", "Enter the stairs"],
            ["fivekelevatorc", "Use the elevator"],
            ["fivek2c", "Continue along the hall"],
        ],
    },
    {
        id: "young",
        desc: "You enter !c!Madame !c!Young’s room. There is a large pile of crêpes that are topped with all manner. French club is laying down against the wall holding their stomachs. It appears their eyes were bigger than their stomachs. !c!Madame !c!Young is still happily trudging along through the crêpes having eaten a quarter of them. A tall chiseled presidential figure offers you a deal. “We need to finish all these crêpes before !c!Madame !c!Young gets here. Can you help? We will give you !d!7 !d!DryeBux.”",
        options: [
            ["youngcrepe", "Sure"],
            ["fivek3c", "No"],
        ],
    },
    {
        id: "youngcrepe",
        desc: "You are generally good at following authority but these crêpes are testing your blind obedience. You jump right into the pile and start chipping away but there are so many. !s!French club must have been at this for !t!hours because the pile is almost as tall as you are. ",
        options: [
            ["youngcrepe2", "Keep eating"],
        ],
    },
    {
        id: "youngcrepe2",
        desc: "You feel disgusted with yourself. It feels like you have been at this eating the stack for !t!hours but in reality it has only been about a !t!minute. !s!French club is growing almost as impatient as they are full. !c!Young is going to be here soon and if there is a single crêpe left on the ground she will go ballistic. ",
        options: [
            ["youngcrepe3", "Keep eating"],
        ],
    },
    {
        id: "youngcrepe3",
        desc: "You are down to maybe three more crêpes but you feel physically unable to eat anymore. You just to crunch them into a tiny ball and hold them in your mouth but your body automatically spits them out on the ground. Eventually, !c!Madame !c!Young finally arrives. “Crêpes I love those !s!French delicacies.” She pops the saliva covered bread ball into her gullet and swallows. Almost in slow motion !s!French clubs yell for her to not to do it. “ Mmm that is really. Good very !s!French. ” “That was so good I will give you !d!11 !d!DryeBux for it.”",
        options: [
            ['fivek3c', 'Leave', ['young','youngpostcrepe']],
        ],
        dryebux: 11,
    },
    {
        id: "youngpostcrepe",
        desc: "!c!Madame !c!Young is incredibly grateful for the crêpe you gave her.",
        options: [
            ["fivek3c", "Leave"],
        ],
    },
    {
        id: "oates",
        desc: "!c!Mr. !c!Oates immediately jumps into conversation with you. He explains that he really hates this hall, but that he isn’t allowed on the much nicer !f!lower !f!floors because the language he teaches is dead, and would thus suck the liveliness out of the other language classes surrounding him.",
        options: [
            ["fivek3c", "Exit to the hall"],
        ],
    },
    {
        id: "fivekstairs2c",
        desc: "You are on the !f!top !f!floor of the front staircase of the !p!5000. If you were misinformed enough to wish to visit the !p!rooftop !p!pool, you couldn’t even enter it this way. You’de have to take the elevator.",
        options: [
            ["fivekstairs2b", "Descend the stairs"],
            ["fivek3c", "Enter the hall"],
        ],
    },
    {
        id: "fivekside1",
        desc: "You are at the Grimier side of the !p!Five !p!Thousand. The ground is at a 45 degree angle, and there is a staircase upon the incline to compensate.",
        options: [
            ["center2", "Go towards the back of the building"],
            ["threeh3", "Enter the !p!Three !p!Hundred"],
            ["trap1", "Enter a grassy region that will certainly lead through to the other side of campus"],
            ["fivekside2", "Go towards the !p!Bus !p!Lot"],
        ],
    },
    {
        id: "trap1",
        desc: "You are in a large, grassy region bounded by the !p!100 and !p!300 !p!buildings on either side. From here, it looks like you can get through to the other side of campus if you continue towards the !p!Student !p!Parking !p!Lot.",
        options: [
            ["trap2", "Continue with the goal of getting through"],
            ["fivekside1", "Turn back"],
        ],
    },
    {
        id: "trap2",
        desc: "You have been tricked. The !p!200, and reality, smack you in the face: There is no way through here. The only thing left to do is enjoy the well-taken care of greenery in this small region.",
        options: [
            ["schedule", "Check your schedule so you can get back on track"],
            ["trap1", "Turn around dejectedly"],
        ],
    },
    {
        id: "threeh3",
        desc: "You are at the end of the !p!Three !p!Hundred, the furthest extent of the tentacles of the !p!Old !p!Building. Looking one way, you see a door leading to the outside of the !p!5000. Looking the other way, you see nothing but unfamiliar faces and subject-ambiguous classrooms.",
        options: [
            ["esl3", "Enter !c!Cochrane's !p!Room"],
            ["esl1", "Enter !c!Roberts's !p!Room"],
            ["esl2", "Enter !c!Cohen's !p!Room"],
            ["esl3", "Enter !c!Costas's !p!Room"],
            ["fivekside1", "Exit to the outside"],
            ["threeh2", "Continue down the hall"],
        ],
    },
    {
        id: "esl1",
        desc: "You are in an !s!English !c!as !s!a !s!second !c!language !c!classroom . The students seem to be coming along great. They really seem to be getting a hand on the !s!english and are pretty much experts. They are holding an open mic event where students gets !t!five !t!minutes to do some they have been working on all quarter stand up. A lot of the students have solid fundamentals but their content is just not that relatable.",
        options: [
        ],
        back: "Exit",
    },
    {
        id: "esl2",
        desc: "You are in an !s!English !c!as !s!a !s!second !s!language !p!classroom . The students' progress is coming along nicely. They are all gathered around a large ancient tomb and seem to be attempting to unencrypt whatever ancient secrets it holds within its pages. They all are holding magnifying glasses to the text and closely examining every character. Anything could be a clue.",
        options: [
        ],
        back: "Exit",
    },
    {
        id: "esl3",
        desc: "You are in an !s!English !c!as !c!a !c!Second !c!language !p!classroom . The students are spray painting a brick wall with various phrases they have picked up from their lessons. Though a lot of the phrases do not make complete sense in graffiti form due to the script of the letters no one who wasn’t paying an extraordinary amount of attention would realize. ",
        options: [
        ],
        back: "Exit",
    },
    {
        id: "threeh2",
        desc: "You are in the middle of the unfamiliar !p!300 !p!hall. You are bombarded with faces you have never seen, and you can’t tell the subjects of any of the classrooms except !c!Mr. !c!Zurhellen’s, who has evidently been banished to here. A teacher you have never seen waves at you. You wave back, assuming that they must have been your computer lab teacher in 2nd grade.",
        options: [
            ["zurhellen", "Enter !c!Zurhellen’s !p!Room"],
            ["speizman", "Enter !c!Speizman’s !p!Room"],
            ["bowman", "Enter !c!Bowman’s !p!Room"],
            ["esl1", "Enter !c!Feldstein’s !p!Room"],
            ["threeh3", "Walk towards the !p!5000"],
            ["threeh1", "Walk towards !p!Student !p!Services"],
        ],
    },
    {
        id: "speizman",
        desc: "You are in !c!Mr. !c!Speizman’s !p!Room. The students are participating in what could only be described as a reverse auction. There is only one buyer -- you -- but every student in the class is competing with each other to sell you the same thing -- a bite of the !e!most !e!extreme !e!food. ",
        options: [
            ["extremebite", "Ask about the food"],
            ["threeh2", "Leave"],
        ],
    },
    {
        id: "extremebite",
        desc: "One extremely eager student comes up to you and explains. “The food is combination of the world’s !e!spiciest, !e!sweetest, !e!saltiest, !e!sourest, !e!bitterest, and most !e!umami foods. The flavors constructively interfere to completely numb your tastebuds.”",
        options: [
            ["speizman", "Not for me, way too extreme"],
        ],
    },
    {
        id: "bowman",
        desc: "You enter !c!Mr. !c!Bowman’s !p!room . He is counting a large stack of money he got from his latest settlement !p!Charlotte’s latest new cafeteria style food hall. He represented himself against the food court’s large team of highly paid attorneys and yet with nothing but his own merit he managed to get them to give him an ungodly amount of money in damages. He does have a black eye that was clearly given to him by !c!Mr. !c!Watts who doesn’t like the idea of an East Meck staff member having deeper pockets than him.",
        options: [
            ["threeh2", "Exit"],
        ],
    },
    {
        id: "zurhellen",
        desc: "!c!Mr. !c!Zurhellen is pacing around anxiously, and chewing his gum at a faster rate than usual. You are worried that he is moving too fast for the pencil behind his ear to stay put, and this puts you on edge too.",
        options: [
            ["askzurhellen", "Ask what’s up"],
            ["threeh2", "Exit into the hall"],
        ],
    },
    {
        id: "askzurhellen",
        desc: "!c!Zurhellen explains that he is paranoid about !c!Mr. !c!Majak stealing his !e!teaching !e!style. He says that he used to be right next to !c!Majak on the !p!4300 !p!hall, but moved here to avoid this. Now, he says, !c!Majak has bought a telescope to eavesdrop on him.",
        options: [
            ["askzurhellen2", "Continue"],
        ],
    },
    {
        id: "askzurhellen2",
        desc: "!c!Zurhellen says that he will pay !d!Eleven !d!DryeBux to anyone who can destroy !c!Mr. !c!Majak’s telescope, freeing him from constant surveillance.",
        options: [
            ['zurhellen', 'Continue', ['telescope','telescope2']],
        ],
    },
    {
        id: "zurhellen2",
        desc: "!c!Mr. !c!Zurhellen is infinitely grateful for your destruction of !c!Majak’s telescope. His gum-chewing has slowed down to a more typical pace. He hands you the promised !d!Eleven !d!DryeBux.",
        options: [
            ["threeh2", "Exit into the hall"],
        ],
        dryebux: 11,
    },
    {
        id: "threeh1",
        desc: "You are in the !p!Three !p!Hundred, near an intersection. The !p!tech !p!depot that students once flocked to as a safe haven free from bugs and glitches can no longer accommodate the raving masses, as !c!Mr. !c!Henley has been displaced from his original location by a space-hungry marketing teacher, and is now forced to reside in a small closet.",
        options: [
            ["techdepot", "Enter the miniscule !p!Tech !p!Depot"],
            ["woindrich", "Enter !c!Woindrich’s !p!Room"],
            ["durante", "Enter !c!Durante’s !p!Room"],
            ["esl2", "Enter !c!Lintz’s !p!Room"],
            ["johnson4", "Enter !c!Johnson’s !p!Room"],
            ["threeway", "Walk to the intersection"],
            ["threeh2", "Walk deeper into the !p!300"],
        ],
    },
    {
        id: "durante",
        desc: "It appears that !c!Durante is out and in their place is a substitute teacher who goes by the moniker of !c!Ms. !c!B. She appears to be rehearsing a choreographed speech which will introduce herself to the class as well as establish a clear power structure for the upcoming 90 minute period. Despite all the clear benefits she still seems reluctant to fully commit to the speech and recites it reluctantly as if someone is forcing her to.",
        options: [
            ["threeh1", "Exit"],
        ],
    },
    {
        id: "johnson4",
        desc: "You are in !c!Mr. !c!Johnson’s !p!room. There is a big security scanner that is producing a feed of the classroom that has been turned surreal. He comes over and says to you, “Hey, the smartest !s!phojo student got my trumpet confused with a camera and broke it trying to take pictures. I don’t trust any of my students to fix it so could you go fix it. I will give you !d!11 !d!DryeBux if you do.”",
        options: [
            ['johnson42', 'Sure', ['bandoff','bandoffjohnson']],
            ["threeh1", "No, leave"],
        ],
    },
    {
        id: "johnson42",
        desc: "!c!Mr. !c!Johnson gave you his trumpet. It is basically just a pile of dust and shrapnel. Now you need to find some place to fix it.",
        options: [
            ['threeh1', 'Leave', ['johnson4','johnson42']],
        ],
    },
    {
        id: "bandoffjohnson",
        desc: "You take this as the perfect place to fix !c!Mr. !c!Johnson’s trumpet. There are floor to ceiling shelves full of every instrument fixing tool you could ever need. You grab a couple of clamps and some sort of adhesive and just kinda mix it together with the trumpet dust until it turns vaguely trumpet shaped. !c!Mr. !c!Johnson is going to love it.",
        options: [
            ['orchband', 'Exit into the !p!Band !p!room', ['johnson42','johnson43']],
            ['choir', 'Exit into the !p!Choir !p!room', ['johnson42','johnson43']],
        ],
    },
    {
        id: "johnson43",
        desc: "You give !c!Mr. !c!Johnson the new trumpet. He is so grateful that he accepts the sticky mess. He blows in it and it makes some half hearted notes. “Oh yeah that's that beautiful horn I love.” He hits the valves a couple times making it look a thousand times more difficult than it should be. “Oh I almost forgot, here’s your money, kid.”",
        options: [
            ["threeh1", "Leave"],
        ],
        dryebux: 11,
    },
    {
        id: "woindrich",
        desc: "You are in !c!Mr. !c!Woindrich’s room. There is not an unusual amount of equipment in here, but what is here is extremely spread out, almost as if the teacher running this place wants to use the most of his newly-acquired space. You still see remnants of the old tech depot -- a pile of screwdrivers of various sizes and end types, a few bottles of grease for oiling the laptop interiors.",
        options: [
            ["threeh1", "Exit to the hall"],
        ],
    },
    {
        id: "techdepot",
        desc: "You see !c!Mr. !c!Henley shoved in a tiny closet filled with Chromebooks in various states of health. You have to duck under a rack of broken chargers in order to fit in the room. This room is fit for no coordinator. There is a small portrait of !c!Jean !c!Baudrillard hung on what would be the only empty part of the wall.",
        options: [
            ["threeh1", "Exit before you get too sad"],
        ],
    },
    {
        id: "techdepot2",
        desc: "!c!Mr. !c!Henley is extremely excited. He explains how his recent technological research has revealed that we are living in a simulation. He also says he was able to hack the simulation, and can therefore make anything quantitative that he wants to happen, happen.",
        options: [
            ['techdepot3', 'Ask for !d!101 !d!DryeBux', ['techdepot','techdepot3']],
            ["threeh1", "Exit into the hall"],
        ],
    },
    {
        id: "techdepot3",
        desc: "!c!Henley utilizes his simulation-hacking skills to produce the requested !d!DryeBux. The crampedness of his room is becoming less and less crushing by the !t!minute with his new discovery.",
        options: [
            ["threeh1", "Exit into the hall gleefully"],
            ["techdepot4", "Tell him you are the one who created this simulation"],
        ],
        dryebux: 101,
    },
    {
        id: "techdepot4",
        desc: "!c!Henley does not believe you. “What you are effectively saying is that you are the master of this world”, he explains. He says you must prove that you are all-powerful for him to believe you.",
        options: [
        ],
        resize: "Continue",
    },
    {
        id: "subgameresize",
        desc: "You figure you could prove your omnipotence to !c!Henley’s character and progress in the game if you resized the game window.",
        options: [
        ],
        resize2: "Resize the game window",
    },
    {
        id: "techdepot5",
        desc: "!c!Henley immediately feels even more cramped than he already did in this tiny room. He knows that the window containing the simulation he is in must have been shrunk, and that you (or rather the !c!player controlling you) must have been the one to do it.",
        options: [
            ["techdepot6", "Tell him to hack into the simulation and destroy it"],
        ],
    },
    {
        id: "techdepot6",
        desc: "“You are asking me to destroy East Meck? To destroy the !e!World?” He is hesitant at first, but then realizes that you, a cosmic being from his perspective, could subject him to eternal torture if he failed to comply.",
        options: [
            ["techdepot7", "Continue"],
        ],
    },
    {
        id: "techdepot7",
        desc: "!c!Henley starts frantically typing at his computer, hitting several keys but mostly the oversized “DELETE” one. He stops typing, and",
        options: [
        ],
        destroy: "...",
    },
    {
        id: "techdepot1a",
        desc: "You see !c!Mr. !c!Henley shoved in a tiny closet filled with Chromebooks in various states of health. You have to duck under a rack of broken chargers in order to fit in the room. This room is fit for no coordinator.",
        options: [
            ["threeh1", "Exit before you get too sad"],
            ["techdepot2a", "Tell !c!Henley he is living in a simulation that you created"],
        ],
    },
    {
        id: "techdepot2a",
        desc: "!c!Henley does not believe you. “What you are effectively saying is that you are the master of this world”, he explains. He says you must prove that you are all-powerful for him to believe you. It seems the !c!player controlling you will have to copy the strategy that you used in the game back in the !p!4000.",
        options: [
        ],
    },
    {
        id: "fivekside2",
        desc: "You are on a flat concrete plane that wraps around the South-East Corner of the !p!Five !p!Thousand.",
        options: [
            ["oneh2", "Enter the !p!One !p!Hundred"],
            ["trap1", "Enter a grassy region that will certainly lead through to the other side of campus"],
            ["fivekside1", "Go towards the back of the building"],
            ["fivekfront", "Go to the front of the building"],
            ["buslotside", "Go towards Monroe"],
        ],
    },
    {
        id: "buslotside",
        desc: "You are under an incredibly complex network of steel, and above a similarly complex web of concrete. The ground is sloped in every direction.",
        options: [
            ["fivekside2", "Go to the side of the !p!5000"],
            ["cranny100office", "Go to the nook between the !p!Office and the !p!100"],
        ],
    },
    {
        id: "cranny100office",
        desc: "You are in a very tight nook between the !p!Front !p!Office and the !p!One !p!Hundred !p!Hall. You can tell this is one of the most stylish spots on campus. There is a large tree by the wall, and under the tree you spot some !d!DryeBux.",
        options: [
            ["buslotside", "Walk towards the !p!bus !p!lot"],
        ],
        dryebux: 7,
    },
    {
        id: "fivekfront",
        desc: "You stand outside the front of the !p!5000. You can just barely smell the pungent fumes of incredible food from the nearby culinary rooms. You are fascinated by the inaccurate !e!“500 !e!BUILDING” sign that has somehow stood the test of time. Students are coming out in droves from the buses.",
        options: [
            ["fivekstairs2a", "Enter the building"],
            ["fivekside2", "Walk around the building, towards the !p!One !p!Hundred"],
            ["scaffolding", "Continue down the sidewalk towards the !p!4000"],
        ],
    },
    {
        id: "scaffolding",
        desc: "You stand near the front of the !p!5000. You lament the loss of the avant-garde scaffolding that used to stand at this spot. In olden times, you could continue down the sidewalk further and enter the !p!4000. Now that the !p!4000 is encased in a huge fence, the only way through is all the way around to the other side of the !p!5000.",
        options: [
            ["fivekfront", "Turn back"],
        ],
    },
    {
        id: "fnfenter1",
        desc: "You enter through the barbed revolving doors. The barbing is painful, but you know that it is necessary for state security.",
        options: [
            ["fnf1", "Continue"],
        ],
    },
    {
        id: "fnfexit1",
        desc: "You exit through the barbed revolving doors. You are relieved to leave this poorly-conceived intermediary.",
        options: [
            ["fivekback", "Continue"],
        ],
    },
    {
        id: "fnf1",
        desc: "You stand on the !p!5000 side of the !p!495000. There is a long line of people waiting to have their passport scanned to enter the !p!Four !p!Thousand. The classrooms have all been moved to the new upstairs to accommodate the ever-growing passport checking operation.",
        options: [
            ["fnfstairwell", "Enter the shiny new stairwell"],
            ["fnfexit1", "Escape to the classrooms of old"],
            ["fnfpass1", "Attempt to pass though to the other side"],
        ],
    },
    {
        id: "fnfpass1",
        desc: "You enter the passport line. After what feels like an eternity, you are finally second in line. The person in front of you is expelled for having out of date documentation. You walk up to the stand, and present your state-issued ID. It clears. You walk through to the !p!4000 side.",
        options: [
            ["fnf3", "Continue"],
        ],
    },
    {
        id: "fnfstairwell",
        desc: "You stand in the brand new !p!495000 stairwell. Pieces of the wall are still missing, highlighting how !c!Parker is rusty on school maintenance.",
        options: [
            ["fnf1", "Go downstairs"],
            ["fnf2", "Go upstairs"],
        ],
    },
    {
        id: "fnf2",
        desc: "You stand in East Meck’s most peaceful hallway, now decorated with !c!Parker memorabilia in addition to the older symbols of unity.",
        options: [
            ["gardening", "Enter the !s!Gardening !p!classroom"],
            ["meditation", "Enter the !s!Meditation !p!classroom"],
            ["scissorless", "Enter the !s!Scissorless !s!Crafts !p!room"],
            ["fnfstairwell", "Go down the stairs"],
        ],
    },
    {
        id: "gardening",
        desc: "You stand in the tranquil !s!Gardening room. The air is full of spores and pollen, which would compromise the peaceful atmosphere if not for the fact that N95 masks have been distributed amongst the students, preventing any earsplitting sneezes.",
        options: [
            ["fnf2", "Exit into the hall"],
        ],
    },
    {
        id: "meditation",
        desc: "You tiptoe into the dead-silent !s!Meditation room, avoiding making a scene. A carefully-arranged array of students with crossed legs and closed eyes sit before you.",
        options: [
            ["fnf2", "Slowly creep back into the hall"],
        ],
    },
    {
        id: "scissorless",
        desc: "You stand in the innovative !s!Scissorless !s!Crafts room. You observe the carefree students handling their projects fearlessly, knowing any potentially dangerous sharp points are far out of reach.",
        options: [
            ["fnf2", "Gleefully waltz back into the hall"],
        ],
    },
    {
        id: "fnf3",
        desc: "You stand on the !p!4000 side of the !p!495000. There is a lonely passport-checking station that hasn’t seen any customers yet (people have no reason to leave the !p!4000 at this time).",
        options: [
            ["fourkback", "Exit to the back of the !p!4000 building"],
            ["fnfpass2", "Scan your passport to get to the other side"],
        ],
    },
    {
        id: "fnfpass2",
        desc: "You brighten up the customs officer’s day by being their first assignment. Your passport clears without an issue.",
        options: [
            ['fnf1', 'Continue', ['fnfpass2','fnfpass3']],
        ],
    },
    {
        id: "fnfpass3",
        desc: "The lonely customs officer looks up from their desk with a smile, excited for finally another customer. But their smile immediately fades when they see that it’s just you again. They let you through without an additional scan.",
        options: [
            ["fnf1", "Continue"],
        ],
    },
    {
        id: "fourkback",
        desc: "You are outside the back of the !p!4000. You are cramped due to the very small distance between the building and the barbed wire fence that encloses it. The only way out of this enclosure is through the !p!495000.",
        options: [
            ["fourkenter", "Enter the !p!Four !p!Thousand"],
            ["fnf3", "Escape via the !p!495000"],
        ],
    },
    {
        id: "fourkenter",
        desc: "Since you are so late at this point, you need to wait for someone to let you in. After about !t!five !t!minutes, a kindhearted student slowly approaches the door, and eventually opens it.",
        options: [
            ["fourkstairs1a", "Continue"],
        ],
    },
    {
        id: "fourkstairs1a",
        desc: "You are on the !f!first !f!floor of the !p!4000 back stairwell. You can feel what you would interpret as wind if you weren’t painfully aware of the giant booming fans down the hall.",
        options: [
            ["fourkback", "Exit the building"],
            ["fourkstairs1b", "Go up the metallic stairs"],
            ["fourk1a", "Enter the hall"],
        ],
    },
    {
        id: "fourk1a",
        desc: "You are on the !f!first !f!floor of the !p!4000, towards the back stairwell. Peering into the classrooms, you are at once delighted and flummoxed by the novelty clocks rejecting simple numerals in favor of complex mathematical expressions. Your delightment fades when the whirring of the giant fans is turned up a notch.",
        options: [
            ["koppe", "Enter !c!Koppe's !p!Room"],
            ["bennett", "Enter !c!Bennett's !p!Room"],
            ["forney", "Enter !c!Forney's !p!Room"],
            ["fourkstairs1a", "Enter the stairs"],
            ["fourk2a", "Continue down the hall"],
            ["maze", "Enter strange hole in the wall"],
        ],
    },
    {
        id: "bennett",
        desc: "You are in !c!Bennett’s !p!room. The students are cutting and folding paper into paper boxes based on proportions individually assigned to them. They have been given the length they need to to make the box as big as possible and are succeeding. The boxes are huge and the room is beginning to fill up. There might not be room for all the students as the boxes have almost entirely taken up the room.",
        options: [
            ["fourk1a", "Exit"],
        ],
    },
    {
        id: "koppe",
        desc: "You are in !c!Coach !c!Koppe’s room. On the wall, there is a large map of a standard baseball field, but from the surrounding foliage and small trailers you can tell it is specifically the East Meck one. In the center of the field, there is a large radiation hazard symbol. Clearly something about this location is important to !c!Koppe’s coaching.",
        options: [
            ["fourk1a", "Exit to the hall"],
        ],
    },
    {
        id: "maze",
        desc: "You go through the opening into a small hall. The hall has a single turn before a dead end. It seems like this is as far as !c!Drye’s huge maze project has extended. !c!Drye better watch his back for boulders.",
        options: [
            ["fourk1a", "Exit"],
        ],
    },
    {
        id: "forney",
        desc: "You are in !c!Ms. !c!Forney’s room. You notice a routine wherein every time !c!Ms. !c!Forney looks away a certain !c!student rushes up to the front and places a !d!DryeBuk !d!Bill on her desk. This seems to be getting on her nerves, and she would likely be grateful for someone to take some off her hands.",
        options: [
            ["fourk1a", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fourk2a",
        desc: "You are in the middle of the !f!first !f!floor of the !p!4000. There are gigantic fans on the ceiling that are turned up to the max. Walking towards the middle of the hall is very physically difficult, as the fans are constantly working to push you away.",
        options: [
            ["biwota", "Enter !c!Biwota's !p!Room"],
            ["fletcher", "Enter !c!Fletcher's !p!Room"],
            ["boone", "Enter !c!Boone's !p!Room"],
            ["fourk1a", "Walk towards the back of the building"],
            ["fourk3a", "Walk towards the front"],
        ],
    },
    {
        id: "biwota",
        desc: "You are in !c!Biwota’s !p!room. The students have just finished their master last of every shape that you can make with bubbles. They are now bored because they’re not sure what they’re even supposed to do now that the classification is complete. One student suggests that they rigorously prove that this is for sure all the shapes you can make with bubbles but the idea is shot down immediately because it would be nearly impossible.",
        options: [
            ["fourk2a", "Exit"],
        ],
    },
    {
        id: "fletcher",
        desc: "You are in !c!Fletcher’s !p!room. She is in a hazmat suit and is having the place heavily sanitised. She is deathly allergic to nonfreshman students. Although these extra accommodations seem inconvenient she is one of the greatest at teaching freshmen alive and is incredibly brave for risking having her blood curdle and then fall out everyday just to impart !s!math knowledge to freshman students.",
        options: [
            ["fourk2a", "Exit"],
        ],
    },
    {
        id: "boone",
        desc: "Before you can completely step into the room !c!Ms. !c!Boone runs up to you and hands you a piece of paper. It looks like you will need to complete a !e!pop !e!quiz before you can enter.",
        options: [
            ["boonequiz", "Try the quiz"],
            ["fourk2a", "Don’t even try"],
        ],
    },
    {
        id: "boonequiz",
        desc: "The first and only question on the quiz reads: “If you had a nickel for every cent in a dollar except one of them, how many cents would you have?”",
        options: [
            ["booneright", "495"],
            ["boonewrong", "4950"],
            ["boonewrong", "49500"],
            ["boonewrong", "495000"],
        ],
    },
    {
        id: "boonewrong",
        desc: "She snatches the paper from you and tears it up, subsequently slamming the door in your face. You will not be allowed back here.",
        options: [
            ['fourk2a', 'Continue', ['boone','ban']],
        ],
    },
    {
        id: "booneright",
        desc: "A wide smile comes over !c!Ms. !c!Boone’s face. You have succeeded. She escorts you into the room, which is filled to the brim with elite students who got their respective pop quiz questions correct as well.",
        options: [
            ['boone2', 'Continue', ['boone','boone2']],
        ],
    },
    {
        id: "boone2",
        desc: "You are in !c!Ms. !c!Boone’s room. There are many smart students here, each wearing smug expressions on their faces. One of the students has left their !d!DryeBux on the desk while they went over to talk about advanced topics to one of their esteemed colleagues. They wouldn’t notice if you took it.",
        options: [
            ["fourk2a", "Exit to the hall"],
        ],
        dryebux: 7,
    },
    {
        id: "fourk3a",
        desc: "You are on the front end of the !f!first !f!floor of the !p!4000. Giant fans are whirring down the hall, but a nearby elevator or set of stairs could provide an escape from the whirring.",
        options: [
            ["barbee", "Enter !c!Barbee's !p!Room"],
            ["freiberg", "Enter !c!Freiberg's !p!Room"],
            ["sawyer", "Enter !c!Sawyer's !p!Room"],
            ["fourkstairs2a", "Enter the stairs"],
            ["fourkelevator", "Enter the elevator"],
            ["fourk2a", "Walk to the fans"],
        ],
    },
    {
        id: "freiberg",
        desc: "You are in !c!Ms.!c!Freiberg’s room. She is facing away from you and quietly whispering positive affirmations to herself. As you quietly walk closer you realize she is polishing her !e!golden !e!eagle award which appeared to have been smudged by some rebellious student trying to get revenge on their well awarded math teacher. She is now silently weeping into the trophy which is not helping the smudged look.",
        options: [
            ["fourk3a", "Exit"],
        ],
    },
    {
        id: "sawyer",
        desc: "You see !c!Mrs. !c!Sawyer standing at a large podium quasi-rhythmically blowing into a harsh whistle. There is a table of !s!AP !s!Statistics students who are sorting sweet treats and regional delicacies into jars corresponding to the treat’s colors. Once a jar is filled up all of the students are forced according to !c!Mrs. !c!Sawyer’s demand to eat up the tasty treat. The students resist for a !t!few !t!seconds and are reminded that they are some of the luckiest in the school and that !s!Analysis students would kill for this type of pampering, so they choke down more disgustingly sweet pastries.",
        options: [
            ["sawyer2", "Attempt to free the students"],
            ["fourk3a", "Run free before you are taken in"],
        ],
    },
    {
        id: "sawyer2",
        desc: "You figure the best way to destroy the system is from the inside so you grab a seat at the table. You quickly fall into the swing of the sorting. It is fun to get your hands dirty for once but then the yellow pastry jar reaches its fill line and you remember why you came here. The students are hesitant to eat yet another helping and you are left to eat the bulk of the jar.",
        options: [
            ["sawyerfail", "Eat the pastries"],
            ["sawyer3", "Don’t eat the pastries and stand up to !c!Mrs !c!Sawyer"],
        ],
    },
    {
        id: "sawyer3",
        desc: "As you continue to not eat the pastry !c!Mrs. !c!Sawyer grows more and more frustrated. She blows her whistle louder and louder until it is a near ear breaking blast but you manage to not be worn down. By this point she gets down from her podium and is circling you as her face grows red from the large quantity of air she has to force through the small hole. After a !t!couple !t!of !t!minutes of tooth rattling blast she passes out on the ground exhausted. A cheer erupts from the crowd of students and they toss you some !d!DryeBux as a reward for your work.",
        options: [
            ['sawyersucess', 'Continue', ['sawyer','sawyersucess']],
        ],
    },
    {
        id: "sawyersucess",
        desc: "The students have now trapped !c!Mrs. !c!Sawyer in a cage assembled from left over pastries. It is almost less humane than a regular cage because it gives you the option to get out on your own but you would have to chew through about a foot of abhorrent baked goods. That being said this is a classic example of the punishment fitting the crime as !c!Mrs. !c!Sawyer had the students in a similar lose-lose hellscape. Your !d!DryeBux are waiting for you.",
        options: [
            ["fourk3a", "Leave the class room with your head held high"],
        ],
        dryebux: 11,
    },
    {
        id: "sawyerfail",
        desc: "You stuff your face with pastries and feel disgusted by your own gluttony but you do not relent as you chose this fate for yourself. You disdainfully choke down bite after bite and feel yourself slowly inflating with flaky dough and cream puff. There is probably a moral in there somewhere but you are too stuffed to realize it or even to walk.",
        options: [
            ["sawyerfail2", "Continue"],
        ],
    },
    {
        id: "sawyerfail2",
        desc: "You spend all your time rotting away sorting more delights and don’t even hear the bell ring.",
        options: [
            ["rankf", "Oh well"],
        ],
    },
    {
        id: "barbee",
        desc: "You are in !c!Ms. !c!Barbee’s room. You are bombarded with posters that recontextualize your current situation. A particular post of a disgusting looking dog finally puts the pieces together for you. !e!You !e!are !e!not !e!trying !e!make !e!it !e! !e!to !e!first !e!block. If you were, you would be there already. There is something that you are avoiding, some reason you don’t want to go, maybe it is that you are not powerful enough in the East Meck ecosystem yet. !c!Ms. !c!Barbee, always quick to help out a student in need (especially when they are crying and drooling on her nice Persian rug) gives you some !d!Drye !d!Bux. Maybe these will help.",
        options: [
            ["fourk3a", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fourkstairs2a",
        desc: "You are on the !f!first !f!floor of the front !p!4000 stairs. The artificial feeling of the building is making it hard to maintain your focus. You wonder why the stairwell is so empty compared to the bustling nature of the floors within.",
        options: [
            ["fourkstairs2b", "Go up the stairs"],
            ["fourk3a", "Enter the hall"],
            ['fourkfront', 'Exit the building', ['fourkstairs2a','fourkstairs3a']],
        ],
    },
    {
        id: "fourkstairs3a",
        desc: "You are on the !f!first !f!floor of the front !p!4000 stairs. The artificial feeling of the building is making it hard to maintain your focus. The stairwell is completely empty.",
        options: [
            ['fourkstairs3b', 'Go up the stairs', ['fourkstairs2c','fourkstairs3c']],
            ['fourk3a', 'Enter the hall', ['fourkstairs2c','fourkstairs3c']],
            ['fourkfront', 'Exit the building', ['fourkstairs2c','fourkstairs3c']],
        ],
    },
    {
        id: "fourkfront",
        desc: "You now see why the stairwell was so empty. The front entrance to the building is completely blocked by the large fence that surrounds the building. You will have to go through the !p!495000 on the other side to get through.",
        options: [
            ['fourkstairs3a', 'Continue', ['fourkstairs2b','fourkstairs3b']],
        ],
    },
    {
        id: "fourkstairs1b",
        desc: "You are on the !f!second !f!floor of the !p!4000 back stairwell. The painful odor of rubbing alcohol burns your sinuses, and cuts through your focus the way Drye cuts through pessimism.",
        options: [
            ["fourkstairs1c", "Go up the stairs"],
            ["fourkstairs1a", "Go down the stairs"],
            ["fourk1b", "Enter the hall"],
        ],
    },
    {
        id: "fourk1b",
        desc: "You are on the back end of the !f!second !f!floor of the !p!4000. All of the classrooms are boarded up with large planks of wood except that of !c!Ms. !c!Halbison. The stairs are accessible from here. You are the only student in the hall, and it is dead silent.",
        options: [
            ["halbison", "Enter !c!Ms. !c!Halbison’s !p!Room"],
            ["thompson", "Pry your way into !c!Thompson’s door"],
            ["fourkstairs1b", "Enter the stairs"],
            ["fourk2b", "Continue down the hall"],
        ],
    },
    {
        id: "thompson",
        desc: "This room is full of students. The students are cramped in desks on one side of the room. The other side of the room is taken up by two large refrigerators: A blue refrigerator labeled “Bananas” and a red refrigerator labeled “Mayonaisse”.",
        options: [
            ["fourk1b", "Exit to the hall"],
        ],
    },
    {
        id: "halbison",
        desc: "You are in !c!Ms. !c!Halbison’s room. There is a poster on the wall including several repetitions of the phrase “UNC Chapel Hill” and the name !c!“Lucas” dotted around. On the back of the poster, there is a !d!DryeBuk that has been stashed away. The class is completely empty.",
        options: [
            ["fourk1b", "Exit to the hall"],
        ],
        dryebux: 3,
    },
    {
        id: "fourk2b",
        desc: "You are in the middle of a long metallic hall, specifically the !f!second !f!floor of the !p!4000. There are several classrooms here but they are all boarded up with large wooden planks. On some of the planks, messages such as “gone fishing” have been engraved and/or written in sharpie. You are the only student in the hall, and it is dead silent.",
        options: [
            ["ellett", "Pry your way into !c!Ellett’s door"],
            ["mcfarland", "Pry your way into !c!McFarland’s door"],
            ["jarman", "Pry your way into !c!Jarman’s door"],
            ["fourk1b", "Go towards the back of the building"],
            ["fourk3b", "Go towards the front"],
        ],
    },
    {
        id: "ellett",
        desc: "You are in !c!Mr. !c!Ellett’s !p!room. The students are competing with each other to see who can formulate the most symmetrical graph. The graphs on the table are all already obnoxiously symmetric (thirty, fortyfold rotational symmetry) but the students have not lost steam yet and are still plowing ahead to a singularity. They are pushing the limits for what counts as not being a circle.",
        options: [
            ["fourk2b", "Leave"],
        ],
    },
    {
        id: "mcfarland",
        desc: "Inside !c!McFarland’s !p!room the students are working on writing their once in a course creative writing assignment. She seems to be grading them very harshly as if there is some sort of objective way to evaluate art. Marking up the paper explaining the students’ failings in establishing strong characters and how unrealistic most of the stories are. Although the notes are very harsh it is still refreshing to see some honesty in the literary criticism landscape.",
        options: [
            ["fourk2b", "Exit"],
        ],
    },
    {
        id: "fourk3b",
        desc: "You are on the front end of the !f!second !f!floor of the !p!4000. All the classrooms here are boarded up with wooden planks. The walls, floor, and ceiling are all made of a reflective metal. You see yourself in the reflection and shudder. The elevator is accessible through here, as well as the front stairwell. You are the only student in the hall, and it is dead silent.",
        options: [
            ["cooper", "Pry your way into !c!Cooper’s door"],
            ["conyers", "Pry your way into !c!Conyers’s door"],
            ["woodcock", "Pry your way into !c!Woodcock’s door"],
            ["edde", "Pry your way into !c!Edde’s door"],
            ["fourkelevator", "Enter the elevator"],
            ["fourkstairs2b", "Take the stairs"],
            ["fourk2b", "Continue down the hall"],
        ],
    },
    {
        id: "woodcock",
        desc: "You are in !c!Ms. !c!Woodcock’s !p!room. You can still see the faint outline of a unit circle diagram on the wall but it is obscured by about a hundred students crammed into the room. !c!Ms. !c!Woodcock is standing on a table to tower above the crowd and is shouting orders through a megaphone. She is consolidating several !s!math classrooms into one and simultaneously sending out students to give advice to nearby teachers.",
        options: [
            ["fourk3b", "Run"],
        ],
    },
    {
        id: "conyers",
        desc: "You are in !c!Ms. !c!Conyers’s room. Her !s!IB !s!Applications students are developing a mathematical model of how information is passed down from the principal down to administrators and all the way down to the students. They have just made a startling discovery -- a cycle. One of the administrators gets their information from their kid who also goes to East Meck. This means that some information coming down from the district gets stuck in an infinite loop and never gets updated. The students are currently trying to figure out how this issue can be resolved.",
        options: [
            ["fourk3b", "Leave"],
        ],
    },
    {
        id: "edde",
        desc: "You are in !c!Special !c!Governor !c!Edde’s office. !c!Edde is leaning back on the wall, with his arms outstretched. His hands are embedded into the structure and you can’t tell where the bricks end and his flesh begins. He is breathing heavily and the room is flexing and creaking to match.",
        options: [
            ["fourk3b", "Exit to the hall"],
        ],
    },
    {
        id: "jarman",
        desc: "You are in !c!Mr. !c!Jarman’s room, which is currently hosting the !e!top-secret !e!D&D !e!club. The members of the club have broadened their horizons and are engaging in a friendly match of East Meck: !e!the !e!RPG.",
        options: [
            ["jarman2", "Join in"],
            ["fourk3b", "Exit to the hall"],
        ],
    },
    {
        id: "jarman2",
        desc: "You seat yourself down at one of the numerous purpose-bought !e!EMRPG computers. You load up the game, and begin. (Use “q” to quit the game)",
        options: [
        ],
        meta: "Continue",
    },
    {
        id: "gamequit",
        desc: "You exit the extremely fun game. Your head starts spinning with the potential complexities introduced by recursion in your daily life.",
        options: [
            ["jarman", "Continue"],
        ],
    },
    {
        id: "gamequit2",
        desc: "A PDF file of the crossword opens in a new tab. Because you are unfamiliar with !c!Mr. !c!Jarman’s computers, you accidentally close the game while trying to close the PDF. Oh well.",
        options: [
            ["jarman", "Continue"],
        ],
    },
    {
        id: "gamequit3",
        desc: "You exit the extremely fun game. You really, really want to see !c!Mr. !c!Henley at the !p!Tech !p!Depot.",
        options: [
            ["jarman", "Continue"],
        ],
    },
    {
        id: "gamecrash",
        desc: "The game crashes. It seems that the game world was completely destroyed. You feel a sudden urge to see !c!Mr. !c!Henley.",
        options: [
            ['jarman', 'Continue', ['techdepot','techdepot1a']],
        ],
    },
    {
        id: "gamecrash2",
        desc: "The game crashes. It seems that the game world was completely destroyed. You remember why you wanted to go see !c!Mr. !c!Henley so bad today.",
        options: [
            ["jarman", "Continue"],
        ],
    },
    {
        id: "cooper",
        desc: "!c!Mr. !c!Cooper is hiding behind his desk, hoping for nobody to come in. As you look closer at him, you see that most of his body is encased in some kind of sarcophagus. He knows you are in here but tries to not make eye contact. He has a chart on the wall ranking the various kinds of !s!math question he asks on the Scoville scale for spiciness.",
        options: [
            ["fourk3b", "Exit to the hall"],
        ],
    },
    {
        id: "fourkstairs2b",
        desc: "You are on the !f!second !f!floor of the front !p!4000 stairs. You feel the antiseptic qualities of the sterilized slabs of concrete that they call “stairs”. You wonder why the stairwell is completely empty, in sharp contrast to the halls above and below you.",
        options: [
            ["fourkstairs2a", "Descend the stairs"],
            ["fourkstairs2c", "Ascend the stairs"],
            ["fourk3b", "Enter the building"],
        ],
    },
    {
        id: "fourkstairs3b",
        desc: "You are on the !f!second !f!floor of the front !p!4000 stairs. You feel the antiseptic qualities of the sterilized slabs of concrete that they call “stairs”. The stairwell is completely empty.",
        options: [
            ["fourkstairs2a", "Descend the stairs"],
            ["fourkstairs2c", "Ascend the stairs"],
            ["fourk3b", "Enter the building"],
        ],
    },
    {
        id: "fourkstairs1c",
        desc: "You are on the !f!third !f!floor of the !p!4000 back stairwell. There is a long line at the small hand-washing station that the top of the stairs is equipped with. The sterilizing ultraviolet lights around the room are giving you a migraine.",
        options: [
            ["fourkstairs1b", "Go down the stairs"],
            ["fourk1c", "Enter the hall"],
        ],
    },
    {
        id: "fourk1c",
        desc: "You are on the back side of the !f!third !f!floor of the !p!4000. The hall is fairly busy, and the crowd of students is constantly required to reorganize itself to allow room for the janitor who is spreading a soapy cleaning substance all over the pristine floor. The back stairs are accessible from here.",
        options: [
            ["hill", "Enter !c!Hill’s !p!Room"],
            ["mook", "Enter !c!Mook’s !p!Room"],
            ["jacobs", "Enter !c!Jacobs’ !p!Room"],
            ["inabinett", "Enter !c!Inabinett’s !p!Room"],
            ["fourkstairs1c", "Enter the stairs"],
            ["fourk2c", "Continue down the hall"],
        ],
    },
    {
        id: "hill",
        desc: "You are in !c!Ms. !c!Hill’s !p!room. The students are forming their district-mandated !e!social !e!contract. !c!Hill asks for the first character trait to be included, and all the students shout out “Respect”! She keeps writing check marks next to the word respect to account for all the redundancy but the paper is too small and so it runs off the side and eventually the sharpie starts staining the wall permanently.",
        options: [
            ["fourk1c", "Exit"],
        ],
    },
    {
        id: "inabinett",
        desc: "You are in !c!Inabinett’s !p!room. The students are in a heated socratic seminar. They are ripping each other into tiny little strips in the marketplace of ideas. They all feel like they are failing to get their point across and that everyone else is dominating them causing them only to get more aggressive with their topics and stances because after all !e!war !e!has !e!no !e!winners.",
        options: [
            ["fourk1c", "Exit"],
        ],
    },
    {
        id: "mook",
        desc: "You are in !c!Ms. !c!Mook. There appears to be some sort of mock comic con happening with students exchanging various prints from their respective fandoms. !c!Mook is participating and seems to be absolutely taking down the house. She is negotiating with the young artists to get memorabilia from some of her favorite fandoms for seemingly just a few pennies and springs found in her pockets. You try to explain to these starving artists that their work is worth more than !c!Ms. !c!Mook’s pocket lint but they insisted that this is a better this way.",
        options: [
            ["fourk1c", "Leave, dejected"],
        ],
    },
    {
        id: "jacobs",
        desc: "You are in !c!Ms. !c!Jacobs’ room. You are enchanted by the extremely high-quality social contract installation, which provides a sharp contrast to the flimsy paper-and-pen sheets in the other rooms you’ve been to. The swarm of hummingbirds surrounding the legal obligations is a beautiful reminder of the eternal peace between Staff and Student.",
        options: [
            ["fourk1c", "Exit to the hall"],
        ],
    },
    {
        id: "fourk2c",
        desc: "You are in the middle of the !f!third !f!floor of the !p!4000. The floor is very shiny, and the ceiling feels so thin that it is in danger of ripping open, but you know the steel supports would never allow for such an unsanitary breach of this hermetically sealed floor. Students are coming in droves from the back staircase and filling up all of the rooms.",
        options: [
            ["laing", "Enter !c!Laing’s !p!Room"],
            ["folk", "Enter !c!Folk’s !p!Room"],
            ["majak", "Enter !c!Majak’s !p!Room"],
            ["sanders1", "Enter !c!Sanders’s !p!Room"],
            ["fourk1c", "Go towards the back of the building"],
            ["fourk3c", "Go towards the front"],
        ],
    },
    {
        id: "sanders1",
        desc: "You are in !c!Ms. !c!Sanders’s class. Her !s!English students are in the process of being completely flummoxed by the !e!Voynich !e!Manuscript. They can’t make heads or tails of the bizarre botanical illustrations and the script is completely indecipherable to them.",
        options: [
            ["fourk2c", "Exit to the hall"],
        ],
    },
    {
        id: "laing",
        desc: "You step foot into a tropical paradise. The walls are made of palm leaves grafted together and the students are sipping out of coconuts. The sun is beating down on you but once you dip your feet into the small model ocean in the corner you are cooled down.",
        options: [
            ["fourk2c", "Exit to the hall"],
        ],
    },
    {
        id: "folk",
        desc: "!c!Mr. !c!Folk is taking a big pile of !c!Drye’s updated Springboard books (with the new phonological changes) down to the dump. He refuses to teach from these “revisionist” sources.",
        options: [
            ["fourk2c", "Exit to the hall"],
        ],
    },
    {
        id: "majak",
        desc: "You are in !c!Mr. !c!Majak’s room. !c!Majak is looking through a telescope that he has pointed out of his window towards !c!Mr. !c!Zurhellen’s room in the !p!300. He has a notebook and is frantically jotting down notes, mumbling “write that down, write that down”.",
        options: [
            ["telescope", "Ask to use the telescope"],
            ["fourk2c", "Exit to the hall"],
        ],
    },
    {
        id: "telescope",
        desc: "You ask !c!Majak to borrow his telescope. He says yes but that you need to return it quickly so he doesn’t miss anything important.",
        options: [
            ["telescoperoof", "Look at the !p!roof of the !p!five !p!thousand"],
            ["telescopeparking", "Look at the !p!Staff !p!Parking !p!Lot"],
        ],
    },
    {
        id: "telescope2",
        desc: "You ask !c!Majak to borrow his telescope. He says yes but that you need to return it quickly so he doesn’t miss anything important.",
        options: [
            ["telescoperoof", "Look at the !p!roof of the !p!five !p!thousand"],
            ["telescopeparking", "Look at the !p!Staff !p!Parking !p!Lot"],
            ['telescopesmash', 'Smash the telescope on the ground', ['zurhellen','zurhellen2']],
        ],
    },
    {
        id: "telescopesmash",
        desc: "You throw the telescope on to the floor, destroying it immediately. !c!Majak is furious that his plot has been foiled. You have been permanently banned from this room.",
        options: [
            ['fourk2c', 'Continue', ['majak','ban']],
        ],
    },
    {
        id: "telescoperoof",
        desc: "You point the telescope at the !p!5000 !p!rooftop. While the !p!pool is invisible from this angle, you know it is there. Next to where the !p!pool should be, you see a !c!deranged !c!student holding a small !d!rainbow-colored !d!strip.",
        options: [
            ["majak", "Continue"],
        ],
    },
    {
        id: "telescopeparking",
        desc: "You point the telescope at the corner of the !p!staff !p!parking !p!lot. You see a !c!shifty-looking !c!teacher leaning on an activity bus. The !c!teacher is also fairly spectral in appearance and may or may not be a ghost.",
        options: [
            ["majak", "Continue"],
        ],
    },
    {
        id: "fourk3c",
        desc: "You are at the front end of the !f!third !f!floor of the !p!4000. You stop and think about how far you’ve come. Before you get too nostalgic, you remember you still need to get to !p!first !p!block. Stairs and an elevator are accessible here. This side of the hall is less busy than the back.",
        options: [
            ["baldwin", "Enter !c!Baldwin’s !p!Room"],
            ["comer", "Enter !c!Comer’s !p!Room"],
            ["rose", "Enter !c!Rose’s !p!Room"],
            ["kinney", "Enter !c!Kinney’s !p!Room"],
            ["fourkelevator", "Enter the elevator"],
            ["fourkstairs2c", "Enter the stairs"],
            ["fourk2c", "Continue down the hall"],
        ],
    },
    {
        id: "baldwin",
        desc: "You are in !c!Ms. !c!Baldwin’s room. A !c!student in an inverted baseball cap is frantically writing down !c!Taylor !c!Swift lyrics on a general-purpose whiteboard by the door.",
        options: [
            ["fourk3c", "Exit to the hall"],
        ],
    },
    {
        id: "comer",
        desc: "You are in !c!Mr. !c!Comer’s !p!Room. You feel educated as you study the posters that explain the optimal way to apologize. You think you might try the strategy out later today in !s!Chemistry. You also glimpse at the military-style bathroom passes hung on the wall, and appreciate the rigor of this classroom.",
        options: [
            ["fourk3c", "Exit to the hall"],
        ],
    },
    {
        id: "rose",
        desc: "You are in the !p!command !p!room for the entire !s!English department. You see a folder full of various iterations of !c!Drye’s new alphabet, and !c!Ms. !c!Rose is sorting them into the categories “feasible” and “infeasible”.",
        options: [
            ["fourk3c", "Exit to the hall"],
        ],
    },
    {
        id: "kinney",
        desc: "This is your !e!First !e!Block. If you enter now, you will have no time to explore more before class starts and you put your phone in your backpack and put your backpack on the wall.",
        options: [
            ["fourk3c", "Keep exploring"],
        ],
        end: "Seat yourself in !e!First !e!Block",
    },
    {
        id: "fourkstairs2c",
        desc: "You are on the !f!third !f!floor of the front !p!4000 stairs. You wonder why the stairwell is completely empty, in sharp contrast to the hall in front of you. There are strange drains dotted throughout the floor to soak up the residual cleansing soap.",
        options: [
            ["fourkstairs2b", "Descend the stairs"],
            ["fourk3c", "Enter the building"],
        ],
    },
    {
        id: "fourkstairs3c",
        desc: "You are on the !f!third !f!floor of the front !p!4000 stairs. The stairwell is completely empty due to the lack of a usable entrance on this side. There are strange drains dotted throughout the floor to soak up the residual cleansing soap.",
        options: [
            ["fourkstairs3b", "Descend the stairs"],
            ["fourk3c", "Enter the building"],
        ],
    },
    {
        id: "fourkelevator",
        desc: "Unfortunately the elevator door is locked. You have heard rumors however that the !p!5000 elevator is usually kept unlocked.",
        options: [
        ],
        back: "Continue",
    },
    {
        id: "driversed1",
        desc: "You wake up in a daze, surrounded by students in desks. Some teacher is lecturing in the front of the room about the various penalties for driving past a stopped schoolbus at various speeds. The teacher points at you to answer a question: “If you are driving at below ten above the speed limit, have illicit drugs in the trunk, and drive past a schoolbus that just stopped in the opposite direction, how long will your license be suspended for?”",
        options: [
            ["driversed2", "6 months"],
            ["driversed2", "12 months"],
            ["driversed2", "18 months"],
            ["driversed2", "24 months"],
        ],
    },
    {
        id: "driversed2",
        desc: "Before the words can leave your mouth, you wake up. It seems like it was all a dream. But when you move to exit through the door out the trailer, you see nobody standing outside. It seems you slept through the day.",
        options: [
            ["rankf", "Continue"],
        ],
    },
];

let game;

addEventListener('load', async (event) => {
    let ismobile = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) ismobile = true;})(navigator.userAgent||navigator.vendor||window.opera);


    const canvas = document.querySelector("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
    canvas.style.width = sizemult * width + "px";

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "100px Courier Prime, courier, monospace";
    ctx.fillText("LOADING (Turn Audio On)", 0, 100);

    await Promise.all(
        images.concat(sounds).map((a) => new Promise((resolve) => a.complete ? resolve() : a.addEventListener("load", resolve)))
    );

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "100px Courier Prime, courier, monospace";
    ctx.fillText("CLICK2BEGIN (Audio On)", 0, 100);

    await new Promise(resolve => canvas.addEventListener("click", resolve));

    game = new Game(1, canvas);
    if (ismobile) {
        fontSize = 100;
        lineHeight = 100;
        const mobileRoom = new Room({
            id: "mobile",
            desc: "You wake up from a nightmare. In the nightmare, you were at school trying to play East Meck: !e!the !e!RPG on your phone. !c!Drye walked in to observe your class and caught you, and took your phone. In real life, you would always play on a computer with a !e!keyboard.",
            options: [],
        });
        game.enterRoom(mobileRoom);
    }

    setInterval(() => {
        ctx.clearRect(0, 0, width, height);
        const sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
        canvas.style.width = sizemult * width + "px";
        requestAnimationFrame(() => game.draw(ctx, 0, 0, width, height));
    }, 1000/fps);
    addEventListener("keydown", (event) => {
        game.handleKey(event.key, event);
    });
    canvas.addEventListener("click", (event) => {
        game.handleClick();
    });
    game.handleResize();
    addEventListener("resize", (event) => {
        game.handleResize(event.key);
    });
});
