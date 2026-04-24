// Hi Reid

// Link from game page
// Trailer
// Reverse dialectic
// Lots of info/stats everywhere. More text effets
// Effects: Animated random caps, shaking, ripple
// (CSS?) Backgrounds for different regions. East meck photos?
// Mobile?
// Music
// Sfx
// forgot if a day or b day
// Characterize the reader
// More grime
// Grime meter
// Worthiness meter
// "The most heartwrenching East Meck story to date"
// "Interactive Story"
// TAPE
// Parse better: Caps, trailing spaces after colon.
// Characterize the reader
// Goal of game is to collect 5(?) items that are hidden
// Handle more than 10 options. Font size adjusting.
// Characters give you quests
// Wait for someone to open the door at 4k since you are so late at that point
// People switching the 400 rooms from earth science to health and vice versa repeatedly
// Play tape in A/V room after sneaking past
// Proper resetting

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

class Action {
    constructor(type, args) {
        this.type = type;
        if (type === "room") {
            this.id = args[0];
        } else if (type === "dryebux") {
            this.dryebux = args[0];
        } else if (type === "reset") {
        } else {
            alert("Bad action type: "+ type);
        }
    }
}

class RoomOption {
    constructor(action, desc, n) {
        this.action = action;
        this.text = new Line(desc);
        this.text.prependWord("!o![" + keys[n] + "]");
        this.index = n;
        this.action.index = n;
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
        this.options = spec.options.map((o, i) => new RoomOption(new Action("room", [o[0]]), o[1], i));
        if (spec.dryebux !== undefined) {
            this.options.push(new RoomOption(new Action("dryebux", [spec.dryebux]),
                                             "!d!Pick !d!up !d!bill !d!of !d!" + spec.dryebux + " !d!DryeBux",
                                             this.options.length));
            this.dryebux = spec.dryebux;
        }
        if (spec.reset !== undefined) {
            this.options.push(new RoomOption(new Action("reset", []), spec.reset, this.options.length));
        }
    }

    draw(ctx, elapsed) {
        const pos = new TextPosition(0, 0, width, height);
        const words = Math.floor(wps * elapsed / 1000);
        this.desc.draw(ctx, pos, words);
        pos.newLine();
        this.options.forEach((o) => o.draw(ctx, pos, words));
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
        this.enterRoom("start");
        this.dryebux = 0;
    }

    enterRoom(id) {
        if (id in this.rooms) {
            this.room = this.rooms[id];
        } else {
            this.backRoom = this.room;
            alert("Not implemented: " + id);
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

        const idPos = new TextPosition(spaceSize, height - 2 * lineHeight, width, lineHeight);
        const idSeg = new TextSegment("!id!" + this.room.id);
        idSeg.draw(this.ctx, idPos);

        if (this.dryebux > 0) {
            const dryebuxPos = new TextPosition(spaceSize, height - 3 * lineHeight, width, lineHeight);
            const dryebuxSeg = new TextSegment("!d!youhave-->" + this.dryebux + "₫");
            dryebuxSeg.draw(this.ctx, dryebuxPos);
        }

        if (this.room.options.some(o => o.action.type === "dryebux")) {
            let i;
            if (this.room.dryebux === 7) {
                i = imageDryebux7;
            } else if (this.room.dryebux === 11) {
                i = imageDryebux11;
            } else {
                i = imageDryebux3;
            }
            this.ctx.drawImage(i, width - 480, height - 200);
        }
    }

    performAction(a) {
        if (a.type === "room") {
            this.enterRoom(a.id);
        } else if (a.type === "dryebux") {
            this.dryebux += a.dryebux;
            this.room.options.splice(a.index, 1);
        } else if (a.type === "reset") {
            game = new Game();
        }
    }

    handleKey(k) {
        if (this.elapsedTime > cooldown && keys.includes(k)) {
            const n = keys.indexOf(k);
            if (n < this.room.options.length) {
                this.performAction(this.room.options[n].action);
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
        desc: "It’s !t!7:10. You arrive at the !p!Student !p!Parking !p!Lot. You need to choose what to take out of your bag as you pass through the scanner.",
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
            ["sixh1", "Enter the !p!Six !p!Hundred"],
            ["media", "Walk towards the !p!media !p!center"],
            ["studentlot", "Walk towards the !p!student !p!parking !p!lot"],
            ["middle2", "Walk north"],
        ],
    },
    {
        id: "middle2",
        desc: "You stand outside under a vast web of metallic structures. The !p!Four and !p!Seven !p!Hundreds are very close.",
        options: [
            ["fourh1", "Enter the !p!Four !p!Hundred"],
            ["sevenh1", "Enter the !p!Seven !p!Hundred"],
            ["foursevenpath", "Go north, squeezing between the two"],
            ["middle", "Go south"],
            ["middle3", "Go east"],
        ],
    },
    {
        id: "media",
        desc: "You stand under the steel canopy around the entrance to the !p!Media !p!Center. The media center is closed. You know this because of a big, clearly hastily-written poster on the door explaining the presence of “Work-keys” testing inside. Despite the claim, you see what looks to be a fashion show occurring inside. It seems the only style fit for this contestant will be absolute maximalism.",
        options: [
            ["middle", "Walk toward the !p!southern !p!security !p!scanners"],
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
            ["traileroutside", "Walk towards the !p!trailer !p!zone"],
            ["automotive", "Gaze at hot rods in automotive shop"],
            ["staffparking", "Walk into the staff parking lot"],
            ["sevenha1", "Enter the obscure !p!700A !p!Building"],
        ],
    },
    {
        id: "automotive",
        desc: "Mediaside: Shake off these thoughts and return to the side of the media center",
        options: [
            ["automotive2", "Try to hop the fence and take a car"],
        ],
    },
    {
        id: "automotive2",
        desc: "Almost as soon as you make it over the fence you are tackled by a group of rowdy automotive students. You are brought to the ground and your head slams against the concrete. You are knocked out cold.",
        options: [
        ],
        reset: "Try everything again. From the top.",
    },
    {
        id: "drums",
        desc: "You try the handle but it is caged by an absurd number of locks, though it seems mostly held together by one linch pin lock that if it were to be unlocked, the amalgam would be broken loose. Maybe if you had the 4 digit code you could get in.",
        options: [
            ["mediaside", "Walk back to the side of the media center"],
            ["entercode", "Try to enter the code"],
        ],
    },
    {
        id: "entercode",
        desc: "The lock seems very sturdy. You move to enter your first number",
        options: [
            ["one", "enter one as the first digit of the code"],
            ["two", "enter two as the first digit of the code"],
            ["three", "enter three as the first digit of the code"],
            ["four", "enter four as the first digit of the code"],
            ["five", "enter five as the first digit of the code"],
            ["six", "enter six as the first digit of the code"],
            ["seven", "enter seven as the first digit of the code"],
            ["eight", "enter eight as the first digit of the code"],
            ["nine", "enter nine as the first digit of the code"],
            ["zero", "enter zero as the first digit of the code"],
            ["mediaside", "cut your loses and head back to the media center"],
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
            ["sevenone", "seven one"],
            ["sevenx", "seven two"],
            ["sevenx", "seven three"],
            ["sevenx", "seven four"],
            ["sevenx", "seven five"],
            ["sevenx", "seven six"],
            ["sevenx", "seven seven"],
            ["sevenx", "seven eight"],
            ["sevenx", "seven nine"],
            ["sevenx", "seven ten"],
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
            ["shack", "Continue"],
        ],
    },
    {
        id: "shack",
        desc: "You stand in the middle of the !p!Drum !p!Shack. You are too entranced by the variety of drums to leave the room any time soon.",
        options: [
            ["drumplay", "Try your hand at the drums"],
            ["rummage", "Rummage around on the floor looking for who knows what"],
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
        desc: "All of a sudden you hear a bell. You must have missed your opportunity to get to first block on time. Oh well. You start making your way there but you are met with a stampede of your classmates rushing out excited to return to their everyday lives. You realize that that hadn’t been the 7:15 bell but rather its afternoon counterpart. How long had you been mashing? Hours? Days? You decide to head back home to collect yourself. All that mashing made you tired anyways.",
        options: [
        ],
        reset: "Head home and take a nap",
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
            ["sixh1", "Head towards the !p!Media !p!Center"],
            ["sixh3", "Head towards the !p!Cafeteria"],
            ["sixh4", "Head towards the !p!Courtyard"],
            ["nook", "Exit through the exterior door"],
        ],
    },
    {
        id: "sixh3",
        desc: "A teacher is playing music at an earsplitting volume. You are panicking and can’t focus enough to even figure out where you are. You do see !c!Mr. !c!Watts standing though, and think his room might provide refuge.",
        options: [
            ["watts", "Enter !c!Watts’ !p!Room"],
            ["komito", "???? Classroom ????"],
            ["sixh2", "???? Direction ????"],
            ["cafelobby1", "???? Direction ????"],
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
        desc: "They are discussing the need for a mule to bring a large payload of sludge all the way to the 495000 on !c!Mr. !c!Edde’s request, in an attempt to dodge !c!Drye’s newly imposed sludge tariffs. They say they would be willing to give !e!seven !e!Drye !e!Buxs to any one willing to brave the task. ",
        options: [
            ["sludge1", "Volunteer, taking the opportunity to potentially raise your status in the East Meck econsystem"],
        ],
    },
    {
        id: "sixh4",
        desc: "You are at the most bustling corner of the !p!Six !p!Hundred. Students - some familiar, some not - pass you from all directions. The bathrooms are being guarded by three different teachers looking in different directions. There are two external doors with differing signage.",
        options: [
            ["sixh2", "Go South"],
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
        desc: "It is quite in the !p!cafeteria say for the bustling of cafeteria workers working hard to prepare the upcoming day's delicacies and packing up the breakfast. There are a small number of breakfast goers but they all seem to be heading out to their respective first blocks.",
        options: [
            ["cafe2", "Head to the other door where !c!Drye and friends sometimes hang out during lunch"],
            ["cafe3", "Head to back corner of the !p!cafeteria"],
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
        ],
    },
    {
        id: "orchband",
        desc: "You stand in the center of the vast !s!Orchestra (but at other times !s!Band) !p!room. The floor is littered with cellos, each with their respective end-pin protruding dangerously. The sun bounces off the intricate matrix of trophies and blinds you temporarily.",
        options: [
            ["middle3", "Walk outside the exterior door"],
            ["orchcloset", "Walk into the !p!orchestra !p!closet"],
            ["bandcloset", "Walk into the !p!band !p!closet"],
            ["bandoff", "Glimpse into the band office"],
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
            ["middle2", "Walk west"],
            ["zigzag1", "Walk north, towards the new buildings"],
            ["nook", "Walk into the enclosed walkway leading to the !p!600"],
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
            ["transformer", "Inspect the large electrical transformer"],
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
            ["outsidestairs", "Take the stairs towards the !p!Thousands"],
            ["slope", "Descend the gravel slope instead"],
        ],
    },
    {
        id: "slope",
        desc: "As you brave the sheer cliff-face, you hear the whirring of the gigantic air conditioning unit beside you. Bats are flying out of the red brick chimney. Water is leaking onto the ground from some unidentifiable sub-apparatus.",
        options: [
            ["center2", "Go towards the classrooms of the future"],
            ["splitoutside", "Go towards the classrooms of yesteryear"],
        ],
    },
    {
        id: "oursidestairs",
        desc: "You climb the lame stairs, leaving the slope to rot on the side.",
        options: [
            ["center2", "Go towards the classrooms of the future"],
            ["splitoutside", "Go towards the classrooms of yesteryear"],
        ],
    },
    {
        id: "center2",
        desc: "Abcxyz",
        options: [
            ["slope", "Ascend the Southbound cliff face"],
            ["outsidestairs", "Take the stairs instead"],
            ["fivekback", "Go North to the back of the !p!5000"],
            ["fivekside1", "Go East to the side"],
        ],
    },
    {
        id: "fivekback",
        desc: "You are at the back of the !p!Five !p!Thousand. You look up, and see the opposing forces of East Meck colliding and annihilating one another, creating a safe haven below.",
        options: [
            ["fivek1", "Enter the !p!Five !p!Thousand"],
            ["fnfenter1", "Continue into the !p!495000"],
            ["center2", "Turn back towards the !p!Hundreds"],
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
        desc: "You stand on the Old side of the !p!495000. There is a long line of people waiting to have their passport scanned to enter the !p!Four !p!Thousand. The classrooms have all been moved to the new upstairs to accommodate the ever-growing passport checking operation.",
        options: [
            ["fnfstairwell", "Enter the shiny new stairwell"],
            ["fnfexit1", "Escape to the classrooms of old"],
            ["fnfpass1", "Attempt to pass though to the other side"],
        ],
    },
    {
        id: "fnfpass1",
        desc: "Fnf3: Continue",
        options: [
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
        id: "split",
        desc: "You stand in the middle of the bustling !p!400 !p!Split. There are myriads of people here, each one leaning on their officially-assigned steel pillar. You can still see the faint outline of the gargantuan Beagle poster on the wall.",
        options: [
            ["fourh2", "Enter the Southern !p!Four !p!Hundred"],
            ["fourh3", "Enter the Northern !p!Four !p!Hundred"],
            ["splitoutside", "Go East, towards the !p!300"],
            ["pointy", "Go West, towards the !p!700 and the !p!Gym"],
        ],
    },
];

let game;

addEventListener('load', async (event) => {
    game = new Game();
    game.draw();
    setInterval(() => {
        game.draw();
    }, 1000/fps);
    addEventListener("keydown", (event) => {
        game.handleKey(event.key);
    });
});
