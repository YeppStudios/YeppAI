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
        <div className="absolute top-0 left-0 w-[100vw] h-full"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full">
            <p className="mt-2 text-[1.8rem] font-medium lg:text-center text-white sm:text-3xl">
              Trusted by thousands of marketers worldwide
            </p>
          </div>
          
          <dl className="mt-10 text-white flex gap-8 flex flex-wrap lg:block lg:gap-28 justify-left lg:justify-center">
            {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-y-3 lg:border-l border-white/10 lg:pl-6">
                <SlideBottom>
                <dt className="text-base leading-6">{stat.name}</dt>
                <dd className="order-first text-2xl lg:text-4xl font-semibold lg:font-medium tracking-tight">{stat.value}</dd>
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
    padding: 3em 0 4rem 0;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
  `