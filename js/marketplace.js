document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Smart Thermostat",
      price: 99.99,
      description:
        "High-quality smart thermostat with a digital display for efficient home temperature control.",
      image: "../images/smart_thermostat.jpeg",
    },
    {
      id: 2,
      name: "Smart Light Bulb",
      price: 19.99,
      description:
        "Stylish and modern smart light bulb with adjustable brightness and color settings.",
      image: "../images/smart_light_bulb.jpeg",
    },
    {
      id: 3,
      name: "Smart Door Lock",
      price: 149.99,
      description:
        "Secure smart door lock with a keypad and fingerprint sensor for enhanced security.",
      image: "../images/smart_door_lock.jpeg",
    },
    {
      id: 4,
      name: "Smart Security Camera",
      price: 79.99,
      description:
        "Compact and stylish smart security camera with night vision and motion detection.",
      image: "../images/smart_security_camera.jpeg",
    },
    {
      id: 5,
      name: "Smart Plug",
      price: 14.99,
      description:
        "Minimalistic smart plug that can be controlled via a smartphone app for convenient power management.",
      image: "../images/smart_plug.jpeg",
    },
    {
      id: 6,
      name: "Smart Speaker",
      price: 49.99,
      description:
        "High-quality smart speaker with voice assistant capability and modern design.",
      image: "../images/smart_speaker.jpeg",
    },
    {
      id: 7,
      name: "Smart Smoke Detector",
      price: 39.99,
      description:
        "Sleek smart smoke detector with carbon monoxide detection and smartphone alerts for enhanced safety.",
      image: "../images/smart_smoke_detector.jpeg",
    },
  ];


  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>$${product.price}</p>
          <a href="product.html?id=${product.id}">View Details</a>
      `;
    productList.appendChild(productDiv);
  });
});
