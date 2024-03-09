class NQueens:
    def __init__(self, num_of_queens):
        self._num_of_queens = num_of_queens
        self.chess_table = [[0]*self._num_of_queens for _ in range(self._num_of_queens)]

    def solve(self):
        if(self.set_queens(0)):
            # self.print_queens()
            return self.chess_table
        else:
            # print("There's no solution.")
            return -1
        

    def set_queens(self,col_index):
        if(col_index == self._num_of_queens):
            return True
        
        for row_index in range(self._num_of_queens):
            if(self.is_place_valid(row_index,col_index)):
                self.chess_table[row_index][col_index] = 1

                if(self.set_queens(col_index + 1)):
                    return True
                self.chess_table[row_index][col_index] = 0
        return False

    def is_place_valid(self, row_index, col_index):
        for i in range(col_index):
            if(self.chess_table[row_index][i] == 1):
                return False
            
        # Check top-left to bottom-right diagonal     
        i, j = row_index, col_index
        while i >= 0 and j >= 0:
            if self.chess_table[i][j] == 1:
                return False
            i -= 1
            j -= 1
        
        # Check top-right to bottom-left diagonal
        i, j = row_index, col_index
        while i < self._num_of_queens and j >= 0:
            if self.chess_table[i][j] == 1:
                return False
            i += 1
            j -= 1
        
        # for i,j in zip(range(row_index,-1,-1), range(col_index,-1,-1)):
        #     if(self.chess_table[i][j] == 1):
        #         return False
        # for i,j in zip(range(row_index,-1,-1),range(col_index,self._num_of_queens)):
        #     if(self.chess_table[i][j] == 1):
        #         return False
        return True
        
       


    def print_queens(self):
        # print(self.chess_table)
        return self.chess_table



