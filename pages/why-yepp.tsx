import Centered from "@/components/Centered";
import Explainer from "@/components/Landing/Explainer";
import Navbar from "@/components/Landing/Navbar";
import MainTitle from "@/components/Landing/common/MainTitle";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import Subtitle from "@/components/Landing/common/Subtitle";
import GraySection from "@/components/Landing/common/GraySection";
import { useEffect, useState } from "react";
import Section from "@/components/Landing/common/Section";
import tickIcon from "../public/images/gradient-tick.png"
import Image from "next/image";
import chart from "../public/images/attention_char.png"
import workflowVisualization from "../public/images/workflow_visualization.png"
import BlueButton from "@/components/Landing/common/BlueButton";
import Footer from "@/components/Landing/Footer";
import growthIcon from "../public/images/percentage_arrow.png";
import styled from "styled-components";

const WhyYepp = () => {
    
    useEffect(() => {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }, []);

 return (
    <>
        <Navbar />
        <div className="mt-[6rem] lg:mt-[10rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="w-11/12 flex justify-center flex-wrap">
                <Centered><MiniTitle>Why Choose Yepp?</MiniTitle></Centered>
                <div className="w-8/12"><MainTitle>Marketing platforms must generate and convert more leads.</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Every marketing team has two primary goals to drive growth: generate leads and convert leads. This concept seems straightforward. However, the current economic climate demands that marketers achieve more with fewer resources.</div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">To stay ahead in the competitive landscape, marketing leaders require a platform that unlock conversion rates and optimizes resource utilization.</div>
            </div>
            </Centered>
        </div>
        <Explainer />
        <div className="mt-[10rem]"></div>
        <GraySection>
        <div className="w-full flex justify-center flex-wrap">
            <Subtitle>The pain with AI in marketing</Subtitle>
            <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Today&apos;s AI tools just aren&apos;t smart enough for what marketers really need. They don&apos;t fit well into our everyday work and don&apos;t really get our problems. We need an AI that learns from us and helps with more of the tough stuff we face every day, an AI that evolves and grows to understand and tackle our unique challenges.</div>
        </div>
        </GraySection>
        <Section>
        <div className="lg:grid lg:grid-cols-2 flex flex-wrap gap-10 lg:px-[6rem]">
            <div>
                <div className="w-full flex flex-wrap p-10">
                    <h3 className="lg:text-[3vw] text-3xl font-medium ">Marketing leaders face new obstacles</h3>
                    <h4 className="lg:text-[1.5vw] font-medium mt-4">Crafting and converting leads has always been complex, yet today&apos;s marketing arena is presenting unprecedented difficulties.</h4>
                    <p className=" lg:text-lg text-gray-800 mt-8">Yepp is your individually tailored AI platform, specifically crafted to align with your marketing team&apos;s workflow. It integrates with your team&apos;s unique processes - from content creation to data analysis - propelling your brand&apos;s growth at every customer engagement stage.</p>
                    <div className="w-full mt-10">
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Fewer people show interest </div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />There is less money for marketing </div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Marketing teams are smaller</div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />There is less space for novel ideas </div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Bosses want to see profits go up</div>
                    </div>
                </div>
            </div>
            <div className="h-full flex items-end">
                <Image src={chart} alt="chart" className="w-full rounded-3xl" />
            </div>
        </div>
        </Section>
        <Section>
        <div className="lg:grid lg:grid-cols-2 flex flex-wrap gap-10 lg:px-[6rem]">
            <div className="h-full flex items-center hidden lg:block">
                <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={2400} height={1400} alt="chart" className="w-full rounded-3xl" />
            </div>
            <div>
                <div className="w-full flex flex-wrap p-10 lg:ml-16">
                    <h3 className="lg:text-[3vw] text-3xl font-medium ">New era, new rules</h3>
                    <h4 className="lg:text-[1.5vw] font-medium mt-4 w-11/12">To succeed, marketing teams need new, smart ways to grab attention and win customers.</h4>
                    <div className="mt-10 w-10/12">
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Engagement: Boost the impact and response rate of campaigns.</div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Creativity: Produce more compelling content that resonates.</div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Insight: Better predict and understand market trends and customer behavior.</div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Cost-Smart Strategies: Do more with less money in our marketing budgets.</div>
                        <div className="flex gap-6 mt-4"><Image src={tickIcon} alt="tick" className="w-6 h-6" />Profit Focus: Ensure our efforts truly increase company earnings.</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full flex justify-center">
            <div className="lg:w-2/3 w-10/12 mt-28">
            <p className="lg:text-2xl text-xl"><b>Many tools used in marketing don&apos;t give us the full picture we need.</b> This makes our data messy and our jobs harder, and our tech tools too complicated. But we still have to find ways to get more customers.</p>
            <p className="lg:text-2xl text-xl mt-4">To get and keep more customers without spending more money or hiring more people, marketing teams need to use technology that makes their jobs easier and more effective.</p>
            </div>
        </div>
        </Section>
        <div className="mt-[10rem]"></div>
        <GraySection>
        <div className="w-full flex justify-center flex-wrap">
            <Subtitle>Marketing teams need a platform that streamlines their workflow from start to finish.</Subtitle>
            <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Yepp AI is the only Marketing Intelligence Platform that enhances marketer efficiency, enabling teams to effectively generate and convert more leads with less effort.</div>
            <Image src={workflowVisualization} alt="workflow" className="w-2/3 mt-14" />
            <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Yepp AI is the unified platform — and single source of truth — for marketers and their leaders. It consolidates every marketing activity into a smart, data-driven workflow. By integrating data from every touchpoint in the customer journey, Yepp AI provides insights that empower the entire team to achieve superior marketing results.</div>
            <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Consequently, marketing teams can generate more leads and boost conversions while reducing expenses and risks across the organization.</div>
            <Centered>
                <div className="mt-4">
                <BlueButton onClick={() => console.log("")}>Explore the platform</BlueButton>
                </div>
            </Centered>
        </div>
        </GraySection>
        <Section>
        <div className="lg:px-[8rem] mb-[20vh]">
        <Container className="w-full relative bg-white py-12 lg:py-14 px-12 lg:px-24 flex justify-between">
            <div className="w-[5rem] flex justify-end lg:mt-0 absolute right-0 top-0">
                <Image src={growthIcon} alt="growth icon" className="w-full" />
            </div>
            <div className="w-full rounded-xl relative">
                <div className="flex flex-wrap lg:flex-nowrap justify-between items-center mt-6 pb-10 border-b-4 border-gray-100">
                    <div className="lg:w-1/2 w-full flex flex-wrap items-center">
                    <p className="text-[3vw] leading-tight font-medium flex lg:w-10/12 items-end"> 
                    Faster Campaign Execution
                    </p>
                    </div>
                    <div className="h-full flex flex-col-reverse lg:flex-col lg:flex-wrap w-full lg:w-1/2">
                        <p className="lg:text-[10rem] text-5xl text-right flex lg:block text-gray-800 lg:mt-0">
                            67%
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap justify-between items-center pt-10">
                    <div className="h-full flex flex-col-reverse lg:flex-col lg:flex-wrap w-full lg:w-1/2">
                        <p className="lg:text-[10rem] text-5xl text-left flex lg:block text-gray-800 lg:mt-0">
                            29%
                        </p>
                    </div>
                    <div className="lg:w-1/2 w-full flex flex-wrap items-center justify-end">
                    <p className="text-[3vw] leading-tight text-right font-medium flex lg:w-10/12 items-end"> 
                    Increase in Average Deal Size
                    </p>
                    </div>
                </div>
            </div>
        </Container>
        </div>
        </Section>
        <Footer />
    </>
 )
}

export default WhyYepp;

const Container = styled.div`
    box-shadow: 0px 0px 20px rgba(0, 0, 100, 0.15);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    @media (max-width: 1023px) {
        flex-direction: column-reverse;
    }
`