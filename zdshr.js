// Hi Reid

async function start() {
    let ismobile = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) ismobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

    if (ismobile) {
        document.querySelector("#blackout").style.display = "inline";
        document.querySelector("#blackout").innerText = "Mobile is not supported. Play on school chromebook during homeroom with full volume on.";
        return;
    }

    const canvas = document.querySelector("canvas");
    const width = 1500;
    const height = 1000;
    const hmargin = 5;
    const vmargin = 5;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    let sizemult = 1;

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

    const bgm1 = make_sound("zdshr_bg2.mp3");
    bgm1.loop = true;
    const bgm2 = make_sound("bgm.wav");
    bgm2.loop = true;
    const bgm3 = make_sound("zdshr_closet.mp3");
    bgm3.loop = true;
    const bgm4 = make_sound("tape.mp3");
    bgm4.loop = true;
    const bgm5 = make_sound("tapephone.mp3");
    const bgm6 = make_sound("yay.mp3");
    bgm6.loop = true;

    const sfx1 = make_sound("zsfx1.wav");
    const sfx2 = make_sound("zsfx2.wav");

    const clothes = [];
    const add_clothing = (name, filename, texturable, blockers, type) => {
        const image = make_image(filename);
        clothes.push({
            name,
            original_image: image,
            colored_images: [],
            enabled: false,
            texture: 0,
            texturable,
            blockers,
            type,
        });
    }

    // Substantial Types:
    // 1 - top
    // 2 - bottom
    add_clothing("Zrop top", "Zrop_top.png", true, [8,9,10,11], []); // 0
    add_clothing("Zashes", "Zashes.png", false, [15], []); // 1
    add_clothing("Zloves", "Zloves.png", true, [], []); // 2
    add_clothing("Zoveralls", "Zveralls.png", true, [], [1, 2]); // 3
    add_clothing("Zweatpants", "Zweatpant.png", true, [], [2]); // 4
    add_clothing("Zants", "Zant.png", true, [], [2]); // 5
    add_clothing("Zress", "Zress.png", true, [], [1, 2]); // 6
    add_clothing("Zkirt", "Zkirt.png", true, [], [2]); // 7
    add_clothing("Off the zhoulder", "Off_the_zhouler.png", true, [], [1]); // 8
    add_clothing("Zhirt", "Zhirt.png", true, [10], [1]); // 9
    add_clothing("Zongsleeves", "Zongsleeves.png", true, [], [1]); // 10
    add_clothing("Zweatshirt", "Zweatshirt.png", true, [], [1]); // 11
    add_clothing("Zlasses", "Zlasses.png", true, [15], []); // 12
    add_clothing("QR code chain", "ZR_code_chain.png", true, [], []); // 13
    add_clothing("Zpike bracelet", "Zpike_bracelet.png", true, [], []); // 14
    add_clothing("Face Zensor", "censor.png", true, [], []); // 15

    let loopn = 0;

    const is_warm = () => {
        const t = clothes.filter(c => c.enabled).map(c => c.type).flat();
        return t.includes(1) && t.includes(2);
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

    const dialogue_intro = [
        ["self", "It's the big day.", () => {play_sound(bgm1)}],
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
            ["self", "You walk to the front.", () => {
                if (puzzles.length === 0) {
                    puzzles = [...original_puzzles];
                    shuffle(puzzles);
                }
                puzzle = puzzles.pop();
                game.next_bg = puzzle.bg;
                game.next_dialogue = puzzle.dialogue_intro;
                game.fadetype = "out";
            }],
        ],
        [
            ["self", "You sneak back into the media center.", () => {
                game.next_bg = image_closet;
                game.next_dialogue = dialogue_closet;
                game.fadetype = "out";
                bgm2.pause();
            }],
        ],
        [
            ["self", "You uncover a dusty tape player..."],
            ["self", "and insert the tape.", () => {
                game.next_bg = image_tapebg;
                game.next_dialogue = dialogue_interview;
                game.fadetype = "out";
                game.zeagle_on = false;
                bgm3.pause();
                game.curtains = false;
            }],
        ],
    ];

    const dialogue_closet = [
        ["self", "(The A/V closet seems an obvious choice)", () => {play_sound(bgm3)}],
    ];

    const dialogue_interview = [
        ["self", "...", () => {play_sound(bgm4)}],
        ["reporter", "We have here the Head Beagler..."],
        ["reporter", "who was just fired."],
        ["beagle", "They won't tell you this..."],
        ["beagle", "but I wasn't really in charge."],
        ["beagle", "The people truly in charge..."],
        ["beagle", "they have done some horrible things."],
        ["reporter", "What kinds of things?"],
        ["beagle", "Scissors..."],
        ["beagle", "They... oh..."],
        ["beagle", "They'll kill me."],
        ["beagle", "I know they'll kill me."],
        ["reporter", "Stay focused. What about scissors?"],
        ["beagle", "They split the timeline..."],
        ["beagle", "It wasn't right..."],
        ["reporter", "What do you mean \"timeline\"?"],
        ["beagle", "An article someone submitted..."],
        ["beagle", "some \"Synth Doctor\" guy..."],
        ["beagle", "we edited it."],
        ["beagle", "Made it absurd."],
        ["beagle", "Made it unrealistic."],
        ["beagle", "This created another world..."],
        ["beagle", "The world where it remained unedited."],
        ["beagle", "The world where it became the truth."],
        ["beagle", "The world where it wasn't satire."],
        ["beagle", "And in this world, the newspaper,"],
        ["beagle", "it's called the z", () => {
            document.querySelector("#blackout").style.display = "inline";
            document.querySelector("title").text = "BEAGLEBECOMESZEAGLE";
            bgm4.pause();
            play_sound(bgm5);
            setTimeout(() => {
                if (loopn === 1) {
                    document.querySelector("#blackout").innerText = "Maybe more clothes will protect you from this fate.";
                } else if (loopn === 2) {
                    document.querySelector("#blackout").innerText = "Still not enough.";
                } else if (loopn === 3) {
                    document.querySelector("#blackout").innerText = "The cycle continues.";
                } else if (loopn === 4) {
                    document.querySelector("#blackout").innerText = "A cycle within a cycle.";
                } else {
                    document.querySelector("#blackout").innerText = "East Meck is the most interesting place on the planet.";
                }
                setTimeout(() => {
                    document.querySelector("#blackout").style.display = "none";
                    document.querySelector("#blackout").innerText = "";
                    document.querySelector("title").text = "ZABERDASHER";
                    reset_game();
                    game.screen = scr_ingame;
                    game.dialogue = dialogue_intro;
                    game.fade = 1;
                    game.fadetype = "out";
                }, 5000)
            }, 12000);
        }, true],
    ];

    const dialogues = [
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

    const dialogue_fail = [
        ["judge1", "Ok. I'm gonna cut to the chase."],
        ["judge1", "You don't have a chance here."],
        ["judge2", "You should leave.", () => {
            game.next_bg = image_dump;
            game.next_dialogue = dialogue_dump;
            game.fadetype = "out";
            bgm1.pause();
            game.scene = scn_dump;
        }],
    ];

    const dialogue_win = [
        ["judge1", "Incredible!"],
        ["judge3", "This is the epitome of swagger..."],
        ["judge3", "and style."],
        ["judge7", "Congratulations!", () => {
            game.next_bg = image_podium;
            game.next_dialogue = dialogue_podium;
            game.fadetype = "out";
            bgm1.pause();
            game.scene = scn_podium;
        }],
    ];

    const dialogue_dump = [
        ["self", "You leave through the back.", () => {
            play_sound(bgm2);
            game.dump_enter_time = Date.now();
        }],
    ];

    const dialogue_podium = [
        ["self", "You've done it.", () => {
            play_sound(bgm6);
        }],
    ];

    const dialogue_hot = [
        ["self", "It's quite hot out here."],
        ["self", "(Your outfit yearns to adapt)"],
    ];

    const dialogue_cold = [
        ["self", "It's quite cold out here."],
        ["self", "(Your outfit yearns to adapt)"],
    ];

    const dialogue_better = [
        ["self", "That's better."],
        ["self", "(You feel more capable)"],
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

    let image_base = make_image("Zeagle_Base.png");
    let image_bg = make_image("bg1.jpg");
    let image_dump = make_image("dump.jpg");
    let image_rainbow = make_image("rainbow.png");
    let image_diffract = make_image("diffract.jpg");
    let image_closet = make_image("closet.jpg");
    let image_tapebg = make_image("tape.jpg");
    let image_podium = make_image("podium.jpg");
    let image_tzg = make_image("tzg.jpg");
    let image_curtains = make_image("curtains.jpg");

    let image_wall = make_image("wall.jpg");
    let image_lab = make_image("lab.jpg");
    let image_camera = make_image("camera.jpg");

    const puzzle_zebra = {
        dialogue_intro: [
            ["self", "..."],
            ["self", "You see two heavily-armed librarians."],
            ["self", "It seems they are guarding the entrance..."],
            ["self", "(to this oasis in the Desert of Grime)"],
            ["self", "You will need to blend in to get past them."],
        ],
        dialogue_fail: [
            ["self", "You aren't blending in well enough for that..."],
            ["self", "(Imagine a big zebra prancing around)"],
        ],
        bg: image_wall,
        check: () => (is_warm() && clothes.every(c => (!(c.enabled && c.texturable) || c.blockers.some(id => clothes[id].enabled) || c.texture === 4))),
    };
    const puzzle_lab = {
        dialogue_intro: [
            ["self", "..."],
            ["self", "The only way back is through here..."],
            ["self", "Mr. Grube's room."],
            ["self", "It seems the students are doing a crazy lab..."],
            ["self", "You will need to dress safely to go through."],
        ],
        dialogue_fail: [
            ["self", "You aren't safe enough to go through."],
            ["self", "(Your hands, eyes, and body may be vulnerable)"],
        ],
        bg: image_lab,
        check: () => (is_warm() && clothes[2].enabled && clothes[12].enabled),
    };
    const puzzle_camera = {
        dialogue_intro: [
            ["self", "..."],
            ["self", "There's a security camera installed here..."],
            ["self", "equipped with facial recognition software."],
            ["self", "You'll need to outsmart this system to pass."],
        ],
        dialogue_fail: [
            ["self", "Your face is too visible."],
            ["self", "(You would be ousted on the world stage!)"],
        ],
        bg: image_camera,
        check: () => (clothes[15].enabled),
    };
    const original_puzzles = [puzzle_zebra, puzzle_lab, puzzle_camera];
    let puzzles = [...original_puzzles];
    shuffle(puzzles);
    let next_puzzle = null;

    const side_size = 500;
    const button_height = 50;
    const button_height2 = 100;

    const scr_loading = 0;
    const scr_title = 1;
    const scr_ingame = 2;

    const popup_fontsize = 350;

    const scn_contest = 0;
    const scn_dump = 1;
    const scn_podium = 2;

    const fps = 30;

    let game = {};
    const fadespeed = .6/fps;

    const reset_game = () => {
        loopn++;
        console.log(loopn);

        game.bg = image_bg;
        game.dialogues2 = [...dialogues];
        shuffle(game.dialogues2);
        game.dialogue = null;
        game.dialogue_line = 0;
        game.dialogue_progress = 0;
        game.popup = "";
        game.popup_left = 0;
        game.popup_pos = [0,0];
        game.curtains = true;
        game.wants_warm = null;
        game.temp_good = false;
        game.next_bg = image_bg;
        game.next_dialogue = dialogue_intro;
        game.tape = 0;
        game.tape_on = false;
        game.side_on = null;
        game.current_side_size = 0;
        game.screen = scr_loading;
        game.scene = scn_contest;
        game.cooldown = fps * 5;
        game.fade = 0;
        game.fadetype = null;
        game.zeagle_on = true;
        game.dump_enter_time = null;
        game.puzzle_fail = false;
        game.instructions = null;

        clothes.forEach(c => {
            c.enabled = false;
            c.texture = 0;
        });

        if (loopn === 2 && localStorage.getItem("last_id_remember_hack0")) {
            const b = localStorage.getItem("last_id_remember_hack0");
            const m = +b.slice(5,7);
            const month = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ][m - 1];
            const day = +b.slice(8);
            game.dialogues2.push([
                ["judge1", "Oh, and before I forget..."],
                ["judge1", "Happy birthday!"],
                ["judge2", "Oh right! " + month + " " + day + "!"],
                ["judge2", "That's today!"],
                ["judge5", "...Birthday or not,"],
                ["judge5", "This outfit still sucks."],
                ["self", "You think you can do better."],
            ]);
        }
    }

    reset_game();

    const play_sound = (snd) => {
        snd.load();
        snd.play();
    }

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

    const make_popup = () => {
        const p = ["+495", "ztylish", "zany", "OtOt", "zealous", "zesty"];
        game.popup = p[Math.floor(Math.random() * p.length)];
        game.popup_left = fps * 1;
        const min_x = side_size;
        ctx.font = popup_fontsize + "px Monsieur La Doulaise, cursive";
        const max_x = width - ctx.measureText(game.popup).width;
        const min_y = popup_fontsize / 2;
        const max_y = height;
        game.popup_pos = [min_x + Math.random() * Math.max(max_x - min_x, 0),
                          min_y + Math.random() * Math.max(max_y - min_y, 0)];
    }

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        sizemult = Math.min((window.innerWidth-hmargin)/width, (window.innerHeight-vmargin)/height);
        canvas.style.width = sizemult * width + "px";
        ctx.globalCompositeOperation = "source-over";

        const time = Date.now();

        const draw_image_center = (image) => {
            const yo = (game.scene === scn_podium && game.fadetype !== "out") ? -250 : 0;
            const imagew = image.width*(1+.025*Math.sin(time/100));
            const imageh = image.height*(1+.005*Math.cos(time/100));
            ctx.drawImage(image, (width-imagew+game.current_side_size)/2, (height-imageh)/2 + yo, imagew, imageh);
        }

        if (game.screen === scr_loading) {
            ctx.fillStyle = "black";
            ctx.font = "100px Courier Prime, courier, monospace";
            ctx.fillText("loading...", 100, 100);
        } else if (game.screen === scr_title) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "hsl(" + Math.floor(time/10)%360 + ", 100%, 50%)";
            ctx.font = "300px Monsieur La Doulaise, cursive";
            ctx.fillText("Zaberdasher", 200, 300 + 10 * Math.sin(time/1000));
            ctx.fillStyle = "white";
            ctx.font = "50px Courier Prime, courier, monospace";
            ctx.fillText("East Meck's Premiere Character Design Software", 56, 600);
            ctx.font = "65px Courier Prime, courier, monospace";
            ctx.fillStyle = (Math.floor(time / 500) % 2) ? "red" : "yellow";
            ctx.fillText("TURN ON AUDIO!", 500, 700);
            if (!game.cooldown) {
                ctx.font = "100px Courier Prime, courier, monospace";
                ctx.fillStyle = "red";
                ctx.fillText("Click2Begin", 450, 900);
            }
        } else if (game.screen === scr_ingame) {
            if (game.zeagle_on || game.fadetype === "out") {
                ctx.drawImage(game.bg, game.current_side_size, 0, width - game.current_side_size, height);
                draw_image_center(image_base);
                clothes.forEach((c) => {
                    if (c.enabled && !c.blockers.some(id => clothes[id].enabled)) {
                        draw_image_center(c.colored_images[c.texture]);
                    }
                });
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
                const shake = 5;
                ctx.drawImage(game.bg, game.current_side_size, 0, width - game.current_side_size + Math.random() * shake, height + Math.random() * shake);
            }

            if (!game.dialogue) {
                ctx.clearRect(0, 0, game.current_side_size, height);
                ctx.clearRect(game.current_side_size, 0, button_height2, button_height2);

                ctx.fillStyle = "black";
                ctx.beginPath();
                if (game.side_on) {
                    ctx.moveTo(game.current_side_size + .8 * button_height2, .2 * button_height2);
                    ctx.lineTo(game.current_side_size + .8 * button_height2, .8 * button_height2);
                    ctx.lineTo(game.current_side_size + .2 * button_height2, .5 * button_height2);
                    ctx.lineTo(game.current_side_size + .8 * button_height2, .2 * button_height2);
                } else {
                    ctx.moveTo(game.current_side_size + .2 * button_height2, .2 * button_height2);
                    ctx.lineTo(game.current_side_size + .2 * button_height2, .8 * button_height2);
                    ctx.lineTo(game.current_side_size + .8 * button_height2, .5 * button_height2);
                    ctx.lineTo(game.current_side_size + .2 * button_height2, .2 * button_height2);
                }
                ctx.fill();
            }

            for (let i = 0; i < clothes.length; i++) {
                const c = clothes[i];

                if (c.enabled) {
                    ctx.fillStyle = "hsl(" + (360 * i / clothes.length) + ", 100%, 50%)";
                    ctx.fillRect(game.current_side_size - side_size, i * button_height, side_size, button_height);

                    if (c.texturable) {
                        ctx.fillStyle = "hsl(" + (180 + 360 * i / clothes.length) + ", 100%, " + (c.texture*40/textures.length) + "%)";
                        ctx.fillRect(game.current_side_size - button_height, i * button_height, button_height, button_height);

                        ctx.fillStyle = "white";
                        ctx.font = "45px Libertinus Serif, times, serif";
                        ctx.fillText(c.texture, game.current_side_size - button_height + 14, (i+1) * button_height - 10);
                    }
                }

                ctx.fillStyle = "black";
                ctx.font = "45px Courier Prime, courier, monospace";
                ctx.fillText(c.name, game.current_side_size - side_size, (i+1) * button_height - 10);
            }

            if (game.scene === scn_dump && game.temp_good) {
                const s = ["Dig through trash", "Sneak back in", "Sneak back in", "Play tape"][game.tape_on ? (game.tape - 1) : game.tape];

                ctx.fillStyle = (Math.floor(time / 500) % 2) ? "green" : "lime";
                ctx.font = "45px Courier Prime, courier, monospace";
                ctx.fillText(s, game.current_side_size - side_size, height - 20);
            }

            if (game.instructions) {
                ctx.fillStyle = "blue";
                ctx.font = "45px Courier Prime, courier, monospace";
                ctx.fillText("Change Texture   ^", game.current_side_size - side_size, height - 150);
            }
        }

        if (game.curtains) {
            const k = 5;
            ctx.drawImage(image_curtains,
                          0,
                          (.5*Math.tanh(k * (game.fade - .5)) - .5) * height
                          + (.5*Math.tanh(k/2) - .5) * height,
                          width,
                          height);
        }

        ctx.fillStyle = "rgba(0,0,0,"+game.fade+")";
        ctx.fillRect(0, 0, width, height);

        if (game.popup_left) {
            ctx.fillStyle = "hsl(" + (Date.now() / 10) % 360 + ", 100%, 50%)";
            ctx.font = popup_fontsize + "px Monsieur La Doulaise, cursive";
            ctx.fillText(game.popup, game.popup_pos[0], game.popup_pos[1]);
        }

        if (game.dialogue) {
            const h = 45;
            const y = height - 100;

            const current_line = game.dialogue[game.dialogue_line];
            const full_line = current_line[1];
            const to_write = full_line.slice(0, game.dialogue_progress);
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

        if (game.dump_enter_time) {
            let a = Math.min((Date.now() - game.dump_enter_time)/10000, 1);
            ctx.globalAlpha = a;

            ctx.drawImage(image_tzg, 0, 0, width, height);

            ctx.globalAlpha = 1;
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

    game.screen = scr_title;

    setInterval(() => {
        const menuspeed = 2100/fps;
        const dialoguespeed = 1;
        if (game.popup_left) {
            game.popup_left--;
        }
        if (game.side_on) {
            if (game.current_side_size < side_size) {
                game.current_side_size = Math.min(game.current_side_size + menuspeed, side_size);
            }
        } else if (game.side_on === false) {
            if (game.current_side_size > 0) {
                game.current_side_size = Math.max(game.current_side_size - menuspeed, 0);
            } else {
                if (game.scene === scn_contest && clothes.some(c => c.enabled)) {
                    if (clothes.every(c => c.enabled)) {
                        game.dialogue = dialogue_win;
                    } else {
                        if (game.dialogues2.length) {
                            game.dialogue = game.dialogues2.pop();
                        } else {
                            game.dialogue = dialogue_fail;
                        }
                    }
                } else if (game.tape && game.tape_on) {
                    game.dialogue = dialogue_tape[game.tape - 1];
                    game.tape_on = false;
                } else if (game.puzzle_fail) {
                    game.dialogue = puzzle.dialogue_fail;
                    game.puzzle_fail = false;
                } else if (game.scene === scn_dump && game.wants_warm === null) {
                    if (is_warm()) {
                        game.wants_warm = false;
                        game.dialogue = dialogue_hot;
                    } else {
                        game.wants_warm = true;
                        game.dialogue = dialogue_cold;
                    }
                } else if (game.scene === scn_dump && !game.temp_good) {
                    if (game.wants_warm) {
                        if (is_warm()) {
                            game.dialogue = dialogue_better;
                            game.temp_good = true;
                        } else {
                            game.dialogue = dialogue_cold;
                        }
                    } else {
                        if (is_warm()) {
                            game.dialogue = dialogue_hot;
                        } else {
                            game.dialogue = dialogue_better;
                            game.temp_good = true;
                        }
                    }
                }
                game.side_on = null;
            }
        }
        if (game.cooldown) {
            game.cooldown--;
        }
        if (game.fadetype === "out") {
            if (game.fade < 1) {
                game.fade = Math.min(1, game.fade + fadespeed);
            } else {
                game.fadetype = null;
                game.dialogue = game.next_dialogue;
                game.screen = scr_ingame;
                game.bg = game.next_bg;
            }
        }
        if (game.fadetype === "in") {
            if (game.fade > 0) {
                game.fade = Math.max(0, game.fade - fadespeed);
            } else {
                const f = game.dialogue[game.dialogue_line][2];
                game.fadetype = null;
                game.dialogue_progress = 0;
                game.dialogue_line = game.dialogue_line + 1;
                if (game.dialogue_line === game.dialogue.length) {
                    game.dialogue_line = 0;
                    game.dialogue = null;
                }
                if (f) {
                    f();
                }
            }
        }
        if (game.dialogue) {
            if (game.dialogue_progress < game.dialogue[game.dialogue_line][1].length) {
                game.dialogue_progress = Math.min(game.dialogue[game.dialogue_line][1].length, game.dialogue_progress + dialoguespeed);
            } else if (game.dialogue[game.dialogue_line][3]) {
                game.dialogue[game.dialogue_line][2]();
                game.dialogue = null;
            }
        }
        requestAnimationFrame(draw);
    }, 1000/fps);

    canvas.onclick = (e) => {
        if (game.dump_enter_time) {
            // if (a > .5) {
            //     window.open("https:///www.eastmeckzeagle.tech/tzg.html", '_blank');
            // }
            game.dump_enter_time = null;
        }
        if (game.dialogue) {
            if (game.dialogue_progress === game.dialogue[game.dialogue_line][1].length) {
                game.fadetype = "in";
            } else {
                game.dialogue_progress = game.dialogue[game.dialogue_line][1].length;
            }
        } else if (game.screen === scr_title && !game.cooldown) {
            game.fadetype = "out";
            window.scroll(0, canvas.offsetTop - vmargin/2);
        } else if (game.screen === scr_ingame) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left)/sizemult;
            const y = (e.clientY - rect.top)/sizemult;

            if (game.fade === 0 &&
                x > game.current_side_size &&
                x < game.current_side_size + button_height2 &&
                y < button_height2) {
                game.side_on = !game.side_on;
                play_sound(sfx1);
            } else if (x < game.current_side_size) {
                const i = Math.floor(y / button_height);
                if (i < clothes.length) {
                    const c = clothes[i];
                    if (c.enabled && c.texturable && x > game.current_side_size - button_height) {
                        c.texture = (c.texture + 1) % textures.length;
                        make_popup();
                        update_color_image(c);
                        play_sound(sfx2);
                        game.instructions = false;
                    } else {
                        c.enabled = !(c.enabled);
                        if (c.enabled) {
                            make_popup();
                        }
                        play_sound(sfx2);
                        if (c.texturable && game.instructions === null) {
                            game.instructions = true;
                        }
                    }
                } else if (game.scene === scn_dump && game.temp_good && game.current_side_size === side_size && (height - y) < button_height) {
                    game.side_on = false;
                    play_sound(sfx1);
                    if (game.tape === 2 && !puzzle.check()) {
                        game.puzzle_fail = true;
                    } else {
                        game.tape++;
                        game.tape_on = true;
                    }
                }
            }
        }
    }
}

addEventListener('load', (event) => {
    start();
});
