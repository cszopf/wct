
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SellerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellerAuthModal: React.FC<SellerAuthModalProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const isPermitted = (originUrl: string, whitelisted_domains: string[]) => {
      const url = document.createElement('a');
      url.href = originUrl;
      const hostname = url.hostname;
      let result = false;
      if (typeof hostname !== 'undefined') {
        whitelisted_domains.forEach((element) => {
          if (hostname.slice((-1 * element.length - 1)) === '.'.concat(element) || hostname === element) {
            result = true;
          }
        });
      }
      return result;
    };

    const handleIFrameMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object') { return; }
      const args = e.data.split(":");
      const iframe = iframeRef.current;
      if (!iframe) return;

      switch (args[0]) {
        case "scrollIntoView":
          iframe.scrollIntoView();
          break;
        case "setHeight":
          iframe.style.height = args[1] + "px";
          break;
        case "collapseErrorPage":
          if (iframe.clientHeight > window.innerHeight) {
            iframe.style.height = window.innerHeight + "px";
          }
          break;
        case "reloadPage":
          window.location.reload();
          break;
        case "loadScript":
          if (!isPermitted(e.origin, ['jotform.com', 'jotform.pro'])) { break; }
          let scriptSrc = args[1];
          if (args.length > 3) {
            scriptSrc = args[1] + ':' + args[2];
          }
          const script = document.createElement('script');
          script.src = scriptSrc;
          script.type = 'text/javascript';
          document.body.appendChild(script);
          break;
        case "exitFullscreen":
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
          break;
      }
      
      const isJotForm = (e.origin.indexOf("jotform") > -1);
      if (isJotForm && iframe.contentWindow) {
        const urls = { "docurl": encodeURIComponent(document.URL), "referrer": encodeURIComponent(document.referrer) };
        iframe.contentWindow.postMessage(JSON.stringify({ "type": "urls", "value": urls }), "*");
      }
    };

    window.addEventListener("message", handleIFrameMessage, false);
    
    // Handle initial params
    if (iframeRef.current) {
      const ifr = iframeRef.current;
      let src = ifr.src;
      let iframeParams: string[] = [];
      if (window.location.href && window.location.href.indexOf("?") > -1) {
        iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
      }
      if (src && src.indexOf("?") > -1) {
        iframeParams = iframeParams.concat(src.substr(src.indexOf("?") + 1).split("&"));
        src = src.substr(0, src.indexOf("?"));
      }
      iframeParams.push("isIframeEmbed=1");
      ifr.src = src + "?" + iframeParams.join('&');
    }

    return () => window.removeEventListener("message", handleIFrameMessage);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl h-full md:h-[90vh] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-6 lg:p-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-xl lg:text-2xl font-header font-black text-[#004EA8]">Seller Authorization</h3>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow relative overflow-y-auto bg-slate-50">
          <iframe
            ref={iframeRef}
            id="JotFormIFrame-212305251974048"
            title="Seller Authorization"
            onLoad={() => window.parent.scrollTo(0,0)}
            allowTransparency={true}
            allowFullScreen={true}
            allow="geolocation; microphone; camera"
            src="https://form.jotform.com/cszopf/seller-authorization"
            frameBorder="0"
            style={{
              minWidth: '100%',
              height: '539px',
              border: 'none'
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerAuthModal;
