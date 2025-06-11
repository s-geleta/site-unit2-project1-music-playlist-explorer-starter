document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("playlist-container");
  const modal = document.getElementById("playlist-modal");
  const closeBtn = modal.querySelector(".close-button");
  const modalArt = document.getElementById("modal-art");
  const modalName = document.getElementById("modal-name");
  const modalAuthor = document.getElementById("modal-author");
  const modalSongs = document.getElementById("modal-songs");
  const shuffleBtn = document.getElementById("shuffle-btn");

  let currentSongs = [];

 
  function renderSongs(songsArray) {
    modalSongs.innerHTML = "";
    songsArray.forEach((song) => {
      const li = document.createElement("li");
      li.classList.add("song-item");

      const songImg = document.createElement("img");
      songImg.classList.add("song_image");
      songImg.src = song.song_image; 
      songImg.alt = `${song.title} `;

      const songInfo = document.createElement("div");
      songInfo.classList.add("song-info");
      songInfo.innerHTML = `
        <span class="song-title">${song.title}</span> by
        <span class="song-artist">${song.artist}</span> (<span class="song-duration">${song.duration}</span>)
      `;

      li.appendChild(songImg);
      li.appendChild(songInfo);
      modalSongs.appendChild(li);
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  fetch("data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      data.playlists.forEach(createPlaylistTile);
    })
    .catch((err) => {
      console.error("Failed to load playlists:", err);
    });

  function createPlaylistTile(pl) {
    const tile = document.createElement("div");
    tile.className = "playlist-tile";
    tile.innerHTML = `
      <img src="${pl.playlist_art}" alt="${pl.playlist_name}">
      <h3>${pl.playlist_name}</h3>
      <p>By ${pl.playlist_author}</p>
      <span class="heart-icon">&#x2665;</span>
      <span class="like-count">${pl.likes}</span>
    `;

    tile.addEventListener("click", (e) => {
      if (!e.target.classList.contains("heart-icon")) {
        openModal(pl);
      }
    });

    const heart = tile.querySelector(".heart-icon");
    const count = tile.querySelector(".like-count");
    heart.addEventListener("click", (e) => {
      e.stopPropagation();
      let n = parseInt(count.textContent, 10);
      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked");
        count.textContent = --n;
      } else {
        heart.classList.add("liked");
        count.textContent = ++n;
      }
    });

    container.appendChild(tile);
  }

  function openModal(pl) {
    currentSongs = [...pl.songs]; 
    modalArt.src = pl.playlist_art;
    modalName.textContent = pl.playlist_name;
    modalAuthor.textContent = "By " + pl.playlist_author;
    renderSongs(currentSongs);
    modal.classList.add("show");
  }

  shuffleBtn.addEventListener("click", () => {
    currentSongs = shuffleArray([...currentSongs]);
    renderSongs(currentSongs);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});
