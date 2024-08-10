document
  .getElementById("myForm")
  .addEventListener("submit", function (event, password) {
    event.preventDefault();
    const currentURL = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(currentURL).search);
    const newPassword = document.getElementById("new-password").value;
    const token = urlSearchParams.get("token");

    fetch("/api/user/reset-loginpin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newLoginPin: newPassword, token: token }),
    })
      .then((response) => response.json()) // Assuming the server returns JSON
      .then((data) => {
     
        if (data.status == "success") {
          document.getElementById("myForm").style.display = "none";
          document.getElementById("fgpass").innerHTML = "Thank you";
          document.getElementById("image_chotu").style.display = "none";
          document.getElementById("message_id").innerText = data.message;
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
  });
