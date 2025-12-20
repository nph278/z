setInterval(() => {
    let a = 1766725200000 - Date.now();
    let days = Math.floor(a/86400000);
    let hours = Math.floor((a/3600000)-24*days);
    let minutes = Math.floor((a/60000)-60*hours-1440*days);
    let seconds = ((a/1000)-60*minutes-3600*hours-86400*days).toFixed(3);
    let s = days +
        " DAYS & " +
        hours +
        " HOURS & " +
        minutes +
        " MINUTES & " +
        seconds +
        Math.random().toFixed(10).toString().split(".")[1] +
        " SECONDS";
    document.querySelector("#count").innerText = s;
    document.querySelectorAll(".room").forEach((e) => {
        e.innerText=Math.floor(Math.random()*1000)
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
    make_element("<img class=qr id='qr" + uuid + "' src='" + qr_links[Math.floor(Math.random() * qr_links.length)] + "' width=" + w + " height=" + w + " style='top: " + Math.floor((window.innerHeight-w) * Math.random()) + "px; left: " + Math.floor((window.innerWidth-w) * Math.random()) + "px;' onclick='make_notification(\"New News is Rolling In\")'>");
    let b = uuid;
    setTimeout(() => {
        document.querySelector("#qr" + b).style.opacity = "50%";
    }, 1000);
    setTimeout(() => {
        document.querySelector("#qr" + b).outerHTML = "";
    }, 5000);
    if (t > 1000) {
        t -= 100;
    }
    setTimeout(make_qr, t);
}

setTimeout(make_qr, 5000);

make_notification = (s) => {
    uuid++;
    document.querySelector("#notifications").insertAdjacentHTML("beforeend", "<div class='notification' id='not"+uuid+"' onclick=\"document.querySelector('#not"+uuid+"').outerHTML=''\">" + s + " (CLICK2REMOVE)</div>");
}

window.onload = () => {
    make_notification("Not Associated With East Mecklenburg Or The Eagle Or Beagle Thereof");
    make_notification("it ha$ come to the ATTENTION of zeagle management that two web$ite$ are using $imilar names to the zeagle to decieve readers and $teal profit$. the$e are not OFFICIAL outlet$ of new$ media");
}

let alerts = ["<span class=room>700</span> Hall Clo$ed For Repair$",
              "Unix Epoch Converter Free Download",
              "Wikipedia Timeline of Far FUture Inducted Into Unu$ual Articles$ List",
              "Where To Inve$t In Clean <span class=air>Air</span> Future$",
              "Cheezit cla$$ action suit: Check If U Qualify for Big Ca$h",
              "Free Download New Animal Sounds",
              "Free Download Uppercut To Your Jaw",
              "10 $ecrets 2 E$cape Any E$cape Room"];

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

let oa = ["o", "a"];
let oan = 0;
setInterval(() => {
    oan = (oan + 1) % oa.length;
    document.querySelectorAll(".oa").forEach((e) => {
        e.innerText = oa[oan];
    });
}, 200);
