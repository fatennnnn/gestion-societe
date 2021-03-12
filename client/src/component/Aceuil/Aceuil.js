import "./Aceuil.css";
const Aceuil = () => {
  return (
    <div className="acceuil">
      <div className="acceuil__header">
        <div className="site__titre"></div>
        <div className="acceuil__header__main">
          <div className="acceuil__header__content">
            <h2>Finance</h2>
            <p className="acceuil__description">
              <span className="acceuil__highlight">Justcrok</span> est un groupe
              de sociétés spécialisées dans l’aide aux financements, la gestion
              financière (dite islamique) ou bancaire, du conseil juridique au
              placement de vos actifs.
            </p>
          </div>
          <div className="acceuil__header__content">
            <h2>Digitale</h2>
            <p className="acceuil__description">
              <span className="acceuil__highlight">Justcrok</span> est aussi un
              groupe d’agence digitale et numérique (ingénieurs et développeurs
              web).
            </p>
          </div>
        </div>
      </div>
      <div className="acceuil__service">
        <h2>Nos bureaux du groupe Justcrok sont en</h2>
        <div className="acceuil__service__content">
          <div className="acceuil__service__pays pays__fr">
            <p>France</p>
          </div>
          <div className="acceuil__service__pays pays__uk">
            <p>Royaume Uni</p>
          </div>
          <div className="acceuil__service__pays pays__tn">
            <p>Tunisie</p>
          </div>
        </div>
      </div>

      <div className="acceuil__all-services">
        <h2>Nos services</h2>
        <span className="service-text-line"></span>
        <div className="acceuil__all-services__content">
          <div className="acceuil__first-service">
            <div className="acceuil__first-service__bg"></div>
            <h3>Web</h3>
            <div className="acceuil__service-text">
              <p>
                Mise en place sur votre site avec live & replay prêche est
                prière mosquée / utilisateurs.
              </p>
              <p>
                Mise en place d’application web (Android et Apple) exemple
                horaire Salat
              </p>
              <p>Mise en place de plateforme de don.</p>
              <p>
                Mise en place de cryptomonnaies (portefeuille / juridique …)
              </p>
              <p>
                Bureau d’ingénieurs en Tunisie (développement d’IA / Algorithme)
                web Api
              </p>
              <p>
                100 % de nos serveurs et hébergement sont réservé à la
                communautés « Halal »
              </p>
            </div>
          </div>
          <div className="acceuil__second-service">
            <div className="acceuil__second-service__bg"></div>
            <h3>Finance conseil juridique</h3>
            <div className="acceuil__service-text">
              <p>
                Halal : boucherie / boulangerie / épicerie halal / charcuterie /
                restaurant / kebab/ food …
              </p>
              <p>
                Mosquées : financement / don / jonction Maghreb - Europe /
                conseil juridique …
              </p>
              <p>Juridique : Conseil par pays / Le financement / islamique …</p>
              <p>Comptable : bizness plan / rentabilité / service</p>
              <p>
                Financement : banque partenaire / banque islamique /
                Cryptomonnaies / Don …
              </p>
              <p>Les langues : Français / Arabe / Anglais + traducteurs.</p>
            </div>
          </div>
        </div>

        <div className="acceuil__third-service">
          <div className="acceuil__third-service__bg">
            <h3>Plateforme de don pour les mosquées (mondiale)</h3>
          </div>

          <div className="acceuil__third-service-text">
            <p>
              L’objectif de notre plateforme est de récolter des fonds sous
              forme de montant numéraire ou de cryptomonnaies, afin de financer
              un projet de mosquée. Uniquement des dons.
            </p>
            <p>
              Associations musulmane (uniquement projet mosquée) Mosquées vous
              rechercher un financement pour vous agrandir, pour acheter un
              terrain, pour construire votre mosquée notre plateforme de don est
              faites pour vous. Comment fonctionne la plateforme :
            </p>
            <p>
              Vous nous amenez votre projet (réservé uniquement aux associations
              / organisations)
            </p>
            <p>
              Nous étudions votre bizness plan ou le mettons en place avec nos
              services, donnons nos recommandations et créons une page pour
              votre projet afin de commencer à récolter vos premiers dons.
            </p>
            <p>
              Nous suivons la réglementations européen et Royaume Unis, Tunisie.
            </p>
            <p>
              Ensuite nous nous conformons à la réglementation pays / projet.
              Notre société à Londres est spécialisée dans la gestion
              financières et services financier communautaire islamique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aceuil;
