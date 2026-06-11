// Finds the key with the highest value.
function getWinner(values) {
    let winner = null;
    let max = 0;

    for (const key in values) {
        if (values[key] > max) {
            max = values[key];
            winner = key;
        }
    }

    return winner;
}
// Counts how many times a song appears.
function countBy(events, getKey) {
    const counts = {};

    for (const event of events) {
        const key = getKey(event);
        counts[key] = (counts[key] || 0) + 1;
    }

    return counts;
}

function totalBy(events, getKey, getValue) {
    const totals = {};

    for (const event of events) {
        const key = getKey(event);

        totals[key] =
            (totals[key] || 0) +
            getValue(event);
    }

    return totals;
}

// Most listened song (count)
function getMostListenedSong(events) {
    return getWinner(
        countBy(events, event => event.song_id)
    );
}

// Most listened artist (count)
function getMostListenedArtist(events, getSong) {
    return getWinner(
        countBy(
            events,
            event => getSong(event.song_id).artist
        )
    );
}

// Top 3 genres
function getTopGenres(events, getSong) {
    const counts = countBy(
        events,
        event => getSong(event.song_id).genre
    );

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([genre]) => genre);
}

// Longest consecutive streak of the same song
function getLongestStreak(events) {
    if (events.length === 0) {
        return null;
    }

    let currentSong = events[0].song_id;
    let currentLength = 1;

    let longestSong = currentSong;
    let longestLength = 1;

    for (let i = 1; i < events.length; i++) {
        const songID = events[i].song_id;

        if (songID === currentSong) {
            currentLength++;
        } else {
            currentSong = songID;
            currentLength = 1;
        }

        if (currentLength > longestLength) {
            longestLength = currentLength;
            longestSong = currentSong;
        }
    }

    return {
        songID: longestSong,
        length: longestLength
    };
}

// Most listened song by time
function getMostListenedSongByTime(events, getSong) {
    return getWinner(
        totalBy(
            events,
            event => event.song_id,
            event => getSong(event.song_id).duration_seconds
        )
    );
}

// Most listened artist by time
function getMostListenedArtistByTime(events, getSong) {
    return getWinner(
        totalBy(
            events,
            event => getSong(event.song_id).artist,
            event => getSong(event.song_id).duration_seconds
        )
    );
}

// Friday night checker
function isFridayNight(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDay();
    const hour = date.getHours();

    return (
        (day === 5 && hour >= 17) ||
        (day === 6 && hour < 4)
    );
}

// Friday night events
function getFridayNightEvents(events) {
    return events.filter(event =>
        isFridayNight(event.timestamp)
    );
}

// Songs listened to every day
function getSongsListenedEveryDay(events) {
    if (events.length === 0) {
        return [];
    }

    const allDays = new Set();
    const songDays = {};

    for (const event of events) {
        const day = event.timestamp.split("T")[0];

        allDays.add(day);

        if (!songDays[event.song_id]) {
            songDays[event.song_id] = new Set();
        }

        songDays[event.song_id].add(day);
    }

    return Object.keys(songDays).filter(
        songID =>
            songDays[songID].size === allDays.size
    );
}


// exports function to be used in anthor file
export {
    getMostListenedSong,
    getMostListenedArtist,
    getTopGenres,
    getLongestStreak,
    getMostListenedSongByTime,
    getMostListenedArtistByTime,
    getFridayNightEvents,
    getSongsListenedEveryDay
}
