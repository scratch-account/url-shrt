function Form() {
  const registerUser = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        name: event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    // result.user => 'Ada Lovelace'
  }

  return (
    <form onSubmit={registerUser}>
      <label htmlFor='url'>URL</label>
      <input id='url' name='url' pattern='https?://.+' required type='url' />
      <button type='submit'>Shorten it!</button>
    </form>
  )
}

export default Form
