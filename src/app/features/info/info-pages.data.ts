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
          'Próbkę kału pobiera się do jałowego pojemnika z zakrętką, z ośmiu różnych miejsc, wypełniając pojemnik do połowy objętości. Materiał należy dostarczyć w warunkach chłodniczych. Szczegółową instrukcję znajdziesz na stronie „Jak pobrać i wysłać materiał do badania”.',
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
    slug: 'instrukcja-pobrania-materialu',
    title: 'Jak pobrać i wysłać materiał do badania?',
    icon: '🧴',
    lead: 'Przygotowaliśmy szczegółową instrukcję dotyczącą pobrania, zabezpieczenia oraz wysyłki materiału do naszego laboratorium. Przestrzeganie poniższych zaleceń pozwala uzyskać wiarygodne wyniki badań i sprawną realizację zlecenia.',
    sections: [
      {
        heading: 'Jak prawidłowo pobrać próbkę kału do badania?',
        paragraphs: ['Aby uzyskać wiarygodny wynik badania, prosimy o dokładne zapoznanie się z poniższą instrukcją.'],
      },
      {
        heading: '1. Przygotowanie pojemników',
        paragraphs: ['Należy zakupić w aptece dwa sterylne pojemniki na kał z zakrętką.'],
      },
      {
        heading: '2. Pobranie materiału',
        paragraphs: ['Próbkę kału należy pobrać do obu pojemników, wypełniając każdy do około połowy objętości. Materiał powinien zostać pobrany z ośmiu różnych miejsc próbki.'],
      },
      {
        heading: '3. Zabezpieczenie materiału',
        paragraphs: ['Po pobraniu materiału pojemniki należy szczelnie zamknąć i owinąć folią aluminiową.'],
      },
      {
        heading: '4. Dane pacjenta',
        paragraphs: ['Do przesyłki należy dołączyć kartkę zawierającą:'],
        bullets: [
          'imię i nazwisko pacjenta',
          'numer PESEL',
          'numer telefonu kontaktowego',
          'adres do wysyłki wyników (opcjonalnie)',
          'informację dotyczącą faktury lub paragonu',
        ],
      },
      {
        heading: '5. Przygotowanie do transportu',
        paragraphs: [
          'W celu zachowania odpowiednich warunków transportu zalecamy użycie zamrożonego wkładu chłodzącego.',
          'Pojemniki z materiałem należy umieścić w szczelnym plastikowym pojemniku wraz z wkładem chłodzącym.',
        ],
      },
      {
        heading: '6. Dostarczenie materiału',
        paragraphs: [
          'Materiał można dostarczyć osobiście lub przesłać na adres: NZOZ LAB Maria Kawa, ul. Piłsudskiego 17, 39-432 Gorzyce.',
          'Przesyłkę należy nadać w godzinach porannych z informacją, że zawiera materiał biologiczny. Laboratorium odbiera przesyłki od poniedziałku do piątku w godzinach 8:00–14:00. Koszt przesyłki pokrywa pacjent.',
        ],
      },
      {
        heading: '7. Bezpłatny zestaw transportowy',
        paragraphs: ['Po opłaceniu wybranych badań możesz otrzymać bezpłatny zestaw transportowy — zamów go pod adresem labkawa@vp.pl. Zestaw zawiera:'],
        bullets: [
          'pojemniki do pobrania materiału',
          'folię aluminiową',
          'wkład chłodzący',
          'pojemnik transportowy',
        ],
      },
      {
        heading: '8. Płatność za badania',
        paragraphs: [
          'Opłatę za badania należy uiścić na rachunek: 84 1020 4913 0000 9202 0010 5353.',
          'Potwierdzenie wpłaty należy dołączyć do przesyłki.',
        ],
      },
      {
        heading: '9. Czas oczekiwania na wyniki',
        bullets: ['Badania w kierunku pasożytów: 4–5 dni roboczych', 'Posiew kału: około 9 dni roboczych'],
      },
      {
        heading: '10. Odbiór wyników',
        paragraphs: ['Wyniki przesyłamy drogą elektroniczną lub pocztową zgodnie z preferencjami pacjenta.'],
      },
      {
        heading: 'Ważne',
        paragraphs: ['Przesyłki niezawierające kompletnych danych identyfikacyjnych i kontaktowych nie będą mogły zostać przyjęte do realizacji.'],
      },
    ],
    cta: { text: 'Skontaktuj się z laboratorium', link: '/kontakt' },
  },
];

export const INFO_PAGE_MAP: Record<string, InfoPage> = Object.fromEntries(
  INFO_PAGES.map((p) => [p.slug, p])
);
