export default function About() {
  return (
    <div>
      <h1>Missions</h1>

      <ol className="list list-decimal">
        {[
          'Récupérer le formulaire posté (https://reactrouter.com/start/framework/actions)',
          `Chercher l'endroit au bon endroit (bdd/api météo)`,
          `Mettre à jour la bdd, ajouter l'endroit au besoin, le mettre à jour au besoin`,
          `Afficher les endroits préférés de l'utilisateur connecté`,
          `Pemettre de supprimer`,
          `S'amuser avant tout`,
        ].map((text, i) => <li key={i}>{text}</li>)}
      </ol>
    </div>
  )
}