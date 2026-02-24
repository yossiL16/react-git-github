import { useEffect, useState } from "react";

export default function Cube({ onClick, id, reset, current }) {

  const [click, setClick] = useState(false)
  const [classname, setClassname] = useState('cube');

  useEffect(() => {
    setClick(false)
    setClassname('cube')
  }, [reset])

  function handleClick(e) {
    if(current){
    setClassname(checkIfBomb());
    setClick(true)
    onClick(e)
    }
  }

  function checkIfBomb() {
    return (id === 'boom') ? 'b' : 'X'
  }

  return (
    <div className={classname} id={click ? "not-found" : id} onClick={handleClick}>
    </div>
  );
}
