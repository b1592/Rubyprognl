// Generated by CoffeeScript 1.7.1
(function() {
  var blinkCursor;

  window.jqconsole = $('#console').jqconsole("CLICK TO START LESSON.\n", '> ');

  jqconsole.RegisterMatching('{', '}', 'brace');

  jqconsole.RegisterMatching('(', ')', 'paran');

  jqconsole.RegisterMatching('[', ']', 'bracket');

  blinkCursor = function() {
    var cursor;
    cursor = $(".jqconsole-cursor");
    if (cursor.css("opacity") === "1") {
      return cursor.css({
        "opacity": 0
      });
    } else {
      return cursor.css({
        'opacity': 1
      });
    }
  };

  setInterval(blinkCursor, 650);

}).call(this);
