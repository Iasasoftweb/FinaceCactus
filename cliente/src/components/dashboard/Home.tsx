import React from "react";
import { GoGraph } from "react-icons/go";
import { LuArrowRightCircle } from "react-icons/lu";
import { PiPiggyBank } from "react-icons/pi";
import { TfiAlert } from "react-icons/tfi";
import { IoIosArrowUp } from "react-icons/io";


import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { PiUsers } from "react-icons/pi";
import { BsExclamationLg } from "react-icons/bs";
import { Card } from "primereact/card";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import TitleTop from "../TitleTop/TItleTop";
import formatNumber from "../misc/formattedNumber";

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="">
      <div className="main-title">
        <TitleTop
          titulos={"CRM Dashboard"}
          subtitulos={"Resultado estadisticos de la situacion actual"}
          btnVisible={true}
          btnLabel={"Refrescar"}
          icon={
            <GoGraph className="fs-1  border-1 rounded-circle p-2 text-info" />
          }
        />
      </div>

      <br />

      <div className=" main-cards  bg-light p-4">
        <div className="card">
          <div className="card-inner">
            <div className="d-flex ">
              <div className=" text-light rounded-circle border-1 bg-primary bg-opacity-50 p-3 m-3">
                <PiUsers className="fs-1" />
              </div>
              <div className="lh-1 mt-2">
                <span className="fw-lighter text-black-50 fw-medium"> Clientes</span>
                <h2 className="lh-1 mt-2">300</h2>
                <span className="fw-lighter text-black-50 mt-0">
                  Ulitimo Cliente: <br />
                  <span className="fw-bold text-info"> Ismael Santos</span>
                </span>
              </div>
            </div>

            <div className="fs-3 text-danger"><LuArrowRightCircle /></div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <div className="d-flex ">
              <div className=" text-light rounded-circle border-1 bg-success bg-opacity-50 p-3 m-3">
                <PiPiggyBank className="fs-1" />
              </div>
              <div className="lh-1 mt-2">
                <span className="fw-lighter text-black-50 fw-medium "> Préstamos</span>
                <h2 className="lh-1 mt-2">{formatNumber(4000)}</h2>
                <span className="fw-lighter  text-primary mt-0 ">
                  {" "}
                  Capital prestado
                  {/* <span className="fs-bold text-black">Ismael Santos</span> */}
                </span>
              </div>
            </div>

            <div className="fs-3 text-danger"><LuArrowRightCircle /></div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <div className="d-flex ">
            <div className=" text-light rounded-circle border-1 bg-warning bg-opacity-100 p-3 m-3">
                <BsExclamationLg className="fs-1" />
              </div>
              
              <div className="lh-1 mt-2">
                <span className="fw-lighter text-black-50 fw-medium"> Préstamos en Revisión</span>
                <h2 className="lh-1 mt-2">119</h2>
                <span className="fw-lighter text-black-50 mt-0">
                <i><IoIosArrowUp className="text-danger" /></i><span className="text-primary fw-semibold"> 50.00%</span> Precaucion
                  {/* <span className="fs-bold text-black">Ismael Santos</span> */}
                </span>
              </div>
            </div>

            <div className="fs-3 text-danger"><LuArrowRightCircle /></div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <div className="d-flex ">
            <div className=" text-light rounded-circle border-1 bg-danger bg-opacity-50 p-3 m-3">
                <TfiAlert className="fs-1" />
              </div>
              
              <div className="lh-1 mt-2">
                <span className="fw-lighter text-black-50 fw-medium"> Préstamos Vencidos</span>
                <h2 className="lh-1 mt-2">15</h2>
                <span className="fw-lighter text-black-50 mt-0">
                <i><IoIosArrowUp className="text-danger" /></i><span className="text-primary fw-semibold"> 50.00%</span> Precaucion
                  {/* <span className="fs-bold text-black">Ismael Santos</span> */}
                </span>
              </div>
            </div>

            <div className="fs-3 text-danger"><LuArrowRightCircle /></div>
          </div>
        </div>
      </div>

      {/* <div className="main-cards">
        <div className="card ">
          <div className="card-inner">
            <h5 className="text-white fw-lighter">Clientes</h5>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h4 className="fs-1 text-white">300</h4>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div> 
      </div> */}

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
