import SlideBottom from "../Animated/SlideBottom";
import styled from "styled-components";

const CompetitorFavicons = (props: {images: any}) => {

        return (
            <div className="flex items-center ml-[0.75rem]">
                {props.images.slice(0, 3).map((image: any, index: any) => (
                    <SlideBottom key={index}>
                        <div className="rounded-full border-2 border-white bg-[#F6F6FB] w-10 h-10 p-1 flex justify-center items-center shadow-sm relative -ml-3">
                        <ProfileIcon image={image} />
                        </div>
                    </SlideBottom>
                ))}
                {props.images.length > 3 && (
                    <SlideBottom><span className="ml-2 text-black text-sm font-medium py-1">{`+${props.images.length - 3}`}</span></SlideBottom>
                )}
            </div>
        );
}

export default CompetitorFavicons;

const ProfileIcon = styled.div<{ image: any }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

`