import { useEffect} from "react";
import { getCriptoUpdateUrl } from "../constants";
import useCounter from "../hooks/useCounter";
import useRefreshData from "../hooks/useRefreshData";

function currentTime() {
  return Math.round(Date.now() / 1000);
}

function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

/* 
  Ignore the code above
*/


export default function MainDetail({
  selectedCrypto: { id, name, current_price, last_updated, symbol },
  updateCryptoData
}) {

  //////////////////////////////////////////////////////////////////////////////////////
  //                                                                                  //
  //  The following comments give you an indication of what you can put in            //
  //  a custom hook.                                                                  //
  //                                                                                  //
  //  They don't represent separate hooks that you might have to create.              //
  //                                                                                  //
  //  You can put them all in one custon hook, if you think that's the best approach  //
  //                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////
  const [updateCounter, setUpdateCounter, updatePause, setUpdatePause] = useCounter(30, -1, 1000, true)
  const [currTime] = useCounter(currentTime(), 1, 1000)
  const [updateData] = useRefreshData( updateCounter < 0, getCriptoUpdateUrl(id), setUpdateCounter, 30)
 
    useEffect(() =>{
      if(updateData)updateCryptoData({
          current_price: updateData[id].gbp,
          last_updated: updateData[id]["last_updated_at"]
        },
        id
      )},[updateData])

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          <p>
            {updatePause &&
              `next update ${updateCounter ? `in ${updateCounter}` : "about to happen"}`}
          </p>
          <button
            className="main-detail__button"
            onClick={() => setUpdatePause((val) => !val)}
          >
            {updatePause ? "Pause" : "Start"} update
          </button>
        </div>
        <div className="main-detail__name">
          <h2>{name}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p>£{current_price}</p>
          <p>Updated {currTime - convertToSeconds(last_updated)} seconds ago</p>
        </div>
      </section>
    </>
  );
}
