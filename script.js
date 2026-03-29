const generateColor = () => {
  const hex = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0')
  document.body.style.backgroundColor = hex
  document.getElementById('hex').innerText = hex.toUpperCase()
}

window.addEventListener('keydown', e => {
  if (e.code === 'Space') generateColor()
})

window.addEventListener('click', generateColor)
