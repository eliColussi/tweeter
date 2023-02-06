/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //tweet object to append to tweet-container
  const createTweetElement = function (tweetData) {
    const tweetDate = timeago.format(tweetData.created_at);
    const $tweet = `    
      <article class="tweet">
        <header>
          <span>
            <img class='tweet-icon' src=${tweetData.user.avatars}/>
            <h3>${tweetData.user.name}</h3>
          </span>
          <span class="username">
            <h3>${tweetData.user.handle}</h3>
          </span>
        </header>
        <section>
          <p> ${escape(tweetData.content.text)}</p>
        </section>
        <footer>
          <div>
            <span>${(tweetDate)}</span>
          </div>
          <div>
          <socials class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </socials>
          </div>
        </footer>
      </article>`;

    return $tweet;
  };

  // loops through the tweets and appends to tweet container
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    }
  };
  // takes tweets from database and posts on the page
  const loadTweets = () => {
    $.ajax("/tweets/", {
      dataType: "JSON",
      type: "GET",
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };



  $("form").on("submit", function (event) {
    event.preventDefault();

    const tweet = $('#tweet-text').val().length;
    if (!tweet) {
      $(".error-msg").slideUp('200');
      $(".error-msg2").slideDown('slow');
    } else if (tweet > 140) {
      $(".error-msg2").slideUp('slow');
      $(".error-msg").slideDown('slow');
    } else {
      $(".error-msg").slideUp('slow');
      $(".error-msg2").slideUp('slow');
      const formData = $(this).serialize();

      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: formData
      })
        .then(loadTweets());
      $("#tweet-text").val("");

    };
  })
});
