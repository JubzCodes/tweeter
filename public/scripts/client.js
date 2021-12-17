/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
      "user": {
        "name": "StinkMeaner",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@Boondocks"
      },
      "content": {
        "text": "Whats good? What's really good?"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

$(document).ready(function() {
  const createTweetElement = function(obj) {
    const $tweet = $(
      `<article>
              <header>
                <div class="profile">
                  <img src="${obj.user.avatars}">
                  <h5>${obj.user.name}</h5>
                </div>
                <h5>${obj.user.handle}</h5>
              </header>
              <p>${obj.content.text}</p>
            <footer>
              <p>${timeago.format(obj.created_at)}/p>
              <div class="pics">
                <button class="flag"><i class="fas fa-flag"></i></button>
                <button class="retweet"><i class="fas fa-retweet"></i></button>
                <button class="heart"><i class="fas fa-heart"></i></button>
              </div>
            </footer>
          </article>`);
    return $tweet;
  };
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };
  renderTweets(data);
});


