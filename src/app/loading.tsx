import {BiLoaderAlt} from "react-icons/bi"

const Loading = async () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center'>
      <BiLoaderAlt size={50} className="fill-rose-500 animate-spin" />
    </div>
  )
}

export default Loading
