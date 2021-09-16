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
      return `<div class="col-12 py-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"><a href="${repo.html_url}">${repo.full_name}</a></h5>
        <p class="card-text">
          ${repo.description}
        </p>
      </div>
    </div>
  </div>`;
    })
    .join("");
  return reposCard;
}

function generateProfileCard(profileData) {
  return `
    <div class="card" style="width: 100%; max-width: 400px">
              <img
                src="${profileData.avatar_url}"
                class="card-img-top"
                alt="Image"
              />
              <div class="card-body">
                <h5 class="card-title">${profileData.name}</h5>
                <p class="card-text">${profileData.login}</p>
                <p class="card-text">${profileData.location}</p>
                <p class="card-text"><a href="#">${profileData.html_url}</a></p>
                <p class="card-text"><a href="#">${profileData.blog}</a></p>
                <p class="card-text">${profileData.email}</p>
                <p class="card-text">${profileData.bio}</p>
                <hr />
                <p class="card-text">Followers: ${profileData.followers}</p>
                <p class="card-text">Following: ${profileData.following}</p>
                <a href="#" class="btn btn-primary">View Github Profile</a>
              </div>
            </div>`;
}

function getUserRepo(user) {
  let reposContainer = document.querySelector(".reposContainer");
  const API_URL = `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc`;
  axios
    .get(API_URL)
    .then((result) => {
      console.log(result.data);
      reposContainer.innerHTML = generateReposCard(result.data);
    })
    .catch(() => displayError("Something Went Wrong! Oops!"));
}

function getUserProfile(user) {
  let profileData = document.querySelector(".profileData");
  const API_URL = `https://api.github.com/users/${user}`;
  axios
    .get(API_URL)
    .then((result) => {
      profileData.innerHTML = generateProfileCard(result.data);
    })
    .catch(() => displayError("Something Went Wrong! Try Again!"));
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
