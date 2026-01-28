setInterval(() => {
    document.querySelectorAll(".room").forEach((e) => {
        e.innerText=Math.floor(100 + Math.random()*800)
    });
}, 10);

let make_element = (html) => {
    document.body.insertAdjacentHTML("beforeend", html);
}

let qr_links = ["./qr.svg", "./bio.webp", "./phone.png", "./maccas.png"];

let uuid = 1;
let t = 3000;
let make_qr = () => {
    let w = Math.floor(window.innerWidth / 10) * (1 + ((Math.random()) - 0.50) * .5);
    uuid++;
    make_element("<img class=qr id='qr" + uuid + "' src='" + qr_links[Math.floor(Math.random() * qr_links.length)] + "' width=" + w + " height=" + w + " style='top: " + Math.floor((window.innerHeight-w) * Math.random()) + "px; left: " + Math.floor((window.innerWidth-w) * Math.random()) + "px;' onclick='make_notification(\"New News is Rolling In. TURN ON AUDIO.\"); play_siren()'>");
    let b = uuid;
    setTimeout(() => {
        document.querySelector("#qr" + b).style.opacity = "50%";
    }, 1000);
    setTimeout(() => {
        document.querySelector("#qr" + b).outerHTML = "";
    }, 5000);
    if (t > 2000) {
        t -= 100;
    }
    setTimeout(make_qr, t);
}

setTimeout(make_qr, 5000);

play_siren = () => {
    const audio = new Audio("./siren.mp3");
    audio.play();
}

make_notification = (s) => {
    uuid++;
    document.querySelector("#notifications").insertAdjacentHTML("beforeend", "<div class='notification' id='not"+uuid+"' onclick=\"document.querySelector('#not"+uuid+"').outerHTML=''\">" + s + " (CLICK2REMOVE)</div>");
    if (((15 * document.querySelectorAll(".notification").length) / window.innerHeight) > .23) {
        document.querySelectorAll(".notification")[0].outerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const isInstagram = /Instagram/i.test(navigator.userAgent);
    if (isInstagram) {
        document.querySelector("#rotate").innerHTML = "OPEN IN EXTERNAL BROWSER WITH TOP RIGHT MENU";
    }
    document.querySelector("#focus").onclick = () => {
        document.querySelector("#focus").outerHTML = "";
    }
    make_notification("Not Associated With East Mecklenburg Or The Eagle Or Beagle Thereof");
    document.querySelectorAll(".eye").forEach(e => {
        e.onclick = () => {
            e.parentElement.querySelectorAll(".p").forEach(f => {
                f.outerHTML = "<p>" + f.alt + "</p>";
            });
            e.outerHTML = "";
            make_notification("While the Seeing-Eye is a Nece$$ary Establishment, transcripts are a Poor Replacement 4 The Original, and $o are Not Official Outlets of New$ Media");
        };
    });
});

let alerts = ["<span class=room>700</span> Hall Clo$ed For Repair$",
              "Unix Epoch Converter Free Download",
              "Wikipedia Timeline of Far FUture Inducted Into Unu$ual Articles$ List",
              "Where To Inve$t In Clean <span class=air>Air</span> Future$",
              "Cheezit cla$$ action suit: Check If U Qualify for Big Ca$h",
              "Free Download New Animal Sounds",
              "Free Download Uppercut To Your Jaw",
              "10 $ecrets 2 E$cape Any E$cape Room",
              "Ca$hle$$ Equals Cla$$le$$",
              "How can you tell if you have ever really been cold",
              "1,000,000 Cows Decarbonated",
              "New Weather Name Vote",
              "Weather man strike postponed for rain delay",
              "Drye spotted wearing rose-tinted glasses",
              "Big New Theorem Changes Everything",
              "Free Download Accurate Nervous System Simulator"];

setInterval(() => {
    make_notification(alerts[Math.floor(Math.random() * alerts.length)]);
}, 10000);

let air = ["Air", "H2O"];
let airn = 0;
setInterval(() => {
    airn = (airn + 1) % air.length;
    document.querySelectorAll(".air").forEach((e) => {
        e.innerText = air[airn];
    });
}, 1000);

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split("");
document.querySelectorAll(".mix").forEach((e) => {
    let n = 300+Math.random()*200;
    let old = e.innerText;
    setInterval(() => {
        e.innerText = old.split(" ").map((w) => {
            let start = 1;
            let end = w.length-1;
            while (start < w.length && !letters.includes(w[start])) {
                start++;
            }
            while (end >= 0 && !letters.includes(w[end])) {
                end--;
            }
            if (end > start) {
                ws = [...w.slice(start,end).split("")];
                shuffle(ws);
                return w.slice(0,start) + ws.join("") + w.slice(end,w.length);
            } else {
                return w
            }
        }).join(" ");
        setTimeout(() => {
            e.innerText = old;
        }, n);
    }, 2 * n);
});

let oa = ["o", "a"];
let oan = 0;
setInterval(() => {
    oan = (oan + 1) % oa.length;
    document.querySelectorAll(".oa").forEach((e) => {
        e.innerText = oa[oan];
    });
}, 200);

document.addEventListener('keydown', function(event) {
    if (event.key === 'j') {
        document.querySelector("#drye").style.display = "inline";
    } else if (event.ctrlKey && (event.key === 'g')) {
        make_notification("Ctrl-G is not r3c0mm3nd3d, try Ctrl-F");
        event.preventDefault();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'j') {
        document.querySelector("#drye").style.display = "none";
    }
});

window.addEventListener("focus", (event) => {
    document.querySelector("#focus").style.display = "none";
});
window.addEventListener("blur", (event) => {
    document.querySelector("#focus").style.display = "inline";
});

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

horo = () => {
    let x = true;
    let s = (new Date()).getDate().toString() + "|" + (new Date()).getMonth().toString() + "|";
    document.querySelectorAll(".hi").forEach((e) => {
        if (x) {
            const v = e.value;
            if (v === "") {
                alert("ALL INPUTS NEED TO BE FILLED IN.");
                x = false;
            } else {
                s += e.value + "|";
            }
        }
    });
    if (x) {
        let seed = cyrb53(s).toString().slice(1);
        const get_digit = () => {
            if (seed.length < 5) {
                seed += cyrb53(seed + "a").toString().slice(1);
            }
            const a = seed[0];
            seed = seed.slice(1);
            return a;
        }
        const get_nz = () => {
            return (+get_digit() || 1).toString();
        }
        const l = (b) => {
            const index = (+(get_digit() + get_digit() + get_digit())) % b.length;
            const e = b[index];
            const non_e = b.filter((a) => (a !== e));
            for (i = 0; i < b.length; i++) {
                if (b[i] === e && non_e.length > 0) {
                    const index2 = (+(get_digit() + get_digit() + get_digit())) % non_e.length;
                    b[i] = non_e[index2];
                }
            }
            return e;
        }
        let predictions = [];
        for (let i = 0; i < 24; i++) {
            const injure = () => {
                const x = l(injury);
                oldinjury.push([x, i]);
                return x;
            }
            const ampm = i < 12 ? "AM" : "PM";
            const hour = (i % 12) || 12;
            const min = (+get_digit() % 6) + get_digit();
            let pred = "";
            switch (+l(types)) {
            case 0: pred = "You will meet a person named " + l(names) + " " + l(names) + " " + l(surnames) + ". You will talk to them for " + (+get_digit() + 2) + " minutes and " + ((+get_digit() % 6) || 4) + get_digit() + " seconds. You will " + l(["become great friends.", "become mortal enemies.", "never see each other again."]); break;
            case 1: pred = "You will " + injure() + " in front of " + (+get_digit() + 2) + " people. " + (+get_digit() + 20) + " seconds later, you will " + l(mild) + "."; break;
            case 2: pred = "You will unintentionally ingest " + get_nz() + get_digit() + get_digit() + " milligrams of " + l(toxins) + ". You will survive after drinking " + get_nz() + get_digit() + get_digit() + " milliliters of " + l(drink) + " and eating a piece of " + l(food) + "."; break;
            case 3: pred = "You will nearly succumb to " + l(disease) + ", but will survive after drinking " + get_nz() + get_digit() + get_digit() + " milliliters of " + l(drink) + " and eating a piece of " + l(food) + "."; break;
            case 4: pred = "You will make the mistake of putting on clothes made of " + l(clothes) + ". This will bring you great harm " + l(["tomorrow", "very soon", "in several years", "in about a month"]) + "."; break;
            case 5: pred = "You will find you have misplaced your " + l(object) + ". " + get_nz() + get_digit() + " seconds later, you will remember that it was left " + l(loc) + "."; break;
            case 6: pred = "Your phone will ring. When you pick it up, you will see that the person calling you was your favorite teacher from grade " + ((get_nz() - 1) || 3) + ". You will panic and hang up after letting the phone ring for " + (+get_digit() + 2) + " and a half seconds."; break;
            case 7: pred = "You will come into possession of a cursed " + l(idol) + ". You will make " + l(["poor", "good"]) + " decisions regarding it."; break;
            case 8: pred = "You will check the Zeagle's Instagram account. The follower count will have increased by " + get_nz() + ". " + get_nz() + get_digit() + " seconds later, you will check the Beagle's account. Their follower count will have decreased by " + get_nz() + "."; break;
            case 9: pred = "You will " + l(media) + " that was made in 19" + get_digit() + get_digit() + ". You will like it " + l(["less","more"]) + " than you expect. " + get_nz() + get_digit() + " seconds later, you will hear it mentioned by someone nearby who is talking with a group of their " + l(group) + ". You will interpret this synchronicity as " + l(["mere coincidence.", "a message from God."]); break;
            case 10: pred = "You will find a qr code on a sticker that someone placed on " + l(["your backpack","the wall","the floor","the ceiling"]) + ". You will scan it, and it will bring you to this very website. You will then check your horoscope again, taking " + get_nz() + get_digit() + " seconds to carefully enter your exact date and time of birth accurately. You will find that this prediction you are reading now will have mysteriously disappeared."; break;
            case 11: pred = "You will suddenly crave " + l(food) + ". This desire will not be satisfied " + l(["ever","until tomorrow","until next week","for a few years"]) + "."; break;
            case 12: pred = "You will see a post online that will make you unreasonably " + l(emotion) + ". After " + get_nz() + get_digit() + " seconds, the feeling will pass as you are distracted by the next post you see, captioned &quot;" + l(post) + "&quot;."; break;
            case 13: pred = "You will suddenly think about " + l(clothes) + " clothing for no reason in particular. This will make you feel " + l(emotion) + ". " + get_nz() + get_digit() + " seconds later, you will " + injure() + "."; break;
            case 14: pred = "You will recieve an email stating that a new device has logged into your " + l(account) + " account. This was you, since you just had to login after you were logged out for some reason on your phone. After contemplating life for " + (+get_digit() + 2) + " seconds, you will delete the email."; break;
            case 15: pred = "While you are washing your hands, you will hear a sound from another room. You will think that this sound is " + l(sound) + ". You will be wrong. You will spend " + get_nz() + get_digit() + " seconds trying to figure out what the sound actually was, and then you will go on with your day."; break;
            case 16: pred = "You will remember to reply to your friend's text that you forgot about. Right when you are preparing the response, the friend will text you a singular " + l(punctuation) + ". This will make you feel " + l(emotion) + "."; break;
            case 17: pred = "You will remember an old Zeagle headline. It will make you feel " + l(emotion) + ". You will continue on with your day after reminiscing for " + get_nz() + get_digit() + " seconds."; break;
            case 18: pred = "Out of the corner of your eye, you will think you see a bag from " + l(store) + ". When you look, it will not be there. This incident will make you feel " + l(emotion) + ". " + (+get_digit() + 20) + " seconds later, you will " + l(mild) + "."; break;
            case 19:
                if (oldinjury.length) {
                    x = l(oldinjury);
                    inj = x[0];
                    n = x[1];
                    pred = (n >= ((new Date).getHours() + 1)) ? ("You will " + inj + " again. That really sucks.") : "You will realize that you are feeling better than you have in days. This will make you happy. 37 seconds later, you will feel a sharp pain in your left foot.";
                } else {
                    pred = "You will realize that you are feeling better than you have in days. This will make you happy. " + get_nz() + get_digit() + " seconds later, you will hear a sharp ringing sound in your " + l(["left","right"]) + " ear.";
                } break;
            case 20: pred = "You will look at the " + l(wall) + ". It will appear more " + l(pat) + " than you remember it being. " + (+get_digit() + 20) + " seconds later, you will " + l(mild) + "."; break;
            case 21: pred = "You will hear someone named " + l(names) + " " + l(names) + " " + l(surnames) + " speaking a language you can't recognize. Because you will be too embarrassed to ask them, you will look up the phrase &quot;" + l(langp) + "&quot;. This will not give you the answer."; break;
            case 22: pred = "While you are " + l(["walking","running"]) + ", you will randomly remember a fact from a " + l(field) + " class several years ago. While you are distracted thinking about this fact, you will slam face-first into the wall. It " + l(["will", "will not"]) + " hurt. 5" + get_digit() + " seconds later, you will drink " + get_nz() + get_digit() + get_digit() + " milliliters of " + l(drink) + "."; break;
            case 23: pred = "You will put Drye's rap album on shuffle. The first song will be &quot;" + l(song) + "&quot;. The last will be &quot;" + l(song) + "&quot;."; break;
            case 24: pred = "You will " + l(["begin to dissociate", "stare off into space", "look off into the middle distance"]) + ". You will feel you can see through objects, but this feeling will become too strong way too fast and you will think you can see things like " + l(["if the worms from dune were even more fucked up and had like scars and biker tattoos.", "if the spaceships from star wars were even bigger and caused problems for everyone because they were so big."]); break;
            case 25: pred = "You will close your eyes, trying to envision your dream world where you would be the happiest. You would think it would be where you live with your " + l(["partner", "two partners"]) + " and " + l(["two", "three", "four"]) + " kids who are growing up healthy and strong, but actually it is exactly how you are living now except " + l(["your feet are so small they are like doll feet.", "your hands are so big it scares people."]); break;
            case 26: pred = "Your leg muscles will be at the perfect strength for jumping. " + l(["You will jump the highest you have ever jumped or ever will jump.", "You will fail to jump, wasting the opportunity."]); break;
            case 27: pred = "You will be caught in the crossfire between two elite hacking organizations where the only way they can battle is by slingshotting your " + l(["data", "passwords", "personal info"]) + " as fast as they can at eachother."; break;
            case 28: pred = l(["An old friend", "Your nextdoor neighbor", "Someone you barely know"]) + " will come banging on the your door demanding to be let in because they have critical information regarding a big thing happening in the neighborhood. When the door is opened, they will instead open all your cabinets and smash all your dishes on the ground."; break;
            case 29: pred = "You will look at a " + l(["strip of wood", "block of concrete", "row of bricks", "patch of drywall"]) + " for so long that you will begin to see characters and then a story emerging from the patterns. You will call your publisher with the story and they will say it has some interesting ideas but needs to be streamlined."; break;
            case 30: pred = "You will hear the " + l(["loudest","quietest"]) + " sound you have ever heard by a large margin. This will make you feel " + l(emotion) + ". The sound will last only two seconds but the feeling will last much longer (" + get_nz() + get_digit() + " seconds)."; break;
            case 31: pred = "You will discover the principle that disproves " + l(phil) + ". You will contemplate this accomplishment for " + get_nz() + get_digit() + " seconds."; break;
            }
            predictions.push("at " + hour + ":" + min + " " + ampm + ", " + pred);
        }
        predictions = predictions.slice((new Date).getHours() + 1);
        if (predictions.length === 0) {
            predictions.push("As you read this, you will realize you are very tired. You will decide to go to sleep and check your horoscope again in the morning. Tomorrow, you will be greeted with 100% accurate predictions.");
        }
        document.querySelector("#horo").innerHTML = "<p id=ht>Your Horoscope for Today:</p><ul>" + predictions.map((a) => "<li>" + a + "</li>").join("") + "</ul><p> Your lucky home appliance is the " + l(appliance) + ". Your unlucky card is the " + l(rank) + " of " + l(suit) + ".</p><hr><p class=disclaimer>If you remember seeing earlier predictions for today that ended up being incorrect but are not shown currently, you are either misremembering or you have had this memory implanted into you by an outside being. If these predictions do not match ones you recieved earlier today, then either midnight has passed without your knowledge, or you have typed in your birthday or birth time differently. The favorite color is used only for data collection purposes and does not impact the predictions. These predicted outcomes are inevitable and cannot be changed by your knowing of them before-hand. The predictions are provided only to make you feel more informed. These predictions are written by a fortune teller that lives under the 4000 building staircase. Come back tomorrow for new predictions!</p>";
    }
}

const types = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

let oldinjury = [];

const phil = [
    "occam's razor",
    "the law of large numbers",
    "the hippocratic oath",
    "dualism",
    "renewable energy"
];

const song = [
    "When the principal does it, that means it's not illegal",
    "Edde go to Bedde",
    "Drye Theme Song",
    "A million Watts but no Power",
    "Phone go home",
    "Parker my Car",
    "Bald Eagle"
];

const rank = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "jack",
    "queen",
    "king",
    "ace"
];

const suit = [
    "hearts",
    "diamonds",
    "clubs",
    "spades"
];

const appliance = [
    "push pin",
    "thumb tack",
    "thimble"
];

const field = [
    "science",
    "math",
    "history"
]

const langp = [
    "really long language",
    "really short language",
    "really pointy language",
    "really round language",
    "really gross language"
];

const pat = [
    "stripy",
    "polka-dotted",
    "bland",
    "detailed"
];

const wall = [
    "wall to your right",
    "wall to your left",
    "floor",
    "ceiling"
];

const store = [
    "Target",
    "Walmart",
    "McDonalds"
];

const punctuation = [
    "exclamation mark",
    "question mark",
    "period",
    "quotation mark",
    "apostrophe",
    "comma",
    "semicolon"
];

const sound = [
    "your phone",
    "a tv",
    "a fire alarm"
];

const account = [
    "Google",
    "Instagram",
    "Infinite Campus",
    "Canvas"
];

const media = [
    "read a book",
    "watch a movie",
    "listen to a song"
];

const group = [
    "friends",
    "coworkers",
    "classmates"
];

const post = [
    "top 10 first names of all time",
    "what is chatgpt and why should we be scared",
    "why emojis are getting bigger",
    "how longer texts can fit in smaller phones",
    "the problem with big sinks",
    "why you are wrong about guitars",
    "this new movie is all zingers",
    "why cars are built backwards",
    "you are riding bikes wrong",
    "why tables are smaller than they used to be",
    "youtube has gone too far",
    "why food is getting longer"
];

const emotion = [
    "melancholic",
    "gleeful",
    "joyous",
    "furious",
    "anxious",
    "depressed",
    "disgusted"
];

const idol = [
    "dvd",
    "cd",
    "casette tape",
    "vinyl record",
    "usb drive",
    "sd card"
];

const loc = [
    "under your bed",
    "inside your pillow",
    "under the carpet",
    "outside in the cold",
    "above your roof",
    "in your first block classroom",
    "in your second block classroom"
];

const object = [
    "left shoe",
    "left sock",
    "right shoe",
    "right sock",
    "house key"
];

const clothes = [
    "linen",
    "silk",
    "polyester",
    "nylon"
];

const drink = [
    "sparkling water",
    "orange juice",
    "black raspberry juice",
    "pink lemonade",
    "diet dr. pepper",
    "2% milk",
    "half-sweet half-unsweet tea"
];

const food = [
    "corned beef",
    "mincemeat",
    "boiled chicken",
    "cornbread"
];

const disease = [
    "the bubonic plague",
    "the curse of ra",
    "hysteria",
    "rage-induced psychosis",
    "typhoid fever",
    "malaria",
    "tetanus"
];

const toxins = [
    "Lead (ii) Oxide",
    "Hexavalent Chromium",
    "Dimethylmercury",
    "Uranium hexafluoride",
    "t-butyl Lithium"
];

const mild = [
    "cough violently two times",
    "sneeze violently three times",
    "spill your drink on the carpet",
    "drop your phone",
    "scratch an itch on your lower left thigh",
    "notice a small crack on your phone",
    "respond to a text from your friend. yes, that friend",
    "misjudge a social situation"
];

const injury = [
    "stub your toe",
    "trip and fall",
    "accidentally cut your finger",
    "scrape your elbow"
];

const names = [
    "James",
    "Mary",
    "Michael",
    "Patricia",
    "John",
    "Jennifer",
    "Robert",
    "Linda",
    "David",
    "Elizabeth",
    "William",
    "Barbara",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Karen",
    "Christopher",
    "Sarah",
    "Charles",
    "Lisa",
    "Daniel",
    "Nancy",
    "Matthew",
    "Sandra",
    "Anthony",
    "Ashley",
    "Mark",
    "Emily",
    "Steven",
    "Kimberly",
    "Donald",
    "Betty",
    "Andrew",
    "Margaret",
    "Joshua",
    "Donna",
    "Paul",
    "Michelle",
    "Kenneth",
    "Carol",
    "Kevin",
    "Amanda",
    "Brian",
    "Melissa",
    "Timothy",
    "Deborah",
    "Ronald",
    "Stephanie",
    "Jason",
    "Rebecca",
    "George",
    "Sharon",
    "Edward",
    "Laura",
    "Jeffrey",
    "Cynthia",
    "Ryan",
    "Amy",
    "Jacob",
    "Kathleen",
    "Nicholas",
    "Angela",
    "Gary",
    "Dorothy",
    "Eric",
    "Shirley",
    "Jonathan",
    "Emma",
    "Stephen",
    "Brenda",
    "Larry",
    "Nicole",
    "Justin",
    "Pamela",
    "Benjamin",
    "Samantha",
    "Scott",
    "Anna",
    "Brandon",
    "Katherine",
    "Samuel",
    "Christine",
    "Gregory",
    "Debra",
    "Alexander",
    "Rachel",
    "Patrick",
    "Olivia",
    "Frank",
    "Carolyn",
    "Jack",
    "Maria",
    "Raymond",
    "Janet",
    "Dennis",
    "Heather",
    "Tyler",
    "Diane",
    "Aaron",
    "Catherine",
    "Jerry",
    "Julie",
    "Jose",
    "Victoria",
    "Nathan",
    "Helen",
    "Adam",
    "Joyce",
    "Henry",
    "Lauren",
    "Zachary",
    "Kelly",
    "Douglas",
    "Christina",
    "Peter",
    "Joan",
    "Noah",
    "Judith",
    "Kyle",
    "Ruth",
    "Ethan",
    "Hannah",
    "Christian",
    "Evelyn",
    "Jeremy",
    "Andrea",
    "Keith",
    "Virginia",
    "Austin",
    "Megan",
    "Sean",
    "Cheryl",
    "Roger",
    "Jacqueline",
    "Terry",
    "Madison",
    "Walter",
    "Sophia",
    "Dylan",
    "Abigail",
    "Gerald",
    "Teresa",
    "Carl",
    "Isabella",
    "Jordan",
    "Sara",
    "Bryan",
    "Janice",
    "Gabriel",
    "Martha",
    "Jesse",
    "Gloria",
    "Harold",
    "Kathryn",
    "Lawrence",
    "Ann",
    "Logan",
    "Charlotte",
    "Arthur",
    "Judy",
    "Bruce",
    "Amber",
    "Billy",
    "Julia",
    "Elijah",
    "Grace",
    "Joe",
    "Denise",
    "Alan",
    "Danielle",
    "Juan",
    "Natalie",
    "Liam",
    "Alice",
    "Willie",
    "Marilyn",
    "Mason",
    "Diana",
    "Albert",
    "Beverly",
    "Randy",
    "Jean",
    "Wayne",
    "Brittany",
    "Vincent",
    "Theresa",
    "Lucas",
    "Frances",
    "Caleb",
    "Kayla",
    "Luke",
    "Alexis",
    "Bobby",
    "Tiffany",
    "Isaac",
    "Lori",
    "Bradley",
    "Kathy"
];

const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
    "Gomez",
    "Phillips",
    "Evans",
    "Turner",
    "Diaz",
    "Parker",
    "Cruz",
    "Edwards",
    "Collins",
    "Reyes",
    "Stewart",
    "Morris",
    "Morales",
    "Murphy",
    "Cook",
    "Rogers",
    "Gutierrez",
    "Ortiz",
    "Morgan",
    "Cooper",
    "Peterson",
    "Bailey",
    "Reed",
    "Kelly",
    "Howard",
    "Ramos",
    "Kim",
    "Cox",
    "Ward",
    "Richardson",
    "Watson",
    "Brooks",
    "Chavez",
    "Wood",
    "James",
    "Bennett",
    "Gray",
    "Mendoza",
    "Ruiz",
    "Hughes",
    "Price",
    "Alvarez",
    "Castillo",
    "Sanders",
    "Patel",
    "Myers",
    "Long",
    "Ross",
    "Foster",
    "Jimenez"
];
