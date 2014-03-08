// Generated by CoffeeScript 1.7.1
(function() {
  var BLOCK_OPENERS, TOKENS,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.RubyHandler = (function() {
    function RubyHandler(outputHandlers, engine, lesson) {
      var bufferError, bufferOutput;
      this.engine = engine;
      this.lesson = lesson;
      this.result = outputHandlers.result;
      this.output = outputHandlers.output;
      this.error = outputHandlers.error;
      this.output_lesson = outputHandlers.lesson;
      this.error_buffer = this.output_buffer = [];
      bufferOutput = (function(_this) {
        return function(chr) {
          if (chr != null) {
            return _this.output_buffer.push(String.fromCharCode(chr));
          }
        };
      })(this);
      bufferError = (function(_this) {
        return function(chr) {
          if (chr != null) {
            return _this.error_buffer.push(String.fromCharCode(chr));
          }
        };
      })(this);
      this.engine.initialize(null, bufferOutput, bufferError);
    }

    RubyHandler.prototype.Eval = function(command) {
      var e, result;
      this.error_buffer = this.output_buffer = [];
      try {
        result = this.engine["eval"](command);
        if (this.output_buffer.length) {
          this.output(this.output_buffer.join(""));
        }
        return this.result(this.engine.stringify(result));
      } catch (_error) {
        e = _error;
        if (typeof e !== 'number') {
          return this.error('Internal error: ' + e);
        } else if (this.error_buffer.length) {
          return this.error(this.error_buffer.join(''));
        } else {
          return this.error('Unknown error.\n');
        }
      }
    };

    RubyHandler.prototype.RawEval = function(command) {
      return this.Eval(command);
    };

    RubyHandler.prototype.GetNextLineIndent = function(command) {
      var braces, brackets, last_line_changes, levels, line, parens, token, _i, _j, _len, _len1, _ref, _ref1;
      levels = 0;
      parens = 0;
      braces = 0;
      brackets = 0;
      last_line_changes = 0;
      _ref = command.split('\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        last_line_changes = 0;
        _ref1 = line.match(TOKENS) || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          token = _ref1[_j];
          if (__indexOf.call(BLOCK_OPENERS, token) >= 0) {
            levels++;
            last_line_changes++;
          } else if (token === '(') {
            parens++;
            last_line_changes++;
          } else if (token === '{') {
            braces++;
            last_line_changes++;
          } else if (token === '[') {
            brackets++;
            last_line_changes++;
          } else if (token === 'end') {
            levels--;
            last_line_changes--;
          } else if (token === ')') {
            parens--;
            last_line_changes--;
          } else if (token === ']') {
            braces--;
            last_line_changes--;
          } else if (token === '}') {
            brackets--;
            last_line_changes--;
          }
          if (levels < 0 || parens < 0 || braces < 0 || brackets < 0) {
            return false;
          }
        }
      }
      if (levels > 0 || parens > 0 || braces > 0 || brackets > 0) {
        if (last_line_changes > 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return false;
      }
    };

    return RubyHandler;

  })();

  BLOCK_OPENERS = ["begin", "module", "def", "class", "if", "unless", "case", "for", "while", "until", "do"];

  TOKENS = /\s+|\d+(?:\.\d*)?|"(?:[^"]|\\.)*"|'(?:[^']|\\.)*'|\/(?:[^\/]|\\.)*\/|[-+\/*]|[<>=]=?|:?[a-z@$][\w?!]*|[{}()\[\]]|[^\w\s]+/ig;

  module.exports = this.RubyHandler;

}).call(this);
