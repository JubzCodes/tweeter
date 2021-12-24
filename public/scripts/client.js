/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// escape function
const newEscape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//create tweet element function

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
    // render tweets function
    const renderTweets = function(tweets) {
      for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $("#tweets-container").prepend($tweet);
      }
    };
    
    // load tweets function
    const loadTweets = () => {
      $.ajax({
        url: "/tweets", 
        method: "get", 
        success: (tweets) => {
          $(`#tweets-container`).empty()
          renderTweets(tweets)
        },
        error: (err) => console.log(`error: ${err}`)
      });
    };
    loadTweets();
    

    // submits tweets
    $("form").on("submit", function(event) {
      event.preventDefault();
      
      const $formData = $(this).serialize();
      const tweetText = $(this).children("textarea").val();
      
      if (tweetText.length === 0) {
        $("#my-error-message").text("❗Tweet is empty❗");
        setTimeout(() => {
          $("#my-error-message").slideDown();
        }, 100);
      } if (tweetText.length > 140) {
        $("#my-error-message").text("❗Tweet is too long❗");
        setTimeout(() => {
          $("#my-error-message").slideDown();
        }, 100);
      } $.ajax({
        url: "/tweets", 
        method: "post", 
        data: $formData,
        success: () => {
          $("#my-error-message").slideUp()
          loadTweets()
        },
        error: (err) => console.log(`error: ${err}`)
      })
    });
});
    