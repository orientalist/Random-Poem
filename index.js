"use strict";

var promiseId = null;

window.onload = function () {
  wavingLoading();
  var auth_input = document.getElementById("author");
  var poem = document.querySelector(".poem");
  var loading = document.querySelector(".loading");
  var noPoem = document.querySelector(".no-poem");

  auth_input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var author = e.target.value.replace(/ /g, "").toLowerCase();

      if (author) {
        clearTimeout(promiseId);
        poem.innerHTML = "";
        loading.classList.remove("hide");
        noPoem.classList.remove("show");
        var promise = poemPromise(author);

        promise.then(function (data) {
          if (data.status !== 404) {
            if (data) {
              var rdn = Math.floor(Math.random() * data.length);
              var _poem = data[rdn].lines;
              renderPoem(poem, _poem, 0);
            }
          } else {
            console.log("No Data");
            noPoem.classList.add("show");
          }
          loading.classList.add("hide");
        }).catch(function (err) {
          console.log(err);
          loading.classList.add("hide");
          noPoem.classList.add("show");
        });
      }
    }
  });
};

function poemPromise(author) {
  var proxy='https://cors-anywhere.herokuapp.com/';
  var url = "http://poetrydb.org/author/#AFD124#/lines.json";
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  return new Promise(function (res, rej) {
    var req = new XMLHttpRequest();
    req.responseType = "json";
    req.open("GET", proxy+url.replace("#AFD124#", author));
    req.onload = function () {
      switch (req.status) {
        case 200:
          res(req.response);
          break;
        default:
          rej(null);
          break;
      }
    };
    req.send();
  });
}

function renderPoem(container, lines, id) {
  promiseId = setTimeout(function () {
    if (lines[id]) {
      var line = document.createElement("p");
      line.innerText = lines[id];
      container.appendChild(line);
      id++;
      renderPoem(container, lines, id);
    }
  }, 700);
}

function wavingLoading() {
  var dots = document.getElementsByClassName("dot");
  var i = 0;

  var interval = setInterval(function () {
    if (dots[i]) {
      dots[i].classList.add("wave");
      i++;
    } else {
      clearInterval(interval);
    }
  }, 250);
}