const Child = ({temp, setTemp}) => {
  return <>
    <div>I am child component</div>
    <div>This is child value: {temp}</div>
    <input type="text" onChange={(e) => setTemp(e.target.value)} />
  </>
}
export default Child;