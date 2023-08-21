import { AiOutlineCloudUpload, AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RxInput } from "react-icons/rx";
import { BsCreditCard2Front, BsBook, BsFileText, BsHandIndexThumb, BsMenuApp, BsFileEarmark, BsCollectionPlay, BsLaptop, BsKey, BsMagic, BsMegaphone, BsHandThumbsUp, BsPersonVcard, BsFolder, BsLightbulb, BsChatSquareText, BsPalette, BsPersonVideo3 } from "react-icons/bs";
import { IoBookOutline, IoPhonePortraitOutline, IoRocketOutline } from "react-icons/io5"
import { GoMail, GoChecklist } from "react-icons/go";
import { BiRocket, BiSupport } from "react-icons/bi";
import assetsThumbnail from "./public/images/Thumbnail_Assets.png"
import campaignsThumbnail from "./public/images/Thumbnail_Campaigns.png"
import chatThumbnail from "./public/images/Thumbnail_Chat.png"
import copywritingThumbnail from "./public/images/Thumbnail_Copywriting.png"
import marketingTemplatesThumbnail from "./public/images/Thumbnail_Templates.png"
import miniAssets from "./public/images/Mini_Thumbnail_Assets.png"
import miniTemplates from "./public/images/Mini_Thumbnail_Templates.png"
import miniCampaigns from "./public/images/Mini_Thumbnail_Campaigns.png"
import miniChat from "./public/images/Mini_Thumbnail_Chat.png"
import miniCopywriting from "./public/images/Mini_Thumbnail_Copywriting.png"

export const solutions = [
    {
        query: "marketing-templates",
        title: "Marketing Templates",
        description: "Watch AI write insightful content on niche topics.",
        video: "https://www.youtube.com/embed/KQPYySWUmz4?autoplay=1",
        image: marketingTemplatesThumbnail,
        miniThumbnail: miniTemplates,
        tutorial: [
            {
                icon: AiOutlineCloudUpload,
                title: "Choose a desired placement.",
                description: `Once you click on the "Marketing" tab in the sidebar, all placements will appear. You can filter them by category and search for the perfect one suited to your use case.`,
                image: "https://ipfs.io/ipfs/QmXnqJm7mPKe49FcgYnr2DQMnJWXNQHdFTwYqZEGJBG5Qu?filename=Screenshot%202023-08-12%20at%202.39.53%20PM.png"
            },
            {
                icon: RxInput,
                title: "Fill out the form.",
                description: `By selecting one of them you will be redirected to the form page. Select your uploaded content and fill it out with informations and instrucitons on what you want to write.`,
                image: "https://ipfs.io/ipfs/QmWsLDPThEp8zQVrxxZ6NqWxP5gQZZLYgvG24hKwgku1v6?filename=Screenshot%202023-08-12%20at%202.41.35%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Edit and rewrite the content.",
                description: "After submitting the form AI will write an insightful draft for you. Generated draft you can easily edit, copy, save, rewrite or prompt for further improvements.",
                image: "https://ipfs.io/ipfs/QmP6yVNc3M5MkUmaGf8jNTMF4XozZT4oQ2xbmuUQ7Wtkf1?filename=Screenshot%202023-08-13%20at%202.07.13%20PM.png"
            },
        ],
        useCases: [
            {
                icon: BsCreditCard2Front,
                title: "Google Ads",
                description: "Elevate your online presence with AI-driven Google Ads! Simply describe your product/company, detail your offering, and let the AI craft a captivating ad copy that stands out and makes people click.",
            },
            {
                icon: IoPhonePortraitOutline,
                title: "Social media content",
                description: "Amplify your social engagement with ease! Choose your preferred platform, outline your desired content, and watch as AI seamlessly generate content that strikes a chord with your audience.",
            },
            {
                icon: BsBook,
                title: "Marketing frameworks",
                description: "Strategize smarter with AI on your side! Enter details about your company/product or client, input your marketing objectives, target audience and use with comprehensive PAS, BAB and AIDA frameworks.",
            },
            {
                icon: BsFileText,
                title: "TikTok and YouTube scripts",
                description: "Turn your idea into a viral video! Select your platform, share the essence of your content, and let AI deliver a scripts, hooks, descriptions and titles that are both engaging and on-brand.",
            },
            {
                icon: GoMail,
                title: "Marketing emails",
                description: "Reinvent your email campaigns with a touch of AI magic! Choose the email type, describe your promotional intent, and receive content that not only captivates your audience but also converts.",
            },
        ]
    },
    {
        query: "assets-upload",
        title: "Assets Upload",
        description: "Upload to make AI understand you & your clients.",
        video: "https://www.youtube.com/embed/qql3wigE7JM?autoplay=1",
        image: assetsThumbnail,
        miniThumbnail: miniAssets,
        tutorial: [
            {
                icon: BsHandIndexThumb,
                title: "Choose upload method.",
                description: "Upload information in various formats: PDF, TXT, PPTX, CSV & DOCX files, Websites and social media, YouTube audio, or just write content that your AI should know.",
                image: "https://ipfs.io/ipfs/QmPeeFNt3yFySQ47VsGkTMTvuUd95Bvf8TWXC7nrXZnpJc?filename=Screenshot%202023-08-12%20at%203.19.31%20PM.png"
            },
            {
                icon: BsMenuApp,
                title: "Assign data to folders.",
                description: "When you upload a file, you'll need to decide where to store it. You can make a new folder specifically for this file, or you can select a folder that you've already created.",
                image: "https://ipfs.io/ipfs/QmVMQ2hz8y3p48gSrmvmEBSBiSnu7bnZ4KkbFiMu8BGu3v?filename=Screenshot%202023-08-13%20at%202.09.23%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Edit existing folders.",
                description: "You have the ability to delete and preview each file that you've uploaded to the designated folder. However, opening these files is not possible as they are stored in a vector base.",
                image: "http://drive.google.com/uc?export=view&id=1vsY3c7shJi2cPyiN4r5Hd4HbYJrOgc1A"
            },
        ],
        useCases: [
            {
                icon: BsFileEarmark,
                title: "Files & presentations",
                description: "These can be in the form of PDF, TXT, DOCX, PPTX, or CSV files. These documents can contain important information about the company, its products or services, and its clients.",
            },
            {
                icon: BsLaptop,
                title: "Web content",
                description: "This can include the company's website, blog posts, articles, and other web-based content. This information can help the AI understand the company's online presence and its interactions with customers.",
            },
            {
                icon: IoPhonePortraitOutline,
                title: "Social media content",
                description: "This includes posts, comments, likes, shares, and other interactions on social media platforms like Facebook, Twitter, Instagram, LinkedIn, etc. This data can provide insights into the company's social media strategy and customer engagement.",
            },
            {
                icon: BsCollectionPlay,
                title: "Audio content",
                description: "Yepp supports uploading YouTube video audio. Upload podcasts, interviews, tutorials and much more. AI will transcribe and remember the content, so later on you will be able to chat with it  and generate  insightful content across the entire platform.",
            },
            {
                icon: BsFileText,
                title: "Written content",
                description: "This can be any content that the company wants the AI to know. It can be about the company's history, mission, vision, values, strategies, plans, etc. This information can help the AI understand the company's identity and its approach to business.",
            },
        ]
    },
    {
        query: "campaigns",
        title: "Content Campaigns",
        description: "Create content campaigns for all placements at once.",
        video: "https://www.youtube.com/embed/aS4fLFrjNXc?autoplay=1",
        image: campaignsThumbnail,
        miniThumbnail: miniCampaigns,
        tutorial: [
            {
                icon: BsHandIndexThumb,
                title: "Choose desired placements.",
                description: `Click the „Marketing Tab” and select „+ New Camapign”. Once the form appears, choose all the placements that you want to create your camapaign for. `,
                image: "https://ipfs.io/ipfs/QmeGcNuA7HND3XkmSehA2UsTAFSE28VJmMSTwbeqvQG8v5?filename=Screenshot%202023-08-12%20at%202.28.21%20PM.png"
            },
            {
                icon: RxInput,
                title: "Define your campaign.",
                description: `Now it is time to provide some details about the campaign. Select language, tone of voice and enter campaign’s type, title and what would you like to promote.`,
                image: "https://ipfs.io/ipfs/QmWaStFTjmuYgktP1E8MV61XDYTdDYtcjM1nMJQC1BZHTE?filename=Screenshot%202023-08-12%20at%202.30.22%20PM.png"
            },
            {
                icon: BsKey,
                title: "Enter key information.",
                description: "Select uploaded asstets to make sure your campaign will include quality content. Then set the campaign’s objetive, target audience and add keywords for a better chance to reach you goal.",
                image: "https://ipfs.io/ipfs/QmehV4YBGBAjuEwMipea1pyFJ6BssmVkD9ghyMbd9hPVp8?filename=Screenshot%202023-08-12%20at%202.29.24%20PM.png"
            },
            {
                icon: BsMagic,
                title: "Watch AI create.",
                description: "Creation time! Check the fruit of your and Yepp's labor. You can change campaign’s settings and give AI the command to rewrite it anytime.",
                image: "https://ipfs.io/ipfs/QmdVLFSFZM7LnSXXVUojh1tpcsuPUTmmay85SSZHVvs7y1?filename=Screenshot%202023-08-12%20at%202.31.42%20PM.png"
            },
        ],
        useCases: [
            {
                icon: IoRocketOutline,
                title: "Product Launch",
                description: `Planning to introduce a new product to the market? Use the "Content Campaigns" feature to streamline your promotional efforts across multiple platforms. Describe the product details, set your target audience, and let the AI craft tailored content for all chosen placements.`,
            },
            {
                icon: BsMegaphone,
                title: "Event Promotion",
                description: "Promote your upcoming events like webinars or conferences by setting up a campaign across various channels, with AI generating engaging content. For seasonal sales or special deals, launch a content campaign across all desired platforms and increase traffic and sales.",
            },
            {
                icon: BsHandThumbsUp,
                title: "Customer Engagement",
                description: `Launching a new loyalty program or customer feedback drive? Promote these initiatives with campaign feature. Yepp will automatically generate content and ideas for social media, ads, email marketing and even video scripts. All of that with just a few clicks using similar tone of voice. `
            },
        ]
    },
    {
        query: "chat",
        title: "Chat with your data",
        description: "Create AI assistant that knows you & your clients.",
        video: "https://www.youtube.com/embed/tyWfMGJBO5c?autoplay=1",
        image: chatThumbnail,
        miniThumbnail: miniChat,
        tutorial: [
            {
                icon: BsPersonVcard,
                title: "Give your assistant an identity.",
                description: `Click the „Marketing Tab” and select „+ New Camapign”. Once the form appears, choose all the placements that you want to create your camapaign for. `,
                image: "https://ipfs.io/ipfs/QmQApzadxjZoaWF95Zy18LqZyZC1hiuZ97aq4usLBJ84gP?filename=Screenshot%202023-08-13%20at%202.17.27%20PM.png"
            },
            {
                icon: BsFolder,
                title: "Provide learning resources.",
                description: `Now it is time to provide some details about the campaign. Select language, tone of voice and enter campaign’s type, title and what would you like to promote.`,
                image: "https://ipfs.io/ipfs/QmZcJZtx4jVwwAXhmeJCSsLM1vQwskzKMa2L59pvHYLU4X?filename=Screenshot%202023-08-13%20at%202.18.18%20PM.png"
            },
            {
                icon: BsLightbulb,
                title: "Define the desired behavior.",
                description: "Would you like your assistant to help with creative tasks? Or should it be the company's encyclopedia? Remember that for each assistant you can define how should it behave.",
                image: "https://ipfs.io/ipfs/QmSAzHUySygnAbziDWax6rxAc5fWcnpj8mzj9YZZqEyfVu?filename=Screenshot%202023-08-13%20at%202.18.49%20PM.png"
            },
            {
                icon: BsChatSquareText,
                title: "Start the conversation.",
                description: "Type in your question or task you need to complete. Assistant according to defined behavior will recognize when to reply based on assets you selected in the previous step.",
                image: "https://ipfs.io/ipfs/QmVc3SgtBhXKuCoWke56CNfVbiFTXS9gPNnk3pMpESsbeL?filename=Screenshot%202023-08-13%20at%202.16.32%20PM.png"
            },
        ],
        useCases: [
            {
                icon: BsPalette,
                title: "Creative Work",
                description: `Give context to Assistant by uploading briefs, project requirements or any possesed information and ask an assistant to create campaign ideas, strategies, offers, content and many more.`,
            },
            {
                icon: BiSupport,
                title: "Customer service",
                description: "Want to enhance customer service on your website? Create a dedicated chat assistant on the Yepp platform. Base it on relevant resources and then ust API key to place it as needed. You can review all customer interactions with the assistant on the platform, just like internal usage.",
            },
            {
                icon: BsBook,
                title: "Company’s Encyclopedia",
                description: `Speed up your team's work by uploading assets to the platform and create an assistant based on them. The assistant will find any information contained in the uploaded resources within a second, so you don't have to waste time searching for it.`
            },
            {
                icon: BsPersonVideo3,
                title: "Employee Onboarding",
                description: `A new employee at the company? Onboard him with an assistant based on the most important resources about the company. If he has a question about processes or customers he will get an instant answer, making him a valuable member of the team faster.`
            },
        ]
    },
    {
        query: "copywriting",
        title: "Copywriting",
        description: "Craft highly personalized written pieces.",
        video: "https://www.youtube.com/embed/0wvlz7IHsrQ?autoplay=1",
        image: copywritingThumbnail,
        miniThumbnail: miniCopywriting,
        tutorial: [
            {
                icon: AiOutlineCloudUpload,
                title: "Fill out general settings.",
                description: `Start by identifying your content's topic. Pinpoint key words to include. Choose a language, set its tone, and determine the character count. Decide the content type you want AI to generate.`,
                image: "https://ipfs.io/ipfs/Qmdosipbj6Ei65BpUpJpF8FMfSJrpshqi5a4GSbQkNsiMc?filename=Screenshot%202023-08-13%20at%202.46.37%20PM.png"
            },
            {
                icon: RxInput,
                title: "Select knowledge resources.",
                description: `Create a high-performing article by selecting top-ranked Google search links related to your topic. Support your entire article with your folders filled with invaluable insightful data.`,
                image: "https://ipfs.io/ipfs/QmYL17HyXqDViakJ4xhURyp9yhJ2tVdPYZxasmDigyynuS?filename=Screenshot%202023-08-13%20at%202.48.22%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Preview header & description.",
                description: "AI will present a proposed header and description. You can edit it, generate new suggestions with AI, or use one of the most frequently asked Google search questions.",
                image: "https://ipfs.io/ipfs/QmeaUAngU9ZE5Ztz1NcoBkBD4Vq1oQEiWspPVGBcayZSxq?filename=Screenshot%202023-08-13%20at%202.49.03%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Watch AI generate outline.",
                description: "You'll be provided with an automatic outline of the article, complete with headers, instructions, and keywords for each section. You can manually edit the outline, paste a new one, or generate a new one with AI.",
                image: "https://ipfs.io/ipfs/QmYhDMqLtSKynaB87JTRo6tpi2rVq3Rar3RKKNCqAai4jo?filename=Screenshot%202023-08-13%20at%202.51.31%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Almost there",
                description: "Give AI a moment to compile everything. This brief pause is necessary for the creation of your high-quality content.",
                image: "https://ipfs.io/ipfs/QmQMbYyJBYYJEgEeg3d7AejQvYYBRRgWAufy24q69pdDxF?filename=Screenshot%202023-08-13%20at%202.52.02%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Piece by piece",
                description: "The article will be generated automatically, section by section. This step-by-step process ensures a comprehensive and well-structured piece.",
                image: "https://ipfs.io/ipfs/QmUY7ekkyJEv3DR8my5u7jTQcdHYbU8mRaRMYhnsw9aYBu?filename=Screenshot%202023-08-13%20at%202.53.26%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Customized perfection",
                description: "You can easily edit the entire article yourself. Highlight the text you want to change, and you'll see a toolbar with options to modify the font, etc.",
                image: "https://ipfs.io/ipfs/QmVrxzmJuih1KFtLxZfsHsabrcPwM1BF4PwjegDzj1cypM?filename=Screenshot%202023-08-13%20at%203.02.23%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Edit anytime",
                description: "Article is being saved automatically, so you can always revisit your generated work and instruct AI via the panel on your right to make additions. This feature allows for continuous improvement and updates.",
                image: "https://ipfs.io/ipfs/QmWBeX3edutTwi6FA4ZwFFGYMjPMBsV2LWWJX5FTiDfSKo?filename=Screenshot%202023-08-13%20at%202.58.56%20PM.png"
            },
        ],
        useCases: [
            {
                icon: BsCreditCard2Front,
                title: "Article Generation",
                description: `By using the Copywriter feature, companies can generate high-quality articles that position them as industry leaders. This not only attracts potential clients but also builds credibility in the market. The AI can create articles based on the company's brief, saving time and resources while ensuring the content is relevant and engaging.`,
            },
            {
                icon: IoPhonePortraitOutline,
                title: "Blog Post Creation",
                description: "Marketing agencies can leverage this feature to create personalized blog posts for their clients. The AI can generate content that resonates with the target audience, increasing engagement and brand visibility. This can lead to higher conversion rates and improved client satisfaction.",
            },
            {
                icon: BsBook,
                title: "SEO Content",
                description: `With the Copywriter feature, companies can improve their website's search engine ranking. The AI can create SEO-optimized content based on selected keywords and high-ranking Google search links. This can lead to increased website traffic, higher lead generation, and improved sales.`
            },
            {
                icon: BsBook,
                title: "Ranking Lists",
                description: `This feature can be used by companies and marketing agencies to create ranking lists that highlight their products or services' unique selling points. The AI can generate a comprehensive list based on the defined criteria, which can be used in marketing campaigns to attract more customers and increase sales.`
            },
            {
                icon: BsBook,
                title: "Tutorials",
                description: `Companies can use the Copywriter feature to create step-by-step tutorials for their products or services. This can help customers understand the product better, leading to increased usage and customer satisfaction. The AI can generate easy-to-follow tutorials based on the learning objectives defined by the company, making it a valuable tool for customer education and support.`
            },
        ]
    },
]