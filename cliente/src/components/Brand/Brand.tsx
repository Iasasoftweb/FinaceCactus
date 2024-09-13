import { Link } from "react-router-dom";
import "../Brand/Brand.css";
import { red } from "@mui/material/colors";

function Brand() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between ">
      <div className="logo d-flex align-items-center text-decoration-none" >
        <div className="text-white d-block text-decoration-none ">
          <span className="fs-4">Finance</span><span className=" text-info fs-4" >Cactus</span>
        </div>
       
        
      </div>
      
    </div>
  );
}

export default Brand;
