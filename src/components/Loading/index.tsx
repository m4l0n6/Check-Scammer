interface LoadingProps {
  border: string;
  width: string;
  height: string;
}

function Loading(props: LoadingProps) {
  return (
    <div
      className={`border-[7px] ${props.border} ${props.width} ${props.height}  border-t-[var(--textcolor)] border-r-transparent border-b-[var(--textcolor)] border-l-transparent rounded-full animate-loading`}
    ></div>
  );
}

export default Loading;
