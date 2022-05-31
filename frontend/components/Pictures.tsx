interface PictureProps {
  image: string;
  imageraw?: string;
  caption: string;
  refresh: number;
  setRefresh: (i: number) => void;
}
interface PicturesWrapperProps {
  pictures: PictureProps[];
  isUpload?: boolean;
  refresh: number;
  setRefresh: (i: number) => void;
}
import picture from "../public/images/background.jpg";
import Image from "next/image";
import { EditIcon } from "../public/icons/Edit.icon";
import { useState } from "react";
import { ExitIcon } from "../public/icons/Exit.icon";
import { SuccesIcon } from "../public/icons/Success.icon";
import Button from "./Button";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { TrashIcon } from "../public/icons/Trash.icon";
export const PicturesWrapper: React.FC<PicturesWrapperProps> = ({
  pictures,
  isUpload = false,
  refresh,
  setRefresh,
}) => {
  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);

  const jwtCookie = getCookie("JWT");
  const [editable, setEditable] = useState(false);
  const deleteAllImages = async (image: string) => {
    if (!loading) {
      setLoading(true);
      if (image) {
        try {
          const res = await fetch("http://localhost:8000/remove-images", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtCookie,
            },
          }).then((t) => {
            if (t.status === 400) return null;
            return t.json();
          });
          if (res) {
            setRefresh(refresh + 1);
            router.push("/");
          } else setWrong(true);
        } catch (e) {
          router.push("/");
          setWrong(true);
        }
      }
      setLoading(false);
    }
  };
  if (!isUpload)
    return (
      <div className="flex flex-col gap-10 items-center">
        <Button
          type="primary"
          text="Delete All images"
          className="w-full"
          click={deleteAllImages}
        ></Button>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:pr-10">
          {pictures.map((picture) => {
            return (
              <PictureCard
                image={picture.image}
                caption={picture.caption}
                imageraw={picture.imageraw || ""}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            );
          })}
        </div>
      </div>
    );
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:pr-10">
      {pictures.map((picture) => {
        return (
          <PictureCardUpload
            image={picture.image}
            caption={picture.caption}
            imageraw={picture.imageraw || ""}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        );
      })}
    </div>
  );
};
export const PictureCard: React.FC<PictureProps> = ({
  image,
  caption,
  imageraw,
  refresh,
  setRefresh,
}) => {
  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);

  const jwtCookie = getCookie("JWT");
  const [editable, setEditable] = useState(false);
  const deleteImage = async (image: string) => {
    if (!loading) {
      setLoading(true);
      if (image) {
        try {
          const res = await fetch("http://localhost:8000/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtCookie,
            },
            body: JSON.stringify({
              "image-name": image,
            }),
          }).then((t) => {
            if (t.status === 400) return null;
            return t.json();
          });
          if (res) {
            setRefresh(refresh + 1);
            router.push("/");
          } else setWrong(true);
        } catch (e) {
          router.push("/");
          setWrong(true);
        }
      }
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl h-fit shadow-md text-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shodow-3xl">
      <div className="relative w-full h-[300px] overflow-hidden rounded-t-xl">
        <Image src={image} layout="fill" objectFit="cover" />
      </div>
      <div className="w-full p-10 flex flex-row justify-between items-start gap-2">
        {!editable && (
          <h1 className="w-5/6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ex, ea
            at quidem tenetur dicta cupiditate accusantium, ad iusto soluta{" "}
          </h1>
        )}
        {editable && (
          <textarea
            className="w-5/6 h-fit p-5 border border-1 "
            value={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ex, ea at quidem tenetur dicta cupiditate accusantium, ad iusto soluta "
            }
          />
        )}
        {!editable && (
          <div className="flex flex-col gap-4">
            <div onClick={() => setEditable(true)} className="cursor-pointer">
              <EditIcon className="w-6 stroke-gray-800" />
            </div>
            <div
              onClick={() => deleteImage(imageraw || "")}
              className="cursor-pointer"
            >
              <TrashIcon className="w-6 stroke-red-800" />
            </div>
          </div>
        )}
        {editable && (
          <div className="flex-col gap-4 flex justify-center">
            <div onClick={() => setEditable(false)} className="cursor-pointer">
              <SuccesIcon className="stroke-green-500" width="20" />
            </div>
            <div onClick={() => setEditable(false)} className="cursor-pointer">
              <ExitIcon className="stroke-red-500" width="20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export const PictureCardUpload: React.FC<PictureProps> = ({
  image,
  imageraw,
  caption,
}) => {
  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);

  const jwtCookie = getCookie("JWT");
  const clickHandler = async () => {
    if (!loading) {
      setLoading(true);
      if (image) {
        try {
          const res = await fetch("http://localhost:8000/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtCookie,
            },
            body: JSON.stringify({
              picture: imageraw,
            }),
          }).then((t) => {
            if (t.status === 400) return null;
            return t.json();
          });
          if (res) {
            router.push("/");
          } else setWrong(true);
        } catch (e) {
          router.push("/");
          setWrong(true);
        }
      }
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-5 bg-gray-800 z-30 flex justify-center items-center">
          <ReactLoading type="spin" color="#831843" height={667} width={375} />
        </div>
      )}
      <div className="bg-white rounded-xl h-fit shadow-md text-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shodow-3xl">
        <div className="relative w-full h-[300px] overflow-hidden rounded-t-xl">
          <Image src={image} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full p-5 flex flex-col justify-center items-center gap-5">
          <p>You can upload this picture</p>
          <Button
            type="primary"
            text="Upload"
            className="w-full"
            click={clickHandler}
          ></Button>
        </div>
      </div>
    </>
  );
};
