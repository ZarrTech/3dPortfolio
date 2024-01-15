const Alert = ({type, text}) => {
  return (
      <div className=" absolute  top-[80px] right-0 left-0 flex justify-center items-center">
          <div className={`${type === 'danger' ? 'bg-red-800' : 'bg-blue-800'} p-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex items-center gap-4`} role="alter">
              <p className={`${type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}  p-1`}>{type === 'danger'? 'failed': 'success' }</p>
              <p>{text }</p>
          </div>
    </div>
  )
}
export default Alert