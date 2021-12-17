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
      "created_at": 1639535736824
    },
    {
      "user": {
        "name": "Katara",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@TheLastAirbender" },
      "content": {
        "text": "Anybody have waterbending scrolls?"
      },
      "created_at": 1639622136824
    }
  ]

const newEscape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function() {
  const createTweetElement = function(obj) {
    const $tweet = $(
      `<article>
              <header>
                <div class="profile">
                  <img src=${newEscape(obj.user.avatars)}>
                  <h5>${newEscape(obj.user.name)}</h5>
                </div>
                <h5>${newEscape(obj.user.handle)}</h5>
              </header>
              <p>${newEscape(obj.content.text)}</p>
            <footer>
              <p>${timeago.format(obj.created_at)}</p>
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
      $("#tweets-container").prepend($tweet);
    }
  };
  renderTweets(data);

  $("form").on("submit", function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();
    const tweetText = $(this).children("textarea").val();

    if (tweetText.length === 0) {
      alert("Tweets must be atleast 1 character long!");
    } else if (tweetText.length > 140) {
      alert("Tweets can't be over 140 characters long!");
    } else {
      $.ajax({
        url: "/tweets", 
        method: "post", 
        data: $formData,
        success: () => loadTweets(),
        error: (err) => console.log(`error: ${err}`)
      })
        .then((data) => {
        renderTweets(data);
      });
    }
  });

  const loadTweets = () => {
    $.ajax({
      url: "/tweets", 
      method: "get", 
      success: (tweets) => renderTweets(tweets),
      error: (err) => console.log(`error: ${err}`)
    });
  };
  loadTweets();
});


