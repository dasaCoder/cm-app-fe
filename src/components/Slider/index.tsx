import ReactSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slider({ children, settings }: { children: React.ReactNode, settings: any }) {
    return (
        <ReactSlider {...settings}>{children}</ReactSlider>
    );
}