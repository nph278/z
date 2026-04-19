// Hi Reid

// Link from game page
// Trailer
// Reverse dialectic
// Zdshr is occuring in media center
// Ascii art of east meck photos
// Slightly late for class
// Choose item to take out of scanner
// Textual effects: Fonts, colors, italics, size, animation, ...
// Lots of info/stats everywhere
// (CSS?) Backgrounds for different regions
// Effects: Animated random caps, shaking, ripple
// Mobile?
// Music
// Sfx
// forgot if a day or b day
// Characterize the reader
// Phrase everything like TZG manual
// Grime meter
// Worthiness meter
// "The most heartwrenching East Meck story to date"
// "Interactive Story"
// Automatically remove all error room options, and log each occurance.

"use strict";

const fontSize = 50;
const lineHeight = fontSize;
const lineWaverHeight = fontSize * .1;
const lineWaverRate = 0.001;
const spaceSize = fontSize / 3;
const wps = 10;
const width = 1500;
const height = 1000;
const hmargin = 5;
const vmargin = 5;
const fps = 30;
const cooldown = 1000;
const circleRate = 0.003;
const circleRR = 0.1;
const parityOffset = 0.1;

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
            this.color = "green";
            break;
        case "e":
            // Emphasis
            this.addFontStyle("italic");
            break;
        case "c":
            // Character
            this.addFontStyle("bold");
            this.color = "red";
            break;
        case "s":
            // Subject
            this.addFontStyle("bold");
            this.color = "pink";
            this.effects.push("circle");
            break;
        case "id":
            // Subject
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
        case "t":
            // Time
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "yellow";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        default:
            console.log("bad spec: " + spec);
        }
    }
}

class TextPosition {
    constructor(startX, startY, maxX, maxY) {
        this.x = startX;
        this.y = startY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    newLine() {
        this.x = 0;
        this.y += lineHeight + lineWaverHeight * Math.sin(lineWaverRate * Date.now());
    }

    shiftRight(n) {
        this.x += n;
    }

    overflow(n) {
        return this.x + n > this.maxX;
    }
}

class TextSegment {
    constructor(text, parity) {
        this.style = new TextStyle();
        this.parity = parity || false;
        if (text[0] === "!") {
            const spec = text.split("!")[1];
            text = text.split("!")[2];
            this.style.applySpec(spec);
            this.text = text;
        } else {
            this.text = text;
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
        this.segs = str.split(" ").map((s, i) => new TextSegment(s, i % 2 === 1));
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

class RoomOption {
    constructor(id, desc, n) {
        this.id = id;
        this.text = new Line(desc);
        this.text.prependWord("!o![" + (n + 1) + "]");
    }

    draw(ctx, pos, words) {
        this.text.draw(ctx, pos, words);
    }
}

// east meck reference
class Room {
    constructor(spec) {
        this.id = spec.id;
        this.desc = new Line(spec.desc);
        this.options = spec.options.map((o, i) => new RoomOption(o[0], o[1], i));
    }

    draw(ctx, elapsed) {
        const pos = new TextPosition(0, 0, width, height);
        const words = Math.floor(wps * elapsed / 1000);
        this.desc.draw(ctx, pos, words);
        pos.newLine();
        this.options.forEach((o) => o.draw(ctx, pos, words));

        const idPos = new TextPosition(spaceSize, height - 2 * lineHeight, width, lineHeight);
        const s = new TextSegment("!id!" + this.id);
        s.draw(ctx, idPos);
    }
}

// Kahoot?
class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        this.enterRoom("start");
    }

    enterRoom(id) {
        if (id in rooms) {
            this.room = rooms[id];
        } else {
            this.backRoom = this.room;
            alert("Not implemented");
        }
        this.roomEnterTime = Date.now();
    }

    get elapsedTime() {
        return Date.now() - this.roomEnterTime;
    }

    draw() {
        this.ctx.clearRect(0, 0, width, height);
        const sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
        this.canvas.style.width = sizemult * width + "px";

        this.room.draw(this.ctx, this.elapsedTime);
    }

    handleKey(k) {
        if (this.elapsedTime > cooldown && "123456789".includes(k)) {
            const n = (+k) - 1;
            if (n < this.room.options.length) {
                this.enterRoom(this.room.options[n].id);
            }
        }
    }
}

const roomSpecs = [
    {
        id: "start",
        desc: "Another !e!day, another !e!Meck. (Use the number keys to make choices)",
        options: [
            ["intro1", "Continue"],
        ],
    },
    {
        id: "intro1",
        desc: "You wake up fifteen minutes later than you usually do. Luckily you walk to school, so you won't miss the bus.",
        options: [
            ["intro2", "Get ready quickly so as not to be late"],
            ["leisure", "Get ready at exactly the same speed you usually do"],
        ],
    },
    {
        id: "leisure",
        desc: "You take your sweet time getting ready. By the time you leave the house, it’s already !t!7:15. Failure.",
        options: [
            ["start", "Start from the beginning of time"],
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
        desc: "It’s !t!7:07. You arrive at the !p!Student !p!Parking !p!Lot. You need to choose what to take out of your bag as you pass through the scanner.",
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
        desc: "A security guard in a deep blue uniform probes your backpack for any unauthorized equipment. None is found, and you are off the hook. For now.",
        options: [
            ["middle", "Continue"],
        ],
    },
    {
        id: "scannerpass",
        desc: "You effortlessly glide through the security scanner, with no extraneous beeps emitted by the hi-tech obelisks.",
        options: [
            ["middle", "Continue"],
        ],
    },
    {
        id: "middle",
        desc: "You stand at the !p!central !p!crossroads. The !p!media !p!center, !p!student !p!parking !p!lot, and !p!600 !p!building are all within reach.",
        options: [
            ["sixh1", "Enter the !p!Six !p!Hundred"],
            ["media", "Walk towards the !p!media !p!center"],
            ["studentlot", "Walk towards the !p!parking !p!lot."],
            ["courtyardoutside", "Walk towards the !p!courtyard."],
            ["splitoutside", "Walk towards the !p!400 !p!Split"],
        ],
    },
    {
        id: "media",
        desc: "You stand under the steel canopy around the entrance to the !p!Media !p!Center. The media center is closed. You know this because of a big, clearly hastily-written poster on the door explaining the presence of “Work-keys” testing inside. Despite the claim, you see what looks to be a fashion show occurring inside. It seems the only style fit for the contestant will be absolute maximalism.",
        options: [
            ["middle", "Walk toward the !p!central !p!security !p!scanners."],
            ["mediaside", "Walk around to the side of the !p!Media !p!Center."],
        ],
    },
    {
        id: "studentlot",
        desc: "You stand at the boundary of the !p!student !p!parking-lot. Your eyes become lost in the dense variety of vehicles. You snap back to reality and realize you cannot progress this way, as leaving campus now would be an explicit violation of the Student Code of Conduct.",
        options: [
            ["middle", "Turn back before it is too late"],
        ],
    },
    {
        id: "sixh1",
        desc: "You stand at the most beloved end of the !p!Six-Hundred. You look ahead into the depths of the building, and see what looks to be some kind of party occurring further down.",
        options: [
            ["orch", "Enter the !s!Orchestra !p!Room"],
            ["choir", "Enter the !s!Choir !p!Room"],
            ["bartkowiak", "Enter !c!Bartkowiak’s !p!Classroom"],
            ["roberts", "Enter !c!Roberts’ !p!Classroom"],
            ["dunn", "Enter !c!Dunn’s !p!Classroom"],
            ["cellocloset", "Enter the !p!cello !p!storage !p!closet."],
            ["sixh2", "Continue along the hall"],
        ],
    },
    {
        id: "orch",
        desc: "You stand in the center of the vast !s!Orchestra !p!room. The floor is littered with cellos, each with their respective end-pin protruding dangerously. The sun bounces off the intricate matrix of trophies and blinds you temporarily.",
        options: [
            ["courtyardoutside", "Walk outside the exterior door."],
            ["orchcloset", "Walk into the !p!orchestra !p!closet."],
            ["sixh1", "Leave into the !p!Six !p!Hundred !p!hall"],
        ],
    },
    {
        id: "courtyardoutside",
        desc: "You stand in a particularly familiar subregion of the East Meck Outdoors. The conveniently labeled doors to the !s!Orchestra and !s!Choir !p!rooms present one avenue of opportunity, while the industrial deep blue of the !p!Courtyard entrance presents another.",
        options: [
            ["courtyard", "Enter the !p!Courtyard."],
            ["orch", "Enter the !s!Orchestra !p!Room."],
            ["choir", "Enter the !s!Choir !p!Room."],
            ["middle", "Walk outwards, towards the !p!central !p!scanners."],
        ],
    },
    {
        id: "splitoutside",
        desc: "You stand under a steel roof. The dingy !p!400 !p!split and the nonspecific !p!300 !p!building are available through the two directions parallel to the canopy. On the perpendicular side of things, the outdoor region enclosed by East’s buildings continues further.",
        options: [
            ["threeh1", "Enter the !p!Three !p!Hundred"],
            ["split", "Enter the !p!Split"],
            ["middle", "Walk towards the !p!Student !p!Parking !p!Lot"],
            ["outsidestairs", "Take the stairs towards the !p!Thousands"],
            ["slope", "Descend the gravel slope"],
        ],
    },
    {
        id: "slope",
        desc: "As you brave the sheer cliff-face, you hear the whirring of the gigantic air conditioning unit beside you. Bats are flying out of the red brick chimney. Water is leaking onto the ground from some unidentifiable sub-apparatus.",
        options: [
            ["fivekoutside", "Go towards the classrooms of the future"],
            ["splitoutside", "Go towards the classrooms of yesteryear"],
        ],
    },
    {
        id: "fivekoutside",
        desc: "You are outside of the !p!Five !p!Thousand. You look up, and see the opposing forces of East Meck colliding and annihilating one another, creating a safe haven below.",
        options: [
            ["fivek1", "Enter the !p!Five !p!Thousand"],
            ["oneh1", "Enter the !p!One !p!Hundred"],
            ["slope", "Ascend the cliff face"],
            ["outsidestairs", "Take the stairs instead"],
            ["fnfenter1", "Continue into the 495000"],
        ],
    },
    {
        id: "fnfenter1",
        desc: "You enter through the barbed revolving doors. The barbing is painful, but you know this is necessary for state security.",
        options: [
            ["fnf1", "Continue"],
        ],
    },
    {
        id: "fnfexit1",
        desc: "You exit through the barbed revolving doors. You are relieved to leave this poorly-conceived intermediary.",
        options: [
            ["fivekoutside", "Continue"],
        ],
    },
];

const rooms = {};

roomSpecs.forEach(spec => {
    const r = new Room(spec);
    rooms[r.id] = r;
});

addEventListener('load', (event) => {
    const game = new Game();
    game.draw();
    setInterval(() => {
        game.draw();
    }, 1000/fps);
    addEventListener("keydown", (event) => {
        game.handleKey(event.key);
    });
});
