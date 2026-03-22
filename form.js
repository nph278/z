const fields = [
    "Personal Email",
    "What Merch Item you would like to purchase",
    "Zeagle GOLD Code",
    "Favorite color",
    "Favorite mascot",
    "Favorite word",
    "Favorite sport",
    "Favorite food",
    "Favorite animal",
    "SAT Score",
    "ACT Score",
    "GPA (Weighted)",
    "GPA (Unweighted)",
    "Height (inches)",
    "Height (cm)",
    "Weight (lb)",
    "Weight (kg)",
    "Student ID Number",
    "CMS Email",
    "Top choice college",
    "High school graduation year",
    "College graduation year",
    "FAFSA ID",
    "Date of birth",
    "Favorite Zeagle alert",
    "Favorite Zeagle slogan",
    "Favorite Zeagle article",
    "Favorite Zeagle game",
    "Least favorite Beagle article",
    "Least favorite Beagle game",
    "Least favorite Beagle news ticker item",
    "Link to an image on google drive of your signature so we know you are legit",
    "Link to an image on google drive of a picture of you so we know you are legit",
    "Link to an image on google drive of a picture of your dryebux so we know you are legit",
    "Link to a video on google drive of your dryebux being ripped up into tiny pieces",
];

let f2 = Array.from(fields);

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const update = () => {
    const maxy = window.innerHeight + window.scrollY + 1000;
    while (document.body.clientHeight < maxy) {
        if (!f2.length) {
            f2 = Array.from(fields);
            shuffle(f2);
        }
        const f = f2.shift();
        const s = document.createElement("section");
        s.innerHTML = "<p>" + f + " <span class=req>*</span></p><p><input type=text placeholder='Your answer'></p>";
        document.querySelector("#fields").appendChild(s);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(update, 100);
});

document.addEventListener('scroll', (event) => {
    update();
});

addEventListener('resize', (event) => {
    update();
});
