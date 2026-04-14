import { useState } from "react";

export default function Player({initialValue,symbol,isActive,onChange}){
    const [playername,setplayername] = useState(initialValue);
    const [isEditing,setisEditing] = useState(false);

   
        function onhandle() {
  if (isEditing) {
    onChange({ symbol, newName: playername });
  }
  setisEditing(editing => !editing);
}
    
    function handleplayer(event){
        setplayername(event.target.value);
    }
    let editplayer = <span className="player-name">{playername}</span>;

    if(isEditing){
        editplayer = <input type="text" required value={playername} onChange={handleplayer}/>;
    }
    return ( <li className={isActive ? "active": undefined} >
      <span className="player">
      {editplayer}
      <span className="player-symbol">{symbol}</span>
       </span>
       <button onClick={onhandle}>{isEditing ? 'Save' : 'Edit'}</button>

      </li>);
}