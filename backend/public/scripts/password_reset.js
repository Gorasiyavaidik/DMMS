document
  .getElementById("myForm")
  .addEventListener("submit", function (event, password) {
    event.preventDefault();
    var passwordInput = document.getElementById("new-password");
    var confirmPasswordInput = document.getElementById("aaa");
    var passwordError = document.getElementById("password-error");
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      const currentURL = window.location.href;
      const urlSearchParams = new URLSearchParams(new URL(currentURL).search);
      const newPassword = document.getElementById("new-password").value;
      const token = urlSearchParams.get("token");
      fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: newPassword, token: token }),
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
    }
  });
