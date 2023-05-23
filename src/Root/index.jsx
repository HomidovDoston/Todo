import {Routes, Route} from "react-router-dom";
import Todo from  "../components/Todo";

const Root = () =>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Todo />} />
            </Routes>
        </>
    )
}

export default Root;