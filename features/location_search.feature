Feature: Cercador d'ubicacions de l'app web Waze

  Scenario: Detecta automàticament totes les localitats i llocs el nom dels quals coincideix amb el fragment introduït per l'usuari
    Given Suposant que l'usuari visita "Waze" a "https://www.waze.com/ca/live-map"
    And que no ha iniciat sessió amb cap usuari
    And el mapa està centrat en la regió Espanya
    When introdueix el text "cuenc" al camp ubicació d'origen
    Then es desplega un llista d'opcions que conté "CuencaEspanya"

  Scenario: Detecta ubicacions sense tenir en compte les majúscules i minúscules.
    Given Suposant que l'usuari visita "Waze" a "https://www.waze.com/ca/live-map"
    And que no ha iniciat sessió amb cap usuari
    And el mapa està centrat en la regió Espanya
    When introdueix el text "cuENca" al camp ubicació d'origen
    Then es desplega un llista d'opcions que conté "CuencaEspanya"

  Scenario: Detecta ubicacions sense tenir en compte els accents introduïts per error.
    Given Suposant que l'usuari visita "Waze" a "https://www.waze.com/ca/live-map"
    And que no ha iniciat sessió amb cap usuari
    And el mapa està centrat en la regió Espanya
    When introdueix el text "cuéncà" al camp ubicació d'origen
    Then es desplega un llista d'opcions que conté "CuencaEspanya"

  Scenario: Detecta ubicacions sense tenir en compte caràcters especials.
    Given Suposant que l'usuari visita "Waze" a "https://www.waze.com/ca/live-map"
    And que no ha iniciat sessió amb cap usuari
    And el mapa està centrat en la regió Espanya
    When introdueix el text "c'u'en'ca" al camp ubicació d'origen
    Then es desplega un llista d'opcions que conté "CuencaEspanya"