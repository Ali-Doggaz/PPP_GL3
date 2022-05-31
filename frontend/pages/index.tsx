import { Button, Checkbox, Input } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  RadialBar,
  RadialBarChart,
  Tooltip,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  FormChangeAccount,
  FormDownload,
  FormFake,
  FormUpload,
} from "../components/Forms";
import Menu from "../components/Menu";
import { PicturesWrapper } from "../components/Pictures";
import { Stats } from "../components/Stats";
import { Submenu } from "../components/Submenu";
import { Toast } from "../components/Toast";
export interface SubmenuProps {
  elements: { title: string }[];
}
export interface MenuProps {
  elements: {
    title: string;
    subMenu: SubmenuProps;
  }[];
}
const Index: NextPage = () => {
  const subMenus: SubmenuProps = {
    elements: [
      {
        title:
          "Like, Follow and DM automatically , to make your account better placed in instagram Algorithm",
      },
      { title: "Upload a picture from the database with its caption" },
      { title: "Change Account" },
    ],
  };
  const subMenus2: SubmenuProps = {
    elements: [
      { title: "Download Pictures" },
      { title: "Manage Database & Captions" },
    ],
  };

  const menu: MenuProps = {
    elements: [
      {
        title: "Manage Account",
        subMenu: subMenus,
      },
      {
        title: "Manage Pictures",
        subMenu: subMenus2,
      },
    ],
  };
  const [active, setActive] = useState(menu.elements.map(() => false));
  const clickHandler = (i: number) => {
    setActive(
      active.map((_value: any, index: number) => {
        if (index === i) return true;
        else return false;
      })
    );
    setActiveSub(menu.elements[i].subMenu.elements.map(() => false));
  };
  const [activeSub, setActiveSub] = useState(
    menu.elements[0].subMenu.elements.map(() => false)
  );
  const clickHandlerSub = (i: number) => {
    setActiveSub(
      activeSub.map((_value: any, index: number) => {
        if (index === i) return true;
        else return false;
      })
    );
  };
  const [show, setShow] = useState(false);
  const jwtCookie = getCookie("JWT");
  const [pictures, setPictures] = useState();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetch("http://localhost:8000/pictures", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtCookie,
          },
        }).then((t) => t.json());
        const auth = await fetch("http://localhost:8000/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtCookie,
          },
        }).then((t) => t.json());
        setPictures(
          res.map((el: any) => {
            return {
              image:
                "http://localhost:8000/static/" +
                auth.user.id +
                "/images/" +
                el,
              imageraw: el,
              caption:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ex, ea at quidem tenetur dicta cupiditate accusantium, ad iusto soluta",
            };
          })
        );
      } catch (e) {}
    };
    data().catch(console.error);
  }, [refresh]);
  return (
    <div className="bg-gray-50 w-full min-h-screen flex flex-col md:flex-row gap-10 items-center md:items-start justify-center md:justify-start">
      <Toast setShow={setShow} show={show} />
      <div className="md:sticky top-0 left-0 w-fit m-0 shrink-0">
        <Menu menu={menu} clickHandler={clickHandler} active={active} />
      </div>
      {active.findIndex((el) => el === true) !== -1 && (
        <div className="flex flex-col gap-10 grow justify-start items-start">
          <div className="w-fit m-0 flex md:flex-row flex-col-reverse flex-stretch gap-10">
            <Submenu
              submenu={
                menu.elements[active.findIndex((el) => el === true)].subMenu
              }
              clickHandler={clickHandlerSub}
              active={activeSub}
            />
            <div className="flex h-full justify-center items-center">
              <Stats />
            </div>
          </div>
          {active[0] && activeSub[0] && (
            <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3 mb-10">
              <FormFake />
            </div>
          )}
          {active[0] && activeSub[1] && (
            <div className="w-full p-3 grow">
              <FormUpload />
            </div>
          )}
          {active[0] && activeSub[2] && (
            <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3 mb-10">
              <FormChangeAccount />
            </div>
          )}
          {active[1] && activeSub[0] && (
            <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3 mb-10">
              <FormDownload refresh={refresh} setRefresh={setRefresh} />
            </div>
          )}
          {active[1] && activeSub[1] && (
            <div className="w-full p-3 grow">
              <PicturesWrapper
                pictures={pictures || []}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
