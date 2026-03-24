// Dialogue from the judges that plays out when in fullscreen mode
// Points that pop up when you put on or take off stuff
// Lose points for incompatibles
// Sound effects
// Music
// Zhoes, Zocks, Tail zock
// Fix image textures
// Ensure phone support
// Link from game page
// Announcement

async function start() {
    const images = [];
    const make_image = (filename) => {
        const image = new Image();
        image.src = "./clothes/" + filename;
        images.push(image);
        return image;
    };

    const sounds = [];
    const make_sound = (filename) => {
        const sound = new Audio("./sfx/" + filename);
        sound.load();
        return sound;
    };

    const bgm1 = make_sound("zdshr_bg1.mp3");
    bgm1.loop = true;
    const bgm2 = make_sound("bgm.wav");
    bgm2.loop = true;
    const bgm3 = make_sound("zdshr_closet.mp3");
    bgm3.loop = true;
    const bgm4 = make_sound("tape.mp3");
    bgm4.loop = true;
    const bgm5 = make_sound("tapephone.mp3");

    const clothes = [];
    const add_clothing = (name, filename, texturable) => {
        const image = make_image(filename);
        clothes.push({
            name,
            original_image: image,
            colored_images: [],
            enabled: false,
            texture: 0,
            texturable,
        });
    }

    const colorize = (image, texture) => {
        const imageSize = image.width;

        const offscreen = new OffscreenCanvas(imageSize, imageSize);
        const ctx = offscreen.getContext("2d");

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, imageSize, imageSize);
        if (typeof texture === "function") {
            const getcolor = texture;
            for (let i = 0; i < imageData.data.length; i += 4) {
                const y = (Math.floor(i/(imageSize*4)))/image.height;
                const x = (Math.floor(i/4) % imageSize)/imageSize;
                const c = getcolor(x, y);
                imageData.data[i + 0] *= c[0];
                imageData.data[i + 1] *= c[1];
                imageData.data[i + 2] *= c[2];
            }
        } else {
            const aux_image = texture;
            const aux_offscreen = new OffscreenCanvas(aux_image.width, aux_image.width);
            const aux_ctx = aux_offscreen.getContext("2d");
            aux_ctx.drawImage(aux_image, 0, 0);
            const aux_data = aux_ctx.getImageData(0, 0, aux_image.width, aux_image.width).data;
            for (let i = 0; i < imageData.data.length; i += 4) {
                const y = ((Math.floor(i/(imageSize*4)))/image.height) * aux_image.height;
                const x = ((Math.floor(i/4) % imageSize)/imageSize) * aux_image.width;
                imageData.data[i + 0] *= aux_data[4 * Math.floor(y * aux_image.width + x) + 0]/255;
                imageData.data[i + 1] *= aux_data[4 * Math.floor(y * aux_image.width + x) + 1]/255;
                imageData.data[i + 2] *= aux_data[4 * Math.floor(y * aux_image.width + x) + 2]/255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        return offscreen;
    }

    let image_base = make_image("Zeagle_Base.png");
    let image_bg = make_image("bg1.jpg");
    let image_dump = make_image("dump.jpg");
    let image_rainbow = make_image("rainbow.png");
    let image_diffract = make_image("diffract.jpg");
    let image_closet = make_image("closet.jpg");
    let image_tapebg = make_image("tape.jpg");

    let bg = image_bg;

    const textures = [
        (x, y) => [0, y, x],
        image_rainbow,
        (x, y) => [1, 0, 0],
        (x, y) => [Math.random(), Math.random(), Math.random()],
        (x, y) => [0.5 * (1 + Math.sin(70*Math.sin(7*y)*x)),
                   0.5 * (1 + Math.sin(70*Math.sin(7*y)*x)),
                   0.5 * (1 + Math.sin(70*Math.sin(7*y)*x)),],
        image_diffract,
        (x, y) => [0, Math.random() * y, 0],
        (x, y) => [1, 1, 1],
    ];

    add_clothing("Zrop top", "Zrop_top.png", true);
    add_clothing("Zashes", "Zashes.png", false);
    add_clothing("Zloves", "Zloves.png", true);
    add_clothing("Zoveralls", "Zveralls.png", true);
    add_clothing("Zweatpants", "Zweatpant.png", true);
    add_clothing("Zants", "Zant.png", true);
    add_clothing("Zress", "Zress.png", true);
    add_clothing("Zkirt", "Zkirt.png", true);
    add_clothing("Off the zhoulder", "Off_the_zhouler.png", true);
    add_clothing("Zhirt", "Zhirt.png", true);
    add_clothing("Zongsleeves", "Zongsleeves.png", true);
    add_clothing("Zweatshirt", "Zweatshirt.png", true);
    add_clothing("Zlasses", "Zlasses.png", true);
    add_clothing("QR code chain", "ZR_code_chain.png", true);
    add_clothing("Zpike bracelet", "Zpike_bracelet.png", true);
    add_clothing("Face Zensor", "censor.png", true);

    const characters = {};
    const add_character = (id, name, filename) => {
        const image = filename ? make_image(filename) : null;
        characters[id] = {name, image};
    }

    add_character("self", null, null);
    add_character("judge1", "Judge 1", "judge1.png");
    add_character("judge2", "Judge 2", "judge2.png");
    add_character("judge3", "Judge 3", "judge3.png");
    add_character("judge4", "Judge 4", "judge4.png");
    add_character("judge5", "Judge 5", "judge5.png");
    add_character("judge6", "Judge 6", "judge6.png");
    add_character("judge7", "Judge 7", "judge7.png");
    add_character("beagle", "Beagler", "beagle.jpg");
    add_character("reporter", "??????", null);

    const side_size = 500;
    let side_on = null;
    let current_side_size = side_on ? side_size : 0;
    const button_height = 50;

    const scr_loading = 0;
    const scr_title = 1;
    const scr_ingame = 2;
    let screen = scr_loading;

    const scn_contest = 0;
    const scn_dump = 1;
    let scene = scn_contest;

    const canvas = document.querySelector("canvas");
    const width = 1500;
    const height = 1000;
    const hmargin = 5;
    const vmargin = 5;
    canvas.width = width;
    canvas.height = height;
    let sizemult = 1;
    const ctx = canvas.getContext("2d");

    const fps = 30;
    let cooldown = fps * 1;
    let fade = 0;
    let fadetype = null;
    const fadespeed = 1/fps;
    let zeagle_on = true;

    const dialogue_intro = [
        ["self", "It's the big day.", () => {bgm1.play()}],
        ["judge1", "On to our next contestant..."],
        ["judge1", "The Zeagle!"],
        ["judge2", "Choose a style..."],
        ["judge2", "and come back when you are ready."],
        ["self", "You notice something appear on the top left."],
    ];

    const dialogue_tape = [
        [
            ["self", "You rummage through the garbage..."],
            ["self", "and find a Lost Tape!"],
            ["self", "... although it seems half the tape is missing ..."],
        ],
        [
            ["self", "You sneak back into the media center.", () => {
                next_bg = image_closet;
                next_dialogue = dialogue_closet;
                fadetype = "out";
                bgm2.pause();
            }],
        ],
        [
            ["self", "You uncover a dusty tape player..."],
            ["self", "and insert the tape.", () => {
                next_bg = image_tapebg;
                next_dialogue = dialogue_interview;
                fadetype = "out";
                zeagle_on = false;
                bgm3.pause();
            }],
        ],
    ];

    const dialogue_closet = [
        ["self", "(The A/V closet seems an obvious choice)", () => {bgm3.play()}],
    ];

    const dialogue_interview = [
        ["self", "...", () => {bgm4.play()}],
        ["reporter", "We have here the Head Beagler..."],
        ["reporter", "who was just fired."],
        ["beagle", "They won't tell you this..."],
        ["beagle", "but I wasn't really the one in charge."],
        ["beagle", "The people who were really in charge..."],
        ["beagle", "they have done some horrible things."],
        ["reporter", "What kinds of things?"],
        ["beagle", "Machines... machines..."],
        ["beagle", "They... oh..."],
        ["beagle", "They'll kill me."],
        ["beagle", "I know they'll kill me."],
        ["reporter", "Stay focused. What machines?"],
        ["beagle", "They split the timeline..."],
        ["beagle", "It wasn't right..."],
        ["reporter", "What do you mean timeline?"],
        ["beagle", "There are two East Mecks now."],
        ["beagle", "I saw it all."],
        ["beagle", "And the other one..."],
        ["beagle", "the other one..."],
        ["beagle", "Oh....", () => {
            document.querySelector("#blackout").style.display = "inline";
            document.querySelector("title").text = "BEAGLEBECOMESZEAGLE";
            bgm4.pause();
            bgm5.play();
        }],
    ];

    const dialogues = [
        [
            ["judge2", "What am I even looking at?"],
            ["judge6", "This sucks."],
            ["self", "You think you can do better."],
        ],
        [
            ["judge3", "Uhhhhh...."],
            ["judge4", "Maybe you should try again."],
            ["self", "You think you can do better."],
        ],
        [
            ["judge7", "This doesn't seem right."],
            ["judge1", "A distinct lack of style."],
            ["self", "You think you can do better."],
        ],
    ];

    let next_bg = image_bg;
    let next_dialogue = dialogue_intro;

    let tape = 0;

    const dialogue_fail = [
        ["judge1", "Ok. I'm gonna cut to the chase."],
        ["judge1", "You don't have a chance here."],
        ["judge2", "You should leave.", () => {
            next_bg = image_dump;
            next_dialogue = dialogue_dump;
            fadetype = "out";
            bgm1.pause();
            scene = scn_dump;
        }],
    ];

    const dialogue_dump = [
        ["self", "You leave through the back.", () => {
            bgm2.play();
        }],
    ];

    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    shuffle(dialogues);

    let dialogue = null;
    let dialogue_line = 0;
    let dialogue_progress = 0;

    let popup = "";
    let popup_left = 0;
    let popup_pos = [0,0];
    const popup_fontsize = 350;

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
        canvas.style.width = sizemult * width + "px";
        ctx.globalCompositeOperation = "source-over";

        const time = Date.now();

        const draw_image_center = (image) => {
            const imagew = image.width*(1+.025*Math.sin(time/100));
            const imageh = image.height*(1+.005*Math.cos(time/100));
            ctx.drawImage(image, (width-imagew+current_side_size)/2, (height-imageh)/2, imagew, imageh);
        }

        if (screen === scr_loading) {
            ctx.fillStyle = "black";
            ctx.font = "100px Courier Prime, courier, monospace";
            ctx.fillText("loading...", 100, 100);
        } else if (screen === scr_title) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "hsl(" + Math.floor(time/10)%360 + ", 100%, 50%)";
            ctx.font = "300px Monsieur La Doulaise, cursive";
            ctx.fillText("Zaberdasher", 200, 300 + 10 * Math.sin(time/1000));
            ctx.fillStyle = "white";
            ctx.font = "50px Courier Prime, courier, monospace";
            ctx.fillText("East Meck's Premiere Character Creation Software", 20, 600);
            if (!cooldown) {
                ctx.font = "100px Courier Prime, courier, monospace";
                ctx.fillStyle = "red";
                ctx.fillText("Click2Begin", 450, 800);
            }
        } else if (screen === scr_ingame) {
            if (zeagle_on || fadetype === "out") {
                ctx.drawImage(bg, current_side_size, 0, width - current_side_size, height);
                draw_image_center(image_base);
                clothes.forEach((c) => {
                    if (c.enabled) {
                        draw_image_center(c.colored_images[c.texture]);
                    }
                });
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
                const shake = 5;
                ctx.drawImage(bg, current_side_size, 0, width - current_side_size + Math.random() * shake, height + Math.random() * shake);
            }

            if (!dialogue) {
                ctx.fillStyle = "gray";
                ctx.fillRect(0, 0, current_side_size, height);
                ctx.fillRect(current_side_size, 0, button_height, button_height);

                ctx.fillStyle = "black";
                ctx.beginPath();
                if (side_on) {
                    ctx.moveTo(current_side_size + .8 * button_height, .2 * button_height);
                    ctx.lineTo(current_side_size + .8 * button_height, .8 * button_height);
                    ctx.lineTo(current_side_size + .2 * button_height, .5 * button_height);
                    ctx.lineTo(current_side_size + .8 * button_height, .2 * button_height);
                } else {
                    ctx.moveTo(current_side_size + .2 * button_height, .2 * button_height);
                    ctx.lineTo(current_side_size + .2 * button_height, .8 * button_height);
                    ctx.lineTo(current_side_size + .8 * button_height, .5 * button_height);
                    ctx.lineTo(current_side_size + .2 * button_height, .2 * button_height);
                }
                ctx.fill();
            }

            for (let i = 0; i < clothes.length; i++) {
                const c = clothes[i];

                if (c.enabled) {
                    ctx.fillStyle = "hsl(" + (360 * i / clothes.length) + ", 100%, 50%)";
                    ctx.fillRect(current_side_size - side_size, i * button_height, side_size, button_height);

                    if (c.texturable) {
                        ctx.fillStyle = "hsl(" + (180 + 360 * i / clothes.length) + ", 100%, " + (c.texture*40/textures.length) + "%)";
                        ctx.fillRect(current_side_size - button_height, i * button_height, button_height, button_height);

                        ctx.fillStyle = "white";
                        ctx.font = "45px Libertinus Serif, times, serif";
                        ctx.fillText(c.texture, current_side_size - button_height + 14, (i+1) * button_height - 10);
                    }
                }

                ctx.fillStyle = "black";
                ctx.font = "45px Courier Prime, courier, monospace";
                ctx.fillText(c.name, current_side_size - side_size, (i+1) * button_height - 10);
            }

            if (scene === scn_dump) {
                const s = ["Dig through trash", "Sneak back in", "Play tape"][tape];

                ctx.fillStyle = "black";
                ctx.font = "45px Courier Prime, courier, monospace";
                ctx.fillText(s, current_side_size - side_size, height - 20);
            }
        }

        ctx.fillStyle = "rgba(0,0,0,"+fade+")";
        ctx.fillRect(0, 0, width, height);

        if (popup_left) {
            ctx.fillStyle = "hsl(" + (Date.now() / 10) % 360 + ", 100%, 50%)";
            ctx.font = popup_fontsize + "px Monsieur La Doulaise, cursive";
            ctx.fillText(popup, popup_pos[0], popup_pos[1]);
        }

        if (dialogue) {
            const h = 45;
            const y = height - 100;

            const current_line = dialogue[dialogue_line];
            const full_line = current_line[1];
            const to_write = full_line.slice(0, dialogue_progress);
            const character = characters[current_line[0]];

            ctx.fillStyle = "black";
            ctx.fillRect(0, y - h, width, h * 1.5);

            ctx.fillStyle = "white";
            ctx.font = h + "px Courier Prime, courier, monospace";

            if (character.name === null) {
                ctx.font = "italic " + ctx.font;
            }

            const w = ctx.measureText(full_line).width;
            ctx.fillText(to_write, width/2 - w/2, y);

            if (character.image) {
                const portraitsize = 300;
                ctx.drawImage(character.image, 0, y - h - portraitsize, portraitsize, portraitsize);
            }

            ctx.font = h + "px Libertinus Serif, times, serif";
            ctx.fillText(character.name ? character.name.toUpperCase() : "", 20, y);
        }
    }

    requestAnimationFrame(draw);

    await Promise.all(
        images.concat(sounds).map((a) => new Promise((resolve) => a.addEventListener("load", resolve)))
    );

    const update_color_image = (c) => {
        c.colored_images[c.texture] = c.colored_images[c.texture] || colorize(c.original_image, textures[c.texture]);
    }
    clothes.forEach(update_color_image);

    const base_texture = (x, y) => [.5, (x+y)/2, 0];
    image_base = colorize(image_base, base_texture);


    screen = scr_title;

    setInterval(() => {
        const menuspeed = 2100/fps;
        const dialoguespeed = 1;
        if (popup_left) {
            popup_left--;
        }
        if (side_on) {
            if (current_side_size < side_size) {
                current_side_size = Math.min(current_side_size + menuspeed, side_size);
            }
        } else if (side_on === false) {
            if (current_side_size > 0) {
                current_side_size = Math.max(current_side_size - menuspeed, 0);
            } else {
                if (scene === scn_contest && clothes.some(c => c.enabled)) {
                    if (dialogues.length) {
                        dialogue = dialogues.pop();
                    } else {
                        dialogue = dialogue_fail;
                    }
                } else if (tape) {
                    dialogue = dialogue_tape[tape - 1];
                }
                side_on = null;
            }
        }
        if (cooldown) {
            cooldown--;
        }
        if (fadetype === "out") {
            if (fade < 1) {
                fade = Math.min(1, fade + fadespeed);
            } else {
                fadetype = null;
                dialogue = next_dialogue;
                screen = scr_ingame;
                bg = next_bg;
            }
        }
        if (fadetype === "in") {
            if (fade > 0) {
                fade = Math.max(0, fade - fadespeed);
            } else {
                const f = dialogue[dialogue_line][2];
                fadetype = null;
                dialogue_progress = 0;
                dialogue_line = dialogue_line + 1;
                if (dialogue_line === dialogue.length) {
                    dialogue_line = 0;
                    dialogue = null;
                }
                if (f) {
                    f();
                }
            }
        }
        if (dialogue && dialogue_progress < dialogue[dialogue_line][1].length) {
            dialogue_progress = Math.min(dialogue[dialogue_line][1].length, dialogue_progress + dialoguespeed);
        }
        requestAnimationFrame(draw);
    }, 1000/fps);

    canvas.onclick = (e) => {
        if (dialogue) {
            if (dialogue_progress === dialogue[dialogue_line][1].length) {
                fadetype = "in";
            } else {
                dialogue_progress = dialogue[dialogue_line][1].length;
            }
        } else if (screen === scr_title && !cooldown) {
            fadetype = "out";
        } else if (screen === scr_ingame) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left)/sizemult;
            const y = (e.clientY - rect.top)/sizemult;

            if (x > current_side_size &&
                x < current_side_size + button_height &&
                y < button_height) {
                side_on = !side_on;
            }

            if (x < current_side_size) {
                const i = Math.floor(y / button_height);
                if (i < clothes.length) {
                    const c = clothes[i];
                    if (c.enabled && c.texturable && x > current_side_size - button_height) {
                        c.texture = (c.texture + 1) % textures.length;
                        update_color_image(c);
                    } else {
                        c.enabled = !(c.enabled);
                        if (c.enabled) {
                            const p = ["+495", "ztylish", "zany", "OtOt", "zealous", "zesty"];
                            popup = p[Math.floor(Math.random() * p.length)];
                            popup_left = fps * 1;
                            const min_x = side_size;
                            ctx.font = popup_fontsize + "px Monsieur La Doulaise, cursive";
                            const max_x = width - ctx.measureText(popup).width;
                            const min_y = popup_fontsize / 2;
                            const max_y = height;
                            popup_pos = [min_x + Math.random() * Math.max(max_x - min_x, 0),
                                         min_y + Math.random() * Math.max(max_y - min_y, 0)];
                        }
                    }
                } else if (scene === scn_dump && current_side_size === side_size && (height - y) < button_height) {
                    tape++;
                    side_on = false;
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    start();
});
