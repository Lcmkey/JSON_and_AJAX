/**
 * AJAX - Asynchronouns JavaScript And XML(JSON)
 */

let counter = 1;

const contentBox = document.querySelector("#content-box");
const btn = document.querySelector("#btn");

/**
 * Render Contents
 */
const renderHTML = (data) => {
  let htmlStr = "";

  // for (const item of data) {
  htmlStr += `<p>Title: ${data.title}, Comment: ${data.comment}</p>`;
  // }

  contentBox.insertAdjacentHTML("beforeend", htmlStr);
  counter++;

  if (counter > 3) {
    btn.classList.add("hide-me");
  }
};

/**
 * Button Event Listener
 */
btn.addEventListener("click", () => {
  const xmlRequest = new XMLHttpRequest();

  xmlRequest.open("GET", `http://localhost:3000/post/${counter}`);

  xmlRequest.onload = () => {
    const { status, responseText } = xmlRequest;

    if (status >= 200 && status < 400) {
      const dataList = JSON.parse(responseText);

      console.log(dataList);

      return renderHTML(dataList);
    }

    console.log(
      "Connected to the server, but get something error from the response",
    );
  };

  /**
   * Error Handle
   */
  xmlRequest.onerror = () => {
    console.log("Something Error");
  };

  xmlRequest.send();
});
