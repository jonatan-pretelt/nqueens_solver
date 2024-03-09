import subprocess
from flask import Flask, request, jsonify
import json
from nqueens_solver import NQueens

app = Flask(__name__, static_folder="../build", static_url_path="/")

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/nqueens_solver', methods=['POST'])
def solve_nqueens():
    data = request.json
    chess_board_size = data['size']
    # print(chess_board_size)
    nqueens = NQueens(int(chess_board_size))
    solution = nqueens.solve()
    # solution_str = nqueens.print_queens()

    #Windows C++
    # result = subprocess.run(['./nqueens_solver', str(chess_board_size)], capture_output=True) 
    # solution_raw = result.stdout.strip() #byte object
    # solution_str = solution_raw.decode()
    return jsonify({'solution':solution})


# if __name__ == '__main__':
#     app.run(debug=True)