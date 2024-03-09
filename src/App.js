import './App.css';
import { useEffect, useState } from "react";
import queen from './queen.svg';


export default function App() {


  const [inputSize, setInputSize] = useState(0);



  //initial board
  const [chessBoard, setChessBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);

  const [solution, setSolution] = useState(


  );

  const [nqueensResult, setNQueensResult] = useState([]);


 const handleKeyDown = (event) =>{
  event.preventDefault();
  return false;
 }
    
  const handleChange = (event) => {

    if (event.target.value >= 4 & event.target.value <= 12) {

      setInputSize(event.target.value);

    }

  };


  const handleIncrement = () => {
    if(inputSize<12){
    setInputSize(inputSize + 1);
    }


    // 
  };

  const handleDecrement = () => {
    if(inputSize>0)
    setInputSize(inputSize - 1);
  }
  

  const fetcher = async () => {
    // console.log(inputSize)
    if (inputSize>3){
    const response1 = await fetch('/api/nqueens_solver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ size: inputSize })
    }
    );

    const data = await response1.json();
    const result = data.solution
    // const result = JSON.parse(data.solution); //c++
    // console.log(typeof(result[0]));
    // console.log(result);
    if (result[0] === -1) {
      alert("There is no solution");
    } else {
      // setSolution(JSON.parse(data.solution)); //c++
      setSolution(result);
      // console.log(data.solution)
    }
  }
    // setSolution(JSON.parse(data.solution));
  };



  useEffect(() => {

    fetcher();


  }, [inputSize]);

  useEffect(() => {
    displayResults();
  }, [solution]);

  const displayResults = () => {

    try {
      if (solution.length > 0) {
   
        let _nqueensResult = []
        for (let i = 0; i < inputSize; i++) {
          let row = []; // Create an array to hold the boxes for this row
          for (let j = 0; j < inputSize; j++) {
            if (solution[i][j] === 1) {
              row.push(<div key={`${i}-${j}`} className='box queen'>
                <img src={queen} />
              </div>);
            } else if ((i + j) % 2 === 0) {
              row.push(<div key={`${i}-${j}`} className='box black'></div>);
            } else if (solution[i][j] === 0) {
              row.push(<div key={`${i}-${j}`} className='box white'></div>);
            }

          }
          // Push the row div containing the boxes for this row into _nqueensResult
          _nqueensResult.push(<div key={i} className="row">{row}</div>);
        }

        setNQueensResult(_nqueensResult);
      }
    } catch (error) {
      //do nothing
    }
    return nqueensResult;
  }
  // console.log(solution);

  return (

    <>
      <div className='container'>
        <h1>Welcome to NQueens Solver!</h1>
        <form onSubmit={e => { e.preventDefault(); }}>
          <label htmlFor="inputSize">Board Size</label>
          {/* <input type="number" id="inputSize" onChange={handleChange} min="4" max="12" ></input> */}
          <input type="number" id="inputSize" onKeyDown={handleKeyDown} onChange={handleChange} min="4" max="12" value={inputSize} ></input>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
          {/* <button>Reset</button> */}
        </form>

      </div>



      <div></div>

      {/* empty board */}
      <div className='chessboard'>
        {inputSize < 4 && chessBoard.length > 0 && chessBoard.map((row, rIndex) => {
          return (
            <div className="row" key={rIndex}>
              {row.map((_, cIndex) => {
                return (
                  <div
                    className={`box ${(rIndex + cIndex) % 2 === 0 ? "black" : "white"
                      }`}
                    key={cIndex}
                  ></div>
                );
              })}
            </div>
          );
        })}



        {inputSize >= 4 && nqueensResult.length > 0 && nqueensResult.map(
          box => box
        )}
      </div>

    </>
  )


}
