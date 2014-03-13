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
  var blinkCursor, initializeRepl;

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

  initializeRepl = function() {
    var engine, error, lesson, output, outputHandlers, outputLesson, promptHandler, question, questionParams, result, rubyHandler, startPrompt;
    jqconsole.Write("done.\n");
    output = function(string) {
      jqconsole.Write("" + string, "repl-output");
      return void 0;
    };
    error = function(string) {
      jqconsole.Write("" + string, "repl-error");
      return void 0;
    };
    result = function(string) {
      jqconsole.Write(" => " + string + "\n", "repl-result");
      return void 0;
    };
    outputLesson = function(string) {
      jqconsole.Write("" + string + "\n", "repl-lesson");
      return void 0;
    };
    outputHandlers = {
      output: output,
      error: error,
      result: result,
      lesson: outputLesson
    };
    engine = Ruby;
    questionParams = {
      description: "Typ eens x = 1.",
      answer: /x\s*=\s*1/,
      possible_errors: {
        wrong_value: /x\s*=\s*\d/
      },
      error_messages: {
        wrong_value: "Je hebt de verkeerde waarde toegewezen.",
        "default": "Dat is niet goed. Typte je x = 1?"
      }
    };
    question = new Question(questionParams);
    lesson = new Lesson([question, question]);
    rubyHandler = new RubyHandler(outputHandlers, engine, lesson);
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
        url: "/public/js/repl/ruby.closure.js",
        dataType: 'script',
        success: initializeRepl,
        cache: true
      });
    }
  });

}).call(this);
