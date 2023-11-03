import { useSelector } from "react-redux";
import { increment, decrement } from "./features/course/courseSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.course);
  return (
    <div className="">
      <p>Kedar</p>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default App;
