import React, { useState } from "react";
import "../index.css";
import validUrl from "valid-url";
import axios from "axios";

function ShortenForm() {
  const [state, setState] = useState({ value: "", errorMsg: "" });

  async function checkErrors(value: string) {
    let errMsg = "";

    if (value.length > 0)
      if (!validUrl.isWebUri(value)) errMsg = "URL not properly formatted";

    return errMsg;
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.trim();
    let btn = document.querySelector(".search-btn") as HTMLInputElement;

    if (value.length > 0 && btn) {
      btn.style.opacity = "1";
      btn.style.transform = "rotate(0deg)";
    } else {
      btn.style.opacity = "0";
      btn.style.transform = "rotate(45deg)";
    }

    let errorMsg = await checkErrors(value);
    setState({ value: value, errorMsg: errorMsg });
  }

  function postForm(longUrl: string) {
    axios
      .post("/api/url/shorten", {
        longUrl: longUrl,
      })
      .then(function (response) {
        if (response.status === 200)
          window.location.href = "/link/" + response.data.urlCode;

        // display flash msg
        console.log(response);
      })
      .catch(function (error) {
        // display flash msg
        console.log(error);
      });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postForm(state.value);
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

export default ShortenForm;
