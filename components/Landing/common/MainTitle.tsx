
const MainTitle = (props: {children: any}) => {
    return (
        <h1 style={{lineHeight: "1.2"}} className="text-[9vw] px-4 inline-block lg:text-7xl max-w-6xl font-medium text-gray-800 text-center">
            {props.children}
        </h1>
    )
}


export default MainTitle;

