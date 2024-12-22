import React from "react";
import { x } from 'lucide-react';

function Modal({onClose}){
    const modelRef = useRef();

    const closeModel = (e) => {
        if(modelRef.current === e.target){
            onClose();
        }
    }

    return (
        <div //add CSS>
            <button><X/></button>
            <div>
                <h1>Project Members</h1>
                <
            </div>
        </div>
    )
}
function App(){

    return(
        <div>
            <h1>Project Members</h1>
            <button>Project Members</button>
            
        </div>
    )
}
class App extends Component{
    const { people } = this.state;
    state = {
        people : [
            {id: 1, firstName : "Manny", lastname: "Rivas"},
            {id: 1, firstName : "Oralia", lastname: "Cisneros"},
            {id: 1, firstName : "Scott", lastname: "Farquar"},
        ]
    }
    render(){
        return(
            <div>
                <h1>Project Members</h1>
                <ul>
                    <li></li>
                    <li></li>

                </ul>

                <ul>
                {people.map((person)=>{
                    return <li key={person.id}/>
                })}
                </ul>
            </div>
        )
    }
}

export default App;