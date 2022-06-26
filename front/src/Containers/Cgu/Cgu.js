import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { Helmet } from 'react-helmet';

const Cgu = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                };
                dispatch ({
                    type: 'LOG'
                });
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
        }; 
    },[]);

    return (
        <>
        <Helmet>
            <title>Cgu - React optique shop</title>
            <meta name="title" content="Cgu - React optique shop" />
            <meta
            name="description"
            content="Vous trouverez sur cette page les conditions générales d'utilisation du site."
            />
        </Helmet>
        <main>
            <section className="cgu">
                <h2>CONDITIONS GÉNÉRALES D'UTILISATION</h2>

                <h3>Définitions</h3>
                <p>On désignera par la suite:</p>
                <ul>
                    <li className="cgu__list"><q>"Site"</q> ou <q>"Service"</q>: le site <a href='https://e-commerce.julienlenfume.com'>https://e-commerce.julienlenfume.com</a> et l'ensemble de ses pages.</li>
                    <li className="cgu__list"><q>"Editeur"</q>: Lenfumé Julien, personne physique responsable de l'édition et du contenu du Site.</li>
                    <li className="cgu__list"><q>"Utilisateur"</q>: l'internaute visitant et utilisant les Services du Site.</li>
                </ul>
                <p className='cgu__marginTop'>Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») sont proposées par l'Editeur du Site. </p>
                <p className='cgu__marginTop'>L'Utilisateur du Site est invité à lire attentivement ces CGU, à les imprimer et/ou à les sauvegarder sur un support durable. L'Utilisateur reconnaît avoir pris connaissance des CGU et les accepte intégralement et sans réserve.</p>
            
                <h3>Article 1 - Application des CGU</h3>
                <p>Les présentes CGU ont pour objet de définir les conditions d'accès au Site par les Utilisateurs. L'Editeur se réserve le droit de modifier à tout moment les CGU en publiant une nouvelle version de ces dernières sur le Site. </p>
                <p className='cgu__marginTop'>Le Site est d'accès libre et gratuit à tout Utilisateur. L'acquisition d'un produit ou d'un service, ou la création d'un espace membre, ou de manière plus générale la navigation sur le Site suppose l'acceptation, par l'Utilisateur, de l'intégralité des présentes CGU, qui reconnaît du même fait en avoir pris pleinement connaissance.</p>
                <p className='cgu__marginTop'>Cette acceptation pourra consister par exemple, pour l'Utilisateur, à cocher la case correspondant à la phrase d'acceptation des présentes CGU, ayant par exemple la mention «<em>je reconnais avoir lu et accepté l'ensemble des conditions générales du Site</em> ». Le fait de cocher cette case sera réputé avoir la même valeur qu'une signature manuscrite de la part de l'Utilisateur. </p>
                <p className='cgu__marginTop'>L'Utilisateur reconnaît la valeur de preuve des systèmes d'enregistrement automatique de l'Editeur du présent Site et, sauf pour lui d'apporter une preuve contraire, il renonce à les contester en cas de litige.</p>
                <p className='cgu__marginTop'>L'acceptation des présentes CGU suppose de la part des Utilisateurs qu'ils jouissent de la capacité juridique nécessaire pour cela. Si l'Utilisateur est mineur ou ne dispose pas de cette capacité juridique, il déclare avoir l'autorisation d'un tuteur, d'un curateur ou de son représentant légal.</p>
                <p className='cgu__marginTop'>L'Editeur met à la disposition du Client, sur son Site, une charte de confidentialité spécifiant l’ensemble des informations afférentes à l’utilisation des données à caractère personnel du Client collectées par l'Editeur et aux droits dont le Client dispose vis-à-vis de ces données personnelles. La politique de confidentialité des données fait partie des CGU. L'acceptation des présentes CGU implique par conséquent l'acceptation de la politique de confidentialité des données.</p>
            
                <h3>Article 2 - Mentions légales, données personnelles et objet du Site</h3>
                <p>Le présent Site est édité par Lenfumé Julien. Les informations légales concernant l'hébergeur et l'Editeur du Site, notamment les coordonnées et les éventuelles informations de capital et d'immatriculation, sont fournies dans les mentions légales du présent Site.</p>
                <p className='cgu__marginTop'>Les informations concernant la collecte et le traitement des données personnelles (politique et déclaration) sont fournies dans la charte de données personnelles du Site.</p>
                <p className='cgu__marginTop'>L'objet du présent Site est déterminé comme « Site de démonstration ».</p>

                <h3>Article 3 - Accès et disponibilité du Site</h3>
                <p>Le Site est accessible par le réseau Internet 24 heures sur 24 et 7 jours sur 7, sauf cas de force majeure, événement hors de contrôle de l’Editeur et/ou de l'hébergeur du service, pannes éventuelles ou interventions de maintenance nécessaires pour assurer le bon fonctionnement du service.</p>


                <h3>Article 4 - Liens hypertextes</h3>
                <p>Le Site peut inclure des liens hypertextes vers d’autres sites.</p>
                <p className='cgu__marginTop'>L'Utilisateur reconnaît par conséquent que l'Editeur ne pourra être tenu responsable de tous dommages ou pertes avérés ou allégués, consécutifs à ou en relation avec l'utilisation ou avec le fait d'avoir pris connaissance des contenus, publicités, produits ou services disponibles sur ces sites ou sources externes. De même, la responsabilité de l'Editeur du présent Site ne saurait être engagée si la visite, par l’Utilisateur, de l’un de ces sites, lui causait un préjudice.</p>
                <p className='cgu__marginTop'>Si, en dépit des efforts de l'Editeur, un des liens hypertextes présents sur le Site pointait vers un site ou une source internet dont le contenu était ou paraissait non conforme aux exigences de la loi française à un Utilisateur, celui-ci s’engage à prendre immédiatement contact avec le directeur de la publication du Site, dont les coordonnées figurent dans les mentions légales du Site, afin de lui communiquer l'adresse des pages du site tiers en cause.</p>

                <h3>Article 5 - Responsabilité</h3>
                <p>L'Editeur n’est pas responsable des publications des Utilisateurs, de leur contenu ainsi que de leur véracité. L'Editeur ne peut en aucun cas être tenu responsable de tout dommage susceptible d'intervenir sur le système informatique de l’Utilisateur et/ou de la perte de données résultant de l'utilisation du Site par l’Utilisateur.</p>
                <p className='cgu__marginTop'>L'Editeur s'engage à constamment mettre à jour le contenu du Site et à fournir aux Utilisateurs des informations justes, claires, précises et réactualisées. Le Site est en principe accessible en permanence, sauf pendant les opérations techniques de maintenance et de mise à jour du contenu. L'Editeur ne saurait être tenu responsable de dommages résultant de l’indisponibilité du Site ou de parties de celui-ci.</p>
                <p className='cgu__marginTop'>La responsabilité de l'Editeur du Site ne peut être engagée en raison d'une indisponibilité technique de la connexion, qu'elle soit due notamment à un cas de force majeure, à une maintenance, à une mise à jour, à une modification du Site, à une intervention de l'hébergeur, à une grève interne ou externe, à une panne de réseau, ou encore à une coupure d'alimentation électrique.</p>
                <p className='cgu__marginTop'>L'Editeur ne saurait être tenu responsable du non fonctionnement, d'une impossibilité d'accès ou de dysfonctionnements du Site imputables à un équipement non adapté, à une mauvais configuration ou utilisation de l'ordinateur de l'Utilisateur, à des dysfonctionnements des services du fournisseur d'accès des Utilisateurs, ou à ceux du réseau internet.</p>
            
                <h3>Article 6 - Notifications et réclamations</h3>
                <p>Toute notification ou avis concernant les présentes CGU, les mentions légales ou la charte de données personnelles doit être faite par écrit et envoyée par courrier recommandé ou certifié, ou par mail à l'adresse indiquée dans les mentions légales du Site, en précisant les coordonnées, nom et prénom du notifiant, ainsi que l'objet de l’avis.</p>
                <p className='cgu__marginTop'>Toute réclamation liée à l'utilisation du Site, des Services, des pages du Site sur des réseaux sociaux éventuels ou aux CGU, aux mentions légales ou à la charte de données personnelles doit être déposée dans les 365 jours suivant le jour d’origine du problème source de réclamation, et ce indépendamment de toute loi ou règle de droit contraire. Dans le cas où une telle réclamation n’aurait pas été déposée dans les 365 jours suivants, une telle réclamation sera à jamais inapplicable en justice.</p>
                <p className='cgu__marginTop'>Il peut être possible que se trouvent, dans l'ensemble du Site internet et des Services proposés, et dans une mesure restreinte, des inexactitudes ou des erreurs, ou des informations qui soient en désaccord avec les CGU, les mentions légales ou la charte de données personnelles. En outre, il est possible que des modifications non autorisées soient faites par des tiers sur le Site ou sur des Services annexes (réseaux sociaux…).</p>
                <p className='cgu__marginTop'>Dans une telle situation, l'Utilisateur a la possibilité de contacter l'Editeur du Site par le formulaire de contact du Site, avec si possible une description de l’erreur et l'emplacement (URL), ainsi que des informations suffisantes permettant de le contacter.</p>
            
                <h3>Article 7 - Indépendance des clauses</h3>
                <p>Si une disposition des CGU est jugée illégale, nulle ou pour toute autre raison inapplicable, alors cette disposition sera réputée divisible des CGU et n'affectera pas la validité et l'applicabilité des dispositions restantes.</p>
                <p className='cgu__marginTop'>Les CGU remplacent tous accords antérieurs ou contemporains écrits ou oraux. Elles ne sont pas cessibles, transférables ou sous-licenciables par l'Utilisateur lui-même.</p>
                <p className='cgu__marginTop'>Une version imprimée des CGU et de tous les avis donnés sous forme électronique pourra être demandée dans des procédures judiciaires ou administratives en rapport avec les CGU. Les parties conviennent que toute la correspondance relative à ces CGU doit être rédigée dans la langue française.</p>
            
                <h3>Article 8 - Loi applicable</h3>
                <p>Les présentes CGU sont régies par et soumises au droit Français.</p>
                <p className='cgu__marginTop'>Sauf dispositions d’ordre public, tous litiges qui pourraient survenir dans le cadre de l’exécution des présentes CGU pourront avant toute action judiciaire être soumis à l’appréciation de l'Editeur du Site en vue d’un règlement amiable.</p>
                <p className='cgu__marginTop'>Il est expressément rappelé que les demandes de règlement amiable ne suspendent pas les délais ouverts pour intenter les actions judiciaires.</p>
                <p className='cgu__marginTop'>Sauf disposition contraire, d’ordre public, toute action judiciaire relative à l’exécution des présentes CGU devra être soumise à la compétence des juridictions du ressort du lieu du domicile du défendeur.</p>
            </section>
        </main>
        </>
    );
};

export default Cgu;