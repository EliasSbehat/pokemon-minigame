var scale = 2;
var diameter = 20;

var bodyWidth = document.body.clientWidth;
var img = document.getElementById("bg");
var bgWidth = img.width;
var deviation = bodyWidth / 2 - bgWidth / 2;

var pokemonCount = 6;
var scene = 1;
var pokeclickCount = 0;
var firstpoke = 0;
var secondpoke = 1;

var firstrandomLeft = Math.floor(Math.random() * 470);
var secondrandomLeft = Math.floor(Math.random() * 470);

var firstrandomTop = Math.floor(Math.random() * 650);
var secondrandomTop = Math.floor(Math.random() * 650);

$(".pokemon-count").text(pokemonCount);

var ary = [1, 2, 3, 4, 5, 6];

shuffle(ary);
console.log(ary);

$("#first_pokemon").attr("src", "./assets/imgs/" + ary[firstpoke] + ".png");
$("#first_pokemon").css("left", firstrandomLeft + "px");
$("#first_pokemon").css("top", firstrandomTop + "px");

$("#second_pokemon").attr("src", "./assets/imgs/" + ary[secondpoke] + ".png");
$("#second_pokemon").css("left", secondrandomLeft + "px");
$("#second_pokemon").css("top", secondrandomTop + "px");

function clickPokemon(that) {
  firstrandomLeft = Math.floor(Math.random() * 470);
  secondrandomLeft = Math.floor(Math.random() * 470);

  firstrandomTop = Math.floor(Math.random() * 650);
  secondrandomTop = Math.floor(Math.random() * 650);

  $(that).hide();
  var id = $(that).attr("id");
  $("#" + id).hide();
  // console.log($('#'+id).show());

  pokeclickCount++;
  pokemonCount--;
  $(".pokemon-count").text(pokemonCount);
  console.log(pokeclickCount);
  if (pokemonCount > 0) {
    if (pokeclickCount == 2) {
      pokeclickCount = 0;
      scene++;
      firstpoke += 2;
      secondpoke += 2;
      $("#bg").attr("src", "./assets/imgs/bg" + scene + ".jpg");
      $("#first_pokemon").attr(
        "src",
        "./assets/imgs/" + ary[firstpoke] + ".png"
      );
      $("#second_pokemon").attr(
        "src",
        "./assets/imgs/" + ary[secondpoke] + ".png"
      );

      $("#banners_magnifying").html(
        "<div id='mcontainer'>" + $("#banners").html() + "</div>"
      );
      $("#banners_magnifying img").each(function (index) {
        var the_offset = $(this).offset();
        $(this).attr("left_i", the_offset.left);
        $(this).attr("top_i", the_offset.top);
      });
      $("#mcontainer").find("img").show();
      $("#banners").find("img").show();
      $("#first_pokemon").css("left", firstrandomLeft + "px");
      $("#second_pokemon").css("left", secondrandomLeft + "px");
      $("#first_pokemon").css("top", firstrandomTop + "px");
      $("#second_pokemon").css("top", secondrandomTop + "px");

      $("#mcontainer #first_pokemon").css("left", firstrandomLeft + "px");
      $("#mcontainer #second_pokemon").css("left", secondrandomLeft + "px");
      $("#mcontainer #first_pokemon").css("top", firstrandomTop + "px");
      $("#mcontainer #second_pokemon").css("top", secondrandomTop + "px");
    }
  } else {
    alert("success");
    window.location.href = "index.html";
  }
}

$("#banners_magnifying").html(
  "<div id='mcontainer'>" + $("#banners").html() + "</div>"
);
$("#banners_magnifying img").each(function (index) {
  var the_offset = $(this).offset();
  $(this).attr("left_i", the_offset.left);
  $(this).attr("top_i", the_offset.top);
});

var mousex, mousey;

function get_mouseXY(e) {
  // this works on IE, FF, mozilla, opera, and NS
  if (!e) e = window.event;
  if (e) {
    if (e.pageX || e.pageY) {
      // this doesn't work on IE! (it works on the other browsers)
      mousex = e.pageX;
      mousey = e.pageY;
    } else if (e.clientX || e.clientY) {
      // this works on IE, FF, mozilla, opera, and NS
      mousex =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      mousey =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
  }
  //  mousex-=fig_x;
  //  mousey-=fig_y;
}

$(document).mousemove(function (event) {
  var my_canvas = $("#banners");
  var the_offset = my_canvas.offset();

  get_mouseXY(event);
  banners_magnifying = $("#banners_magnifying");

  $("#coordinates").text(
    mousex - the_offset.left + ", " + (mousey - the_offset.top) + "."
  );

  if (
    mousex > 0 &&
    mousex < the_offset.left + my_canvas.width() &&
    mousey > 0 &&
    mousey < the_offset.top + my_canvas.height()
  ) {
    banners_magnifying.css("visibility", "visible");
  } else {
    banners_magnifying.css("visibility", "hidden");
  }

  banners_magnifying.css("left", mousex - deviation - diameter * 2);
  banners_magnifying.css("top", mousey - diameter * 2);

  $("#mcontainer").css("left", -mousex + deviation + diameter / 2);
  $("#mcontainer").css("top", -mousey + diameter / 2);
});

const countdownEl = document.querySelector(".countdown");
const progressBarEl = document.querySelector(".progress");

let remainingTime = 30; // seconds
const totalTime = remainingTime;

function countdown() {
  if (remainingTime > 0) {
    // update countdown timer
    countdownEl.textContent = remainingTime;

    // update progress bar
    const progress = ((totalTime - remainingTime) / totalTime) * 100;
    progressBarEl.style.width = `${progress}%`;

    remainingTime--;
    setTimeout(countdown, 1000);
  } else {
    // countdown finished
    progressBarEl.style.width = "100%";
    countdownEl.textContent = "Time's up!";
    setTimeout(function () {
      if (confirm("Time's up! Will you restart the game?")) {
        window.location.reload();
      } else {
        return;
      }
    }, 1000);
  }
}

countdown();

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}