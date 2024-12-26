"use client";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adobeScript = `
    (function(d) {
      var config = {
        kitId: 'hmj6qkg',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,
      t=setTimeout(function(){
        h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";
      },config.scriptTimeout),
      tk=d.createElement("script"),
      f=false,
      s=d.getElementsByTagName("script")[0],
      a;
      h.className+=" wf-loading";
      tk.src='https://use.typekit.net/'+config.kitId+'.js';
      tk.async=true;
      tk.onload=tk.onreadystatechange=function(){
        a=this.readyState;
        if(f||a&&a!="complete"&&a!="loaded") return;
        f=true;
        clearTimeout(t);
        try{Typekit.load(config)}catch(e){}
      };
      s.parentNode.insertBefore(tk,s);
    })(document);
  `;

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: adobeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}