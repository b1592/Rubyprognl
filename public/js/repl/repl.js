// Generated by CoffeeScript 1.7.1
(function() {
  
window.jqconsole = $('#console').jqconsole("SHALL WE PLAY A GAME?\n", '> ');

jqconsole.RegisterShortcut('Z', function() {
  jqconsole.AbortPrompt();
  handler();
});

// Move to line start Ctrl+A.
jqconsole.RegisterShortcut('A', function() {
  jqconsole.MoveToStart();
  handler();
});

// Move to line end Ctrl+E.
jqconsole.RegisterShortcut('E', function() {
  jqconsole.MoveToEnd();
  handler();
});

jqconsole.RegisterMatching('{', '}', 'brace');
jqconsole.RegisterMatching('(', ')', 'paran');
jqconsole.RegisterMatching('[', ']', 'bracket');
;
  var blinkCursor, initializeRepl, inputCallback, resultCallback;

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

  inputCallback = function(callback) {
    window.jqconsole.Input((function(_this) {
      return function(result) {
        var e;
        try {
          return callback(result);
        } catch (_error) {
          e = _error;
          return _this.ErrorCallback(e);
        }
      };
    })(this));
    return void 0;
  };

  resultCallback = function(result) {
    return console.log("ruby result: " + result);
  };

  this.jsrepl = new JSREPL({
    input: inputCallback,
    result: resultCallback
  });

  initializeRepl = function() {
    var error, output, outputLesson, promptHandler, result, startPrompt;
    jqconsole.Write("done.\n");
    output = function(string) {
      return jqconsole.Write("" + string, "repl-output");
    };
    error = function(string) {
      return jqconsole.Write("" + string, "repl-error");
    };
    result = function(string) {
      return jqconsole.Write(" => " + string + "\n", "repl-result");
    };
    outputLesson = function(string) {
      return jqconsole.Write("" + string + "\n", "repl-lesson");
    };
    promptHandler = function(input) {
      rubyHandler.Eval(input);
      return startPrompt();
    };
    startPrompt = function() {
      return jqconsole.Prompt(true, promptHandler);
    };
    return startPrompt();
  };

  $(".jqconsole").click(function() {
    if (typeof Ruby === "undefined" || Ruby === null) {
      jqconsole.Write("Loading...");
      return jQuery.ajax({
        url: "/public/js/repl/ruby.js",
        dataType: 'script',
        success: initializeRepl,
        cache: true
      });
    }
  });

}).call(this);
