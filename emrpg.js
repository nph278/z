// Hi Reid

// Link from game page
// Trailer
// Reverse dialectic
// Make sure no rooms were left out (look at python log)
// Diagram dump (posters?)
// Lots of info/stats everywhere. More text effets
// Effects: Animated random caps, shaking, ripple
// (CSS?) Backgrounds for different regions (goals?). East meck photos?
// More (animated) visual effects generally
// Mobile?
// Music
// Sfx - Room enter, Dryebux get, Reset
// forgot if a day or b day
// Characterize the reader
// More grime
// Grime meter
// Worthiness meter
// "The most heartwrenching East Meck story to date"
// "Interactive Story"
// "The East Meck Game of the most Magnitude"
// "East Meck" lower case cursive. "The RPG" upper case serifs.
// "[n] unique regions". Repeatedly use that number "[n] ... Xthings"
// Splitscreen of many rooms for trailer
// Parse better: Caps, trailing spaces after colon.
// Characterize the reader
// Handle more than 10 options. Font size adjusting.
// Characters give you quests
// Wait for someone to open the door at 4k since you are so late at that point
// People switching the 400 rooms from earth science to health and vice versa repeatedly
// Proper resetting
// Extensive Playtest
// Look through all previous articles
// Show game to incoming freshman as practice for the real Meck
// No standing zones
// First quarter next year, in a ypotetical world wher East Meck wasn't destroyed
// Chemical Storage Room
// Testing coordinator room
// Teacher lounges
// Game ends when you get to 1st block
// Super bad ending where you didn't finish
// Instructions/Description
// Checking your schedule is like savepoints
// Detect softlocks
// Timeline split like tape was split like 400 building was split.
// God is more powerful?
// Tape ends with the tape being split across the timelines.
// Zdshr is a cycle like east meck is a cycle;;; Cycle = meckroller
// Look through guidlines doc section.
// Dialogue text effect
// Price: Sliwa and Cheney
// Better opening line
// Copier?: Link to crossword pdfs
// Fourkstairs2: Wonder why so empty. Its becase the exit runs straight into the fence and so is useless.
// Pool
// More dryebux
// Vision in patio blocked by 900
// 900
// Elevators
// Someone pays you off to stay silent about what they are doing
// Trailer areas super sandy
// Sports fields
// Someone stole the poster's 101 dryebuk

"use strict";

const fontSize = 50;
const lineHeight = fontSize;
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
const keys = "1234567890abcdefghijklmnopqrstuvwxyz";

const images = [];
const makeImage = (filename) => {
    const image = new Image();
    image.src = "./emrpg/" + filename;
    images.push(image);
    return image;
};

const imageDryebux3 = makeImage("dryebux3.png");
const imageDryebux7 = makeImage("dryebux7.png");
const imageDryebux11 = makeImage("dryebux11.png");
const imageDryebux101 = makeImage("dryebux101.png");

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
            this.color = "green";
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
        case "t":
            // Time
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "yellow";
            this.addFontStyle("bold");
            this.fontSize *= 1.1;
            break;
        case "f":
            // Floor
            this.fontFamily = "Alegraya Sans, sans-serif";
            this.color = "blue";
            this.fontSize *= 0.8;
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

class Action {
    constructor(type, args) {
        this.type = type;
        if (type === "room") {
            this.id = args[0];
            this.onetime = args[1] === true;
            this.replace = Array.isArray(args[1]) && args[1].length === 3 && args[1];
            this.replace2 = Array.isArray(args[1]) && args[1].length === 2 && args[1];
        } else if (type === "dryebux") {
            this.dryebux = args[0];
        } else if (type === "hint") {
        } else if (type === "reset") {
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
        this.options = spec.options.map((o) => new RoomOption(new Action("room", [o[0], o[2]]), o[1]));
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
        if (spec.hint !== undefined) {
            this.options.push(new RoomOption(new Action("hint", []), spec.hint, this.options.length));
            this.hasHint = true;
        }
    }

    draw(ctx, elapsed) {
        const pos = new TextPosition(0, 0, width, height);
        const words = Math.floor(wps * elapsed / 1000);
        this.desc.draw(ctx, pos, words);
        pos.newLine();
        this.options.forEach((o, i) => o.draw(ctx, pos, words, i));
    }
}

// Kahoot?
class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        this.rooms = {};
        roomSpecs.forEach(spec => {
            const r = new Room(spec);
            this.rooms[r.id] = r;
        });

        this.items = [];
        this.enterRoomId("start");
        this.dryebux = 0;
    }

    enterRoom(r) {
        this.room = r;
        this.roomEnterTime = Date.now();
    }

    enterRoomId(id) {
        if (id in this.rooms) {
            this.enterRoom(this.rooms[id]);
        } else {
            alert("Not implemented: " + id);
        }
    }

    get elapsedTime() {
        return Date.now() - this.roomEnterTime;
    }

    draw() {
        this.ctx.clearRect(0, 0, width, height);
        const sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
        this.canvas.style.width = sizemult * width + "px";

        this.room.draw(this.ctx, this.elapsedTime);

        let goal;

        if (["start", "leisure", "intro1", "intro2"].includes(this.room.id)) {
            goal = "!g!Get !g!to !g!School";
        } else if (this.room.id.slice(0, 6) === "sludge" && this.room.id !== "sludge1") {
            goal = "!g!Deliver !g!the !g!Sludge";
        } else if (this.room.id.slice(0, 8) === "busdrive") {
            goal = "!g!Recruit !g!students";
        } else if (["tunnel4", "dodgeleft", "dodgeright", "jump", "duck"].includes(this.room.id)) {
            goal = "!g!Defeat !g!Parker";
        } else {
            goal = "!g!Get !g!to !g!First !g!Block";
        }

        const idPos = new TextPosition(spaceSize, height - 2 * lineHeight, width, height, true);
        const idLine = new Line(goal + (" !id!" + this.room.id).repeat(10));
        idLine.draw(this.ctx, idPos);

        if (this.dryebux > 0) {
            const dryebuxPos = new TextPosition(spaceSize, height - 3 * lineHeight, width, height);
            const dryebuxSeg = new TextSegment("!d!youhave-->" + this.dryebux + "₫");
            dryebuxSeg.draw(this.ctx, dryebuxPos);
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
            this.ctx.drawImage(i, width - i.width - m, height - i.height - m);
        }
    }

    performAction(a, i) {
        if (a.type === "room") {
            if (a.onetime) {
                this.room.options.splice(i, 1);
            }
            if (a.replace) {
                this.rooms[a.replace[0]].options.forEach(o => {
                    if (o.action.type === "room" && o.action.id === a.replace[1]) {
                        o.action.id = a.replace[2];
                    }
                });
            } else if (a.replace2) {
                Object.values(this.rooms).forEach(r => {
                    r.options.forEach(o => {
                        if (o.action.id === a.replace2[0]) {
                            o.action.id = a.replace2[1];
                        }
                    });
                });
            }
            this.enterRoomId(a.id);
        } else if (a.type === "dryebux") {
            this.dryebux += a.dryebux;
            this.room.options.splice(i, 1);
            this.room.dryebux = undefined;
        } else if (a.type === "hint") {
            const backId = this.room.id;
            this.room.options.splice(i, 1);
            const hintIDs = Object.values(this.rooms)
                  .filter(r => r.dryebux !== undefined)
                  .map(r => r.id);
            if (hintIDs.length > 0) {
                this.enterRoom(new Room({
                    id: "bighint",
                    desc: "You are left with the million-dollar hint phrase: !d!" + hintIDs[Math.floor(Math.random() * hintIDs.length)],
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
            game = new Game();
        }
    }

    handleKey(k) {
        if (this.elapsedTime > cooldown && keys.includes(k)) {
            const n = keys.indexOf(k);
            if (n < this.room.options.length) {
                this.performAction(this.room.options[n].action, n);
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
        ],
        reset: "Start from the beginning of time",
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
        ],
    },
    {
        id: "schedule",
        desc: "You check your schedule, and trace your finger down to the “1ST BLOCK” line. The entry reads: “ !p!4300 !p!HALL - !c!Kinney ”",
        options: [
            ["middle", "Continue"],
        ],
    },
    {
        id: "middle2",
        desc: "You stand outside under a vast web of metallic structures. The !p!Four and !p!Seven !p!Hundreds are very close.",
        options: [
            ["fourh1", "Enter the !p!Four !p!Hundred"],
            ["sevenh1", "Enter the !p!Seven !p!Hundred"],
            ["foursevenpath", "Go north, squeezing between the two"],
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
            ["sevenh2", "Turn the corner"],
            ["middle2", "Exit the building"],
        ],
    },
    {
        id: "wojo",
        desc: "You are in the !s!physics !p!classroom. The students have set up some kind of giant Rube Goldberg machine that takes up most of the room.",
        options: [
            ["touchmachine", "Touch the machine"],
            ["sevenh1", "Exit to the hall"],
        ],
    },
    {
        id: "touchmachine",
        desc: "You touch a small piece of the large blue plastic structure. When your finger makes contact, the plastic around it fizzes and pops and seems to boil off into thin air, as if made out of some kind of pure evil. The whole structure collapses as a result of the dense dependency network of the machine. You have been banned from this classroom.",
        options: [
            ['sevenh1', 'Continue in shame', ['wojo', 'wojoban']],
        ],
    },
    {
        id: "wojoban",
        desc: "You have been banned from this room.",
        options: [
            ["sevenh1", "Continue"],
        ],
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
        desc: "!c!Grube contorts his eyebrows in an attempt to gain control of the situation but the class has already escaped out from under him. They have wanted to speak !e!truth !e!to !e!power but you have given them the words. As they all say what they have previously just said to friends who don’t have his class. In the frenzy you manage to slip away.",
        options: [
            ['sevenh3', 'Continue', ['mrgrube', 'mrgrubefrenzy']],
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
        desc: "You stand in Ms. Graham’s room. You are entranced by the orderliness of the “Quilt periodic table” but worried that chemistry students might confuse it for the real thing.",
        options: [
            ["sevenh3", "Exit to the hall"],
            ["scioly", "Look at the !e!science !e!Olympiad boxes in the back"],
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
            ["pointy", "Go towards the !p!400 !p!Split"],
            ["staffparking4", "Go towards the trailers"],
            ["gymoutside", "Walk to the !p!Gym entrance"],
            ["trailerunder", "Go under the trailer"],
        ],
    },
    {
        id: "foursevenpath",
        desc: "You walk down an excessively long straightaway of the East Meck circuit. You admire the plants in variously-shaped pots that are displayed in the Earth Science windows along the West side of the !p!Lower !p!Four !p!Hundred.",
        options: [
            ["concreterectangle", "Visit the elusive !p!Concrete !p!Rectangle in the corner of the !p!700"],
            ["middle2", "Walk towards the !p!Student !p!Parking !p!Lot"],
            ["pointy", "Walk towards the !p!400 !p!Split"],
        ],
    },
    {
        id: "concreterectangle",
        desc: "You stand on one of the more bizarre regions of the East Meck Outdoors: A large concrete rectangle, engraved with Meck symbolics and decorated with two by three array of benches. You have heard rumors of this artifact resulting from some “outdoor classroom project”, but this myth remains unconfirmed. You notice some !d!DryeBux under one of the benches.",
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
            ["fourhstairs", "Go down the mysterious stairs next to the !p!400 building"],
        ],
    },
    {
        id: "fourhstairs",
        desc: "You are in a small staircase outside a corner of the !p!Upper !p!400. The staircase connects to a mysterious blue door underneath the building.",
        options: [
            ["underfourh", "Go through the door"],
            ["fourhgym", "Go up the stairs to the outside"],
        ],
    },
    {
        id: "underfourh",
        desc: "You are underground in a dark brick room. One bright light cuts through the darkness but only to a certain extent. There are several piles of half-ground up leaves and other types of grime.  There are small weights of various lengths strewn about the corner of the floor. There is an old door to the outside and a newer-looking door on the opposite side.",
        options: [
            ["fourhstairs", "Go through door to the outside"],
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
        id: "trailers1",
        desc: "You are on a rickety wooden walkway surrounded by aluminum !p!trailers. You see a student standing outside of the !s!music !s!theory !p!trailer motionless.",
        options: [
            ["askmusicstudent", "Ask the student what their whole deal is", true],
            ["musictheory", "Enter the !c!Music !c!Theory !p!Trailer"],
            ["trailerbathroom1", "Enter the !p!bathroom !p!trailer"],
            ["trailers2", "Continue down the walkway"],
            ["staffparking1", "Step down to the !p!Staff !p!Parking !p!Lot"],
        ],
    },
    {
        id: "askmusicstudent",
        desc: "The student explains that they were assigned the role of standing outside in the freezing cold and warning people of the slipping hazard associated with the iced-over wooden walkway.",
        options: [
            ["trailers1", "Continue"],
        ],
    },
    {
        id: "trailerbathroom1",
        desc: "In this most lonely of East Meck bathrooms, there is almost nothing of importance to mention. However, out of the corner of your eye, you spot a !d!DryeBuk on top of the soap dispenser.",
        options: [
            ["trailers1", "Leave"],
        ],
        dryebux: 3,
    },
    {
        id: "musictheory",
        desc: "You are in the !s!Music !s!Theory !p!Trailer. The students are six pages in to !c!Mr. !c!Moreau’s deep analysis of !c!Drye’s !e!rap !e!album.",
        options: [
            ["trailers1", "Leave"],
        ],
    },
    {
        id: "trailers2",
        desc: "You stand on a wooden walkway in the mutual corner shared by four !p!trailer !p!classrooms.",
        options: [
            ["m191", "M191"],
            ["m61", "M61"],
            ["m78", "M78"],
            ["m212", "M212"],
            ["trailers1", "Continue down the walkway, towards the !p!Media !p!Center"],
            ["staffparking2", "Go down to the staff parking lot"],
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
            ["m444", "M444"],
            ["m443", "M443"],
            ["gymoutside", "Go towards the !p!Gym entrance"],
            ["sevenhgym", "Go between !p!700 and the !p!Gym"],
            ["staffparking5", "Go away from civilization"],
            ["staffparking1", "Go towards the !p!Student !p!Parking !p!Lot"],
            ["smallshed", "Go into the small shed next to the lot"],
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
        ],
    },
    {
        id: "trailers3",
        desc: "You are on a gravel path next to a well-organized line of trailers. The lumbering evergreens of the !p!Baseball !p!Field boundary block a large portion of the trailers’ ugly tin rooves.",
        options: [
            ["m555", "M555"],
            ["m551", "M551"],
            ["m549", "M549"],
            ["trailers4", "Continue along the gravel path towards the center of the school"],
            ["gymlot2", "Go towards the !p!track"],
            ["trailers8", "Go south, towards another group of trailers"],
        ],
    },
    {
        id: "trailers8",
        desc: "You stand on a wooden walkway around a group of trailers. The !p!Gym is extremely close.",
        options: [
            ["m171", "M171"],
            ["m550", "M550"],
            ["m671", "M671"],
            ["trailerbathroom2", "Enter the !p!trailer !p!bathroom"],
            ["gymoutside", "Walk towards the !p!Gym enterance"],
            ["gymlot1", "Go into the !p!gym !p!parking !p!lot"],
            ["trailers3", "Go north towards more trailers"],
        ],
    },
    {
        id: "trailerbathroom2",
        desc: "In this second loneliest of East Meck bathrooms, there is almost nothing of importance to mention. However, out of the corner of your eye, you spot a !d!DryeBuk on top of the paper towel dispenser.",
        options: [
            ["trailers8", "Leave"],
        ],
        dryebux: 3,
    },
    {
        id: "trailers4",
        desc: "You stand on a gravel path near some trailers. Your eyes are immediately drawn to the bright New Zealand license plate on a car that is (presumably illegally) parked here.",
        options: [
            ["m556", "M556"],
            ["m554", "M554"],
            ["trailers3", "Continue along the gravel path towards the !p!Track"],
            ["trailers6", "Go towards the center of the school"],
        ],
    },
    {
        id: "trailers6",
        desc: "You are in the middle of a large cluster of trailers. It appears to trailers for miles from any direction you look.",
        options: [
            ["m284", "M284"],
            ["m283", "M283"],
            ["trailerbathroom3", "Enter the !p!trailer !p!restroom"],
            ["trailers4", "Go towards the !p!Track"],
            ["trailers5", "Go towards the !p!Tennis !p!Courts"],
            ["trailers7", "Go towards the middle of the school"],
            ["fourhgym", "Walk towards the !p!700 in the only sliver of your field of view not plastered over with aluminum"],
        ],
    },
    {
        id: "trailerbathroom3",
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
            ["m282", "M282"],
            ["m281", "M281"],
            ["m280", "M280"],
            ["trailers5", "Go towards the !p!Tennis !p!Courts (There !e!are trailers this way)"],
            ["trailers6", "Go towards the !p!Track (There !e!are trailers this way)"],
            ["center2", "Escape to the middle of campus"],
            ["fourhgym", "Escape towards the !p!700"],
        ],
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
        ],
        reset: "Try again",
    },
    {
        id: "busdrive7",
        desc: "As you cruise through the !p!student !p!parking !p!lot, a posse of aspiring club members materializes behind you. They follow you as you drive back to the !c!shady !c!teacher.",
        options: [
            ['shadyteacher4', 'Continue', ['shadyteacher', 'shadyteacher4']],
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
        desc: "!c!BEAGLER: “It did. Part of the process, if you recall, was that the Techlenburg article became the truth. Just as Truth became Beagle, Zeagle became Truth.”",
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
        desc: "!c!BEAGLER: “What do these articles have in common? They were both published during 4th quarter. The tail end of the school year. The beginning of the reconvergence: The reunion of the timelines. The reunion of Eagle with Zeagle.”",
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
        desc: "!c!BEAGLER: “Not in general. But some events are so inevitable they happen in both timelines. A snowstorm, for example, is happening in their world right now too. But I know they will kill me, because I am speaking out. I have told people about how toxic the Beagle workplace is. I have told people how they teach us to hate the Zeaglers - the poor people in our world whose minds are trapped in the world of the Z-”",
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
        ],
        reset: "Try everything again. From the top.",
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
            ["entercode", "Hit the big “reset” button"],
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
            ["fours", "Enter more fours over and over"],
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
            ['shack', 'Continue', ['drums', 'drums2']],
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
        id: "rummage",
        desc: "You go down on all fours, looking under every drum for anything out of the ordinary. Amazingly, you do find something: An old !e!cassette !e!tape, labeled !e!“BEAGLER !e!INTERVIEW”. You pick it up. Unfortunately it seems that the first half of the tape is missing...",
        options: [
            ['shack', 'Continue', ['avcloset', 'tapefail', 'tape']],
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
        id: "fours.",
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
        desc: "All of a sudden you hear a bell. You must have missed your opportunity to get to first block on time. Oh well. You start making your way there but you are met with a stampede of your classmates rushing out excited to return to their everyday lives. You realize that that hadn’t been the 7:15 bell but rather its afternoon counterpart. How long had you been mashing? Hours? Days? You overhear some students talking about their upcoming AP Exams. Isn’t it December? You decide to head back home to collect yourself. All that mashing made you tired anyways.",
        options: [
        ],
        reset: "Head home and take a nap",
    },
    {
        id: "studentlot",
        desc: "You stand at the boundary of the !p!student !p!parking-lot. Your eyes become lost in the dense variety of vehicles. You snap back to reality and realize you cannot progress this way, as leaving campus now would be an explicit violation of the Student Code of Conduct.",
        options: [
            ["middle", "Turn back before it is too late"],
            ["church", "Push your luck and attempt to escape", true],
        ],
    },
    {
        id: "church",
        desc: "You have made your way all the way out to the !p!East !p!City !p!church but you can tell the security is hot on your tail and it is not worth it to get on their bad side as it could have serious repercussions down the road (tranquilizer dart to the head).",
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
            ["roberts", "Enter !c!Roberts’ !p!Classroom"],
            ["dunn", "Enter !c!Dunn’s !p!Classroom"],
            ["cellocloset", "Enter the !p!cello/bass !p!storage !p!closet"],
            ["sixh2", "Continue along the hall"],
            ["middle", "Exit out the classic door"],
        ],
    },
    {
        id: "sixh2",
        desc: "You stand in the heart of the !p!Six !p!Hundred. The epicenter of the famous East Meck Grime that has sullied all of these old buildings over time. You hear fairly loud music being played to your East. !c!Mr. !c!Henry is sitting in an inverted desk grading papers. There is a fire extinguisher panel that has been installed upside down next to the exterior door.",
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
        id: "henry",
        desc: "Attempt to access !c!Mr !c!Henry’s room but his desk is blocking the entry. You continuously try to bump it to it but !c!Mr. !c!Henry and his desk won’t budge. It would be a bigger problem if you had business to handle there but you would still like to look at the menagerie of flags. You can’t think of a reason to plead for him to let you in.",
        options: [
            ["sixh2", "Give up and keep walking"],
        ],
    },
    {
        id: "sixh3",
        desc: "A teacher is playing music at an earsplitting volume. You are panicking and can’t focus enough to even figure out where you are. You do see !c!Mr. !c!Watts standing though, and think his room might provide refuge.",
        options: [
            ["watts", "Enter !c!Watts’ !p!Room"],
            ["komito", "???? Classroom ????"],
            ["wilson", "???? Classroom ????"],
            ["sixh2", "???? Direction ????"],
            ["cafelobby1", "???? Direction ????"],
        ],
    },
    {
        id: "sixh3quiet",
        desc: "Teachers from around the hall are gathered around, celebrating your accomplishment of reducing the music volume. One teacher is so thankful, they give you some !d!DryeBux.",
        options: [
            ["watts", "Enter !c!Watts’ !p!Room"],
            ["komito", "Enter !c!Komito’s !p!Classroom"],
            ["wilson2", "Enter !c!Wilson’s !p!Classroom"],
            ["sixh2", "Go along the hall, towards the !p!Media !p!Center"],
            ["cafelobby1", "Enter the !p!Cafeteria !p!Lobby"],
        ],
        dryebux: 3,
    },
    {
        id: "wilson",
        desc: "You have managed to navigate to the source of the music. You would find the barrage of 80s, 90s, and 2000s hits delightful if it wasn’t so loud. You attempt to negotiate with the teacher but because the music is so loud, speech has rendered itself useless. ",
        options: [
            ["signlang1", "Attempt to communicate through other means"],
            ["sixh3", "Give up and go back in the hall"],
        ],
    },
    {
        id: "signlang1",
        desc: "You throw your hand on your head and sort of wave your fingers around. This gets the point across, and the music is turned down.",
        options: [
            ['sixh3quiet', 'Continue', ['sixh3', 'sixh3quiet']],
        ],
    },
    {
        id: "watts",
        desc: "You enter !c!Mr. !c!Watts’ classroom and are astounded by the economic delights. Your eyes are drawn in a thousand different directions at the various artifacts he has somehow procured (assumingly via his insanely deep pockets.) !c!Mr. !c!Watts is chatting with a student about a smuggling job. ",
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
        ],
        reset: "Start Over",
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
        ],
        reset: "Start Over",
    },
    {
        id: "sludgecafe2",
        desc: "As you enter the !p!Cafeteria, a horde of !c!Cafeteria !c!Staff surround you. They misinterpret your sludge as the daily delivery of sludge that they use to turn into a delicious lunch. They take your backpack, sludge and all. Not out of malice, of course, but out of pure miscommunication.",
        options: [
        ],
        reset: "Start Over",
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
        ],
        reset: "Start Over",
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
        desc: "After stopping for only two seconds, you are violently tackled by the three security guards at once. Failure.",
        options: [
        ],
        reset: "Start Over",
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
        ],
        reset: "Start Over",
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
        desc: "You leisurely walk back to !c!Mr. !c!Watts’ room. Administrators around campus shake their fists at you, but have no power to punish you now that the sludge is in international waters.",
        options: [
            ['watts2', 'Continue', ['watts', 'watts2']],
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
        desc: "You are at the most bustling corner of the !p!Six !p!Hundred. Students - some familiar, some not - pass you from all directions. The bathrooms are being guarded by three different teachers looking in different directions. There are two external doors with differing signage.",
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
        id: "sixh5",
        desc: "You are at the more scientifically-inclined appendage of the sprawling creature that is the !p!Six !p!Hundred. There is a door to the !p!Cafeteria !p!Lobby here.",
        options: [
            ["johnson", "Enter !c!Johnson’s !p!Room"],
            ["walston", "Enter !c!Walston’s !p!Room"],
            ["dean", "Enter !c!Dean’s !p!Room"],
            ["congress", "Enter !p!Student !p!Congress !p!Room"],
            ["sixh4", "Go down the hall to the corner"],
            ["cafelobby2", "Enter the !p!Cafeteria !p!Lobby"],
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
        id: "cafe1",
        desc: "It is quiet in the !p!cafeteria, for the bustling !p!cafeteria workers working hard to prepare the upcoming day's delicacies and packing up the breakfast. There are a small number of breakfast goers but they all seem to be heading out to their respective first blocks.",
        options: [
            ["cafe2", "Head to the other door where !c!Drye and friends sometimes hang out during lunch"],
            ["cafe3", "Head to back corner of the !p!cafeteria by the infamous !c!Backwall !c!Eagle"],
            ["cafe4", "Walk across to over by the microwaves"],
            ["cafelobby1", "Exit the !p!cafeteria"],
            ["lunchcounter", "Try to get some last minute breakfast", true],
        ],
    },
    {
        id: "lunchcounter",
        desc: "You go past the revolving gate and enter the line. There are no workers ready to serve you, but you ring the service bell enough times to attract their attention. You say you need breakfast and they are clearly aggravated that you wait until the last minutes till closing for your request. You see a ceiling high stack of the most delicious looking pancakes you have ever seen and a syrup river that would most likely prove itself unnecessary due to the pancakes’ intrinsic flavor. Unfortunately after about a minute of waiting they hand you a tray with a gritty grey pulp on it. The !p!cafeteria staff have decided to punish you for your greed.",
        options: [
            ["lunchtable", "Grab a seat and chow down"],
            ["lunchspite", "Throw the food away while making eye contact with a !p!cafeteria staff member"],
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
            ["cafe3", "Move along the Backwall to visit the !c!Giant !c!Eagle"],
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
            ['patio1a', 'Continue', ['patio1', 'patio1a']],
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
        id: "cafelobby3",
        desc: "You are in a hallway that is usually described as part of the extensive !p!“Cafeteria !p!Lobby”, though the !p!Cafeteria is not accessible directly from here. You reason to yourself that this is probably due to the fact that this zone is permitted during lunches. In any case, the neon red Zeagle poster on the wall enchants you.",
        options: [
            ["auditoriumlobby", "Enter the !p!Auditorium !p!Lobby through one of the million components of this large array of doors"],
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
        id: "officeoutside",
        desc: "You stand at the front of the school. You see a caged cap and gown and a ranked list of the top Juniors from the previous year, all meant to encourage but they only make you bitter. There is still a steady stream of students going through the scanner. ",
        options: [
            ["office", "Enter the !p!office"],
            ["eighth1", "Enter the almost imperceptible door across from the !p!office"],
        ],
    },
    {
        id: "office",
        desc: "You stand in the !p!Front !p!Office. Students, staff, and parents are entering and leaving at breakneck speed. You are always astounded by the efficiency of the East Meck Operation.",
        options: [
            ["officetv", "Watch the TV in the corner of the room"],
            ["bauer", "Enter !c!Bauer’s !p!Room"],
            ["officehall", "Enter the hallway further in"],
            ["officeoutside", "Leave the !p!Office"],
        ],
    },
    {
        id: "officehall",
        desc: "You are swimming through the internal organs of East Meck. Offices are all around you, and administrators are passing by. You are repeatedly starstruck by the more and more famous faces walking through.",
        options: [
            ["whitley", "Enter !c!Whitley’s !p!Room"],
            ["dryeenter", "Enter !c!Drye’s !p!Room"],
            ["office", "Go to the front of the !p!Office"],
        ],
    },
    {
        id: "dryeenter",
        desc: "After ruminating for what feels like hours, you finally build up the courage to enter !c!Drye’s !p!Room, and meet your biggest inspiration. As you open the door, the suspense you built up for so long fizzles out immediately: He’s not here.",
        options: [
            ['drye', 'Continue', ['dryeenter', 'drye']],
        ],
    },
    {
        id: "drye",
        desc: "You are standing in the !p!Principal’s !p!Office. !c!Drye’s room is surprisingly barren, highlighting his aversion to the concept of picking any kind of side (good vs. evil, etc.). He has a frame on the wall labeled !d!“Signed !d!Dryebuk”, but the glass is smashed and no !d!bill is inside.",
        options: [
            ["officehall", "Leave to the hall"],
            ["dryechair", "Inspect Drye’s chair"],
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
        ],
        reset: "Start Over",
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
        ],
        reset: "Start Over",
    },
    {
        id: "duck",
        desc: "As Parker’s Helping Other People Excel ideology dictates, he always aims for the stars. The pickaxe flies right over you, and you have quick enough reflexes to grab it. Parker knows he’s in trouble now, and runs down the tunnel as fast as he can. As he runs, the !d!Signed !d!DryeBuk falls out of his pocket onto the floor.",
        options: [
            ['tunnel2a', 'Continue', ['tunnel2', 'tunnel2a']],
        ],
    },
    {
        id: "tunnel2a",
        desc: "You are in a dark tunnel. !c!Drye’s stolen !d!signed !d!DryeBux are on the floor.",
        options: [
            ["tunnel1", "Go back towards !p!East !p!Meck"],
            ["tunnel3a", "Go deeper into the tunnel"],
        ],
        dryebux: 101,
    },
    {
        id: "tunnel3a",
        desc: "You are deep in a dark tunnel. There is no telling how far it extends. You are starting to lose your sense of direction, but you can still barely see the light from the manhole.",
        options: [
            ["tunnel2a", "Go towards !p!East !p!Meck"],
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
        desc: "This hall feels dewier than the rest of the school. You hear the vague pounding of well-tempoed yet familiar songs coming from the !p!dance !p!room as well as a well-put-together patter song being sung from !p!The !p!Stage. There is an office of an !c!Exiled !c!Counselor here.",
        options: [
            ["dance", "Enter the !p!Dance !p!Room"],
            ["stageclassroom", "Enter the !p!Stage !p!Classroom"],
            ["exiledcounselor", "Approach the !c!counselor’s door"],
            ["officeoutside", "Exit the !p!800"],
            ["eighth2", "Round the corner"],
        ],
    },
    {
        id: "dance",
        desc: "The ground is an interesting, springer and more rubbery. It is a sensation that gives you nothing but the urge to !s!dance. There is already a dazzling multipart one happening. You find your window and jump in but almost as soon as you do everyone stops and glares at you. Then a particularly bold !s!dance student finally says  “you need to take your shoes off.”",
        options: [
            ["dance2", "Comply"],
            ["eighth1", "Just Leave"],
        ],
    },
    {
        id: "dance2",
        desc: "You take a minute to unlace your shoes and they all wait around for you. Once you finally finish you hop into the beat but they picked a particularly difficult dance sequence to throw you off. You are lost in a flood of hip checks, being slammed back and forth until you reach the end of the chain and are knocked to the ground.",
        options: [
            ["eighth1", "Crawl out"],
        ],
    },
    {
        id: "exiledcounselor",
        desc: "You put your ear up against the door and hear a vague whippering. Though you can’t make out every word, it seems to be that there is a counseling session happening, One in which a student is being advised about which APs would be easy or near impossible based on a split second glance at a transcript. It appears normal but after listening in for a while you realize that whenever it switches from counselor to student there is the brief sound of heavy breathing and running around a desk, you also realize that the students voice sounds alot like the counselors voice just pitched up.",
        options: [
            ["eighth1", "Back away confused"],
            ["exiledcounselor2", "Listen in for more environmental storytelling"],
        ],
    },
    {
        id: "oneh1",
        desc: "You stand in the (presumably oldest) !p!100 !p!building. The walls are chock-full of highly specialized rooms - offices purpose-built to deal with minor technical issues that come up at East Meck (health, attendance, etc.). You can hear faint screaming from inside the Nurse’s office. It might be your imagination but you also feel like you can smell the patient’s disease.",
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
        desc: "You stand in the center of the vast !s!Orchestra (but at other times !s!Band) !p!room. The floor is littered with cellos, each with their respective end-pin protruding dangerously. The sun bounces off the intricate matrix of trophies and blinds you temporarily.",
        options: [
            ["middle3", "Walk outside the exterior door"],
            ["orchcloset", "Walk into the !c!orchestra !p!closet"],
            ["bandcloset", "Walk into the !c!band !p!closet"],
            ["bandoff", "Glimpse into the !c!band + !c!orchestra !p!office"],
            ["sixh1", "Leave into the !p!Six !p!Hundred !p!hall"],
        ],
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
        desc: "You stand in a particularly familiar subregion of the East Meck Outdoors. The conveniently labeled doors to the !s!Orchestra and/or !s!Band and !s!Choir !p!rooms present one avenue of opportunity, while the industrial deep blue of the !p!Courtyard entrance presents another.",
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
        id: "courtyard1",
        desc: "You stand under the rooved portion of the !p!Courtyard. You can still see a small amount of salt left on the tables here. You can tell that this is the most popular spot for breakfast enjoyers.",
        options: [
            ["courtyardcorner", "Go towards the blue !p!Courtyard !p!Doors"],
            ["courtyard2", "Walk to the middle of the !p!Courtyard"],
            ["studentservices", "Enter !p!Student !p!Services"],
        ],
    },
    {
        id: "courtyard2",
        desc: "You stand under one of the large central trees of the !p!Courtyard. You observe students sitting on the ad-hoc brick protrusions lining the ground, neglecting the purpose-built yellow benches. You admire the mural of Parker holding up the administrators of East Mecks by marionette strings, artistically codifying his role as East Meck’s !e!Grand !e!Puppeteer.",
        options: [
            ["cafelobby3", "Go inside, near the !p!Auditorium"],
            ["couryard1", "Walk to the sheltered region of the !p!Courtyard"],
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
        desc: "You stand on the north side of a Zig-zagged footpath. You see door entrances dotted around the !p!400 wall.",
        options: [
            ["zigzag1", "Move south"],
            ["splitoutside", "Move north"],
        ],
    },
    {
        id: "splitoutside",
        desc: "You stand under a steel roof. The dingy !p!400 !p!split and the nonspecific !p!300 !p!building are available through the two directions parallel to the canopy. On the perpendicular side of things, the outdoor region enclosed by East’s buildings continues further.",
        options: [
            ["threeway", "Enter the !p!Three !p!Hundred"],
            ["split", "Enter the !p!Split"],
            ["zigzag2", "Walk towards the !p!Student !p!Parking !p!Lot"],
            ["center", "Walk towards the !p!New !p!Buildings"],
        ],
    },
    {
        id: "split",
        desc: "You stand in the middle of the bustling !p!400 !p!Split. There are myriads of people here, each one leaning on their officially-assigned steel pillar. You can still see the faint outline of the gargantuan Beagle poster on the wall.",
        options: [
            ["fourh2", "Enter the Lower !p!Four !p!Hundred"],
            ["fourh3", "Enter the Upper !p!Four !p!Hundred"],
            ["splitoutside", "Go East, towards the !p!300"],
            ["pointy", "Go West, towards the !p!700 and the !p!Gym"],
        ],
    },
    {
        id: "center",
        desc: "You are at the dead center of East Meck, between the !p!300 and !p!Upper !p!400.",
        options: [
            ["schedule", "Check your schedule"],
            ["splitoutside", "Go South towards the !p!600"],
            ["outsidestairs", "Take the stairs towards the !p!Thousands"],
            ["slope", "Descend the gravel slope instead"],
        ],
    },
    {
        id: "slope",
        desc: "You stand on a particularly steep region of the East Meck Outdoors. As you brave the sheer cliff-face, you hear the whirring of the gigantic air conditioning unit beside you. Water is leaking onto the ground from some unidentifiable sub-apparatus. Bats are flying out of the red brick chimney.",
        options: [
            ["center2", "Go towards the classrooms of the future"],
            ["center", "Go towards the classrooms of yesteryear"],
            ["threehstairs", "Enter the mysterious stairs next to the AC Unit"],
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
            ["fnfenter1", "Continue into the !p!495000"],
            ["center2", "Turn back towards the !p!Hundreds"],
        ],
    },
    {
        id: "fivekstairs1a",
        desc: "You are on the !f!first !f!floor of the back stairwell of the !p!5000. If you want to go up the stairs, you will have to wait for a bit due to the group of freshmen currently clogging up the system.",
        options: [
            ["fivekstairs2", "Wait for a bit and then ascend"],
            ["fivekback", "Leave to the back of the building"],
            ["fivek1a", "Continue into the building"],
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
        id: "fivekstairs1c",
        desc: "You on the !f!third !f!floor of the back stairwell of the !p!5000. Up here, you can feel the negative energy from the rooftop pool quite clearly, drawing a sharp contrast with the near-perfection of the lower floors.",
        options: [
            ["fivekstairs1b", "Descend the stairs back to safety"],
            ["fivek1c", "Enter the dubious hallway"],
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
        id: "fivekside2",
        desc: "You are on a flat concrete plane that wraps around the South-East Corner of the !p!Five !p!Thousand.",
        options: [
            ["oneh2", "Enter the !p!One !p!Hundred"],
            ["trap1", "Enter a grassy region that will certainly lead through to the other side of campus"],
            ["fivekside1", "Go towards the back of the building"],
            ["fivekfront", "Go to the front of the building"],
        ],
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
        desc: "You stand in the brand new !p!495000 stairwell. Pieces of the wall are still missing, highlighting how Parker is rusty on school maintenance.",
        options: [
            ["fnf1", "Go downstairs"],
            ["fnf2", "Go upstairs"],
        ],
    },
    {
        id: "fnf2",
        desc: "You stand in East Meck’s most peaceful hallway, now decorated with Parker memorabilia in addition to the older symbols of unity.",
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
            ["fourkback", "Exit to !c!Edde’s !p!Domain"],
            ["fnfpass2", "Scan your passport to get to the other side"],
        ],
    },
    {
        id: "fnfpass2",
        desc: "You brighten up the customs officer’s day by being their first assignment. Your passport clears without an issue.",
        options: [
            ['fnf1', 'Continue', ['fnfpass2', 'fnfpass3']],
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
            ["fourkstairs1a", "Enter the !p!Four !p!Thousand"],
            ["fnf3", "Escape via the !p!495000"],
        ],
    },
    {
        id: "fourkstairs1a",
        desc: "You are on the !f!first !f!floor of the !p!4000 back stairwell. You can feel what you would interpret as wind if you weren’t painfully aware of the giant booming fans down the hall.",
        options: [
            ["fourkstairs1b", "Go up the metallic stairs"],
            ["fourk1a", "Enter the hall"],
        ],
    },
    {
        id: "fourkstairs1b",
        desc: "You are on the !f!second !f!floor of the !p!4000 back stairwell. The painful odor of rubbing alcohol burns your sinuses, and cuts through your focus the way Drye cuts through pessimism.",
        options: [
            ["fourkstairs1c", "Go up the stairs"],
            ["fourkstairs1a", "Do down the stairs"],
            ["fourk1b", "Enter the hall"],
        ],
    },
    {
        id: "fourkstairs1c",
        desc: "You are on the !f!third !f!floor of the !p!4000 back stairwell. There is a long line at the small hand-washing station that the top of the stairs is equipped with.",
        options: [
            ["fourkstairs1b", "Go down the stairs"],
            ["fourk1c", "Enter the hall"],
        ],
    },
];

let game;

addEventListener('load', async (event) => {
    game = new Game();
    game.draw();
    setInterval(() => {
        requestAnimationFrame(() => game.draw());
    }, 1000/fps);
    addEventListener("keydown", (event) => {
        game.handleKey(event.key);
    });
});
