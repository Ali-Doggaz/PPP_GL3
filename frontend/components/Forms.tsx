import { Checkbox, Button } from "@nextui-org/react";
import { getCookie, getCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { PicturesWrapper } from "./Pictures";
import { Toast } from "./Toast";
export const FormFake = () => {
  const [tagss, setTags] = useState("");
  const [max_likes, setLikes] = useState(0);
  const [follows, setFollows] = useState(0);

  const [max_follows, setMaxFollows] = useState(0);
  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    const tags = tagss.split(",");

    const jwtCookie = getCookie("JWT");
    if (!loading) {
      setLoading(true);
      if (tags && max_likes && follows && max_follows) {
        try {
          const res = await fetch("http://localhost:8000/likephoto", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtCookie,
            },
            body: JSON.stringify({
              tags,
              "max-likes": max_likes,
              follows,
              "max-follows": max_follows,
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
      <Toast
        setShow={() => {
          setWrong(false);
        }}
        show={wrong}
      />
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-5 bg-gray-800 z-30 flex justify-center items-center">
          <ReactLoading type="spin" color="#831843" height={667} width={375} />
        </div>
      )}
      <form className="flex flex-col gap-4">
        <label className="text-base">
          Tags you wish to explore, separated by a ','
        </label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="text"
          onChange={(event) => {
            setTags(event.target.value);
          }}
        />
        <label className="text-base">Number of Likes</label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="number"
          onChange={(event) => {
            setLikes(parseInt(event.target.value));
          }}
        />
        <label className="text-base">Maximum Number of follows</label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="number"
          onChange={(event) => {
            setMaxFollows(parseInt(event.target.value));
          }}
        />
        <label className="text-base">Number of follows</label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="number"
          onChange={(event) => {
            setFollows(parseInt(event.target.value));
          }}
        />
        {/*       <Checkbox defaultChecked={true} size="sm" color="error">
        <p className="text-base">DM People (Doesnt DM the same person twice)</p>
      </Checkbox>
      <Checkbox size="sm" color="error">
        <p className="text-base">Show Whats going on during the process</p>
      </Checkbox> */}
        <p className="text-base">
          PS : To avoid being detected as a bot the app will pause for a bit
          between each like/follow
        </p>
        <Button className="bg-pink-600 mt-3" onClick={onSubmit}>
          Run
        </Button>
      </form>
    </>
  );
};
export const FormUpload = () => {
  const jwtCookie = getCookie("JWT");
  const [pictures, setPictures] = useState();
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
  }, []);
  return <PicturesWrapper isUpload={true} pictures={pictures || []} />;
};
export const FormDownload = () => {
  const [subredit_name, setSubreditName] = useState("");
  const [number, setNumber] = useState(0);

  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    const jwtCookie = getCookie("JWT");

    if (!loading) {
      setLoading(true);
      if (subredit_name && number) {
        try {
          const res = await fetch("http://localhost:8000/download", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtCookie,
            },
            body: JSON.stringify({
              subreddit_name: subredit_name,
              number,
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
      <Toast
        setShow={() => {
          setWrong(false);
        }}
        show={wrong}
      />
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-5 bg-gray-800 z-30 flex justify-center items-center">
          <ReactLoading type="spin" color="#831843" height={667} width={375} />
        </div>
      )}
      <form className="flex flex-col gap-4">
        <label className="text-base">
          Please enter a subreddit's name or a theme's name
        </label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="text"
          onChange={(event) => {
            setSubreditName(event.target.value);
          }}
        />

        <label className="text-base">Number of pictures to download</label>
        <input
          className="py-2 px-4 w-full border rounded-lg"
          type="number"
          onChange={(event) => {
            setNumber(parseInt(event.target.value));
          }}
        />
        <Button className="bg-pink-600 mt-3" onClick={onSubmit}>
          Download
        </Button>
      </form>
    </>
  );
};
export const FormChangeAccount = () => {
  return (
    <form className="flex flex-col gap-4">
      <label className="text-base">Username</label>
      <input className="py-2 px-4 w-full border rounded-lg" type="text" />

      <label className="text-base">Password</label>
      <input className="py-2 px-4 w-full border rounded-lg" type="password" />
      <Button className="bg-pink-600 mt-3">Change Account</Button>
    </form>
  );
};
