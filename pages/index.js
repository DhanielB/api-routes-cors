export default function Index() {
  return (
    <p>
      To test the CORS route, open the console in a new tab on a different
      domain and make a POST / GET / OPTIONS request to <b>/api/cors</b>. Using
      a different method from those mentioned will be blocked by CORS
    </p>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getServerSideProps() {
  await delay(5000)
  return
}