const form = document.getElementById("kontakt-formular");

form.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  // erstellt ein formData Objekt
  const myFormData = new FormData(e.target);

  // wandelt formData in ein benutzbares object aus einträgen
  const formDataObj = Object.fromEntries(myFormData.entries());

  // wenn alle erfüllt sind dann schicke daten zum server

  // Hier ist Client Validierung!

  const nameIsTrue = onlyLettersSpaces(formDataObj.firstName);

  if (!nameIsTrue) {
    window.alert(
      "Dein Vorname enthält andere Zeichen als nur Buchstaben. Bitte ändern!"
    );
    return;
  }

  const lastNameIsTrue = onlyLettersSpaces(formDataObj.lastName);

  if (!lastNameIsTrue) {
    window.alert(
      "Dein Nachname enthält andere Zeichen als nur Buchstaben. Bitte ändern!"
    );
    return;
  }

  const messageIsTrue = validateMessage(formDataObj.message);

  if (!messageIsTrue) {
    window.alert("Deine Nachricht ist länger als 200 Zeichen. Bitte ändern!");
    return;
  }

  // wenn alles validiert --> schicke alle daten an den server
  fetch("http://localhost:3000/form-validation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: formDataObj.firstName,
      lastName: formDataObj.lastName,
      email: formDataObj.email,
      message: formDataObj.message,
      requestType: formDataObj.reason,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((e) => console.log(e));

  console.log(formDataObj);
}

// validate functions
function onlyLettersSpaces(str) {
  if (/^[a-zA-Z\\s]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  if (email.includes("@")) {
    return true;
  } else {
    return false;
  }
}

function validateMessage(message) {
  if (message.length <= 200) {
    return true;
  } else {
    return false;
  }
}

function validateRequestType(type) {
  //type: "priceRequest", "offer", "other"
  // const acceptedRequests = ["priceRequest", "offer", "other"]
  // return acceptedRequests.includes(type)
  if (type === "priceRequest" || type === "offer" || type === "other") {
    return true;
  } else {
    return false;
  }
}
