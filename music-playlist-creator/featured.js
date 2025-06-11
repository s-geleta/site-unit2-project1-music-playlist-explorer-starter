document.addEventListener("DOMContentLoaded", () => {
  fetch("data/data.json") // Adjust the path if needed
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      const playlists = data.playlists;
      const randomIndex = Math.floor(Math.random() * playlists.length);
      const selectedPlaylist = playlists[randomIndex];

      // Populate featured section
      document.getElementById("featured-image").src = selectedPlaylist.playlist_art;
      document.getElementById("featured-title").textContent = selectedPlaylist.playlist_name;

      const songList = document.getElementById("featured-songs");
      songList.innerHTML = "";

      selectedPlaylist.songs.forEach(song => {
        const li = document.createElement("li");
        li.classList.add("song-item");

        const songImg = document.createElement("img");
        songImg.classList.add("song_image");
        songImg.src = song.song_image;
        songImg.alt = `${song.title}`;

        const songInfo = document.createElement("div");
        songInfo.classList.add("song-info");
        songInfo.innerHTML = `<img src=${song.song_image} class="song_image">
        <span class="song-title">${song.title}</span> by
        <span class="song-artist">${song.artist}</span> (<span class="song-duration">${song.duration}</span>)
        `;

        li.appendChild(songInfo);
        songList.appendChild(li);
      });
    })
    .catch(error => console.error("Error loading playlist:", error));
});
