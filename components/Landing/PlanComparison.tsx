import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import tickIcon from "../../public/images/tickGreen.png"
import xIcon from "../../public/images/closeIcon.png";
import Centered from "../Centered";
import styled from "styled-components";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const features = [
    {title: "Marketing AI", basic: {hasFeature: true, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "A set of forms for generating content like posts, articles, emails, or product descriptions."},
    {title: "Content Saving", basic: {hasFeature: true, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Ability to save content to return to it later."},
    {title: "Copywriting AI", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Intelligent AI editor for generating longer content focused on SEO."},
    {title: "Chat", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Chat with corporate AI Assistants who will answer your questions and commands regarding uploaded resources and more."},
    {title: "Knowledge Uploading", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Teaching AI Assistants based on your own resources with which you can write and generate content."},
    {title: "File Uploading", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Ability to upload your own files (PDF, TXT, DOCX, PPTX) on which the Assistant will base."},
    {title: "Subpage Scanning", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Ability to scan content from selected subpages on which the Assistant will base."},
    {title: "Video Uploading", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Ability to upload a YouTube video on which the Assistant will base."},
    {title: "Number of folders", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: "1"}, business: {hasFeature: true, value: "∞"}, description: "Folders through which you can group uploaded resources into departments or serviced companies."},
    {title: "Number of uploaded resources", basic: {hasFeature: false, value: "0"}, pro: {hasFeature: true, value: "10"}, business: {hasFeature: true, value: "∞"}, description: "Number of uploaded resources (PDF, TXT, DOCX, PPTX, Web pages, YouTube) on which the Assistant will base."},
    {title: "Sales AI", basic: {hasFeature: false, value: ""}, pro: {hasFeature: false, value: ""}, business: {hasFeature: true, value: ""}, description: "Set of 1000+ most effective commands to AI in the field of marketing and sales."},
    {title: "Resource Space", basic: {hasFeature: false, value: "0"}, pro: {hasFeature: true, value: "15 MB"}, business: {hasFeature: true, value: "∞"}, description: "The total maximum size of uploaded resources on which the Assistant bases its answers."},
    {title: "Number of users", basic: {hasFeature: true, value: "1"}, pro: {hasFeature: true, value: "1"}, business: {hasFeature: true, value: "∞"}, description: "Number of users with access to the corporate account."},
    {title: "Elixir", basic: {hasFeature: true, value: "75 000ml"}, pro: {hasFeature: true, value: "250 000ml"}, business: {hasFeature: true, value: "1 000 000ml"}, description: "Elixir is consumed for generating and uploading content. We assume that for a full A4 page (~350 words) about ~900ml is used."},
]


const PlanComparison = () => {

    const [showComparison, setShowComparison] = useState(false);
    const [mobile, setMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, []);
      
    return (
        <>
    <motion.div
        className="px-4 w-full"
        initial={{ height: "32rem", overflow: "hidden" }} 
        animate={{ 
            height: showComparison ? "auto" : "32rem",
            overflow: showComparison ? "visible" : "hidden"
        }}
        exit={{ height: "32rem", overflow: "hidden" }}
        transition={{ duration: 0.5 }}
        >
    <div className="-mx-4 mt-24 sm:-mx-0">
        <table className="w-full divide-y divide-gray-300">
        <thead>
            <tr>
            <th scope="col" className="px-3 py-3.5 pl-4 text-center lg:w-16 text-sm lg:text-xl font-semibold text-gray-900 sm:pl-0">
            </th>
            <th
                scope="col"
                className="py-3.5 px-3 text-center border-l border-r lg:w-16 text-sm lg:text-xl font-semibold text-gray-900 lg:table-cell"
            >
                Basic
            </th>
            <th
                scope="col"
                className="py-3.5 px-3 text-center border-l border-r lg:w-16 text-sm lg:text-xl font-semibold text-gray-900 sm:table-cell"
            >
                Pro
            </th>
            <th  scope="col" className="py-3.5 px-3 border-l text-center lg:w-16 text-sm lg:text-xl font-semibold text-gray-900 sm:table-cell"> 
                Business
            </th>
            </tr>
        </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {features.map((feature, featureIdx) => (
                <tr key={feature.title}>
                    <td className="lg:w-16 py-6 pr-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        <b className="text-base lg:text-2xl lg:ml-6">{feature.title}</b><br />
                        <p className="text-xs lg:text-base mt-2 text-gray-700 lg:ml-6">{feature.description}</p>
                    </td>
                    <td className="lg:px-3 py-6 text-sm font-semibold border-l border-r text-gray-500 lg:table-cell">
                    {feature.basic.hasFeature ? 
                                        feature.basic.value.length === 0 ?
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                        :
                                        <div className="text-center text-base lg:text-xl">
                                            {feature.basic.value}
                                        </div>
                                    :
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={xIcon} alt={'no'}></Image> 
                                }
                    </td>
                    <td className="lg:px-3 py-6 text-sm font-semibold border-l border-r text-gray-500 sm:table-cell">
                        {feature.pro.hasFeature ? 
                                        feature.pro.value.length === 0 ?
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                        :
                                        <div className="text-center text-base lg:text-xl">
                                            {feature.pro.value}
                                        </div>
                                    :
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={xIcon} alt={'no'}></Image> 
                        }
                    </td>
                    <td className="lg:px-3 py-6 text-sm font-semibold border-l text-gray-500 sm:table-cell">
                    {feature.business.hasFeature ? 
                                        feature.business.value.length === 0 ?
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                        :
                                        <div className="text-center text-base lg:text-2xl">
                                            <ColorfulText>{feature.business.value}</ColorfulText>
                                        </div>
                                    :
                                        <Image className="block mx-auto" style={{ height: "auto", width: "1.55rem" }}  src={xIcon} alt={'no'}></Image> 
                                }
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </motion.div>
        
            {!showComparison ?
            <Centered><button className="mt-12 font-bold text-xl flex items-center" onClick={() => setShowComparison(true)}>Show more<BsArrowDown className="ml-4" /></button></Centered>
            :
            <Centered><button className="mt-12 font-bold text-xl flex items-center" onClick={() => setShowComparison(false)}>Hide<BsArrowUp className="ml-4" /></button></Centered>
            }
        </>
    )

}


export default PlanComparison;

const ColorfulText = styled.span`
  background: -webkit-linear-gradient(40deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
