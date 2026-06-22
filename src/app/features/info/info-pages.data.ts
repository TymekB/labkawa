export interface InfoSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface InfoCta {
  text: string;
  link: string;
  /** optional query params, e.g. { kategoria: 'posiew-kalu' } */
  query?: Record<string, string>;
}

export interface InfoPage {
  slug: string;
  title: string;
  icon: string;
  lead: string;
  sections: InfoSection[];
  cta?: InfoCta;
}

export const INFO_PAGES: InfoPage[] = [
  {
    slug: 'badanie-kalu-na-pasozyty',
    title: 'Badanie kału na pasożyty',
    icon: '🪱',
    lead: 'Diagnostyka pasożytów jelitowych metodą BIO-REPAIR — dokładne wykrywanie najczęstszych pasożytów u dzieci i dorosłych.',
    sections: [
      {
        heading: 'Co wykrywamy?',
        bullets: [
          'Glista ludzka (Ascaris lumbricoides)',
          'Glista psia i kocia (Toxocara canis, Toxocara cati)',
          'Owsik (Enterobius vermicularis)',
          'Tasiemce (Taenia spp., Echinococcus, Dipylidium)',
          'Włosogłówka (Trichuris trichiura)',
          'Motylica wątrobowa (Fasciola hepatica)',
          'Węgorek jelitowy (Strongyloides stercoralis)',
          'Lamblia jelitowa (Giardia lamblia)',
        ],
      },
      {
        heading: 'Kiedy warto wykonać badanie?',
        bullets: [
          'Bóle brzucha, wzdęcia, biegunki lub zaparcia',
          'Świąd w okolicy odbytu (typowy dla owsicy)',
          'Niewyjaśniony spadek masy ciała',
          'Przewlekłe zmęczenie i niedobory pokarmowe',
          'Po kontakcie ze zwierzętami lub podróży',
        ],
      },
      {
        heading: 'Jak się przygotować?',
        paragraphs: [
          'Próbkę kału pobiera się do jałowego pojemnika z zakrętką, z ośmiu różnych miejsc, wypełniając pojemnik do połowy objętości. Materiał należy dostarczyć w warunkach chłodniczych. Szczegółową instrukcję znajdziesz na stronie „Jak pobrać próbkę kału”.',
        ],
      },
    ],
    cta: { text: 'Zobacz badania pasożytnicze', link: '/badania', query: { kategoria: 'pasozyty-jelitowe' } },
  },
  {
    slug: 'krew-utajona-w-kale',
    title: 'Krew utajona w kale',
    icon: '🩸',
    lead: 'Badanie przesiewowe w kierunku krwawień z przewodu pokarmowego — metodą immunochemiczną (FOB), bez konieczności stosowania specjalnej diety.',
    sections: [
      {
        heading: 'Czym jest krew utajona?',
        paragraphs: [
          'Krew utajona to niewielkie ilości krwi w stolcu, niewidoczne gołym okiem. Jej obecność może świadczyć o krwawieniu w obrębie przewodu pokarmowego i jest ważnym sygnałem w profilaktyce raka jelita grubego.',
        ],
      },
      {
        heading: 'Kiedy wykonać badanie?',
        bullets: [
          'Profilaktyka raka jelita grubego, szczególnie po 50. roku życia',
          'Zmiana rytmu wypróżnień',
          'Niedokrwistość o niejasnej przyczynie',
          'Obciążenie rodzinne chorobami jelit',
        ],
      },
      {
        heading: 'Przygotowanie',
        paragraphs: [
          'Metoda FOB nie wymaga specjalnej diety przed badaniem. Wystarczy pobrać próbkę kału do jałowego pojemnika z zakrętką i dostarczyć ją do laboratorium.',
        ],
      },
    ],
    cta: { text: 'Przejdź do badania', link: '/badania/krew-utajona-fob' },
  },
  {
    slug: 'badania-mykologiczne',
    title: 'Badania mykologiczne',
    icon: '🍄',
    lead: 'Posiewy w kierunku grzybów drożdżopodobnych (Candida) oraz pleśni — diagnostyka kandydozy i grzybic przewodu pokarmowego.',
    sections: [
      {
        heading: 'Zakres badań',
        bullets: [
          'Posiew kału w kierunku Candida albicans',
          'Posiew kału w kierunku Candida spp. (identyfikacja gatunków)',
          'Posiew kału w kierunku pleśni',
        ],
      },
      {
        heading: 'Kiedy warto wykonać?',
        bullets: [
          'Przewlekłe wzdęcia, biegunki i dyskomfort jelitowy',
          'Po antybiotykoterapii',
          'Obniżona odporność i nawracające infekcje',
          'Podejrzenie kandydozy przewodu pokarmowego',
        ],
      },
      {
        heading: 'Ważne',
        paragraphs: [
          'Wyhodowanie pleśni wymaga bezwzględnej konsultacji lekarskiej. Wynik zawsze warto omówić z lekarzem prowadzącym.',
        ],
      },
    ],
    cta: { text: 'Zobacz posiewy kału', link: '/badania', query: { kategoria: 'posiew-kalu' } },
  },
  {
    slug: 'diagnostyka-jelit',
    title: 'Diagnostyka jelit',
    icon: '🧬',
    lead: 'Kompleksowa ocena pracy i szczelności jelit oraz ilościowa analiza mikroflory jelitowej.',
    sections: [
      {
        heading: 'Co oceniamy?',
        bullets: [
          'Mikroflora jelit — metoda ilościowa (wynik w formie wykresu i CFU/g)',
          'Kalprotektyna i laktoferyna — markery stanu zapalnego jelit',
          'Zonulina — marker szczelności bariery jelitowej',
          'Alfa-1-antytrypsyna i elastaza trzustkowa',
          'Białko EPX oraz M2-PK',
        ],
      },
      {
        heading: 'Kiedy warto wykonać?',
        bullets: [
          'Zespół jelita drażliwego (IBS)',
          'Podejrzenie choroby zapalnej jelit (IBD)',
          'Dysbioza i nietolerancje pokarmowe',
          'Przewlekłe dolegliwości trawienne',
        ],
      },
    ],
    cta: { text: 'Zobacz badania dysbiozy', link: '/badania', query: { kategoria: 'dysbioza-jelitowa' } },
  },
  {
    slug: 'jak-pobrac-probke-kalu',
    title: 'Jak pobrać próbkę kału',
    icon: '🧴',
    lead: 'Instrukcja przygotowania materiału do badania kału dla pacjenta — krok po kroku.',
    sections: [
      { heading: '1. Zakup pojemników', paragraphs: ['Zakup w aptece dwa pojemniki na kał, koniecznie z zakrętką.'] },
      { heading: '2. Pobranie próbki', paragraphs: ['Pobierz próbkę kału, wypełniając pojemnik do połowy jego objętości. Materiał należy pobrać z ośmiu różnych miejsc.'] },
      { heading: '3. Zabezpieczenie próbek', paragraphs: ['Pojemniki z pobranym materiałem owiń folią aluminiową.'] },
      {
        heading: '4. Dane pacjenta',
        paragraphs: ['Na osobnej kartce umieść następujące informacje:'],
        bullets: ['Nazwisko i imię pacjenta', 'PESEL', 'Numer telefonu kontaktowego', 'Adres (opcjonalnie)', 'Informacja dotycząca faktury lub paragonu'],
      },
      {
        heading: '5. Dostarczenie materiału',
        paragraphs: [
          'Materiał dostarcz osobiście lub wyślij na adres: NZOZ LAB Maria Kawa, ul. Piłsudskiego 17, 39-432 Gorzyce.',
          'Przesyłkę nadaj kurierem w godzinach dopołudniowych, z zaznaczeniem, że zawiera materiał biologiczny. Laboratorium odbiera przesyłki od 8:00 do 14:00, najpóźniej do 16:00. Koszt przesyłki ponosi pacjent.',
        ],
      },
      { heading: '6. Warunki transportu', paragraphs: ['Zaopatrz się w woreczek żelowy (dostępny w aptekach lub sklepach rehabilitacyjnych). Woreczek zamroź dzień wcześniej, a następnie zapakuj pojemniki z kałem do plastikowego pojemnika razem z zamrożonym wkładem.'] },
      { heading: '7. Zestaw transportowy', paragraphs: ['Możemy bezpłatnie wysłać cały zestaw transportowy (pojemnik na kał, folię aluminiową, woreczek żelowy oraz plastikowy pojemnik) po uiszczeniu opłaty za wybrane badania. Zamówienie: prześlij dane adresowe na labkawa@vp.pl.'] },
      { heading: '8. Czas oczekiwania na wyniki', bullets: ['Badanie w kierunku pasożytów: 4–5 dni roboczych', 'Posiew kału: około 9 dni roboczych'] },
      { heading: '9. Otrzymanie wyników', paragraphs: ['Wyniki wysyłamy pocztą elektroniczną lub przygotowujemy do odbioru stacjonarnego. Prosimy o podpisanie zgody na przesłanie wyników drogą elektroniczną.'] },
    ],
    cta: { text: 'Skontaktuj się z laboratorium', link: '/kontakt' },
  },
];

export const INFO_PAGE_MAP: Record<string, InfoPage> = Object.fromEntries(
  INFO_PAGES.map((p) => [p.slug, p])
);
