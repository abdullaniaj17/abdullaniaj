import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const WEBSITE_URL = "https://abdullaniaj.lovable.app/";
const QR_SIZE = 2000;

const QRCodePage = () => {
  const [pngDataUrl, setPngDataUrl] = useState<string>("");
  const [svgString, setSvgString] = useState<string>("");

  useEffect(() => {
    const generate = async () => {
      const png = await QRCode.toDataURL(WEBSITE_URL, {
        width: QR_SIZE,
        margin: 4,
        color: { dark: "#000000", light: "#FFFFFF" },
        errorCorrectionLevel: "H",
      });
      setPngDataUrl(png);

      const svg = await QRCode.toString(WEBSITE_URL, {
        type: "svg",
        margin: 4,
        color: { dark: "#000000", light: "#FFFFFF" },
        errorCorrectionLevel: "H",
      });
      setSvgString(svg);
    };
    generate();
  }, []);

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.download = "abdullaniaj-qrcode.png";
    link.href = pngDataUrl;
    link.click();
  };

  const downloadSVG = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "abdullaniaj-qrcode.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">Your QR Code</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Scan to visit <span className="font-medium text-foreground">{WEBSITE_URL}</span>
      </p>

      {pngDataUrl ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg border mb-8">
          <img
            src={pngDataUrl}
            alt="QR Code for abdullaniaj.lovable.app"
            className="w-64 h-64 md:w-80 md:h-80"
          />
        </div>
      ) : (
        <div className="w-64 h-64 animate-pulse bg-muted rounded-2xl mb-8" />
      )}

      <div className="flex gap-4">
        <Button onClick={downloadPNG} disabled={!pngDataUrl} size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download PNG (2000×2000)
        </Button>
        <Button onClick={downloadSVG} disabled={!svgString} variant="outline" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download SVG
        </Button>
      </div>
    </div>
  );
};

export default QRCodePage;
