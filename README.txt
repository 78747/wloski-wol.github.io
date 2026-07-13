WŁOSKI WÓŁ — WERSJA DO PUBLIKACJI
==================================

Struktura
---------
- index.html — strona główna z ofertą, polecanymi daniami, oceną i opiniami.
- menu.html — pełna karta z wyszukiwarką, kategoriami i przewijaniem.
- opinie.html — ocena Google oraz wybrane recenzje gości.
- kontakt.html — adres, telefon, godziny, Facebook i mapa dojazdu.
- 404.html — strona błędu.
- menu-data.js — dane pełnego menu.
- script.js — nawigacja, animacje, wyszukiwarka i renderowanie menu.
- styles.css — wspólny system wizualny i responsywność.
- assets/ — zdjęcia, ikony, logo i okładka Open Graph.

Aktualizacja menu i cen
-----------------------
Pozycje znajdują się w menu-data.js. Każdy wpis ma pola category, name, price
i description. Zmiana ceny lub opisu wymaga edycji odpowiedniego wpisu bez
zmiany nazw pól. Kategorie są tworzone automatycznie na podstawie category.

Aktualizacja opinii
-------------------
Opinie są zapisane w opinie.html jako elementy review-card. Na stronie głównej
znajdują się trzy krótkie cytaty w home-review-card. Publikuj wyłącznie treści
zgodne z profilem Google i bez dat względnych. Ocenę 4,6
i liczbę 1391 należy zmienić jednocześnie w HTML oraz obiektach JSON-LD.

Telefon, adres i godziny
------------------------
Dane występują w stopkach, kontakt.html, mobilnym pasku działań i JSON-LD.
Przy zmianie telefonu zachowaj format widoczny „881 422 122” oraz format linku
„tel:+48881422122”. Godziny są obecnie: pn–czw i nd 12:00–22:00, pt–sob
12:00–23:00.

Domena
------
Wersja demonstracyjna używa adresu:
https://78747.github.io/wloski-wol.github.io

Po podłączeniu domeny .pl zmień ten adres w canonical, og:url, og:image,
twitter:image i JSON-LD we wszystkich plikach HTML, a także w sitemap.xml
i robots.txt. Każda podstrona musi zachować własną końcówkę URL.

Publikacja
----------
Wgraj całą zawartość folderu outputs do repozytorium GitHub, zachowując układ
folderów. Strona jest statyczna i nie wymaga procesu budowania.

Animacje i dostępność
---------------------
Projekt wykorzystuje preloader, pasek postępu, Ken Burns, światło, parę,
reveal, marquee, magnetyczne przyciski, tilt i kursor dekoracyjny. Ruch jest
ograniczany przez prefers-reduced-motion, tilt działa tylko dla precyzyjnego
wskaźnika, a systemowy kursor pozostaje dostępny. Nawigacja ma skip link,
widoczne focus states, Escape, focus trap i przywracanie fokusu.
