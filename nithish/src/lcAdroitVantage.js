import React, { useEffect, useState } from "react";
import "./styles.css";

const LcAdroitVantage = (props) => {
    const [userInput,setUserInput] = useState(null);
    const [submitted,setSubmitted] = useState(false);
    const [showPopUp, setShowPopUp] = useState({show:false, word:null});
    const onFormSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    }
    const textHandler = (e) => {
        setUserInput(e.target.value);
        setSubmitted(false);
        setShowPopUp({...showPopUp,show:false});
    }
    console.log("rendered");
    return (
            <div className="App">
                <div className="form-wrapper">
                    <form>
                        <textarea className="form-textarea" onChange={textHandler} value={userInput}/>
                        <button className="formbutton" type="submit" onClick={onFormSubmit}>Submit</button>
                    </form>
                </div>
                <div className="display-section">
                    {submitted &&<section title="User Feedback">
                        {userInput.split(" ").map((word, i) => {
                            return (word.length > 5 ? <a key={i} onClick={() => setShowPopUp({word: word,show:true})} style={{color: "blue"}}>{word+ " "}</a> : <span key={i}>{word+" "}</span>);
                        })}
                    </section>}
                </div>
                {showPopUp.show && (<Popup closePopup={setShowPopUp} showPopUp={showPopUp}>popup</Popup>)}
            </div>
    );
};

const Popup = ({closePopup, showPopUp, children}) => {
    const [loader, setLoader] = useState(true);
    const [response, setresponse] = useState([]);
    const tablecolumns = ["partOfSpeech","definition"];
    const [error,setError] = useState(false);
    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+showPopUp.word, {method: "GET"} ).then(res => res.json().then(function (response) {
            setLoader(false);
            setresponse(response)
        }).catch(function (error) {
            setLoader(false);
            setError(true);
            console.error(error);
        }));
    },[]);
    return (
    <div className="popup-wrapper">
        <div className="close-popup" onClick={() => closePopup({...showPopUp,show:false})}>close</div>
        <div className="second-div-popup">
        <div><h2>{showPopUp.word.toUpperCase()}</h2></div>
            {loader && <div className="loader"></div>}
            {error && <div className="error"> There is some problem in fetching meaning for the {showPopUp.word}</div>}
            {!loader && !error && (
                <table>
                    <tr>
                        {tablecolumns.map(item => (<th>{item.toUpperCase()}</th>))}
                    </tr>
                {response.length &&(response[0]?.meanings.map(item => (
                    <tr>
                    {tablecolumns.map(column => {
                        if(column === "partOfSpeech") {
                            return <td>{item[column]}</td>
                        }
                        else {
                            return (<td>{item?.definitions.map(i => (<span>{i.definition}<br/></span>))}</td>);
                        }
                    })}
                    </tr>
                )))}
            </table>)}
        </div>
    </div>);
};

export default LcAdroitVantage;