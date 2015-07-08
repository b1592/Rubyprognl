class Game
  attr_accessor :current_player

  def initialize
    @board = Board.new
    @current_player = "X"

    start_game
  end

  def start_game
    while over? == false
      # play(move)...
    end
  end

  def play(move)
  end

  def over?
    # to check verticals:
    @board.three_same_in_rows?(@board.verticals)
  end
end

class Board
  def initialize
    @board = [" ", " ", " ", " ", " ", " ", " ", " ", "O"]
  end

  def get_square(n)
  end

  def put_square(player, n)
  end

  def three_same_in_rows?(rows)
    for row in rows
      if row[0] == row[1] && row[1] == row[2]
        return true
      end
    end

    return false
  end

  def verticals
    return [
      [@board[0], @board[3], @board[6]],
      [@board[1], @board[4], @board[7]],
      [@board[2], @board[3], @board[8]]
    ]
  end

  def horizontals
  end

  def diagonals
  end

  def full?
  end

  def draw
    output = []
    for i in [0, 3, 6]
      output << " #{@board[i]} | #{@board[i + 1]} | #{@board[i + 2]}       #{i} | #{i + 1} | #{i + 2} "
    end
    puts output.join("\n---|---|---     ---|---|---\n")
  end
end