export default function Index({ data }) {
  return (
    <h1>{data}</h1>
    <p>
      To test the CORS route, open the console in a new tab on a different
      domain and make a POST / GET / OPTIONS request to <b>/api/cors</b>. Using
      a different method from those mentioned will be blocked by CORS
    </p>
  )
}

export async function getServerSideProps() {
  data = "test"
  return { props: { data } }
}