const form = document.forms[0];
const apiUrl = "https://5fff-152-169-246-103.ngrok.io";

window.addEventListener("load", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetchApiProfile(`${apiUrl}/profile`);
    form.reset();
  });
});

async function fetchApiProfile(url) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getPayload()),
  };

  try {
    const response = await fetch(url, settings);
    if (!response.ok) {
      throw new Error("FAILED");
    }
    const data = await response.json();
    console.log(`Success: ${data}`);
    Swal.fire({
      icon: "success",
      title: `Woohoo! You're done\n`,
      showConfirmButton: false,
      timer: 1500,
    });
    return data;
  } catch {
    Swal.fire({
      icon: "error",
      title: `Oops! Something went wrong\n`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function getPayload() {
  const apiKey = document.querySelector("#apikey");
  const apiSecret = document.querySelector("#apisecret");
  const email = document.querySelector("#email");
  const tgmId = document.querySelector("#tgmId");

  const payload = {
    email: email.value,
    api_key: apiKey.value,
    api_secret: apiSecret.value,
    tgm_chat_id: tgmId.value,
  };
  return payload;
}
