import blue from "../public/images/blue.png";
import Button from "../components/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../components/Header";

function Landing() {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="App">
        <div className="container flex-12 flex h-100 wrap">
          <div className="content flex flex-6 column flex-start p-10 max-w-[700px]">
            <h1 className="title text-left" data-testid="landing-title">
              Social Media Manager
            </h1>
            <p className="paragraph" data-testid="landing-paragraph">
              The purpose of this project is to completely automatise an
              Instagram account, meaning that this script will take care of all
              the activity related to your account. The only thing the user has
              to do is to give the 'theme' of his account (I.e : your account
              could be about food, cars, modelling, sports/coaching, etc...)
            </p>
            <div className="content flex flex-start p-0 mt-10">
              <div
                onClick={() => {
                  router.push("/signup");
                }}
              >
                <Button
                  type="primary"
                  text="Get started free"
                  className="mr-10"
                ></Button>
              </div>
              <a
                href="https://github.com/Dopeamin/github-repositories-fetch/blob/master/README.md"
                target="_blank"
              >
                <Button
                  type="secondary"
                  text="Read more"
                  className="ml-10"
                ></Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
