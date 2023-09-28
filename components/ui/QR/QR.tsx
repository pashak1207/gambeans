"use client"
import QRCode from "react-qr-code";
import Image from "next/image";

export default function QR({domain}:{domain:string}) {

    const printPage = () => {
        window.print();
    }

    const downloadSvg = () => {
        const svg = document.querySelector('.qr_container svg');

        if(svg){
            const svgBlob = new Blob([svg!.outerHTML], {type: 'image/svg+xml;charset=utf-8'});
            const url = URL.createObjectURL(svgBlob);
            const link = document.createElement('a');

            link.href = url;
            link.download = 'qrcode.svg';
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
        }
    }

    return (<>
                <button onClick={printPage}>
                    <Image alt="print" width={40} height={40} src={"/print.svg"} />
                </button>
                <div onClick={downloadSvg} className="qr_container">
                    <QRCode value={domain} />
                </div>
    </>)
}