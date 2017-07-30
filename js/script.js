$(document).ready(function(){

let url        = "https://en.wikipedia.org//w/api.php?callback=?",
    $cachedDom = $('.viewer-container'),
    $input     = $cachedDom.find('#input'),
    $button    = $cachedDom.find('#search');

  $input.keypress(function(e) {
    if (e.keyCode == 13) {
      process();
    }
  });

  $button.click(function() {
    process();
  });

  function process() {

    let $input   = $cachedDom.find('#input').val(),
        $row     = $cachedDom.find('.viewer-body');

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
        let output = '';

        if(typeof data.query ==="undefined"){
          alert("Error - Empty Input");
          return false;
        }
        for(let page in data.query.pages) {
          let title   = data.query.pages[page].title,
              content = data.query.pages[page].extract,
              url     = data.query.pages[page].canonicalurl;

              output  += `<a target="_blank" href="${url}"><div>${title}</div></a>`;
        }
        $row.append(output);
      });
  }
});
