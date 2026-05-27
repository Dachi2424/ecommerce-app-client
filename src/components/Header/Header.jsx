import './Header.scss'
 
 
export default function Header({setAuthOpen}) {
 
  return (
    <header className='header'>
      <button onClick={() => setAuthOpen(true)}>login</button>
    </header>
  )
}