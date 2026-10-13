import type { StoryScene } from "../types/story";
export const scenes: StoryScene[] = [
  {
    id: "sweden",
    eyebrow: "En blygsam början",
    title: "En pojke med bestämda åsikter",
    illustration: "neighborhood",
    alt: "En stillsam svensk by med röda trähus och björkar.",
    paragraphs: [
      "Det var en gång, i ett lugnt litet hörn av Sverige, en pojke som inte var särskilt imponerad av vuxnas auktoritet.",
      "Han hette Victor. Han började tala ovanligt tidigt, och med en sådan anmärkningsvärd tydlighet att man nästan kunde misstänka att han artigt hade väntat på att alla andra skulle prata färdigt.",
      "Han var fortfarande så liten att han behövde hjälp med jackan, men fullt kapabel att förklara hur världen egentligen borde styras.",
    ],
  },
  {
    id: "kindergarten",
    eyebrow: "En alldeles vanlig morgon",
    title: "Viktiga ärenden på förskolan",
    illustration: "classroom",
    alt: "Barn som leker på en solbelyst svensk förskola medan Victor funderar över viktiga ärenden.",
    paragraphs: [
      "På förskolan ägnade sig de andra barnen åt de vanliga bestyren: träklossar, små meningsskiljaktigheter och den stora gåtan om vem som egentligen ägde den röda kritan.",
      "Victor hade betydligt viktigare saker att tänka på.",
      "Ett misstag hade begåtts.",
      "Ett allvarligt misstag.",
      "Och som den principfaste lille gentleman han var kunde han knappast låta saken bero.",
    ],
    interaction: {
      kind: "notice",
      label: "Läs det lilla anslaget",
      response:
        "Anslag från förskolan: Alla viktiga meddelanden måste lämnas före eftermiddagsfikat.",
      formattedResponse: [
        {
          label: "Anslag från förskolan:",
          text: "Alla viktiga meddelanden måste lämnas före eftermiddagsfikat.",
        },
      ],
    },
  },
  {
    id: "announcement",
    eyebrow: "En fråga om identitet",
    title: "”Det har blivit ett misstag.”",
    illustration: "announcement",
    alt: "Lille Victor går självsäkert fram till sina förskollärare.",
    paragraphs: [
      "En dag gick han fram till sina förskollärare med samma lugna självklarhet som en man som infinner sig på kommunkontoret för ett sedan länge inbokat möte.",
      "”Min mamma”, upplyste han dem, ”har sagt fel namn till er.”",
      "Det finns många saker en förskollärare kan förvänta sig att få höra före lunch.",
      "Det här var förmodligen inte en av dem.",
    ],
    interaction: {
      kind: "choice",
      label: "Ska han rätta till misstaget?",
      response:
        "Kommittén tackar för din synpunkt. Lasse hade naturligtvis redan fattat sitt beslut.",
      choices: [
        {
          label: "Rätta uppgifterna",
          response:
            "”Självklart”, säger Lasse. ”Det måste vara ordning på handlingarna.”",
        },
        {
          label: "Fråga mamma först",
          response:
            "”Ett klokt förslag”, säger Lasse. ”Tyvärr är pappersarbetet redan avklarat.”",
        },
      ],
    },
  },
  {
    id: "teachers",
    eyebrow: "Den officiella rättelsen",
    title: "Lasse. Lasse Örn.",
    illustration: "teachers",
    alt: "Två vänliga förskollärare utbyter förvånade blickar medan den lille pojken förklarar vad han egentligen heter.",
    paragraphs: [
      "Hans riktiga namn, insisterade han, var Lasse Örn.",
      "Inte Victor.",
      "Inte något smeknamn.",
      "Lasse Örn.",
      "Han framförde denna upplysning med en sådan övertygelse att förskollärarna lät sig övertalas.",
      "Och så gick det till när en mycket liten pojke, på en stillsam förskola någonstans i Sverige, vann en administrativ seger av imponerande mått.",
    ],
  },
  {
    id: "painter",
    eyebrow: "Under tiden, hemma i lägenheten",
    title: "Den ursprunglige herr Örn",
    illustration: "painter",
    alt: "En vänlig målare med en färghink målar om en svensk familjelägenhet.",
    paragraphs: [
      "Det fanns faktiskt en annan Lasse Örn.",
      "En vuxen sådan.",
      "Han var mannen som hade hjälpt till att måla familjens lägenhet.",
      "Han hade kommit dit för att snygga till väggarna, men hade samtidigt, helt oavsiktligt, gett Victor en betydligt bättre uppfattning om vad han själv borde heta.",
      "Ett bra namn var tydligen ungefär som en bra färgnyans: när man väl hade hittat en man tyckte om, fanns det ingen anledning att byta.",
    ],
    interaction: {
      kind: "paint",
      label: "Undersök färghinken",
      response:
        "Kulör: Diskret självsäker salviagrön. Täckförmåga: Två väggar och en hel identitet.",
      formattedResponse: [
        {
          label: "Kulör:",
          text: "Diskret självsäker salviagrön.",
        },
        {
          label: "Täckförmåga:",
          text: "Två väggar och en hel identitet.",
        },
      ],
    },
  },
  {
    id: "identity",
    eyebrow: "En synnerligen tillfredsställande lösning",
    title: "Ett namn att växa i",
    illustration: "identity",
    alt: "Lille Lasse står stolt i sin gröna tröja och blå hängselbyxor med händerna bakom ryggen.",
    paragraphs: [
      "Lasse Örn passade honom alldeles utmärkt.",
      "Det hade tyngd.",
      "Det hade värdighet.",
      "Det lät som namnet på någon som alltid visste var reservnycklarna låg.",
      "Victor hade redan personligheten hos en liten äldre herre. Nu hade han dessutom ett namn som utan vidare skulle passa på ett möte om grannens trädgårdsstaket.",
      "Vad hans mamma tyckte om arrangemanget var uppenbarligen inte avgörande.",
    ],
  },
  {
    id: "songs",
    eyebrow: "En gentlemans repertoar",
    title: "Och så var det sången",
    illustration: "singing",
    alt: "Lasse sjunger vid ett öppet fönster medan fåglar samlas utanför.",
    paragraphs: [
      "Han tyckte också om att sjunga visor av Evert Taube.",
      "Naturligtvis.",
      "Ett mindre kräset barn hade kanske nöjt sig med en visa om en mycket liten spindel.",
      "Vår unge gentleman föredrog en repertoar med lite mer havsbris i tonerna.",
      "Föreställ dig den lilla rösten som fyllde rummet: ett barns glädje, en gammal själs självsäkerhet och inte minsta tvivel om att det var just han som skulle stå i centrum.",
    ],
    interaction: {
      kind: "music",
      label: "Låt en visa flyga iväg",
      response:
        "En liten visa till havet, solskenet och alla som har vett nog att lyssna.",
    },
  },
  {
    id: "gentleman",
    eyebrow: "Små skor. Stora ambitioner.",
    title: "Fyra år gammal. Pensionär i själen.",
    illustration: "portrait",
    alt: "Ett kärleksfullt porträtt av Lasse som en liten äldre gentleman i en alldeles för stor fåtölj.",
    paragraphs: [
      "Det finns barn som leker pirater och barn som låtsas vara kungar.",
      "Victor tycks ha siktat på något betydligt mer förnämt: en etablerad gentleman med ett pålitligt efternamn.",
      "Han var vältalig.",
      "Han var övertygad.",
      "Och han var underbart mycket sig själv, även när han var någon annan.",
      "Det är faktiskt ett alldeles utmärkt sätt att börja ett liv på.",
    ],
  },
  {
    id: "ending",
    eyebrow: "Slutet. Ungefär.",
    title: "En liten legend som faktiskt är sann",
    illustration: "cover",
    alt: "Lasse i en svensk trädgård, inramad av akvarellmålade grenar.",
    paragraphs: [
      "Så småningom fortsatte Victor att vara Victor.",
      "Men någonstans bland familjens allra bästa historier levde Lasse Örn vidare.",
      "Målaren fortsatte att måla.",
      "Förskollärarna fortsatte att undervisa.",
      "Och en liten pojke påminde alla om att även den minsta personen i rummet kan ha de allra mest fantastiska idéerna.",
      "Och pappersarbetet?",
      "Det har vi tagit oss friheten att ordna.",
    ],
  },
];
export const storyNote =
  "Inspirerad av ett verkligt barndomsminne. Dialoger och lekfulla detaljer är litterära tillägg och ska inte uppfattas som ordagranna återgivningar av verkliga samtal.";
export const bookTitle = "Lille Lasse Örns märkvärdiga äventyr";
