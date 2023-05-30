const Filter = ({filterNumbers, filterText}) => {
  return (
    <div>
      <p style={{display: "inline", padding: "10px"}}>Filter shown with</p>
      <input value={filterText} onChange={filterNumbers}/>
    </div>
  )
}

export default Filter