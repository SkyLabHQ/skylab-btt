(()=>{"use strict";let e=null;self.addEventListener("message",(t=>{const{action:s,timeToCount:l}=t.data;let a=l;"start"===s?(self.postMessage(a),e=setInterval((()=>{a-=1e3,a<0&&(a=0),self.postMessage(a),0===a&&clearInterval(e)}),1e3)):"stop"===s&&null!==e&&(clearInterval(e),e=null)}))})();
//# sourceMappingURL=757.539f9da8.chunk.js.map