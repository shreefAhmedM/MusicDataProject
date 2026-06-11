- The website must contain a drop-down which lists four users.

* Tested manually i have open the website and checked it has dropdown contains 4 users

- Selecting a user must display answers relevant to that user (see table below).

* Tested manually by opened the application and when selecting a user its display answers relevant to that user

- The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:

* tested manually by opened the application and confirmed that results change automatically when a different user is selected.

- User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").

* Tested manually by openning the application and selecting user 4 it displays (This user didn't listen to any songs.).

- If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.

* Tested manually by openning the application if a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface completely hide the question and answer

- If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres" or "Top 2 genres" or similar.

* Tested manually by openning the application if fewer than three (but more than zero) genres were listened to the site lists the top genres listened to.when i selected user2 the website displays (Top genres -> Pop)

- Unit tests must be written for at least one non-trivial function.

* I wrote unit tests for `getLongestStreak()`. is a non-trivial function it correctly identify the longest consecutive sequence of the same song.

- The website must score 100 for accessibility in Lighthouse

* Tested manually by openning the application in google chrome and ran the Lighthouse inside the devTools, Accessibility score = 100.
