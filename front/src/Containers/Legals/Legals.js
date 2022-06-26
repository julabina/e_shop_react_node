import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { Helmet } from 'react-helmet';

const Legals = () => {

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
            <title>Mentions légales - React optique shop</title>
            <meta name="title" content="Mentions légales - React optique shop" />
            <meta
            name="description"
            content="Vous trouverez sur cette page les mentions légales du site."
            />
        </Helmet>
        <main>
            <section className='legals'>
                <h2>MENTIONS LEGALES</h2>

                <p>Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site </p>
                <p><a className='legals__link' href="https://e-commerce.julienlenfume.com" target="_blank">react-optique-shop</a> les informations suivantes :</p>

                <h3>1. Informations légales :</h3>
                <p>Le créateur du site est : Lenfumé Julien.</p>
                <p>L’hebergeur du site est : Digitalocean LLC, 101 Avenue of the Americas 10th Floor New York, NY 10013 United States.</p>
                <p>Crédit : Les mentions légales ont étés générées par <a className='legals__link' href="https://www.generer-mentions-legales.com/generateur-mentions-legales.html" target="_blank">générateur de mentions legales.</a></p>
                <p>Crédit : Les conditions générales d'utilisation ont étés générées en partie par <a className='legals__link' href="https://editioneo.com" target="_blank">editioneo.</a></p>

                <h3>2. Présentation et principe :</h3>
                <p>Le site react-optique-shop est un projet personnel visant à améliorer mes compétences et ma connaissance du framework javascript "React".</p>
                <p>La partie back-end est développée avec "Nodejs" et son framework "Express", ainsi que "Sequelize" et "MariaDB" pour la base de données, la partie front-end est développée en "React", accompagné de "Redux" et du préprocesseur "Sass" pour le css.</p>
                <p className='legals__marginTop'>Le design du site est très largement inspiré du site <a className='legals__link' href="https://www.telescopes-et-accessoires.fr/">Optique Unterlinden</a>.</p>

                <h3>3. Liens hypertextes et cookies :</h3>                
                <p>Le site react-optique-shop contient un certain nombre de liens hypertextes vers d’autres sites (partenaires, informations …) mis en place avec l’autorisation de Julien Lenfumé. Cependant, Julien Lenfumé n’a pas la possibilité de vérifier l'ensemble du contenu des sites ainsi visités et décline donc toute responsabilité de ce fait quand aux risques éventuels de contenus illicites.</p>
                <p className='legals__marginTop'>L’utilisateur est informé que lors de ses visites sur le site react-optique-shop, un ou des cookies sont susceptibles de s’installer automatiquement sur son ordinateur par l'intermédiaire de son logiciel de navigation. Un cookie est un bloc de données qui ne permet pas d'identifier l'utilisateur, mais qui enregistre des informations relatives à la navigation de celui-ci sur le site.</p> 
                <p className='legals__marginTop'>Le paramétrage du logiciel de navigation permet d’informer de la présence de cookie et éventuellement, de la refuser de la manière décrite à l’adresse suivante : <a className='legals__link' href="http://www.cnil.fr">www.cnil.fr</a>. L’utilisateur peut toutefois configurer le navigateur de son ordinateur pour refuser l’installation des cookies, sachant que le refus d'installation d'un cookie peut entraîner l’impossibilité d’accéder à certains services. Pour tout bloquage des cookies, tapez dans votre moteur de recherche : bloquage des cookies sous IE ou firefox et suivez les instructions en fonction de votre version.</p>

                
                <h3>4. Protection des biens et des personnes - gestion des données personnelles :</h3> 
                <p>En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.</p>
                <p className='legals__marginTop'>Sur le site react-optique-shop, Julien Lenfumé ne collecte des informations personnelles ( suivant l'article 4 loi n°78-17 du 06 janvier 1978) relatives à l'utilisateur que pour le besoin de certains services proposés par le site react-optique-shop. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site react-optique-shop l’obligation ou non de fournir ces informations.</p>
                <p className='legals__marginTop'>Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles le concernant. Pour l’exercer, adressez votre demande à react-optique-shop via le formulaire de contact</p>
                <p className='legals__marginTop'>Aucune information personnelle de l'utilisateur du site react-optique-shop n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat du site react-optique-shop et de ses droits autorise Julien Lenfumé à transmettre les dites informations à l'éventuel acquéreur qui serait à son tour tenu à la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site react-optique-shop.
                Le site react-optique-shop est en conformité avec le RGPD voir notre politique RGPD  .</p>
                <p className='legals__marginTop'>Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>
            </section>
        </main>
        </>
    );
};

export default Legals;