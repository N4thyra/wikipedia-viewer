$().ready(() => {

const viewer = (() => {

// DOM $selectors
const url        = "https://en.wikipedia.org//w/api.php?callback=?",
      $el        = $('.viewer-container'),
      $input     = $el.find('#input'),
      $button    = $el.find('#search'),
      $random    = $el.find('#random');

// generate a random website
  $random.click(() => {
    window.location.href = ' http://en.wikipedia.org/wiki/Special:Random';
  });

// process information when ENTER is pressed
  $input.keypress((e) => {
    if (e.keyCode == 13) {
      process();
    }
  });

// process information when button gets clicked
  $button.click(() => {
    process();
  });

  function process() {

    let $input   = $el.find('#input').val(),
        $row     = $el.find('.viewer-body');

        //clear everything that's is on the screen
        $row.html('');

    $.getJSON(url, {
        action: "query",
        format: "json",
        prop: "info|pageprops|extracts",
        generator: "search",
        inprop: "url",
        gsrsearch: $input,
        exintro: "",
        exlimit: "max",
      },
      function(data){

        if(typeof data.query ==="undefined"){
          alert("Error - Empty Input");
          return false;
        } else {
          let result = makeOutput(data.query.pages);
          $row.append(result);

        }
      });

      // take JSON data and return a chunk of HTML code, which is going to be inserted
      // into the page
      function makeOutput(query) {
        let output = '';

        for(let page in query) {
          let title   = query[page].title,
              content = query[page].extract,
              url     = query[page].canonicalurl;

              output  += `<a target="_blank" href="${url}"><div>${title}</div></a>`;
        }
        return output;
      }
  }
})();

});
