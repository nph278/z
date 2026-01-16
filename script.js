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
              "Drye spotted wearing rose-tinted glasses"];

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

