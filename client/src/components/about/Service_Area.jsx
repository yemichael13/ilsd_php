import React from "react";
import Service_Pic from "../../assets/images/service-area.png";

const Service_Area = () => {
    return (
        <div className="my-10">
            <h2 className="font-bold text-4xl text-center ">Service Area</h2>
            <div className="flex-col flex md:flex-row md:my-6 my-3 px-5 md:px-10 gap-6 justify-center items-center">
                <p className="md:w-1/3"><span className="font-bold">ILSD</span> operates across North Shewa Zone including Debre Birhan, Basona Werana, Angolela Tera, Kewet, and surrounding woredas.</p>
                <div className="md:border-l-2 p-4 border-black md:w-2/3 w-full">
                <img src={Service_Pic} alt="service-area" className=" rounded-2xl "/>
                </div>
                
            </div>
        </div>
    )
}

export default Service_Area;