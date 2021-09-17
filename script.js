"use strict";

function displayError(error) {
  let hide = document.querySelector(".error");
  hide.innerText = error;
  hide.classList.toggle("hide");
  setTimeout(() => {
    hide.classList.toggle("hide");
  }, 5000);
}

function generateReposCard(reposData) {
  const reposCard = reposData
    .map((repo) => {
      return `<div class="col-12 py-2 repoCard">
    <div class="card reposCard">
      <div class="card-body">
        <h5 class="card-title reposCardTitle"><a href="${repo.html_url}">${
        repo.full_name
      }</a></h5>
        <p class="card-text">
          ${repo.description ? repo.description : "N/A"}
        </p>
      </div>
    </div>
  </div>`;
    })
    .join("");
  return reposCard;
}

function generateRepository(reposData) {
  const reposCard = reposData
    .map((repo) => {
      return `<div class="col-12 py-2 repoCard">
    <div class="card reposCard">
      <div class="card-body">
      <img src="${repo.owner.avatar_url}" width="30px" height="30px">  
      <h5 class="card-title reposCardTitle"><a href="${repo.html_url}">${
        repo.name
      }</a></h5>
        <p class="card-text">
          ${repo.description ? repo.description : "N/A"}
        </p>
      </div>
    </div>
  </div>`;
    })
    .join("");
  return reposCard;
}

function searchRepo(e) {
  e.preventDefault();
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  const repositories2 = document.getElementById("repositories");
  const reposSearch = document.getElementById("reposSearch");
  axios
    .get(`https://api.github.com/search/repositories?q=${reposSearch.value}`)
    .then((response) => {
      repositories2.innerHTML = generateRepository(response.data.items);
    })
    .catch((err) => console.log(err));
}

const reposForm = document.getElementById("reposForm");
reposForm.addEventListener("submit", searchRepo);

function generateProfileCard(profileData) {
  return `
    <div class="card profileCard" style="width: 100%; max-width: 400px">
              <img
                src="${profileData.avatar_url}"
                class="card-img-top"
                alt="Image"
              />
              <div class="card-body">
                <h5 class="card-title profileTitle">${profileData.name}</h5>
                <p class="card-text loginText">${profileData.login}</p>
                <p class="card-text">${profileData.location}</p>
                <p class="card-text"><a href="#">${profileData.html_url}</a></p>
                <p class="card-text"><a href="#">${profileData.blog}</a></p>
                <p class="card-text">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/email.png" width="20px" height="20px"/> ${
                    profileData.email ? profileData.email : "Hidden"
                  }</p>
                <p class="card-text">${
                  profileData.bio ? profileData.bio : "Hidden"
                }</p>
                <div class="follow">
                <img src="https://img.icons8.com/ios/30/000000/conference-call--v1.png" width="20px" height="20px"/>
                <p class="card-text">${profileData.followers} Followers</p>
                <p class="card-text">${profileData.following} Following</p>
                </div>
                <a href="#" class="btn btn-dark">View Github Profile</a>
              </div>
            </div>`;
}

function getUserRepo(user) {
  let reposContainer = document.getElementById("reposContainer");
  const API_URL = `https://api.github.com/users/${user}/repos`;
  axios
    .get(API_URL)
    .then((result) => {
      reposContainer.innerHTML = generateReposCard(result.data);
    })
    .catch((err) => {
      console.log(err);
      displayError(err.responses.data.message);
    });
}

function getUserProfile(user) {
  new GitHubCalendar(".calendar", user);
  let profileData = document.querySelector(".profileData");
  const API_URL = `https://api.github.com/users/${user}`;
  axios
    .get(API_URL)
    .then((result) => {
      profileData.innerHTML = generateProfileCard(result.data);
    })
    .catch((err) => {
      console.log(err);
      displayError(err.response.data.message);
    });
}

function main() {
  let searchForm = document.querySelector(".searchForm");

  getUserProfile("JeremyJMoss");
  getUserRepo("JeremyJMoss");

  searchForm.onsubmit = function (ev) {
    ev.preventDefault();
    let username = ev.target[0].value;
    if (username === "") {
      displayError("Username shouldn't be empty!");
      return;
    }
    getUserProfile(username);
    getUserRepo(username);
  };
}

main();
