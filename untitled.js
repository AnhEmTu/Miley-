(function () {
  'use strict';
  
  function nhapma(ma) {
    const input = document.querySelector("input[name='code']");
    if (input) {
      input.value = ma;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  function clickCaptchaAndSubmit() {
    const captchaButton = document.querySelector("#captcha-button"); // Replace with your actual CAPTCHA button selector
    const submitButton = document.querySelector("#submit-button"); // Ensure this is the correct submit button selector
    
    // Click the CAPTCHA button
    if (captchaButton) {
      captchaButton.click();
    }

    // Click the submit button after a short delay to allow the CAPTCHA to process
    setTimeout(() => {
      if (submitButton) {
        submitButton.click();
      }
    }, 1000); // Adjust time as necessary
  }

  window.addEventListener("load", () => {
    const btt = document.querySelector("#submit-button");
    const btt2 = document.querySelector("button#submit");
    const btl = document.querySelector("#changeCampaignButton");
    const btxn = document.querySelector("button.submit-button");
    
    if (location.href.includes("/api-mode/")) {
      const waitAndClick = setInterval(() => {
        if (btt) {
          btt.click();
          clearInterval(waitAndClick);
        }
      }, 300);
    }

    const loi = document.body.textContent.includes("Mã xác nhận sai rồi");
    if (loi) {
      if (btl) btl.click();
      location.reload();
    }
    
    let daTimThay = false;

    const danhSachMa = {
      "https://www.persiancarpet.uk.com/": "4usiXKdg",
      "https://vtiger.com.co/": "KxXdq7Nw",
      "https://www.camilodiaz.com.co/": "W3wuZnNb",
      "https://i-88aa.com/": "E4apsxJP",
    };

    for (const [tenAnh, ma] of Object.entries(danhSachMa)) {
      if (document.querySelector(`img[src*='${tenAnh}']`)) {
        nhapma(ma);
        if (btxn) btxn.click();
        daTimThay = true;
        break;
      }
    }

    const waitingText = document.querySelector("h3");
    if (waitingText && waitingText.textContent.includes("Vui Lòng Chờ Để Tiếp Tục")) {
      const interval = setInterval(() => {
        if (btt) btt.click();
        if (btt2) btt2.click();
      }, 1000);
      return;
    }
    if (waitingText && waitingText.textContent.includes("Bước cuối cùng rồi")) {
      const interval = setInterval(() => {
        if (btt) btt.click();
      }, 1000);
      return;
    }

    // ✅ Only change the campaign if no images matched
    if (!daTimThay) {
      if (btl) btl.click();
      location.reload();
    }

    // Call the function to click CAPTCHA and submit if a code was entered
    if (daTimThay) {
      clickCaptchaAndSubmit();
    }
  });
})();
