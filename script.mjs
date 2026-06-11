import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  getMostListenedSong,
  getMostListenedArtist,
  getTopGenres,
  getLongestStreak,
  getMostListenedSongByTime,
  getMostListenedArtistByTime,
  getFridayNightEvents,
  getSongsListenedEveryDay,
} from "./common.mjs";

const select = document.getElementById("userSelect");
const users = getUserIDs();
// create a dropdown option for each user
for (const userID of users) {
  const option = document.createElement("option");

  option.value = userID;
  option.textContent = userID;

  select.appendChild(option);
}

// Show selected user's listen count
const results = document.getElementById("results");

// handle users and Updates the page
function renderUser(userID) {
  const events = getListenEvents(userID);
  // Handle User 4
  if (events.length === 0) {
    results.innerHTML = `
      <p>This user didn't listen to any songs.</p>
    `;
    return;
  }

  // Display Most Listened Song
  const toSongID = getMostListenedSong(events);
  const topSongTimeID = getMostListenedSongByTime(events, getSong);

  // Most listened artist
  const song = getSong(toSongID);
  const topArtist = getMostListenedArtist(events, getSong);
  const topArtistTime = getMostListenedArtistByTime(events, getSong);

  // Get friday night songs
  const fridayEvents = getFridayNightEvents(events);
  let fridaySongHTML = "";
  let fridaySongTimeHTML = "";
  if (fridayEvents.length > 0) {
    const fridaySongID = getMostListenedSong(fridayEvents);

    const fridaySong = getSong(fridaySongID);
    const fridaySongTimeID = getMostListenedSongByTime(fridayEvents, getSong);
    const fridaySongTime = getSong(fridaySongTimeID);
    fridaySongHTML = `
<section>
  <h3>Friday night song (count)</h3>
  <p>
    ${fridaySong.artist}
    -
    ${fridaySong.title}
  </p>
</section>
`;

    fridaySongTimeHTML = `
<section>
  <h3>Friday night song (time)</h3>
  <p>
    ${fridaySongTime.artist}
    -
    ${fridaySongTime.title}
  </p>
</section>
`;
  }

  // Longest streak song
     const streak = getLongestStreak(events);
  const streakSong = getSong(streak.songID);

  // songs get listen evry day
  const everyDaySongs = getSongsListenedEveryDay(events);
  let everyDayHTML = "";
  if (everyDaySongs.length > 0) {
    const names = everyDaySongs.map((songID) => {
      const song = getSong(songID);

      return `${song.artist} - ${song.title}`;
    });

    everyDayHTML = `
    <section>
      <h3>Songs listened to every day</h3>
      <p>${names.join(", ")}</p>
    </section>
  `;
  }

  // Top genres
  const topGenres = getTopGenres(events, getSong);
  const topSongTime = getSong(topSongTimeID);

  // update the UI
  results.innerHTML = `
  <h2>User ${userID}</h2>
<section>
    <h3>Most listened song(count)</h3>
    <p>${song.artist} - ${song.title}</p>
  </section>
<section>
  <h3>Most listened song (time)</h3>
  <p>
    ${topSongTime.artist} 
    ${topSongTime.title}
  </p>
     </section>
  <section>
    <h3>Most listened artist(count)</h3>
    <p>${topArtist}</p>
  </section>
<section>
  <h3>Most listened artist (time)</h3>
  <p>${topArtistTime}</p>
</section>

${fridaySongHTML}
 ${fridaySongTimeHTML}
 <section>
  <h3>Longest streak song</h3>
  <p>
    ${streakSong.artist} - ${streakSong.title}
    (length: ${streak.length})
  </p>
</section>

  ${everyDayHTML}
  <section>
    <h3>Top genres</h3>
    <p>${topGenres.join(", ")}</p>
  </section>

`;
}

renderUser(users[0]);

select.addEventListener("change", () => {
  renderUser(select.value);
});
