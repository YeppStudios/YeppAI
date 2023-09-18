import { BsPlayFill } from 'react-icons/bs';
import explainerThumbnail from '../../public/images/explainer_thumbnail.png';
import styled from 'styled-components';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Explainer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
        {modalOpen && 
            <BlurBackground onClick={handleCloseModal}>
              <VideoModal className="w-[95svw] lg:w-[80svw] aspect-video group relative cursor-auto" onClick={(e) => e.stopPropagation()}>
              <iframe width="1600" height="900" className="w-full h-full rounded-2xl lg:rounded-3xl" allowFullScreen
                src={`https://www.youtube.com/embed/GboACf5Qmpk?autoplay=1`}>
              </iframe>
                <button className="absolute hidden group-hover:flex top-2 right-2 bg-black bg-opacity-60 text-white rounded-full cursor-pointer w-10 h-10 justify-center items-center" onClick={handleCloseModal}><IoClose className="w-1/2 h-1/2"/></button>
              </VideoModal>
            </BlurBackground>
        }
        <div className='w-full px-[0.5rem] lg:px-[8rem]'>
        <ExplainerThumbnail background={explainerThumbnail}>
            <button onClick={() => setModalOpen(true)} className="text-white backdrop-blur-sm bg-blue-900 shadow-lg bg-opacity-30 p-2 lg:p-6 rounded-full cursor-pointer hover:scale-105 transition ease-in-out">
                <BsPlayFill className="h-12 w-12 lg:h-20 lg:w-20 opacity-1" />
            </button>
        </ExplainerThumbnail>
        </div>
        </>
    )
}

export default Explainer;

const ExplainerThumbnail = styled.div<{ background: any }>`
    aspect-ratio: 16 / 9;
    border-radius: 30px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-image: url(${props => props.background.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 20px rgba(0, 0, 100, 0.15);
    width: 100%;
    padding-x: 8rem;
    @media (max-width: 1023px) {
        padding-x: 0.7rem;
    }
`;


const VideoModal = styled.div`
cursor: auto;
position: relative;
`;

const BlurBackground = styled.div`
    width: 100vw;
    height: 100%;
    position: fixed;
    backdrop-filter: blur(10px);
    background-color: rgba(195, 202, 227, 0.3);
    z-index: 101;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media (max-width: 768px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
`