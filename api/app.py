import subprocess
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/api/nqueens_solver', methods=['POST'])
def solve_nqueens():
    data = request.json
    chess_board_size = data['size']
    result = subprocess.run(['./nqueens_solver', str(chess_board_size)], capture_output=True)
    solution_raw = result.stdout.strip() #byte object
    solution_str = solution_raw.decode()
    return jsonify({'solution':solution_str})


if __name__ == '__main__':
    app.run(debug=True)