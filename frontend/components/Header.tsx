import { useRouter } from "next/router";
import Button from "./Button";

function Header() {
    const navigate = useRouter();
    /**
     * Navigate to search Route
     */
    const clickHandler = () => {
      navigate.push("/signup");
    };
    return (
      <div className="full-container head background-white">
        <div className="container">
          <div className="header flex flex-12 space-between p-10">
            <div className="content flex-3">
              <a href="/">
                <h1 className="header-1 p-5">INSTIFY</h1>
              </a>
            </div>
            <div className="content flex-4 flex none-small">
              <a href="https://github.com/Ali-Doggaz/PPP_GL3" target="_blank">
                <p className="link p-5 mr-10">Check our Github</p>
              </a>
            </div>
            <div className="content flex flex-4 space-around none-xsmall">
              <Button
                type="primary"
                text="Get started free"
                className="mr-10"
                click={clickHandler}
              ></Button>
              <a
                href="https://github.com/Ali-Doggaz/PPP_GL3/blob/master/README.md"
                target="_blank"
              >
                <Button
                  type="secondary"
                  text="Read more"
                  className="ml-10 none-small"
                ></Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;