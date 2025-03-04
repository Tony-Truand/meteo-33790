export default function About() {
  return (
    <div>
      <h1>Mission</h1>

      <ol>
        {[
          'Un',
          'Deux',
          'Trois',
          'Quatre',
        ].map((text, i) => <li key={i}>{text}</li>)}
      </ol>
    </div>
  )
}