import useFetch from "../hooks/useFetch"

export default function MultipleMissions() {
  const [data] = useFetch("https://api.spacex.land/graphql/")
  
  return (
    <>
    <section className="py-32 max-width">
    <h1 className="heading text-center mb-10">
      missions
    </h1>
    <div>
      {data.lenght}
    </div>
    </section>
    </>
  )
}
