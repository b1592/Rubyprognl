// Generated by CoffeeScript 1.7.1
(function() {
  var $;

  Array.prototype.count = function(item) {
    var c, count, _i, _len;
    count = 0;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      c = this[_i];
      if (c === item) {
        count++;
      }
    }
    return count;
  };

  $ = jQuery;

  this.tictactoe = (function($) {
    var alphaBetaSearch, board, chooseRandom, clear, config, endState, getFreePositions, isBoard, loser, maxValue, minValue, negaMax, occupy, players, terminalTest, toMove, utility, winner, winnerWhere;
    config = {
      rows: 3,
      cols: 3,
      numToWin: 3,
      ply: 4
    };
    players = {
      cross: -1,
      naughts: 1
    };
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    toMove = function(boardState) {
      var player, state, _i, _len;
      if (boardState == null) {
        boardState = board;
      }
      player = [0, 0];
      for (_i = 0, _len = boardState.length; _i < _len; _i++) {
        state = boardState[_i];
        if (state === players.naughts) {
          player[0]++;
        } else if (state === players.cross) {
          player[1]++;
        }
      }
      if (player[0] <= player[1]) {
        return players.naughts;
      } else {
        return players.cross;
      }
    };
    occupy = function(location) {
      if (getFreePositions().indexOf(location) !== -1) {
        board[location] = toMove();
        return true;
      } else {
        return false;
      }
    };
    clear = function() {
      return board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
    isBoard = function(board) {
      return board.length === 9 && (board != null);
    };
    getFreePositions = function(boardState) {
      var idx, move, moves;
      if (boardState == null) {
        boardState = board;
      }
      return moves = (function() {
        var _i, _len, _results;
        _results = [];
        for (idx = _i = 0, _len = boardState.length; _i < _len; idx = ++_i) {
          move = boardState[idx];
          if (move === 0) {
            _results.push(idx);
          }
        }
        return _results;
      })();
    };
    terminalTest = function(boardState) {
      if (boardState == null) {
        boardState = board;
      }
      return getFreePositions(boardState).length === 0;
    };
    endState = function(player, boardSt) {
      if (boardSt == null) {
        boardSt = board;
      }
      return terminalTest(boardSt) || winner(player, boardSt) || loser(player, boardSt);
    };
    winner = function(player, boardState) {
      var result;
      if (boardState == null) {
        boardState = board;
      }
      result = winnerWhere(player, boardState);
      return result[0] !== -1 && result[1] !== -1;
    };
    loser = function(player, boardState) {
      if (boardState == null) {
        boardState = board;
      }
      return winner(-player, boardState);
    };
    winnerWhere = function(player, boardState) {
      var c, col, colsMinusOne, csub, dc1, diag1, diag2, dr1, dsub, iters, numToWin, r, rowByTotalCols, rowsPlusOne, sliceEnd, sliceStart, _i, _j, _k, _ref, _ref1, _ref2;
      if (boardState == null) {
        boardState = board;
      }
      r = 0;
      while (r < config.rows) {
        sliceStart = r * config.rows;
        sliceEnd = sliceStart + config.rows;
        if (boardState.slice(sliceStart, sliceEnd).count(player) === config.numToWin) {
          return [r * config.rows, (r * config.rows) + config.rows - 1];
        }
        r++;
      }
      c = 0;
      while (c < config.cols) {
        iters = 0;
        csub = c;
        col = [];
        while (csub < boardState.length && iters < config.numToWin) {
          col.push(boardState[csub]);
          iters++;
          csub += config.cols;
        }
        if (col.count(player) === config.numToWin) {
          return [c, c + (config.cols * (config.numToWin - 1))];
        }
        c++;
      }
      rowsPlusOne = config.rows + 1;
      colsMinusOne = config.cols - 1;
      numToWin = config.numToWin;
      for (dc1 = _i = 0, _ref = config.rows - numToWin; 0 <= _ref ? _i <= _ref : _i >= _ref; dc1 = 0 <= _ref ? ++_i : --_i) {
        for (dr1 = _j = 0, _ref1 = config.cols - numToWin; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; dr1 = 0 <= _ref1 ? ++_j : --_j) {
          diag1 = [];
          diag2 = [];
          rowByTotalCols = dr1 * config.cols;
          for (dsub = _k = 0, _ref2 = numToWin - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; dsub = 0 <= _ref2 ? ++_k : --_k) {
            diag1.push(boardState[rowByTotalCols + (dsub * rowsPlusOne)]);
            diag2.push(boardState[rowByTotalCols + 2 + (dsub * colsMinusOne)]);
          }
          if (diag1.count(player) === numToWin) {
            return [rowByTotalCols + (0 * rowsPlusOne), rowByTotalCols + ((numToWin - 1) * rowsPlusOne)];
          }
          if (diag2.count(player) === numToWin) {
            return [rowByTotalCols + 2 + (0 * colsMinusOne), rowByTotalCols + 2 + ((numToWin - 1) * colsMinusOne)];
          }
        }
      }
      return [-1, -1];
    };
    utility = function(boardState, player) {
      var col, diag1, diag2, markScore, r, row, score;
      if (player == null) {
        player = boardState;
        boardState = board;
      }
      score = 0;
      markScore = [0, 1, 10, 1000];
      diag1 = [boardState[0], boardState[4], boardState[8]];
      diag2 = [boardState[2], boardState[4], boardState[6]];
      r = 0;
      while (r < config.rows) {
        row = boardState.slice(r * 3, (r * 3) + 3);
        if (row.count(player) > 0 && row.count(-player) === 0) {
          score += markScore[row.count(player)];
        } else if (row.count(-player) > 0 && row.count(player) === 0) {
          score -= markScore[row.count(-player)];
        }
        col = [boardState[r], boardState[r + 3], boardState[r + 6]];
        if (col.count(player) > 0 && col.count(-player) === 0) {
          score += markScore[col.count(player)];
        } else if (col.count(-player) > 0 && col.count(player) === 0) {
          score -= markScore[col.count(-player)];
        }
        if (diag1.count(player) > 0 && diag1.count(-player) === 0) {
          score += markScore[diag1.count(player)];
        } else if (diag1.count(-player) > 0 && diag1.count(player) === 0) {
          score -= markScore[diag1.count(-player)];
        }
        if (diag2.count(player) > 0 && diag2.count(-player) === 0) {
          score += markScore[diag2.count(player)];
        } else if (diag2.count(-player) > 0 && diag2.count(player) === 0) {
          score -= markScore[diag2.count(-player)];
        }
        r++;
      }
      return score;
    };
    chooseRandom = function(state, player) {
      var possMoves, result;
      possMoves = getFreePositions(state);
      result = possMoves[Math.floor(possMoves.length * Math.random())];
      return [player, 1, result];
    };
    alphaBetaSearch = function(state) {
      var abs, biggestValue, newBoard, player, possMoves, result, tryMove, _i, _len;
      if (state == null) {
        state = board;
      }
      player = toMove();
      biggestValue = -Infinity;
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        if (winner(player, newBoard)) {
          return [player, 1000, tryMove];
        }
        if (loser(player, newBoard)) {
          return [player, -1000, tryMove];
        }
        abs = -negaMax(newBoard, config.ply, -Infinity, Infinity, -player);
        if (abs > biggestValue) {
          biggestValue = abs;
          result = tryMove;
        }
        newBoard[tryMove] = 0;
      }
      return [player, biggestValue, result];
    };
    negaMax = function(state, depth, alpha, beta, player) {
      var newBoard, possMoves, tryMove, val, _i, _len;
      if (endState(state, player) || depth === 0) {
        return utility(state, player);
      }
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        val = -negaMax(newBoard, depth - 1, -beta, -alpha, -player);
        if (val >= beta) {
          return val;
        }
        alpha = Math.max(val, alpha);
        newBoard[tryMove] = 0;
      }
      return alpha;
    };
    maxValue = function(state, depth, alpha, beta, player, firstPlayer) {
      var minVal, newBoard, possMoves, tryMove, v, _i, _len;
      if (endState(state, player) || depth === 0) {
        return utility(state, firstPlayer);
      }
      v = -Infinity;
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        minVal = minValue(newBoard, depth - 1, alpha, beta, -player, firstPlayer);
        v = Math.min(v, minVal);
        if (v >= beta) {
          return v;
        }
        alpha = Math.max(v, alpha);
      }
      return v;
    };
    minValue = function(state, depth, alpha, beta, player, firstPlayer) {
      var maxVal, newBoard, passMoves, tryMove, v, _i, _len;
      if (endState(state, player) || depth === 0) {
        return utility(state, firstPlayer);
      }
      v = Infinity;
      passMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        maxVal = maxValue(newBoard, depth - 1, alpha, beta, -player, firstPlayer);
        v = Math.min(v, maxVal);
        if (v <= alpha) {
          return v;
        }
        beta = Math.min(beta, v);
      }
      return v;
    };
    return {
      board: function() {
        return board;
      },
      config: function() {
        return config;
      },
      toMove: toMove,
      occupy: occupy,
      clear: clear,
      isBoard: isBoard,
      getFreePositions: getFreePositions,
      terminalTest: terminalTest,
      endState: endState,
      winner: winner,
      loser: loser,
      winnerWhere: winnerWhere,
      utility: utility,
      chooseRandom: chooseRandom,
      alphaBetaSearch: alphaBetaSearch,
      maxValue: maxValue,
      minValue: minValue
    };
  })($);

}).call(this);
