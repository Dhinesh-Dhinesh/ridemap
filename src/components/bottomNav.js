import React, { useState } from "react";

const Navigation = () => {
  const Menus = [
    { name: "Home", icon: "home-outline", dis: "translate-x-0" },
    { name: "Profile", icon: "person-outline", dis: "translate-x-16" },
    { name: "Message", icon: "chatbubble-outline", dis: "translate-x-32" },
    { name: "Photos", icon: "camera-outline", dis: "translate-x-48" },
  ];
  const [active, setActive] = useState(0);
  return (
    // <div className="absolute -bottom-12">
      <div className="flex justify-center bg-gray-600 w-full ">
      <div className="bg-gray-600 max-h-[4.4rem] rounded-t-xl">
        <ul className="flex relative">
          <span
            className={`bg-[#AEF359] duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute
         -top-5 rounded-full`}
          >
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
            ></span>
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
            ></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              {/* eslint-disable-next-line  */}
              <a
                className="flex flex-col text-center pt-6"
                onClick={() => setActive(i)}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 ${i === active && "-mt-6 text-white"
                    }`}
                >
                  <ion-icon name={menu.icon}></ion-icon>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
