import styled from "styled-components"
import SlideBottom from "../Animated/SlideBottom"
import SlideLeft from "../Animated/SlideLeft"

const stats = [
    { id: 1, name: 'Platform users', value: '3,200+' },
    { id: 2, name: 'Marketing agencies', value: '40+' },
    { id: 3, name: 'Avg. content creation', value: '10x faster' },
    { id: 4, name: 'Drafts crafted', value: '200,000+' },
  ]
  
  export default function Example() {
    return (
      <Container>
        <div className="absolute top-0 left-0 w-[100vw] h-full bg-black opacity-80"></div>
        <div
            className="absolute -bottom-8  transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
            aria-hidden="true"
          >
            <div
              className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#6578F8] to-[#64B5FF] opacity-40"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-2xl">
            <SlideLeft>
            <p className="mt-2 text-[1.8rem] font-bold text-white sm:text-6xl">
              Trusted by thousands of marketers worldwide
            </p>
            </SlideLeft>
            <SlideLeft>
            <p className="mt-6 text-xl font-medium lg:text-2xl leading-8 text-gray-300">
            At the forefront of the AI revolution, Yepp AI is transforming the game, empowering marketers to craft top-notch, deeply insightful content like never before.
            </p>
            </SlideLeft>
          </div>
          
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 lg:pl-6">
                <SlideBottom>
                <dt className="text-base leading-6">{stat.name}</dt>
                <dd className="order-first text-4xl font-semibold tracking-tight">{stat.value}</dd>
                </SlideBottom>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    )
  }
  

  const Container = styled.div`
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 8em 0 10rem 0;
    -webkit-mask: 
    // linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
    // linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
    // linear-gradient(to left  , black, transparent) left  /100% 0%,
    // linear-gradient(to right , black, transparent) right /100% 0%;
    // -webkit-mask-repeat:no-repeat;
  `