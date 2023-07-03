import styled from "styled-components";
import Title from "../Common/Title";
import Text from "./common/Text";
import Subtitle from "./common/Subtitle";
import Space from "./common/Space";
import RequestType from "./common/RequestType";
import TitleDescription from "./common/TitleDescription";
import EndpointContainer from "./common/EndpointContainer";
import SubSubTitle from "./common/SubSubTitle";
import UrlContainer from "./common/UrlContainer";
import EndpointContainerColumn from "./common/EndpointContainerColumn";
import {documentation} from "../../apiDocumentation";

const ApiDocumentation = () => {
    return (
        <div color="black">
            <Title fontSize={"2.4rem"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize={"2rem"} mobileTextAlign={"left"}>
                API Documentation
            </Title>
            <Space margin="0.5rem 0 0 0"/>
            <TitleDescription>
               Our API enables you to integrate your application with your custom AI Assistants.
            </TitleDescription>
            <div>
                {documentation.map(endpoint => (
                    <div key={endpoint.path}>
                        <Space margin="3rem 0 0 0"/>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <RequestType requestType={endpoint.type.toUpperCase()}/>
                            <Subtitle>{endpoint.path}</Subtitle>
                        </div>
                        <Space margin="1rem 0 0 0"/>
                        <TitleDescription>{endpoint.description}</TitleDescription>
                        <Space margin="1rem 0 0 0"/>
                        <UrlContainer>{endpoint.url}</UrlContainer>
                        <Space margin="1rem 0 0 0"/>
                        <div className="w-full bg-gray-50 flex items-start justify-end">
                        <div className="w-full bg-gray-800 shadow-xl rounded-xl overflow-scroll">
                            <div id="header-buttons" className="py-3 px-4 flex">
                                <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                                <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
                                <div className="rounded-full w-3 h-3 bg-green-500"></div>
                            </div>
                            <div id="code-area" className="pb-6 pt-2 px-8 mt-1 text-white text-base">
                            <pre>
                                <code>
                                {`${endpoint.code}`}
                                </code>
                            </pre>
                            </div>
                        </div>
                        </div>
                        <Space margin="1rem 0 0 0"/>
                        <EndpointContainer>
                            <EndpointContainerColumn>
                                <Space margin="1rem 0 0 0"/>
                                <SubSubTitle>Headers</SubSubTitle>
                                <Space margin="0.5rem 0 0 0"/>
                                {endpoint.headers.map(header => (
                                    <>
                                        <Bulletpoint><b>{header.title}</b></Bulletpoint>
                                        <p>{header.description}</p>
                                    </>
                                ))}
                                {endpoint.urlParams.length > 0 &&
                                <>
                                <Space margin="1rem 0 0 0"/>
                                <SubSubTitle>Url Params</SubSubTitle>
                                <Space margin="0.5rem 0 0 0"/>
                                {endpoint.urlParams.map(param => (
                                    <>
                                        <Bulletpoint><b>{param.title}</b> ({param.paramType})</Bulletpoint>
                                        <p>{param.description}</p>
                                    </>
                                ))}
                                </>
                                }
                                {endpoint.body.length > 0 &&
                                <>
                                <Space margin="1rem 0 0 0"/>
                                <SubSubTitle>Body</SubSubTitle>
                                <Space margin="0.5rem 0 0 0"/>
                                {endpoint.body.map(body => (
                                    <>
                                        <Bulletpoint><b>{body.title}</b> ({body.paramType})</Bulletpoint>
                                        <p>{body.description}</p>
                                    </>
                                ))}
                                </>
                                }
                            </EndpointContainerColumn>
                            <EndpointContainerColumn>
                                <Space margin="1rem 0 0 0"/>
                                <SubSubTitle>Response</SubSubTitle>
                                <Space margin="0.5rem 0 0 0"/>
                                {endpoint.response.map(response => (
                                    <>
                                        <Bulletpoint><b>{response.title}</b> ({response.paramType})</Bulletpoint>
                                        <p>{response.description}</p>
                                    </>
                                ))}
                            </EndpointContainerColumn>
                        </EndpointContainer>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ApiDocumentation;

const Bulletpoint = styled.li`
    margin-top: 0.5rem;
`