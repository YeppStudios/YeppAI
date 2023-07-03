import styled from "styled-components";

const RequestType = (props: {requestType: string}) => {
    return (
        <>
        {props.requestType === "GET" &&
            <GetContainer>
                GET
            </GetContainer>
        }
        {props.requestType === "POST" &&
            <PostContainer>
                POST
            </PostContainer>
        }
        </>
    )

}

export default RequestType;

const GetContainer = styled.div`
    width: 4rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #17DB7D;
    background-color: rgba(0, 255, 0, 0.2);
    margin-right: 1rem;
    border-radius: 7px;
`

const PostContainer = styled.div`
    width: 4rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #FF9900;
    background-color: rgba(230, 206, 35, 0.4);
    margin-right: 1rem;
    border-radius: 7px;
`