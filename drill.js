const ice_sounds = [1,2,3,4,5,6].map((i) => {
    const fn = "./sfx/drill" + i + ".mp3";
    const a = new Audio(fn);
    a.load();
    return a;
});

const images = [
    "a.jpeg",
    "b.jpeg",
    "19204429-F080-47B7-B255-FB0A7026ED2A.jpeg",
    "beagle1.png",
    "IMG_0345.jpeg",
    "IMG_4505.jpeg",
    "IMG_4641.jpeg",
    "78788356889__500CC21F-6418-47E0-AADB-304C1EA6A13A.jpeg",
    "beagle2.png",
    "IMG_2458-1.jpeg",
    "IMG_4532.jpeg",
    "IMG_4701.jpeg",
    "78976861886__9FFEADFF-606F-4EF0-825B-289E32DD0FF0.jpeg",
    "image000000-2.jpeg",
    "IMG_4061.jpeg",
    "IMG_4536.jpeg",
    "IMG_4746.jpeg",
    "79418447234__7B0F437B-E9D3-4ACB-83C4-4371A6C281A1.jpeg",
    "image000000-3.jpeg",
    "IMG_4394.jpeg",
    "IMG_4542.jpeg",
].map(f => {
    return "./vault/" + f;
});

document.addEventListener('DOMContentLoaded', (event) => {
    const crank = document.querySelector("#drillcrank");
    const ice = document.querySelector("#icedrill");
    const f = (e) => {
        crank.style.left = e.pageX + "px";
        crank.style.top = e.pageY + "px";
    };
    let r = 0;
    document.querySelector("html").onmousemove = f;
    document.querySelector("html").onclick = (e) => {
        f(e);
        if (e.pageY > icedrill.y) {
            r++;
            crank.style.transform = "rotate(" + (r * 30) + "deg) translate(14%, 14%)";

            let a = ice_sounds[Math.floor(Math.random() * ice_sounds.length)];
            a.pause();
            a.load();
            a.play();
            if (r % 5 === 0) {
                const img = new Image();
                img.src = images[Math.floor(images.length * Math.random())];
                img.style.position = "absolute";
                img.style.left = e.pageX + "px";
                img.style.top = e.pageY + "px";
                console.log(img);
                document.body.appendChild(img);
                const initX = e.pageX + "px";
                const initY = e.pageY + "px";
                let n = 0;
                const r1 = Math.random();
                const r2 = Math.random();
                const g = () => {
                    if (n < 400) {
                        n++;
                        img.style.left = (e.pageX - n/2 + 200 * r1) + "px";
                        img.style.top = (e.pageY + 200 * r2) + "px";
                        img.width = n;
                        setTimeout(g, 1);
                    }
                }
                g();
            }
        }
    };
});
