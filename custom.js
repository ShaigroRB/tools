class TCopyButton extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM to the custom element
    this.attachShadow({ mode: "open" });

    // Define the template for the shadow DOM
    this.shadowRoot.innerHTML = `
    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/copy.css' rel='stylesheet'>
    <style>
    /* Style for the button within the shadow DOM */
    :root {
      --text-color: white;
      --background-color: black;
    }
    @media (prefers-color-scheme: dark) {
      --text-color: black;
      --background-color: white;
    }

    button {
      background: transparent;
      border: none;
      color: var(--text-color);
      width: 0.5rem;
      height: 0.5rem;
      cursor: pointer;
    }

    /* Style for the notification within the shadow DOM */
    .notification {
      display: none;
      color: var(--text-color);
      background-color: var(--background-color);
    }

    .hstack {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: baseline;
    }
  </style>
  <div class="hstack">
    <button class="copy-button" aria-label="Copy text"><i class="gg-copy"></i></button>
    <div class="notification">✅</div>
  </div>
`;
  }

  connectedCallback() {
    // Add a click event listener to the button
    this.shadowRoot
      .querySelector(".copy-button")
      .addEventListener("click", () => {
        // Get the target element based on the provided id
        const targetId = this.getAttribute("target-id");
        const targetElement = document.getElementById(targetId);

        // Copy the text content of the target element
        if (targetElement) {
          const valueToCopy =
            targetElement.tagName === "TEXTAREA"
              ? targetElement.value
              : targetElement.textContent;
          navigator.clipboard.writeText(valueToCopy).then(() => {
            // Display the notification
            this.shadowRoot.querySelector(".notification").style.display =
              "block";

            // Hide the notification after a short delay
            setTimeout(() => {
              this.shadowRoot.querySelector(".notification").style.display =
                "none";
            }, 2000); // 2000 milliseconds (2 seconds) delay
          });
        }
      });
  }

  disconnectedCallback() {
    // Clean up resources or perform actions when the element is disconnected
    this.shadowRoot
      .querySelector(".copy-button")
      .removeEventListener("click", this.copyText);
  }
}

customElements.define("t-copy", TCopyButton);
