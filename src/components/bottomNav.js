import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomContext } from "../context/BottomContext";

import { getDoc, doc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/firebase';

const Navigation = () => {
  const Menus = [
    { name: "Home", icon: "home-outline", dis: "translate-x-0", route: "/home" },
    { name: "Bus", icon: "bus-outline", dis: "translate-x-16", route: "routes" },
    { name: "Notification", icon: "notifications-outline", dis: "translate-x-32", route: "/notification" },
    { name: "Profile", icon: "person-outline", dis: "translate-x-48", route: "/profile" },
  ];

  const bottomCont = useContext(BottomContext);

  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isNotification, setIsNotification] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/routes" || "/profile") {
      async function notify() {
        const uid = sessionStorage.getItem('uid');
        const notify_status = doc(firestoreDB, `users/${uid}`)

        try {
          await getDoc(notify_status).then((doc) => {
            if (doc.exists()) {
              setIsNotification(doc.data().notf_read);
            }
          })
        } catch (e) {
          return null
        }
      }
      notify();
    }
  }, [location])

  useEffect(() => {
    navigate(Menus[active].route);
    // eslint-disable-next-line
  }, [active])



  return (
    <div className={`fixed z-[100000] bottom-0 w-full ${bottomCont.isDrawerOpen ? "hidden" : ""}`}>
      <div className="flex justify-center bg-backgroundprimary w-full ">
        <div className="bg-backgroundprimary max-h-[4.4rem] rounded-t-xl">
          <ul className="flex relative">
            {isNotification && <p className="bg-red-500 w-2 h-2 rounded-full absolute -right-[-5rem] top-4">&nbsp;</p>}
            <span
              className={`bg-themeprimary duration-500 ${Menus[active].dis} border-[3px] border-gray-800 h-16 w-16 absolute -top-5 rounded-full before:absolute`}>
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
