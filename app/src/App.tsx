import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import "./index.css";
import validUrl from "valid-url";
import axios from "axios";

function Toggler() {
  const [state, setState] = useState({ isDarkMode: false });

  useEffect(() => {
    let darkThemeSelected =
      localStorage.getItem("themeSwitch") !== null &&
      localStorage.getItem("themeSwitch") === "dark";
    let checkbox = document.querySelector(
      "input[name=theme]"
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = darkThemeSelected;

    darkThemeSelected
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.removeAttribute("data-theme");
  });

  let transitionTheme = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 750);
  };

  function handleToggler() {
    setState({ isDarkMode: !state.isDarkMode });

    if (state.isDarkMode) {
      transitionTheme();
      localStorage.setItem("themeSwitch", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      transitionTheme();
      localStorage.removeItem("themeSwitch");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  return (
    <div className="toggle-container">
      <input
        onChange={handleToggler}
        type="checkbox"
        id="toggler"
        name="theme"
      />
      <label htmlFor="toggler">Toggle</label>
    </div>
  );
}

function ShortenForm() {
  const [state, setState] = useState({ value: "", errorMsg: "" });

  function checkErrors() {
    let errMsg = "";
    let value = state.value.trim();

    // PROPER URL VALIDATION HERE
    if (!validUrl.isWebUri(value)) errMsg = "URL not properly formatted";

    return errMsg;
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    //can handle input validation here too

    let value = e.target.value;
    let btn = document.querySelector(".search-btn") as HTMLInputElement;

    if (value.length > 0 && btn) {
      btn.style.opacity = "1";
      btn.style.transform = "rotate(0deg)";
    } else {
      btn.style.opacity = "0";
      btn.style.transform = "rotate(45deg)";
    }

    setState({ value: e.target.value, errorMsg: checkErrors() });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let value = state.value;

    axios
      .post("/api/url/shorten", {
        longUrl: value,
      })
      .then(function (response) {
        window.location.href = "/link/" + response.data.urlCode;
        //redirect to link and pass data
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="hero-text">
        <h1 className="heroAnim">Dead simple URL shortener</h1>
        <h2 className="heroAnim">Copy and paste your link below</h2>
      </div>

      <h1>{state.errorMsg}</h1>
      <div className="form-wrapper">
        <form
          method="POST"
          action="/"
          onSubmit={handleSubmit}
          className="shorten-form"
        >
          <input
            onChange={handleInput}
            name="longUrl"
            type="text"
            className="search-txt"
            placeholder="Your link here..."
            value={state.value}
            required
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-arrow fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </>
  );
}

function HomeBtn() {
  return (
    <form action="/">
      <button className="btn-404">
        <i className="fas fa-home fa-2x" aria-hidden="true"></i>
      </button>
    </form>
  );
}

function NotFound() {
  return (
    <>
      <h1 className="not-found">404</h1>
      <HomeBtn></HomeBtn>
    </>
  );
}

interface UrlType {
  id: string;
}

interface UrlObject {
  _id: string;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type CardProps = {
  id: string;
  longUrl: string;
  shortUrl: string;
};

function Shortened({ id, longUrl, shortUrl }: CardProps) {
  function handleClipboard(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    let toCopy = document.querySelector("#clipper") as HTMLInputElement;
    let value = toCopy.value;
    let tooltip = document.querySelector(".tooltiptext");

    if (tooltip && !tooltip.classList.contains("tooltip-visible")) {
      tooltip.classList.add("tooltipAnim");
      tooltip.classList.add("tooltip-visible");
      setTimeout(() => {
        if (tooltip) {
          tooltip.classList.remove("tooltip-visible");
          tooltip.classList.remove("tooltipAnim");
        }
      }, 1000);
    }

    copyClipboard(value);
  }

  function copyClipboard(value: string) {
    let tempInput = document.createElement("input");
    tempInput.value = value;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  return (
    <div className="url-container">
      <div className="clipboard-wrapper">
        <div className="tooltip">
          <h2 data-clipboard="" onClick={handleClipboard}>
            Copy to clipboard
          </h2>
          <a data-clipboard="" onClick={handleClipboard} href="./#">
            <i className="fas fa-copy"></i>
          </a>

          <span className="tooltiptext">Copied!</span>
        </div>
      </div>
      <a
        target="_blank"
        href={longUrl}
        rel="noopener noreferrer"
        className="shortened-link heroAnim"
      >
        xs-url.fr/{id}
      </a>
      <input type="hidden" value={"http://" + shortUrl} id="clipper" />

      <HomeBtn></HomeBtn>
    </div>
  );
}

function FetchShortened() {
  const [state, setState] = useState<UrlObject>({
    _id: "",
    longUrl: "",
    shortUrl: "",
    urlCode: "",
    date: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  let { id } = useParams<UrlType>();

  useEffect(() => {
    async function axiosTest() {
      try {
        let url = "/api/url/" + id;
        const response = await axios.get(url);

        setState(response.data);
      } catch (err) {
        window.location.href = "/";
      }
    }
    axiosTest();
  }, [id]);

  return state._id.length ? (
    <Shortened
      id={state._id}
      longUrl={state.longUrl}
      shortUrl={state.shortUrl}
    />
  ) : (
    <div className="hero-text">
      <h1 className="">Loading...</h1>
    </div>
  );
}

function ShortenRoute() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/:id`}>
        <FetchShortened></FetchShortened>
      </Route>
      <Route path={match.path}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

// function RedirectTo() {
//   const [state, setState] = useState<UrlObject>({
//     _id: "",
//     longUrl: "",
//     shortUrl: "",
//     urlCode: "",
//     date: "",
//     createdAt: "",
//     updatedAt: "",
//     __v: 0,
//   });
//   let { id } = useParams<UrlType>();

//   useEffect(() => {
//     async function axiosTest() {
//       try {
//         let url = "/api/url/" + id;
//         const response = await axios.get(url);

//         setState(response.data);
//       } catch (err) {
//         window.location.href = "/";
//       }
//     }
//     axiosTest();
//   }, [id]);

//   let Url = "/api/url/" + state._id;

//   return state._id.length ? (
//     <Route path="/">
//       <Redirect to={Url} />
//     </Route>
//   ) : (
//     <div className="hero-text">
//       <h1 className="">Redirecting...</h1>
//     </div>
//   );
// }

// function RedirectRoute() {
//   let match = useRouteMatch();

//   return (
//     <Switch>
//       <Route exact path={`${match.url}/:id`}>
//         <RedirectTo></RedirectTo>
//       </Route>
//       <Route path={match.path}>
//         <Redirect to="/" />
//       </Route>
//     </Switch>
//   );
// }

//  <Route path="/:id">
//    <RedirectRoute></RedirectRoute>
//  </Route>;

class App extends Component {
  render() {
    return (
      <Router>
        <Toggler></Toggler>
        <div className="container">
          <Switch>
            <Route path="/link/">
              <ShortenRoute></ShortenRoute>
            </Route>

            <Route exact path="/">
              <ShortenForm></ShortenForm>
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>

        <footer className="invert">
          <p className="footer-text">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.ablin.dev"
            >
              @ablin42
            </a>
          </p>
        </footer>
      </Router>
    );
  }
}

export default App;

/*
	const [state, setState] = useState<UrlObject>({
		id: "",
		longUrl: "",
		shortUrl: "",
		urlCode: "",
		date: "",
		createdAt: "",
		updatedAt: "",
		__v: 0
	});
	let { id } = useParams<UrlType>();

	useEffect(() => {
		async function axiosTest() {
			try {
				let url = "/api/url/" + id;
				const response = await axios.get(url);

				setState(response.data);
			} catch (err) {
				//window.location.href = "/";
				console.log(err);
			}
		}

		axiosTest();
	}, [id]);*/

/*
const PageDisplayed: React.FC<pageProp> = (prop) => {
  const [state, setState] = useState({
    heroValues: ["Dead simple URL shortener", "Copy and paste your link below"],
    isUrl: prop.isUrl,
  });

  function handlePage() {
    if (state.isUrl) {
      setState({
        heroValues: ["Copy to clipboard", "http://url"], //
        isUrl: !state.isUrl,
      });
      return (
        <form action="/">
          <button className="btn-404">
            <i className="fas fa-home fa-2x" aria-hidden="true"></i>
          </button>
        </form>
      );
    }
    return (
      <Route exact path="/">
        <ShortenForm></ShortenForm>
      </Route>
    );
  }
  let result = handlePage();

  console.log(result);
  return (
    <div className="container">
      <HeroText heroValues={state.heroValues}></HeroText>
      <div className="form-wrapper">{result}</div>
    </div>
  );
};*/
//<PageDisplayed isUrl={true}></PageDisplayed>
