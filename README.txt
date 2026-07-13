WŁOSKI WÓŁ — WIELOSTRONICOWA WITRYNA STATYCZNA
================================================

1. Opis projektu
----------------

Projekt zawiera kompletną, responsywną i gotową do wdrożenia na GitHub Pages
witrynę marki „Włoski Wół”. Został wykonany w semantycznym HTML5, CSS3 oraz
czystym JavaScript bez frameworków i bibliotek animacyjnych.

Witryna obejmuje:
- stronę główną,
- tekstową kartę menu gotową do zasilenia prawdziwymi danymi,
- stronę opinii bez fikcyjnych recenzji,
- stronę kontaktową bez fałszywych danych i atrapy formularza,
- stronę błędu 404,
- SEO, Schema.org, manifest, robots.txt oraz sitemap.xml.

WAŻNE: w otrzymanych materiałach nie było danych operacyjnych restauracji ani
zdjęć. Zgodnie z briefem nie wymyślono dań, cen, opinii, adresu, telefonu,
godzin ani profili społecznościowych. Projekt jest kompletny technicznie, ale
przed publikacją produkcyjną wymaga uzupełnienia danych wymienionych niżej.


2. Uruchomienie lokalne
-----------------------

Najprostsza metoda:
1) Otwórz terminal w katalogu zawierającym index.html.
2) Uruchom prosty serwer HTTP, na przykład:
   python -m http.server 8000
3) Wejdź w przeglądarce na:
   http://localhost:8000/

Można także otworzyć index.html bezpośrednio, ale serwer HTTP lepiej odwzorowuje
środowisko GitHub Pages i poprawnie testuje pliki manifestu oraz routing.


3. Publikacja na GitHub Pages
-----------------------------

1) Utwórz repozytorium w GitHub.
2) Umieść zawartość tego katalogu w katalogu głównym repozytorium.
3) Wykonaj commit i push do gałęzi main.
4) W GitHub otwórz Settings -> Pages.
5) W sekcji Build and deployment wybierz „Deploy from a branch”.
6) Wybierz gałąź main oraz katalog /(root), a następnie Save.
7) Po zakończeniu wdrożenia sprawdź wszystkie podstrony i 404.html.

Wszystkie odwołania do lokalnych plików są względne i działają w projekcie
publikowanym pod adresem repozytorium GitHub Pages.


4. Podłączenie domeny .pl
-------------------------

1) W GitHub Pages wpisz docelową domenę w polu Custom domain.
2) U operatora domeny ustaw rekordy DNS zgodnie z aktualną instrukcją GitHub
   Pages (rekordy A/AAAA dla domeny głównej albo CNAME dla subdomeny www).
3) Włącz „Enforce HTTPS”, gdy certyfikat będzie gotowy.
4) Utwórz w katalogu głównym plik CNAME zawierający wyłącznie domenę,
   np. wloskiwol.pl. Nie dodano go teraz, ponieważ domena nie została podana.
5) Zastąp tekst FINAL_DOMAIN_TO_UPDATE pełną domeną we wszystkich plikach.

Miejsca do aktualizacji domeny:
- canonical, Open Graph, Twitter Cards i Schema.org we wszystkich plikach HTML,
- robots.txt,
- sitemap.xml.

Przykład zamiany:
https://FINAL_DOMAIN_TO_UPDATE/index.html
na:
https://wloskiwol.pl/index.html


5. Użyte obrazy i grafiki
-------------------------

Nie użyto zdjęć z internetu ani materiałów o nieznanej licencji. Wszystkie
poniższe pliki SVG są autorskimi, abstrakcyjnymi placeholderami przygotowanymi
specjalnie dla tego projektu:

- assets/logo/logo-mark.svg — znak/monogram zastępczy WW,
- assets/icons/favicon.svg — favicon zastępczy,
- assets/images/hero-placeholder.svg — hero i kadr wieczornego stołu,
- assets/images/scene-marble.svg — miejsce na fotografię wnętrza,
- assets/images/scene-table.svg — miejsce na fotografię stołu/lokalu,
- assets/images/scene-fire.svg — miejsce na fotografię kuchni lub pieca,
- assets/images/scene-wine.svg — miejsce na fotografię wina/detalu,
- assets/images/scene-olive.svg — miejsce na fotografię detalu,
- assets/images/scene-plate.svg — miejsce na fotografię dania,
- assets/images/scene-evening.svg — miejsce na fotografię atmosfery lokalu,
- assets/images/map-placeholder.svg — miejsce na prawdziwą mapę,
- assets/images/og-cover.svg — zastępcza okładka Open Graph.

Placeholdery nie przedstawiają prawdziwego lokalu ani prawdziwych dań.


6. Dane wymagające potwierdzenia przez właściciela
--------------------------------------------------

Do publikacji wymagane są:

Dane podstawowe:
- pełna nazwa prawna/handlowa i ewentualny dopisek do logo,
- dokładny adres,
- numer telefonu,
- adres e-mail,
- aktualne godziny otwarcia dla każdego dnia,
- link do profilu Google Maps i link „Wyznacz trasę”,
- końcowa domena .pl.

Oferta:
- kompletne menu tekstowe,
- rzeczywiste kategorie menu,
- nazwy dań,
- opisy/składy,
- ceny i warianty cenowe,
- gramatury,
- alergeny,
- potwierdzone oznaczenia dietetyczne,
- potwierdzone specjalności/bestsellery,
- informacja, czy lokal przyjmuje rezerwacje,
- link do rezerwacji, jeśli istnieje,
- link do zamówień online, jeśli istnieje.

Komunikacja i social media:
- Instagram,
- Facebook,
- inne oficjalne profile,
- sposób obsługi wiadomości z formularza, jeśli formularz ma być uruchomiony.

Opinie:
- prawdziwy link do profilu Google,
- aktualna średnia ocena,
- aktualna liczba opinii,
- treść wybranych recenzji,
- publiczne podpisy autorów,
- ocena i źródło każdej recenzji,
- rozkład ocen wyłącznie wtedy, gdy dostępne są kompletne dane.

Treść i fakty o restauracji:
- potwierdzony opis charakteru lokalu,
- historia restauracji, jeśli ma być publikowana,
- informacje o składnikach, procesach i dostawcach,
- rzeczywista specjalizacja lokalu,
- zgoda na użycie proponowanych haseł sprzedażowych.


7. Jak zmieniać menu i ceny
---------------------------

Menu znajduje się w pliku script.js w tablicy MENU_ITEMS.

Obecnie tablica jest pusta, ponieważ nie otrzymano prawdziwej karty. Każda
potwierdzona pozycja może mieć następujące pola:

{
  name: "Prawdziwa nazwa dania",
  description: "Potwierdzony skład lub opis",
  category: "Prawdziwa kategoria",
  price: "00 zł",
  prices: ["wariant 1 — 00 zł", "wariant 2 — 00 zł"],
  tags: [],
  allergens: [],
  image: "assets/images/nazwa-pliku.webp"
}

Po dodaniu co najmniej jednej pozycji skrypt automatycznie:
- ukryje stan pusty,
- wygeneruje sekcje kategorii,
- uruchomi sticky pasek kategorii,
- uruchomi scrollspy,
- uruchomi wyszukiwarkę.

Nie dodawaj tagów „wegańskie”, „bezglutenowe”, „ostre”, „popularne” ani
„bestseller”, dopóki nie zostaną potwierdzone przez restaurację.


8. Jak podmieniać zdjęcia
-------------------------

1) Przygotuj zdjęcia w formacie WebP lub AVIF.
2) Zapisz je w assets/images/.
   1200-1600 px) i kompresję odpowiednią dla WWW.
4) W plikach HTML zamień wartość src odpowiedniego obrazu.
5) Zaktualizuj width, height i alt zgodnie z prawdziwym plikiem.
6) Zostaw loading="lazy" poza obrazem hero.

Potrzebny materiał fotograficzny:
- 1 poziome zdjęcie hero (wnętrze, stół, kuchnia lub potwierdzone danie),
- 6-8 zdjęć dań z oficjalnego menu,
- 3-5 zdjęć wnętrza,
- 2-3 zdjęcia kuchni lub detali,
- 1 zdjęcie charakterystycznego, potwierdzonego dania,
- 1 zdjęcie zespołu, jeśli właściciel chce je publikować,
- logo w wersji wektorowej lub wysokiej rozdzielczości,
- fotografia/okładka Open Graph 1200 x 630 px.


9. Jak zmienić telefon i godziny
--------------------------------

Po otrzymaniu danych należy:
- dodać numer jako czytelny tekst i link tel:+48... w kontakt.html,
  stopce wszystkich stron oraz, jeśli uzasadnione, w CTA,
- dodać godziny do kontakt.html i stopki,
- dodać dane do obiektu Schema.org w każdym pliku HTML,
- sprawdzić zgodność danych na wszystkich podstronach,
- usunąć neutralne komunikaty o oczekujących danych.

Wyszukaj w projekcie komentarze DANE_DO_UZUPELNIENIA — wskazują miejsca,
które wymagają prawdziwych danych.


10. Gdzie ustawić końcową domenę
--------------------------------

Wyszukaj w całym projekcie ciąg FINAL_DOMAIN_TO_UPDATE i zamień go na domenę
bez końcowego ukośnika, np. wloskiwol.pl. Następnie przetestuj canonical,
Open Graph, Schema.org, robots.txt i sitemap.xml.


11. Formularz kontaktowy
------------------------

Formularza nie uruchomiono. Projekt celowo nie udaje wysłania wiadomości.
Jeśli właściciel wybierze Formspree, EmailJS lub inną usługę, należy:
- dodać prawidłowy endpoint,
- skonfigurować domenę po stronie usługi,
- dodać walidację i komunikaty błędów,
- przeprowadzić prawdziwy test odbioru wiadomości,
- uzupełnić politykę prywatności i obowiązki informacyjne.


12. Materiały wymagające zgody właściciela
------------------------------------------

Przed publikacją należy potwierdzić prawa i zgodę na użycie:
- wszystkich zdjęć lokalu, dań, kuchni i zespołu,
- docelowego logo i elementów identyfikacji,
- menu, nazw dań, opisów i cen,
- cytowanych opinii oraz publicznych podpisów,
- linków i znaków platform zewnętrznych,
- historii restauracji i twierdzeń o składnikach lub procesach,
- danych osobowych pracowników lub właścicieli,
- mapy/osadzenia Google i ewentualnych plików cookies,
- narzędzi analitycznych, marketingowych i formularza.


13. Najważniejsze pliki
-----------------------

- index.html — strona główna,
- menu.html — karta i stan danych,
- opinie.html — opinie i stan danych,
- kontakt.html — kontakt i stan danych,
- 404.html — strona błędu,
- styles.css — kompletny system wizualny i responsywność,
- script.js — wszystkie interakcje i tablica menu,
- manifest.webmanifest — dane aplikacji WWW,
- robots.txt i sitemap.xml — pliki indeksowania.
