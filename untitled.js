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
    const captchaButton = document.querySelector("#captcha-button"); // Thay thế bằng selector thực sự của nút CAPTCHA
    const submitButton = document.querySelector("#submit-button"); // Đảm bảo đây là selector của nút gửi đúng
    
    // Chờ một khoảng thời gian nhất định để đảm bảo CAPTCHA đã tải xong
    setTimeout(() => {
      // Nhấn nút CAPTCHA nếu nó tồn tại
      if (captchaButton) {
        captchaButton.click();

        // Chờ thêm một chút trước khi gửi để cho CAPTCHA có thời gian xử lý
        setTimeout(() => {
          if (submitButton) {
            submitButton.click();
          }
        }, 1000); // Điều chỉnh thời gian này nếu cần
      }
    }, 10000); // Chờ 10 giây trước khi nhấn nút CAPTCHA
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
      "S666": "u054X8Ne",
      "88aa": "lJTF3tS8",
      "kuwin": "Bc5NgseU",
      "nhà cái 88aa": "PfAD4uGE",
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

    // ✅ Chỉ thay đổi chiến dịch nếu không có ảnh nào khớp
    if (!daTimThay) {
      if (btl) btl.click();
      location.reload();
    }

    // Gọi hàm để nhấn CAPTCHA và gửi nếu đã nhập mã
    if (daTimThay) {
      clickCaptchaAndSubmit();
    }
  });
})();
