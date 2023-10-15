# sejMe

Projekt aplikacji zawierającej informacje na temat sejmu, jego posłach, drukach, komisjach i interpelacjach.
Korzysta z https://api.sejm.gov.pl/sejm.html

- Aplikacja PWA
- Angular Universal
- APP Shell dla szybszego First paint
- NGRX do trzymania danych ?
- Możliwe do włączeznia push notyfikację na danym urządzeniu (info trzymane w localstorage?)
- tailwind css

Widoki:

1. Lista kadencji (trzeba niestety zahardkodować term10 i sprawdzać czy jest juz dostepny) - menu boczne
   1. Każda kadencja ma swoje podstrony
2. Szczegółowe informacji o kadencji
3. Lista druków
   1. Szczegóły druku
   2. Załączniki
4. Lista posłów
   1. Szczezgóły posła
5. Lista kół i klubów
   1. Szczegóły klubu
6. Lista komisji sejmowych
7. Lista interpelacji
   1. Szczegółowe filtrowanie
   2. Odpowiedzi na interpelacje
8. Informacje
