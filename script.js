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


const siren = new Audio("./siren.mp3");
siren.load();
play_siren = () => {
    siren.load();
    siren.play();
}

const scream = new Audio("./scream.wav");
scream.load();
play_scream = () => {
    scream.play();
}

make_notification = (s) => {
    uuid++;
    document.querySelector("#notifications").insertAdjacentHTML("beforeend", "<div class='notification' id='not"+uuid+"' onclick=\"document.querySelector('#not"+uuid+"').outerHTML=''\">" + s + " (CLICK2REMOVE)</div>");
    while (((15 * document.querySelectorAll(".notification").length) / window.innerHeight) > .23) {
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
    document.querySelector("#drye").onclick = () => {
        document.querySelector("#drye").outerHTML = "";
    }
    make_notification("Not Associated With East Mecklenburg Or The Eagle Or Beagle Thereof");
    document.querySelectorAll(".eye").forEach(e => {
        e.onclick = () => {
            e.parentElement.querySelectorAll("p").forEach(f => {
                f.setAttribute("data-disabled", "true");
            });
            e.parentElement.querySelectorAll(".p").forEach(f => {
                f.outerHTML = "<p class=transcript>" + f.alt + "</p>";
            });
            e.outerHTML = "";
            make_notification("While the Seeing-Eye is a Nece$$ary Establishment, transcripts are a Poor Replacement 4 The Original, and $o are Not Official Outlets of New$ Media");
        };
    });
    let i = 0;
    document.querySelectorAll(".hi").forEach((e) => {
        const j = i;
        let rememberHack=() => {
            localStorage.setItem("last_id_remember_hack"+j,e.value);
            console.log(e.value);
        };
        e.value = localStorage.getItem("last_id_remember_hack"+j);
        console.log(localStorage.getItem("last_id_remember_hack"+j));
        console.log(e.value);
        i++;
        e.addEventListener("input",rememberHack);
        e.addEventListener("change",rememberHack);
    })

    const c = localStorage.getItem("gold_code");
    if (c) {
        enable_gold(c);
    }
});

let ismobile = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) ismobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

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
              "Free Download Accurate Nervous System Simulator",
              "New Drye Catchphrase goes Viral",
              "Bribe Record Broken but Drye turns Blind Eye"];
if (!ismobile) {
    alerts.push("Hint: Hold J");
}

let notif_interval = 10000;

const notif = () => {
    setTimeout(() => {
        make_notification(alerts[Math.floor(Math.random() * alerts.length)]);
        notif();
    }, notif_interval);
}

notif();

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
        play_scream();
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

window.addEventListener("load", async (event) => {
    const ps = document.querySelectorAll("[data-src]");

    for (let i = 0; i < ps.length; i++) {
        const e = ps[i];
        if (!e.getAttribute("data-disabled")) {
            const img = new Image();
            img.src = e.getAttribute("data-src");
            img.className = "p";
            img.alt = e.innerHTML;
            await (new Promise((resolve) => img.addEventListener("load", resolve)));
            if (!e.getAttribute("data-disabled")) {
                e.replaceWith(img);
            }
        }
    }
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
            case 8: get_nz(); const fol=get_nz(); pred = "You will check the Zeagle's Instagram account. The follower count will have increased by " + fol + ". " + get_nz() + get_digit() + " seconds later, you will check the Beagle's account. Their follower count will have decreased by " + fol + "."; break;
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

const gold = () => {
    const code = document.querySelector("#goldcode").value.toUpperCase();
    enable_gold(code);
}

const extraslogans = [
    "$atire i$ Predicated on a Fallacy",
    "$keptici$m i$ not Irrefutable",
    "The Ceremonial above the Haphazard",
    "Ethic$ and Ae$thetic$ are One",
    "The Tape wa$ $plit in Two"
];

const enable_gold = (code) => {
    if (hashes.includes(sha256(code))) {
        document.querySelector("#goldform").outerHTML = "";
        make_notification("Zeagle GOLD Activated!");
        extraslogans.forEach(s => {
            document.querySelector("#slogans").innerHTML += "<section>" + s + "</section>";
        });
        notif_interval = 5000;
        document.querySelector("h1 img").src = "./logo_gold.jpg";
        document.querySelector("#extlinks").innerHTML += "<a class='extlink goldlink' href='./gold_merch.html'>click 4 gold merch</a>";
        window.scrollTo(0, 0);
        localStorage.setItem("gold_code", code);
    } else {
        alert("INVALID GOLD CODE");
    }
}

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
    "Drye Theme Song (2025 freestyle)",
    "A million Watts but no Power",
    "Phone go home / Cellphone Hellphone",
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

const hashes = [
    "af3cde541ea1433c28d8b5a859a4ba18beae2d3b9c46492649bb35822b3f8c1f",
    "2a939d744e540f0c2e52ca7a50fcce3f56452bfc07c123d78569ca4bc336a4af",
    "2d478e0ba2c39f846073f5d77590371b6646129638ade119895686668a57800a",
    "9b20a4e9e890c3934e9ceaedb02800327556ff81af05d70320daee45ddd7c909",
    "c5deca4d1181e1e8622fb7ef116327f218ceed6a66c4196df42ec251640c81ec",
    "0f4778c624c116a1e4c30b051f971d5ffbeb54e95276abafeea3c5c60a83b56d",
    "26300f5e3eda9dcca3ea39d66500e8b0abaf4004003eef298351e9e80e3a9085",
    "c5edf4aec124727ee1882102880338b93d518a1e227badd8e8a833faeba70f47",
    "6e41532da49a8e6f1b5e490c47c5289accf4c9429109f96e519fb241760fab63",
    "5a631b3550eaeaefc4b42e9c82d1babe7432556dd1b2e83ac4300f23bcbd95ce",
    "d4119234765b5bcbece02b003ab5381dc306f74eae74335e5ff6a943a405ce69",
    "341e33dc0f0b166ced5529a6ce4c0c04edf7821c493d8bae381c092dbe6c9843",
    "9e99bd9cec78918ab4141489833c4f3b2de715b3de51ab1399b9c0efdf6cdcb1",
    "b1b141c42053ff1bbe27a538c0569023ec48c29e951caf8d0c3a1941272ccfda",
    "f57b742b38c4690cf4bec12c7d82baaee25cd5638558ecf6d66c5faaae077cd5",
    "36fa00ef154ec7bf4951f0fde7b785ee3b834091cf7d124170bba3012e2138df",
    "219c13c1fa6e85f2a621d25423c8c8f563d6b654d4fb5e0ec4170e973f88c102",
    "7e3ecaa72fd8f8ca63cac6f3a748d3bcdf4f1856936f6dded4db4b4b9dee4506",
    "169a5f6ead7fe8be93cd720a3c3a8813131040fc4e475178713a64588f1344c8",
    "e5cfe3b107b938afd5e250fda6d2c1d6e9aedeb4f5833ba3597e679c1ffa2c34",
    "bd68b085b23dcf0de6ac384b0578275a1f498bad5feb446b37c85018fbfe27bc",
    "3437ae3aec92fb360b629edcf3558fdff1ccb57db2f7c81d3aa8783304fe0f61",
    "595b2dbee1c4e9fc2f690f2063fda862eafad0e570bd345ba570e1284b2312f5",
    "0006b8640298e121e3c4139903207c507d644bd19c0f6d4ea225f475fe1d58b6",
    "c898def764266c91bbd0088d847ccaf1bd29b5c6d7ab8e38f04da5d661692010",
    "b6b186a1e667dcd8d09543025734e93f7005270dc7a860eef78de0a730cbeb07",
    "6ba74daf2031e0d01beca61dec34af9f8ea48cf610cbdfa3a8a4e106ada22afc",
    "3064d822b4a0639ad16fff013431e41f9ba494cdfe7fc5334cb3792d6845fdff",
    "d28025058ec39d31fc5b352905c480619498c23a1cec11c6bcf965ba84d3d800",
    "ec83fdae6649b691851cc66a03b1688ffd9bd43af4b1e8b026b63da5a463eef0",
    "2b1e19f229fc89b2d04631f08096d36c058f5b185713b2533b35de3a51625218",
    "42c9e2f9667b561dc50789608dca647ce852e23499a201e1ebb50a186acbc2ec",
    "9217c73b0bb0f6ce5b30a3caebf11204023fedbf9ea8b8700e48900083a48d1b",
    "a57a636e620f1bde0df6fcb6330197b3b95a6992d8e5cab21d5637c8a439832e",
    "88de6582eacfcf67f99a52a6f7fd24e34d53f9002e8feef3f59161672c533c61",
    "3fdbcfe04288b0f2cf4c5ebcb303239b555248302419f7d6c06618b20863e533",
    "0f86d8bf415629331fa5d545f0e09c3f75d2ab91f0825c64c58a4c0c89a18197",
    "2c3bf21b8d5042f8fa580015b7329ea8267a5b59123e343cbd80ae92a86017c4",
    "3feb14225b4e1e5f90df977523a6394d17cae2f2c9b0ec47da8be568c147ad94",
    "2d434113d6f3d33ee46396e8ac4413b9402e5b5228c07f87158a4e1b8bff5624",
    "1dd1b7731c27e9b716cbdc2bea87274718f48ea98476201c8840285784ec019d",
    "703c1e33138170b0ee169ef0b501ccadf2b8a584cb3d7856dbc0603cf700d35c",
    "645ffb11538da7a7100ccc683d7519c568a105fed523ffc83252a020902a0494",
    "3d09a9f9dca47ffff4373a43f2b8364f5cd88b89db29d11cdc04bb1d9a93dc95",
    "4baf09f54d656fdaa13010c5e9caf0901337d2d4bc844d96560c9e4584a33bff",
    "268f1ddbfb83d64fa992264a794886041633e6b6ad49a563b266357efd5df697",
    "f100787e05c01c725a9fc582428af5783f6c551051737bc553d6d2f987a7f958",
    "fe62d68aa5a9f95963b788d0ee7c93b95ff46f3566c96ab0ec99c2722f17282f",
    "90f76ccb7225b4a8143b2909c20a9df70bddbede31b8d2a2ec9418f693a5cc31",
    "a840fe9e77eec7897291fbfeb4af498ea40b69f728c527835227b71a3d8a7eb2",
    "3c3d884140557b3ea9cf23e6d4c28a09d58043281ede1ed0b94f1162de8288e8",
    "e64a47c733d00ddac164a1f1b4dcc5eeef15bfb2ecc20a13bb101eb40d402044",
    "2529aef00b325c453acd2346a25bb0029e8f7e8d8f0d9d6aa97d8ff9c130cb1d",
    "65f242c46a94e882eec44d70f137fc151dfba0a67603fa871548b1741226b4c6",
    "ed7d5a4dd8da700bd521eb2619542b5c4759e4c112b4322ce9d2cc499a258951",
    "ae5a2941c1e07147e37004b2482bd3bc66d63569cfc8045f1f7b013ad05ad5ec",
    "e52e08b41ae7068a495191c79a53808c2bdf8dfdcf1a00c3e13cec90f6194fa1",
    "3d27984d8a32cd5265f8397508ad4f2c52cbe6a6d3ee5f72af9f65d944217018",
    "131fdf77e106bf5ff3c4a77317bab6bdfac989b3ca73c3cb39a435417b9d3ab8",
    "7618bd984c71000f23dfe2de4f0bd8e2327100f75c82e961c107bb5bbec7b392",
    "48da8f6ca2c809c265acefe01a4b760d3bb9387878413610251243f4bcc91518",
    "570dd10553c1825643fb2f1eb565fe08928d581d9f0dfabc4eb1409ee26dc317",
    "1e1fcd4d17e55207c53adbdec3cb0d9a7ca45dc828173b00966b98931333e08c",
    "c7fb3a0ecffb1fceb62421436e5574a04134ce8e3f564696844da177c7d69399",
    "35dcdd9fab28c67c48f8c6d623bf4e8b5b808b2230b6b515a763519dc73169b4",
    "cdcdea6a6a624660c679f31daff7212b52c4008317c141abf15d6e467e877f24",
    "d174610a971ba26303e051dec6c26f7251cfaee28bf14cea4d71b1f181223c2e",
    "677045ddad8e361257599509f40a08449ebacd2b8bf56168fd7586b18b0ba844",
    "068ad8bb17451e4f9ea64a4e791c46cd7e12fb2fb5a84ad0af34700cd4cf4b72",
    "e83d6ab49469fb4178f2e28370d20ef776f7c0e727d620c0c32a38ffddbed979",
    "0c0a6386d2a318b814c82aef8cc69c04d409715d3e3793f0a37c55dd953c0247",
    "dcc5f6ab31e4bc41512368fd5b83c96ab3c181a02c1e443806c707e32c14caf4",
    "30181e3e139c2167ba4b50f9a94910d608de90f7ff0a239bf8aa12559240a12c",
    "25b3f7604fc7d03a53e02e46b91c4b6aeb992a9507cb31500c1f10bdce7637ab",
    "fd6afde2b2d3f5b13f14b3c9c2c67e451190267bab9db45dbbc79a72cd6f7759",
    "aac1d995bd169815777cf324f52396f64530ffc3a896f7e5c88fcdad320eedb3",
    "b78094e1b148468cd2dcf197f45c5a15dc91a798eea59314a4a3eb9e698ea979",
    "7ac5562204cb0fcd04b1eb00005edc9dfe03d5aa540c3562f61eba545b8e5222",
    "8d446769586cb7dbce40f834c84ac630aa209fb6e5b7d22505003418e36da0eb",
    "25bcf225cc9f4727567fc398da30655fea7867ffa030d0eaec4d1bc714c922a1",
    "50a472fa7034a006ad91abe34ab22b10b953ccbddad7f3ab3dfe7d25f49387f4",
    "1100dbbb13d8a5abbee81dca51b9bd0cfb47e24adc77b8b3f35328288ce8eecb",
    "df2c604836ca6aa78be1064e37e71d51ffde6b0d2a63699ae2bdffb463866386",
    "a1ac65a0c50114220ca87bde74163088e67a7b7525abd4560d2ae89d8bae7dd1",
    "4057a717fcf50396907fa0f59e0230467dba9ba97ae273dc6e3652ecf37ed1df",
    "c3c86f5848ef982f7bf2d9c640aee3354a5dbf4ce2a1a78ec8d16aa9ebc0e476",
    "bc9d9f07ff31f8401e049a890b2d421885c171eaffb0ee9a98fb4dd06b2017da",
    "a3c43e7c2538c82aa961832eb1fcba4bda34482ab34ab0b3403f19c4bca349f5",
    "805231d25873950b32e36f7e493bf946e056503edb05adf11f5be1286b553a1a",
    "afb36eb7956b65791b4ddce2226dc84f242fe3d6f5447d962440a0dbc54f18dc",
    "9f7bbc0ac99c72f955091fcbeb94db77237c3aff6fb752146b53e9e6b887ae37",
    "802161cfe87b9b72b7608cce04d286d165d7501f171a907844d2c1caa4e36114",
    "e692c5aa354f480ebc9109671160b6c42b7c561a87b444889c8c16bc62fd90db",
    "78801395b154220930987b6b79b6db0306c541c87d422772474cc7efd18ca3af",
    "a48265f329646c6d3dbb075c3ee464cc2e52ad6737c1f5d8d176a7115abf97e7",
    "8e922af11cfe58a8c4e6ab07efb8544019b6df27402018b39be9e670604424ad",
    "a9e5c1b4f0b7b83664e25171ef97bff6a5bcbeb0772f9100a45cc22bf90bb1ef",
    "ee85d1fa15669f235ab599e560c42223aa7cf9a0774d61e85c002e9dcbf13ae0",
    "1644fb74ce133304f6d13ed917c6f92bb78427895aec88d64808830dfe977b4e",
    "1ff05525a8272b6d1ee5273d32c0988b747a104cdf43cf05d9c7fcec8ea2ed53",
];
