"use client";

import Script from "next/script";

type AffiliatePlacement = "top" | "middle" | "bottom";

const POPUNDER_SRC = "https://pl30522471.effectivecpmnetwork.com/08/a7/b3/08a7b3f0cce101895f49a8f35ccc60f2.js";
const NATIVE_BANNER_SRC = "https://pl30522472.effectivecpmnetwork.com/59319a840c40afc97fc5f31ef6d61794/invoke.js";
const NATIVE_CONTAINER_ID = "container-59319a840c40afc97fc5f31ef6d61794";

const BANNER_UNITS = {
  desktop: {
    key: "61b8666f574551e5dcb3b680f7e984c3",
    width: 728,
    height: 90,
  },
  mobile: {
    key: "ef7606bb9bcd945430912b364a854fee",
    width: 320,
    height: 50,
  },
} as const;

function bannerDocument(unit: typeof BANNER_UNITS.desktop | typeof BANNER_UNITS.mobile) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      html,body{margin:0;padding:0;width:100%;min-height:${unit.height}px;background:transparent;overflow:hidden;text-align:center;}
      body{display:flex;align-items:center;justify-content:center;}
    </style>
  </head>
  <body>
    <script>
      atOptions = {
        'key': '${unit.key}',
        'format': 'iframe',
        'height': ${unit.height},
        'width': ${unit.width},
        'params': {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/${unit.key}/invoke.js"></script>
  </body>
</html>`;
}

function nativeDocument() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      html,body{margin:0;padding:0;width:100%;min-height:260px;background:transparent;overflow:hidden;}
      #${NATIVE_CONTAINER_ID}{width:100%;min-height:250px;}
    </style>
  </head>
  <body>
    <script async="async" data-cfasync="false" src="${NATIVE_BANNER_SRC}"></script>
    <div id="${NATIVE_CONTAINER_ID}"></div>
  </body>
</html>`;
}

function BannerFrame({ variant }: { variant: "desktop" | "mobile" }) {
  const unit = BANNER_UNITS[variant];

  return (
    <iframe
      title={`Bus Traffic Fever sponsored ${variant} banner`}
      srcDoc={bannerDocument(unit)}
      width={unit.width}
      height={unit.height}
      scrolling="no"
      loading="lazy"
      className={variant === "desktop" ? "hidden max-w-full border-0 md:block" : "block max-w-full border-0 md:hidden"}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}

export function AffiliateAd({ placement, className = "" }: { placement: AffiliatePlacement; className?: string }) {
  const isNative = placement === "middle";

  return (
    <section className={`my-8 flex w-full justify-center px-2 ${className}`} aria-label="Advertisement">
      <div className="flex w-full max-w-[970px] flex-col items-center justify-center overflow-hidden text-center">
        {isNative ? (
          <iframe
            title="Bus Traffic Fever sponsored native banner"
            srcDoc={nativeDocument()}
            width="100%"
            height={280}
            scrolling="no"
            loading="lazy"
            className="w-full max-w-[970px] border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <>
            <BannerFrame variant="desktop" />
            <BannerFrame variant="mobile" />
          </>
        )}
      </div>
    </section>
  );
}

export function AffiliateGlobalAds() {
  return <Script id="bustrafficfever-affiliate-popunder" src={POPUNDER_SRC} strategy="afterInteractive" />;
}
