const Centered = (props: {children: any}) => {
    return (
        <div style={{display: "flex", width: "100%", justifyContent: "center",  position: "relative"}}>
            {props.children}
        </div>
    )
}

export default Centered;