this.lesson = new Lesson([
  new Question(
    {
      description: "Laten we bij het begin beginnen! In Ruby kun je makkelijk variabelen gebruiken om iets in op te slaan. Begin eens met je naam, bijvoorbeeld\nnaam = \"Henk\"",
      answer: /naam\s*=\s*\"[\w\s]*\"/,
      possible_errors: {
          quotes_vergeten: /^naam\s*=\s*\"?[\w\s]+\"?$/,
          dubbele_is: /^naam\s*==\s*\"?[\w\s]+\"?$/

      },
      error_messages: {
          quotes_vergeten: "Let op de aanhalingstekens.",
          dubbele_is: "Gebruik een enkel =-teken bij het toewijzen van variabelen."
          default: "Dat is niet goed. Typte je naam = \"je naam\"?"
      }
  }),
  new Question(
    {
      description: "Nu kun je hem printen met puts. Je kunt een variabele meenemen met \#\{variabele\}. Typ maar eens\nputs \"Hallo, \#\{naam\}",
      answer: /^puts\s*\"[\w\s\,]+\#\{naam\}\!?\"$/,
      possible_errors: {
          quotes_vergeten: /^puts\s*\"?[\w\s\,]+\#\{naam\}\!?\"?$/,
      },
      error_messages: {
          quotes_vergeten: "Let op de aanhalingstekens.",
          default: "Dat is niet goed. Typte je puts \"Hallo, \#\{naam\}?"
      }
  }),




  new Question(
    {
      description: "Goed gedaan! Nu gaan we logica toevoegen. Een if-statement gebruik je om iets alleen te laten uitvoeren als aan een voorwaarde wordt voldaan.\nTyp eens:\nif naam == \"je naam\"\n   puts \"Hallo, \#\{naam\}!\"\nend",
      answer: /if\s*naam\s*==\s*\"[\w\s]*\"\s*\n\s*puts\s*\"[\w\s\!\,]+\#\{naam\}\!?"\s*\n\s*end/,
      possible_errors: {
          quotes_vergeten: /if\s*naam\s*==\s*\"?[\w\s]*\"?\s*\n\s*puts\s*\"?[\w\s\!\,]+\#\{naam\}\!?"?\s*\n\s*end/,
          enkele_is: /if\s*naam\s*=\s*\"[\w\s]*\"\s*\n\s*puts\s*\"[\w\s\!\,]+\#\{naam\}\!?"\s*\n\s*end/
      },
      error_messages: {
          quotes_vergeten: "Let op de aanhalingstekens.",
          enkele_is: "Gebruik in een if-statement altijd een dubbel =-teken. Bij toewijzen van variabelen gebruik je een enkel =-teken."
          default: "Dat is niet goed. Typte je\nif naam == \"je naam\"\n   puts \"Hallo, \#\{naam\}!\"\nend"
      }
  }),
  new Question(
    {
      description: "Oke! Bij een if kun je ook een else zetten. Dit gebruik je als je nog een andere mogelijk verwacht. Let op dat je alsnog een end krijgt aan het einde.\nTyp eens:\nif 9 \> 10\n   puts \"Dit is bijzonder!\"\nelse\nputs \"Gelukkig, het klopt!\"\nend",
      answer: /^if\s*9\s*>\s*10\s*\nputs\s*\"[\w\s\,\!]+\"\s*\n\s*else\s*\n\s*puts\s*\"[\w\s\,\!]+\"\s*\n\s*end\s*$/,
      possible_errors: {
          quotes_vergeten: /^if\s*9\s*>\s*10\s*\nputs\s*\"?[\w\s\,\!]+\"?\s*\n\s*else\s*\n\s*puts\s*\"?[\w\s\,\!]+\"?\s*\n\s*end\s*$/,
          end_vergeten: /^if\s*9\s*>\s*10\s*\nputs\s*\"[\w\s\,\!]+\"\s*\n\s*else\s*\n\s*puts\s*\"[\w\s\,\!]+\"\s*\n\s*$/
      },
      error_messages: {
          quotes_vergeten: "Let op de aanhalingstekens.",
          end_vergeten: "Let op dat je ook bij else afsluit met end!",
          default: "Dat is niet goed. Typte je\nif 9 \> 10\n   puts \"Dit is bijzonder!\"\nelse\nputs \"Gelukkig, het klopt!\"\nend"
      }
  })
])