import Logincard from "../../componentes/login/Logincard";
import imgBienvenida from "../../assets/img/bienvenido.png";
import "./Login.css";



function Login() {

  

  return (
    <div>
      <div className="container-fluid bg-dark-subtle ">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className=" bg-white shadow-sm ">
              <div className="row ">
                <div className="col-md-6 ibienvenido flex-column d-flex justify-content-end ">
                   <img src={imgBienvenida} alt="" />
                    {/* <div className="m-4 mb-0 lh-1">
                      <p className="lh-1.0 font-dm-sans text-white text-shadow-custom fs-47 fw-medium mt-4 m-b-0">
                        Finance
                      </p>
                      <p className="font-dm-sans text-white fs-2 text-shadow-custom fw-medium ">
                        Cactus
                      </p>
                    </div>

                    <div className="lh-1 mx-4" >
                      <p className=" font-raleway text-white fs-6 mt-0 mb-1">
                        Sistema Control
                      </p>
                      <p className="font-raleway text-white fs-6 ">
                        de Préstamos
                      </p>
                    </div>

                    <div className="mx-4 my-1 lh-1">
                      <p className="lh-1 font-dm-sans text-white fs-1 mt-5 mb-2">
                        Bienvenidos
                      </p>
                      <p className="font-dm-sans text-white fs-2 ">
                        Login..
                      </p>
                    </div>

                    

                    

                    <div className="mx-4  lh-1 my-5  ">
                      <p className="lh-1  text-white ">
                        Desarrollado por IasaSoft
                      </p>
                     
                    </div> */}
                  

                  {/* <img src={LogoPage} alt="" className="p-5"/> */}
                </div>

                <div className="col-md-6 p-5 border-black bor">
                  <Logincard />
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
