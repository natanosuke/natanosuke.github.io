     // サイドバーの末尾に広告を挿入
document.addEventListener("DOMContentLoaded", function () {
    const adCode = `
      <a>PR用</a><div class="ad-container" style="margin: 20px 0; text-align: center;">
      <a href="https://px.a8.net/svt/ejp?a8mat=3ZMEYE+3VBGC2+3XCC+6EER5" rel="nofollow">
      <img border="0" width="380" height="50" alt="" src="https://www24.a8.net/svt/bgt?aid=241230902234&wid=001&eno=01&mid=s00000018318001075000&mc=1"></a>
      <img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=3ZMEYE+3VBGC2+3XCC+6EER5" alt="">
      </div>
    `;
  
    
    const mainContent = document.querySelector('#yearly-profit');
    if (mainContent) {
      mainContent.insertAdjacentHTML('beforeend', adCode);
    }
    });
    
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
      const mainContent = document.querySelector('.sidebar-heading2');
      if (mainContent) {
        mainContent.insertAdjacentHTML('beforeend', adCode);
      }
    });