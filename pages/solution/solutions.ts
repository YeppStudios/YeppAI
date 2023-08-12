import { AiOutlineCloudUpload, AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RxInput } from "react-icons/rx";
import { BsCreditCard2Front, BsBook, BsFileText } from "react-icons/bs";
import { IoBookOutline, IoPhonePortraitOutline } from "react-icons/io5"
import { GoMail, GoChecklist } from "react-icons/go";

export const solutions = [
    {
        query: "marketing-templates",
        title: "Marketing Templates",
        description: "Watch AI write insightful content on niche topics.",
        image: "https://ipfs.io/ipfs/QmWc35PvypbtJEAmgiwEJ345hKN1HUF1Nn4zWnwNpzDUcc?filename=Screenshot%202023-08-12%20at%202.54.46%20PM.png",
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
                image: "https://ipfs.io/ipfs/QmWc35PvypbtJEAmgiwEJ345hKN1HUF1Nn4zWnwNpzDUcc?filename=Screenshot%202023-08-12%20at%202.54.46%20PM.png"
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
        description: "Let AI understand you by upload the content about you & your clients.",
        image: "https://ipfs.io/ipfs/QmPeeFNt3yFySQ47VsGkTMTvuUd95Bvf8TWXC7nrXZnpJc?filename=Screenshot%202023-08-12%20at%203.19.31%20PM.png",
        tutorial: [
            {
                icon: AiOutlineCloudUpload,
                title: "Choose upload method.",
                description: "Upload information in various formats: PDF, TXT, PPTX, CSV & DOCX files, Websites and social media, YouTube audio, or just write content that your AI should know.",
                image: "https://ipfs.io/ipfs/QmPeeFNt3yFySQ47VsGkTMTvuUd95Bvf8TWXC7nrXZnpJc?filename=Screenshot%202023-08-12%20at%203.19.31%20PM.png"
            },
            {
                icon: RxInput,
                title: "Assign data to folders.",
                description: "When you upload a file, you'll need to decide where to store it. You can make a new folder specifically for this file, or you can select a folder that you've already created.",
                image: "https://ipfs.io/ipfs/QmbZYHodom6rbQ2xeQJ7rDFn7aYuQ2vGGD4325KKsBZQWa?filename=marketing-templates-2.png"
            },
            {
                icon: FiEdit3,
                title: "Edit existing folders.",
                description: "You have the ability to delete and preview each file that you've uploaded to the designated folder. However, opening these files is not possible as they are stored in a vector base.",
                image: "https://ipfs.io/ipfs/QmWKd7XyRZTYVuPSG8MzSNhX6ovPJg3wq9CxZZinD4ghqB?filename=marketing-templates3.png"
            },
        ],
        useCases: [
            {
                icon: BsCreditCard2Front,
                title: "Files & Presentations",
                description: "These can be in the form of PDF, TXT, DOCX, PPTX, or CSV files. These documents can contain important information about the company, its products or services, and its clients.",
            },
            {
                icon: IoPhonePortraitOutline,
                title: "Web Content",
                description: "This can include the company's website, blog posts, articles, and other web-based content. This information can help the AI understand the company's online presence and its interactions with customers.",
            },
            {
                icon: BsBook,
                title: "Social Media Content",
                description: "This includes posts, comments, likes, shares, and other interactions on social media platforms like Facebook, Twitter, Instagram, LinkedIn, etc. This data can provide insights into the company's social media strategy and customer engagement.",
            },
            {
                icon: BsFileText,
                title: "Audio Content",
                description: "Yepp supports uploading YouTube video audio. Upload podcasts, interviews, tutorials and much more. AI will transcribe and remember the content, so later on you will be able to chat with it  and generate  insightful content across the entire platform.",
            },
            {
                icon: GoMail,
                title: "Marketing emails",
                description: "Our comunity is full of proliftic developers, creative builders, and fantastic teachers. Check out YouTube tutorials for great tutorials from folks in the comunity, and Gallery for a list of awesome LangChain projects.",
            },
        ]
    },
    {
        query: "campaigns",
        title: "Content Campaigns",
        description: "Create content campaigns for all placements at once.",
        image: "https://ipfs.io/ipfs/QmdVLFSFZM7LnSXXVUojh1tpcsuPUTmmay85SSZHVvs7y1?filename=Screenshot%202023-08-12%20at%202.31.42%20PM.png",
        tutorial: [
            {
                icon: AiOutlineCloudUpload,
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
                icon: FiEdit3,
                title: "Enter key information.",
                description: "Select uploaded asstets to make sure your campaign will include quality content. Then set the campaign’s objetive, target audience and add keywords for a better chance to reach you goal.",
                image: "https://ipfs.io/ipfs/QmehV4YBGBAjuEwMipea1pyFJ6BssmVkD9ghyMbd9hPVp8?filename=Screenshot%202023-08-12%20at%202.29.24%20PM.png"
            },
            {
                icon: FiEdit3,
                title: "Watch AI create.",
                description: "Creation time! Check the fruit of your and Yepp's labor. You can change campaign’s settings and give AI the command to rewrite it anytime.",
                image: "https://ipfs.io/ipfs/QmdVLFSFZM7LnSXXVUojh1tpcsuPUTmmay85SSZHVvs7y1?filename=Screenshot%202023-08-12%20at%202.31.42%20PM.png"
            },
        ],
        useCases: [
            {
                icon: BsCreditCard2Front,
                title: "Product Launch",
                description: `Planning to introduce a new product to the market? Use the "Content Campaigns" feature to streamline your promotional efforts across multiple platforms. Describe the product details, set your target audience, and let the AI craft tailored content for all chosen placements.`,
            },
            {
                icon: IoPhonePortraitOutline,
                title: "Event Promotion",
                description: "Promote your upcoming events like webinars or conferences by setting up a campaign across various channels, with AI generating engaging content. For seasonal sales or special deals, launch a content campaign across all desired platforms and increase traffic and sales.",
            },
            {
                icon: BsBook,
                title: "Customer Engagement",
                description: `Launching a new loyalty program or customer feedback drive? Promote these initiatives with campaign feature. Yepp will automatically generate content and ideas for social media, ads, email marketing and even video scripts. All of that with just a few clicks using similar tone of voice. `
            },
        ]
    },
]