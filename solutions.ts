import {
    DocumentTextIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    MegaphoneIcon,
    UserGroupIcon,
    AdjustmentsHorizontalIcon,
    TagIcon,
    CircleStackIcon,
    MagnifyingGlassIcon
  } from '@heroicons/react/24/outline'
import llmDashbaord from './public/images/fine_tune_dashboard.png';
import shoppingDashboard from "./public/images/shopping_assistant_dashboard.png";
import audienceTargetingDashboard from "./public/images/persona_dashboard.png";
import dashboardVisualization from "./public/images/dashboard_visualization.png"
import competitionResearchDashboard from "./public/images/competition_research_dashboard.png";
import toneDashboard from "./public/images/tone_dashboard.png";
import dataDashboard from "./public/images/data_dashboard.png";
import profileDashboard from "./public/images/profile_dashboard.png";

export const solutions = [
    {
        query: "data-retrieval",
        icon: CircleStackIcon,  
        mainImage: llmDashbaord,
        title: "Data Retrieval",
        mainTitle: "Utilize Your Data & Enhance Content Creation",
        description: "Train the platform about your business and clients by uploading relevant data as files, scraped websites, or video transcripts. With this expanded knowledge, Yepp delivers captivating content that consistently keeps you ahead of the game.",
        imageSections: [
            {
                title: "Leverage Expert Knowledge",
                description: "Other AI solutions often face challenges with hallucinations or inaccuracies stemming from insufficient information. Yepps Data Retrieval resolves this issue by absorbing extensive knowledge, ensuring you can trust the quality of the text generated.",
                imageURL: "https://img.freepik.com/free-photo/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless_273609-55621.jpg?w=1060&t=st=1699654749~exp=1699655349~hmac=64d5994a6c4419075028dfb5c7e13f48ea85fcee9e56f2429bee528bd9b637e9"
            },
            {
                title: "Embrace Intuitive Data Management",
                description: "The Data Retrieval solution boasts an intuitive design that simplifies data management for everyone, no IT skills required. Its user-friendly interface allows seamless data uploading and segmentation, making AI-powered content creation accessible to all team members.",
                imageURL: "https://images.pexels.com/photos/8485714/pexels-photo-8485714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
        ],
        overview: [
            {
                title: "Improved Content Quality",
                description: "With the AI having access to a wide array of contextual information, the quality of the generated content is higher, as it draws from a rich and relevant knowledge base."
            },
            {
                title: "Scalability",
                description: "As the volume of clients or projects increases, the system easily scales to accommodate more data without a proportional increase in workload, making it ideal for growing agencies."
            },
            {
                title: "Time Efficiency",
                description: "By uploading various forms of data once, marketers save time in the repeating processes. This centralized data repository eliminates the need for repetitive searches or manual data entry."
            },
            {
                title: "Content Relevance",
                description: "By segmenting data into designated folders, marketers ensure that the content created is highly relevant and tailored to specific clients."
            },
        ],
    },
    {
        query: "clients-management",
        title: "Clients Management",
        icon: UserGroupIcon,
        mainImage: profileDashboard,
        mainTitle: "Empower Team and Clients with Streamlined Management",
        description: "Structure your agency's client profiles and streamline task assignments with management features. Utilize the Calendar to plan and share proposed content, ensuring alignment with each client.",
        imageSections: [
            {
                title: "Amplify Client Satisfaction",
                description: "Where marketing platforms falter in aligning with your Agency’s needs, Client Management solution excels. By crafting tailored content, and fostering project insights, Yepp guarantees elevated client satisfaction and cements lasting relationships.",
                imageURL: "https://img.freepik.com/free-photo/smiley-business-man-woman-working-together-office-with-laptop_23-2149206530.jpg?w=1060&t=st=1699660164~exp=1699660764~hmac=a2d19081bec6d6bea2a0607896464d89fe29fde5dc15c661bf3d594d5158fefa"
            },
            {
                title: "Optimize Team Operations",
                description: "Agency's Client Profiles ensure intuitive data retrieval and enable precise content personalization. This organized approach streamlines workflow, empowering agencies to focus more on strategy and client engagement.",
                imageURL: "https://img.freepik.com/free-photo/close-up-young-colleagues-having-meeting_23-2149060289.jpg?w=1060&t=st=1699660309~exp=1699660909~hmac=c2b29c62d6bfa36b640bfa025eb910d1d4b950d3299b8f3e9ef8d589007da537"
            },
        ],
        overview: [
            {
                title: "Client Profiles",
                description: "Organize your clients and utilize Yepp's features to create detailed profiles. Upload relevant data or briefs, identify each client's unique tone of voice and buyer persona, and get an summary of their competition."
            },
            {
                title: "Content Calendar",
                description: "Accelerate personalized content creation and then schedule its deployment for an overview of upcoming marketing initiatives. Share this content with your client, inviting their approval or suggestions for enhancement."
            },
            {
                title: "Team Task Assignment",
                description: "Effortlessly assign tasks to suitable team members and improve team’s efficiency. Ensure every project benefits from the right skills at the right time. It optimizes team synergy and project outcomes."
            },
            {
                title: "Team Task Assignment",
                description: "Effortlessly assign tasks to suitable team members and improve team’s efficiency. Ensure every project benefits from the right skills at the right time. It optimizes team synergy and project outcomes."
            },
        ]
    },
    {
        query: "data-driven-content",
        title: "Data-Driven Content",
        icon: DocumentTextIcon,
        mainImage: dataDashboard,
        mainTitle: "Conquer Search Results With Data Precision and Creative Flair",
        description: "Feed the AI with your unique data sets, enabling it to delve into any topic with substance and style. Whether tackling niche subjects or trending themes, our solution ensures your content stands out.",
        imageSections: [
            {
                title: "Elevate Your SEO Rankings",
                description: "Harness the power of data-driven intelligence to create customized content that elevates your search engine presence. With Yepp, you'll forge content that not only meets but exceeds expectations, catapulting rankings and establishing online authority.",
                imageURL: "https://img.freepik.com/free-photo/person-office-analyzing-checking-finance-graphs_23-2150377136.jpg?w=1060&t=st=1699660458~exp=1699661058~hmac=3c8356cd5a147cbdde4607927230c82fa489cc94ee5fa1f95cfd7895e822a45a"
            },
            {
                title: "Stand Out in a Crowded Digital Landscape",
                description: "We understand that one of the biggest hurdles in content creation is maintaining a fresh, creative edge—especially when managing a broad portfolio of clients or projects. That's where Yepp steps in. Our fine-tuned AI crafts content that’s truly original and impactful.",
                imageURL: "https://img.freepik.com/free-photo/monochrome-pieces-chess-board-game_23-2150378625.jpg?w=1060&t=st=1699660624~exp=1699661224~hmac=6f32e3cad1004596f999d25486c4e6848281e3b5cd958cab178b7210c30df109"
            },
        ],
        overview: [
            {
                title: "Article Copywriting",
                description: "Craft compelling articles that establish your brand as a thought leader in your industry, drawing in potential clients and solidifying your market credibility. Our AI system streamlines the process, crafting content directly from your brief—saving you time and resources."
            },
            {
                title: "SEO Content",
                description: "Enhance your website's position in search engine results with SEO-enriched content. By focusing on relevant keywords and mirroring the patterns of successful Google search entries, you can drive more traffic, generate more leads, and increase sales."
            },
            {
                title: "Ads Copy",
                description: "Unleash the potential of your ad campaigns with precision-crafted copy. Outline your key objectives, and let AI handle the rest. From captivating headlines to persuasive descriptions, and accurate keywords, our AI generates content that converts, and propels your brand to new heights."
            },
            {
                title: "Social Media Posts",
                description: "Elevate your social media engagement without the hassle. Select your preferred platform, define your content objectives, and witness as AI skillfully produces material that sparks meaningful interactions, building a vibrant and connected online community."
            },
            {
                title: "Product Descriptions",
                description: "Transform your product listings with data-backed descriptions that engage and convert. AI crafts compelling narratives that highlight key features and benefits. With Yepp, your product descriptions will not only interest customers but also drive sales, elevating your store's performance."
            },
            {
                title: "Newsletters",
                description: "Provide your company's insights, and let AI take over to craft captivating email campaigns for your audience. Yepp blends narrative finesse with factual precision, creating newsletters build enduring connections with your subscribers, enhancing your brand's narrative in every inbox."
            },
            {
                title: "Press Releases",
                description: "Empower your PR with data-enriched press releases. Yepp crafts narratives that capture media attention. By combining actual data with persuasive storytelling, our platform ensures your press releases gain visibility and amplify your brand's presence, making every announcement a noteworthy event."
            },
        ]
    },
    {
        query: "tone-consistency",
        title: "Tone Consistency",
        icon: MegaphoneIcon,
        mainImage: toneDashboard,
        mainTitle: "Maintain Your Unique Tone and Foster Customer Loyalty",
        description: "Fine-Tune the LLM to consistently reflect your brand's character. Customize the AI to your specific needs and leverage its scalability.",
        imageSections: [
            {
                title: "Enhance Audience Engagement",
                description: "Yepp is designed to learn from your content history and fine-tune the language model, guaranteeing that your brand's voice remains consistent. In result you build stronger connections with your audience that drive interactions and engagement.",
                imageURL: "https://img.freepik.com/free-photo/female-african-american-speaker-giving-presentation-hall-university-workshop_155003-3578.jpg?w=1060&t=st=1699660806~exp=1699661406~hmac=5d365bfe398931453fe9f74aecdcce3d6c1dacb47d9ff775d2cd2a19f35ce227"
            },
            {
                title: "Personalize Content at Scale",
                description: "With a fine-tuned language model that understands your brand's voice, you can automate personalized content creation effortlessly. This boosts your content's effectiveness across diverse audience segments, helping your marketing efforts resonate with different target groups and connect with a wide range of customers.",
                imageURL: "https://img.freepik.com/free-photo/woman-with-pen_144627-22633.jpg?w=1060&t=st=1699660909~exp=1699661509~hmac=28b261add2d9c58c38c23dfdf2908404156da35788ca79b64df42822001a352b"
            },
        ],
        overview: [
            {
                title: "Improved SEO",
                description: "Consistent messaging significantly contributes to better SEO performance. Search engines not only recognize but also reward thematic consistency, resulting in improved search rankings and increased visibility for your content."
            },
            {
                title: "Customer Loyalty",
                description: "Customers appreciate the reliability and predictability of your brand's communication, which deepens their connection with your offerings and values."
            },
            {
                title: "Cost Savings",
                description: "By minimizing the need for extensive revisions and rewrites, it results in significant cost savings associated with content production. This efficiency allows you to allocate resources more effectively, directing your budget towards other critical marketing initiatives."
            },
            {
                title: "Unified Marketing Efforts",
                description: "It ensures that all marketing channels, from social media to email campaigns, speak in a unified voice, enhancing cross-channel marketing efforts. This consistency improves customer recognition, creating a cohesive and memorable brand experience."
            }
        ]
    },
    {
        query: "competition-research",
        title: "Competition Research",
        icon: MagnifyingGlassIcon,
        mainImage: competitionResearchDashboard,
        mainTitle: "Mastering the Market with Competition Insights",
        description: "By understanding the strengths and vulnerabilities of your rivals, you can tailor your strategies to not just compete, but to lead and redefine the market.",
        imageSections: [
            {
                title: "Elevate Competitive Strategy",
                description: "Take a close look at what your competitors are doing online, checking things like how popular their websites are and what words they use to get noticed. We combine this with what makes your brand special, helping you create smarter marketing plans that make you stand out and grow faster.",
                imageURL: "https://img.freepik.com/free-photo/close-up-young-colleagues-having-meeting_23-2149060279.jpg?w=1060&t=st=1699661141~exp=1699661741~hmac=74009e481957c4518d20b47de1dca26732a396bdb87f017653e4b711d47abf84"
            },
            {
                title: "Fine-Tune Your Brand Story",
                description: "Get to know what makes your competitors special and how they talk to their customers. Use these insights to make your own brand's story clearer and more appealing. This helps you connect better with your audience, making your brand more memorable and keeping customers interested.",
                imageURL: "https://img.freepik.com/free-photo/people-working-their-office_23-2149196409.jpg?w=1060&t=st=1699661176~exp=1699661776~hmac=c5ebef25be7d27ce919e2ae2641bafcb688e4602d9823eac8e12e079e4e7ff31"
            },
        ],
        overview: [
            {
                title: "Informed Strategy Development",
                description: "By understanding where your competitors stand in terms of website rankings and keyword usage, you can tailor your SEO and content strategies more effectively to capture market share."
            },
            {
                title: "Unique Value Proposition (UVP) Clarity",
                description: "Analyzing competitors’ UVPs allows you to refine your own, ensuring it resonates more distinctly and powerfully with your target audience."
            },
            {
                title: "Leveraging Strengths and Weaknesses",
                description: "Identifying the strengths and weaknesses of competitors provides critical insights, enabling you to amplify your own advantages and exploit market gaps."
            },
            {
                title: "Risk Management",
                description: "Awareness of competitors’ strategies and performance helps anticipate market shifts, allowing for proactive adjustments to your approach."
            }
        ]
    },
    {
        query: "audience-targeting",
        title: "Audience Targeting",
        icon: UserIcon,
        mainImage: audienceTargetingDashboard,
        mainTitle: "AI-Enhanced Targeting for Peak Engagement",
        description: "Leverage machine learning to precisely identify key audience segments. This fine-tuned approach elevates engagement and optimizes the impact of your marketing campaigns.",
        imageSections: [
            {
                title: "Maximize User Interactions",
                description: "Our platform integrates advanced Large Language Models (LLMs) with your company-specific data to analyze user behavior, preferences, and historical interactions. This synergy ensures your marketing content is not just broadly targeted but fine-tuned to provoke active engagement, thereby increasing likes, shares, and conversions.",
                imageURL: "https://img.freepik.com/free-photo/authentic-beautiful-good-looking-asian-woman-walking-with-laptop-living-room-starting-work-remotelly-work-from-home-internet-web-online-user-freelancer-home-office-starting-her-work-day_482257-48045.jpg?w=1060&t=st=1699661344~exp=1699661944~hmac=10c05bc34e9768624b7ca34a60f585bc2d11dea20d5e06f4bcc31fbdb5fab2ce"
            },
            {
                title: "Boost Your Returns",
                description: "By leveraging LLMs along with your unique company data, our solution identifies the most valuable audience segments for your campaigns. This highly focused approach allows for a more efficient use of your marketing budget, thereby maximizing your return on investment.",
                imageURL: "https://img.freepik.com/free-photo/dark-silhouettes-man-woman-sitting-with-mugs-office-chairs-front-window_1098-20200.jpg?w=1060&t=st=1699661395~exp=1699661995~hmac=0fe028afba0e31ee9a3eeb2379b0202487898678d9839acf64cfcc8d380cdd2d"
            },
        ],
        overview: [
            {
                title: "Precision Targeting",
                description: "It removes the guesswork from identifying your most receptive audience segments, enabling you to reach the right people with the right message."
            },
            {
                title: "Increased Engagement",
                description: "By targeting more precisely, you're likely to see higher rates of engagement, be it clicks, likes, shares, or other desired actions."
            },
            {
                title: "Optimized Campaign Performance",
                description: "Knowing who to target means fewer wasted impressions and clicks, ultimately leading to a more efficient use of your marketing budget."
            },
            {
                title: "Improved ROI",
                description: "With more effective targeting and higher engagement, you're positioned to get a better return on your marketing investments."
            }
        ]
    },
    {
        query: "creative-chat",
        title: "Creative Chat",
        icon: ChatBubbleBottomCenterTextIcon,
        mainImage: dashboardVisualization,
        mainTitle: "Turn Your Data into Creative Chat",
        description: "Unleash the full potential of your marketing initiatives as the Creative Chat integrates your inputs to generate innovative campaign ideas, data-driven strategies, compelling offers, and high-quality content, all tailored to exceed your business goals.",
        imageSections: [
            {
                title: "Ensure Creative Edge",
                description: "Marketers know that innovation is the lifeblood of effective campaigns. This solution uses your uploaded information to generate unique campaign ideas that can set you apart from the competition. By providing fresh, data-informed perspectives, it helps you break through the noise and capture audience attention.",
                imageURL: "https://img.freepik.com/free-photo/unrecognizable-woman-sitting-desk-indoors-writing-planner_1098-17626.jpg?w=1060&t=st=1699661777~exp=1699662377~hmac=d95a8e48a6354dda130fc831e01959dcd3bc1a769da57fd33874b79fc64a6d49"
            },
            {
                title: "Optimize Streamlined Operations",
                description: "In the fast-paced world of marketing, efficiency is key. The capability to upload all essential documents and data into one platform means less time spent juggling multiple tools and databases. Centralizing your key documents eliminates the confusion of managing multiple files, making it easier to focus on what really matters, freeing your team to concentrate on strategic execution and creative brainstorming.",
                imageURL: "https://img.freepik.com/free-photo/person-office-analyzing-checking-finance-graphs_23-2150377136.jpg?w=1060&t=st=1699662299~exp=1699662899~hmac=4628dbe49bdc7fbe85706c177a2bc9a3ee241d741a0f0a5716620d57ed5becdb"
            },
        ],
        overview: [
            {
                title: "Innovative Campaign Ideas",
                description: "Automatically generate fresh and effective campaign concepts based on specific business needs."
            },
            {
                title: "Data-Driven Strategies",
                description: "Utilize sophisticated analytics to formulate marketing strategies that are rooted in empirical data."
            },
            {
                title: "Streamlined Campaign Planning",
                description: "Centralize all necessary documents and requirements in one platform, making it easier to plan and initiate campaigns."
            },
            {
                title: "Multi-Point Data Analysis",
                description: "Examine a wide array of data inputs, from customer behavior to market trends, for a holistic understanding of your campaign's potential impact."
            }
        ]
    },
    {
        query: "shopping-chatbot",
        title: "Shopping Chatbot",
        icon: TagIcon,
        mainImage: shoppingDashboard,
        mainTitle: "Win Customers by Introducing AI into Your Sales Funnel",
        description: "The feature serves as a virtual sales assistant, constantly available to guide customers towards making a purchase, thereby increasing both engagement and sales.",
        imageSections: [
            {
                title: "Store-Like Experience",
                description: "Traditional A/B chatbots often fall short in mimicking the in-store experience online. However, your Shopping Assistant serves as a highly informed and readily available sales advisor, much like an in-person assistant in a physical store, engaging customers in meaningful ways to encourage purchases.",
                imageURL: "https://img.freepik.com/free-photo/portrait-woman-customer-service-worker_144627-37946.jpg?w=1060&t=st=1699662363~exp=1699662963~hmac=251eb371ba6cec5a05df3740eea8456ae483dced232f93466741efc50c25ca7f"
            },
            {
                title: "Global Customer Engagement",
                description: "The Shopping Assistant is equipped with cultural recognition, geolocation-based language detection, and multi-language support. This ensures a seamless, personalized shopping experience that transcends geographical and linguistic barriers, making your brand accessible and appealing to a global audience.",
                imageURL: "https://img.freepik.com/free-photo/empire-state-building-seen-from-apartment_23-2150897591.jpg?t=st=1699663700~exp=1699667300~hmac=4b270a60e53380b1a9504a37e1173b8e1c583d0bd855e5081655ab6533c0c36a&w=900"
            },
        ],
        overview: [
            {
                title: "Real-Time Product Knowledge",
                description: "The feature taps into a live database of products, ensuring the most current and relevant recommendations. This minimizes the chances of recommending out-of-stock or outdated items, which enhances customer satisfaction and trust."
            },
            {
                title: "Industry Context",
                description: "By understanding the broader industry, the Shopping Assistant can anticipate trends, seasonality, and customer preferences, allowing for more strategic engagement and upselling opportunities. This contextual knowledge gives you an edge over competitors who may not have such capabilities."
            },
            {
                title: "Dynamic Sales Enablement",
                description: "With real-time data and contextual understanding, the Shopping Assistant can pitch bundle deals, discounts, and recommendations in an informed and timely manner, directly impacting the sales conversion rate."
            },
            {
                title: "24/7 Customer Engagement and Service",
                description: "Operating around the clock, the chatbot not only ensures that potential customers receive immediate, helpful product advice at any hour but also serves as a 24/7 customer service representative."
            }
        ]
    },
    {
        query: "fine-tuning",
        title: "LLM Fine-Tuning",
        icon: AdjustmentsHorizontalIcon,
        mainImage: llmDashbaord,
        mainTitle: "Customize AI to Your Needs for Ultimate Personalization",
        description: "Gain a Competitive Advantage through Own Custom AI Model, trained on Your Company’s Data.",
        imageSections: [
            {
                title: "AI Supercharges Marketing. Personalized AI Takes It To Another Level",
                description: "At Yepp, we believe AI has revolutionized marketing. To thrive in this era, adaptability is key. Embracing AI in its generic form isn’t enough; to truly excel, you must take the next step. We empower you to train AI on your company's unique data, customizing it to your exact needs. This sets you apart from competitors, providing a second brain for outperformance.",
                imageURL: "https://img.freepik.com/free-photo/outdoor-shot-curly-haired-female-student-sits-outdoors-front-opened-laptop-computer-writes-down-notes-notepad-prepares-lesson-poses-against-modern-city-building-e-learning-concept_273609-62296.jpg?w=1060&t=st=1699665536~exp=1699666136~hmac=ea14c012351bc13c58926ce48d7dd4d4a447f76229c21c9032cf2eca87f9d670"
            },
        ],
        overview: [
            {
                title: "Data-Driven Decision Making",
                description: "Leverage insights from the model trained on company's data to make data-driven marketing decisions and enhance strategies."
            },
            {
                title: "Increased ROI",
                description: "Maximize return on investment by tailoring your marketing efforts to precisely match preferences for higher conversions and financial impact."
            },
            {
                title: "Streamlined Marketing Efforts",
                description: "Optimize your marketing campaigns with AI that understands your company’s tone, style, and facts, saving valuable time and resources in content creation."
            },
            {
                title: "Market Differentiation",
                description: "Stand out in a crowded market by offering highly personalized marketing services that cater to each client's distinct requirements, ensuring unparalleled customer satisfaction."
            }
        ]
    },
]