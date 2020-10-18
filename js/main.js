/**
 * AJAX - Asynchronouns JavaScript And XML(JSON)
 */

let counter = 1;

const contentBox = document.querySelector("#content-box");
const btn = document.querySelector("#btn");

const renderLiEle = (ele, data) => `<${ele}>${data}</${ele}>`;

/**
 * Render Contents
 */
const renderHTML = (data) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    ip_address,
    country,
    phone,
  } = data;

  let htmlStr = "";

  // for (const item of data) {
  // htmlStr += `<p>Title: ${data.title}, Comment: ${data.comment}</p>`;
  // }

  htmlStr += `
    <p>
      <ul>
        <li>Name: ${firstName} ${lastName}</li>
        <li>Gender: ${gender}</li>
        <li>eMail: ${email}</li>
        <li>IP: ${ip_address}</li>
        <li>Contry: ${country}</li>
        <li>Phone: ${phone}</li>
      </ul>
    </p>`;

  contentBox.insertAdjacentHTML("beforeend", htmlStr);
  counter++;

  if (counter > 9) {
    btn.classList.add("hide-me");
  }
};

/**
 * Button Event Listener
 */
btn.addEventListener("click", () => {
  const xmlRequest = new XMLHttpRequest();

  xmlRequest.open("GET", `http://localhost:3000/people/${counter}`);

  xmlRequest.onload = () => {
    const { status, responseText } = xmlRequest;

    if (status >= 200 && status < 400) {
      const dataList = JSON.parse(responseText);

      console.log(dataList);

      return renderHTML(dataList);
    }

    console.log(
      "Connected to the server, but get something error from the response"
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

const createJSONArray = () => {
  const totalRows = 10;
  console.time("create json array");

  const arr = [];

  for (const key of Array(totalRows).keys()) {
    arr.push({
      id: key,
      firstName: chance.first(),
      lastName: chance.last(),
      gender: chance.gender(),
      email: chance.email({ domain: "gameil.com" }),
      ip_address: chance.ip(),
      country: chance.country({ full: true }),
      // city: chance.city(),
      phone: chance.phone({ mobile: true }),
    });
  }
  console.timeEnd("create json array");
  console.log(JSON.stringify(arr));
};

// createJSONArray();
