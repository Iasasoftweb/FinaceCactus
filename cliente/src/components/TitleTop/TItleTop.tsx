import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { GoGraph } from "react-icons/go";
import './TitleTop.css'

function TitleTop({ titulos, subtitulos, icon, btnVisible, btnLabel,  visibleEstado, estado }) {
  const [btnEstado, setbtnEstado] = useState(true);
  const estadoTitle = useRef('')

  const toglleButtonVisibilty = () => {
    setbtnEstado(!btnEstado);
  };
  return (

    <div className="card card bg-dark bg-opacity-75 w-100 p-3">
      <div>
        <div className="d-flex justify-content-between ">
          <div className="d-flex">
            <div className="me-3">
             {icon}
            </div>
            <div className="lh-1 mt-3">
              <h6 className=" text-white title2">{titulos}</h6>
              <span className=" text-white title1">{subtitulos}</span>
             
            </div>
          </div>

          {btnVisible && (
            <Button label={btnLabel} rounded raised className=" bt " />
          )}

           { visibleEstado && <span className="clFont text-bg-danger py-2 px-2 rounded-3 text-center text-white" ref={estadoTitle} > {estado} </span>}
        </div>
      </div>
    </div>
  );
}

export default TitleTop;
