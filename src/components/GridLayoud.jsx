import { useEffect, useState, useRef } from 'react'
import shuffleArray from '../utils/shuffle';
import Cube from './Cube';

export default function GridLayoud() {

    const [listValue, setListValue] = useState([])
    const [count, setCount] = useState(10)
    const [flag, setFlag] = useState(true)
    const [timer, setTimer] = useState("00:00:00");
    const [current, setCurrent] = useState(true)

    const Ref = useRef(null);

    function getTimeRemaining(e) {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    function startTimer(e) {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {

            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

        function clearTimer (e) {
        setTimer("00:00:59");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    function getDeadTime() {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 50);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    function onClickReset() {
        clearTimer(getDeadTime());
    };


    function gridCube() {
        let listCube = [];
        for (let i = 0; i < 10; i++) {
            listCube.push("boom")
        }
        for (let i = 0; i < 100; i++) {
            listCube.push("x")
        }
        const suffle = shuffleArray(listCube)
        return suffle
    }

    function minusCount(e) {
        setCount((prev) => {
            const nextCount = e.target.id === "boom" ? prev -1 : prev;
            if (nextCount === 0 || timer === "00:00:00") {
                setCurrent(false)
                clearTimer("00:00:00")
                setTimer(timer)
            }
            return nextCount
        })
    }

    function resetGame(){
            setFlag(!flag)
            onClickReset()
            setCount(10)
            setCurrent(true)
    }


    useEffect(() => {
        let x = gridCube()
        setListValue(x)
        
    }, [flag])


    return (
        <>
            <header>
                <div>
                    <h1>{count}</h1>
                    <p>timer {timer}</p>

                </div>

            </header>
            <div className="parent">
                {listValue.map((item, index) => {
                    return (
                        <Cube key={index} id={item} reset={flag} onClick={(e) => minusCount(e)} current={current} />
                    )
                })}
            </div>
            <br />
            <button onClick={resetGame}>resert</button>
        </>
    )
}
