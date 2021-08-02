export default function Custom404() {
  return (
    <div className='container'>
      <h1>404 - Page Not Found</h1>
      <p>
        It looks like you've followed a bad link or maybe there is a typo in
        your URL.
      </p>
      <p>
        <strong>(Note: shortened URLs are case sensitive).</strong>
      </p>
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </div>
  )
}
