import { Injectable, computed, signal } from '@angular/core';
import {
  Category,
  CollectionPoint,
  LabTest,
  TestPackage,
} from '../models/catalog.models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly _categories: Category[] = [
    { id: 'pasozyty', name: 'Pasożyty jelitowe', slug: 'pasozyty-jelitowe', icon: '🪱', description: 'Wykrywanie pasożytów i ich jaj w kale metodą BIO-REPAIR — glisty, owsik, tasiemiec, lamblia i inne.' },
    { id: 'wirusy', name: 'Wirusy i bakterie', slug: 'wirusy-bakterie', icon: '🦠', description: 'Diagnostyka infekcji przewodu pokarmowego: Helicobacter pylori, Clostridium difficile, adeno- i norowirusy, krew utajona.' },
    { id: 'markery', name: 'Markery i stan zapalny', slug: 'markery-stan-zapalny', icon: '🔬', description: 'Ocena stanu zapalnego i funkcji jelit: kalprotektyna, laktoferyna oraz pH kału z resztkami pokarmowymi.' },
    { id: 'posiew', name: 'Posiew kału', slug: 'posiew-kalu', icon: '🧫', description: 'Posiewy mikrobiologiczne kału w kierunku drożdżaków Candida, bakterii i pleśni.' },
    { id: 'dysbioza', name: 'Dysbioza jelitowa', slug: 'dysbioza-jelitowa', icon: '🧬', description: 'Kompleksowa ocena mikroflory i szczelności jelit: mikroflora jelit, zonulina, elastaza, EPX i inne markery.' },
  ];

  private readonly _tests: LabTest[] = [
    // ---- Pasożyty jelitowe (metoda BIO-REPAIR) ----
    { id: 't1', code: 'ASC', name: 'Glista ludzka (Ascaris lumbricoides)', slug: 'glista-ludzka', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Wykrywanie zakażenia glistą ludzką — najczęstszym pasożytem przewodu pokarmowego.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't2', code: 'TOXC', name: 'Glista psia (Toxocara canis)', slug: 'glista-psia', categoryId: 'pasozyty', price: 45, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka toksokarozy przenoszonej przez psy.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't3', code: 'TOXT', name: 'Glista kocia (Toxocara cati)', slug: 'glista-kocia', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka toksokarozy przenoszonej przez koty.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't4', code: 'ENT', name: 'Owsik (Enterobius vermicularis)', slug: 'owsik', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Wykrywanie owsicy — najczęstszej parazytozy u dzieci.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).', popular: true },
    { id: 't5', code: 'TAE', name: 'Tasiemiec — jaja (Taenia spp.)', slug: 'tasiemiec-jaja', categoryId: 'pasozyty', price: 65, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Wykrywanie jaj tasiemca w kale.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't6', code: 'ECH', name: 'Tasiemiec bąblowcowy (Echinococcus granulosus)', slug: 'tasiemiec-bablowcowy', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka bąblowicy wywoływanej przez tasiemca bąblowcowego.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't7', code: 'DIP', name: 'Tasiemiec psi (Dipylidium caninum)', slug: 'tasiemiec-psi', categoryId: 'pasozyty', price: 45, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka zakażenia tasiemcem psim.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't8', code: 'TRI', name: 'Włosogłówka (Trichuris trichiura)', slug: 'wlosoglowka', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Wykrywanie zakażenia włosogłówką.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't9', code: 'FAS', name: 'Motylica wątrobowa (Fasciola hepatica)', slug: 'motylica-watrobowa', categoryId: 'pasozyty', price: 45, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka fasciolozy wywoływanej przez przywrę motylicy wątrobowej.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't10', code: 'STR', name: 'Węgorek jelitowy (Strongyloides stercoralis)', slug: 'wegorek-jelitowy', categoryId: 'pasozyty', price: 35, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Wykrywanie zakażenia węgorkiem jelitowym (strongyloidoza).', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't11', code: 'LAM', name: 'Lamblia jelitowa (Giardia lamblia)', slug: 'lamblia-jelitowa', categoryId: 'pasozyty', price: 55, material: 'kał', turnaround: '4–5 dni roboczych', description: 'Diagnostyka giardiozy — częstej przyczyny przewlekłych dolegliwości jelitowych.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką, z 8 różnych miejsc, wypełniając pojemnik do połowy objętości. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).', popular: true },

    // ---- Wirusy i bakterie ----
    { id: 't12', code: 'FOB', name: 'Krew utajona w kale (FOB, met. bez diety)', slug: 'krew-utajona-fob', categoryId: 'wirusy', price: 35, material: 'kał', turnaround: '1–2 dni robocze', description: 'Test na obecność krwi utajonej w kale — badanie przesiewowe jelita grubego. Nie wymaga specjalnej diety.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Badanie nie wymaga specjalnej diety.' },
    { id: 't13', code: 'ADENO', name: 'Adenorotawirus w kale', slug: 'adenorotawirus', categoryId: 'wirusy', price: 45, material: 'kał', turnaround: '2–4 dni robocze', description: 'Wykrywanie zakażeń adeno- i rotawirusami — częstych przyczyn biegunek infekcyjnych.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't14', code: 'HP', name: 'Helicobacter pylori w kale', slug: 'helicobacter-pylori', categoryId: 'wirusy', price: 45, material: 'kał', turnaround: '2–4 dni robocze', description: 'Wykrywanie antygenu Helicobacter pylori — bakterii odpowiedzialnej za chorobę wrzodową.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).', popular: true },
    { id: 't15', code: 'CLO', name: 'Clostridium difficile (3 combo)', slug: 'clostridium-difficile', categoryId: 'wirusy', price: 135, material: 'kał', turnaround: '2–4 dni robocze', description: 'Wykrywanie zakażenia Clostridium difficile (GDH + toksyny A/B).', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't16', code: 'NORO', name: 'Norowirusy w kale', slug: 'norowirusy', categoryId: 'wirusy', price: 90, material: 'kał', turnaround: '2–4 dni robocze', description: 'Wykrywanie norowirusów — częstej przyczyny epidemicznych biegunek i wymiotów.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },

    // ---- Markery i stan zapalny ----
    { id: 't17', code: 'KALP', name: 'Kalprotektyna w kale (ilościowo)', slug: 'kalprotektyna', categoryId: 'markery', price: 140, material: 'kał', turnaround: '2–4 dni robocze', description: 'Ilościowy marker stanu zapalnego jelit — pomaga różnicować chorobę zapalną jelit (IBD) od zaburzeń czynnościowych.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).', popular: true },
    { id: 't18', code: 'LACT', name: 'Laktoferyna w kale', slug: 'laktoferyna', categoryId: 'markery', price: 85, material: 'kał', turnaround: '2–4 dni robocze', description: 'Marker stanu zapalnego jelit uwalniany przez neutrofile.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't19', code: 'PH', name: 'pH kału + resztki pokarmowe (opis)', slug: 'ph-kalu', categoryId: 'markery', price: 69, material: 'kał', turnaround: '2–4 dni robocze', description: 'Ocena pH kału oraz resztek pokarmowych z opisem — wskazuje na zaburzenia trawienia i wchłaniania.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },

    // ---- Posiew kału ----
    { id: 't20', code: 'CANA', name: 'Posiew kału — Candida albicans', slug: 'posiew-candida-albicans', categoryId: 'posiew', price: 109, material: 'kał', turnaround: 'do 9 dni roboczych', description: 'Posiew w kierunku drożdżaka Candida albicans.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).', popular: true },
    { id: 't21', code: 'CANS', name: 'Posiew kału — Candida spp.', slug: 'posiew-candida-spp', categoryId: 'posiew', price: 135, material: 'kał', turnaround: 'do 9 dni roboczych', description: 'Posiew w kierunku drożdżaków Candida (identyfikacja gatunków).', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't22', code: 'POSB', name: 'Posiew kału w kierunku bakterii', slug: 'posiew-bakterie', categoryId: 'posiew', price: 130, material: 'kał', turnaround: 'do 9 dni roboczych', description: 'Posiew bakteriologiczny kału z identyfikacją patogenów. W przypadku więcej niż 2 patogenów dopłata 40 PLN za każdy kolejny.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't23', code: 'POSP', name: 'Posiew kału w kierunku pleśni', slug: 'posiew-plesnie', categoryId: 'posiew', price: 115, material: 'kał', turnaround: 'do 9 dni roboczych', description: 'Posiew w kierunku grzybów pleśniowych. Wyhodowanie pleśni wymaga bezwzględnej konsultacji lekarskiej.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },

    // ---- Dysbioza jelitowa ----
    { id: 't24', code: 'MIKRO', name: 'Mikroflora jelit (kał, metoda ilościowa)', slug: 'mikroflora-jelit', categoryId: 'dysbioza', price: 560, material: 'kał', turnaround: 'do 14 dni roboczych', description: 'Ilościowa ocena mikroflory jelitowej (wynik w formie wykresu i wartości CFU/g kału): mikroflora ochronna, immunostymulująca i proteolityczna.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't25', code: 'M2PK', name: 'M2-PK (kał)', slug: 'm2-pk', categoryId: 'dysbioza', price: 235, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Izoenzym kinazy pirogronianowej M2-PK — marker pomocny w diagnostyce zmian rozrostowych jelita grubego.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't26', code: 'SIGA', name: 'sIgA (surowica)', slug: 'siga', categoryId: 'dysbioza', price: 230, material: 'krew', turnaround: '5–10 dni roboczych', description: 'Wydzielnicza immunoglobulina A — marker odporności miejscowej błon śluzowych.', preparation: 'Materiał: krew (surowica). Zalecane pobranie rano, na czczo.' },
    { id: 't27', code: 'ZON', name: 'Zonulina (kał)', slug: 'zonulina', categoryId: 'dysbioza', price: 265, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Marker szczelności bariery jelitowej („nieszczelne jelito”).', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't28', code: 'A1AT', name: 'Alfa-1-antytrypsyna (kał)', slug: 'alfa-1-antytrypsyna', categoryId: 'dysbioza', price: 245, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Marker przepuszczalności i utraty białka przez błonę śluzową jelita.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't29', code: 'ELA', name: 'Elastaza trzustkowa (kał)', slug: 'elastaza-trzustkowa', categoryId: 'dysbioza', price: 268, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Marker wydolności zewnątrzwydzielniczej trzustki.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't30', code: 'EPX', name: 'Białko EPX (kał)', slug: 'bialko-epx', categoryId: 'dysbioza', price: 255, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Białko X eozynofili — marker zapalenia alergicznego i eozynofilowego w jelitach.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't31', code: 'MANN', name: 'Antygen mannanowy (kał)', slug: 'antygen-mannanowy', categoryId: 'dysbioza', price: 235, material: 'kał', turnaround: '5–10 dni roboczych', description: 'Antygen mannanowy Candida — wspiera diagnostykę kandydozy przewodu pokarmowego.', preparation: 'Pobierz próbkę kału do jałowego pojemnika z zakrętką. Dostarcz materiał w warunkach chłodniczych (wkład żelowy).' },
    { id: 't32', code: 'LEP', name: 'Leptyna (surowica)', slug: 'leptyna', categoryId: 'dysbioza', price: 165, material: 'krew', turnaround: '5–10 dni roboczych', description: 'Hormon regulujący apetyt i metabolizm — pomocny w ocenie zaburzeń metabolicznych.', preparation: 'Materiał: krew (surowica). Zalecane pobranie rano, na czczo.' },
  ];

  private readonly _packages: TestPackage[] = [
    { id: 'p1', name: 'Panel 1 (pediatryczny)', slug: 'panel-1-pediatryczny', description: 'Podstawowy panel dla dzieci: najczęstsze pasożyty oraz posiew w kierunku Candida albicans.', price: 215, categoryId: 'pasozyty', testCodes: ['ASC', 'ENT', 'LAM', 'CANA'], badge: 'Bestseller', forWhom: 'Dla dzieci — podstawowy przegląd pasożytniczy.' },
    { id: 'p4', name: 'Panel 2', slug: 'panel-2', description: 'Szeroki przegląd pasożytów jelitowych wraz z oceną pH kału i resztek pokarmowych.', price: 200, categoryId: 'pasozyty', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI'], badge: 'Bestseller', forWhom: 'Przy podejrzeniu zakażenia pasożytniczego i zaburzeń trawienia.' },
    { id: 'p6', name: 'Panel 3', slug: 'panel-3', description: 'Pełna diagnostyka pasożytnicza z posiewem w kierunku Candida spp. i pleśni.', price: 395, categoryId: 'pasozyty', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP'], forWhom: 'Gdy potrzebna jest szersza diagnostyka pasożytów i grzybów.' },
    { id: 'p2', name: 'Panel 1 (pediatryczny poszerzony)', slug: 'panel-1-pediatryczny-poszerzony', description: 'Panel dla dzieci rozszerzony o posiew w kierunku Candida spp.', price: 240, categoryId: 'pasozyty', testCodes: ['ASC', 'ENT', 'LAM', 'CANS'], forWhom: 'Dla dzieci — z rozszerzonym posiewem drożdżaków.' },
    { id: 'p3', name: 'Panel 1 (pediatryczny poszerzony + pleśnie)', slug: 'panel-1-pediatryczny-poszerzony-plesnie', description: 'Panel dla dzieci z posiewem w kierunku Candida spp. oraz pleśni.', price: 295, categoryId: 'pasozyty', testCodes: ['ASC', 'ENT', 'LAM', 'CANS', 'POSP'], forWhom: 'Dla dzieci — z dodatkowym posiewem w kierunku pleśni.' },
    { id: 'p5', name: 'Panel 2a', slug: 'panel-2a', description: 'Pasożyty, pierwotniaki i cysty wraz z oceną pH kału i resztek pokarmowych (z opisem).', price: 300, categoryId: 'pasozyty', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI'], forWhom: 'Rozszerzona diagnostyka pasożytów, pierwotniaków i cyst.' },
    { id: 'p7', name: 'Panel 4', slug: 'panel-4', description: 'Panel 3 rozszerzony o adenorotawirus, krew utajoną i Helicobacter pylori.', price: 440, categoryId: 'wirusy', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP', 'ADENO', 'FOB', 'HP'], forWhom: 'Łączna diagnostyka pasożytów, wirusów i Helicobacter pylori.' },
    { id: 'p8', name: 'Panel 5', slug: 'panel-5', description: 'Kompleksowy panel z posiewem bakterii (E. coli), wirusami i Helicobacter pylori.', price: 520, categoryId: 'wirusy', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP', 'POSB', 'FOB', 'ADENO', 'HP'], badge: 'Nowość', forWhom: 'Szeroka diagnostyka pasożytniczo-mikrobiologiczna przewodu pokarmowego.' },
    { id: 'p9', name: 'Panel 6 (pediatryczny rozszerzony)', slug: 'panel-6-pediatryczny-rozszerzony', description: 'Panel dla dzieci: pasożyty, Candida spp. oraz posiew w kierunku bakterii.', price: 305, categoryId: 'pasozyty', testCodes: ['ASC', 'ENT', 'LAM', 'CANS', 'POSB'], forWhom: 'Dla dzieci — z posiewem bakteryjnym.' },
    { id: 'p10', name: 'Panel 7 (pediatryczny rozszerzony + pleśnie)', slug: 'panel-7-pediatryczny-rozszerzony-plesnie', description: 'Panel dla dzieci z posiewem w kierunku bakterii i pleśni.', price: 360, categoryId: 'pasozyty', testCodes: ['ASC', 'ENT', 'LAM', 'CANS', 'POSB', 'POSP'], forWhom: 'Dla dzieci — z posiewem bakterii i pleśni.' },
    { id: 'p11', name: 'Panel 8 z Yersinia', slug: 'panel-8-yersinia', description: 'Najszerszy panel pasożytniczo-mikrobiologiczny z Yersinia i Clostridium difficile.', price: 615, categoryId: 'wirusy', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP', 'POSB', 'FOB', 'ADENO', 'HP', 'CLO'], forWhom: 'Pełna diagnostyka przewodu pokarmowego z Yersinia.' },
    { id: 'p12', name: 'Panel 9', slug: 'panel-9', description: 'Panel 8 z kalprotektyną w kale oraz testem combo Clostridium difficile (jakościowo).', price: 900, categoryId: 'wirusy', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP', 'POSB', 'FOB', 'ADENO', 'HP', 'CLO', 'KALP'], forWhom: 'Rozbudowana diagnostyka z markerem zapalnym jelit.' },
    { id: 'p13', name: 'Panel 10', slug: 'panel-10', description: 'Maksymalny zakres — Panel 9 uzupełniony o laktoferynę i norowirusy.', price: 1460, categoryId: 'wirusy', testCodes: ['PH', 'LAM', 'ASC', 'ENT', 'TAE', 'FAS', 'STR', 'TOXC', 'TOXT', 'TRI', 'CANS', 'POSP', 'POSB', 'FOB', 'ADENO', 'HP', 'CLO', 'KALP', 'LACT', 'NORO'], badge: 'Nowość', forWhom: 'Najszersza dostępna diagnostyka przewodu pokarmowego.' },
  ];

  private readonly _points: CollectionPoint[] = [
    { id: 'pp1', name: 'LabKawa Centrum', city: 'Kraków', address: 'ul. Floriańska 12', phone: '12 345 67 89', hours: 'Pn–Pt 7:00–18:00, Sob 8:00–12:00', openSaturday: true, homeService: true },
    { id: 'pp2', name: 'LabKawa Podgórze', city: 'Kraków', address: 'ul. Kalwaryjska 44', phone: '12 345 67 90', hours: 'Pn–Pt 7:00–15:00', openSaturday: false, homeService: true },
    { id: 'pp3', name: 'LabKawa Mokotów', city: 'Warszawa', address: 'ul. Puławska 120', phone: '22 100 20 30', hours: 'Pn–Pt 6:30–19:00, Sob 8:00–13:00', openSaturday: true, homeService: true },
    { id: 'pp4', name: 'LabKawa Wola', city: 'Warszawa', address: 'al. Solidarności 80', phone: '22 100 20 31', hours: 'Pn–Pt 7:00–17:00', openSaturday: false, homeService: false },
    { id: 'pp5', name: 'LabKawa Stare Miasto', city: 'Wrocław', address: 'ul. Świdnicka 19', phone: '71 200 30 40', hours: 'Pn–Pt 7:00–18:00, Sob 8:00–12:00', openSaturday: true, homeService: true },
    { id: 'pp6', name: 'LabKawa Śródmieście', city: 'Poznań', address: 'ul. Półwiejska 7', phone: '61 300 40 50', hours: 'Pn–Pt 7:00–16:00', openSaturday: false, homeService: true },
    { id: 'pp7', name: 'LabKawa Bałuty', city: 'Łódź', address: 'ul. Zgierska 60', phone: '42 400 50 60', hours: 'Pn–Pt 7:00–15:00, Sob 8:00–11:00', openSaturday: true, homeService: false },
    { id: 'pp8', name: 'LabKawa Przymorze', city: 'Gdańsk', address: 'al. Grunwaldzka 200', phone: '58 500 60 70', hours: 'Pn–Pt 6:30–18:00', openSaturday: false, homeService: true },
  ];

  // ---- public reactive accessors ----
  readonly categories = signal<Category[]>(this._categories);
  readonly tests = signal<LabTest[]>(this._tests);
  readonly packages = signal<TestPackage[]>(this._packages);
  readonly points = signal<CollectionPoint[]>(this._points);

  readonly popularTests = computed(() => this._tests.filter((t) => t.popular));
  readonly cities = computed(() =>
    [...new Set(this._points.map((p) => p.city))].sort()
  );

  getCategory(slug: string): Category | undefined {
    return this._categories.find((c) => c.slug === slug);
  }

  getCategoryById(id: string): Category | undefined {
    return this._categories.find((c) => c.id === id);
  }

  getTest(slug: string): LabTest | undefined {
    return this._tests.find((t) => t.slug === slug);
  }

  getTestByCode(code: string): LabTest | undefined {
    return this._tests.find((t) => t.code === code);
  }

  getPackage(slug: string): TestPackage | undefined {
    return this._packages.find((p) => p.slug === slug);
  }

  packageTests(pkg: TestPackage): LabTest[] {
    return pkg.testCodes
      .map((code) => this.getTestByCode(code))
      .filter((t): t is LabTest => !!t);
  }

  searchTests(query: string, categoryId?: string): LabTest[] {
    const q = (query ?? '').trim().toLowerCase();
    return this._tests.filter((t) => {
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchCat = !categoryId || t.categoryId === categoryId;
      return matchQ && matchCat;
    });
  }
}
