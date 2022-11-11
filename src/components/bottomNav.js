import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const Menus = [
    { name: "Home", icon: "home-outline", dis: "translate-x-0", route: "/home" },
    { name: "Profile", icon: "bus-outline", dis: "translate-x-16", route: "routes" },
    { name: "Message", icon: "notifications-outline", dis: "translate-x-32", route: "/notification" },
    { name: "Photos", icon: "person-outline", dis: "translate-x-48", route: "/profile" },
  ];

  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    navigate(Menus[active].route);
    // eslint-disable-next-line
  }, [active])

  return (
    <div className={`fixed z-[1000] bottom-0 w-full `}>
      <div className="flex justify-center bg-backgroundprimary w-full ">
        <div className="bg-backgroundprimary max-h-[4.4rem] rounded-t-xl">
          <ul className="flex relative">
            <span
              className={`bg-themeprimary duration-500 ${Menus[active].dis} border-[3px] border-gray-800 h-16 w-16 absolute -top-5 rounded-full`}>
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
                    <ion-icon name={menu.icon} style={{ color: `${i === active ? "black" : "white"}` }}></ion-icon>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
