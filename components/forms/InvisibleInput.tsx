import useAutoWidth from "@/hooks/useAutoInputWidth";


function InvisibleInput(props: { value: any, onChange: any }) {
  const { inputRef, spanRef, inputWidth } = useAutoWidth();

  return (
    <div style={{ position: 'relative' }}>
      <input 
        type="text" 
        ref={inputRef} 
        value={props.value} 
        onChange={props.onChange}
        style={{ width: inputWidth }} 
        className="font-medium w-auto outline-none border-none"
      />
      <span 
        ref={spanRef} 
        style={{
          position: 'absolute',
          top: -9999,
          left: -9999,
          whiteSpace: 'pre',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          padding: '0',
        }}
      >
        {inputRef.current && inputRef.current.value}
      </span>
    </div>
  );
}

export default InvisibleInput;
