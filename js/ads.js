     // サイドバーの末尾に広告を挿入
document.addEventListener("DOMContentLoaded", function () {
    const adCode = `
      <br><a>PR用</a><div class="ad-container" style="margin: 20px 0; text-align: center;">
      <!-- TG-Affiliate Banner Space -->
      <a href="https://ad2.trafficgate.net/t/r/1176/738/313454_391312" target="_blank" rel="nofollow">
      <img src="https://srv2.trafficgate.net/t/b/1176/738/313454_391312" />
      </a>
      <!-- /TG-Affiliate Banner Space -->
      </div>
    
    `;
  
    
    const mainContent = document.querySelector('#monthly-archive');
    if (mainContent) {
      mainContent.insertAdjacentHTML('beforeend', adCode);
    }
    });
    
      // サイドバーの末尾に広告を挿入
document.addEventListener("DOMContentLoaded", function () {
    const adCode = `
      <hr><a><b>PR用</b></a><div class="ad-container" style="margin: 20px 0; text-align: center;">
      <a href="https://h.accesstrade.net/sp/cc?rk=0100p8ju00o8yg" rel="nofollow" referrerpolicy="no-referrer-when-downgrade"><img src="https://h.accesstrade.net/sp/rr?rk=0100p8ju00o8yg" alt="マネックス証券" border="0" /></a>
      </div>
    `;
      const mainContent = document.querySelector('.sidebar-heading2');
      if (mainContent) {
        mainContent.insertAdjacentHTML('beforeend', adCode);
      }
    });