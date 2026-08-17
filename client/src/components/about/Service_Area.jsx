import React from "react";
import Service_Pic from "../../assets/images/service-area.png";
import { useTranslation } from 'react-i18next';

const Service_Area = () => {
    const { t } = useTranslation();

    return (
        <div className="my-10">
            <h2 className="font-bold text-4xl text-center ">{t('about.serviceArea.title')}</h2>
            <div className="flex-col flex md:flex-row md:my-6 my-3 px-5 md:px-10 gap-6 justify-center items-center">
                <p className="md:w-1/3">{t('about.serviceArea.description')}</p>
                <div className="md:border-l-2 p-4 border-black md:w-2/3 w-full">
                <img src={Service_Pic} alt="service-area" className=" rounded-2xl "/>
                </div>
            </div>
        </div>
    )
}

export default Service_Area;